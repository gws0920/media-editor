import { useState, createRef, useEffect } from 'react'
import styles from './index.module.scss'
import Controls from './Controls'
import { Stage, Layer, Group } from 'react-konva'
import Clip from './Clip'
import Ruler from './Ruler'
import { VIDEO_TRACK_HEIGHT, RULER_MAP, iTrack } from '../../const'
import trackData from './mockTracks'

// 拖拽吸附实例 https://konvajs.org/docs/sandbox/Objects_Snapping.html
// 读取json直接渲染 https://konvajs.org/docs/data_and_serialization/Complex_Load.html
const rulerHeight = 50
const PADDING = 500 // canvas 缓冲
export default function Timeline() {
  const [selected, setSelected] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const mainRef = createRef<HTMLDivElement>()
  const [width, setWidth] = useState<number>(window.innerWidth - 2)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [level, setLevel] = useState<number>(2)
  const trackRef = createRef<HTMLDivElement>()
  const trackScrollRef = createRef<HTMLDivElement>()
  const [tracks, setTracks] = useState<Array<iTrack>>(trackData)

  useEffect(() => {
    const mainDom = mainRef.current
    if (mainDom) {
      setHeight(mainDom.getBoundingClientRect().height - 2)
    }
  })
  const onScroll = (e: any) => {
    if (!e) return
    const { scrollLeft, scrollTop } = e.target
    setScrollX(scrollLeft)
    setScrollY(scrollTop)
    if (trackRef && trackRef.current && trackRef.current !== e.target) {
      trackRef.current.scrollTop = scrollTop
    }
    if (trackScrollRef && trackScrollRef.current && trackScrollRef.current !== e.target) {
      trackScrollRef.current.scrollTop = scrollTop
    }
  }
  const changeRulerLevel = (change: number) => {
    let l = Math.min(level + change, RULER_MAP.length - 1)
    l = Math.max(0, l)
    setLevel(l)
  }
  return (
    <section className={styles.timeline}>
      <Controls changeRulerLevel={changeRulerLevel} />
      {/* 时码线 */}
      <Ruler
        className={styles.rulerStage}
        rulerHeight={rulerHeight}
        style={{ marginLeft: 140 + 'px' }}
        width={width}
        scrollX={scrollX}
        level={level}
      />
      <main ref={mainRef} style={{ width: width + 'px' }}>
        <aside
          onScroll={onScroll}
          ref={trackRef}
          style={{ height: height + 'px' }}
        >
          {tracks.map((track, index) => (
            <div
              key={index}
              className={styles.trackItem}
              style={{ height: VIDEO_TRACK_HEIGHT + 'px' }}
            >
              {index}
            </div>
          ))}
        </aside>
        <div
          ref={trackScrollRef}
          className={styles.container}
          style={{ height: height + 'px' }}
          onScroll={onScroll}>
          <div
            className={styles.trackListScroll}
          >
            <Stage
              className={styles.stage}
              width={width - 140 + PADDING * 2}
              height={tracks.length * VIDEO_TRACK_HEIGHT}
              style={{ transform: `translate(${scrollX}px, 0)` }}
              onClick={e => setSelected(e?.target?.parent?.attrs?.id)}
            >
              <Layer>
                {tracks.map((track, trackIndex) => (
                  <Group>
                    {track.clips.map(clip => (
                      <Clip
                        selectedId={selected}
                        clip={clip}
                        trackIndex={trackIndex}
                        level={level}
                      />
                    ))}
                  </Group>
                ))}
                
              </Layer>
            </Stage>
          </div>
        </div>
      </main>
    </section>
  )
}