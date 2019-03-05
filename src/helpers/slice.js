import curry from "crocks/helpers/curry"
import isArray from "crocks/predicates/isArray"
import isNumber from "crocks/predicates/isNumber"
import type from "crocks/core/type"

// slice :: Number -> Number -> [a] -> [a]
const slice = curry((fromIdx, toIdx, list) => {
  if (!isNumber(fromIdx))
    throw new TypeError(
      `slice(): The first argument must be a Number but ${type(
        fromIdx
      )} was given.`
    )
  if (!isNumber(toIdx))
    throw new TypeError(
      `slice(): The second argument must be a Number but ${type(
        toIdx
      )} was given.`
    )
  if (!isArray(list))
    throw new TypeError(
      `slice(): The third argument must be an Array but ${type(
        list
      )} was given.`
    )
  return Array.prototype.slice.call(list, fromIdx, toIdx)
})

export default slice
