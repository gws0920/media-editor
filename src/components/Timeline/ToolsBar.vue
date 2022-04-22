<script setup lang="ts">
import { computed } from 'vue'
import { Undo, Redo, Delete, Cut, AddAlt, SubtractAlt, FitToScreen, SplitScreen } from '@vicons/carbon'
import { NIcon, NSpace, NDivider, NSlider } from 'naive-ui'
import { InteractiveStore, useInteractiveStore } from "@/store/interactive"
import { TimelineStore, useTimelineStore } from '@/store/timeline'
import { RULER_MAP } from '@/utils'
const interactiveStore: InteractiveStore = useInteractiveStore()
const timelineStore: TimelineStore = useTimelineStore()
const level = computed({
  get() {
    return interactiveStore.level
  },
  set(val: number) {
    interactiveStore.setLevel(val)
  }
})
const changeLevel = (flag: number) => {
  let targetLevel = interactiveStore.level + flag
  targetLevel = Math.max(0, targetLevel)
  targetLevel = Math.min(RULER_MAP.length - 1, targetLevel)
  interactiveStore.setLevel(targetLevel)
}
const hasSelection = computed(() => {
  return timelineStore.curClips.size > 0
})
const deleteCurClips = () => {
  timelineStore.deleteCurClips()
}
</script>

<template>
  <div class="tools">
    <NDivider class="divider" />
    <div class="tools-bar">
      <NSpace class="tools-bar-left">
        <NIcon :size="18" class="icon" title="撤销">
          <Undo />
        </NIcon>
        <NIcon :size="18" class="icon" title="恢复">
          <Redo />
        </NIcon>
        <NDivider vertical />
        <NIcon :size="18" :class="{disabled: !hasSelection}" title="删除" @click="deleteCurClips">
          <Delete />
        </NIcon>
        <NIcon :size="18" class="icon" title="切割">
          <Cut />
        </NIcon>
        <NIcon :size="18" class="icon" title="单声道分离">
          <SplitScreen />
        </NIcon>
      </NSpace>
      <NSpace class="tools-bar-right">
        <NIcon
          :size="18"
          :class="['icon', interactiveStore.level === 0 ? 'disabled' : '']"
          title="时间线缩小"
          @click="changeLevel(-1)"
        >
          <SubtractAlt />
        </NIcon>
        <n-slider
          v-model:value="level"
          class="level"
          :step="1"
          :min="0"
          :max="RULER_MAP.length - 1"
        />
        <NIcon
          :size="18"
          :class="['icon', interactiveStore.level === RULER_MAP.length - 1 ? 'disabled' : '']"
          title="时间线放大"
          @click="changeLevel(1)"
        >
          <AddAlt />
        </NIcon>
        <NDivider vertical />
        <NIcon :size="18" class="icon" title="全局显示">
          <FitToScreen />
        </NIcon>
      </NSpace>
    </div>
    <NDivider class="divider" dashed />
  </div>
</template>

<style scoped lang="scss">
.tools {
  grid-area: tools;
  height: 100%;
}
.tools-bar {
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.tools-bar-right {
  display: flex;
  align-items: center;
}
.divider {
  margin: 0;
}

.level {
  width: 120px;
}
</style>
