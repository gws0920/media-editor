import { guid, CLIP_TYPE, TRACK_TYPE } from '@/utils'
import { Clip, Timeline, Track } from '@/types'
import { Clip as ClipClass, Track as TrackClass } from '@/utils/classes'
import Mock from 'mockjs'


export function mockClips(clipLength: number | [number, number], trackId: string): Clip[] {
  let length = 0
  if (Array.isArray(clipLength)) {
    let [min, max] = clipLength
    length = ~~(Math.random() * (max - min)) + min
  } else length = clipLength

  const json = {
    [`data|${length}`]: [{
      "duration|1000000-20000000": 20000000,
      "thumbnail": "https://dummyimage.com/480x270/#color#/FFFFFF&text=",
      "name": "@ctitle(3,15)",
    }]
  }
  const data = Mock.mock(json)
  let inPoint = 0
  return data.data.map((clip: Clip) => {
     const c = new ClipClass({
       ...clip,
       inPoint,
       trackId,
       outPoint: inPoint + clip.duration,
       type: CLIP_TYPE.VIDEO
     })
     inPoint += clip.duration + ~~(3000000 * Math.random())
     return c
  })
}
export function mockCaptions(clipLength: number | [number, number], trackId: string, type: CLIP_TYPE):Clip[] {
  let length = 0
  if (Array.isArray(clipLength)) {
    let [min, max] = clipLength
    length = ~~(Math.random() * (max - min)) + min
  } else length = clipLength

  const json = {
    [`data|${length}`]: [{
      "duration|1000000-20000000": 20000000,
      "name": "@ctitle(3,8)",
    }]
  }

  const data = Mock.mock(json)
  let inPoint = 0
  return data.data.map((clip: Clip) => {
      const c = new ClipClass({
       ...clip,
       inPoint,
       trackId,
       outPoint: inPoint + clip.duration,
       type
     })
     inPoint += clip.duration + ~~(3000000 * Math.random())
     return c
  })
}
export function mockTracks(trackLength: number, clipLength: number | [number, number]):Track[] {
  const tracks = []
  for (let i = 0; i < trackLength; i++) {
    const id = guid()
    tracks.push(new TrackClass({
      id,
      type: TRACK_TYPE.VIDEO,
      show: true,
      volume: 1,
      clips: mockClips(clipLength, id)
    }))
  }
  
  // 贴纸轨道
  const id2 = guid()
  tracks.push(new TrackClass({
    id: id2,
    type: TRACK_TYPE.STICKER,
    show: true,
    clips: mockCaptions(clipLength, id2, CLIP_TYPE.STICKER)
  }))

  // 字幕轨道
  const id = guid()
  tracks.push(new TrackClass({
    id,
    type: TRACK_TYPE.CAPTION,
    show: true,
    clips: mockCaptions(clipLength, id, CLIP_TYPE.CAPTION)
  }))
  return tracks
}

export default function mockTimeline(trackLength:number = 3, clipLength: number | [number, number] = [3, 18]):Timeline {
  return {
    tracks: mockTracks(trackLength, clipLength),
    speed: 1
  }
}