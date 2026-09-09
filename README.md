# 🪐 Biliverse: ⚙️ Enhanced

## 本地设置

BoxJS 设置字段由现有 arguments-builder 生成，并与本仓库业务脚本在同一次构建中发布。dev 输出 `BiliBili.Enhanced.dev.boxjs.json` 到现有 Gist；正式版输出 `BiliBili.Enhanced.boxjs.json` 到对应 Release tag。模板中的配置来源与业务脚本使用相同的发布地址，github.io 不托管配置快照。

代理模板仅提供 `/configs/Enhanced` 的 JSON Mock，不安装设置页面或存储 API 规则。Surge/Loon 使用原生远程 JSON Mock；其它平台使用同次构建的 `config[.dev].bundle.js`，它只返回 JSON，没有存储能力。PreferencePanes 是固定版本的构建期依赖，由 Rollup 共用插件生成配置响应与 `settings[.dev].bundle.js`，没有把设置逻辑写入业务 request/response 脚本。

使用设置页面前安装 [PreferencePanes 独立模块](https://github.com/Biliverse/Biliverse.github.io/tree/main/settings#安装)。网站只部署公共 HTML、JS、CSS；设置字段运行时从 `/configs/Enhanced` 取得。含配置目录的存储脚本也随 Enhanced 发布，独立模块默认使用 dev Gist 的 `settings.dev.bundle.js`；正式版可使用同一 Release tag 下的 `settings.bundle.js`。

dev 工作流用一次 Gist API 更新同时发布业务脚本、JSON、配置响应、存储脚本和订阅，避免分文件发布过程出现不一致。正式版的这些文件均在 `dist`，由现有 Release 工作流一起上传，URL 固定到对应 tag。dev Gist 按现有业务脚本惯例滚动更新；正式版按 tag 固定。

App 中的 Biliverse 入口仍由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。要使用页面保存的值，选择 PersistentStore；业务请求按现有 setENV 读取，缺失设置仍用默认值，空数组保留。完整接入和读写说明见托管仓库的 settings/README.md。
