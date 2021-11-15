import React from 'react'
import Icon from '../../Icon'
import styles from './index.module.scss'
interface iProps {
  changeRulerLevel: (level: number) => void
  onTest?: () => void
}
export default function Controls({ changeRulerLevel, onTest }: iProps) {
  return (
    <nav className={styles.controls}>
      <div className={styles.left}>
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
        <li onClick={onTest}>
          <Icon name="bug_report" />
        </li>
      </div>
      <div className={styles.right}>
        <Icon name="undo" onClick={() => changeRulerLevel(-1)} />
        <Icon name="undo" onClick={() => changeRulerLevel(1)} />
      </div>
    </nav>
  )
}