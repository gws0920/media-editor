import React from 'react'
import useImage from 'use-image'
import { Image, Text, Rect, Group, Transformer } from 'react-konva'
import { VIDEO_TRACK_HEIGHT } from '../../const'
interface iProps {
  selectedId: string
  clip: {
    name: string,
    id: string
  },
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
    const { selectedId, clip } = this.props
    return (
      <Group>
        <Group
          ref={ref => (this.groupRef = ref)}
          draggable
          name={clip.name}
          id={clip.id}
          x={0}
          y={0}
          width={300}
          height={VIDEO_TRACK_HEIGHT}
        >
          <Rect
            x={0}
            y={0}
            width={300}
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