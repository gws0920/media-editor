<script setup lang="ts">
import { computed  } from 'vue';
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { us2FrameTime } from '@/utils'
import { Stop, Play, SkipBack, SkipForward } from '@vicons/carbon'
import { NSpace, NIcon, NDropdown, NButton } from 'naive-ui'

const timelineStore:TimelineStore = useTimelineStore()
const options = [
  { label: '0.5x', key: 0.5 },
  { label: '1x', key: 1 },
  { label: '1.5x', key: 1.5 },
  { label: '2x', key: 2 },
  { label: '4x', key: 4 },
  { label: '8x', key: 8 },
]

const seekTime = computed(() => {
  return us2FrameTime(timelineStore.seekVal)
})
const duration = computed(() => {
  return us2FrameTime(timelineStore.duration)
})
const play = () => {
  timelineStore.isPlaying = !timelineStore.isPlaying
}
const changeSpeed = (e:number) => {
  timelineStore.tlData.speed = e
}
</script>

<template>
  <div class="monitor">
    <canvas width="960" height="540"></canvas>
    <div class="controls">
      <code class="time">
        {{seekTime}}/{{duration}}
      </code>
      <NSpace class="tools-bar-left">
        <NIcon :size="18" class="icon" title="回到开始">
          <SkipBack />
        </NIcon>
        <NIcon :size="18" class="icon" :title="timelineStore.isPlaying ? '暂停' : '播放'" @click="play">
          <Play v-if="!timelineStore.isPlaying" />
          <Stop v-else></Stop>
        </NIcon>
        <NIcon :size="18" class="icon" title="回到末尾">
          <SkipForward />
        </NIcon>
      </NSpace>
      <div class="right">
        <n-dropdown trigger="click" :options="options" @select="changeSpeed">
          <n-button size="tiny" style="width: 36px">{{timelineStore.tlData.speed}}x</n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.monitor {
  display: flex;
  flex-direction: column;
  canvas {
    height: calc(100% - 38px);
    aspect-ratio: 16 / 9;
    background-color: #393939;
  }
  .controls {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0 8px;
    min-height: 38px;
    flex: 1;
    align-items: center;
  }
  .right {
    text-align: right;
  }
}
</style>