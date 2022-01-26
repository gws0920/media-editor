<script setup lang="ts">
import { ref } from 'vue'
import { Undo, Redo, Delete, Cut } from '@vicons/carbon'
import { NIcon, NSpace, NDivider, useThemeVars } from 'naive-ui'
const themeVar = useThemeVars()
const primaryColor = ref(themeVar.value.primaryColor)
</script>

<template>
  <NDivider class="divider" />
  <NSpace class="tools-bar">
    <NIcon :size="18" class="icon"><Undo /></NIcon>
    <NIcon :size="18" class="icon"><Redo /></NIcon>
    <NDivider vertical />
    <NIcon :size="18" class="icon"><Delete /></NIcon>
    <NIcon :size="18" class="icon"><Cut /></NIcon>
  </NSpace>
  <NDivider class="divider" dashed />
</template>

<style scoped lang="scss">
.tools-bar {
  padding: 0 24px;
  height: 42px;
  display: flex;
  align-items: center;
}
.divider {
  margin: 0;
}
</style>
