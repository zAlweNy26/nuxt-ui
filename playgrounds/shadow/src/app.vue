<script setup lang="ts">
import './components/custom'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Nuxt UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Nuxt UI components in an interactive environment' }
  ]
})
</script>

<template>
  <custom-element />
</template>
