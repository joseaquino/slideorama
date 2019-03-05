import compose from "crocks/helpers/compose"
import concat from "crocks/pointfree/concat"
import curry from "crocks/helpers/curry"
import fanout from "crocks/helpers/fanout"

import drop from "./drop"
import dropLast from "./dropLast"
import reverse from "./reverse"
import take from "./take"
import takeLast from "./takeLast"

// cycleBy :: Integer -> [a] -> [a] -> Pair [a]
const cycleRightBy = curry((amount, leftVal, rightVal) =>
  concat(
    fanout(
      compose(
        reverse,
        takeLast(amount)
      ),
      dropLast(amount),
      rightVal
    ),
    fanout(
      drop(amount),
      compose(
        reverse,
        take(amount)
      ),
      leftVal
    )
  )
)

export default cycleRightBy
