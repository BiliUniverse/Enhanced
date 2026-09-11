import assert from "node:assert/strict";
import test from "node:test";
import gRPC from "@nsnanocat/grpc";
import database from "../src/function/database.mjs";
import { RegionListReply } from "../src/protobuf/bilibili/app/show/v1/mixture.js";
import { Response } from "../src/process/Response.mjs";

globalThis.$argument = {};

test("RegionList config contains the captured entries and every custom tab", () => {
	const { RegionList, Tab } = database.Enhanced.Configs;
	const icons = RegionList.flatMap(content => content.icons);
	const uniqueIds = new Set(icons.map(icon => icon.uniqueId));

	assert.equal(RegionList.length, 3);
	assert.equal(icons.length, 60);
	assert.equal(uniqueIds.size, icons.length);
	for (const tab of Tab.tab) {
		const icon = icons.find(item => item.uniqueId === tab.uniqueId);
		assert.ok(icon, `${tab.name} must exist in RegionList`);
		assert.equal(icon.title, tab.name);
		assert.equal(icon.url, tab.uri);
	}
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
