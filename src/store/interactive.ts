import { VIDEO_TRACK_HEIGHT } from './../utils/const';
import { px2us } from '@/utils'
import { us2px } from '@/utils'
import { useTimelineStore, TimelineStore } from './timeline'
// 交互、UI方面
import { defineStore } from 'pinia'

export interface InteractiveState {
  isDragging: boolean,
  translate: [number, number],
  sings: [us: number, px: number][] // 记录吸附点
  moveOffset: number
  level: number // 刻度尺 当前等级
  lineY: { show: boolean, pos: number } // 垂直吸附线信息
}

export interface InteractiveStore extends InteractiveState {
  setTranslate: (translateX?: number, translateY?: number) => void
  setDragging: (isDragging: boolean) => void
  setLevel: (level: number) => void
}

export const useInteractiveStore = defineStore('interactive', {
  state: (): InteractiveState => ({
    isDragging: false,
    translate: [0, 0],
    sings: [],
    moveOffset: 0,
    lineY: {
      show: false,
      pos: 0
    },
    level: 3
  }),
  actions: {
    setDragging(isDragging: boolean) {
      this.isDragging = !!isDragging
      const timelineStore: TimelineStore = useTimelineStore()
      if (isDragging) {
        this.sings = timelineStore.getSings()
      } else {
        this.sings = []
        // timelineStore 修改实际的时间线内容
        timelineStore.moveCurClips(this.moveOffset)
        this.setTranslate() // 复位
      }
    },
    setTranslate(translateX?: number, translateY?: number) {
      const timelineStore: TimelineStore = useTimelineStore()
      const minMax = timelineStore.getMinMax()
      this.translate = [
        this.computedTranslateX(translateX || 0, minMax),
        this.computerTranslateY(translateY || 0)
      ]
    },
    // 计算X轴吸附
    computedTranslateX(translateX: number, minMax: [number, number]): number {
      const [min, max] = minMax
      let x = translateX
      // 先比较左侧对齐
      const targetLeft = us2px(min) + translateX
      const singXL = this.sings.find(([us, px]) => Math.abs(px - targetLeft) < 5)
      if (singXL) {
        // 有吸附！左侧
        this.lineY = { show: true, pos: singXL[1] }
        x = singXL[1] - us2px(min) - 0 // 减去滚动条位置
        this.moveOffset = singXL[0] - min
      } else {
        // 再比较右侧对齐
        const targetRight = us2px(max) + translateX
        const singXR = this.sings.find(([us, px]) => Math.abs(px - targetRight) < 5)
        if (singXR) {
          // 有吸附 右侧
          this.lineY = { show: true, pos: singXR[1] }
          x = singXR[1] - us2px(max) - 0 // 减去滚动条位置
          this.moveOffset = singXR[0] - max
        } else {
          this.lineY = { show: false, pos: 0 }
          this.moveOffset = px2us(x)
        }
      }
      return x
    },
    // 计算Y轴轨道吸附
    computerTranslateY(translateY: number): number {
      return  Math.round(translateY / (VIDEO_TRACK_HEIGHT / 2)) * (VIDEO_TRACK_HEIGHT / 2)
    },
    setLevel(level: number) {
      this.level = level
    }
  }
})