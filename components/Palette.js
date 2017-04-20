import React from 'react'
import chroma from 'chroma-js'
import ResizableCanvas from './ResizableCanvas'

export default class Palette extends React.Component {
  draw (ctx) {
    const steps = 8
    const canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const colors = this.props.palette
    const canvasSquareSize = Math.min(canvas.width, canvas.height)
    const padding = Math.min(50, canvasSquareSize * 0.2 | 0)
    const drawingAreaSize = canvasSquareSize - padding * 2
    const drawingAreaX = (canvas.width - drawingAreaSize) / 2
    const drawingAreaY = (canvas.height - drawingAreaSize) / 2
    const stepSize = drawingAreaSize / (steps + 1)

    for (let stepY = 0; stepY <= steps; stepY += 1) {
      const y = stepY * stepSize + drawingAreaY
      for (let stepX = 0; stepX <= steps; stepX += 1) {
        const x = stepX * stepSize + drawingAreaX
        const color = getColorForCoord(stepX / steps, 1 - (stepY / steps), colors)
        drawBox(ctx, x, y, stepSize, color)
      }
    }
  }

  render () {
    return (
      <ResizableCanvas draw={this.draw.bind(this)} />
    )
  }
}

function getColorForCoord (xPerc, yPerc, colors) {
  const BASE_COLOR = [255, 255, 255]
  const blendType = 'lab'
  const y0Scale = chroma.scale([BASE_COLOR, colors.COLOR1]).mode(blendType)
  const blendedColor = colors.BLEND
  // const blendedColor = chroma.mix(colors.COLOR1, colors.COLOR2, 0.5, 'hsl').desaturate(1.5).darken(1)
  // const blendedColor = chroma.mix(colors.COLOR1, colors.COLOR2, 0.5, blendType)
  // const centerColor = chroma.mix(BASE_COLOR, blendedColor, 0.5, blendType)
  // drawBox(ctx, canvas.width - 150, canvas.height - 150, 100, centerColor.hex())
  const y0Color = y0Scale(yPerc).rgb()
  const y1Scale = chroma.scale([colors.COLOR2, blendedColor]).mode(blendType)
  // const y1Midpoint = y1Scale(0.5)
  // const y0Midpoint = y0Scale(0.5)
  const y1Color = y1Scale(yPerc).rgb()
  const color = chroma.scale([y0Color, y1Color]).mode(blendType)(xPerc).rgb()
  return `rgb(${color.join(',')})`
}

function drawBox (ctx, x, y, size, color) {
  ctx.beginPath()
  ctx.rect(x, y, size, size)
  ctx.fillStyle = color
  ctx.fill()
}
