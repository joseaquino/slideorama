import State from "crocks/State"

import ap from "crocks/pointfree/ap"
import assign from "crocks/helpers/assign"
import bimap from "crocks/pointfree/bimap"
import branch from "crocks/Pair/branch"
import chain from "crocks/pointfree/chain"
import compose from "crocks/helpers/compose"
import composeK from "crocks/helpers/composeK"
import constant from "crocks/combinators/constant"
import curry from "crocks/helpers/curry"
import either from "crocks/pointfree/either"
import execWith from "crocks/State/execWith"
import fanout from "crocks/helpers/fanout"
import hasProp from "crocks/predicates/hasProp"
import head from "crocks/pointfree/head"
import identity from "crocks/combinators/identity"
import isArray from "crocks/predicates/isArray"
import isObject from "crocks/predicates/isObject"
import liftA2 from "crocks/helpers/liftA2"
import map from "crocks/pointfree/map"
import maybeToEither from "crocks/Either/maybeToEither"
import merge from "crocks/pointfree/merge"
import objOf from "crocks/helpers/objOf"
import option from "crocks/pointfree/option"
import prop from "crocks/Maybe/prop"
import safe from "crocks/Maybe/safe"
import tail from "crocks/pointfree/tail"
import traverse from "crocks/pointfree/traverse"

import hasMinLength from "../../helpers/hasMinLength"
import incBy from "../../helpers/incBy"
import init from "../../helpers/init"
import last from "../../helpers/last"
import liftToState from "../../helpers/liftToState"
import mapStateProp from "../../helpers/mapStateProp"
import pairWith from "../../helpers/pairWith"
import reverse from "../../helpers/reverse"
import setStateProp from "../../helpers/setStateProp"
import viewStateProp from "../../helpers/viewStateProp"

import { setPropsAndViews } from "../helpers"

import {
  NOT_AN_ARRAY,
  SLIDES_PROP_MISSING,
  MIN_SLIDES_REQUIRED,
  SLIDESHOW
} from "../../components/Slideshow/slideshow.views"

/**
 * <TODO:>
 * 1. Calculate the size of the window and save to state
 * 2. Calculate the size of the slide image and save it to the slide state
 * 3. Add a loading view for each slide image
 * 4. On click of a side slide it will move it to the center
 * </TODO:>
 */

const initialState = () => ({
  nextId: 0,
  slides: [],
  slideshow: [],
  view: SLIDESHOW(),
  props: {},
  views: {}
})

// getPairFromState :: Pair String -> State SlideshowState Pair (Maybe a)
const getPairFromState = curry((leftKey, rightKey) =>
  liftA2(pairWith, viewStateProp(leftKey), viewStateProp(rightKey))
)

// moveSlidesForward :: SlideshowState -> Object
export const moveSlidesForward = state =>
  getPairFromState("slides", "slideshow")
    .map(bimap(option([]), option([])))
    .map(merge(swapFstAndLast))
    .map(bimap(objOf("slides"), objOf("slideshow")))
    .map(merge(assign))
    .evalWith(state)

// moveSlidesBackward :: SlideshowState -> Object
export const moveSlidesBackward = state =>
  getPairFromState("slideshow", "slides")
    .map(bimap(option([]), option([])))
    .map(merge(swapFstAndLast))
    .map(bimap(objOf("slideshow"), objOf("slides")))
    .map(merge(assign))
    .evalWith(state)

// popFirst :: [a] -> Pair [a]
const popFirst = compose(
  bimap(Array.of, identity),
  bimap(option({}), option([])),
  fanout(head, tail)
)

// popLast :: [a] -> Pair [a]
const popLast = compose(
  bimap(Array.of, identity),
  bimap(option({}), identity),
  fanout(last, init)
)

// swapFstAndLast :: [a] -> [a] -> Pair [a]
const swapFstAndLast = curry((leftArr, rightArr) =>
  popFirst(leftArr)
    .swap(identity, identity)
    .concat(popLast(rightArr))
)

// generateSlideshow :: Pair [a] -> Pair [a]
const generateSlideshow = compose(
  chain(popLast),
  bimap(reverse, identity),
  chain(popFirst),
  chain(popFirst)
)

// setSlideshow :: Pair [a] -> State SlideshowState ()
const setSlideshow = compose(
  merge(liftA2(constant)),
  bimap(setStateProp("slideshow"), setStateProp("slides"))
)

// pickSlides :: [a] -> Pair [a]
const pickSlides = compose(
  generateSlideshow,
  pairWith([])
)

// isSlidesAnArray :: a -> Either SlideshowViewID [b]
const isSlidesAnArray = compose(
  maybeToEither(NOT_AN_ARRAY()),
  safe(isArray)
)

// hasMinSlides :: [a] -> Either SlideshowViewID [a]
const hasMinSlides = compose(
  maybeToEither(MIN_SLIDES_REQUIRED()),
  safe(hasMinLength(3))
)

// hasSlides :: a -> Either SlideshowViewID [b]
const hasSlides = compose(
  maybeToEither(SLIDES_PROP_MISSING()),
  chain(prop("slides")),
  chain(safe(hasProp("slides"))),
  safe(isObject)
)

// validateSlides :: SlideshowProps -> Either SlideshowViewID [a]
const validateSlides = composeK(
  hasMinSlides,
  isSlidesAnArray,
  hasSlides
)

// getSlideshowProps :: () -> State SlideshowState SlideshowProps
const getSlideshowProps = compose(
  map(option({})),
  viewStateProp,
  constant("props")
)

// getNextId :: () -> State SlideshowState { id: Number }
const getNextId = compose(
  map(objOf("id")),
  merge(liftA2(constant)),
  map(() => mapStateProp("nextId", incBy(1))),
  branch,
  map(option(0)),
  viewStateProp,
  constant("nextId")
)

// createSlides :: [a] -> State SlideshowState [{ id: Number, slide: a }]
export const createSlides = traverse(
  State,
  compose(
    ap(getNextId()),
    liftToState(assign),
    objOf("slide")
  )
)

// createSlideshow :: SlideshowProps -> State SlideshowState ()
const createSlideshow = compose(
  either(setStateProp("view"), chain(setSlideshow)),
  map(map(pickSlides)),
  map(createSlides),
  validateSlides
)

// startSlideshow :: { views: SlideshowViews, props: SlideshowProps } -> State SlideshowState ()
export const startSlideshow = composeK(
  createSlideshow,
  getSlideshowProps,
  setPropsAndViews
)

// initializeState :: { views: SlideshowViews, props: SlideshowProps } -> SlideshowState
const initializeState = compose(
  execWith(initialState()),
  startSlideshow
)

export default initialState
export { initializeState, initialState }
