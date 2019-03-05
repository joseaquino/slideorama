import Maybe from "crocks/Maybe"

import applyTo from "crocks/combinators/applyTo"
import compose from "crocks/helpers/compose"
import constant from "crocks/combinators/constant"
import curry from "crocks/helpers/curry"
import hasProp from "crocks/predicates/hasProp"
import safe from "crocks/Maybe/safe"
import traverse from "crocks/pointfree/traverse"

// hasProps :: [String] -> Object -> Maybe Object
const hasProps = curry((props, obj) =>
  traverse(
    Maybe,
    compose(
      applyTo(obj),
      safe,
      hasProp
    ),
    props
  ).map(constant(obj))
)

export default hasProps
