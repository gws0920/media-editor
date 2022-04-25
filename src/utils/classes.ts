import { Clip as C, Track as T } from '@/types'
import { guid, TRACK_TYPE, CLIP_TYPE } from '@/utils'

interface TrackOptions {
  type: TRACK_TYPE,
  show?: boolean,
  volume?: number,
  id?: string,
  clips?: C[]
}
export class Track {
  id: string
  type: TRACK_TYPE
  show: boolean
  volume: number
  clips: C[]
  constructor (options: TrackOptions) {
    this.id = options.id || guid()
    this.type = options.type
    this.clips = options.clips || []
    this.volume = options.volume === undefined ? 1 : options.volume
    this.show = options.show === undefined ? true : options.show
  }
}

interface ClipOptions {
  inPoint?: number
  outPoint?: number
  duration?: number
  name?: string
  thumbnail?: string
  trimOut?: number
  trimIn?: number
  speed?: number
  trackId?: string
  id?: string
  type: CLIP_TYPE
}
export class Clip {
  inPoint: number
  outPoint: number
  duration: number
  name: string
  id: string
  thumbnail: string
  trimOut: number
  trimIn: number
  speed?: number
  trackId: string
  type: CLIP_TYPE
  constructor (options: ClipOptions) {
    this.inPoint = options.inPoint === undefined ? 0 : options.inPoint
    this.outPoint = options.outPoint === undefined ? 0 : options.outPoint
    this.name = options.name || ''
    this.id = options.id || guid()
    this.duration = options.duration === undefined ? 0 : options.duration
    this.thumbnail = options.thumbnail || ''
    this.trimOut = options.trimOut === undefined ? 0 : options.trimOut
    this.trimIn = options.trimIn === undefined ? 0 : options.trimIn
    this.trackId = options.trackId || ''
    this.type = options.type
  }
}