// import React from 'react'
import styles from './index.module.scss'

export default function Icon({ className = '', name, onClick }: { className?: string, name: string, onClick?: () => void}) {
  return (
    <span className={`material-icons material-icons-outlined ${className} ${styles.icon}`} onClick={onClick}>
      {name}
    </span>
  );
}