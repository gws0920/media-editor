<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { useCssVar } from '@vueuse/core'
import { RULER_MAP, px2us, us2FrameTime } from '@/utils'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive"
const interactiveStore: InteractiveStore = useInteractiveStore()

const canvas = ref<HTMLCanvasElement|null>(null)
const color = useCssVar('--textColorBase', document.body)
function draw() {
  const containerEl:HTMLDivElement|null = document.querySelector('.track-container')
  if (!canvas.value || !containerEl) return
  const { STEP, TIME, GROUP } = RULER_MAP[interactiveStore.level]
  const { offsetWidth, offsetHeight } = canvas.value
  canvas.value.width = offsetWidth
  canvas.value.height = offsetHeight
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  let x = -containerEl.scrollLeft % STEP
  ctx.beginPath()
  ctx.strokeStyle = color.value
  ctx.fillStyle = color.value
  ctx.font = '14px monospace'
  while (x < offsetWidth) {
    const isGroup = ((x + containerEl.scrollLeft) / STEP) % GROUP === 0
    ctx.moveTo(x, offsetHeight / (isGroup ? 2 : 1.5))
    ctx.lineTo(x, offsetHeight)
    if (isGroup) {
      const text = us2FrameTime(px2us(x + containerEl.scrollLeft))
      ctx.fillText(text, x - 39, 15)
    }
    x += STEP
  }
  ctx.closePath()
  ctx.stroke()
}

onBeforeUnmount(() => {
  const el:HTMLDivElement|null = document.querySelector('.track-container')
  el?.removeEventListener('scroll', draw)
  window.removeEventListener('resize', draw)
})
onMounted(() => {
  const el:HTMLDivElement|null = document.querySelector('.track-container')
  el?.addEventListener('scroll', draw)
  window.addEventListener('resize', draw)
  draw()
})
watch(interactiveStore, () => draw())

</script>

<template>
  <canvas ref="canvas" />
</template>

<style scoped lang="scss">
canvas {
  grid-area: ruler;
  width: 100%;
  height: 100%;
}
</style>
