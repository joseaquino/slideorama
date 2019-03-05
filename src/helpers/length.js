import isNumber from "crocks/predicates/isNumber"

// length :: [a] -> Number
export const length = list =>
  list != null && isNumber(list.length) ? list.length : NaN

export default length
