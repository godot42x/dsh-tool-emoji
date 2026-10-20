# dsh-tool-emoji

[中文](README.zh.md)

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web plugin that replaces tool icons with emoji, **supporting all tools dynamically**.

## ✨ Features

- **Universal tool support** — Works with any DSH tool, not just a hardcoded list
- **30+ default emoji mappings** for common tools
- **Add custom tools** in the settings UI without editing code
- **Per-tool enable/disable** — Mix emoji with default icons
- **Custom emoji or images** — Upload PNG/JPEG/GIF/WebP/BMP (max 1MB, stored in localStorage)
- **Categorized settings** — Tools grouped by function (File operations, Shell, Web & search, etc.)
- **Zero-config defaults** — Popular tools work out of the box

## Default Mappings (30+ tools)

| Category | Tools | Emoji |
|---|---|---|
| **Reasoning** | `think` | 🤔 |
| **File operations** | `read`, `grep`, `glob` | 🧐, 🔍, 📁 |
| | `read_image` | 🖼️ |
| | `edit`, `write`, `str_replace_editor` | ✏️, ✍️, 📝 |
| **Shell** | `bash`, `pwsh` | 💻, 👨‍💻 |
| **Web & search** | `web_fetch`, `web_search`, `platform_search` | 🧐, 🔍, 🔎 |
| | `video_search`, `domain_search`, `weather` | 🎬, 🏢, 🌤️ |
| **Delegation** | `subagent`, `subagent_fork`, `workflow` | 🤖, 🔀, ⚙️ |
| **Job control** | `job_list`, `job_output`, `job_kill` | 📋, 📤, ❌ |
| **Output** | `present` | 🎁 |
| **System** | `skill`, `working_directory` | 📚, 📂 |
| **User interaction** | `ask_user_question` | ❓ |
| **Error state** | Any tool in error | 😫 |

## Screenshots

<img src="assets/tool-icons-working.png" width="180" alt="Tool icons rendered in the chat">
<img src="assets/custom-image-icon.png" width="180" alt="Custom uploaded image used as a tool icon">
<img src="assets/settings-panel.png" width="560" alt="Tool emoji settings panel for customizing emoji and images">

## Installation

```sh
# from GitHub (this fork)
dsh plugin --profile web add git+https://github.com/godot42x/dsh-tool-emoji.git

# or from a local checkout
dsh plugin --profile web add file:./dsh-tool-emoji
```

Then restart the web profile:

```sh
dsh --profile web
```

The plugin does not hot-reload into an already-running Web process.

Uninstall:

```sh
dsh plugin --profile web remove dsh-tool-emoji
```

## How it works

- This plugin does **not** register `tool.call.toolview`, so it does not take over the original tool cards.
- It only injects a small global stylesheet that:
  - hides the built-in leading SVG icon;
  - renders an emoji or image in the same leading cell with `::before`;
  - preserves the title, summary, diff, terminal output, expand/collapse behavior, and all other card details.
- When a tool card is in the error state, the leading error dot is replaced with the error emoji (default 😫).

## Settings / Customization

In the DSH Settings page, open **Tool emoji** to customize every icon:

### Master controls
- **Enable / disable the entire plugin** with the master switch
- View **statistics** — how many tools configured and enabled

### Per-tool configuration
- Each tool has its own card with:
  - **Enable/disable toggle** — Mix emoji with default icons
  - **Custom emoji input** — Type any emoji or text
  - **Image upload** — Use a local image as the icon (PNG/JPEG/GIF/WebP/BMP, max 1MB, stored in localStorage)
  - **Remove image** button to fall back to emoji
  - **Delete tool** button to remove custom entries

### Add new tools
- **"Add new tool" section** — Type any tool name to create a custom mapping
- Tool names must match the `data-tool` or `data-variant` attribute in the DOM
- Unknown tools automatically get a default emoji (🔧)

### Error state
- Configure the emoji shown for **all tools in error state**
- Works independently of individual tool settings

### Reset options
- **Reset all to defaults** — Clear all customizations

All changes **save automatically** to localStorage and **apply immediately** without page refresh.

## dsh-edit-guardian compatibility

If you also use `dsh-edit-guardian`, it replaces the built-in rows for `edit` / `str_replace_editor` / `pwsh` with its own custom DOM (`.dshg_row`).

To make the emoji apply to those custom rows too:

1. Use a `dsh-edit-guardian` build that exposes `data-tool` on `.dshg_row` (the local dev version already does);
2. Reinstall `dsh-edit-guardian` using the same source you installed it from, then reinstall this plugin;
3. Restart the Web profile.

If `dsh-edit-guardian` does not have the `data-tool` attributes, the emoji will not be applied to its custom rows.

## Adding tools manually

While the settings UI lets you add any tool by name, you can also edit the CSS selectors directly in `lib/client.js` if you need more control.

The plugin uses these selectors:
- `[data-tool="<name>"]` for most tools
- `[data-variant="<name>"]` for some tools (like `think`, `read`, `search`)
- `.dshg_row[data-tool="<name>"]` for dsh-edit-guardian compatibility

## Notes

- The selectors rely on official source-level data attributes from DSH
- If a future DSH version changes these DOM structures, the CSS selectors may need updates
- The plugin is Web-profile oriented; TUI/headless profiles have no icon UI surface
- Tool names are **case-sensitive** and must exactly match the DOM attribute
- Images are stored in localStorage as base64 — keep them under 1MB to avoid quota issues

## Migration from v1

This version (v2) uses a new storage key (`dsh-tool-emoji:config:v2`) and structure:

- **Old installs**: Your v1 settings won't migrate automatically. Use "Add new tool" to recreate custom entries.
- **Default behavior**: All tools in `DEFAULT_EMOJI_MAP` are now auto-enabled. Disable individual tools if needed.
- **Custom tools**: You can now add any tool without editing code.

## Changes from upstream

This fork includes:

1. **Universal tool support** — Works with any tool, not just a predefined list
2. **30+ default emoji mappings** covering common DSH tools
3. **Add/delete tools in settings UI** — No code editing required
4. **Categorized settings** — Tools grouped by function
5. **Better UX** — Statistics, better layout, clearer labels
6. **Relaxed `peerDependencies`** to support DSH `^0.2.0`:
   - `@deepseek-ai/cordis`: `^4.0.1 || ^5.0.0`
   - `@deepseek-ai/dsh-client-runtime`: `^0.1.1-rc.2 || ^0.2.0`
   - `react`: `^18.2.0 || ^19.0.0`

Tested on DSH `0.2.1-rc.2`.

## License

MIT
