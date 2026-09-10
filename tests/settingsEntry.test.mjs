import assert from "node:assert/strict";
import test from "node:test";
import { addSettingsEntry } from "../src/function/settingsEntry.mjs";

const uri = "bilibili://web/general?url=https%3A%2F%2Fapp.bilibili.com%2Fsettings%2F";
test("migrates old entries to the explicit iOS common container route", () => {
	const data = { sections_v2: [{ title: "推荐服务", items: [{ uri: "https://biliverse.github.io/settings/" }, { uri: "https://app.bilibili.com/settings/?navhide=1" }] }] };
	addSettingsEntry(data);
	assert.equal(data.sections_v2[0].items.length, 1);
	assert.equal(data.sections_v2[0].items[0].uri, uri);
	const entry = new URL(data.sections_v2[0].items[0].uri);
	assert.equal(entry.host + entry.pathname, "web/general");
	assert.equal(entry.searchParams.get("url"), "https://app.bilibili.com/settings/");
	assert.deepEqual([...entry.searchParams.keys()], ["url"]);
});
test("moves the existing entry to recommended services without changing the shortcut row", () => {
	const shortcuts = [{ id: 396 }, { id: 397 }, { id: 398 }, { id: 399 }];
	const data = { sections_v2: [{ items: structuredClone(shortcuts) }, { title: "推荐服务", style: 1, items: [{ id: 401 }] }, { title: "更多服务", items: [{ uri: "bilibili://user_center/setting" }, { uri }] }] };
	addSettingsEntry(data);
	addSettingsEntry(data);
	assert.deepEqual(data.sections_v2[0].items, shortcuts);
	assert.equal(data.sections_v2[1].items[0].uri, uri);
	assert.equal(data.sections_v2[1].items[0].title, "Biliverse");
	assert.equal(data.sections_v2[1].items[1].id, 401);
	assert.equal(data.sections_v2[2].items.length, 1);
});
test("creates a recommended section before more services when absent", () => {
	const data = { sections_v2: [{ items: [] }, { title: "更多服务", items: [] }] };
	addSettingsEntry(data);
	assert.equal(data.sections_v2[1].title, "推荐服务");
	assert.equal(data.sections_v2[1].style, 1);
	assert.equal(data.sections_v2[1].items[0].uri, uri);
});
test("iPad moves the entry from more services into its recommended list", () => {
	const data = { ipad_more_sections: [{ uri }], ipad_recommend_sections: [{ id: 1 }] };
	addSettingsEntry(data, true);
	addSettingsEntry(data, true);
	assert.deepEqual(data.ipad_more_sections, []);
	assert.equal(data.ipad_recommend_sections.length, 2);
	assert.equal(data.ipad_recommend_sections[0].uri, uri);
});

test("leaves other common-container entries intact", () => {
	const other = { uri: "bilibili://web/general?url=https%3A%2F%2Fwww.bilibili.com%2Fh5%2Fcustomer-service" };
	const data = { sections_v2: [{ title: "推荐服务", items: [other] }] };
	addSettingsEntry(data);
	addSettingsEntry(data);
	assert.deepEqual(data.sections_v2[0].items[1], other);
	assert.equal(data.sections_v2[0].items.length, 2);
});
