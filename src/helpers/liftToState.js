import State from "crocks/State"

import compose from "crocks/helpers/compose"

// liftState :: (a -> b) -> a -> State s b
const liftToState = fn =>
  compose(
    State.of,
    fn
  )

export default liftToState
