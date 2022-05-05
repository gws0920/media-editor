<script setup lang="ts">
import Mock from 'mockjs'
import { ref } from 'vue'
import { NGrid, NGridItem, NCard, NEllipsis, NScrollbar } from 'naive-ui'
import { useTimelineStore, TimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive";
import { Clip } from '@/utils/classes'
import { CLIP_TYPE } from '@/utils'
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore:InteractiveStore = useInteractiveStore()

const data = {
  code: 200,
  "data|20": [{
    "duration|1000000-20000000": 20000000,
    "url": "@image(480x270, @color, #fff, 1)",
    "name": "@name",
    "thumbnail": "https://dummyimage.com/480x270/#color#/FFFFFF&text=",
    "id": "@guid"
  }]
}
const res = Mock.mock(data)
const list = ref(res.data)
interface Item {
  duration: number,
  name: string,
  url: string
}
let dragItem: Item|null = null
const pointerdown = (e:PointerEvent, item: Item) => {
  dragItem = item
  document.body.addEventListener('pointermove', pointermove)
  document.body.addEventListener('pointerup', () => {
    document.body.releasePointerCapture(e.pointerId)
    document.body.removeEventListener('pointermove', pointermove)
    interactiveStore.isDragging = false
    timelineStore.clearCurClip()
  }, { once: true })
}
const pointermove = (e:PointerEvent) => {
  if (!dragItem) return
  if (!interactiveStore.isDragging) {
    interactiveStore.isDragging = true
    timelineStore.clearCurClip()
    const clip = new Clip({
      ...dragItem,
      type: CLIP_TYPE.VIDEO,
      inPoint: 0,
      outPoint: dragItem.duration
    })
    timelineStore.addCurClip(new Clip(clip))
  }
  interactiveStore.setTranslate(e.clientX - 10, e.clientY - 10)
  document.body.setPointerCapture(e.pointerId)
}

</script>

<template>
  <n-scrollbar style="max-height: 100%;">
    <NGrid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" :x-gap="12">
      <NGridItem v-for="item in list" :key="item.id">
        <NCard :bordered="false" @pointerdown="pointerdown($event, item)">
          <template #cover>
            <img :src="item.url" @dragstart.prevent />
          </template>
          <n-ellipsis style="max-width: 100%;">{{ item.name }}</n-ellipsis>
        </NCard>
      </NGridItem>
    </NGrid>
  </n-scrollbar>
</template>

<style scoped lang="scss">
img {
  aspect-ratio: 16 / 9;
  width: 100%;
}
</style>
