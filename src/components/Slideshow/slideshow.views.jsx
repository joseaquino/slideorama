import React from "react"
import Slide from "../Slide"

import constant from "crocks/combinators/constant"

const MIN_SLIDES_REQUIRED = constant("MIN_SLIDES_REQUIRED")
const NOT_AN_ARRAY = constant("NOT_AN_ARRAY")
const SLIDESHOW = constant("SLIDESHOW")
const SLIDES_PROP_MISSING = constant("SLIDES_PROP_MISSING")

const minSlidesRequired = () => (
  <p>You must provide at least 3 slides to create slideshow.</p>
)

// slidesNotArray :: SlideShow -> ReactElement
const slidesNotArray = () => (
  <p>The slides provided to the slideshow is not an array</p>
)

// renderSlides :: SlideShow -> ReactElement
const renderSlides = ({ nextSlide, prevSlide, state, imgElem }) => (
  <div>
    <div className="slideshow">
      {state.slideshow.map(({ slide, id }) => (
        <Slide slide={slide} key={id} />
      ))}
    </div>
    <button onClick={prevSlide}>Prev</button>
    <button onClick={nextSlide}>Next</button>
  </div>
)

const slidePropMissing = () => (
  <h1>The slides prop is missing, cannot create slideshow with no slides.</h1>
)

export default () => ({
  [NOT_AN_ARRAY()]: slidesNotArray,
  [SLIDESHOW()]: renderSlides,
  [SLIDES_PROP_MISSING()]: slidePropMissing,
  [MIN_SLIDES_REQUIRED()]: minSlidesRequired
})

export { MIN_SLIDES_REQUIRED, NOT_AN_ARRAY, SLIDESHOW, SLIDES_PROP_MISSING }
