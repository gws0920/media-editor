import { Clip } from "@/types"
import { us2px, px2us, VIDEO_TRACK_HEIGHT, COLORS } from "@/utils"

export const getClipThumbs = (clip: Clip) => {
  const { trimIn, trimOut, speed, duration, thumbnail, inPoint, outPoint } = clip
  const clipWidth = us2px(outPoint - inPoint)
  const itemWidth = (VIDEO_TRACK_HEIGHT - 4) / 9 * 16 // 每张图片的宽度

  let x = 0
  const result = []
  let index = 0
  while (x < clipWidth) {
    const url = thumbnail.replace('#color#', COLORS[index % COLORS.length]) + (~~(px2us(x) / 1000000) || '00')
    result.push(`url(${url}) ${x}px 0 /${itemWidth}px 101% no-repeat`)
    x += itemWidth
    index++
  }
  return result
}