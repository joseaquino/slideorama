import ifElse from "crocks/logic/ifElse"
import isString from "crocks/predicates/isString"

const reverse = ifElse(
  isString,
  s =>
    s
      .split("")
      .reverse()
      .join(""),
  xs => Array.prototype.slice.call(xs, 0).reverse()
)

export default reverse
