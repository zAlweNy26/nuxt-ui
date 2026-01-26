import ui from '@nuxt/ui/vue-plugin'
import { defineCustomElement, ref } from 'vue'
import _CustomElement from './CustomElement.ce.vue'
import { router } from '../router'
import styleTag from '../assets/css/main.css?inline'

const normalizedStyleTag = styleTag.replace(/-webkit-hyphens\s*:\s*none\s*;?/g, '')
  .replace(/\(\s*-webkit-hyphens\s*:\s*none\s*\)\s*(and\s+)?/g, '')
  .replace(/\(\(\)\) and /g, '')

const CustomElement = defineCustomElement(_CustomElement, {
  configureApp(app) {
    app.use(router)
    app.use(ui, 'custom-element')
  },
  shadowRoot: true,
  styles: [normalizedStyleTag]
})

// @ts-expect-error unknown global property
globalThis.useFetch = async (url: string, options: RequestInit & { transform?: (data) => any } = {}) => {
  const data = ref()
  const status = ref('idle')
  async function _fetch() {
    status.value = 'loading'
    try {
      data.value = await fetch(url, options).then(r => r.json()).then(r => options.transform ? options.transform(r) : r)
      status.value = 'success'
    } catch (error) {
      console.error(error)
      status.value = 'error'
    }
  }
  _fetch()
  return Promise.resolve({
    data,
    status
  })
}

customElements.define('custom-element', CustomElement)
