const baseUri = "https://app.bilibili.com/settings/";

export function addSettingsEntry(data, ipad = false) {
	const groups = ipad
		? [data.ipad_upper_sections, data.ipad_recommend_sections, data.ipad_more_sections]
		: data.sections_v2?.map(section => section.items) ?? [];
	for (const items of groups) {
		if (!Array.isArray(items)) continue;
		for (let index = items.length - 1; index >= 0; index--) {
			if (items[index].id === 129515498 || [baseUri, "https://biliverse.github.io/settings/"].includes(items[index].uri?.split(/[?#]/)[0])) items.splice(index, 1);
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
			uri: baseUri,
			common_op_item: {},
	});
}
