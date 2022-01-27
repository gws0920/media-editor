<script setup lang="ts">
import { ref } from 'vue'
import { NScrollbar } from 'naive-ui'
import Track from './Track.vue'
import { Track as iTrack } from '@/types'

const props = defineProps<{ tracks: iTrack[]}>()
</script>

<template>
  <NScrollbar class="track-container">
    <Track
      v-for="track in props.tracks"
      :key="track.id"
      :track="track"
    />
  </NScrollbar>
</template>

<style lang="scss">
.track-container {
  grid-area: container;
  height: 100%;
  max-height: calc(50vh - 120px);
  width: 100%;
  padding: 4px 0;
}
</style>
