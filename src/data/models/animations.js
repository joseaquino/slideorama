import anime from "animejs/lib/anime.es.js"
import IO from "crocks/IO"

import compose from "crocks/helpers/compose"
import defaultProps from "crocks/helpers/defaultProps"
import objOf from "crocks/helpers/objOf"
import run from "crocks/pointfree/run"

const ioAnime = settings => IO(() => anime(settings))

const subtleZoom = defaultProps({
  delay: 40,
  easing: "easeInBack",
  duration: 800
})

export const subtleZoomIn = compose(
  run,
  ioAnime,
  subtleZoom,
  defaultProps({
    scale: 1.1
  }),
  objOf("targets")
)

const subtleZoomOut = compose(
  run,
  ioAnime,
  subtleZoom,
  defaultProps({
    scale: 1.0
  }),
  objOf("targets")
)
