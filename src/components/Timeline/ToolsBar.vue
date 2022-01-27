<script setup lang="ts">
import { ref } from 'vue'
import { Undo, Redo, Delete, Cut } from '@vicons/carbon'
import { NIcon, NSpace, NDivider, useThemeVars } from 'naive-ui'
const themeVar = useThemeVars()
const primaryColor = ref(themeVar.value.primaryColor)
</script>

<template>
  <div class="tools">
    <NDivider class="divider" />
    <NSpace class="tools-bar">
      <NIcon :size="18" class="icon" title="撤销"><Undo /></NIcon>
      <NIcon :size="18" class="icon" title="恢复"><Redo /></NIcon>
      <NDivider vertical />
      <NIcon :size="18" class="icon" title="删除"><Delete /></NIcon>
      <NIcon :size="18" class="icon" title="切割"><Cut /></NIcon>
    </NSpace>
    <NDivider class="divider" dashed />
  </div>
</template>

<style scoped lang="scss">
.tools {
  grid-area: tools;
  height: 100%;
}
.tools-bar {
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 100%;
}
.divider {
  margin: 0;
}
</style>
