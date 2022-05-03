<script setup lang="ts">
import Medias from '@/components/Editor/Medias.vue'
import Monitor from '@/components/Editor/Monitor.vue'
import Timeline from '@/components/Timeline/Timeline.vue'
import TitleBar from '@/components/Editor/TitleBar.vue'
</script>

<template>
  <div class="editor">
    <TitleBar/>
    <div class="content">
      <Medias />
      <Monitor />
    </div>
    <Timeline />
  </div>
</template>

<style lang="scss" scoped>
.editor {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    height: 45vh;
  }
}
</style>
