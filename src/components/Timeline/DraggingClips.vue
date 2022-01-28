<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTimelineStore, TimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive";
import ClipMini from './ClipMini.vue'

const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore:InteractiveStore = useInteractiveStore()
const draggingContainer = ref(null)
const style = computed(() => {
  const [px, py] = interactiveStore.translate
  return {
    transform: `translate(${px}px, ${py}px)`
  }
})

</script>

<template>
  <div class="dragging-clips" :style="style" ref="draggingContainer" v-if="interactiveStore.isDragging">
    <ClipMini v-for="clip in timelineStore.curClips" :key="clip.id" :clip="clip" />
  </div>
</template>

<style scoped lang="scss">
.dragging-clips {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
