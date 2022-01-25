<script setup lang="ts">
import Medias from '@/components/Editor/Medias.vue'
import Monitor from '@/components/Editor/Monitor.vue'
import Timeline from '@/components/Editor/Timeline.vue'
</script>

<template>
  <div class="editor">
    <Medias />
    <Monitor />
    <Timeline />
  </div>
</template>

<style lang="scss" scoped>
.editor {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "medias monitor"
    "timeline timeline"
  ;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
