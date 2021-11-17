import { TRACK_TYPE, MEDIA_TYPE } from '../../const'
const tracks = [
  {
    type: TRACK_TYPE.VIDEO,
    clips: [
      {
        inPoint: 0,
        outPoint: 2000000,
        duration: 2000000,
        id: '1',
        name: '第一个',
        thumbnail: 'https://dummyimage.com/480x270/79f2cb/FFFFFF&text=',
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
        id: '2',
        name: '第二个',
        thumbnail: 'https://dummyimage.com/480x270/ef79f2/FFFFFF&text=',
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
        id: '3',
        name: '第三个',
        thumbnail: 'https://dummyimage.com/480x270/90f279/FFFFFF&text=',
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
        id: '4',
        name: '第四个',
        thumbnail: 'https://dummyimage.com/480x270/f28079/FFFFFF&text=',
        mediaType: MEDIA_TYPE.VIDEO
      }
    ]
  },
]

export default tracks