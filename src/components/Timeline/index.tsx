import React, { Component } from 'react';
import styles from './index.module.scss';
import Icon from '../Icon'
export default class Title extends Component {
  render() {
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
          时间线主体
        </main>
      </section>
    )
  }
}