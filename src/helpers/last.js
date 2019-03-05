import applyTo from "crocks/combinators/applyTo"
import isArray from "crocks/predicates/isArray"
import prop from "crocks/Maybe/prop"
import safe from "crocks/Maybe/safe"

import length from "./length"
import decBy from "./decBy"

// last :: a -> Maybe b
const last = xs =>
  safe(isArray, xs)
    .map(length)
    .map(decBy(1))
    .map(prop)
    .chain(applyTo(xs))

export default last
