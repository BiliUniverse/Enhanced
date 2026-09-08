import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "settings/app.mjs",
	output: { file: "dist/settings/app.mjs", format: "es" },
	plugins: [nodeResolve({ browser: true })],
	onwarn(warning) {
		throw new Error(warning.message);
	},
};
