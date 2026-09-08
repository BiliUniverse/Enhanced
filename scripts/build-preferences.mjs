import { copyFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { normalizeBoxJs } from "@nsnanocat/preference-panes";

await mkdir("dist/settings", { recursive: true });
for (const name of ["index.html", "biliverse.css"]) await copyFile(`settings/${name}`, `dist/settings/${name}`);
await copyFile(fileURLToPath(import.meta.resolve("@nsnanocat/preference-panes/browser/panel.css")), "dist/settings/panel.css");
const definition = normalizeBoxJs(JSON.parse(await readFile("template/boxjs.settings.json", "utf8")), "Enhanced");
await copyFile("template/boxjs.settings.json", "dist/settings/Enhanced.boxjs.json");
console.log(`PreferencePanes: ${definition.fields.length} Enhanced fields; configuration stays in BoxJS JSON.`);
