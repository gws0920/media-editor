import React from 'react'
import useImage from 'use-image'
import { Image, Text, Rect, Group, Transformer } from 'react-konva'
import { VIDEO_TRACK_HEIGHT, iClip, TRACK_MARGIN } from '../../const'
import { us2px, px2us } from '../../utils'
import { IRect, Vector2d } from 'konva/lib/types'

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
  dragEndClip: (oldClip: iClip, newClip: iClip, oldTrackIndex:number, targetTrackIndex: number) => void
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
    console.log(e, 'transform end')
    // const { width } = this.state
    // this.setState({
    //   scale: { x: 1, y: 1 }
    // })
  }

  dragBoundFunc = (pos: Vector2d, e: any): Vector2d => {
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
            stroke={selectedId === clip.id ? 'red' : '#666'}
          />
          <Text text={(clip.name || '片段名称')} fontSize={15} x={10} y={10} />
          {/* <Image image={img} x={100} y={0} scale={scale} width={50} height={100} /> */}
        </Group>
        {selectedId === clip.id && (
          <Transformer
            ref={ref => (this.transformerRef = ref)}
            nodes={[this.groupRef]}
            rotateEnabled={false}
            enabledAnchors={['middle-left', 'middle-right']}
            // anchorFill="#666"
            // anchorStrokeWidth={20}
            keepRatio={false}
            borderEnabled={false}
            anchorSize={20}
          />
        )}

      </Group>
    )
  }
}