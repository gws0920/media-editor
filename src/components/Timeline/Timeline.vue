<script setup lang="ts">
import ToolsBar from './ToolsBar.vue'
import Ruler from './Ruler.vue'
import TrackContainer from './TrackContainer.vue';
import TrackControls from './TrackControls.vue';
import DraggingClips from './DraggingClips.vue'
import SeekLine from './SeekLine.vue'
import { TRACK_CONTROL_WIDTH } from '@/utils';
import { ref } from 'vue'
const CONTROL_WIDTH = ref(TRACK_CONTROL_WIDTH + 'px')

</script>

<template>
  <div class="timeline">
    <ToolsBar />
    <Ruler />
    <TrackControls />
    <TrackContainer />
    <DraggingClips />
    <SeekLine></SeekLine>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  flex: 1;
  position: relative;
  grid-area: timeline;
  display: grid;
  overflow: hidden;
  grid-template-areas:
    "tools tools"
    "- ruler"
    "controls container";
  grid-template-rows: 42px 45px auto;
  grid-template-columns: v-bind(CONTROL_WIDTH) auto;
}
</style>
