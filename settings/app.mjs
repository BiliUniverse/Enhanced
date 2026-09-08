import { createPreferencesClient, mountPreferencePanes } from "@nsnanocat/preference-panes/browser";

const modules = ["Enhanced", "Global", "Redirect", "ADBlock"];
const root = document.querySelector("#preferences");
const client = createPreferencesClient({ timeout: 3500 });
let panel,
	revision = 0,
	routedPath;
const theme = navigator.userAgent.match(/themeId\/(\d+)/)?.[1];
if (theme) document.documentElement.dataset.theme = theme === "2" ? "dark" : "light";

function node(tag, className, text) {
	const element = document.createElement(tag);
	element.className = className;
	if (text !== undefined) element.textContent = text;
	return element;
}

function icon(module) {
	const picture = node("picture", "logo");
	const source = node("source", "");
	source.media = theme ? (theme === "2" ? "all" : "not all") : "(prefers-color-scheme: dark)";
	const base = module ? `/settings/assets/${module}_` : "/settings/logo_settings_";
	source.srcset = `${base}dark.png`;
	const image = node("img", "");
	image.src = `${base}light.png`;
	image.alt = "";
	picture.append(source, image);
	return picture;
}

function render() {
	routedPath = location.pathname;
	const version = ++revision;
	panel?.destroy();
	panel = undefined;
	root.replaceChildren();
	if (routedPath !== "/settings/") {
		panel = mountPreferencePanes({ element: root, title: "Biliverse" });
		return;
	}
	const home = node("section", "biliverse-home");
	const brand = icon();
	brand.className = "brand-logo";
	home.append(brand);
	home.append(node("h1", "", "Biliverse"));
	const section = node("section", "self-panel is-zh");
	section.append(node("h2", "header", "插件"));
	const container = node("div", "container");
	const scrollView = node("div", "scroll-view");
	const rows = node("div", "scroll");
	scrollView.append(rows);
	container.append(scrollView);
	section.append(container);
	home.append(section, node("p", "settings-note", "设置保存在当前代理工具中。使用本地设置前，请将配置类型设为 PersistentStore。"));
	root.append(home);
	for (const module of modules) {
		const button = node("button", "self-item is-zh");
		button.type = "button";
		button.disabled = true;
		button.dataset.module = module;
		const status = node("span", "module-status", "检测中");
		button.append(icon(module), node("span", "name", module), status);
		rows.append(button);
		button.onclick = () => {
			history.pushState(null, "", `/settings/${module}`);
			render();
			if (!matchMedia("(prefers-reduced-motion: reduce)").matches) root.animate([{ transform: "translateX(100%)" }, { transform: "translateX(0)" }], { duration: 260, easing: "ease-out" });
		};
		client.probe(module).then(available => {
			if (revision !== version) return;
			button.disabled = !available;
			status.textContent = available ? "" : "未响应";
		});
	}
}

window.addEventListener("popstate", () => {
	if (routedPath !== location.pathname) {
		render();
		if (location.pathname === "/settings/" && !matchMedia("(prefers-reduced-motion: reduce)").matches) root.animate([{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }], { duration: 260, easing: "ease-out" });
	}
});
window.addEventListener("pageshow", event => {
	if (event.persisted && location.pathname === "/settings/") render();
});
render();
