import React from 'react'
import useImage from 'use-image'
import { Image, Text, Rect, Group, Transformer } from 'react-konva'
import { VIDEO_TRACK_HEIGHT, iClip } from '../../const'
import { us2px } from '../../utils'
interface iProps {
  selectedId: string
  clip: iClip,
  trackIndex: number,
  level: number,
}
export default class Clip extends React.Component<iProps> {
  groupRef: object | null
  transformerRef: object | null

  constructor (props: iProps) {
    super(props)
    this.groupRef = null
    this.transformerRef = null
  }

  componentWillReceiveProps(nextProps: iProps) {
    const { selectedId, clip } = nextProps
    if (selectedId === clip.id) {
      console.log('选中了 显示transformer')
    }
  }

  render() {
    const { selectedId, clip, trackIndex, level } = this.props
    const { inPoint, outPoint, duration, id, name } = clip
    const width = us2px(duration, level)
    return (
      <Group>
        <Group
          ref={ref => (this.groupRef = ref)}
          draggable
          name={name}
          id={id}
          x={us2px(inPoint, level)}
          y={trackIndex * VIDEO_TRACK_HEIGHT}
          width={width}
          height={VIDEO_TRACK_HEIGHT}
        >
          <Rect
            x={0}
            y={0}
            width={width}
            height={VIDEO_TRACK_HEIGHT}
            fill="#666"
            stroke={selectedId === clip.id ? 'red' : 'black'}
          />
          <Text text={clip.name || '片段名称'} fontSize={15} x={10} y={10} />
          {/* <Image image={img} x={100} y={0} scale={scale} width={50} height={100} /> */}
        </Group>
        {selectedId === clip.id && (
          <Transformer
            ref={ref => (this.transformerRef = ref)}
            nodes={[this.groupRef]}
            rotateEnabled={false}
            enabledAnchors={['middle-left', 'middle-right']}
            anchorFill="#666"
            anchorStrokeWidth={20}
            anchorStrokeHeight={60}
            keepRatio={false}
          />
        )}
      </Group>
    )
  }
}