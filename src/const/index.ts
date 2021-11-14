export * from './enum'
export * from './interface'

// 时码线 每个刻度相距多少px
export const FPS = 25 // 帧率
export const RULER_MAP = [
  { STEP: 15, TIME: 1000000 / FPS, GROUP: 10 },
  { STEP: 10, TIME: 1000000 / 10, GROUP: 10 },
  { STEP: 10, TIME: 2000000, GROUP: 10 }, // 每格10px，对应1s, 每10格显示一次时间
  { STEP: 15, TIME: 3000000, GROUP: 10 },
  { STEP: 10, TIME: 6000000, GROUP: 10 },
]
export const VIDEO_TRACK_HEIGHT = 60
