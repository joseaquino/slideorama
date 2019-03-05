import compose from "crocks/helpers/compose"
import isArray from "crocks/predicates/isArray"
import map from "crocks/pointfree/map"
import option from "crocks/pointfree/option"
import safe from "crocks/Maybe/safe"

import slice from "./slice"

// init :: [a] -> [a]
export const init = compose(
  option([]),
  map(slice(0, -1)),
  safe(isArray)
)

export default init
