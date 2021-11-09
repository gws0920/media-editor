import React, { Component } from 'react';
import styles from './index.module.scss';

export default class Title extends Component {
  render() {
    return (
      <section className={styles.monitor}>
        <div className={styles.mCanvas}>
          <canvas width="960" height="540" />
        </div>
        <div className={styles.controls}>
          <time>00:00:00 / 00:00:58</time>
          <div className={styles.handles}>
            <span>快进</span>
            <span>快进</span>
            <span>播放</span>
            <span>快进</span>
            <span>快进</span>
          </div>
          <div className={styles.speed}>播放速度</div>
        </div>
      </section>
    )
  }
}