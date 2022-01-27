<script setup lang="ts">
import Clip from './Clip.vue'
import { Track } from '@/types'
import { VIDEO_TRACK_HEIGHT, OTHER_TRACK_HEIGHT, TRACK_MARGIN } from '@/utils'
const props = defineProps<{track: Track}>()
const HEIGHT = VIDEO_TRACK_HEIGHT + 'px'
</script>

<template>
  <div class="track">
    <Clip
      v-for="clip in props.track.clips"
      :key="clip.id"
      :clip="clip"
    />
  </div>
</template>

<style scoped lang="scss">
.track {
  height: v-bind(HEIGHT);
  display: flex;
  position: relative;
  box-sizing: border-box;
}
</style>
