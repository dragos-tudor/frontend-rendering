import { isHtmlWritableProp } from "../props/verifying.js"
import { isHtmlPropName, isInternalPropName, isStylePropName, isValidPropName } from "./verifying.js"

export const PropNameTypes = Object.freeze({ attr: 0, internal: 1, readonlyProp: 2, style: 3, writableProp: 4 })

export const getPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getPropNameType = (elem, propName) => {
  if (isStylePropName(propName)) return PropNameTypes.style
  if (isInternalPropName(propName)) return PropNameTypes.internal
  if (!isHtmlPropName(elem, propName)) return PropNameTypes.attr
  if (isHtmlWritableProp(elem, propName)) return PropNameTypes.writableProp
  return PropNameTypes.readonlyProp
}

export const getValidPropNames = (elem, props) => getPropNames(props).filter(propName => isValidPropName(elem, props, propName))