import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { loadClient } from './load-client.mjs'

function rootStyle() {
  const props = new Map()
  return {
    length: 0,
    getPropertyValue(name) { return props.get(name) ?? '' },
    setProperty(name, value) {
      if (!props.has(name)) this.length += 1
      props.set(name, String(value))
    },
    removeProperty(name) {
      if (props.delete(name)) this.length -= 1
    },
    item(index) { return [...props.keys()][index] ?? '' },
    dump() { return Object.fromEntries(props) },
  }
}

function applyAndRead(options = {}) {
  const loaded = loadClient(options)
  const fakeSlots = {
    inject(_name, fn) { fn() },
    register() { return {} },
  }
  loaded.mod.apply({ slots: fakeSlots })
  const tag = loaded.elements.find((el) => el.dataset && String(el.dataset.pluginCss || '').includes('tool-icons'))
  assert.ok(tag, 'apply() must inject the tool-icon style tag')
  return { ...loaded, css: tag.textContent }
}

describe('tool-icon stylesheet', () => {
  const { mod, css } = applyAndRead()

  it('stays a small static sheet', () => {
    const rules = css.split('\n').filter(Boolean)
    assert.ok(rules.length <= 90, 'sheet should stay near 70 rules, got ' + rules.length)
    assert.ok(css.length < 30000, 'sheet should stay under 30 KB, got ' + css.length)
    assert.doesNotMatch(css, /url\(/, 'images must not be embedded in the stylesheet')
  })

  it('maps a tool to a custom property instead of per-tool content', () => {
    assert.match(css, /:is\(\[data-variant="send_message"\],\[data-tool="send_message"\]\)\{--dte-icon:var\(--dte-icon-send_message/)
    assert.doesNotMatch(css, /content:"/)
  })

  it('draws the icon through one generic pseudo-element rule', () => {
    const showLine = css.split('\n').find((row) => row.includes('content:var(--dte-icon,normal)'))
    assert.ok(showLine, 'expected one generic ::before rule carrying content')
    assert.match(showLine, /:is\(\[data-variant\],\[data-tool\]\) > :is\(span,button\)\[class\*="leading"\]::before/)
    assert.match(showLine, /\[data-disclosure-row\] > :is\(span,button\)\[class\*="leading"\]::before/)
  })

  it('hides only the leading cell first child and keeps the hover chevron', () => {
    const hide = css.split('\n').find((row) => row.includes('display:none') && row.includes('[class*="leading"] > :first-child'))
    assert.ok(hide, 'expected a generic hide rule for the leading cell')
    assert.doesNotMatch(hide, /chevron/)
    assert.doesNotMatch(css, /> :first-child > svg\{display:none/)
    assert.doesNotMatch(css, /\[class\*="leading"\] > svg\{display:none/)
  })

  it('routes the error state through its own variable', () => {
    assert.match(css, /\[data-variant\]\[data-state="error"\]/)
    assert.match(css, /--dte-icon-error/)
    assert.doesNotMatch(css, /svg\[data-state="error"\]/)
  })

  it('restores the built-in icon for a disabled tool', () => {
    const config = mod._test.defaultConfig()
    config.tools.read = { enabled: false, emoji: '🧐', image: null }
    const custom = mod._test.buildCss(config)
    assert.match(custom, /:is\(\[data-variant="read"\],\[data-tool="read"\]\)\{--dte-icon:normal;--dte-img:none\}/)
    assert.match(custom, /display:inline-flex!important/)
  })

  it('keeps the legacy message-row surfaces for newer builds', () => {
    assert.match(css, /\[data-turn-trigger\] > button > span:first-child::before/)
    assert.match(css, /\[data-generation-continuation\] > span:first-child::before/)
  })

  it('exposes helpers for fixtures', () => {
    assert.equal(typeof mod._test?.buildCss, 'function')
    const sels = mod._test.leadingSelectors('send_message')
    assert.ok(sels.some((s) => s.includes('[data-variant="send_message"]') && s.includes('[data-tool="send_message"]')))
  })
})

describe('tool-icon variables', () => {
  it('writes emoji into :root custom properties, not into the sheet', () => {
    const style = rootStyle()
    const { mod } = loadClient({ rootStyle: style })
    const config = mod._test.defaultConfig()
    mod._test.applyVars(config)
    const vars = style.dump()
    assert.equal(vars['--dte-icon-default'], JSON.stringify('🔧'))
    assert.equal(vars['--dte-icon-bash'], JSON.stringify(mod._test.ALL_KNOWN_TOOLS.bash.emoji))
    assert.equal(vars['--dte-icon-error'], JSON.stringify('😫'))
  })

  it('drops the variables of a tool once it is disabled', () => {
    const style = rootStyle()
    const { mod } = loadClient({ rootStyle: style })
    const config = mod._test.defaultConfig()
    mod._test.applyVars(config)
    const before = style.dump()
    config.tools.read = { enabled: false, emoji: '🧐', image: null }
    mod._test.applyVars(config)
    const after = style.dump()
    assert.equal(after['--dte-icon-read'], undefined)
    assert.equal(after['--dte-icon-bash'], before['--dte-icon-bash'])
  })

  it('points an image at a short reference instead of inline base64', () => {
    const style = rootStyle()
    const { mod } = loadClient({ rootStyle: style })
    const config = mod._test.defaultConfig()
    config.tools.bash = { enabled: true, emoji: '💻', image: 'data:image/png;base64,AAAA' }
    mod._test.applyVars(config)
    const vars = style.dump()
    assert.equal(vars['--dte-icon-bash'], '""')
    assert.match(String(vars['--dte-img-bash']), /^(none|url\("?blob:)/)
    assert.doesNotMatch(JSON.stringify(vars), /data:image/)
  })
})
