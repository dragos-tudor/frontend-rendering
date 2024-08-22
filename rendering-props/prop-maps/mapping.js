import { toAriaCamelCaseName } from "../prop-names/formatting.js"
import { AriaHtmlPropMappings, SpecialHtmlPropMappings } from "../prop-maps/mappings.js"
import { isAriaHtmlPropName, isSpecialHtmlPropName } from "../prop-names/verifying.js"

export const mapHtmlPropName = (propName) =>
  (isSpecialHtmlPropName(propName) && SpecialHtmlPropMappings[propName]) ||
  (isAriaHtmlPropName(propName) && (AriaHtmlPropMappings[propName] || toAriaCamelCaseName(propName))) ||
  propName
