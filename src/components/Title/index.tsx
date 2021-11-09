import React, { Component } from 'react';
import styles from './index.module.scss';

export default class Title extends Component {
  render() {
    return (
      <header className={styles.title}>
        这是标题
      </header>
    )
  }
}