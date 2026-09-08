import { createSettingsHandler } from "@nsnanocat/preference-panes";
import { URL } from "@nsnanocat/url";
import { fetch } from "@nsnanocat/util/polyfill/fetch";

const origin = "https://biliverse.github.io";
const assets = `${origin}/settings/assets`;
const configURL = `${assets}/Enhanced.boxjs.json`;
globalThis.URL ??= URL;

const handle = createSettingsHandler({
	origin,
	loadConfig: async () => {
		const response = await fetch({ url: configURL, method: "GET", headers: { "Cache-Control": "no-cache" }, timeout: 5000 });
		if (response.status !== 200) throw new Error(`BoxJS HTTP ${response.status}`);
		return JSON.parse(response.body);
	},
});

// Native Mock handles these resources where supported; other clients use the same source.
export async function settingsResponse(request) {
	const url = new URL(request.url);
	if (url.origin !== origin) return;
	if (/^\/api\/Enhanced(?:\/|$)/.test(url.pathname)) return handle(request);
	let source, type;
	if (url.pathname === "/configs/Enhanced") {
		source = configURL;
		type = "application/json";
	} else if (/^\/settings\/(?:[a-zA-Z0-9_-]+\/?)?$/.test(url.pathname)) {
		source = `${assets}/index.html`;
		type = "text/html";
	} else return;
	if (!["HEAD", "GET"].includes(request.method)) return { status: 405, headers: { Allow: "HEAD, GET" }, body: "" };
	const response = await fetch({ url: source, method: "GET", headers: { "Cache-Control": "no-cache" }, timeout: 5000 });
	return { status: response.status, headers: { "Content-Type": `${type}; charset=utf-8`, "Cache-Control": "no-store" }, body: request.method === "HEAD" ? "" : response.body };
}
