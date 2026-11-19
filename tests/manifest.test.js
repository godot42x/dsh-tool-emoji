import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const plugin = JSON.parse(readFileSync(new URL('../dsh.plugin.json', import.meta.url), 'utf8'))

describe('dsh.client manifest', () => {
  it('platform is a string (parseDshClient throws on arrays)', () => {
    assert.equal(typeof pkg.dsh?.client?.platform, 'string')
    assert.equal(pkg.dsh.client.platform, 'web')
  })

  it('plugin metadata version matches package.json', () => {
    assert.equal(plugin.version, pkg.version)
    assert.equal(plugin.client?.platform, 'web')
  })

  it('client inject lists the runtime the Loader needs', () => {
    assert.ok(Array.isArray(pkg.dsh.client.inject))
    assert.ok(pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-runtime'))
  })
})

function parseDshClient(pkgName, value) {
  if (value === undefined) return undefined
  if (typeof value !== 'object' || value === null) {
    throw new Error('client-modules: ' + pkgName + ' has a non-object dsh.client declaration')
  }
  if (typeof value.platform !== 'string') {
    throw new Error('client-modules: ' + pkgName + ' dsh.client.platform must be a string')
  }
  return { platform: value.platform, inject: value.inject }
}

describe('parseDshClient accepts this package', () => {
  it('accepts the current manifest and still rejects the 0.3.0 array', () => {
    const parsed = parseDshClient(pkg.name, pkg.dsh.client)
    assert.equal(parsed.platform, 'web')
    assert.throws(
      () => parseDshClient(pkg.name, { platform: ['web', 'desktop'] }),
      /must be a string/,
    )
  })
})
