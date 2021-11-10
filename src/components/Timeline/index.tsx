import { useState } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'
import useImage from 'use-image'
import { Stage, Layer, Image, Text, Circle, Rect, Group } from 'react-konva'

export default function Timeline() {
  const [img] = useImage('https://konvajs.org/assets/lion.png')
  const scale = { x: 0.5, y: 0.5 }
  const [selected, setSelected] = useState<string>('');

  const onClick = (event: any) => {
    console.log('点击了', event.target.parent.attrs.id);
    setSelected(event.target.parent.attrs.id)
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
          <Icon name="delete_outline" />
        </li>
        <li>
          <Icon name="content_cut" />
        </li>
      </nav>
      <main>
        <Stage width={window.innerWidth} height={window.innerHeight / 2} fill="#D8D8D8">
          <Layer>
            <Group draggable name="这是名字" id="id" onMouseDown={onClick} x={100} y={0} width={300} height={100} stroke={selected === '1' ? 'red' : 'black'}>
              <Rect
                x={0}
                y={0}
                width={300}
                height={100}
                radius={40}
                fill="#666"
                stroke={selected === 'id' ? 'red' : 'black'}
              />
              <Circle x={100} y={50} radius={50} fill="green" />
              <Text text="这是一段话" fontSize={15} x={150} y={50} />
              <Image image={img} x={100} y={0} scale={scale} width={50} height={100} />
            </Group>

            <Group draggable name="这是名2" id="id2" onMouseDown={onClick} x={300} y={0} width={300} height={100} stroke={selected === '1' ? 'red' : 'black'}>
              <Rect
                x={0}
                y={0}
                width={300}
                height={100}
                stroke={selected === 'id2' ? 'red' : 'black'}
              />
              <Circle x={150} y={50} radius={50} fill="green" />
              <Text text="这是一段话222" fontSize={15} x={150} y={50} />
              <Image image={img} x={100} y={0} scale={scale} width={50} height={100} />
            </Group>
          </Layer>
        </Stage>
      </main>
    </section>
  )
}