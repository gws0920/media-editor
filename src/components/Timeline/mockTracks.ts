import { TRACK_TYPE, MEDIA_TYPE } from '../../const'
const tracks = [
  {
    type: TRACK_TYPE.VIDEO,
    clips: [
      {
        inPoint: 0,
        outPoint: 2000000,
        duration: 2000000,
        trimIn: 0,
        trimOut: 2000000,
        speed: 1,
        id: '1',
        name: '第一个',
        thumbnail: 'https://dummyimage.com/480x270/#color#/FFFFFF&text=',
        mediaType: MEDIA_TYPE.VIDEO
      }
    ]
  },
  {
    type: TRACK_TYPE.VIDEO,
    clips: [
      {
        inPoint: 0,
        outPoint: 5000000,
        duration: 5000000,
        trimIn: 0,
        trimOut: 5000000,
        speed: 1,
        id: '2',
        name: '第二个',
        thumbnail: 'https://dummyimage.com/480x270/#color#/FFFFFF&text=',
        mediaType: MEDIA_TYPE.VIDEO
      }
    ]
  },
  {
    type: TRACK_TYPE.VIDEO,
    clips: [
      {
        inPoint: 0,
        outPoint: 30000000,
        duration: 30000000,
        trimIn: 0,
        trimOut: 30000000,
        speed: 1,
        id: '3',
        name: '第三个',
        thumbnail: 'https://dummyimage.com/480x270/#color#/FFFFFF&text=',
        mediaType: MEDIA_TYPE.VIDEO
      }
    ]
  },
  {
    type: TRACK_TYPE.VIDEO,
    clips: [
      {
        inPoint: 0,
        outPoint: 8000000,
        duration: 8000000,
        trimIn: 0,
        trimOut: 8000000,
        speed: 1,
        id: '4',
        name: '第四个',
        thumbnail: 'https://dummyimage.com/480x270/#color#/FFFFFF&text=',
        mediaType: MEDIA_TYPE.VIDEO
      }
    ]
  },
]

export default tracks