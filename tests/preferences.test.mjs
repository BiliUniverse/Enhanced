import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const config = await readFile(new URL("../template/boxjs.settings.json", import.meta.url), "utf8");
const store = new Map();
let reads = 0,
	downloads = 0;
globalThis.$environment = { "surge-version": "preferences-test" };
globalThis.$argument = { Storage: "Argument", LogLevel: "OFF" };
globalThis.$persistentStore = {
	read(key) {
		reads++;
		return store.get(key) ?? null;
	},
	write(value, key) {
		store.set(key, value);
		return true;
	},
};
globalThis.$httpClient = {
	get(request, done) {
		downloads++;
		assert.equal(request.url, "https://biliverse.github.io/settings/assets/Enhanced.boxjs.json");
		done(null, { status: 200, headers: { "Content-Type": "application/json" } }, config);
	},
};
const { Request } = await import("../src/process/Request.mjs");
const send = async (path, method = "GET", value) =>
	(
		await Request({
			url: `https://biliverse.github.io${path}`,
			method,
			headers: { "X-Settings-Client": "1", "Content-Type": "application/json" },
			...(method === "POST" ? { body: JSON.stringify(value) } : {}),
		})
	).$response;

test("config probe bypasses setENV and never reads persistence", async () => {
	reads = downloads = 0;
	const response = await send("/configs/Enhanced", "HEAD");
	assert.equal(response.status, 200);
	assert.equal(response.body, "");
	assert.equal(reads, 0);
	assert.equal(downloads, 1);
});

test("runtime BoxJS and generic single-key API preserve siblings and affect Enhanced", async () => {
	store.set("BiliBili", JSON.stringify({ Enhanced: { Settings: { LogLevel: "OFF" }, Caches: { sentinel: 42 } }, Global: { Settings: { sentinel: true } } }));
	reads = 0;
	const configResponse = await send("/configs/Enhanced");
	assert.deepEqual(JSON.parse(configResponse.body), JSON.parse(config));
	assert.equal(reads, 0);
	const initial = await send("/api/Enhanced/Settings/");
	assert.equal(reads, 1);
	assert.deepEqual(JSON.parse(initial.body), { LogLevel: "OFF" });
	assert.equal((await send("/api/Enhanced/Settings/Storage", "POST", "PersistentStore")).status, 200);
	assert.equal((await send("/api/Enhanced/Settings/Home/Top", "POST", [])).status, 200);
	assert.equal((await send("/api/Enhanced/Settings/LogLevel", "POST", "INVALID")).status, 400);
	assert.equal((await send("/api/Enhanced/Settings/LogLevel", "DELETE")).status, 200);
	assert.equal((await send("/api/Enhanced/Settings/LogLevel")).status, 404);
	const saved = JSON.parse(store.get("BiliBili"));
	assert.deepEqual(saved.Enhanced.Settings.Home.Top, []);
	assert.equal(saved.Enhanced.Caches.sentinel, 42);
	assert.equal(saved.Global.Settings.sentinel, true);
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	assert.deepEqual(JSON.parse(result.$response.body).data.top, []);
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
