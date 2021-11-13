import { useState, createRef, useEffect } from 'react'
import styles from './index.module.scss'
import Controls from './Controls'
import { Stage, Layer } from 'react-konva'
import Clip from './Clip'
import Ruler from './Ruler'
import { VIDEO_TRACK_HEIGHT } from '../../const'
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
  const trackRef = createRef<HTMLDivElement>()
  const trackScrollRef = createRef<HTMLDivElement>()

  const tracks = [1, 2, 3, 4, 5]

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
  return (
    <section className={styles.timeline}>
      <Controls />
      {/* 时码线 */}
      <Stage
        className={styles.rulerStage}
        width={width - 140}
        height={rulerHeight}
        style={{ marginLeft: 140 + 'px' }}
      >
        <Layer>
          <Ruler width={width} scrollX={scrollX} />
        </Layer>
      </Stage>
      <main ref={mainRef} style={{ width: width + 'px' }}>
        <aside
          onScroll={onScroll}
          ref={trackRef}
          style={{ height: height + 'px' }}
        >
          {tracks.map(track => (
            <div
              key={track}
              className={styles.trackItem}
              style={{ height: VIDEO_TRACK_HEIGHT + 'px' }}
            >
              {track}
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
              width={width - 140 + PADDING *  2}
              height={tracks.length * VIDEO_TRACK_HEIGHT}
              style={{ transform: `translate(${scrollX}px, 0)` }}
              onClick={e => setSelected(e?.target?.parent?.attrs?.id)}
            >
              <Layer>
                <Clip
                  selectedId={selected}
                  clip={{ name: '片段1', id: 'no.1' }}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </main>
    </section>
  )
}