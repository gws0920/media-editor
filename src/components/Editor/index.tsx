import React, { Component } from 'react';
import styles from './index.module.scss';
import Title from '../Title';
import Materials from '../Materials';
import Monitor from '../Monitor';
import Timeline from '../Timeline';

export default class Editor extends Component {
  render() {
    return (
      <div className={styles.editor}>
        <Title />
        <main>
          <Materials />
          <Monitor />
        </main>
        <Timeline />
      </div>
    )
  }
}