<script setup lang="ts">
import ToolsBar from './ToolsBar.vue'
import Ruler from './Ruler.vue'
import TrackContainer from './TrackContainer.vue';
import TrackControls from './TrackControls.vue';
import DraggingClips from './DraggingClips.vue'


</script>

<template>
  <div class="timeline">
    <ToolsBar />
    <Ruler />
    <TrackControls />
    <TrackContainer />
    <DraggingClips />
  </div>
</template>

<style scoped lang="scss">
.timeline {
  grid-area: timeline;
  display: grid;
  grid-template-areas:
    "tools tools"
    "- ruler"
    "controls container";
  grid-template-rows: 42px 45px auto;
  grid-template-columns: 140px auto;
}
</style>
