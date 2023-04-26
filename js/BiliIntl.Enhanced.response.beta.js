/*
README: https://github.com/BiliUniverse/Enhanced
*/
const $ = new Env("📺 BiliIntl:Enhanced v0.1.4(4) response.beta");
const URL = new URLs();
const DataBase = {
	"Enhanced":{
		"Settings":{"Switch":"true","Home":{"Tab":["for_you_tab","animation_tab","gaming_tab"],"Tab_default":"for_you_tab"},"Following":{"Tab":["following_tab"],"Tab_default":"following_tab"},"Bottom":["home","search","following","me"]},
		"Configs": {
			"Tab":{"bottom":[{"uri":"bstar:\/\/main\/intl-home?search_hidden=1","tab_id":"home","tab":[{"id":121,"tab_id":"for_you_tab","default_selected":1,"name":"推荐","uri":"bstar:\/\/pegasus\/promo?bottom_tab_id=465&top_tab_id=1"},{"id":1,"tab_id":"animation_tab","name":"番剧","uri":"bstar:\/\/anime\/cartoon?page_id=360003"},{"id":122,"tab_id":"gaming_tab","name":"游戏类","uri":"bstar:\/\/activity\/home\/10002"}],"id":465,"icon_selected":"https:\/\/p.bstarstatic.com\/management\/1a785c1715abd764ef3be465976b9c6f.png","icon":"https:\/\/p.bstarstatic.com\/management\/fb4a81e2045b30104596136229b1f78b.png","name":"首页"},{"id":501,"icon":"https:\/\/p.bstarstatic.com\/management\/3887a8c82a5ce529319f2fcfd9609ec1.png","icon_selected":"https:\/\/p.bstarstatic.com\/management\/decf6fed81b2812c63d9284f8e49f0cb.png","name":"发现","uri":"bstar:\/\/main\/search-home","tab_id":"search"},{"id":500,"icon":"https:\/\/p.bstarstatic.com\/management\/b85f07d4cf6474ab2c5c67e501e1a94e.png","tab_id":"edit","uri":"bstar:\/\/uper\/center_plus?tab_index=2&nav_pos=1","can_jump":1},{"uri":"bstar:\/\/main\/following-home","tab_id":"following","tab":[{"id":467,"tab_id":"following_tab","name":"关注","uri":"bstar:\/\/main\/subscriptions\/"}],"id":502,"icon_selected":"https:\/\/p.bstarstatic.com\/management\/c884a38f69097aea37b2700ccff52451.png","icon":"https:\/\/p.bstarstatic.com\/management\/85dfc913cb0ad54bec080c97ebfebdbf.png","name":"关注"},{"id":446,"icon":"https:\/\/p.bstarstatic.com\/management\/3ee2792129480bf330e7a6c1fd1743d0.png","icon_selected":"https:\/\/p.bstarstatic.com\/management\/a8e9dfa004ec3dc5be719483020787bb.png","name":"我的","uri":"bstar:\/\/user_center\/mine\/","tab_id":"me"}]}
		}
	},
    "Global":{
		"Settings":{"Switch":true,"ForceHost":"1","Locales":["HKG","TWN","USA","SGP"],"Proxies":{"HKG":"🇭🇰香港","MAC":"🇲🇴澳门","TWN":"🇹🇼台湾","USA":"🇺🇸美国","SGP":"🇸🇬新加坡","MYA":"🇲🇾马来西亚","THA":"🇹🇭泰国"}},
		"Configs":{
			"SearchNav":{"HKG":{"name":"动画🇭🇰","total":0,"pages":0,"type":27},"MAC":{"name":"动画🇲🇴","total":0,"pages":0,"type":37},"TWN":{"name":"动画🇹🇼","total":0,"pages":0,"type":47},"INTL":{"name":"动画🇺🇳","total":0,"pages":0,"type":57}}
		}
	},
	"Roaming":{
		"Settings":{"Switch":"true","Proxy":{"Pool":["xn--2vrub.plus","api.qiu.moe","xn--2vrub.icu","xn--n4yr07d.xn--6qq986b3xl","xn--3dz622b.xn--n4y597a0mfle743a.icu","bili.tuturu.top","xn--7rv796dvkm.xn--6qq986b3xl","xn--7ovr3tf1cxr4d.fun","xn--8fv56a330gjea.icu","xn--qoqt3y678a.xn--6qq986b3xl","atri.ink","xn--kiv440b.xn--6qq986b3xl","xn--w4r620anpl.xn--oor00vs23b.icu","xn--chqwq129p.pch.pub","melusinesuki.site","bili.takami.ink"],"Customs":""}}
	},
	"Default": {
		"Settings":{"Switch":"true"}
	}
};

// headers转小写
for (const [key, value] of Object.entries($request.headers)) {
	delete $request.headers[key]
	$request.headers[key.toLowerCase()] = value
};
for (const [key, value] of Object.entries($response.headers)) {
	delete $response.headers[key]
	$response.headers[key.toLowerCase()] = value
};

/***************** Processing *****************/
!(async () => {
	const { Settings, Caches, Configs } = setENV("BiliIntl", "Enhanced", DataBase);
	switch (Settings.Switch) {
		case "true":
		default:
			$.log(`⚠ ${$.name}, 功能开启`, "");
			let url = URL.parse($request.url);
			$.log(`⚠ ${$.name}, url.path=${url.path}`, "");
			// 设置格式
			const Format = $response?.headers?.["content-type"]?.split(";")?.[0]
			$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");
			// 创建空数据
			let body = { "code": 0, "message": "0", "data": {} };
			// 解析格式
			switch (Format) {
				case "application/json":
				body = JSON.parse($response.body);
					let data = body.data;
					switch (url.host) {
						case "app.biliintl.com":
							// 先保存一下AccessKey
							if (url?.params?.access_key) {
								let newCaches = $.getjson("@BiliIntl.Global.Caches", {});
								newCaches.AccessKey = url.params.access_key; // 总是刷新
								$.log(`newCaches = ${JSON.stringify(newCaches)}`);
								let isSave = $.setjson(newCaches, "@BiliIntl.Global.Caches");
								$.log(`$.setjson ? ${isSave}`);
							};
							switch (url.path) {
								case "intl/gateway/v2/app/resource/show/tab": // 首页-Tab
									// 底部导航栏
									data.bottom = Configs.Tab.bottom.map(bottom => {
										// 标签栏
										bottom.tab = bottom.tab.map(tab => {
											switch (tab.tab_id) {
												case "home":
													if (Settings.Home.Tab_default == tab.tab_id) tab.default_selected = 1;
													if (Settings.Home.Tab.includes(tab.tab_id)) return tab;
													break;
												case "following":
													if (Settings.Following.Tab_default == tab.tab_id) tab.default_selected = 1;
													if (Settings.Following.Tab.includes(tab.tab_id)) return tab;
											};
										}).filter(Boolean);
										if (Settings.Bottom.includes(bottom.tab_id)) return bottom;
									}).filter(Boolean).map((bottom, i) => {
										bottom.pos = i + 1;
										return bottom;
									});
									break;
							};
							break;
					};
					$response.body = JSON.stringify(body);
					break;
				case "text/xml":
					break;
				case "application/x-protobuf":
					/******************  initialization start  *******************/
					/******************  initialization finish  *******************/
					let rawBody = $.isQuanX() ? new Uint8Array($request.bodyBytes) : $request.body;
					break;
				default:
					break;
			};
			break;
		case "false":
			$.log(`⚠ ${$.name}, 功能关闭`, "");
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		// 设置格式
		const Format = $response?.headers?.["content-type"]?.split(";")?.[0]
		$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");
		switch (Format) {
			case "application/json":
			case "text/xml":
			default:
				if ($.isQuanX()) $.done({ headers: $response.headers, body: $response.body })
				else $.done($response)
				break;
			case "application/x-protobuf":
				if ($.isQuanX()) {
					$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
					$.log(`bodyBytes.byteOffset: ${$response.bodyBytes.byteOffset}}`);
					$.done({ headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
				} else {
					$.log(`${$response.body.byteLength}---${$response.body.buffer.byteLength}`);
					$.done($response)
				}
				break;
		};
	})

/***************** Function *****************/
/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} platform - Platform Name
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platform, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getENV(name, platform, database);
	/***************** Prase *****************/
	//Settings.Switch = JSON.parse(Settings.Switch) // BoxJs字符串转Boolean
	if (typeof Settings.Home.Tab === "string") Settings.Home.Tab = Settings.Home.Tab.split(",") // BoxJs字符串转数组
	if (typeof Settings.Following.Tab === "string") Settings.Following.Tab = Settings.Following.Tab.split(",") // BoxJs字符串转数组
	if (typeof Settings.Bottom === "string") Settings.Bottom = Settings.Bottom.split(",") // BoxJs字符串转数组
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Settings, Caches, Configs };
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t);break;case"Node.js":this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

// https://github.com/DualSubs/URL/blob/main/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.2",this.opts=s,this.json={scheme:"",host:"",path:"",params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.path||(t.path=""),t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)l(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},f={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},o=i?.[e]?.Caches||{};return"string"==typeof o&&(o=JSON.parse(o)),{Settings:g,Caches:o,Configs:f};function l(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}
