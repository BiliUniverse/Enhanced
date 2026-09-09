import { readFile } from "node:fs/promises";
import { build } from "@nsnanocat/preference-panes";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" with { type: "json" };

/**
 * 从同次构建的 BoxJS 生成配置响应和存储桥接产物，与业务脚本一同发布。
 * Generate config-response and storage artifacts from this build's BoxJS alongside business scripts.
 * @param {string} [suffix] 开发版文件后缀 / Development file suffix.
 * @returns {import("rollup").Plugin} 共用产物插件 / Shared artifact plugin.
 */
export function preferenceAssets(suffix = "") {
	return {
		name: "preference-assets",
		async generateBundle() {
			const boxjs = JSON.parse(await readFile(`./dist/BiliBili.Enhanced${suffix}.boxjs.json`, "utf8"));
			for (const [name, source] of Object.entries(await build(boxjs))) {
				switch (true) {
					case name.endsWith(".config.js"):
						this.emitFile({ type: "asset", fileName: `config${suffix}.bundle.js`, source });
						break;
					case name.endsWith(".request.js"):
						this.emitFile({ type: "asset", fileName: `settings${suffix}.bundle.js`, source });
						break;
				}
			}
		},
	};
}

const banner = chunk => `console.log('Date: ${new Date().toLocaleString("zh-CN", { timeZone: "PRC" })}');\nconsole.log('Version: ${pkg.version}');\nconsole.log('${chunk.fileName}');\nconsole.log('${pkg.displayName}');\n/* 项目主页：${pkg.homepage} */\n/* Project homepage: ${pkg.homepage} */`;

export default [
	{
		input: "./src/request.js",
		output: { file: "./dist/request.bundle.js", format: "es", banner },
		plugins: [nodeResolve(), terser(), preferenceAssets()],
	},
	{
		input: "./src/response.js",
		output: { file: "./dist/response.bundle.js", format: "es", banner },
		plugins: [nodeResolve(), terser()],
	},
];
