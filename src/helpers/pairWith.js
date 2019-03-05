import Pair from "crocks/Pair"
import curry from "crocks/helpers/curry"

// pairWith :: a -> b -> Pair a b
const pairWith = curry((fst, snd) => Pair(fst, snd))

export default pairWith
