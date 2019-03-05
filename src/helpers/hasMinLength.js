import applyTo from "crocks/combinators/applyTo"
import compose from "crocks/helpers/compose"
import curry from "crocks/helpers/curry"

import gt from "./gt"
import length from "./length"

// hasMinLength :: Number -> [a] -> Boolean
const hasMinLength = curry(min =>
  compose(
    applyTo(min),
    gt,
    length
  )
)

export default hasMinLength
