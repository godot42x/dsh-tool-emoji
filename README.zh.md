# dsh-tool-emoji

[English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件：用 emoji 替换工具图标，**支持 90+ DSH 工具的可视化选择器**。

**支持平台**：Web GUI + Desktop GUI

## ✨ 特性

- **可视化工具选择器** — 浏览并添加 90+ 预配置 DSH 工具
- **搜索与过滤** — 按名称或分类查找工具
- **一键自定义** — 点击"添加"，然后自定义 emoji 或上传图片
- **单独启用/禁用** — 可混用 emoji 与默认图标
- **自定义 emoji 或图片** — 上传 PNG/JPEG/GIF/WebP/BMP（最大 1MB，存在 localStorage）
- **分类界面** — 工具按功能分组（文件操作、Shell、网络搜索等）
- **开箱即用** — 常用工具默认配置好

## 默认映射（90+ 工具）

插件包含 90+ 工具的 emoji 映射，分为以下类别：

| 分类 | 示例 | Emoji 示例 |
|---|---|---|
| **推理** | `think` | 🤔 |
| **文件操作** | `read`, `write`, `edit`, `grep`, `glob`, `read_image` | 🧐, ✍️, ✏️, 🔍, 📁, 🖼️ |
| **Shell** | `bash`, `pwsh` | 💻, 👨‍💻 |
| **网络搜索** | `web_fetch`, `web_search`, `research`, `weather` | 🌐, 🔍, 📚, 🌤️ |
| **委托** | `subagent`, `workflow`, `spawn_teammate` | 🤖, ⚙️, 👥 |
| **任务控制** | `job_list`, `job_output`, `job_kill` | 📋, 📤, ❌ |
| **记忆** | `mnemon_recall`, `mnemon_remember`, `mnemon_document_search` | 🧠, 💭, 📄 |
| **目标与任务** | `create_goal`, `task_board_create`, `todo_write` | 🎯, 📋, 📝 |
| **调度** | `schedule_create`, `schedule_list` | ⏰, 📅 |
| **Office** | `office_docx`, `office_xlsx`, `office_pptx` | 📄, 📊, 📊 |
| **其他** | `plugin_manager`, `list_subagent_models` | 🔌, 🏷️ |
| **错误状态** | 任意工具出错时 | 😫 |

完整列表见设置界面。

## 效果图

<img src="assets/tool-icons-working.png" width="180" alt="聊天中的工具 emoji 图标">
<img src="assets/custom-image-icon.png" width="180" alt="自定义上传图片作为工具图标">
<img src="assets/settings-panel.png" width="560" alt="工具 emoji 设置面板，可自定义 emoji 和上传图片">

## 安装

### 桌面应用（GUI）

1. 打开 **设置 → Web 插件**（或 **插件**）
2. 点击 **+ 从 URL 安装**（或类似的添加插件按钮）
3. 输入：`https://github.com/godot42x/dsh-tool-emoji`
4. 点击 **安装**
5. 重启应用

### 命令行（Web profile 或高级用户）

```sh
# 从 GitHub（本 fork）
dsh plugin --profile web add git+https://github.com/godot42x/dsh-tool-emoji.git

# 或本地 checkout
dsh plugin --profile web add file:./dsh-tool-emoji
```

然后重启 profile：

```sh
dsh --profile web
```

插件不会热更新到已运行的进程 — 需要重启。

### 卸载

- **桌面应用**：设置 → Web 插件 → 找到 `dsh-tool-emoji` → 移除
- **命令行**：`dsh plugin --profile web remove dsh-tool-emoji`

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
- **统计信息** — 显示已配置、已启用和可用的工具数量

### 已配置工具
- 每个已添加的工具都有独立卡片，包含：
  - **启用/禁用开关** — 可混用 emoji 与默认图标
  - **自定义 emoji 输入框** — 填写任意 emoji 或文字
  - **图片上传** — 使用本地图片作为图标（PNG/JPEG/GIF/WebP/BMP，最大 1MB）
  - **移除图片** 按钮，回退到 emoji
  - **删除** 按钮，从配置中移除

### 添加工具
- **可视化工具选择器** — 浏览 90+ 预配置 DSH 工具
- **搜索/过滤** — 按名称或分类查找工具
- **网格布局** — 每个工具显示 emoji、名称和"添加"按钮
- **一键添加** — 添加后工具自动隐藏（避免重复）
- **展开/折叠** — "显示全部"展开完整列表

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

## 添加自定义工具

可视化选择器包含 90+ 已知 DSH 工具。如果需要列表中没有的工具：

1. 只要该工具使用标准 `data-tool` 或 `data-variant` 属性，插件仍可工作
2. 未知工具会获得默认 emoji（🔧）
3. 可以手动编辑 `lib/client.js` 中的 `ALL_KNOWN_TOOLS` 添加更多工具

## 注意

- 选择器基于 DSH 官方源码中的 data attribute
- 如果后续 DSH 更新改变了这些 DOM 结构，CSS 选择器可能需要同步调整
- 该插件是 Web profile 专用；TUI/headless 没有图标 UI
- 工具名**区分大小写**，必须与 DOM 属性完全匹配
- 图片以 base64 存在 localStorage — 控制在 1MB 以内以免超限

## 从 v1 迁移

本版本（v2）使用新的存储键（`dsh-tool-emoji:config:v2`）和结构：

- **旧安装**：v1 设置不会自动迁移。使用可视化工具选择器重新添加工具。
- **默认行为**：工具必须通过选择器显式添加（不再自动启用）。
- **90+ 工具可用**：预配置工具列表大幅扩展。

## 与上游的差异

**Fork 自**：[LWLAymh/dsh-tool-emoji](https://github.com/LWLAymh/dsh-tool-emoji)

**为什么要 fork？** 原始仓库已停止维护，并且缺失多个 DSH 工具支持。本 fork 保持插件活跃，扩展至完整 DSH 生态。

本 fork 新增：

1. **缺失工具覆盖**
   - 新增 `read_image`、`sidebar_open`、`cordis_*` 及另外 30+ 个上游从未覆盖的工具的 emoji
   - 完整的 `view-*` 子工具映射（用于 `mnemon_view_action` 和 `mnemon_view_route`）

2. **Desktop 平台支持**
   - 上游仅在 Web GUI 工作
   - 现在同时支持 **Web 和 Desktop** 应用
   - 已在 DSH Desktop `0.2.1-rc.2` 上验证安装

3. **完整工具选择器**（90+ 工具）
   - 可视化工具浏览器，按分类分组
   - 按工具名搜索和过滤
   - 一键启用，无需手动输入 `data-tool`

4. **现代 DSH 兼容性**
   - 放宽 `peerDependencies` 以支持 DSH `^0.2.0`：
     - `@deepseek-ai/cordis`: `^4.0.1 || ^5.0.0`
     - `@deepseek-ai/dsh-client-runtime`: `^0.1.1-rc.2 || ^0.2.0`
     - `react`: `^18.2.0 || ^19.0.0`
   - 已在 DSH `0.2.1-rc.2` 上测试

5. **更好的用户体验**
   - 统计面板（已配置/已启用/可用工具数量）
   - 网格布局，支持展开/折叠
   - 每个工具独立的启用/禁用开关
   - 所有改动自动保存

**许可证说明**：本 fork 保持 MIT 许可证，与上游的 MIT 许可证一致。版权归属保留在 `LICENSE` 中。

## License

MIT
