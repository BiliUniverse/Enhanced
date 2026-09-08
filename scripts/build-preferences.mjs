import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { normalizeBoxJs } from "@nsnanocat/preference-panes";

await mkdir("dist/settings", { recursive: true });
await copyFile("settings/biliverse.css", "dist/settings/biliverse.css");
const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.resolve("@nsnanocat/preference-panes/dist/preference-panes.mjs")), "utf8"));
let html = await readFile("settings/index.html", "utf8");
// 每次包升级使用独立资源 URL，避免 WebView 复用旧版 JS/CSS。
// Use versioned resource URLs so WebViews do not reuse JS/CSS from an older package.
for (const name of ["app.mjs", "panel.css", "biliverse.css"]) html = html.replace(`/settings/assets/${name}`, `/settings/assets/${name}?v=${version}`);
await writeFile("dist/settings/index.html", html);
await copyFile(fileURLToPath(import.meta.resolve("@nsnanocat/preference-panes/browser/panel.css")), "dist/settings/panel.css");
const definition = normalizeBoxJs(JSON.parse(await readFile("template/boxjs.settings.json", "utf8")), "Enhanced");
await copyFile("template/boxjs.settings.json", "dist/settings/Enhanced.boxjs.json");
console.log(`PreferencePanes: ${definition.fields.length} Enhanced fields; configuration stays in BoxJS JSON.`);
