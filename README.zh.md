# dsh-tool-emoji

[English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 插件：用 emoji 替换工具图标，**动态支持所有工具**。

## ✨ 特性

- **通用工具支持** — 适配任意 DSH 工具，不限于硬编码列表
- **30+ 默认 emoji 映射**，覆盖常用工具
- **在设置界面添加自定义工具**，无需改代码
- **单独启用/禁用** — 可混用 emoji 与默认图标
- **自定义 emoji 或图片** — 上传 PNG/JPEG/GIF/WebP/BMP（最大 1MB，存在 localStorage）
- **分类设置** — 工具按功能分组（文件操作、Shell、网络搜索等）
- **开箱即用** — 常用工具默认配置好

## 默认映射（30+ 工具）

| 分类 | 工具 | Emoji |
|---|---|---|
| **推理** | `think` | 🤔 |
| **文件操作** | `read`, `grep`, `glob` | 🧐, 🔍, 📁 |
| | `read_image` | 🖼️ |
| | `edit`, `write`, `str_replace_editor` | ✏️, ✍️, 📝 |
| **Shell** | `bash`, `pwsh` | 💻, 👨‍💻 |
| **网络搜索** | `web_fetch`, `web_search`, `platform_search` | 🧐, 🔍, 🔎 |
| | `video_search`, `domain_search`, `weather` | 🎬, 🏢, 🌤️ |
| **委托** | `subagent`, `subagent_fork`, `workflow` | 🤖, 🔀, ⚙️ |
| **任务控制** | `job_list`, `job_output`, `job_kill` | 📋, 📤, ❌ |
| **输出** | `present` | 🎁 |
| **系统** | `skill`, `working_directory` | 📚, 📂 |
| **用户交互** | `ask_user_question` | ❓ |
| **错误状态** | 任意工具出错时 | 😫 |

## 效果图

<img src="assets/tool-icons-working.png" width="180" alt="聊天中的工具 emoji 图标">
<img src="assets/custom-image-icon.png" width="180" alt="自定义上传图片作为工具图标">
<img src="assets/settings-panel.png" width="560" alt="工具 emoji 设置面板，可自定义 emoji 和上传图片">

## 安装

```sh
# 从 GitHub（本 fork）
dsh plugin --profile web add git+https://github.com/godot42x/dsh-tool-emoji.git

# 或本地 checkout
dsh plugin --profile web add file:./dsh-tool-emoji
```

然后重启 Web profile：

```sh
dsh --profile web
```

插件不会热更新到已运行的 Web 进程。

卸载：

```sh
dsh plugin --profile web remove dsh-tool-emoji
```

## 实现原理

- 本插件**不注册** `tool.call.toolview`，因此不会接管原始工具卡片。
- 只注入一层全局 CSS：
  - 隐藏内置 SVG 图标；
  - 在同一个 leading cell 上用 `::before` 显示 emoji 或图片；
  - 工具卡片的标题、摘要、diff、终端输出、折叠/展开等原有行为全部保留。
- 错误状态仍会保留原卡片，只把 leading 的红色错误点换成错误 emoji（默认 😫）。

## 设置 / 自定义

在 DSH 设置页打开 **Tool emoji**，可自定义每个图标：

### 总控制
- **总开关** 可一键启用/禁用整个插件
- **统计信息** — 显示已配置和已启用的工具数量

### 单工具配置
- 每个工具都有独立卡片，包含：
  - **启用/禁用开关** — 可混用 emoji 与默认图标
  - **自定义 emoji 输入框** — 填写任意 emoji 或文字
  - **图片上传** — 使用本地图片作为图标（PNG/JPEG/GIF/WebP/BMP，最大 1MB，存在 localStorage）
  - **移除图片** 按钮，回退到 emoji
  - **删除工具** 按钮，移除自定义条目

### 添加新工具
- **"添加新工具"区域** — 输入任意工具名创建自定义映射
- 工具名必须匹配 DOM 中的 `data-tool` 或 `data-variant` 属性
- 未知工具会自动获得默认 emoji（🔧）

### 错误状态
- 配置**所有工具出错时**显示的 emoji
- 独立于单个工具设置

### 重置选项
- **全部恢复默认** — 清除所有自定义配置

所有改动**自动保存**到 localStorage，并**即时生效**，无需刷新页面。

## 与 dsh-edit-guardian 兼容

如果你同时安装了 `dsh-edit-guardian`，它会对 `edit` / `str_replace_editor` / `pwsh` 使用自定义工具行（`.dshg_row`），而不是官方 `DisclosureRow`。

为了让 emoji 也覆盖这些自定义行，需要：

1. 使用带 `data-tool` 属性的 `dsh-edit-guardian`（本地开发版已支持）；
2. 按你安装 `dsh-edit-guardian` 的方式重新安装它，并重新安装本插件；
3. 重启 Web。

如果 `dsh-edit-guardian` 没有向 `.dshg_row` 暴露 `data-tool`，这些自定义行的 emoji 不会生效。

## 手动添加工具

虽然设置界面可以按名称添加任意工具，但如果需要更精细的控制，也可以直接编辑 `lib/client.js` 中的 CSS 选择器。

插件使用这些选择器：
- `[data-tool="<name>"]` 用于大多数工具
- `[data-variant="<name>"]` 用于某些工具（如 `think`、`read`、`search`）
- `.dshg_row[data-tool="<name>"]` 用于 dsh-edit-guardian 兼容

## 注意

- 选择器基于 DSH 官方源码中的 data attribute
- 如果后续 DSH 更新改变了这些 DOM 结构，CSS 选择器可能需要同步调整
- 该插件是 Web profile 专用；TUI/headless 没有图标 UI
- 工具名**区分大小写**，必须与 DOM 属性完全匹配
- 图片以 base64 存在 localStorage — 控制在 1MB 以内以免超限

## 从 v1 迁移

本版本（v2）使用新的存储键（`dsh-tool-emoji:config:v2`）和结构：

- **旧安装**：v1 设置不会自动迁移。使用"添加新工具"重建自定义条目。
- **默认行为**：`DEFAULT_EMOJI_MAP` 中的所有工具现在默认启用。可按需禁用单个工具。
- **自定义工具**：现在可以在界面添加任意工具，无需改代码。

## 与上游的差异

本 fork 包含以下改动：

1. **通用工具支持** — 适配任意工具，不限于预定义列表
2. **30+ 默认 emoji 映射**，覆盖常用 DSH 工具
3. **在设置界面添加/删除工具** — 无需改代码
4. **分类设置** — 工具按功能分组
5. **更好的用户体验** — 统计信息、更好的布局、更清晰的标签
6. **放宽 `peerDependencies`** 以支持 DSH `^0.2.0`：
   - `@deepseek-ai/cordis`: `^4.0.1 || ^5.0.0`
   - `@deepseek-ai/dsh-client-runtime`: `^0.1.1-rc.2 || ^0.2.0`
   - `react`: `^18.2.0 || ^19.0.0`

已在 DSH `0.2.1-rc.2` 上测试。

## License

MIT
