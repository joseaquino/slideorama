import React, { Fragment } from "react"

import constant from "crocks/combinators/constant"

export const SLIDE = constant("SLIDE")
export const PROP_SLIDE_MISSING = constant("PROP_SLIDE_MISSING")
export const SLIDE_NOT_OBJECT = constant("SLIDE_NOT_OBJECT")
export const SLIDE_WRONG_VALUE_TYPE = constant("SLIDE_WRONG_VALUE_TYPE")
export const MISSING_REQUIRED_PROPS = constant("MISSING_REQUIRED_PROPS")

// invalidSlide :: SlideComponent -> ReactElement
const invalidSlide = () => (
  <Fragment>
    <h1>Failed to render slide due to invalid data</h1>
  </Fragment>
)

// propSlideMissing :: SlideComponent -> ReactElement
const propSlideMissing = () => (
  <p>Prop slide is missing, we can't create a slide without any data</p>
)

// slideIsNotAnObject :: SlideComponent -> ReactElement
const slideIsNotAnObject = () => <p>The provided slide is not and object</p>

// missingRequiredProps :: SlideComponent -> ReactElement
const missingRequiredProps = _ => (
  <p>There are some required props missing from the provided slide</p>
)

// slideView :: SlideComponent -> ReactElement
const slideView = ({ slide }) => (
  <Fragment>
    <div className="slide__img-wrap">
      <div
        className="slide__img"
        style={{ backgroundImage: "url(" + slide.src + ")" }}
      />
    </div>
    <div className="slide__title-wrap">
      {/*<span className="slide__number">{slide.id + 1}</span>*/}
      <h3 className="slide__title">{slide.title}</h3>
      <h4 className="slide__subtitle">{slide.subtitle}</h4>
    </div>
  </Fragment>
)

export default constant({
  [SLIDE()]: slideView,
  [SLIDE_WRONG_VALUE_TYPE()]: invalidSlide,
  [PROP_SLIDE_MISSING()]: propSlideMissing,
  [SLIDE_NOT_OBJECT()]: slideIsNotAnObject,
  [MISSING_REQUIRED_PROPS()]: missingRequiredProps
})
