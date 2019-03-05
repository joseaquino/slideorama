import Maybe from "crocks/Maybe"

import constant from "crocks/combinators/constant"
import curry from "crocks/helpers/curry"
import isEmpty from "crocks/predicates/isEmpty"
import isObject from "crocks/predicates/isObject"
import isSameType from "crocks/predicates/isSameType"
import merge from "crocks/pointfree/merge"
import not from "crocks/logic/not"
import prop from "crocks/Maybe/prop"
import safe from "crocks/Maybe/safe"
import toPairs from "crocks/Pair/toPairs"
import traverse from "crocks/pointfree/traverse"

// isObjValueSameType :: Object -> String -> a -> Boolean
const isObjValueSameType = curry((obj, key, val) =>
  safe(isObject, obj)
    .chain(prop(key))
    .chain(safe(isSameType(val)))
    .either(constant(false), constant(true))
)

// objPropsSameType :: Object -> Object -> Maybe Object
const objPropsSameType = curry((objSrc, objToCheck) =>
  safe(not(isEmpty), objToCheck)
    .map(toPairs)
    .chain(traverse(Maybe, safe(merge(isObjValueSameType(objSrc)))))
    .map(constant(objToCheck))
)

export default objPropsSameType
