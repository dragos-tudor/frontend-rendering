import { mapHtmlPropName } from "../../rendering-props/mod.js"
import { isSvgHtmlPropValue } from "../attr-values/verifying.js"


const isSvgPropOrHtmlNonPropName = (elem, attrName) => !isHtmlPropName(elem, mapHtmlPropName(attrName)) || isSvgHtmlPropValue(elem, attrName)

const isHtmlPropName = (elem, propName) => (propName in elem)

const isEventHandlerName = (attrName) => attrName.startsWith("on")

const isInternalHtmlAttrName = (attrName) => attrName.startsWith("__")

const isXmlnsHtmlAttrName = (attrName) => attrName === "xmlns"

export const isValidHtmlAttrName = (elem, attrName) => isSvgPropOrHtmlNonPropName(elem, attrName) && !isEventHandlerName(attrName) && !isInternalHtmlAttrName(attrName) && !isXmlnsHtmlAttrName(attrName)