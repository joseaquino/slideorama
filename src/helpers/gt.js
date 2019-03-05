import curry from "crocks/helpers/curry"

// gt :: Number -> Number -> Boolean
const gt = curry((x, y) => x > y)

export default gt
