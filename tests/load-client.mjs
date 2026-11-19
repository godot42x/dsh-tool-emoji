/** Load the client bundle through a fake ModuleLoader (no browser). */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

export function loadClient(options = {}) {
  const here = fileURLToPath(new URL('.', import.meta.url))
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  let loaded
  const elements = []
  const rootStyle = options.rootStyle ?? null
  const fakeDocument = {
    head: {
      appendChild(el) { elements.push(el); return el },
    },
    documentElement: rootStyle ? { style: rootStyle } : undefined,
    querySelector(sel) {
      return elements.find((el) => {
        if (typeof sel !== 'string') return false
        const prefix = 'style[data-plugin-css='
        if (!sel.startsWith(prefix) || !sel.endsWith(']')) return false
        let raw = sel.slice(prefix.length, -1)
        if (raw.startsWith('"') && raw.endsWith('"')) {
          try { raw = JSON.parse(raw) } catch { return false }
        }
        return el.dataset && el.dataset.pluginCss === raw
      }) ?? null
    },
    createElement(tag) {
      return {
        tagName: String(tag).toUpperCase(),
        dataset: {},
        textContent: '',
        setAttribute() {},
      }
    },
  }
  const fakeWindow = {
    __ModuleLoader__: { load: (definition) => { loaded = definition } },
    localStorage: options.localStorage ?? {
      store: Object.create(null),
      getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null },
      setItem(k, v) { this.store[k] = String(v) },
    },
    addEventListener() {},
    document: fakeDocument,
  }
  fakeWindow.window = fakeWindow
  const sandbox = {
    window: fakeWindow,
    document: fakeDocument,
    require: (id) => {
      if (id === 'react') {
        return {
          createElement(type, props, ...children) {
            return { type, props: props || {}, children: children.flat() }
          },
          Fragment: Symbol.for('react.fragment'),
          memo(component) { return component },
          useState(init) {
            const value = typeof init === 'function' ? init() : init
            return [value, () => {}]
          },
          useEffect() {},
          useRef(init) { return { current: init } },
          useCallback(fn) { return fn },
          useMemo(fn) { return fn() },
        }
      }
      throw new Error('unexpected require: ' + id)
    },
  }
  vm.runInNewContext(source, sandbox, { filename: here + '../lib/client.js' })
  if (!loaded) throw new Error('client.js did not call window.__ModuleLoader__.load')
  const mod = loaded.factory(sandbox.require)
  return { mod, loaded, elements, window: fakeWindow, document: fakeDocument }
}
