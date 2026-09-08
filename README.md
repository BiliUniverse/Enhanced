# 🪐 Biliverse: ⚙️ Enhanced

## 本地设置

本仓库只输出 `template/boxjs.settings.json`，由现有 arguments-builder 从 full argument config 生成设置字段。页面、菜单、设置专用图标、资源映射和独立代理脚本均由 [Biliverse.github.io](https://github.com/Biliverse/Biliverse.github.io/tree/dev/settings) 与 [PreferencePanes](https://github.com/NSNanoCat/PreferencePanes) 维护。

代理模板直接安装 `https://biliverse.github.io/settings/assets/Enhanced.request.js`；设置请求不再经过 Enhanced 的 Request，也不向它传递业务 argument。Surge/Loon 继续使用原生静态 Mock。Enhanced 不依赖 PreferencePanes npm 包，不参与设置页面或通用读写脚本的构建。

App 中的 Biliverse 入口仍由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。要使用页面保存的值，选择 PersistentStore；业务请求按现有 setENV 读取，缺失设置仍用默认值，空数组保留。完整接入和读写说明见托管仓库的 settings/README.md。
