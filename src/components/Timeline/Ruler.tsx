import React from 'react'
import { Group, Stage, Layer, Shape } from 'react-konva'
import Konva from 'konva'
import { RULER_MAP } from '../../const'
import { us2FrameTime, px2us } from '../../utils'

interface RulerProps {
  x?: number
  y?: number
  width: number
  height?: number
  level?: number
  scrollX?: number,
  rulerHeight?: number,
  className?: string
  style?: object
}

export default function Ruler({
  x = 0,
  y = 0,
  rulerHeight,
  width,
  height = 15,
  level = 3,
  scrollX = 0,
  className,
  style
}: RulerProps) {
  const { STEP, TIME, GROUP } = RULER_MAP[level]
  const sceneFunc = (context: Konva.Context, shape: Konva.Shape) => {
    context.beginPath()
    context._context.font = "13px bold"
    context._context.fillStyle = "rgba(255, 255, 255, 0.5)"
    // 先画底边线
    context.moveTo(x, y + height)
    context.lineTo(width, y + height)
    let posX = x + ~~(scrollX / STEP) * STEP
    while (posX - scrollX < width) {
      context.moveTo(posX - scrollX, y + height)
      const isHigh = (posX - x) / STEP % GROUP === 0
      if (isHigh) {
        context.lineTo(posX - scrollX, y)
        const us = px2us(scrollX + posX - scrollX, level)
        context.fillText(us2FrameTime(us), posX - 35 - scrollX, y - 10)
      } else {
        context.lineTo(posX - scrollX, y + height / 2)
      }
      posX += STEP
    }
    context.closePath()
    context.fillStrokeShape(shape)
  }
  return (
    <Stage
      className={className}
      width={width - 140}
      height={rulerHeight}
      style={style}
    >
      <Layer x={x} y={y}>
        <Shape
          stroke="rgba(255, 255, 255, 0.5)"
          sceneFunc={sceneFunc}
          strokeWidth={1}
          y={y + 30}
          x={0}
        />
      </Layer>
    </Stage>
  )
}