
import { TRACK_TYPE, MEDIA_TYPE } from './enum'
export interface iClip {
  inPoint: number
  outPoint: number
  duration: number
  name?: string
  id?: string
  thumbnail: string,
  mediaType?: MEDIA_TYPE,
  trimOut: number,
  trimIn: number,
  speed: number
}

export interface iTrack {
  type: TRACK_TYPE,
  id: string,
  clips: Array<iClip>
}