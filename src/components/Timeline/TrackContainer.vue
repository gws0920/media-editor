<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import { computed, ref, watchEffect } from "vue"
import Track from './Track.vue'
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from '@/store/interactive'
import { useScroll } from "@vueuse/core";
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore: InteractiveStore = useInteractiveStore()

const el = ref<HTMLElement | null>(null)
const { x, y } = useScroll(el)
console.log(el.value, x.value);

watchEffect(() => {
  console.log(x.value);
})

</script>

<template>
  <div class="track-container" ref="el">
    <Track v-for="track in timelineStore.tlData.tracks" :key="track.id" :track="track" />
    <div
      class="line-y"
      v-if="interactiveStore.lineY.show || true"
      :style="{ transform: `translateX(${interactiveStore.lineY.pos}px)`, left: -x + 'px' }"
    ></div>
    <div
      class="line-x"
      v-if="interactiveStore.lineX.show || true"
      :style="{ transform: `translateY(${interactiveStore.lineX.pos}px)` }"
    ></div>
  </div>
</template>

<style lang="scss">
.track-container {
  grid-area: container;
  position: relative;
  height: calc(50vh - 120px);
  width: calc(100vw - 140px);
  padding: 4px 0;
  overflow: auto;

  &::-webkit-scrollbar {
    background-color:#fff;
    width: 10px;
    height: 10px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: var(--base);
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius: 16px;
    // border:5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color:#a0a0a5;
    // border:4px solid #f4f4f4
  }

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {display:none}
}
.line {
  &-y {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0px;
    border: 1px dashed var(--primaryColor);
    height: calc(50vh - 120px);
    box-sizing: border-box;
  }
  &-x {
    position: absolute;
    left: 0;
    top: 0;
    height: 0;
    width: 100vw;
    box-sizing: border-box;
    border: 1px dashed var(--primaryColor);
  }
}
</style>
