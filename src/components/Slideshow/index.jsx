import React, { Component } from "react"
import applyTo from "crocks/combinators/applyTo"

import {
  initializeState,
  moveSlidesForward,
  moveSlidesBackward
} from "../../data/models/slideshow"
import { getComponentView } from "../../data/helpers"
import slideshowViews from "./slideshow.views"
import { subtleZoomIn } from "../../data/models/animations"
import playground from "../../playground"
import "./slideshow.style.css"

class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.state = initializeState({
      props,
      views: slideshowViews()
    })
    this.imgElem = React.createRef()
  }

  nextSlide = () => {
    subtleZoomIn(this.imgElem.current)
    this.setState(moveSlidesForward)
  }

  prevSlide = () => {
    this.setState(moveSlidesBackward)
  }

  render() {
    return getComponentView()
      .map(applyTo(this))
      .evalWith(this.state)
  }
}

export default Slideshow
