import curry from "crocks/helpers/curry"

import take from "./take"

// dropLast :: Integer -> [a] -> [a]
const dropLast = curry((amount, list) =>
  take(amount < list.length ? list.length - amount : 0, list)
)

export default dropLast
