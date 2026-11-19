# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.3] - 2026-11-19

### Changed
- 样式表从「每工具三段规则 + 内联 emoji」改成「每工具一个自定义属性 + 一条通用 \`::before\`」：390 条规则 / 4,112 个选择器 / 409 KB → 70 条规则 / 152 个选择器 / 12.8 KB。
- 设置页改 emoji 只写 \`:root\` 上的 \`--dte-icon-<tool>\`，不再重建整张样式表（旧：每次按键 16.8 ms 重解析；新：变量写入 0 ms，且输入期间按 150 ms 合并）。
- 关闭单项工具只追加两条很小的恢复规则（\`--dte-icon:normal\` + \`display:inline-flex\`），内置 SVG 立即回退。
- 图片仍是 localStorage 里的 base64，但 CSS 只引用转换后的 \`blob:\` URL，1 MB 图片不再把样式表撑到 1.3 MB。
- 设置面板：行改为 \`React.memo\` + 本地输入状态（blur 提交），折叠分组不再预先构造全部行，搜索加 150 ms 防抖。

### Fixed
- 长会话下工具卡插入变慢：2,000 张卡片的批量插入从 129 ms 降到 46 ms（无插件基线 26 ms）；500 张从 32 ms 降到 12 ms（基线 6 ms）。

## [0.3.2] - unreleased（未单独发布，修复已并入 0.3.3）

### Fixed
- 工具卡出现两个图标、鼠标移上去少一个：0.3.1 隐藏的是 leading 里的 `> svg`（其实是 hover 才出现的 chevron），内置图标 `span[class*="iconIdle"]` 一直留着，再叠加 `::before` emoji 就成了两个；DSH 自己的 `@media(hover:hover){.row:hover .iconIdle{opacity:0}}` 又让它在 hover 时消失。
- 选择器改成按真实 DOM 定位：`[data-variant="<tool>"] > span[class*="leading"]`，兼容 `[data-disclosure-row]` 与 `data-tool` 结构；隐藏 `> span[class*="iconIdle"]`（或非 chevron 的首个子节点），保留 chevron。
- 0.3.1 里的 `[data-turn-trigger]` / `[data-generation-continuation]` 在 DSH 0.2.2 并不存在，父子 agent 消息实际是委托工具卡；这两组选择器仅保留给新版本，README 已注明。

## [0.3.1] - 2026-11-17

### Fixed
- `dsh.client.platform` 改回字符串 `"web"`。0.3.0 写成数组会让 parseDshClient 抛错，整层客户端插件一起崩掉。桌面 GUI 走的仍是 web client。
- 工具卡选择器对齐 DSH 0.2.2：leading cell 里 SVG 是直接子节点。
- 出错态改挂在 ToolRow 的 `[data-state="error"]`。
- 覆盖父子 agent 会话消息行：`[data-turn-trigger]` 与 `[data-generation-continuation]`。

### Changed
- 设置页改成总开关 + 搜索 + 按组折叠的紧凑行，去掉 Add tools 步骤。图片上传收成「图片」链接，不再铺原生文件选择器。
- 已知工具默认全部启用。

## [0.3.0] - 2026-10-21

### Added
- **Visual tool picker** with 90+ pre-configured DSH tools
- **Search and filter** tools by name or category
- **Category grouping** (Reasoning, File operations, Shell, Web & search, Delegation, Job control, Memory, Goals & tasks, Scheduling, Office, Other)
- **Grid layout** with tool emoji, name, and "Add" button
- **One-click tool addition** with automatic duplicate prevention
- **Expand/collapse** for tool list (show/hide all tools)
- **Statistics display** showing configured/enabled/available tool counts
- **Desktop platform support** (previously web-only)

### Changed
- Redesigned settings UI with better visual hierarchy
- Improved search UX with real-time filtering
- Better mobile responsiveness for tool grid
- Updated README with comprehensive feature documentation
- Bumped to v0.3.0 to reflect significant feature additions

### Technical
- Forked from [LWLAymh/dsh-tool-emoji](https://github.com/LWLAymh/dsh-tool-emoji)
- Added 90+ tool definitions with categories and default emoji
- Improved localStorage schema (v2) with per-tool enable/disable
- Added `platform: ["web", "desktop"]` support in package.json

## [0.2.4] - (upstream)

Previous versions maintained by [LWLAymh/dsh-tool-emoji](https://github.com/LWLAymh/dsh-tool-emoji).

[0.3.3]: https://github.com/godot42x/dsh-tool-emoji/releases/tag/v0.3.3
[0.3.1]: https://github.com/godot42x/dsh-tool-emoji/releases/tag/v0.3.1
[0.3.0]: https://github.com/godot42x/dsh-tool-emoji/releases/tag/v0.3.0
