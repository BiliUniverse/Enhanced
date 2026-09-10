const baseUri = "https://app.bilibili.com/settings/";
// iOS 的 web/general 路由直接创建 common WebView，url 参数保存页面的真实地址。
// The iOS web/general route creates the common WebView directly; url retains the actual page address.
const uri = `bilibili://web/general?url=${encodeURIComponent(baseUri)}`;

export function addSettingsEntry(data, ipad = false) {
	const groups = ipad
		? [data.ipad_upper_sections, data.ipad_recommend_sections, data.ipad_more_sections]
		: data.sections_v2?.map(section => section.items) ?? [];
	for (const items of groups) {
		if (!Array.isArray(items)) continue;
		for (let index = items.length - 1; index >= 0; index--) {
			if (items[index].id === 129515498 || items[index].uri === uri || [baseUri, "https://biliverse.github.io/settings/"].includes(items[index].uri?.split(/[?#]/)[0])) items.splice(index, 1);
		}
	}
	let items;
	if (ipad) {
		items = data.ipad_recommend_sections ??= [];
	} else {
		if (!Array.isArray(data.sections_v2)) return;
		let section = data.sections_v2.find(section => section.title === "推荐服务");
		if (!section) {
			section = { title: "推荐服务", style: 1, items: [], button: {} };
			const moreIndex = data.sections_v2.findIndex(section => section.title === "更多服务");
			data.sections_v2.splice(moreIndex < 0 ? data.sections_v2.length : moreIndex, 0, section);
		}
		items = section.items;
	}
	items.unshift({
			id: 129515498,
			title: "Biliverse",
			icon: "https://biliverse.github.io/settings/assets/Biliverse_subject_light.png",
			uri,
			common_op_item: {},
	});
}
