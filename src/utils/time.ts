import { FPS, RULER_MAP } from '../const'
/**
 * 微秒 -> 时：分：秒：帧
 */
export function us2FrameTime(us: number): string {
  const frame = ~~(us % 1000000 / 1000000 *  FPS) // 帧
  const s = Math.floor(us / 1000000) // 秒
  const min = Math.floor(s / 60) // 分
  const h = Math.floor(min / 60) // 时
  return `${prefixZero(h)}:${prefixZero(min % 60)}:${prefixZero(s % 60)}:${prefixZero(frame)}`
}

/**
 * 微秒 -> 时：分：秒：帧
 */
 export function us2Time(us: number): string {
  const s = Math.floor(us / 1000000) // 秒
  const min = Math.floor(s / 60) // 分
  const h = Math.floor(min / 60) // 时
  return `${prefixZero(h)}:${prefixZero(min % 60)}:${prefixZero(s % 60)}`
}

/**
* 数字补零
* @param num： 被操作数
* @param n： 固定的总位数
*/
export function prefixZero(num: number|string, n = 2) {
  return (Array(n).join('0') + num).slice(-n);
}

/**
 * us -> px
 */
export function us2px(us: number, level = 3): number {
  const { STEP, TIME } = RULER_MAP[level]
  return STEP / TIME * us
}

/**
 * px -> us
 */
 export function px2us(px: number, level = 3): number {
  const { STEP, TIME } = RULER_MAP[level]
  return ~~(TIME / STEP * px)
}
