import curry from "crocks/helpers/curry"

// divBy :: Number -> Number -> Number
const divBy = curry((x, y) => y / x)

export default divBy
