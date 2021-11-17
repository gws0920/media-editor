import { useState, createRef, useEffect } from 'react'
import styles from './index.module.scss'
import Controls from './Controls'
import { Stage, Layer, Group, Line } from 'react-konva'
import Clip from './Clip'
import Ruler from './Ruler'
import { guid } from '../../utils'
import { VIDEO_TRACK_HEIGHT, RULER_MAP, iTrack, iClip, TRACK_TYPE, THUMBNAIL_GROUP } from '../../const'
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
  const stageRef = createRef<any>()
  const [tracks, setTracks] = useState<Array<iTrack>>(trackData)
  const [horizontalLine, setHorizontalLine] = useState<number | boolean>(false)
  const [verticalLine, setVerticalLine] = useState<number | boolean>(false)

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
  // 修改时码线等级
  const changeRulerLevel = (change: number) => {
    let l = Math.min(level + change, RULER_MAP.length - 1)
    l = Math.max(0, l)
    setLevel(l)
  }
  // clip 拖拽结束
  const dragEndClip = (oldClip: iClip, newClip: iClip, oldTrackIndex: number, targetTrackIndex: number) => {
    // 旧轨道删除
    const tracksClone = [...tracks]
    const oldTrack = tracksClone[oldTrackIndex]
    const oldClipIndex = oldTrack.clips.indexOf(oldClip)
    oldTrack.clips.splice(oldClipIndex, 1)
    // 新轨道添加
    if (targetTrackIndex % 1 === 0.5) {
      // 插入轨道
      const newTrack = { type: TRACK_TYPE.VIDEO, clips: [newClip], id: guid() }
      tracksClone.splice(Math.ceil(targetTrackIndex), 0, newTrack)
    } else {
      const newTrack = tracksClone[targetTrackIndex]
      let index = newTrack.clips.findIndex(clip => clip.inPoint > newClip.inPoint)
      if (index === -1) {
        index = newTrack.clips.length
      }
      newTrack.clips.splice(index, 0, newClip)
    }
    setTracks(tracksClone.filter(track => track.clips.length))
  }
  // 点击画布
  const onClickStage = (e: any) => {
    let parent = e?.target?.parent
    if (parent?.attrs?.name === THUMBNAIL_GROUP) {
      parent = parent?.parent
    }
    console.log(e)
    const id = parent?.attrs?.id
    setSelected(id)
  }
  return (
    <section className={styles.timeline}>
      <Controls changeRulerLevel={changeRulerLevel} onTest={() => console.log(tracks, stageRef)} />
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
        {/* 时间线容器 */}
        <div
          ref={trackScrollRef}
          className={styles.container}
          style={{ height: height + 'px' }}
          onScroll={onScroll}
        >
          {/* 撑开滚动条 */}
          <div
            className={styles.trackListScroll}
          >
            {/* 时间线主体 */}
            <Stage
              className={styles.stage}
              width={width - 140 + PADDING * 2}
              height={tracks.length * VIDEO_TRACK_HEIGHT}
              style={{ transform: `translate(${scrollX}px, 0)` }}
              onClick={onClickStage}
              ref={stageRef}
            >
              <Layer>
                {/* 吸附线 */}
                {horizontalLine !== false && <Line
                  points={[0, +horizontalLine, width, +horizontalLine]}
                  stroke='green'
                  strokeWidth={2}
                  lineJoin='round'
                  dash={[26, 10]}
                />}
                {/* 轨道 */}
                {tracks.map((track, trackIndex) => (
                  <Group key={track.id}>
                    {track.clips.map(clip => (
                      <Clip
                        selectedId={selected}
                        clip={clip}
                        trackIndex={trackIndex}
                        level={level}
                        key={clip.id}
                        scrollX={scrollX}
                        setHorizontalLine={setHorizontalLine}
                        setVerticalLine={setVerticalLine}
                        dragEndClip={dragEndClip}
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