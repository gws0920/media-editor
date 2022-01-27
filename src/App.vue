<script setup lang="ts">
import Editor from '@/pages/Editor.vue'
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()

</script>

<template>
  <NConfigProvider :theme="themeStore.theme">
    <Editor />
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
nav ul ol {
  list-style: none;
}
</style>