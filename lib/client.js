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

    var PANEL_CSS = [
      ".dte-panel{display:flex;flex-direction:column;gap:12px;padding:4px 0;font-size:13px;color:var(--dsw-alias-label-primary)}",
      ".dte-section{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);text-transform:uppercase;letter-spacing:.04em;margin-top:12px;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1)}",
      ".dte-section:first-of-type{border-top:none;margin-top:0;padding-top:0}",
      ".dte-tool{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:8px 10px;display:flex;flex-direction:column;gap:8px}",
      ".dte-tool-head{display:flex;align-items:center;justify-content:space-between;gap:8px}",
      ".dte-tool-name{font-weight:600;font-size:13px;font-family:ui-monospace,monospace}",
      ".dte-tool-category{font-size:11px;color:var(--dsw-alias-label-tertiary);margin-left:8px}",
      ".dte-tool-body{display:flex;align-items:center;gap:8px;flex-wrap:wrap}",
      ".dte-tool input[type=text]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:6px 10px;font-size:13px;outline:none;min-width:110px;flex:1 1 140px}",
      ".dte-tool input[type=text]:focus{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-tool input[type=file]{font-size:12px;max-width:220px}",
      ".dte-button{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;white-space:nowrap}",
      ".dte-button:hover{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-button.danger:hover{border-color:#e5484d;color:#e5484d}",
      ".dte-switch{position:relative;width:34px;height:20px;border-radius:999px;background:var(--dsw-alias-border-l1);cursor:pointer;flex:none;transition:background .15s ease;display:inline-block}",
      ".dte-switch input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}",
      ".dte-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .15s ease}",
      ".dte-switch.on{background:var(--dsw-alias-brand-primary)}",
      ".dte-switch.on::after{transform:translateX(14px)}",
      ".dte-preview{width:28px;height:28px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;overflow:hidden;background:var(--dsw-alias-bg-base);display:inline-flex;align-items:center;justify-content:center}",
      ".dte-preview img{max-width:100%;max-height:100%;object-fit:contain}",
      ".dte-notice{color:var(--dsw-alias-label-secondary);font-size:12px;padding:8px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}",
      ".dte-reset{margin-top:4px;display:flex;gap:8px;flex-wrap:wrap}",
      ".dte-stats{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:8px}",
      ".dte-available-tools{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:8px}",
      ".dte-available-tool{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;font-size:12px;font-family:ui-monospace,monospace}",
      ".dte-available-tool-info{display:flex;align-items:center;gap:6px;min-width:0}",
      ".dte-available-tool-emoji{font-size:16px;flex:none}",
      ".dte-available-tool-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".dte-available-tool button{padding:3px 8px;font-size:11px}",
      ".dte-available-tool.added{opacity:0.5;pointer-events:none}",
      ".dte-available-tool.added button{opacity:0.5}",
      ".dte-search-box{margin-top:8px}",
      ".dte-search-box input{width:100%;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px 12px;font-size:13px;outline:none}",
      ".dte-search-box input:focus{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-category-header{font-size:11px;font-weight:600;color:var(--dsw-alias-label-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-top:12px;margin-bottom:4px}",
      ".dte-expand-toggle{color:var(--dsw-alias-brand-primary);cursor:pointer;font-size:12px;margin-top:8px;user-select:none}",
      ".dte-expand-toggle:hover{text-decoration:underline}"
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

    function leadingSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"] [data-disclosure-row] > span:first-child');
      } else {
        out.push('[data-tool="' + tool + '"] [data-disclosure-row] > span:first-child');
        out.push('[data-variant="' + tool + '"] [data-disclosure-row] > span:first-child');
      }
      if (tool === "pwsh" || tool === "bash" || tool === "edit" || tool === "write" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"] > .dshg_leading');
      }
      return out;
    }

    function errorIconSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"][data-state="error"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state="error"]');
      } else {
        out.push('[data-tool="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state="error"]');
        out.push('[data-variant="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state="error"]');
      }
      if (tool === "pwsh" || tool === "bash" || tool === "edit" || tool === "write" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"][data-state="error"] > .dshg_leading > svg[data-state="error"]');
      }
      return out;
    }

    function errorPseudoSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"][data-state="error"] [data-disclosure-row] > span:first-child::before');
      } else {
        out.push('[data-tool="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child::before');
        out.push('[data-variant="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child::before');
      }
      if (tool === "pwsh" || tool === "bash" || tool === "edit" || tool === "write" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"][data-state="error"] > .dshg_leading::before');
      }
      return out;
    }

    function isDshgSelector(sel) {
      return sel.indexOf(".dshg_") !== -1;
    }

    function iconSelector(sel, stateFilter) {
      var child = isDshgSelector(sel)
        ? "> svg"
        : "> span:first-child svg";
      if (stateFilter) {
        child += '[data-state="' + stateFilter + '"]';
      } else {
        child += ":not([data-state])";
      }
      return sel + " " + child;
    }

    function emojiStyle(emoji) {
      return 'content:' + JSON.stringify(emoji) + ';display:inline-block;font-size:14px;line-height:18px;text-align:center;user-select:none;white-space:nowrap;';
    }

    function imageStyle(uri) {
      return 'content:"";display:inline-block;width:16px;height:16px;background-image:url(' + JSON.stringify(uri) + ');background-size:contain;background-repeat:no-repeat;';
    }

    function itemStyle(item) {
      if (item && typeof item.image === "string" && item.image.length > 0) return imageStyle(item.image);
      return emojiStyle(item && item.emoji ? item.emoji : "");
    }

    function buildCss(config) {
      if (!config.enabled) return "";
      var lines = [];
      
      var allTools = Object.keys(config.tools);
      for (var defTool in ALL_KNOWN_TOOLS) {
        if (allTools.indexOf(defTool) === -1) {
          allTools.push(defTool);
        }
      }

      for (var t = 0; t < allTools.length; t++) {
        var tool = allTools[t];
        var item = getToolConfig(config, tool);
        if (!item.enabled) continue;
        
        var sels = leadingSelectors(tool);
        var hide = [];
        var show = [];
        
        for (var s = 0; s < sels.length; s++) {
          hide.push(iconSelector(sels[s], null));
          show.push(sels[s] + "::before");
        }
        
        if (hide.length > 0) {
          lines.push(hide.join(",") + "{display:none}");
          lines.push(show.join(",") + "{" + itemStyle(item) + "}");

          var lead = [];
          for (var s2 = 0; s2 < sels.length; s2++) lead.push(sels[s2]);
          if (item && typeof item.image === "string" && item.image.length > 0) {
            lines.push(lead.join(",") + "{width:16px;height:16px;min-width:16px;white-space:nowrap}");
          } else {
            lines.push(lead.join(",") + "{width:auto;min-width:16px;white-space:nowrap}");
          }
        }
      }

      if (config.error && config.error.enabled) {
        var err = config.error;
        for (var t2 = 0; t2 < allTools.length; t2++) {
          var tool2 = allTools[t2];
          var item2 = getToolConfig(config, tool2);
          if (!item2.enabled) continue;
          
          var errIconSels = errorIconSelectors(tool2);
          var errPseudoSels = errorPseudoSelectors(tool2);
          
          if (errIconSels.length > 0) {
            lines.push(errIconSels.join(",") + "{display:none}");
            lines.push(errPseudoSels.join(",") + "{" + itemStyle(err) + "}");
          }
        }
      }

      return lines.join("\n");
    }

    function styleTag() {
      return typeof document === "undefined" ? null : document.querySelector("style[data-plugin-css=" + JSON.stringify(TAG_ID) + "]");
    }

    function applyCss() {
      if (typeof document === "undefined") return;
      var tag = styleTag();
      var css = buildCss(loadConfig());
      if (tag === null) {
        tag = document.createElement("style");
        tag.dataset.plugin = "dsh-tool-emoji";
        tag.dataset.pluginCss = TAG_ID;
        tag.textContent = css;
        document.head.appendChild(tag);
      } else {
        tag.textContent = css;
      }
    }

    function ToolRow(props) {
      var tool = props.tool;
      var item = props.item;
      var label = props.label;
      var category = props.category;
      var onToggle = props.onToggle;
      var onEmoji = props.onEmoji;
      var onUpload = props.onUpload;
      var onRemoveImage = props.onRemoveImage;
      var onDelete = props.onDelete;

      return h("div", { className: "dte-tool" },
        h("div", { className: "dte-tool-head" },
          h("div", { style: { display: "flex", alignItems: "center" } },
            h("span", { className: "dte-tool-name" }, label),
            category ? h("span", { className: "dte-tool-category" }, category) : null),
          h("label", { className: "dte-switch" + (item.enabled ? " on" : "") },
            h("input", {
              type: "checkbox",
              checked: item.enabled,
              onChange: onToggle
            }))),
        h("div", { className: "dte-tool-body" },
          h("input", {
            type: "text",
            value: item.emoji || "",
            disabled: !item.enabled || typeof item.image === "string" && item.image.length > 0,
            placeholder: "Emoji",
            onChange: onEmoji
          }),
          h("input", {
            type: "file",
            accept: "image/*",
            disabled: !item.enabled,
            onChange: onUpload
          }),
          typeof item.image === "string" && item.image.length > 0
            ? h("span", { className: "dte-preview" }, h("img", { src: item.image, alt: "" }))
            : null,
          typeof item.image === "string" && item.image.length > 0
            ? h("button", { type: "button", className: "dte-button danger", onClick: onRemoveImage }, "Remove image")
            : null,
          onDelete
            ? h("button", { type: "button", className: "dte-button danger", onClick: onDelete }, "Delete")
            : null));
    }

    function AvailableToolsList(props) {
      var config = props.config;
      var onAdd = props.onAdd;
      var searchState = React.useState("");
      var search = searchState[0];
      var setSearch = searchState[1];
      var expandedState = React.useState(false);
      var expanded = expandedState[0];
      var setExpanded = expandedState[1];

      var availableTools = [];
      for (var toolName in ALL_KNOWN_TOOLS) {
        if (!config.tools[toolName]) {
          availableTools.push(toolName);
        }
      }

      var filtered = availableTools;
      if (search.trim() !== "") {
        var searchLower = search.toLowerCase();
        filtered = availableTools.filter(function(t) {
          return t.toLowerCase().indexOf(searchLower) !== -1 ||
                 (ALL_KNOWN_TOOLS[t].category && ALL_KNOWN_TOOLS[t].category.toLowerCase().indexOf(searchLower) !== -1);
        });
      }

      var grouped = {};
      for (var i = 0; i < filtered.length; i++) {
        var toolName = filtered[i];
        var cat = ALL_KNOWN_TOOLS[toolName].category || "Other";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(toolName);
      }

      var categories = Object.keys(grouped).sort();
      var displayLimit = expanded ? filtered.length : 12;
      var displayed = 0;
      var elements = [];

      for (var c = 0; c < categories.length && displayed < displayLimit; c++) {
        var category = categories[c];
        var tools = grouped[category];
        
        if (displayed > 0) {
          elements.push(h("div", { key: "cat-" + category, className: "dte-category-header" }, category));
        }
        
        for (var t = 0; t < tools.length && displayed < displayLimit; t++) {
          var toolName = tools[t];
          var info = ALL_KNOWN_TOOLS[toolName];
          elements.push(
            h("div", { 
              key: toolName, 
              className: "dte-available-tool" + (config.tools[toolName] ? " added" : "")
            },
              h("div", { className: "dte-available-tool-info" },
                h("span", { className: "dte-available-tool-emoji" }, info.emoji),
                h("span", { className: "dte-available-tool-name" }, toolName)),
              h("button", { 
                type: "button", 
                className: "dte-button",
                onClick: function(tn) { return function() { onAdd(tn); }; }(toolName)
              }, "Add"))
          );
          displayed++;
        }
      }

      return h("div", null,
        h("div", { className: "dte-search-box" },
          h("input", {
            type: "text",
            placeholder: "Search tools...",
            value: search,
            onChange: function(e) { setSearch(e.target.value); }
          })),
        h("div", { className: "dte-available-tools" }, elements),
        filtered.length > displayLimit
          ? h("div", { 
              className: "dte-expand-toggle",
              onClick: function() { setExpanded(!expanded); }
            }, expanded ? "Show less" : "Show all " + filtered.length + " tools...")
          : null,
        availableTools.length === 0
          ? h("div", { className: "dte-notice", style: { marginTop: "8px" } }, 
              "All known tools are already configured.")
          : null);
    }

    function SettingsPanel() {
      var state = React.useState(loadConfig());
      var config = state[0];
      var setConfig = state[1];
      var noticeState = React.useState("");
      var notice = noticeState[0];
      var setNotice = noticeState[1];

      function commit(next) {
        setConfig(next);
        if (!saveConfig(next)) {
          setNotice("Save failed: localStorage is full or unavailable.");
        } else {
          setNotice("Saved. Changes apply immediately.");
          applyCss();
        }
      }

      function updateTool(tool, patch) {
        var next = JSON.parse(JSON.stringify(config));
        if (tool === "error") {
          next.error = Object.assign({}, next.error, patch);
        } else {
          if (!next.tools[tool]) {
            next.tools[tool] = getToolConfig(config, tool);
          }
          next.tools[tool] = Object.assign({}, next.tools[tool], patch);
        }
        commit(next);
      }

      function deleteTool(tool) {
        var next = JSON.parse(JSON.stringify(config));
        delete next.tools[tool];
        commit(next);
        setNotice("Tool \"" + tool + "\" removed.");
      }

      function addTool(toolName) {
        var next = JSON.parse(JSON.stringify(config));
        if (!next.tools[toolName]) {
          var info = ALL_KNOWN_TOOLS[toolName];
          next.tools[toolName] = { 
            enabled: true, 
            emoji: info ? info.emoji : config.defaultEmoji, 
            image: null 
          };
          commit(next);
          setNotice("Tool \"" + toolName + "\" added.");
        }
      }

      function resetAll() {
        commit(defaultConfig());
        setNotice("Reset to defaults.");
      }

      function uploadImage(tool, event) {
        var file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!/^image\/(png|jpe?g|gif|webp|bmp)$/.test(file.type)) {
          setNotice("Please select PNG / JPEG / GIF / WebP / BMP. SVG not supported.");
          return;
        }
        if (file.size > 1024 * 1024) {
          setNotice("Image must be under 1MB.");
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          updateTool(tool, { image: String(reader.result) });
        };
        reader.onerror = function () {
          setNotice("Failed to read image.");
        };
        reader.readAsDataURL(file);
      }

      var allToolNames = Object.keys(config.tools).sort();
      
      var categorized = {};
      var uncategorized = [];
      
      for (var i = 0; i < allToolNames.length; i++) {
        var toolName = allToolNames[i];
        var known = ALL_KNOWN_TOOLS[toolName];
        var cat = known ? known.category : null;
        if (cat) {
          if (!categorized[cat]) categorized[cat] = [];
          categorized[cat].push(toolName);
        } else {
          uncategorized.push(toolName);
        }
      }

      var categories = Object.keys(categorized).sort();
      var toolSections = [];

      for (var c = 0; c < categories.length; c++) {
        var category = categories[c];
        var tools = categorized[category];
        toolSections.push(h("div", { key: "cat-" + category, className: "dte-section" }, category));
        for (var t = 0; t < tools.length; t++) {
          var toolName = tools[t];
          var item = getToolConfig(config, toolName);
          toolSections.push(h(ToolRow, {
            key: toolName,
            tool: toolName,
            item: item,
            label: toolName,
            category: null,
            onToggle: function (tn) { return function () { updateTool(tn, { enabled: !getToolConfig(config, tn).enabled }); }; }(toolName),
            onEmoji: function (tn) { return function (e) { updateTool(tn, { emoji: e.target.value, image: null }); }; }(toolName),
            onUpload: function (tn) { return function (e) { uploadImage(tn, e); }; }(toolName),
            onRemoveImage: function (tn) { return function () { updateTool(tn, { image: null }); }; }(toolName),
            onDelete: function (tn) { return function () { deleteTool(tn); }; }(toolName)
          }));
        }
      }

      if (uncategorized.length > 0) {
        toolSections.push(h("div", { key: "cat-other", className: "dte-section" }, "Other tools"));
        for (var u = 0; u < uncategorized.length; u++) {
          var toolName = uncategorized[u];
          var item = getToolConfig(config, toolName);
          toolSections.push(h(ToolRow, {
            key: toolName,
            tool: toolName,
            item: item,
            label: toolName,
            category: null,
            onToggle: function (tn) { return function () { updateTool(tn, { enabled: !getToolConfig(config, tn).enabled }); }; }(toolName),
            onEmoji: function (tn) { return function (e) { updateTool(tn, { emoji: e.target.value, image: null }); }; }(toolName),
            onUpload: function (tn) { return function (e) { uploadImage(tn, e); }; }(toolName),
            onRemoveImage: function (tn) { return function () { updateTool(tn, { image: null }); }; }(toolName),
            onDelete: function (tn) { return function () { deleteTool(tn); }; }(toolName)
          }));
        }
      }

      return h("div", { className: "dte-panel" },
        h("div", { className: "dte-tool" },
          h("div", { className: "dte-tool-head" },
            h("span", { className: "dte-tool-name" }, "Enable plugin"),
            h("label", { className: "dte-switch" + (config.enabled ? " on" : "") },
              h("input", {
                type: "checkbox",
                checked: config.enabled,
                onChange: function () {
                  var next = JSON.parse(JSON.stringify(config));
                  next.enabled = !next.enabled;
                  commit(next);
                }
              }))),
          h("div", { className: "dte-tool-body" },
            h("span", { className: "dte-notice" }, "When disabled, all tool icons revert to default."))),
        
        h("div", { className: "dte-stats" }, 
          "Configured: " + Object.keys(config.tools).length + 
          " | Enabled: " + Object.keys(config.tools).filter(function(k) { return getToolConfig(config, k).enabled; }).length +
          " | Available: " + (Object.keys(ALL_KNOWN_TOOLS).length - Object.keys(config.tools).length)),
        
        allToolNames.length > 0 ? toolSections : null,
        
        h("div", { className: "dte-section" }, "Add tools"),
        h(AvailableToolsList, { config: config, onAdd: addTool }),
        
        h("div", { className: "dte-section" }, "Error state"),
        h(ToolRow, {
          tool: "error",
          item: config.error,
          label: "error",
          category: "All tools in error state",
          onToggle: function () { updateTool("error", { enabled: !config.error.enabled }); },
          onEmoji: function (e) { updateTool("error", { emoji: e.target.value, image: null }); },
          onUpload: function (e) { uploadImage("error", e); },
          onRemoveImage: function () { updateTool("error", { image: null }); },
          onDelete: null
        }),
        
        h("div", { className: "dte-reset" },
          h("button", { type: "button", className: "dte-button danger", onClick: resetAll }, "Reset all to defaults")),
        
        notice !== "" ? h("div", { className: "dte-notice", style: { marginTop: "12px" } }, notice) : null);
    }

    function apply(ctx) {
      injectPanelCss();
      applyCss();

      if (ctx && ctx.slots) {
        ctx.slots.inject("settings.section", () => ctx.slots.register(
          { name: "settings.section", id: "dsh-tool-emoji", order: 25, label: "Tool emoji" },
          SettingsPanel
        ));
      }

      if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("storage", function (event) {
          if (event.key === STORAGE_KEY) applyCss();
        });
      }
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    return module.exports;
  }
});
