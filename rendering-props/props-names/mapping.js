import { toAriaCamelCaseName } from "./formatting.js"
import { AriaHtmlPropMappings, SpecialHtmlPropMappings } from "./mappings.js"
import { isAriaHtmlPropName, isSpecialHtmlPropName } from "./verifying.js"

export const mapHtmlPropName = (propName) =>
  (isSpecialHtmlPropName(propName) && SpecialHtmlPropMappings[propName]) ||
  (isAriaHtmlPropName(propName) && (AriaHtmlPropMappings[propName] || toAriaCamelCaseName(propName))) ||
  propName
