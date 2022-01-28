<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { Clip } from '@/types'
import { px2us, us2px, getClipThumbs } from '@/utils'
import { useTimelineStore, TimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive"
interface Props {
  clip: Clip
}
const props = defineProps<Props>()
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore: InteractiveStore = useInteractiveStore()
const style = computed(() => {
  const { clip } = toRefs(props)
  const { inPoint, duration } = toRefs(clip.value)
  return {
    left: us2px(inPoint.value) + 'px',
    width: us2px(duration.value) + 'px',
    background: getClipThumbs(clip.value).join(',')
  }
})
let [startX, startY] = [0, 0] // 拖拽开始时的位置

const isSelected = computed(() => timelineStore.curClips.has(props.clip))
const classes = computed(() => {
  return {
    clip: true,
    active: isSelected.value
  }
})

const changeSelected = (e?: MouseEvent) => {
  if (e?.ctrlKey) {
    if (timelineStore.curClips.has(props.clip)) {
      timelineStore.removeCurClip(props.clip)
    } else {
      timelineStore.addCurClip(props.clip)
    }
  } else {
    timelineStore.clearCurClip()
    timelineStore.addCurClip(props.clip)
  }
}

const pointerdown = (e: PointerEvent) => {
  startX = e.clientX
  startY = e.clientY
  document.body.addEventListener('pointermove', pointermove)
  document.body.addEventListener('pointerup', pointerup, { once: true })
}
const pointermove = (e: PointerEvent) => {
  if (!timelineStore.curClips.has(props.clip)) {
    changeSelected(e)
  }
  if (Math.abs(e.clientX - startX) > 1 || Math.abs(e.clientY - startY) > 1) {
    interactiveStore.setDragging(true)
    interactiveStore.setTranslate(e.clientX - startX, e.clientY - startY)
    document.body.setPointerCapture(e.pointerId)
  }
}
const pointerup = (e: PointerEvent) => {
  document.body.removeEventListener('pointermove', pointermove)
  interactiveStore.setDragging(false)
  // 修改inPoint
  const [dx, dy] = interactiveStore.translate
  const offsetUs = px2us(dx)
  timelineStore.curClips.forEach(clip => {
    clip.inPoint += offsetUs
    clip.outPoint += offsetUs
  })
  interactiveStore.setTranslate()
  document.body.releasePointerCapture(e.pointerId)
}

</script>

<template>
  <div
    :class="classes"
    :id="props.clip.id"
    :style="style"
    v-show="!(isSelected && interactiveStore.isDragging)"
    @click="changeSelected"
    @pointerdown="pointerdown"
  >
    <p>{{ props.clip.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.clip {
  height: calc(100% - 2px);
  box-sizing: border-box;
  border-radius: 3px;
  border: 2px solid var(--borderColor);
  position: absolute;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  transition: border-color 0.2s;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 4px 8px;
  }
  &.active {
    border-color: var(--primaryColor);
    z-index: 100;
    p {
      color: var(--primaryColor);
    }
  }
}
</style>
