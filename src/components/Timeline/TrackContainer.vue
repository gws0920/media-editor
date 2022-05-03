<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import { computed, ref, watchEffect } from "vue"
import Track from './Track.vue'
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from '@/store/interactive'
import { useScroll } from "@vueuse/core";
import { OTHER_TRACK_HEIGHT, TRACK_TYPE, VIDEO_TRACK_HEIGHT, TRACK_MARGIN, TRACK_CONTROL_WIDTH } from '@/utils'
const CONTROL_WIDTH = ref(TRACK_CONTROL_WIDTH + 'px')
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore: InteractiveStore = useInteractiveStore()

const el = ref<HTMLElement | null>(null)
const { x, y } = useScroll(el)

watchEffect(() => {
  // console.log(x.value);
})
const lineYStyle = computed(() => ({
  transform: `translateX(${interactiveStore.lineY.pos}px)`,
  left: -x + 'px',
  height: timelineStore.tlData.tracks.reduce((sum, item) => {
    if (item.type === TRACK_TYPE.VIDEO) sum += VIDEO_TRACK_HEIGHT
    else sum += OTHER_TRACK_HEIGHT
    return sum
  }, 0) + 'px'
}))

const onScroll = (e:Event) => {
  if (!e.target) return
  const dom = e.target
  const scrollTop = (<HTMLDivElement>dom).scrollTop
  const controls = document.querySelector('.track-controls')
  controls && (controls.scrollTop = scrollTop)
}
</script>

<template>
  <div class="track-container" ref="el" @scroll="onScroll"  @click="timelineStore.clearCurClip">
    <Track v-for="track in timelineStore.tlData.tracks" :key="track.id" :track="track" />
    <!-- 对齐线 -->
    <div
      class="line-y"
      v-if="interactiveStore.lineY.show"
      :style="lineYStyle"
    ></div>
    <div
      class="line-x"
      v-if="interactiveStore.lineX.show"
      :style="{ transform: `translateY(${interactiveStore.lineX.pos + TRACK_MARGIN}px)` }"
    ></div>
  </div>
</template>

<style lang="scss">
.track-container {
  grid-area: container;
  position: relative;
  height: calc(55vh - 156px);
  width: calc(100vw - v-bind(CONTROL_WIDTH));
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
    top: 0;
    width: 0px;
    border: 1px dashed var(--primaryColor);
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
