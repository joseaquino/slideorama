import curry from "crocks/helpers/curry"
import identity from "crocks/combinators/identity"

import cycleRightBy from "./cycleRightBy"

const cycleLeftBy = curry((amount, leftVal, rightVal) =>
  cycleRightBy(amount, rightVal, leftVal).swap(identity, identity)
)

export default cycleLeftBy
