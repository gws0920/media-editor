<script setup lang="ts">
import { NButton, NDivider, NSpace, NIcon } from 'naive-ui'
import { useThemeStore } from '@/store/theme'
import { Moon, Sun } from '@vicons/carbon'

const themeStore = useThemeStore()
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  themeStore.changeTheme(e.matches)
})
</script>

<template>
  <div class="title-bar">
    <div class="logo">Logo</div>
    <NSpace class="tools-center">
    </NSpace>
    <NSpace>
      <NIcon @click="themeStore.changeTheme()" :size="20">
        <Sun v-if="themeStore.theme" />
        <Moon v-else />
      </NIcon>
      <NButton size="small" type="primary">导出</NButton>
    </NSpace>
  </div>
  <n-divider class="divider"/>
</template>

<style lang="scss" scoped>
.title-bar {
  height: 59px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 300px;
  }
  .tools-center {
    flex: 1;
  }
}
.divider {
  margin: 0;
}
</style>