import { useState, useEffect } from 'react'
import { VIDEO_TRACK_HEIGHT, iClip, TRACK_MARGIN, COLORS, BORDER_WIDTH, THUMBNAIL_GROUP } from '../../../const'
import { us2px, px2us } from '../../../utils'
import { Image, Group } from 'react-konva'

interface iProps {
  clip: iClip,
  level: number
}
// TODO: 暂时没用到trim和speed，以后再完善
export default function Thumbnail(props: iProps) {
  // const [list, setList] = useState<JSX.Element[]>([])
  const { level, clip } = props
  const [list, setList] = useState<Array<{ x: number, img: any }>>([])
  const { trimIn, trimOut, speed, duration, thumbnail, inPoint, outPoint } = clip
  const itemWidth = (VIDEO_TRACK_HEIGHT - TRACK_MARGIN - BORDER_WIDTH * 2) / 9 * 16 // 每张图片的宽度
  const clipWidth = us2px(outPoint - inPoint, level)

  const getImageList = async () => {
    let x = 0
    const result = []
    let index = 0
    while (x < clipWidth) {
      const url = thumbnail.replace('#color#', COLORS[index % COLORS.length]) + (~~(px2us(x, level) / 1000000) || '00')
      const img = await uImg(url)
      result.push({
        img, x
      })
      x += itemWidth
      index++
    }
    return result
  }
  useEffect(() => {
    getImageList().then(list => {
      setList(list)
      console.log('更新缩略图', clip.name)
    })
  }, [clip, level])
  return (
    <Group
      clip={{
        x: BORDER_WIDTH,
        y: BORDER_WIDTH,
        width: clipWidth - BORDER_WIDTH * 2,
        height: VIDEO_TRACK_HEIGHT - BORDER_WIDTH * 2
      }}
      name={THUMBNAIL_GROUP}
      width={clipWidth - BORDER_WIDTH * 2}
    >
      {list.map(item => (
        <Image
          image={item.img}
          key={item.x}
          x={item.x}
          y={0}
          width={itemWidth}
          height={VIDEO_TRACK_HEIGHT - TRACK_MARGIN - BORDER_WIDTH}
        />
      ))}
    </Group>
  )
}

const uImg = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = url
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => reject(img)
  })
}