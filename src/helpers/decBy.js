import curry from "crocks/helpers/curry"

// decBy :: Number -> Number -> Number
const decBy = curry((x, y) => y - x)

export default decBy
