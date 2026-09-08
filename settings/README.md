# Enhanced 的 PreferencePanes 接入

入口、四个模块按钮及页面外壳由 Enhanced 维护；控件、页面缓存、通知和持久化读写来自 `@nsnanocat/preference-panes`，不复制字段列表或为每个设置编写读写代码。

| 路径 | 来源与处理 |
| --- | --- |
| `/settings/` | Enhanced 的 Biliverse 主菜单；每次进入并发 HEAD 四个 `/configs/{module}` |
| `/settings/{module}` | 同一份 HTML，通用组件按 URL 获取模块 BoxJS 并生成控件 |
| `/configs/Enhanced` | 原生 Mock 返回 `settings/assets/Enhanced.boxjs.json` |
| `/api/Enhanced/…` | Enhanced 请求入口调用通用 SettingsHandler.handle，先于 setENV 执行 |

资源下载源都在 `https://biliverse.github.io/settings/assets/`，与 Mock 和 API 路径分开。Surge/Loon 使用原生静态 Mock；其余现有模板经请求脚本读取同一资源源站。未迁移的其它插件不会被误判为支持新版面板。

## 构建和托管

`npm run build:preferences` 使用现有 arguments-builder 从 full argument config 生成 BoxJS，再打包通用浏览器组件。输出的 `dist/settings/` 包括 HTML、JS、CSS 和 Enhanced BoxJS。

在相邻 Biliverse.github.io 仓库运行 `settings:build` 将这些产物复制到 `docs/public/settings/assets/`；该仓库只负责托管，不再生成 Enhanced 的字段表或读写脚本。Enhanced 的生产/开发构建都会生成这些资源；资源需单独提交部署后才能在线使用。

## 设置生效

打开或刷新模块页只读取一次 BoxJS 和一次设置子树；保存/删除只修改对应键，成功后更新页面内存，不再 GET 整个模块。想让本地设置优先于插件参数，应先把“配置类型”保存为 `PersistentStore`。保存其它字段不会暗中改写配置来源。

Enhanced 在 PersistentStore 模式按已保存叶子覆盖默认值，包括取消全部选择的空数组，未设置的字段仍使用默认值。API 删除覆盖值后，页面显示 BoxJS 默认值；插件下一次处理请求时重新读取存储。

当前使用正式发布的 `@nsnanocat/preference-panes@0.1.0`，通过原有 GitHub Packages scope 安装，package-lock.json 固定 registry 下载地址和完整性校验值。

本地下一版接入改为 `new SettingsHandler({ origin, configURL })`，配置下载和解析归通用类负责。该类尚未发布到 registry；这部分改动需与 PreferencePanes 下一版一起验证、更新依赖后再部署，不能直接用于 0.1.0。
