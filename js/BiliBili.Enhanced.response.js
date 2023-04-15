/*
README: https://github.com/BiliUniverse/Enhanced
*/
const $ = new Env("📺 BiliBili:Enhanced v0.1.4(5) response");
const URL = new URLs();
const DataBase = {
	"Enhanced":{
		"Settings":{"Switch":"true","Home":{"Top_left":"mine","Top":["消息Top"],"Top_more":[],"Tab":["直播tab","推荐tab","hottopic","bangumi","anime","film","koreavtw"],"Tab_default":"bangumi"},"Bottom":["home","dynamic","ogv","会员购Bottom","我的Bottom"]},
		"Configs":{
			"Tab":{"tab":[{"id":39,"name":"直播","uri":"bilibili://live/home","tab_id":"直播tab","pos":1},{"id":40,"name":"推荐","uri":"bilibili://pegasus/promo","tab_id":"推荐tab","pos":2},{"id":41,"name":"热门","uri":"bilibili://pegasus/hottopic","tab_id":"hottopic","pos":3},{"id":545,"name":"追番","uri":"bilibili://pgc/home","tab_id":"bangumi","pos":4},{"id":774,"name":"动画","uri":"bilibili://following/home_activity_tab/6544","tab_id":"anime","pos":4},{"id":151,"name":"影视","uri":"bilibili://pgc/cinema-tab","tab_id":"film","pos":5},{"id":2280,"name":"校园","uri":"bilibili://campus/home_tab","tab_id":"school","pos":6},{"id":136117,"name":"新征程","uri":"bilibili://following/home_activity_tab/136117","tab_id":"165","pos":7,"color":"#DD1225"},{"id":1716,"icon":"http://i0.hdslb.com/bfs/archive/38d2c2669a68eae8a53fc9afaa193aafa5265a78.png","name":"数码","uri":"bilibili://pegasus/vertical/13807","tab_id":"kj","pos":8},{"id":801,"icon":"http://i0.hdslb.com/bfs/archive/38d2c2669a68eae8a53fc9afaa193aafa5265a78.png","name":"韩综","uri":"bilibili://following/home_activity_tab/95636","tab_id":"koreavtw","pos":10}],"top":[{"id":222,"icon":"http://i0.hdslb.com/bfs/archive/734a3b610a953df398bbe6d787944514dcd94a46.png","name":"游戏中心","uri":"bilibili://game_center/home","tab_id":"游戏中心Top","pos":1},{"id":108,"icon":"http://i0.hdslb.com/bfs/archive/9d1c0985b9d0e2da2c2f919cc2ee0e36ea41fd90.png","name":"会员购","uri":"bilibili://mall/home/","tab_id":"会员购Top","pos":2},{"id":176,"icon":"http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png","name":"消息","uri":"bilibili://link/im_home","tab_id":"消息Top","pos":2}],"bottom":[{"id":177,"icon":"http://i0.hdslb.com/bfs/archive/63d7ee88d471786c1af45af86e8cb7f607edf91b.png","icon_selected":"http://i0.hdslb.com/bfs/archive/e5106aa688dc729e7f0eafcbb80317feb54a43bd.png","name":"首页","uri":"bilibili://main/home/","tab_id":"home","pos":1},{"id":103,"icon":"http://i0.hdslb.com/bfs/archive/b4f621f268c1f9eda501805135f132aa9498b0ba.png","icon_selected":"http://i0.hdslb.com/bfs/archive/94539249e59621214f7dc1226cf38a2b8fe4c64f.png","name":"频道","uri":"bilibili://pegasus/channel/","tab_id":"频道Bottom","pos":2},{"id":179,"icon":"http://i0.hdslb.com/bfs/archive/86dfbe5fa32f11a8588b9ae0fccb77d3c27cedf6.png","icon_selected":"http://i0.hdslb.com/bfs/archive/25b658e1f6b6da57eecba328556101dbdcb4b53f.png","name":"动态","uri":"bilibili://following/home/","tab_id":"dynamic","pos":2},{"id":670,"icon":"http://i0.hdslb.com/bfs/feed-admin/c25cabacb40e9df2ccf54c327350e1afc4ae2f8c.png","name":"发布","uri":"bilibili://uper/center_plus?relation_from=center_plus\u0026tab_index=2","tab_id":"publish","pos":3,"dialog_items":[{"id":617,"name":"开直播","icon":"http://i0.hdslb.com/bfs/feed-admin/01f9b3f8ed61a4e59af693da9fcd38fc342ee7e5.png","uri":"activity://liveStreaming/home?source_event=14"},{"id":618,"name":"拍摄","icon":"http://i0.hdslb.com/bfs/feed-admin/30636aa60e594550ec47422e3875b4345e7d6017.png","uri":"bilibili://uper/user_center/add_archive/?from=1\u0026is_new_ui=1\u0026relation_from=center_plus"},{"id":619,"name":"上传","icon":"http://i0.hdslb.com/bfs/feed-admin/55c3c112f4885adc6cce0b4b94149409fd1c147b.png","uri":"bilibili://uper/user_center/add_archive/?from=0\u0026is_new_ui=1\u0026relation_from=center_plus"},{"id":620,"name":"模板创作","icon":"http://i0.hdslb.com/bfs/feed-admin/4e5188d8390754655dee0fdfd90c1088da3cdf90.png","uri":"bilibili://uper/user_center/add_archive/?from=2\u0026is_new_ui=1\u0026relation_from=center_plus"}],"type":3},{"id":690,"icon":"http://i0.hdslb.com/bfs/feed-admin/68b1625cef3a8315d6fe3fbfd2a8b06c905f323a.png","icon_selected":"http://i0.hdslb.com/bfs/feed-admin/1903c6f1dc881ed4c459ab337767fd8436cda159.png","name":"节目","uri":"bilibili://following/home_bottom_tab_activity_tab/168312","tab_id":"ogv","pos":4,"type":4},{"id":242,"icon":"http://i0.hdslb.com/bfs/archive/6090d5fa7ece2a94de839e7cce4f1e774dae7779.png","icon_selected":"http://i0.hdslb.com/bfs/archive/eeaf83fb7157000776dd93f61702a049f56801d3.png","name":"会员购","uri":"bilibili://mall/home","tab_id":"会员购Bottom","pos":4},{"id":105,"icon":"http://i0.hdslb.com/bfs/archive/93dae0f0fb2c9887effb2840800d5b639be69351.png","icon_selected":"http://i0.hdslb.com/bfs/archive/f96bfd9ffea2e51443aed44dba6d76b7b34891c8.png","name":"消息","uri":"bilibili://link/im_home","tab_id":"消息Bottom","pos":4},{"id":181,"icon":"http://i0.hdslb.com/bfs/archive/4b0b2c49ffeb4f0c2e6a4cceebeef0aab1c53fe1.png","icon_selected":"http://i0.hdslb.com/bfs/archive/a54a8009116cb896e64ef14dcf50e5cade401e00.png","name":"我的","uri":"bilibili://user_center/","tab_id":"我的Bottom","pos":5}],"top_more":[{"id":621,"icon":"http://i0.hdslb.com/bfs/feed-admin/f95dfa31c793c857af6e7b65b5387a05f30d31ba.png","name":"更多分区","uri":"bilibili://main/top_category","pos":1},{"id":922,"icon":"http://i0.hdslb.com/bfs/feed-admin/38beac42189ad4d838d20259a5b2cdfd302fef40.png","name":"搜索","uri":"bilibili://search","pos":2}],"top_left":{"mine":{"exp":0,"head_tag":"","url":"bilibili://user_center/","goto":1,"story_background_image":"","story_foreground_image":"","listen_background_image":"","listen_foreground_image":""},"videoshortcut":{"exp":1,"head_tag":"https://i0.hdslb.com/bfs/app/92e7b36c3bd10c850e8a2ba85d19566937751540.png","url":"bilibili://videoshortcut?user_reg_state=0","goto":2,"story_background_image":"http://i0.hdslb.com/bfs/app/7391267ec11cfe99823a8cfd80532a7bc6eca390.png","story_foreground_image":"http://i0.hdslb.com/bfs/app/98098cfd9349b7500c233216169d768cd536d305.png","listen_background_image":"http://i0.hdslb.com/bfs/app/365848675f453e32b42567ba9e249a347a5df061.png","listen_foreground_image":"http://i0.hdslb.com/bfs/app/986ee5e963237d511802c4084c83c2f228e97369.png"}}}
		}
	},
    "Global":{
		"Settings":{"Switch":true,"ForceHost":"1","Locales":["CHN","HKG","TWN"],"Proxies":{"CHN":"DIRECT","HKG":"🇭🇰香港","MAC":"🇲🇴澳门","TWN":"🇹🇼台湾"}}
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
    const { Settings, Caches, Configs } = setENV("BiliBili", "Enhanced", DataBase);
	switch (Settings.Switch) {
		case "true":
		default:
			$.log(`⚠ ${$.name}, 功能开启`, "");
			let url = URL.parse($request.url);
			$.log(`⚠ ${$.name}, url.path=${url.path}`, "");
			// 设置格式
			const Format = $response?.headers?.["content-type"]?.split(";")?.[0]
			//$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");
			// 创建空数据
			let body = { "code": 0, "message": "0", "data": {} };
			// 解析格式
			switch (Format) {
				case "application/json":
					body = JSON.parse($response.body);
					let data = body.data;
					switch (url.host) {
						case "app.bilibili.com":
						case "app.biliapi.net":
							// 先保存一下AccessKey
							/*
							if (url?.params?.access_key) {
								let newCaches = $.getjson("@BiliBili.Global.Caches", {});
								newCaches.AccessKey = url.params.access_key; // 总是刷新
								$.log(`newCaches = ${JSON.stringify(newCaches)}`);
								let isSave = $.setjson(newCaches, "@BiliBili.Global.Caches");
								$.log(`$.setjson ? ${isSave}`);
							};
							*/
							switch (url.path) {
								case "x/resource/show/tab/v2": // 首页-Tab
									// 顶栏-左侧
									data.top_left = Configs.Tab.top_left[Settings.Home.Top_left];
									// 顶栏-右侧
									data.top = Configs.Tab.top.map(e => {
										if (Settings.Home.Top.includes(e.tab_id)) return e;
									}).filter(Boolean).map((e, i) => {
										e.pos = i + 1;
										return e;
									});
									// 标签栏
									data.tab = Configs.Tab.tab.map(e => {
										if (Settings.Home.Tab.includes(e.tab_id)) return e;
									}).filter(Boolean).map((e, i) => {
										if (Settings.Home.Tab_default == e.tab_id) e.default_selected = 1;
										e.pos = i + 1;
										return e;
									});
									// 底部导航栏
									data.bottom = Configs.Tab.bottom.map(e => {
										if (Settings.Bottom.includes(e.tab_id)) return e;
									}).filter(Boolean).map((e,i) => {
										e.pos = i + 1;
										return e;
									});
									break;
								case "x/resource/show/tab/bubble": // 首页-Tab-?
									break;
							};
							break;
					};
					$response.body = JSON.stringify(body);
					break;
				case "text/xml":
					break;
				case "application/x-protobuf":
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
		//$.log(`🚧 ${$.name}, finally`, `$response:${JSON.stringify($response)}`, "");
		$.log(`🎉 ${$.name}, finally`, `$response`, "");
		// 设置格式
		const Format = $response?.headers?.["content-type"]?.split(";")?.[0]
		//$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");
		switch (Format) {
			case "application/json":
			case "text/xml":
			default:
				// 返回普通数据
				if ($.isQuanX()) $.done({ headers: $response.headers, body: $response.body })
				else $.done($response)
				break;
			case "application/x-protobuf":
			case "application/grpc":
				// 返回二进制数据
				if ($.isQuanX()) {
					$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
					$.log(`bodyBytes.byteOffset: ${$response.bodyBytes.byteOffset}}`);
					$.done({ headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
				} else {
					$.log(`${$response.body.byteLength}---${$response.body.buffer.byteLength}`);
					$.done($response)
				}
				break;
			case undefined: // 视为无body
				// 返回普通数据
				if ($.isQuanX()) $.done({ headers: $response.headers })
				else $.done($response)
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
	if (typeof Settings.Home.Top === "string") Settings.Home.Top = Settings.Home.Top.split(",") // BoxJs字符串转数组
	if (typeof Settings.Home.Top_more === "string") Settings.Home.Top_more = Settings.Home.Top_more.split(",") // BoxJs字符串转数组
	if (typeof Settings.Home.Tab === "string") Settings.Home.Tab = Settings.Home.Tab.split(",") // BoxJs字符串转数组
	if (typeof Settings.Bottom === "string") Settings.Bottom = Settings.Bottom.split(",") // BoxJs字符串转数组
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Settings, Caches, Configs }
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:h}=t,n=s.decode(h,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:h,body:n},n)},t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then(t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:h}=t,n=i.decode(h,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:h,body:n},n)},t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o){const r=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()||this.isShadowrocket()?t:this.isQuanX()?{"open-url":t}:this.isSurge()||this.isStash()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()||this.isShadowrocket()||this.isStash()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!(this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash());s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}

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
