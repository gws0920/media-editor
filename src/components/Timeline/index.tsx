import React, { Component } from 'react';
import styles from './index.module.scss';

export default class Title extends Component {
  render() {
    return (
      <section className={styles.timeline}>
        <nav>
          <li>按钮1</li>
          <li>按钮2</li>
          <li>按钮3</li>
        </nav>
        <main>
          时间线主体
        </main>
      </section>
    )
  }
}