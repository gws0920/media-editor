import { useState } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'
import useImage from 'use-image'
import { Stage, Layer } from 'react-konva'
import Clip from './Clip'

export default function Timeline() {
  const [selected, setSelected] = useState<string>('')
  // 拖拽吸附实例 https://konvajs.org/docs/sandbox/Objects_Snapping.html
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
      <main>
        <Stage width={window.innerWidth - 100} height={300} fill="#D8D8D8" onClick={e => setSelected(e?.target?.parent?.attrs?.id)}>
          <Layer>
            <Clip
              selectedId={selected}
              clip={{ name: '片段1', id: 'no.1' }}
            />
          </Layer>
        </Stage>
      </main>
    </section>
  )
}