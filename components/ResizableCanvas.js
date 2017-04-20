import React from 'react'

export default class ResizableCanvas extends React.Component {
  constructor (props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    const [ width, height ] = props.getDimensions ? props.getDimensions() : [0, 0]
    this.state = { height, width }
  }

  componentDidMount () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  componentDidUpdate () {
    this.props.draw(this.canvas.getContext('2d'))
  }

  onResize () {
    if (this.props.getDimensions) {
      let [ width, height ] = this.props.getDimensions(this.canvas)
      this.setState({ width, height })
    } else {
      let { width, height } = this.canvas.parentElement.getBoundingClientRect()
      this.setState({ width, height })
    }
  }

  render () {
    const { height, width } = this.state
    const style = {
      width,
      height
    }
    return (
      <canvas
        ref={(el) => { this.canvas = el }}
        height={height}
        width={width}
        style={style} />
    )
  }
}
