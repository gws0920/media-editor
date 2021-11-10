import React, { Component } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'

interface iProps { }
export default class Title extends Component {
  state: {
    isPlaying: boolean
  }
  constructor (props: iProps) {
    super(props)
    this.state = {
      isPlaying: false
    }
  }
  render() {
    const { isPlaying } = this.state
    return (
      <section className={styles.monitor}>
        <div className={styles.mCanvas}>
          <canvas width="960" height="540" />
        </div>
        <div className={styles.controls}>
          <time>00:00:00 / 00:00:58</time>
          <div className={styles.handles}>
            <Icon name="skip_previous" />
            <Icon name="fast_rewind" />
            <Icon name={isPlaying ? 'pause' : 'play_arrow'} onClick={() => this.setState({ isPlaying: !isPlaying })} />
            <Icon name="fast_forward" />
            <Icon name="skip_next" />
          </div>
          <div className={styles.speed}>速度</div>
        </div>
      </section>
    )
  }
}