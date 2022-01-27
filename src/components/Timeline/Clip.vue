<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { Clip } from '@/types'
import { us2px } from '@/utils';
import { useTimelineStore, TimelineStore } from '@/store/timeline'
interface Props {
  clip: Clip
}
const props = defineProps<Props>()
const timelineStore: TimelineStore = useTimelineStore()

const style = computed(() => {
  const { clip } = toRefs(props)
  const { inPoint, duration } = toRefs(clip.value)
  return {
    left: us2px(inPoint.value) + 'px',
    width: us2px(duration.value) + 'px'
  }
})
const classes = computed(() => {
  const curClips = timelineStore.curClips
  return {
    clip: true,
    active: curClips.has(props.clip)
  }
})

const changeSelected = (e: MouseEvent) => {
  if (e.ctrlKey) {
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
</script>

<template>
  <div :class="classes" :style="style" @click="changeSelected">
    <p>{{props.clip.name}}</p>
  </div>
</template>

<style scoped lang="scss">
.clip {
  height: calc(100% - 4px);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid var(--borderColor);
  position: absolute;
  overflow: hidden;
  user-select: none;
  transition: border-color .2s;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 4px 8px;
  }
  &.active {
    border-color: var(--primaryColor);
  }
}
</style>
