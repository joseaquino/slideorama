import constant from "crocks/combinators/constant"
import curry from "crocks/helpers/curry"

import mapStateProp from "./mapStateProp"

// setStateProp :: String -> a -> State AppState ()
const setStateProp = curry((key, val) => mapStateProp(key, constant(val)))

export default setStateProp
