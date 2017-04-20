import React from 'react'
import Palette from './Palette'
import PaletteSelector from './PaletteSelector'
import styled from 'styled-components'
import palettes from '../color-palettes'

const Container = styled.div`
  width: 960px;
  margin: 30px auto;
`

const PaletteContainer = styled.div`
  ${''/* width: 49%;
  margin-right: 2%; */}
  width: 100%;
  min-height: 250px;
  height: 75vh;
  display: inline-block;
`

// const ColorWheel = styled.div`
//   width: 49%;
//   min-height: 250px;
//   height: 75vh;
//   display: inline-block;
// `

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      paletteIdx: 0
    }
  }

  selectPalette (i) {
    this.setState((state) => ({
      paletteIdx: i
    }))
  }

  render () {
    return (
      <Container>
        <PaletteSelector selectedPaletteIdx={this.state.paletteIdx} palettes={palettes} onSelectPalette={this.selectPalette.bind(this)} />
        <PaletteContainer>
          <Palette palette={palettes[this.state.paletteIdx]} />
        </PaletteContainer>
        {/* <ColorWheel /> */}
      </Container>
    )
  }
}
