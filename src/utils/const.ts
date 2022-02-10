// 时码线 每个刻度相距多少px
export const FPS = 25 // 帧率
export const RULER_MAP = [
  { STEP: 15, TIME: 1000000 / FPS, GROUP: 10 },
  { STEP: 12, TIME: 1000000 / 10, GROUP: 10 },
  { STEP: 14, TIME: 1000000, GROUP: 10 }, // 每格14px，对应1s, 每10格显示一次时间
  { STEP: 16, TIME: 2000000, GROUP: 10 },
  { STEP: 18, TIME: 3000000, GROUP: 10 },
  { STEP: 16, TIME: 6000000, GROUP: 10 },
]
export const VIDEO_TRACK_HEIGHT = 60
export const OTHER_TRACK_HEIGHT = 40
export const TRACK_MARGIN = 2 // 轨道之间的间隙
export const COLORS = ['9a79f2', '7999f2','f2d879', '79f2b4']
