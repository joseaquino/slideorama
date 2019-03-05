import { get } from "crocks/State"

import compose from "crocks/helpers/compose"
import prop from "crocks/Maybe/prop"

// viewStateProp :: String -> State AppState (Maybe a)
const viewStateProp = compose(
  get,
  prop
)

export default viewStateProp
