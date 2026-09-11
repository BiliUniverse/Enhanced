import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import gRPC from "@nsnanocat/grpc";
import { Storage } from "@nsnanocat/util";
import database from "../src/function/database.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";
import { RegionListReply, RegionShortcutReq } from "../src/protobuf/bilibili/app/show/v1/mixture.js";

globalThis.$argument = {};
const storageFile = `/tmp/biliverse-enhanced-region-list-${process.pid}.json`;
Storage.dataFile = storageFile;

beforeEach(() => {
	writeFileSync(storageFile, "{}\n");
	Storage.data = null;
});

after(() => rmSync(storageFile, { force: true }));

test("RegionList config contains the captured entries and every custom tab", () => {
	const { RegionList } = database.Enhanced.Configs;
	const regionIds = RegionList.groups.flatMap(group => group.ids);
	const uniqueIds = new Set(regionIds);

	assert.equal(RegionList.groups.length, 3);
	assert.equal(regionIds.length, 60);
	assert.equal(uniqueIds.size, regionIds.length);
	assert.equal(Object.keys(RegionList.items).length, regionIds.length);
	for (const uniqueId of regionIds) {
		const item = RegionList.items[uniqueId];
		assert.ok(item, `${uniqueId} must exist in RegionList.items`);
		assert.equal(typeof item.tab_id, "string");
		assert.ok(!("tab" in item));
	}
	assert.deepEqual(RegionList.defaultShortcut, ["2036", "2037", "780", "545", "774", "151", "801"]);
	assert.equal(RegionList.items["774"].title, "动画（港澳台）");
	assert.equal(RegionList.items["801"].title, "韩综（港澳台）");
});

test("RegionList response keeps online entries and appends missing local entries", async () => {
	const online = RegionListReply.create({
		contents: [
			{
				title: "全部分区",
				icons: [{ img: "online.png", title: "番剧", url: "bilibili://online", uniqueId: "13", rid: "13" }],
			},
		],
	});
	const response = await Response(
		{
			url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionList",
			headers: { "User-Agent": "bili-inter/1" },
		},
		{
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(RegionListReply.toBinary(online)),
		},
	);
	const result = RegionListReply.fromBinary(gRPC.decode(response.body));
	const icons = result.contents.flatMap(content => content.icons);

	assert.equal(icons.length, 60);
	assert.equal(icons.filter(icon => icon.uniqueId === "13").length, 1);
	assert.equal(icons.find(icon => icon.uniqueId === "13").url, "bilibili://online");
	assert.ok(icons.some(icon => icon.uniqueId === "774" && icon.title === "动画（港澳台）"));
	assert.ok(icons.some(icon => icon.uniqueId === "801" && icon.title === "韩综（港澳台）"));
});

test("empty RegionList shortcut uses the Enhanced default tabs", async () => {
	const response = await runRegionList(RegionListReply.create({ contents: [] }));
	const result = RegionListReply.fromBinary(gRPC.decode(response.body));
	const shortcutIds = result.shortcut.icons.map(icon => icon.uniqueId);
	const caches = Storage.getItem("@BiliBili.Enhanced.Caches", {});

	assert.deepEqual(shortcutIds, ["2036", "2037", "780", "545", "774", "151", "801"]);
	assert.deepEqual(caches.Tab, shortcutIds);
	assert.ok(!("RegionList" in caches));
});

test("RegionShortcut request updates the cached order before the server responds", async () => {
	const { $response } = await Request({
		method: "POST",
		url: "https://app.bilibili.com/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["801", "774", "65552"] })),
	});

	assert.equal($response, undefined);
	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Caches", {}).Tab, ["801", "774", "65552"]);
});

test("RegionShortcut updates the cached order used to build home tabs", async () => {
	await runRegionList(RegionListReply.create({ contents: [] }));
	await Response(
		{
			url: "https://app.bilibili.com/bilibili.app.show.v1.Mixture/RegionShortcut",
			headers: { "User-Agent": "bili-inter/1" },
			body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["801", "774", "65552"] })),
		},
		{
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(),
		},
	);
	const response = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const tabs = JSON.parse(response.body).data.tab;

	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Caches", {}).Tab, ["801", "774", "65552"]);
	assert.deepEqual(
		tabs.map(tab => tab.id),
		[801, 774, 65552],
	);
	assert.deepEqual(
		tabs.map(tab => tab.name),
		["韩综（港澳台）", "动画（港澳台）", "全区排行榜"],
	);
	assert.deepEqual(
		tabs.map(tab => tab.pos),
		[1, 2, 3],
	);
});

function runRegionList(body) {
	return Response(
		{
			url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionList",
			headers: { "User-Agent": "bili-inter/1" },
		},
		{
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(RegionListReply.toBinary(body)),
		},
	);
}
