<script setup lang="ts">
import Clip from './Clip.vue'
import { Track } from '@/types'
import { VIDEO_TRACK_HEIGHT, OTHER_TRACK_HEIGHT, TRACK_MARGIN, TRACK_TYPE } from '@/utils'
const props = defineProps<{track: Track}>()
const HEIGHT = (props.track.type === TRACK_TYPE.VIDEO ? VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT) + 'px'
</script>

<template>
  <div :class="['track', track.show ? '' : 'hidden']">
    <Clip
      v-for="(clip, index) in props.track.clips"
      :key="clip.id"
      :clip="clip"
      :index="index"
    />
  </div>
</template>

<style scoped lang="scss">
.track {
  height: v-bind(HEIGHT);
  display: flex;
  position: relative;
  box-sizing: border-box;
  transition: opacity .3s;
  &.hidden {
    opacity: .4;
  }
}
</style>
