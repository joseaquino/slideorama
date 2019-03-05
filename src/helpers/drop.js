import curry from "crocks/helpers/curry"

import slice from "./slice"

// drop :: Integer -> [a] -> [a]
const drop = curry((amount, list) => slice(Math.max(0, amount), Infinity, list))

export default drop
