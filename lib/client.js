window.__ModuleLoader__.load({
  id: "dsh-tool-emoji",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var React = require("react");
    var h = React.createElement;

    var STORAGE_KEY = "dsh-tool-emoji:config:v2";
    var TAG_ID = "dsh-tool-emoji/tool-icons.module.css";

    // Comprehensive list of DSH tools with default emoji and categories
    var ALL_KNOWN_TOOLS = {
      // Reasoning
      think: { emoji: "🤔", category: "Reasoning" },
      
      // File operations
      read: { emoji: "🧐", category: "File operations" },
      read_image: { emoji: "🖼️", category: "File operations" },
      write: { emoji: "✍️", category: "File operations" },
      edit: { emoji: "✏️", category: "File operations" },
      str_replace_editor: { emoji: "📝", category: "File operations" },
      grep: { emoji: "🔍", category: "File operations" },
      glob: { emoji: "📁", category: "File operations" },
      
      // Shell
      bash: { emoji: "💻", category: "Shell" },
      pwsh: { emoji: "👨‍💻", category: "Shell" },
      
      // Web & search
      web_fetch: { emoji: "🌐", category: "Web & search" },
      web_search: { emoji: "🔍", category: "Web & search" },
      search: { emoji: "🔎", category: "Web & search" },
      advanced_search: { emoji: "🔬", category: "Web & search" },
      multi_search: { emoji: "🔀", category: "Web & search" },
      platform_search: { emoji: "🏢", category: "Web & search" },
      video_search: { emoji: "🎬", category: "Web & search" },
      domain_search: { emoji: "🏛️", category: "Web & search" },
      research: { emoji: "📚", category: "Web & search" },
      weather: { emoji: "🌤️", category: "Web & search" },
      cache_search: { emoji: "💾", category: "Web & search" },
      
      // Delegation
      subagent: { emoji: "🤖", category: "Delegation" },
      subagent_fork: { emoji: "🔀", category: "Delegation" },
      workflow: { emoji: "⚙️", category: "Delegation" },
      spawn_teammate: { emoji: "👥", category: "Delegation" },
      send_message: { emoji: "💬", category: "Delegation" },
      wait_agent: { emoji: "⏳", category: "Delegation" },
      list_agents: { emoji: "👨‍👩‍👧‍👦", category: "Delegation" },
      interrupt_agent: { emoji: "🛑", category: "Delegation" },
      switch_agent_model: { emoji: "🎛️", category: "Delegation" },
      __turn_trigger: { emoji: "💬", category: "Messages" },
      __continuation: { emoji: "▶️", category: "Messages" },
      
      // Job control
      job_list: { emoji: "📋", category: "Job control" },
      job_output: { emoji: "📤", category: "Job control" },
      job_kill: { emoji: "❌", category: "Job control" },
      
      // Memory & documents
      mnemon_recall: { emoji: "🧠", category: "Memory" },
      mnemon_remember: { emoji: "💭", category: "Memory" },
      mnemon_forget: { emoji: "🗑️", category: "Memory" },
      mnemon_document_search: { emoji: "📄", category: "Memory" },
      mnemon_document_create: { emoji: "📝", category: "Memory" },
      mnemon_runtime_memory: { emoji: "⚡", category: "Memory" },
      
      // System
      skill: { emoji: "📚", category: "System" },
      working_directory: { emoji: "📂", category: "System" },
      present: { emoji: "🎁", category: "System" },
      ask_user_question: { emoji: "❓", category: "System" },
      sidebar_open: { emoji: "🪟", category: "System" },
      
      // Goals & tasks
      create_goal: { emoji: "🎯", category: "Goals & tasks" },
      get_goal: { emoji: "📌", category: "Goals & tasks" },
      update_goal: { emoji: "✅", category: "Goals & tasks" },
      todo_write: { emoji: "📝", category: "Goals & tasks" },
      task_board_create: { emoji: "📋", category: "Goals & tasks" },
      task_board_list: { emoji: "📊", category: "Goals & tasks" },
      task_board_get: { emoji: "📄", category: "Goals & tasks" },
      task_board_update: { emoji: "✏️", category: "Goals & tasks" },
      task_board_run: { emoji: "▶️", category: "Goals & tasks" },
      
      // Scheduling
      schedule_create: { emoji: "⏰", category: "Scheduling" },
      schedule_list: { emoji: "📅", category: "Scheduling" },
      schedule_update: { emoji: "⏱️", category: "Scheduling" },
      schedule_delete: { emoji: "🗑️", category: "Scheduling" },
      
      // Office documents
      office: { emoji: "📎", category: "Office" },
      office_docx: { emoji: "📄", category: "Office" },
      office_xlsx: { emoji: "📊", category: "Office" },
      office_pptx: { emoji: "📊", category: "Office" },
      
      // Other
      plugin_manager: { emoji: "🔌", category: "Other" },
      list_subagent_models: { emoji: "🏷️", category: "Other" },
      load_workspace_dependencies: { emoji: "📦", category: "Other" }
    };

    var DEFAULT_CONFIG = {
      enabled: true,
      tools: {},
      error: { enabled: true, emoji: "😫", image: null },
      defaultEmoji: "🔧"
    };

    var CATEGORY_LABELS = {
      "Reasoning": "推理",
      "File operations": "文件",
      "Shell": "终端",
      "Web & search": "搜索",
      "Delegation": "委托 / Agent",
      "Messages": "会话消息",
      "Job control": "任务",
      "Memory": "记忆",
      "System": "系统",
      "Goals & tasks": "目标",
      "Scheduling": "调度",
      "Office": "Office",
      "Other": "其他"
    };

    var CATEGORY_ORDER = [
      "Delegation", "Messages", "File operations", "Shell", "Web & search",
      "Reasoning", "Job control", "Memory", "Goals & tasks", "Scheduling",
      "System", "Office", "Other"
    ];

    var OPEN_BY_DEFAULT = { Delegation: true, Messages: true };

    var SURFACE_LABELS = {
      __turn_trigger: "智能体消息",
      __continuation: "续写回执"
    };


    var PANEL_CSS = [
      ".dte-panel{display:flex;flex-direction:column;gap:12px;padding:4px 0;font-size:13px;color:var(--dsw-alias-label-primary)}",
      ".dte-hint{font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.5}",
      ".dte-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px}",
      ".dte-stats{font-size:12px;color:var(--dsw-alias-label-secondary)}",
      ".dte-search input{width:100%;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px 12px;font-size:13px;outline:none}",
      ".dte-search input:focus{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-cat{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}",
      ".dte-cat-head{display:flex;align-items:center;justify-content:space-between;width:100%;padding:8px 12px;background:transparent;border:0;color:inherit;cursor:pointer;font:inherit}",
      ".dte-cat-head:hover{background:var(--dsw-alias-bg-layer-2)}",
      ".dte-cat-title{font-size:12px;font-weight:600;letter-spacing:.02em}",
      ".dte-cat-count{font-size:11px;color:var(--dsw-alias-label-tertiary)}",
      ".dte-cat-body{display:flex;flex-direction:column;gap:4px;padding:0 8px 8px}",
      ".dte-row{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px}",
      ".dte-row:hover{background:var(--dsw-alias-bg-layer-2)}",
      ".dte-preview{width:22px;height:22px;flex:none;display:inline-flex;align-items:center;justify-content:center;font-size:16px;line-height:1}",
      ".dte-preview img{max-width:100%;max-height:100%;object-fit:contain}",
      ".dte-name{flex:1 1 auto;min-width:0;font-family:ui-monospace,monospace;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".dte-row input[type=text]{width:56px;flex:none;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;padding:4px 6px;font-size:14px;text-align:center;outline:none}",
      ".dte-row input[type=text]:focus{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-link input[type=file]{position:absolute;width:0;height:0;opacity:0;overflow:hidden}",
      ".dte-switch{position:relative;width:34px;height:20px;border-radius:999px;background:var(--dsw-alias-border-l1);cursor:pointer;flex:none;transition:background .15s ease;display:inline-block}",
      ".dte-switch input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}",
      ".dte-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .15s ease}",
      ".dte-switch.on{background:var(--dsw-alias-brand-primary)}",
      ".dte-switch.on::after{transform:translateX(14px)}",
      ".dte-link{position:relative;background:none;border:0;padding:0;color:var(--dsw-alias-brand-primary);cursor:pointer;font-size:11px;flex:none;white-space:nowrap}",
      ".dte-link:hover{text-decoration:underline}",
      ".dte-button{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;white-space:nowrap}",
      ".dte-button:hover{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-button.danger:hover{border-color:#e5484d;color:#e5484d}",
      ".dte-notice{color:var(--dsw-alias-label-secondary);font-size:12px;padding:8px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}",
      ".dte-foot{display:flex;align-items:center;gap:8px;flex-wrap:wrap}"
    ].join("\n");

    function injectPanelCss() {
      var tagId = "dsh-tool-emoji/settings.module.css";
      if (typeof document === "undefined") return;
      if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
        var tag = document.createElement("style");
        tag.dataset.plugin = "dsh-tool-emoji";
        tag.dataset.pluginCss = tagId;
        tag.textContent = PANEL_CSS;
        document.head.appendChild(tag);
      }
    }

    function defaultConfig() {
      return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }

    function loadConfig() {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") return defaultConfig();
      try {
        var raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultConfig();
        var parsed = JSON.parse(raw);
        var out = defaultConfig();
        if (parsed && typeof parsed.enabled === "boolean") out.enabled = parsed.enabled;
        if (parsed && typeof parsed.defaultEmoji === "string") out.defaultEmoji = parsed.defaultEmoji;
        if (parsed && parsed.tools) {
          out.tools = parsed.tools;
        }
        if (parsed && parsed.error) {
          out.error = parsed.error;
        }
        return out;
      } catch (_) {
        return defaultConfig();
      }
    }

    function saveConfig(config) {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") return false;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        return true;
      } catch (_) {
        return false;
      }
    }

    function getToolConfig(config, toolName) {
      if (config.tools[toolName]) {
        return config.tools[toolName];
      }
      var known = ALL_KNOWN_TOOLS[toolName];
      var emoji = known ? known.emoji : config.defaultEmoji;
      return { enabled: true, emoji: emoji, image: null };
    }

    function isSurface(tool) {
      return tool === "__turn_trigger" || tool === "__continuation";
    }

    var SHELL_TOOLS = { pwsh: 1, bash: 1, edit: 1, write: 1, str_replace_editor: 1 };
    var ICON_VAR = "--dte-icon-";
    var IMG_VAR = "--dte-img-";
    var DEFAULT_ICON_VAR = "--dte-icon-default";
    var ERROR_ICON_VAR = "--dte-icon-error";
    var ERROR_IMG_VAR = "--dte-img-error";

    var PSEUDO_STYLE = "content:var(--dte-icon,normal);display:inline-block;min-width:16px;min-height:16px;background-image:var(--dte-img,none);background-size:contain;background-position:center;background-repeat:no-repeat;font-size:14px;line-height:16px;text-align:center;user-select:none;white-space:nowrap";

    var SHOW_SELECTORS = [
      ':is([data-variant],[data-tool]) > :is(span,button)[class*="leading"]::before',
      ':is([data-variant],[data-tool]) [data-disclosure-row] > :is(span,button)[class*="leading"]::before',
      '[data-turn-trigger] > button > span:first-child::before',
      '[data-generation-continuation] > span:first-child::before'
    ];

    var HIDE_SELECTORS = [
      ':is([data-variant],[data-tool]) > :is(span,button)[class*="leading"] > :first-child',
      ':is([data-variant],[data-tool]) [data-disclosure-row] > :is(span,button)[class*="leading"] > :first-child',
      '.dshg_row[data-tool] > .dshg_leading > :first-child',
      '[data-turn-trigger] > button > span:first-child > svg',
      '[data-generation-continuation] > span:first-child > svg'
    ];

    function toolSelector(tool) {
      return ':is([data-variant="' + tool + '"],[data-tool="' + tool + '"])';
    }

    function toolKeys(config) {
      var list = [];
      for (var known in ALL_KNOWN_TOOLS) list.push(known);
      for (var custom in config.tools) {
        if (list.indexOf(custom) === -1) list.push(custom);
      }
      return list;
    }

    function leadingSelectors(tool) {
      if (tool === "__turn_trigger") return ["[data-turn-trigger] > button > span:first-child"];
      if (tool === "__continuation") return ["[data-generation-continuation] > span:first-child"];
      var sel = toolSelector(tool);
      return [
        sel + ' > :is(span,button)[class*="leading"]',
        sel + ' [data-disclosure-row] > :is(span,button)[class*="leading"]'
      ];
    }

    // The sheet is static: each tool only maps a variable, and disabled tools get
    // two small restore rules. Editing an emoji never rebuilds this sheet.
    function buildCss(config) {
      if (!config.enabled) return "";
      var lines = [];
      var keys = toolKeys(config);
      lines.push("[data-variant],[data-tool]{--dte-icon:var(" + DEFAULT_ICON_VAR + ",normal);--dte-img:var(--dte-img-default,none)}");
      for (var i = 0; i < keys.length; i++) {
        var tool = keys[i];
        if (isSurface(tool)) continue;
        lines.push(toolSelector(tool) + "{--dte-icon:var(" + ICON_VAR + tool + ",var(" + DEFAULT_ICON_VAR + ",normal));--dte-img:var(" + IMG_VAR + tool + ",none)}");
      }
      lines.push("[data-turn-trigger]{--dte-icon:var(" + ICON_VAR + "__turn_trigger,var(" + DEFAULT_ICON_VAR + ",normal));--dte-img:var(" + IMG_VAR + "__turn_trigger,none)}");
      lines.push("[data-generation-continuation]{--dte-icon:var(" + ICON_VAR + "__continuation,var(" + DEFAULT_ICON_VAR + ",normal));--dte-img:var(" + IMG_VAR + "__continuation,none)}");
      lines.push(SHOW_SELECTORS.join(",") + "{" + PSEUDO_STYLE + "}");
      lines.push(HIDE_SELECTORS.join(",") + "{display:none!important}");
      for (var j = 0; j < keys.length; j++) {
        var name = keys[j];
        var item = getToolConfig(config, name);
        if (item.enabled) continue;
        if (isSurface(name)) {
          var surface = name === "__turn_trigger" ? "[data-turn-trigger]" : "[data-generation-continuation]";
          lines.push(surface + "{--dte-icon:normal;--dte-img:none}");
          lines.push(surface + " > button > span:first-child > svg," + surface + " > span:first-child > svg{display:inline!important}");
          continue;
        }
        var sel = toolSelector(name);
        lines.push(sel + "{--dte-icon:normal;--dte-img:none}");
        lines.push(sel + ' > :is(span,button)[class*="leading"] > :first-child,' + sel + ' [data-disclosure-row] > :is(span,button)[class*="leading"] > :first-child{display:inline-flex!important}');
        if (SHELL_TOOLS[name]) lines.push('.dshg_row[data-tool="' + name + '"] > .dshg_leading > :first-child{display:inline-flex!important}');
      }
      if (config.error && config.error.enabled) {
        lines.push('[data-variant][data-state="error"],[data-tool][data-state="error"],.dshg_row[data-state="error"]{--dte-icon:var(' + ERROR_ICON_VAR + ",var(" + DEFAULT_ICON_VAR + ',normal));--dte-img:var(' + ERROR_IMG_VAR + ",none)}");
      }
      return lines.join("\n");
    }

    function styleTag() {
      return typeof document === "undefined" ? null : document.querySelector("style[data-plugin-css=" + JSON.stringify(TAG_ID) + "]");
    }

    function applyStatic(config) {
      if (typeof document === "undefined" || !document.head) return;
      var tag = styleTag();
      var css = buildCss(config);
      if (tag === null) {
        tag = document.createElement("style");
        tag.dataset.plugin = "dsh-tool-emoji";
        tag.dataset.pluginCss = TAG_ID;
        tag.textContent = css;
        document.head.appendChild(tag);
      } else if (tag.textContent !== css) {
        tag.textContent = css;
      }
    }

    // Images stay base64 in localStorage, but the stylesheet only ever sees a
    // short blob: URL, so a 1 MB picture no longer inflates CSS parsing.
    var imageUrls = {};
    var imagePending = {};

    function blobUrlFor(dataUrl) {
      if (imageUrls[dataUrl]) return imageUrls[dataUrl];
      if (imagePending[dataUrl]) return null;
      if (typeof fetch !== "function" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") return null;
      imagePending[dataUrl] = true;
      try {
        fetch(dataUrl).then(function (res) { return res.blob(); }).then(function (blob) {
          imageUrls[dataUrl] = URL.createObjectURL(blob);
          imagePending[dataUrl] = false;
          applyVars(loadConfig());
        }).catch(function () {
          imagePending[dataUrl] = false;
        });
      } catch (_) {
        imagePending[dataUrl] = false;
      }
      return null;
    }

    function iconVarsFor(tool, item, desired) {
      if (item && item.image) {
        var url = blobUrlFor(item.image);
        desired[ICON_VAR + tool] = '""';
        desired[IMG_VAR + tool] = url ? 'url("' + url + '")' : "none";
      } else if (item) {
        desired[ICON_VAR + tool] = JSON.stringify(item.emoji || "");
        desired[IMG_VAR + tool] = "none";
      }
    }

    function applyVars(config) {
      if (typeof document === "undefined" || !document.documentElement || !document.documentElement.style) return;
      var root = document.documentElement;
      var desired = {};
      if (config.enabled) {
        desired[DEFAULT_ICON_VAR] = JSON.stringify(config.defaultEmoji || "🔧");
        var keys = toolKeys(config);
        for (var i = 0; i < keys.length; i++) {
          var item = getToolConfig(config, keys[i]);
          if (!item.enabled) continue;
          iconVarsFor(keys[i], item, desired);
        }
        if (config.error && config.error.enabled) {
          if (config.error.image) {
            var errorUrl = blobUrlFor(config.error.image);
            desired[ERROR_ICON_VAR] = '""';
            desired[ERROR_IMG_VAR] = errorUrl ? 'url("' + errorUrl + '")' : "none";
          } else {
            desired[ERROR_ICON_VAR] = JSON.stringify(config.error.emoji || "😫");
          }
        }
      }
      for (var name in desired) {
        if (root.style.getPropertyValue(name) !== desired[name]) root.style.setProperty(name, desired[name]);
      }
      for (var s = root.style.length - 1; s >= 0; s--) {
        var prop = root.style.item(s);
        if (prop.indexOf("--dte-") !== 0) continue;
        if (!Object.prototype.hasOwnProperty.call(desired, prop)) root.style.removeProperty(prop);
      }
    }

    function applyAll(config) {
      applyStatic(config);
      applyVars(config);
    }

    // A custom-property write invalidates every card that resolves var(), so a
    // per-keystroke preview would recalculate the whole transcript. Coalesce it.
    var previewTimer = null;
    var previewConfig = null;

    function cancelPreview() {
      if (previewTimer !== null) {
        clearTimeout(previewTimer);
        previewTimer = null;
      }
      previewConfig = null;
    }

    function previewVars(config) {
      previewConfig = config;
      if (previewTimer !== null) return;
      previewTimer = setTimeout(function () {
        var pending = previewConfig;
        previewTimer = null;
        previewConfig = null;
        if (pending) applyVars(pending);
      }, 150);
    }

    var ToolRow = React.memo(function ToolRow(props) {
      var tool = props.tool;
      var label = props.label;
      var enabled = props.enabled;
      var emoji = props.emoji;
      var image = props.image;
      var onToggle = props.onToggle;
      var onEmoji = props.onEmoji;
      var onPreview = props.onPreview;
      var onImage = props.onImage;
      var onRemoveImage = props.onRemoveImage;
      var hasImage = typeof image === "string" && image.length > 0;
      var draft = React.useState(emoji || "");
      var text = draft[0];
      var setText = draft[1];
      React.useEffect(function () {
        setText(emoji || "");
      }, [emoji]);
      function commit() {
        if (text !== (emoji || "")) onEmoji(tool, text);
      }
      var preview = hasImage ? h("img", { src: image, alt: "" }) : (emoji || "");
      return h("div", { className: "dte-row" },
        h("label", { className: "dte-switch" + (enabled ? " on" : "") },
          h("input", { type: "checkbox", checked: enabled, onChange: function () { onToggle(tool); } })),
        h("span", { className: "dte-preview" }, preview),
        h("span", { className: "dte-name", title: tool }, label),
        h("input", {
          type: "text",
          value: text,
          disabled: !enabled || hasImage,
          placeholder: "emoji",
          onChange: function (e) {
            setText(e.target.value);
            if (onPreview) onPreview(tool, e.target.value);
          },
          onBlur: commit,
          onKeyDown: function (e) {
            if (e.key === "Enter") {
              commit();
              if (e.target && e.target.blur) e.target.blur();
            }
          }
        }),
        hasImage
          ? h("button", { type: "button", className: "dte-link", onClick: function () { onRemoveImage(tool); } }, "清除图片")
          : h("label", { className: "dte-link" },
              "图片",
              h("input", {
                type: "file",
                accept: "image/*",
                disabled: !enabled,
                onChange: function (e) { onImage(tool, e.target.files && e.target.files[0], e.target); }
              })));
    });

    function groupedTools() {
      var groups = {};
      for (var i = 0; i < CATEGORY_ORDER.length; i++) groups[CATEGORY_ORDER[i]] = [];
      for (var name in ALL_KNOWN_TOOLS) {
        var cat = ALL_KNOWN_TOOLS[name].category;
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(name);
      }
      return groups;
    }

    function cloneTools(tools) {
      var out = {};
      for (var k in tools) out[k] = tools[k];
      return out;
    }

    function SettingsPanel() {
      var initial = React.useState(loadConfig);
      var config = initial[0];
      var setConfig = initial[1];
      var noticeState = React.useState("");
      var notice = noticeState[0];
      var setNotice = noticeState[1];
      var typed = React.useState("");
      var searchInput = typed[0];
      var setSearchInput = typed[1];
      var appliedState = React.useState("");
      var search = appliedState[0];
      var setSearch = appliedState[1];
      var openState = React.useState(function () {
        var init = {};
        for (var i = 0; i < CATEGORY_ORDER.length; i++) {
          var cat = CATEGORY_ORDER[i];
          init[cat] = !!OPEN_BY_DEFAULT[cat];
        }
        return init;
      });
      var open = openState[0];
      var setOpen = openState[1];
      var configRef = React.useRef(config);
      configRef.current = config;

      React.useEffect(function () {
        if (searchInput === search) return undefined;
        var timer = setTimeout(function () { setSearch(searchInput); }, 150);
        return function () { clearTimeout(timer); };
      }, [searchInput, search]);

      var commit = React.useCallback(function (next, varsOnly) {
        cancelPreview();
        configRef.current = next;
        setConfig(next);
        var ok = saveConfig(next);
        if (varsOnly) applyVars(next); else applyAll(next);
        setNotice(ok ? "" : "写入 localStorage 失败");
      }, []);

      var editTool = React.useCallback(function (tool, patch, varsOnly) {
        var current = configRef.current;
        var base = getToolConfig(current, tool);
        var tools = cloneTools(current.tools);
        tools[tool] = { enabled: base.enabled, emoji: base.emoji, image: base.image };
        for (var p in patch) tools[tool][p] = patch[p];
        commit({ enabled: current.enabled, tools: tools, error: current.error, defaultEmoji: current.defaultEmoji }, varsOnly);
      }, [commit]);

      var handlers = React.useMemo(function () {
        return {
          onToggle: function (tool) {
            var base = getToolConfig(configRef.current, tool);
            editTool(tool, { enabled: !base.enabled }, false);
          },
          onEmoji: function (tool, value) {
            editTool(tool, { emoji: value, image: null }, true);
          },
          onPreview: function (tool, value) {
            var current = configRef.current;
            var base = getToolConfig(current, tool);
            var tools = cloneTools(current.tools);
            tools[tool] = { enabled: base.enabled, emoji: value, image: null };
            previewVars({ enabled: current.enabled, tools: tools, error: current.error, defaultEmoji: current.defaultEmoji });
          },
          onRemoveImage: function (tool) {
            editTool(tool, { image: null }, true);
          },
          onImage: function (tool, file, input) {
            if (input) input.value = "";
            if (!file) return;
            if (file.size > 1024 * 1024) {
              setNotice("图片不能超过 1MB");
              return;
            }
            var reader = new FileReader();
            reader.onload = function () {
              editTool(tool, { image: String(reader.result || "") }, true);
            };
            reader.readAsDataURL(file);
          }
        };
      }, [editTool]);

      var errorHandlers = React.useMemo(function () {
        return {
          onToggle: function () {
            var current = configRef.current;
            var err = current.error;
            commit({ enabled: current.enabled, tools: current.tools, error: { enabled: !err.enabled, emoji: err.emoji, image: err.image }, defaultEmoji: current.defaultEmoji }, false);
          },
          onEmoji: function (_tool, value) {
            var current = configRef.current;
            var err = current.error;
            commit({ enabled: current.enabled, tools: current.tools, error: { enabled: err.enabled, emoji: value, image: null }, defaultEmoji: current.defaultEmoji }, true);
          },
          onPreview: function (_tool, value) {
            var current = configRef.current;
            var err = current.error;
            previewVars({ enabled: current.enabled, tools: current.tools, error: { enabled: err.enabled, emoji: value, image: null }, defaultEmoji: current.defaultEmoji });
          },
          onRemoveImage: function () {
            var current = configRef.current;
            var err = current.error;
            commit({ enabled: current.enabled, tools: current.tools, error: { enabled: err.enabled, emoji: err.emoji, image: null }, defaultEmoji: current.defaultEmoji }, true);
          },
          onImage: function (_tool, file, input) {
            if (input) input.value = "";
            if (!file) return;
            if (file.size > 1024 * 1024) {
              setNotice("图片不能超过 1MB");
              return;
            }
            var reader = new FileReader();
            reader.onload = function () {
              var current = configRef.current;
              var err = current.error;
              commit({ enabled: current.enabled, tools: current.tools, error: { enabled: err.enabled, emoji: err.emoji, image: String(reader.result || "") }, defaultEmoji: current.defaultEmoji }, true);
            };
            reader.readAsDataURL(file);
          }
        };
      }, [commit]);

      var query = search.trim().toLowerCase();
      var groups = groupedTools();
      var enabledCount = 0;
      var total = 0;
      for (var n in ALL_KNOWN_TOOLS) {
        total += 1;
        if (getToolConfig(config, n).enabled) enabledCount += 1;
      }

      var sections = [];
      for (var c = 0; c < CATEGORY_ORDER.length; c++) {
        var cat = CATEGORY_ORDER[c];
        var names = groups[cat] || [];
        var shown = [];
        for (var i = 0; i < names.length; i++) {
          var tool = names[i];
          var label = SURFACE_LABELS[tool] || tool;
          if (query && tool.toLowerCase().indexOf(query) === -1 && String(label).toLowerCase().indexOf(query) === -1 && String(CATEGORY_LABELS[cat] || cat).toLowerCase().indexOf(query) === -1) continue;
          shown.push(tool);
        }
        if (shown.length === 0) continue;
        var isOpen = query ? true : !!open[cat];
        var rows = null;
        if (isOpen) {
          rows = shown.map(function (name) {
            var item = getToolConfig(config, name);
            return h(ToolRow, {
              key: name,
              tool: name,
              label: SURFACE_LABELS[name] || name,
              enabled: item.enabled,
              emoji: item.emoji,
              image: item.image,
              onToggle: handlers.onToggle,
              onEmoji: handlers.onEmoji,
              onPreview: handlers.onPreview,
              onImage: handlers.onImage,
              onRemoveImage: handlers.onRemoveImage
            });
          });
        }
        (function (catName, opened, count) {
          sections.push(h("div", { className: "dte-cat", key: catName },
            h("button", {
              type: "button",
              className: "dte-cat-head",
              onClick: function () {
                var next = {};
                for (var k in open) next[k] = open[k];
                next[catName] = !opened;
                setOpen(next);
              }
            },
              h("span", { className: "dte-cat-title" }, CATEGORY_LABELS[catName] || catName),
              h("span", { className: "dte-cat-count" }, count + (opened ? " ▾" : " ▸"))),
            opened ? h("div", { className: "dte-cat-body" }, rows) : null));
        })(cat, isOpen, shown.length);
      }

      var currentError = config.error || DEFAULT_CONFIG.error;

      return h("div", { className: "dte-panel" },
        h("div", { className: "dte-toolbar" },
          h("label", { className: "dte-switch" + (config.enabled ? " on" : "") },
            h("input", {
              type: "checkbox",
              checked: config.enabled,
              onChange: function () {
                commit({
                  enabled: !config.enabled,
                  tools: config.tools,
                  error: config.error,
                  defaultEmoji: config.defaultEmoji
                }, false);
              }
            })),
          h("span", { className: "dte-stats" },
            (config.enabled ? "已启用" : "已关闭") + " · " + enabledCount + "/" + total + " 项目")),
        h("div", { className: "dte-hint" },
          "默认替换全部已知工具卡和父子 agent 消息行图标。关掉单项即回退该行的内置 SVG。"),
        h("div", { className: "dte-search" },
          h("input", {
            type: "search",
            placeholder: "搜索工具名…",
            value: searchInput,
            onChange: function (e) { setSearchInput(e.target.value); }
          })),
        sections,
        h(ToolRow, {
          key: "error",
          tool: "error",
          label: "出错状态",
          enabled: currentError.enabled,
          emoji: currentError.emoji,
          image: currentError.image,
          onToggle: errorHandlers.onToggle,
          onEmoji: errorHandlers.onEmoji,
          onPreview: errorHandlers.onPreview,
          onImage: errorHandlers.onImage,
          onRemoveImage: errorHandlers.onRemoveImage
        }),
        h("div", { className: "dte-foot" },
          h("button", {
            type: "button",
            className: "dte-button danger",
            onClick: function () { commit(defaultConfig(), false); setNotice("已恢复默认 emoji"); }
          }, "恢复默认")),
        notice !== "" ? h("div", { className: "dte-notice" }, notice) : null);
    }

    function apply(ctx) {
      injectPanelCss();
      var config = loadConfig();
      applyAll(config);

      if (ctx && ctx.slots) {
        ctx.slots.inject("settings.section", () => ctx.slots.register(
          { name: "settings.section", id: "dsh-tool-emoji", order: 25, label: "工具 emoji" },
          SettingsPanel
        ));
      }

      if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("storage", function (event) {
          if (event.key === STORAGE_KEY) applyAll(loadConfig());
        });
      }
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    exports._test = {
      buildCss: buildCss,
      leadingSelectors: leadingSelectors,
      ALL_KNOWN_TOOLS: ALL_KNOWN_TOOLS,
      loadConfig: loadConfig,
      defaultConfig: defaultConfig,
      applyVars: applyVars,
      applyStatic: applyStatic
    };
    return module.exports;
  }
});
