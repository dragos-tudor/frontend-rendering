import { toCamelCaseName } from "./formatting.js"
import { AriaPropMappings, SpecialPropMappings } from "./mappings.js"
import { isAriaPropName, isSpecialPropName } from "./verifying.js"

export const mapPropName = (propName) =>
  (isSpecialPropName(propName) && SpecialPropMappings[propName]) ||
  (isAriaPropName(propName) && (AriaPropMappings[propName] || toCamelCaseName(propName))) ||
  propName
