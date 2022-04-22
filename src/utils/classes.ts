import { Clip as C, Track as T } from '@/types'
import { guid, TRACK_TYPE, CLIP_TYPE } from '@/utils'

export class Track {
  id: string
  type: TRACK_TYPE
  clips: C[]
  constructor (type: TRACK_TYPE) {
    this.id = guid()
    this.type = type
    this.clips = []
  }
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
  constructor (type: CLIP_TYPE) {
    this.inPoint = 0
    this.outPoint = 0
    this.name = ''
    this.id = guid()
    this.duration = 0
    this.thumbnail = ''
    this.trimOut = 0
    this.trimIn = 0
    this.trackId = ''
    this.type = type
  }
}