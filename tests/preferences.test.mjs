import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../template/boxjs.settings.json", import.meta.url), "utf8"));
const store = new Map();
globalThis.$environment = { "surge-version": "preferences-test" };
globalThis.$argument = { Storage: "Argument", LogLevel: "OFF" };
globalThis.$persistentStore = { read: key => store.get(key), write: (value, key) => { store.set(key, value); return true; } };
const { Request } = await import("../src/process/Request.mjs");

test("BoxJS paths match the persistence consumed by business requests", async () => {
	assert.ok(config.every(field => field.id.startsWith("@BiliBili.Enhanced.Settings.")));
	store.set("BiliBili", JSON.stringify({ Enhanced: { Settings: { Storage: "PersistentStore", Home: { Top: [] } } }, Global: { sentinel: true } }));
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	assert.deepEqual(JSON.parse(result.$response.body).data.top, []);
	assert.equal(JSON.parse(store.get("BiliBili")).Global.sentinel, true);
});

test("every settings script rule installs the independently hosted runtime", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.ok(template.includes("https://biliverse.github.io/settings/assets/Enhanced.request.js"), name);
		for (const line of template.split("\n").filter(line => line.includes("biliverse") && (line.includes("script-path=") || line.includes("script-echo-response")))) {
			assert.ok(line.includes("settings/assets/Enhanced.request.js"), name);
			assert.doesNotMatch(line, /request(?:\.dev)?\.bundle\.js|argument=/);
		}
	}
});

test("native resource rules and API routes are disjoint and never match download sources", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!/^(surge|loon)(\.dev)?\.handlebars$/.test(name)) continue;
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.doesNotMatch(template, /settings\\\/api/);
		const lines = template.split("\n");
		const page = new RegExp(lines.find(line => line.includes("settings/assets/index.html")).split(" ")[0]);
		const config = new RegExp(lines.find(line => line.includes("settings/assets/Enhanced.boxjs.json")).split(" ")[0]);
		for (const path of ["/settings/", "/settings/Enhanced", "/settings/Global"]) assert.ok(page.test(`https://biliverse.github.io${path}`));
		assert.ok(config.test("https://biliverse.github.io/configs/Enhanced"));
		for (const path of ["/api/Enhanced/Settings/Home/Top", "/settings/assets/index.html", "/settings/assets/Enhanced.boxjs.json"]) {
			assert.equal(page.test(`https://biliverse.github.io${path}`), false);
			assert.equal(config.test(`https://biliverse.github.io${path}`), false);
		}
	}
});
