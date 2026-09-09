# 🪐 Biliverse: ⚙️ Enhanced

## 本地设置

本仓库只输出 `template/boxjs.settings.json`，由现有 arguments-builder 从 full argument config 生成设置字段。页面、菜单、设置专用图标、资源映射和独立代理脚本均由 [Biliverse.github.io](https://github.com/Biliverse/Biliverse.github.io/tree/dev/settings) 与 [PreferencePanes](https://github.com/NSNanoCat/PreferencePanes) 维护。

代理模板仅提供 `/configs/Enhanced` 的 BoxJS JSON Mock，不安装设置页面或存储 API 规则。Surge/Loon 使用原生远程 JSON Mock；其它平台的 Enhanced.config.js 只返回嵌入的 JSON，没有读写或页面处理能力。Enhanced 不依赖 PreferencePanes npm 包。

使用设置页面前，另行安装一次 [PreferencePanes 通用模块](https://github.com/Biliverse/Biliverse.github.io/tree/main/settings#安装)。它统一提供页面与 `/api/` 读写，不接管 `/configs/`。主菜单只探测配置 Mock；Enhanced 关闭或不提供配置时，该入口禁用，即使通用模块仍启用也不会生成该设置表单。

App 中的 Biliverse 入口仍由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。要使用页面保存的值，选择 PersistentStore；业务请求按现有 setENV 读取，缺失设置仍用默认值，空数组保留。完整接入和读写说明见托管仓库的 settings/README.md。
