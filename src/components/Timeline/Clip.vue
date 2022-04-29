<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import { Clip } from '@/types'
import { NIcon } from 'naive-ui'
import { Column } from '@vicons/carbon'
import { px2us, us2px, getClipThumbs, VIDEO_TRACK_HEIGHT, CLIP_TYPE, CLIP_BACKGROUND_COLOR, TRACK_TYPE, OTHER_TRACK_HEIGHT, range } from '@/utils'
import { useTimelineStore, TimelineStore } from '@/store/timeline'
import { useInteractiveStore, InteractiveStore } from "@/store/interactive"
interface Props {
  clip: Clip
  index: number
}

const props = defineProps<Props>()
const timelineStore: TimelineStore = useTimelineStore()
const interactiveStore: InteractiveStore = useInteractiveStore()
const style = computed(() => {
  const { clip } = toRefs(props)
  const { inPoint, outPoint } = toRefs(clip.value)
  const background = clip.value.type === CLIP_TYPE.VIDEO ? getClipThumbs(clip.value).join(',') : CLIP_BACKGROUND_COLOR[clip.value.type]
  return {
    left: us2px(inPoint.value) + 'px',
    width: us2px(outPoint.value - inPoint.value) + 'px',
    background
  }
})
let [startX, startY] = [0, 0] // 拖拽开始时的位置
let [startInPoint, startOutPoint] = [props.clip.inPoint, props.clip.outPoint]
const isTrimInDragging = ref(false)
const isTrimOutDragging = ref(false)
const scrollContainer = document.querySelector('.track-container')
let sings:[us: number, px: number][] = []
const isSelected = computed(() => timelineStore.curClips.has(props.clip))
const classes = computed(() => {
  return {
    clip: true,
    'center-clip': ![CLIP_TYPE.VIDEO, CLIP_TYPE.AUDIO].includes(props.clip.type), // 文字居中的clip
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

// 拖拽开始
const pointerdown = (e: PointerEvent) => {
  startX = e.clientX
  startY = e.clientY
  document.body.addEventListener('pointermove', pointermove)
  document.body.addEventListener('pointerup', pointerup, { once: true })
}

// 拖拽中
const pointermove = (e: PointerEvent) => {
  if (!timelineStore.curClips.has(props.clip)) {
    changeSelected(e)
  }
  const targetX = e.clientX - startX
  const targetY = e.clientY - startY
  if (Math.abs(targetX) > 1 || Math.abs(targetY) > 1) {
    if (!interactiveStore.isDragging) {
      interactiveStore.setDragging(true)
      interactiveStore.sings = timelineStore.getSings()
    }
    // 获取选中clip入出点
    const minMax = timelineStore.getMinMax()
    const [translateX, translateY] = [e.clientX - startX, e.clientY - startY]
    interactiveStore.setTranslate(
      computedTranslateX(translateX || 0, minMax),
      computerTranslateY(translateY || 0)
    )
    document.body.setPointerCapture(e.pointerId)
  }
}
// 计算X方向吸附效果
const computedTranslateX = (translateX: number, minMax: [number, number]): number => {
  const [min, max] = minMax
  let x = translateX
  // 先比较左侧对齐
  const targetLeft = us2px(min) + translateX
  const singXL = interactiveStore.sings.find(([us, px]) => Math.abs(px - targetLeft) < 5)
  
  if (singXL) {
    // 有吸附！左侧
    interactiveStore.lineY = { show: true, pos: singXL[1] + (scrollContainer?.scrollLeft || 0) }
    x = singXL[1] - us2px(min) - 0 // 减去滚动条位置
    interactiveStore.moveOffset = singXL[0] - min
  } else {
    // 再比较右侧对齐
    const targetRight = us2px(max) + translateX
    const singXR = interactiveStore.sings.find(([us, px]) => Math.abs(px - targetRight) < 5)
    if (singXR) {
      // 有吸附 右侧
      interactiveStore.lineY = { show: true, pos: singXR[1] + (scrollContainer?.scrollLeft || 0) }
      x = singXR[1] - us2px(max) - 0 // 减去滚动条位置
      interactiveStore.moveOffset = singXR[0] - max
    } else {
      interactiveStore.lineY = { show: false, pos: 0 }
      interactiveStore.moveOffset = px2us(x)
    }
  }
  return x
}
// 计算Y方向吸附效果
const computerTranslateY = (translateY: number): number => {
  if (!timelineStore.isSameTrack()) return 0 // 多选状态下，只有同轨clip可以跨轨拖拽
  const tracks = timelineStore.tlData.tracks
  const curClipsTrackId = [...timelineStore.curClips][0].trackId // 当前选中clip 所处的轨道id
  const curClipTrack = tracks.find(track => track.id === curClipsTrackId)
  const curTrackIndex = curClipTrack ? tracks.indexOf(curClipTrack) : -1
  let target = false // 是否遇到自身所处的轨道
  const trackHeight = curClipTrack?.type === TRACK_TYPE.VIDEO ? VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT // 轨道高度

  // 计算该类型轨道 所处的位置范围
  let minY = -trackHeight / 2, maxY = -trackHeight / 2 // 上下吸附的区间px
  tracks.forEach(track => {
    if (track.id === curClipsTrackId) target = true
    if(track.type === curClipTrack?.type) {
      target ? (maxY += trackHeight) : (minY -= trackHeight)
    }
  })

  // 在同类轨道区间内拖拽
  if (translateY >= minY && translateY <= maxY) {
    const resultY = Math.round(translateY / (trackHeight / 2)) * (trackHeight / 2)
    if (resultY % trackHeight === 0) {
      // 隐藏对齐线
      interactiveStore.lineX = { show: false, pos: 0 }
      interactiveStore.moveOffsetY = resultY
    } else {
      // 当前规定本身做处的位置Y
      const oldY = tracks.reduce((h, { type }, index) => {
        if (index < curTrackIndex) return h + (type === TRACK_TYPE.VIDEO ? VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT)
        return h
      }, 0)
      interactiveStore.lineX = {
        show: true,
        pos: resultY + oldY + trackHeight / 2
      }
      interactiveStore.moveOffsetY = resultY
    }
    return resultY
  }

  return translateY
}

// 拖拽结束
const pointerup = (e: PointerEvent) => {
  document.body.removeEventListener('pointermove', pointermove)
  document.body.releasePointerCapture(e.pointerId)

  interactiveStore.sings = []
  interactiveStore.setDragging(false)
  // timelineStore 修改实际的时间线内容
  const {moveOffset, moveOffsetY} = interactiveStore
  timelineStore.moveCurClips(moveOffset, moveOffsetY)
  interactiveStore.moveOffset = 0
  interactiveStore.moveOffsetY = 0
  interactiveStore.setTranslate() // 复位
}

// Trim拖拽
const trimInPointerdown = (e:PointerEvent) => {
  startX = e.clientX
  startInPoint = props.clip.inPoint
  document.body.addEventListener('pointermove', trimInPointermove)
  document.body.addEventListener('pointerup', e => trimPointerup(e, trimInPointermove), { once: true})
  isTrimInDragging.value = true
  sings = timelineStore.getSings()
  document.body.style.cursor = 'col-resize'
}
const trimInPointermove = (e:PointerEvent) => {
  document.body.setPointerCapture(e.pointerId)
  const sing = sings.find(([us, px]) => Math.abs(px - (e.clientX - 140)) < 5 && us <= props.clip.outPoint)
  if (sing) {
    const [us, px] = sing
    props.clip.inPoint = range(us, [0, props.clip.outPoint])
    interactiveStore.lineY = { show: true, pos: px + (scrollContainer?.scrollLeft || 0) }
  } else {
    const diff = e.clientX - startX
    const diffDuration = px2us(diff)
    props.clip.inPoint = range(diffDuration + startInPoint, [0, props.clip.outPoint])
    interactiveStore.lineY = { show: false, pos: 0 }
  }
}

const trimOutPointerdown = (e:PointerEvent) => {
  startX = e.clientX
  startOutPoint = props.clip.outPoint
  document.body.addEventListener('pointermove', trimOutPointermove)
  document.body.addEventListener('pointerup', e => trimPointerup(e, trimOutPointermove), { once: true})
  isTrimOutDragging.value = true
  sings = timelineStore.getSings()
}
const trimOutPointermove = (e:PointerEvent) => {
  document.body.setPointerCapture(e.pointerId)
  const sing = sings.find(([us, px]) => Math.abs(px - (e.clientX - 140)) < 5 && us >= props.clip.inPoint)
  if (sing) {
    const [us, px] = sing
    props.clip.outPoint = range(us, [props.clip.inPoint, Infinity])
    interactiveStore.lineY = { show: true, pos: px + (scrollContainer?.scrollLeft || 0) }
  } else {
    const diff = e.clientX - startX
    const diffDuration = px2us(diff)
    props.clip.outPoint = range(diffDuration + startOutPoint, [props.clip.inPoint, Infinity])
    interactiveStore.lineY = { show: false, pos: 0 }
  }
}
const trimPointerup = (e:PointerEvent, fn:(e: PointerEvent) => void) => {
  document.body.removeEventListener('pointermove', fn)
  document.body.releasePointerCapture(e.pointerId)
  timelineStore.moveCurClips(0, 0)
  isTrimOutDragging.value = false
  isTrimInDragging.value = false
  interactiveStore.lineY = { show: false, pos: 0 }
  document.body.style.cursor = 'default'
}
</script>

<template>
  <div
    :class="classes"
    :id="props.clip.id"
    :style="style"
    v-show="!(isSelected && interactiveStore.isDragging)"
    @click.stop="changeSelected"
    @pointerdown="pointerdown"
  >
    <div class="left tagger" v-if="isSelected">
      <NIcon :class="['left', 'handle', isTrimInDragging ? 'dragging' : '']" @pointerdown.stop="trimInPointerdown">
        <Column />
      </NIcon>
    </div>
    <p>{{ props.clip.name }}</p>
    <div class="right tagger" v-if="isSelected">
      <NIcon :class="['right', 'handle', isTrimOutDragging ? 'dragging' : '']" @pointerdown.stop="trimOutPointerdown">
        <Column />
      </NIcon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clip {
  height: calc(100% - 2px);
  box-sizing: border-box;
  border-radius: 3px;
  border: 2px solid var(--borderColor);
  position: absolute;
  // overflow: hidden;
  user-select: none;
  cursor: pointer;
  transition: border-color 0.2s;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 4px 8px;
    font-size: 13px;
    color: white;
  }
  &.center-clip {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.active {
    border-color: var(--primaryColor);
    z-index: 100;
  }
  .tagger {
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    &:hover {
      .handle {
        opacity: 1;
      }
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  .handle {
    opacity: 0;
    position: absolute;
    top: 50%;
    background-color: var(--textColorBase);
    color: var(--tagColor);
    border-radius: 4px;
    height: 30px;
    transition: opacity 0.3s;
    cursor: col-resize;
    &.left {
      left: 0;
      transform: translate(-50%, -50%);
    }
    &.right {
      right: 0;
      transform: translate(50%, -50%);
    }
    &.dragging {
      opacity: 1;
    }
  }
}
</style>
