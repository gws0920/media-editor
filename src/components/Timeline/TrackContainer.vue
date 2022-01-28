<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import { computed } from "vue"
import Track from './Track.vue'
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from '@/store/interactive'
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore: InteractiveStore = useInteractiveStore()

</script>

<template>
  <NScrollbar class="track-container">
    <Track v-for="track in timelineStore.tlData.tracks" :key="track.id" :track="track" />
    <div
      class="line-y"
      v-if="interactiveStore.lineY.show"
      :style="{ transform: `translateX(${interactiveStore.lineY.pos}px)` }"
    ></div>
  </NScrollbar>
</template>

<style lang="scss">
.track-container {
  grid-area: container;
  height: 100%;
  max-height: calc(50vh - 125px);
  width: 100%;
  padding: 4px 0;
}
.line {
  &-y {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0px;
    border: 1px dashed var(--primaryColor);
    height: calc(50vh - 120px);
  }
}
</style>
