import React, { Component } from 'react'
import styles from './index.module.scss'
import Icon from '../Icon'
import classNames from 'classnames'
import API from '../../request'
import { Type, Item, Material } from './material.d'
import { us2Time } from '../../utils'
const LIST: Array<Item> = [
  { type: Type.media, icon: 'perm_media', label: '库' },
  { type: Type.caption, icon: 'subtitles', label: '字幕' },
  // { type: 'filter', icon: 'blur_circular', label: '滤镜' },
  { type: Type.theme, icon: 'palette', label: '主题' }
]
export default class Title extends Component {
  state: {
    selectedType: Type
    height: number,
    [Type.media]: Material
    [Type.caption]: Material
    [Type.theme]: Material,
  }
  ref: HTMLElement | null

  constructor (props: object) {
    super(props)
    this.ref = null
    this.state = {
      selectedType: Type.media,
      height: 0,
      [Type.media]: {
        isGot: false,
        total: 0,
        list: []
      },
      [Type.caption]: {
        isGot: false,
        total: 0,
        list: []
      },
      [Type.theme]: {
        isGot: false,
        total: 0,
        list: []
      }
    }
  }

  componentDidMount() {
    if (this.ref) {
      const { height } = this.ref.getBoundingClientRect()
      this.setState({ height: height })
    }
    API.test().then(res => {
      const media = { isGot: true, total: res.length, list: res }
      this.setState({ media })
    })
  }

  onChange = (item: Item) => {
    const { selectedType } = this.state
    const { type } = item
    if (type === selectedType) return
    this.setState({ selectedType: item.type })
    const { isGot } = this.state[type]
    if (!isGot) {
      console.log('还没有请求过')
      API.test().then(res => {
        const material = { isGot: true, total: res.length, list: res }
        this.setState({ [type]: material })
      })
    }
  }

  render() {
    const { selectedType, height } = this.state
    const getClassName = (item: { type: string }) => classNames({ [styles.selected]: selectedType === item.type })
    return (
      <section className={styles.materials} ref={el => (this.ref = el)}>
        <nav>
          {LIST.map(item => (
            <li
              key={item.type}
              className={getClassName(item)}
              onClick={() => this.onChange(item)}
            >
              <Icon name={item.icon} />
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </nav>
        <div className={styles.list} style={{ height: height + 'px'}}>
          {this.state[selectedType].list.map(item => (
            <div className={styles.item} key={item.id}>
              <div className={styles.preview}>
                <img src={item.url} alt="" />
                <time>{us2Time(item.duration)}</time>
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }
}