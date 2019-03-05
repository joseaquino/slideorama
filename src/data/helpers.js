import alt from "crocks/pointfree/alt"
import ap from "crocks/pointfree/ap"
import chain from "crocks/pointfree/chain"
import compose from "crocks/helpers/compose"
import constant from "crocks/combinators/constant"
import converge from "crocks/combinators/converge"
import isFunction from "crocks/predicates/isFunction"
import isObject from "crocks/predicates/isObject"
import liftA2 from "crocks/helpers/liftA2"
import map from "crocks/pointfree/map"
import option from "crocks/pointfree/option"
import prop from "crocks/Maybe/prop"
import safe from "crocks/Maybe/safe"

import liftToState from "../helpers/liftToState"
import setStateProp from "../helpers/setStateProp"
import viewStateProp from "../helpers/viewStateProp"

// setProps :: { props: a } -> State ComponentState ()
export const setProps = compose(
  setStateProp("props"),
  option({}),
  chain(safe(isObject)),
  prop("props")
)

// setViews :: { views: a } -> State ComponentState ()
export const setViews = compose(
  setStateProp("views"),
  option({}),
  chain(safe(isObject)),
  prop("views")
)

// setPropsAndViews :: { views: a, props: b } -> State ComponentState ()
export const setPropsAndViews = converge(liftA2(constant), setProps, setViews)

// getViewFromViews :: String -> State ComponentState (Maybe (ComponentState -> ReactComponent))
export const getViewFromViews = compose(
  map(chain(safe(isFunction))),
  ap(viewStateProp("views").map(option({}))),
  liftToState(prop)
)

// getComponentView :: () -> State ComponentState (ComponentState -> ReactComponent)
export const getComponentView = () =>
  liftA2(
    alt,
    getViewFromViews("DEFAULT"),
    viewStateProp("view")
      .map(option(""))
      .chain(getViewFromViews)
  ).map(option(constant(null)))
