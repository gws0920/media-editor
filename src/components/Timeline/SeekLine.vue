<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { us2px, TRACK_CONTROL_WIDTH } from '@/utils'
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { useScroll } from "@vueuse/core";
const timelineStore:TimelineStore = useTimelineStore()
const containerEl = ref<HTMLDivElement|null>(null)
const CONTROL_WIDTH = ref(TRACK_CONTROL_WIDTH + 'px')
const { x, y } = useScroll(containerEl)
const style = computed(() => {
  const pos = us2px(timelineStore.seekVal)
  const v = pos - x.value
  return {
    transform: `translate(${v < 0 ? -200 : v}px)`
  }
})
onMounted(() => {
  containerEl.value = document.querySelector('.track-container')
})
</script>

<template>
  <div class="seek-line" :style="style"></div>
</template>

<style scoped lang="scss">
.seek-line {
  position: absolute;
  width: 1px;
  height: calc(100% - 42px);
  left: v-bind(CONTROL_WIDTH);
  top: 42px;
  background-color: var(--textColorBase);
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    transform: translateX(-50%);
    background-color: var(--textColorBase);
    left: 0;
    top: 0;
  }
  &::before {
    content: '';
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--textColorBase);
    position: absolute;
    top: 10px;
    transform: translateX(-50%);
  }
}
</style>
