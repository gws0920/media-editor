import React from 'react'
import { Text, Rect, Group, Transformer } from 'react-konva'
import { VIDEO_TRACK_HEIGHT, iClip, TRACK_MARGIN, BORDER_WIDTH } from '../../../const'
import { us2px, px2us } from '../../../utils'
import { IRect, Vector2d } from 'konva/lib/types'
import Thumbnail from './Thumbnail'

export interface Box extends IRect {
  rotation: number
}
interface iProps {
  selectedId: string
  clip: iClip,
  trackIndex: number,
  level: number // 时码线等级
  scrollX: number // 滚动条位置
  setHorizontalLine: (y: number | boolean) => void // 设置水平吸附线
  setVerticalLine: (x: number | boolean) => void // 设置竖直吸附线
  dragEndClip: (oldClip: iClip, newClip: iClip, oldTrackIndex: number, targetTrackIndex: number) => void
}
export default class Clip extends React.Component<iProps> {
  groupRef: {
    absolutePosition: () => { x: number; y: number },
    attrs: { x: number, y: number }
  } | null
  transformerRef: object | null
  rectRef: object | null
  state: {
    scale: { x: number, y: number }
  }
  constructor (props: iProps) {
    super(props)
    this.groupRef = null
    this.transformerRef = null
    this.rectRef = null
    this.state = {
      scale: { x: 1, y: 1 }
    }
  }

  onTransform = (e: any) => {
    // const { width } = this.state
    // this.setState({
    //   scale: { x: 1, y: 1 }
    // })
  }

  dragBoundFunc = (pos?: any, e?: any): Vector2d => {
    const { offsetY } = e
    const offset = Math.abs(offsetY % VIDEO_TRACK_HEIGHT - VIDEO_TRACK_HEIGHT)
    if (offset < VIDEO_TRACK_HEIGHT / 4 || offset > VIDEO_TRACK_HEIGHT / 4 * 3) {
      const y = Math.round(offsetY / VIDEO_TRACK_HEIGHT) * VIDEO_TRACK_HEIGHT - VIDEO_TRACK_HEIGHT / 2
      this.props.setHorizontalLine(y + VIDEO_TRACK_HEIGHT / 2)
      return {
        x: pos.x,
        y
      }
    }
    this.props.setHorizontalLine(false)
    return {
      x: pos.x,
      y: Math.floor(offsetY / VIDEO_TRACK_HEIGHT) * VIDEO_TRACK_HEIGHT
    }
  }

  onDragEnd = () => {
    if (this.groupRef) {
      const { level, clip, dragEndClip, trackIndex } = this.props
      const { x, y } = this.groupRef.attrs
      const inPoint = px2us(x, level)
      const newClip = {
        ...clip,
        inPoint,
        outPoint: inPoint + clip.duration
      }
      const targetTrackIndex = y / VIDEO_TRACK_HEIGHT
      dragEndClip(clip, newClip, trackIndex, targetTrackIndex)
    }
    this.props.setHorizontalLine(false)
  }

  render() {
    const { selectedId, clip, trackIndex, level, scrollX } = this.props
    const { inPoint, outPoint, duration, id, name } = clip
    const { scale } = this.state
    const width = us2px(duration, level)
    return (
      <Group>
        <Group
          ref={ref => (this.groupRef = ref)}
          draggable
          name={name}
          id={id}
          x={us2px(inPoint, level) - scrollX}
          y={trackIndex * VIDEO_TRACK_HEIGHT + TRACK_MARGIN / 2}
          width={width}
          height={VIDEO_TRACK_HEIGHT - TRACK_MARGIN}
          onTransform={this.onTransform}
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.onDragEnd}
          scale={scale}
          offsetY={TRACK_MARGIN / 2}
        >
          <Rect
            x={0}
            y={0}
            ref={ref => (this.rectRef = ref)}
            width={width}
            height={VIDEO_TRACK_HEIGHT - TRACK_MARGIN}
            cornerRadius={4}
            fill="#999"
            strokeWidth={BORDER_WIDTH}
            stroke={selectedId === clip.id ? 'red' : '#666'}
          />
          <Thumbnail clip={clip} level={level} />
          <Group clip={{ x: 0, y: 0, width: width - 20, height: 20 }} x={10} y={10}>
            <Text
              text={(clip.name || '片段名称')}
              fontSize={15}
              x={0}
              y={0}
              fill="white"
            />
          </Group>
        </Group>
        {selectedId === clip.id && (
          <Transformer
            ref={ref => (this.transformerRef = ref)}
            nodes={[this.groupRef]}
            rotateEnabled={false}
            enabledAnchors={['middle-left', 'middle-right']}
            keepRatio={false}
            borderEnabled={false}
            anchorSize={20}
          />
        )}

      </Group>
    )
  }
}