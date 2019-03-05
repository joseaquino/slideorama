import Maybe from "crocks/Maybe"

import compose from "crocks/helpers/compose"
import curry from "crocks/helpers/curry"
import fanout from "crocks/helpers/fanout"
import merge from "crocks/pointfree/merge"
import propEq from "crocks/predicates/propEq"
import liftA2 from "crocks/helpers/liftA2"
import map from "crocks/pointfree/map"
import ifElse from "crocks/logic/ifElse"
import option from "crocks/pointfree/option"
import bimap from "crocks/pointfree/bimap"
import objOf from "crocks/helpers/objOf"
import assign from "crocks/helpers/assign"

import cycleLeftBy from "./helpers/cycleLeftBy"
import cycleRightBy from "./helpers/cycleRightBy"
import divBy from "./helpers/divBy"
import length from "./helpers/length"
import log from "./helpers/log"
import roundDown from "./helpers/roundDown"
import findIndexOf from "./helpers/findIndexOf"
import viewStateProp from "./helpers/viewStateProp"
import gt from "./helpers/gt"

const abs = x => Math.abs(x)

// slideJumpDirection :: id -> [a] -> Number
const slideJumpDirection = curry(id =>
  compose(
    option(0),
    merge(liftA2(substract)),
    map(Maybe.of),
    fanout(findIndexOf(propEq("id", id)), findMiddleIndex)
  )
)

// cycleSlides :: Number -> [a] -> [a] -> Pair [a]
const cycleSlides = curry(direction =>
  ifElse(
    gt(0),
    compose(
      cycleRightBy,
      abs
    ),
    compose(
      cycleLeftBy,
      abs
    ),
    direction
  )
)

const jumpToSlide = id =>
  viewStateProp("slideshow")
    .map(option([]))
    .map(slideJumpDirection(id))
    .map(cycleSlides)
    .ap(viewStateProp("slides").map(option([])))
    .ap(viewStateProp("slideshow").map(option([])))
    .map(bimap(objOf("slides"), objOf("slideshow")))
    .map(merge(assign))

// findMiddleIndex :: [a] -> Number
const findMiddleIndex = compose(
  roundDown,
  divBy(2),
  length
)

// substract :: Number -> Number -> Number
const substract = curry((x, y) => x - y)

// [3,4,5]         [2,3,4]
// [2,1,6] -> 6 -> [1,6,5]
//
// [6,5,4,3,2,1,11,10,9]
//          ^
const slides = [
  { id: 10, color: "green" },
  { id: 20, color: "blue" },
  { id: 30, color: "red" },
  { id: 40, color: "grey" }
]

const slideshow = [
  { id: 50, color: "yellow" },
  { id: 60, color: "pink" },
  { id: 70, color: "magenta" },
  { id: 80, color: "orange" },
  { id: 90, color: "indigo" }
]
// Fix that when left value is empty doesnt break
log(jumpToSlide(50).evalWith({ slides, slideshow }))
