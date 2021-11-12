import React from 'react'
import { Group, Line, Text, Shape } from 'react-konva'
import Konva from 'konva'
import { RULER_STEP } from '../../const'
import { us2FrameTime } from '../../utils'

interface RulerProps {
  x?: number
  y?: number
  width: number
  height?: number
  level?: number
  scrollX?: number
  scrollY?: number
}
export default function Ruler({
  x = 0,
  y = 0,
  width,
  height = 20,
  level = 7,
  scrollX = 0,
  scrollY = 0
}: RulerProps) {

  const sceneFunc = (context: Konva.Context, shape: Konva.Shape) => {
    context.beginPath()
    context._context.font = "13px bold"
    context._context.fillStyle = "rgba(255, 255, 255, 0.5)"

    context.moveTo(x, y + height)
    context.lineTo(width, y + height)
    let posX = x
    while (posX < width) {
      context.moveTo(posX, y + height)
      const isHigh = (posX - x) / RULER_STEP % 10 === 0
      if (isHigh) {
        context.lineTo(posX, y)
        context.fillText(us2FrameTime(13042000), posX - 35, y - 10)

      } else {
        context.lineTo(posX, y + height / 2)
      }
      posX += RULER_STEP
    }
    context.closePath()
    context.fillStrokeShape(shape)
  }
  return (
    <Group x={x} y={y}>
      <Shape
        stroke="rgba(255, 255, 255, 0.5)"
        sceneFunc={sceneFunc}
        strokeWidth={1}
        y={y + 30}
        x={0}
      />
    </Group>
  )
}