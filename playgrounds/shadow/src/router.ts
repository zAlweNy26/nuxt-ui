import { createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob(['../../nuxt/app/pages/*.vue', '../../nuxt/app/pages/components/*.vue'])

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/\.\.\/nuxt\/app\/pages(.*)\.vue$/)![1].toLowerCase()
  return {
    path: name === '/index' ? '/' : name,
    component: pages[path]
  }
})

export const router = createRouter({
  routes,
  history: createWebHistory()
})
