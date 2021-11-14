
import { TRACK_TYPE, MEDIA_TYPE } from './enum'
export interface iClip {
  inPoint: number
  outPoint: number
  duration: number
  name?: string
  id?: string
  thumbnail?: string,
  mediaType?: MEDIA_TYPE
}

export interface iTrack {
  type: TRACK_TYPE
  clips: Array<iClip>
}