import { us2px } from '@/utils';
import { defineStore } from 'pinia';
import { Clip, Track, Timeline } from '@/types'
import mockTimeline from '@/mock/timeline';
export interface TimelineState {
  tlData: Timeline
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
  getSings: () => [number, number][]
  getMinMax: () => [number, number]
  moveCurClips: (offset: number) => void
  isSameTrack: () => boolean
}

export const useTimelineStore = defineStore('timeline', {
  state: (): TimelineState => ({
    tlData: mockTimeline(),
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
    },

    /**
     * 获取吸附点, 不关联滚动条位置！ TODO: 目前是全量计算
     * @returns [[us, px], [us, px]]所有的吸附点，point表示时刻，px表示位置
     */
    getSings():[number, number][] {
      const { tracks } = this.tlData
      const sings = new Map()
      tracks.forEach(track => {
        track.clips.forEach(clip => {
          if (!this.curClips.has(clip)) {
            sings.set(clip.inPoint, us2px(clip.inPoint))
            sings.set(clip.outPoint, us2px(clip.outPoint))
          }
        })
      });
      return [...sings.entries()]
    },
    /**
     * 获取选中的clip中，最大、最小的point
     */
    getMinMax() {
      let res: [number, number] = [Infinity, -Infinity]
      this.curClips.forEach(clip => {
        const [min, max] = res
        if (clip.inPoint < min) res[0] = clip.inPoint
        if (clip.outPoint > max) res[1] = clip.outPoint
      })
      return res
    },
    // 当前选中的clip是否为同轨道
    isSameTrack():boolean {
      return [...this.curClips].every((clip, _, arr) => clip.trackId === arr[0].trackId)
    },
    // 移动当前选中的clips
    moveCurClips(offset: number) {
      this.curClips.forEach(clip => {
        clip.inPoint += offset
        clip.outPoint += offset
      })
    }
  }
})