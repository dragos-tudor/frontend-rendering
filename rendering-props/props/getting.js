import { isAttrName } from "../attributes/verifying.js"
import { isInternalPropName, isStylePropName } from "../props-names/verifying.js"
import { isSVGPropValue } from "../props-values/verifying.js"
import { isWritableProp } from "./verifying.js"

export const PropTypes = Object.freeze({ attr: 0, readonlyProp: 1, writableProp: 2, style: 3 })

export const getPropDescriptor = (elem, propName) => Object.getOwnPropertyDescriptor(elem, propName)

export const getPropType = (elem, propName) => {
  if (isInternalPropName(propName)) return PropTypes.writableProp
  if (isSVGPropValue(elem, propName)) return PropTypes.readonlyProp
  if (isStylePropName(propName)) return PropTypes.style
  if (isAttrName(elem, propName)) return PropTypes.attr
  if (isWritableProp(elem, propName)) return PropTypes.writableProp
  return PropTypes.readonlyProp
}