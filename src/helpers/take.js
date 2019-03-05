import curry from "crocks/helpers/curry"

import slice from "./slice"

// take :: Integer -> [a] -> [a]
const take = curry((amount, list) =>
  slice(0, amount < 0 ? Infinity : amount, list)
)

export default take
