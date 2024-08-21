import { mapHtmlPropName } from "../../rendering-props/mod.js"
import { isSvgHtmlPropValue } from "../attr-values/verifying.js"

export const isHtmlPropName = (elem, propName) => (propName in elem)

export const isEventHandlerName = (attrName) => attrName.startsWith("on")

export const isInternalHtmlAttrName = (attrName) => attrName.startsWith("__")

export const isXmlnsHtmlAttrName = (attrName) => attrName === "xmlns"

export const isValidHtmlAttrName = (elem, attrName) =>
  (!isHtmlPropName(elem, mapHtmlPropName(attrName)) || isSvgHtmlPropValue(elem, attrName)) &&
  !isEventHandlerName(attrName) && !isInternalHtmlAttrName(attrName) && !isXmlnsHtmlAttrName(attrName)