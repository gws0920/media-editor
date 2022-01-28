import { defineStore } from 'pinia';

export interface InteractiveState {
  isDragging: boolean,
  translate: [number, number]
}

export interface InteractiveStore extends InteractiveState {
  setTranslate: (translateX?: number, translateY?: number) => void
  setDragging: (isDragging: boolean) => void
}

export const useInteractiveStore = defineStore('interactive', {
  state: (): InteractiveState => ({
    isDragging: false,
    translate: [0, 0]
  }),
  actions: {
    setDragging(isDragging: boolean) {
      this.isDragging = !!isDragging
    },
    setTranslate(translateX?: number, translateY?: number) {
      this.translate = [translateX || 0, translateY || 0]
    }
  }
})