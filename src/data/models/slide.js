import { Right } from "crocks/Either"

import assign from "crocks/helpers/assign"
import branch from "crocks/Pair/branch"
import chain from "crocks/pointfree/chain"
import compose from "crocks/helpers/compose"
import composeK from "crocks/helpers/composeK"
import constant from "crocks/combinators/constant"
import defaultProps from "crocks/helpers/defaultProps"
import either from "crocks/pointfree/either"
import fanout from "crocks/helpers/fanout"
import identity from "crocks/combinators/identity"
import isObject from "crocks/predicates/isObject"
import liftA2 from "crocks/helpers/liftA2"
import map from "crocks/pointfree/map"
import maybeToEither from "crocks/Either/maybeToEither"
import merge from "crocks/pointfree/merge"
import option from "crocks/pointfree/option"
import pick from "crocks/helpers/pick"
import prop from "crocks/Maybe/prop"
import safe from "crocks/Maybe/safe"

import hasProps from "../../helpers/hasProps"
import objPropsSameType from "../../helpers/objPropsSameType"
import setStateProp from "../../helpers/setStateProp"
import viewStateProp from "../../helpers/viewStateProp"

import { setPropsAndViews } from "../helpers"

import {
  MISSING_REQUIRED_PROPS,
  PROP_SLIDE_MISSING,
  SLIDE,
  SLIDE_NOT_OBJECT,
  SLIDE_WRONG_VALUE_TYPE
} from "../../components/Slide/slide.views"

const REQUIRED_PROPS = constant(["src", "title", "subtitle", "content"])

// defaultSlide :: () -> Slide
const defaultSlide = constant({
  src: "",
  title: "",
  subtitle: "",
  content: ""
})

// initialState :: () -> SlideState
export const initialState = constant({
  slide: {},
  view: SLIDE(),
  props: {},
  views: {}
})

// propsHasSlide :: SlideProps -> Either ViewName a
const propsHasSlide = compose(
  maybeToEither(PROP_SLIDE_MISSING()),
  chain(prop("slide")),
  safe(isObject)
)

// isSlideAnObject :: a -> Either SlideViewName Object
const isSlideAnObject = compose(
  maybeToEither(SLIDE_NOT_OBJECT()),
  safe(isObject)
)

// pickRequiredProps :: Object -> Object
const pickRequiredProps = compose(
  merge(pick),
  fanout(REQUIRED_PROPS, identity)
)

// setDefaults :: Object -> Slide
const setDefaults = compose(
  merge(defaultProps),
  fanout(defaultSlide, identity)
)

// arePropsSameType :: Object -> Maybe Object
const arePropsSameType = compose(
  maybeToEither(SLIDE_WRONG_VALUE_TYPE()),
  merge(objPropsSameType),
  map(pickRequiredProps),
  map(defaultSlide),
  branch
)

// hasRequiredProps :: Object -> Either SlideViewID Slide
const hasRequiredProps = compose(
  maybeToEither(MISSING_REQUIRED_PROPS()),
  merge(hasProps),
  fanout(REQUIRED_PROPS, pickRequiredProps)
)

// checkRequiredProps :: Object -> Either SlideViewID Slide
export const checkRequiredProps = compose(
  merge(liftA2(assign)),
  map(chain(arePropsSameType)),
  fanout(Right, hasRequiredProps)
)

// getProps :: () -> State SlideState SlideProps
const getProps = compose(
  map(option({})),
  viewStateProp,
  constant("props")
)

// validateSlide :: SlideProps -> Either ViewName Slide
const validateSlide = composeK(
  checkRequiredProps,
  isSlideAnObject,
  propsHasSlide
)

// createSlide :: () -> State SlideState ()
const createSlide = compose(
  either(setStateProp("view"), setStateProp("slide")),
  map(setDefaults),
  validateSlide
)

// startSlide :: { views: SlideViews, props: SlideProps } -> State SlideState (SlideState -> ReactComponent)
export const startSlide = composeK(
  createSlide,
  getProps,
  setPropsAndViews
)

/**
 * 1. Each Slide has a copy of the views which is inefficient
 * 2. Should each slide have it's own set of views that can be overriden?
 * 3. Views can be a frozen object which gets memoized, object must turn
 *    immutable once custom views of user have been overriden
 */
