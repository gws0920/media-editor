<script setup lang="ts">
import Editor from '@/pages/Editor.vue'
import { ref } from 'vue'
import { NConfigProvider, NGlobalStyle, useThemeVars } from 'naive-ui'
import { useThemeStore } from '@/store/theme'

const themeVar = useThemeVars()
const primaryColor = ref(themeVar.value.primaryColor)
const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider :theme="themeStore.theme">
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
// 图标通用样式
.n-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color .2s;
  height: 100%;
  &:hover {
    color:  v-bind(primaryColor);
  }
}
</style>