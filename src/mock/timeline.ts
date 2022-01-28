import { guid } from '@/utils'
import { Clip } from '@/types'
import Mock from 'mockjs'


export function mockClips(clipLength: number | [number, number], trackId: string) {
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
      "id": "@guid"
    }]
  }
  const data = Mock.mock(json)
  let inPoint = 0
  return data.data.map((clip: Clip) => {
     const c = {
       ...clip,
       inPoint,
       trackId,
       outPoint: inPoint + clip.duration
     }
     inPoint += clip.duration
     return c
  })
}
export function mockTracks(trackLength: number, clipLength: number | [number, number]) {
  const tracks = []
  for (let i = 0; i < trackLength; i++) {
    const id = guid()
    tracks.push({
      id,
      clips: mockClips(clipLength, id)
    })
  }
  return tracks
}

export default function mockTimeline(trackLength:number = 3, clipLength: number | [number, number] = [3, 18]) {
  return {
    tracks: mockTracks(trackLength, clipLength)
  }
}