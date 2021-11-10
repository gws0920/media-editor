import React, { Component } from 'react';
import styles from './index.module.scss';
import Icon from '../Icon'

export default class Title extends Component {
  render() {
    return (
      <header className={styles.title}>
        <nav>
          <li>
            <Icon name="undo" />
            <span className={styles.label}>返回</span>
          </li>
        </nav>
      </header>
    )
  }
}