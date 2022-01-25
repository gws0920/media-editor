<script setup lang="ts">
import Editor from '@/pages/Editor.vue'
import { NConfigProvider, NButton, NGlobalStyle } from 'naive-ui'

import { useThemeStore } from '@/store/theme'
const themeStore = useThemeStore()
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  themeStore.changeTheme(e.matches)
})

</script>

<template>
  <NConfigProvider :theme="themeStore.theme">
    <div>
      <NButton @click="themeStore.changeTheme()">{{themeStore.theme ? '浅色' : '深色'}}</NButton>
    </div>
    <Editor />
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
nav ul ol {
  list-style: none;
}
</style>