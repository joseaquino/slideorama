import { Nothing, Just } from "crocks/Maybe"

import compose from "crocks/helpers/compose"
import constant from "crocks/combinators/constant"
import curry from "crocks/helpers/curry"
import head from "crocks/pointfree/head"
import ifElse from "crocks/logic/ifElse"
import isEmpty from "crocks/predicates/isEmpty"
import map from "crocks/pointfree/map"
import option from "crocks/pointfree/option"
import tail from "crocks/pointfree/tail"

// findIndexOf :: Integer -> (a -> Boolean) -> [a] -> Maybe Number
const findIndexOf = curry((currentIndex, pred, xs) =>
  ifElse(
    isEmpty,
    Nothing,
    ifElse(
      compose(
        option(false),
        map(pred),
        head
      ),
      compose(
        Just,
        constant(currentIndex)
      ),
      compose(
        findIndexOf(currentIndex + 1, pred),
        option([]),
        tail
      )
    ),
    xs
  )
)

export default findIndexOf(0)
