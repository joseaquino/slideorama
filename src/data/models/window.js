import IO from "crocks/IO"

import assign from "crocks/helpers/assign"
import compose from "crocks/helpers/compose"
import map from "crocks/pointfree/map"
import run from "crocks/pointfree/run"

import { mapStateProp } from "../helpers"

const ioWindow = IO(() => window)

// getWindowDimensions :: () -> IO Object
const getWindowDimensions = () =>
  ioWindow.map(({ innerWidth, innerHeight }) => ({
    width: innerWidth,
    height: innerHeight
  }))

// setStateWindowDimension :: () -> State ComponentState ()
export const setWindowDimension = compose(
  run,
  map(mapStateProp("window")),
  map(assign),
  getWindowDimensions
)
