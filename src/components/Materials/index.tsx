import React, { Component } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'

export default class Title extends Component {
  render() {
    return (
      <section className={styles.materials}>
        <nav>
          <li>
            <Icon name="perm_media" />
            <span>媒体库</span>
          </li>
          <li>
            <Icon name="subtitles" />
            <span>字幕</span>
          </li>
          <li>
            <Icon name="blur_circular" />
            <span>滤镜</span>
          </li>
          <li>
            <Icon name="palette" />
            <span>主题</span>
          </li>
        </nav>
      </section>
    )
  }
}