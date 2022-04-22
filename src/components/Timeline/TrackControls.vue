<script setup lang="ts">
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { VolumeUp, VolumeMute, Video, StringText, FaceSatisfied } from '@vicons/carbon'
import { Eye24Regular, EyeOff24Regular } from '@vicons/fluent'

import { NIcon, NSpace, NSlider } from 'naive-ui'
import { Track } from '@/types'
import { OTHER_TRACK_HEIGHT, TRACK_TYPE, VIDEO_TRACK_HEIGHT } from '@/utils'
const timelineStore: TimelineStore = useTimelineStore()

const getStyle = (track: Track) => {
  return {
    height: (track.type === TRACK_TYPE.VIDEO ? VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT) + 3 + 'px'
  }
}

const switchShow = (track: Track) => {
  track.show = !track.show
}
const changeVolume = (track: Track, volume:number) => {
  track.volume = volume
}

</script>

<template>
  <div class="track-controls">
    <NSpace
      class="control"
      :style="getStyle(track)"
      v-for="track in timelineStore.tlData.tracks"
      :key="track.id"
    >
      <NIcon :size="18" class="icon default">
        <Video v-if="track.type === TRACK_TYPE.VIDEO" />
        <FaceSatisfied v-else-if="track.type === TRACK_TYPE.STICKER" />
        <StringText v-else-if="track.type === TRACK_TYPE.CAPTION" />
      </NIcon>
      <NIcon :size="18" class="icon" @click="switchShow(track)">
        <Eye24Regular v-if="track.show" />
        <EyeOff24Regular v-else />
      </NIcon>
      <div class="volume" v-if="[TRACK_TYPE.VIDEO, TRACK_TYPE.AUDIO].includes(track.type)">
        <NIcon
          :size="18"
          class="icon"
          @click="changeVolume(track, track.volume === 0 ? 1 : 0)"
        >
          <VolumeUp v-if="track.volume > 0" />
          <VolumeMute v-else />
        </NIcon>
        <NSlider v-model:value="track.volume" :step="0.1" :min="0" :max="2" />
      </div>
    </NSpace>
  </div>
</template>

<style lang="scss">
.track-controls {
  grid-area: controls;
  max-height: calc(50vh - 120px);
  padding: 4px 0;
  overflow: hidden;
  .control {
    border-bottom: 1px solid transparent;
    padding: 0 4px;
    &:last-child {
      margin-bottom: 12px !important;
    }
    div:last-child {
      flex: 1;
    }
    .volume {
      display: flex;
      align-items: center;
      height: 100%;
      .icon {
        margin-right: 4px;
      }
      .n-slider-handles {
        left: 4px;
        right: 4px;
      }
      .n-slider-handle {
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>
