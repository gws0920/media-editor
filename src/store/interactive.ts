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
  lineX: { show: boolean, pos: number } // 水平吸附线信息
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
    lineX: {
      show: false,
      pos: 0
    },
    level: 3
  }),
  actions: {
    setDragging(isDragging: boolean) {
      this.isDragging = !!isDragging
      if(!isDragging) {
        this.lineY = { show: false, pos: 0 } // 去除对齐线
        this.lineX = { show: false, pos: 0 } // 去除对齐线
      }
    },
    setTranslate(translateX?: number, translateY?: number) {
      this.translate = [translateX || 0, translateY || 0]
    },
    
    // 设置刻度尺等级
    setLevel(level: number) {
      this.level = level
    }
  }
})