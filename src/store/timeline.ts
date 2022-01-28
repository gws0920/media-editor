import { defineStore } from 'pinia';
import { Clip, Track } from '@/types'

export interface TimelineState {
  curClips: Set<Clip>
  curTracks: Set<Track>
  isDragging: boolean
}

export interface TimelineStore extends TimelineState {
  addCurClip: (clip:Clip) => void
  removeCurClip: (clip:Clip) => void
  clearCurClip: () => void
  addCurTracks: (track:Track) => void
  removeCurTracks: (track:Track) => void
  clearCurTracks: () => void
  setDragging: (isDragging: boolean) => void
}

export const useTimelineStore = defineStore('timeline', {
  state: (): TimelineState => ({
    curClips: new Set(),
    curTracks: new Set(),
    isDragging: false
  }),
  actions: {
    setDragging(isDragging: boolean) {
      this.isDragging = !!isDragging
    },
    addCurClip(clip:Clip) {
      this.curClips.add(clip)
    },
    removeCurClip(clip: Clip) {
      this.curClips.delete(clip)
    },
    clearCurClip() {
      this.curClips.clear()
    },

    addCurTracks(track:Track) {
      this.curTracks.add(track)
    },
    removeCurTracks(track: Track) {
      this.curTracks.delete(track)
    },
    clearCurTracks() {
      this.curTracks.clear()
    }
  }
})