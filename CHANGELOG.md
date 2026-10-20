# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.3.0]: https://github.com/godot42x/dsh-tool-emoji/releases/tag/v0.3.0
