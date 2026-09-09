import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../template/boxjs.settings.json", import.meta.url), "utf8"));
const store = new Map();
globalThis.$environment = { "surge-version": "preferences-test" };
globalThis.$argument = { Storage: "Argument", LogLevel: "OFF" };
globalThis.$persistentStore = {
	read: key => store.get(key),
	write: (value, key) => {
		store.set(key, value);
		return true;
	},
};
const { Request } = await import("../src/process/Request.mjs");

test("BoxJS paths match the persistence consumed by business requests", async () => {
	assert.ok(config.every(field => field.id.startsWith("@BiliBili.Enhanced.Settings.")));
	store.set("BiliBili", JSON.stringify({ Enhanced: { Settings: { Storage: "PersistentStore", Home: { Top: [] } } }, Global: { sentinel: true } }));
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	assert.deepEqual(JSON.parse(result.$response.body).data.top, []);
	assert.equal(JSON.parse(store.get("BiliBili")).Global.sentinel, true);
});

test("settings integration only installs the BoxJS configuration Mock", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.doesNotMatch(template, /Enhanced\.request\.js|PreferencePanes\.request\.js|settings\/assets\/index\.html/);
		const line = template.split("\n").find(line => line.includes("configs") && line.includes("biliverse"));
		assert.ok(line, name);
		const pattern = name.startsWith("shadowrocket") ? line.match(/pattern=([^,]+)/)[1] : name.startsWith("stash") ? line.trim().slice("- match: ".length) : line.split(" ")[0];
		const matcher = new RegExp(pattern);
		assert.ok(matcher.test("https://biliverse.github.io/configs/Enhanced"));
		assert.ok(matcher.test("https://biliverse.github.io/configs/Enhanced?v=1"));
		for (const pathname of ["/api/Enhanced/", "/settings/", "/settings/Enhanced", "/configs/Global", "/settings/assets/Enhanced.boxjs.json", "/settings/assets/Enhanced.config.js"]) assert.equal(matcher.test(`https://biliverse.github.io${pathname}`), false, name);
		assert.doesNotMatch(template, /biliverse\.github\.io\/settings\/assets\//);
		const development = name.includes(".dev.");
		const source = development ? "https://gist.githubusercontent.com/VirgilClyne/97d7611df1c0b29a254ce8f527137576/raw/" : "https://github.com/Biliverse/Enhanced/releases/download/v{{@package 'version'}}/";
		const file = /^(surge|loon)/.test(name) ? `BiliBili.Enhanced${development ? ".dev" : ""}.boxjs.json` : `config${development ? ".dev" : ""}.bundle.js`;
		assert.ok(template.includes(source + file), name);
	}
});
