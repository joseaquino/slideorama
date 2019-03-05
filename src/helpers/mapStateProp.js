import { modify } from "crocks/State"

import curry from "crocks/helpers/curry"
import mapProps from "crocks/helpers/mapProps"

// mapStateProp :: String -> (a -> b) -> State Object ()
const mapStateProp = curry((key, fn) => modify(mapProps({ [key]: fn })))

export default mapStateProp
