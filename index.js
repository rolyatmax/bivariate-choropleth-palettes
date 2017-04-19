const chroma = require('chroma-js')
const colorSets = require('./color-palettes')

// ------ set up some UI pieces

const canvas = setupCanvas()
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const cycleBtn = createButton()
cycleBtn.innerText = 'Next Color Palette'
document.body.appendChild(cycleBtn)
cycleBtn.addEventListener('click', () => {
  colorIdx = (colorIdx + 1) % colorSets.length
  draw()
})

window.addEventListener('resize', () => {
  resizeCanvas(canvas)
  draw()
})

// ------ constants

const BASE_COLOR = [255, 255, 255]
const steps = 8
const blendType = 'lab'

// ------ variables

let colorIdx = 0

// ------ main

draw()

// ------ functions

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const colors = colorSets[colorIdx]
  const canvasSquareSize = Math.min(canvas.width, canvas.height)
  const padding = Math.min(150, canvasSquareSize * 0.2 | 0)
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

function getColorForCoord (xPerc, yPerc, colors) {
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

function setupCanvas () {
  const canvas = document.createElement('canvas')
  resizeCanvas(canvas)
  canvas.style.margin = 0
  canvas.style.padding = 0
  canvas.style.position = 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0
  document.body.style.padding = 0
  return canvas
}

function resizeCanvas (canvas) {
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
}

function createButton () {
  const button = document.createElement('button')
  button.style.position = 'absolute'
  button.style.background = 'white'
  button.style['font-size'] = '28px'
  button.style.border = '1px solid #eee'
  button.style.padding = '15px 25px'
  button.style.color = '#777'
  button.style['border-radius'] = '5px'
  button.style.transition = 'all 150ms linear'
  button.style.cursor = 'pointer'
  button.style.outline = 0
  return button
}
