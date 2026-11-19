import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { loadClient } from './load-client.mjs'

function walk(node, visit) {
  if (node == null || typeof node !== 'object') return
  visit(node)
  const children = node.children || []
  for (const child of children) walk(child, visit)
  if (node.props && node.props.children) {
    const extra = Array.isArray(node.props.children) ? node.props.children : [node.props.children]
    for (const child of extra) walk(child, visit)
  }
}

function texts(tree) {
  const out = []
  walk(tree, (node) => {
    if (typeof node === 'string') out.push(node)
    if (typeof node?.type === 'string' && typeof node.props?.children === 'string') out.push(node.props.children)
    if (Array.isArray(node?.children)) {
      for (const c of node.children) if (typeof c === 'string') out.push(c)
    }
  })
  return out.join(' ')
}

describe('settings panel', () => {
  it('lists send_message and agent-message surfaces without an Add step', () => {
    const { mod } = loadClient()
    let registered
    const fakeSlots = {
      inject(_name, fn) { fn() },
      register(spec, component) {
        registered = { spec, component }
        return {}
      },
    }
    mod.apply({ slots: fakeSlots })
    assert.equal(registered.spec.name, 'settings.section')
    assert.equal(registered.spec.id, 'dsh-tool-emoji')
    const tree = registered.component()
    const blob = JSON.stringify(tree)
    assert.match(blob, /send_message/)
    assert.match(blob, /__turn_trigger|智能体消息|agent-message/)
    assert.doesNotMatch(blob, /"Add"/)
    assert.match(blob, /智能体消息/)
    assert.doesNotMatch(blob, /智能体消息__turn_trigger/)
    assert.doesNotMatch(blob, /续写回执__continuation/)
    assert.match(blob, /续写回执/)
    assert.match(blob, /委托/)
    assert.match(blob, /会话消息/)
    assert.doesNotMatch(blob, /Add tools/)
  })
})
