import curry from "crocks/helpers/curry"

// incBy :: Number -> Number -> Number
const incBy = curry((x, y) => y + x)

export default incBy
