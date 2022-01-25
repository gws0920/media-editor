import { defineStore } from 'pinia';
import { Clip, Track } from '@/types'

type ClipState = {
  curClips: Set<Clip>
  curTracks: Set<Track>
}

export const useClipStore = defineStore('timeline', {
  state: (): ClipState => ({
    curClips: new Set(),
    curTracks: new Set()
  }),
  actions: {
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