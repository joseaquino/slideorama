import React from "react"
import { get } from "crocks/State"

import ap from "crocks/pointfree/ap"
import chain from "crocks/pointfree/chain"
import compose from "crocks/helpers/compose"
import evalWith from "crocks/State/evalWith"

import { getComponentView } from "../../data/helpers"

import slideViews from "./slide.views"
import { startSlide, initialState } from "../../data/models/slide"
import "./slide.style.css"

// renderSlide :: { views: SlideViews, props: SlideProps } -> ReactComponent
const renderSlide = compose(
  evalWith(initialState()),
  ap(get()),
  chain(getComponentView),
  startSlide
)

const SlideComp = props => {
  return (
    <div className="slide">
      {renderSlide({
        props,
        views: slideViews()
      })}
    </div>
  )
}

export default SlideComp
