<script setup lang="ts">
import { ref } from 'vue'
const canvas = ref(null)
</script>

<template>
  <canvas ref="canvas" />
</template>

<style scoped lang="scss">
canvas {
  grid-area: ruler;
  width: 100%;
  height: 100%;
  background-color: #666;
}
</style>
