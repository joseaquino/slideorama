import curry from "crocks/helpers/curry"

import drop from "./drop"

// takeLast :: Integer -> [a] -> [a]
const takeLast = curry((amount, list) =>
  drop(amount >= 0 ? list.length - amount : 0, list)
)

export default takeLast
