import curry from "crocks/helpers/curry"

// strictEqual :: a -> b -> Boolean
const strictEqual = curry((x, y) => x === y)

export default strictEqual
