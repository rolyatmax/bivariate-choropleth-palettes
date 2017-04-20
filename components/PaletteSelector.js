import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  text-align: center;
  padding: 0;
`

export default function PaletteSelector ({ palettes, selectedPaletteIdx, onSelectPalette }) {
  return (
    <List>
      {palettes.map((palette, i) => (
        <Swatch selected={i === selectedPaletteIdx} palette={palette} onClick={() => onSelectPalette(i)} />
      ))}
    </List>
  )
}

const swatchSize = 20

const ColorBox = styled.span`
  height: ${swatchSize}px;
  width: ${swatchSize}px;
  display: inline-block;
  margin: 0;
`

const SwatchContainer = styled.li`
  margin: 15px;
  cursor: pointer;
  padding: 10px;
  display: inline-block;
  border-radius: 10px;
  height: ${swatchSize}px;
  border: 1px solid white;
  transition: all 150ms linear;
  &:hover {
    border-color: #e9e9e9;
  }
`

function Swatch ({ palette, onClick, selected }) {
  const { COLOR1, COLOR2, BLEND } = palette
  const style = selected ? { borderColor: '#ccc' } : {}
  return (
    <SwatchContainer style={style} onClick={onClick}>
      <ColorBox style={{ background: cssColorFromRGB(COLOR1) }} />
      <ColorBox style={{ background: cssColorFromRGB(BLEND) }} />
      <ColorBox style={{ background: cssColorFromRGB(COLOR2) }} />
    </SwatchContainer>
  )
}

function cssColorFromRGB (rgb) {
  return `rgb(${rgb.join(', ')})`
}
