import { TRACK_TYPE, CLIP_TYPE } from './utils'

export type Clip = {
  inPoint: number
  outPoint: number
  duration: number
  name: string
  id: string
  thumbnail: string,
  trimOut: number,
  trimIn: number,
  speed?: number,
  trackId: string,
  type: CLIP_TYPE
}

export interface Track {
  id: string,
  type: TRACK_TYPE,
  show: boolean
  volume: number
  clips: Array<Clip>
}

export type Timeline = {
  tracks: Track[]
  speed: number
}