<script setup lang="ts">
import Mock from 'mockjs'
import { onMounted, ref } from 'vue'
import { NGrid, NGridItem, NCard, NEllipsis, NScrollbar } from 'naive-ui'
import { useTimelineStore, TimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive";
import { Clip } from '@/utils/classes'
import { CLIP_TYPE, OTHER_TRACK_HEIGHT, TRACK_TYPE, us2px, VIDEO_TRACK_HEIGHT } from '@/utils'
import { useScroll } from "@vueuse/core";

const containerEl = ref<HTMLDivElement|null>(null)
const { x, y } = useScroll(containerEl)
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore:InteractiveStore = useInteractiveStore()
let rect = { x: 0, y: 0 }
let sings:[number, number][] = []
let singsTracks: number[] = [] // 轨道可吸附的高度, 每条轨道的高度

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
let draggingClip: Clip|null = null
const pointerdown = (e:PointerEvent, item: Item) => {
  dragItem = item
  document.body.addEventListener('pointermove', pointermove)
  document.body.addEventListener('pointerup', pointerup, { once: true })
  containerEl.value = document.querySelector('.track-container')
  if (containerEl.value) {
    rect = containerEl.value?.getBoundingClientRect()
  }
}
const pointermove = (e:PointerEvent) => {
  if (!dragItem) return
  if (!interactiveStore.isDragging) {
    interactiveStore.isDragging = true
    timelineStore.clearCurClip()
    draggingClip = new Clip({
      ...dragItem,
      type: CLIP_TYPE.VIDEO,
      inPoint: 0,
      outPoint: dragItem.duration
    })
    timelineStore.addCurClip(draggingClip)
    sings = timelineStore.getSings() // 计算point所有可吸附的点
    singsTracks = [] // 计算track所有可吸附的top
    const trackHeight = draggingClip.type === CLIP_TYPE.VIDEO ?  VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT
    let last = 0
    timelineStore.tlData.tracks.reduce((top, track) => {
      if (draggingClip?.type && track.type === TRACK_TYPE[draggingClip.type]) {
        singsTracks.push(top)
        last = top
      }
      top += track.type === TRACK_TYPE.VIDEO ?  VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT
      return top
    }, 0)
    singsTracks.push(last + trackHeight)
    console.log(singsTracks);
  }
  const { clientX, clientY, pointerId } = e

  interactiveStore.setTranslate(computedTranslateX(e), computedTranslateY(e))
  
  document.body.setPointerCapture(pointerId)
}
// Clip吸附
const computedTranslateX = (e:PointerEvent) => {
  const { clientX, clientY } = e
  if (!draggingClip) return
  if (clientX >= rect.x && clientY >= rect.y) {
    // 在时间线区域内
    // inPoint吸附
    const sing = sings.find(([us, px]) => Math.abs(px - (clientX - rect.x + x.value - 10)) <= 5)
    if (sing) {
      const [us, px] = sing
      interactiveStore.lineY = { show: true, pos: px }
      draggingClip.inPoint = us
      draggingClip.outPoint = us + draggingClip.duration
      return px + rect.x - x.value
    }
    // outPoint吸附
    const clipWidth = us2px(draggingClip.duration)
    const singR = sings.find(([us, px]) => Math.abs(px - (clientX - rect.x + x.value - 10 + clipWidth)) <= 5)
    if (singR) {
      const [us, px] = singR
      interactiveStore.lineY = { show: true, pos: px }
      draggingClip.inPoint = us - draggingClip.duration
      draggingClip.outPoint = us
      return px + rect.x - clipWidth - x.value
    }
  }
  interactiveStore.lineY = { show: false, pos: 0 }
  return clientX - 10
}
// Track吸附
const computedTranslateY = (e:PointerEvent) => {
  const { clientX, clientY } = e
  if (!draggingClip) return
  const trackHeight = draggingClip.type === CLIP_TYPE.VIDEO ?  VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT
  for (let i = 0; i < singsTracks.length; i++) {
    const top = singsTracks[i];
    if (i === 0) {
      if (clientY < top + rect.y + 10 - trackHeight / 2) {
        // 插入第一轨，显示吸附线
        interactiveStore.lineX = { show: true, pos: top }
        return clientY - 10
      }
    } else if (i === singsTracks.length - 1) {
      if (clientY > top + rect.y - trackHeight / 4 - 10) {
        // 插入最后一轨，显示吸附线
        interactiveStore.lineX = { show: true, pos: top }
        return clientY - 10
      }
    }
    if (Math.abs(clientY - (top + rect.y)) < trackHeight / 4) {
      // 插入中间轨道
      interactiveStore.lineX = { show: true, pos: top }
      return top + rect.y - trackHeight / 2
    } else if (clientY - rect.y > top + trackHeight / 4 && clientY - rect.y < top + (trackHeight / 4) * 3) {
      interactiveStore.lineX = { show: false, pos: 0 }
      return top + rect.y
    }
  }
  interactiveStore.lineX = { show: false, pos: 0 }
  return clientY - 10
}

const pointerup = (e:PointerEvent) => {
  document.body.releasePointerCapture(e.pointerId)
  document.body.removeEventListener('pointermove', pointermove)
  interactiveStore.isDragging = false
  dragItem = null
  timelineStore.clearCurClip()
  interactiveStore.lineX = { show: false, pos: 0 }
  interactiveStore.lineY = { show: false, pos: 0 }
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
