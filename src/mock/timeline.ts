import { guid } from '@/utils'
import { Clip } from '@/types'
import Mock from 'mockjs'


export function mockClips(clipLength: number | [number, number]) {
  let length = 0
  if (Array.isArray(clipLength)) {
    let [min, max] = clipLength
    length = ~~(Math.random() * (max - min)) + min
  } else length = clipLength

  const json = {
    [`data|${length}`]: [{
      "duration|1000000-20000000": 20000000,
      "thumbnails": "@image(480x270, @color)",
      "name": "@name",
      "id": "@guid"
    }]
  }
  const data = Mock.mock(json)
  let inPoint = 0
  return data.data.map((clip: Clip) => {
     const c = {
       ...clip,
       inPoint,
       outPoint: inPoint + clip.duration
     }
     inPoint += clip.duration
     return c
  })
}
export function mockTracks(trackLength: number, clipLength: number | [number, number]) {
  const tracks = []
  for (let i = 0; i < trackLength; i++) {
    tracks.push({
      id: guid(),
      clips: mockClips(clipLength)
    })
  }
  return tracks
}

export default function mockTimeline(trackLength:number = 5, clipLength: number | [number, number] = [4,8]) {
  return {
    tracks: mockTracks(trackLength, clipLength)
  }
}