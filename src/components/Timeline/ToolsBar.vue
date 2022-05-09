<script setup lang="ts">
import { computed } from 'vue'
import { Undo, Redo, Delete, Cut, AddAlt, SubtractAlt, FitToScreen, SplitScreen } from '@vicons/carbon'
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
        <NTooltip>
          <template #trigger>
            <NIcon :size="18" class="icon">
              <Undo />
            </NIcon>
          </template>
          撤销
        </NTooltip>
        
        <NTooltip>
          <template #trigger>
            <NIcon :size="18" class="icon">
              <Redo />
            </NIcon>
          </template>
          恢复
        </NTooltip>
    
        <NDivider vertical />

        <NTooltip>
          <template #trigger>
            <NIcon :size="18" :class="{disabled: !hasSelection}" @click="deleteCurClips">
              <Delete />
            </NIcon>
          </template>
          删除
        </NTooltip>
        
        <NTooltip>
          <template #trigger>
            <NIcon :size="18" class="icon">
              <Cut />
            </NIcon>
          </template>
          切割
        </NTooltip>
       
        <NTooltip>
          <template #trigger>
            <NIcon :size="18" class="icon">
              <SplitScreen />
            </NIcon>
          </template>
          单声道分离
        </NTooltip>
        
      </NSpace>
      <NSpace class="tools-bar-right">
        <NTooltip>
          <template #trigger>
            <NIcon
              :size="18"
              :class="['icon', interactiveStore.level === 0 ? 'disabled' : '']"
              title=""
              @click="changeLevel(-1)"
            >
              <SubtractAlt />
            </NIcon>
          </template>
          时间线缩小
        </NTooltip>

        <n-slider
          v-model:value="level"
          class="level"
          :step="1"
          :min="0"
          :max="RULER_MAP.length - 1"
        />

        <NTooltip>
          <template #trigger>
            <NIcon
              :size="18"
              :class="['icon', interactiveStore.level === RULER_MAP.length - 1 ? 'disabled' : '']"
              @click="changeLevel(1)"
            >
              <AddAlt />
            </NIcon>
          </template>
          时间线放大
        </NTooltip>
        
        <NDivider vertical />

        
        <NTooltip>
          <template #trigger>
            <NIcon :size="18" class="icon">
              <FitToScreen />
            </NIcon>
          </template>
          全局显示
        </NTooltip>
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
