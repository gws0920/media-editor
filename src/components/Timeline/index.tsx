import { useState, createRef, useEffect } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'
import { Stage, Layer } from 'react-konva'
import Clip from './Clip'
import Ruler from './Ruler'
import { VIDEO_TRACK_HEIGHT } from '../../const'
// 拖拽吸附实例 https://konvajs.org/docs/sandbox/Objects_Snapping.html
// 读取json直接渲染 https://konvajs.org/docs/data_and_serialization/Complex_Load.html
const rulerHeight = 50
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
  const onScroll = (e:any) => {
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
      <nav>
        <li>
          <Icon name="undo" />
        </li>
        <li>
          <Icon name="redo" />
        </li>
        <li>
          <Icon name="delete" />
        </li>
        <li>
          <Icon name="content_cut" />
        </li>
      </nav>
      <main ref={mainRef} style={{ width: width + 'px' }}>
        <aside
          onScroll={onScroll}
          ref={trackRef} 
          style={{ marginTop: rulerHeight + 'px', height: height - rulerHeight + 'px' }}
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
        <div ref={trackScrollRef} className={styles.container} style={{ height: height + 'px' }} onScroll={onScroll}>
          <div
            className={styles.trackListScroll}
            style={{ height: tracks.length * VIDEO_TRACK_HEIGHT + rulerHeight - + 'px' }}
          >
          </div>
          <Stage
            className={styles.stage}
            width={width - 140}
            height={height}
            // style={{ left: scrollX + 'px', top: scrollY + 'px' }}
            onClick={e => setSelected(e?.target?.parent?.attrs?.id)}
          >
            {/* 时码线 */}
            <Layer>
              <Ruler width={width} />
            </Layer>
            <Layer>
              <Clip
                selectedId={selected}
                clip={{ name: '片段1', id: 'no.1' }}
              />
            </Layer>
          </Stage>
        </div>
      </main>
    </section>
  )
}