/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {Object} $ - ENV
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
export default function setENV($, name, platforms, database) {
	console.log(`☑️ Set Environment Variables`, "");
	let { Settings, Caches, Configs } = $.getENV(name, platforms, database);
	/***************** Settings *****************/
	// 单值或空值转换为数组
	if (!Array.isArray(Settings?.Home?.Top)) $.lodash_set(Settings, "Home.Top", (Settings?.Home?.Top) ? [Settings.Home.Top] : []);
	if (!Array.isArray(Settings?.Home?.Top_more)) $.lodash_set(Settings, "Home.Top_more", (Settings?.Home?.Top_more) ? [Settings.Home.Top_more] : []);
	if (!Array.isArray(Settings?.Home?.Tab)) $.lodash_set(Settings, "Home.Tab", (Settings?.Home?.Tab) ? [Settings.Home.Tab] : []);
	if (!Array.isArray(Settings?.Following?.Tab)) $.lodash_set(Settings, "Following.Tab", (Settings?.Following?.Tab) ? [Settings.Following.Tab] : []);
	if (!Array.isArray(Settings?.Bottom)) $.lodash_set(Settings, "Bottom", (Settings?.Bottom) ? [Settings.Bottom] : []);
	if (!Array.isArray(Settings?.Mine?.CreatorCenter)) $.lodash_set(Settings, "Mine.CreatorCenter", (Settings?.Mine?.CreatorCenter) ? [Settings.Mine.CreatorCenter] : []);
	if (!Array.isArray(Settings?.Mine?.Recommend)) $.lodash_set(Settings, "Mine.Recommend", (Settings?.Mine?.Recommend) ? [Settings.Mine.Recommend] : []);
	if (!Array.isArray(Settings?.Mine?.More)) $.lodash_set(Settings, "Mine.More", (Settings?.Mine?.More) ? [Settings.Mine.More] : []);
	if (!Array.isArray(Settings?.Mine?.iPad?.Upper)) $.lodash_set(Settings, "Mine.iPad.Upper", (Settings?.Mine?.iPad?.Upper) ? [Settings.Mine.iPad.Upper] : []);
	if (!Array.isArray(Settings?.Mine?.iPad?.Recommend)) $.lodash_set(Settings, "Mine.iPad.Recommend", (Settings?.Mine?.iPad?.Recommend) ? [Settings.Mine.iPad.Recommend] : []);
	if (!Array.isArray(Settings?.Mine?.iPad?.More)) $.lodash_set(Settings, "Mine.iPad.More", (Settings?.Mine?.iPad?.More) ? [Settings.Mine.iPad.More] : []);
	if (!Array.isArray(Settings?.Region?.Index)) $.lodash_set(Settings, "Region.Index", (Settings?.Region?.Index) ? [Settings.Region.Index] : []);
	console.log(`✅ Set Environment Variables, Settings: ${typeof Settings}, Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//console.log(`✅ Set Environment Variables, Caches: ${typeof Caches}, Caches内容: ${JSON.stringify(Caches)}`, "");
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};
