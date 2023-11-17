import { getHtmlName } from "../elements/getting.js"
import { isEventHandler } from "../event-handlers/verifying.js"
import { isSafePropName, isSafeUrl } from "../security/validating.js"
import { SpecialPropMappings } from "./mappings.js"

const ReservedPropNames = Object.freeze(["children"])

export const isAriaPropName = (propName) => propName.startsWith("aria-")

export const isSpecialPropName = (propName) => SpecialPropMappings[propName]

export const isReservedPropName = (propName) => ReservedPropNames.includes(propName)

export const isValidPropName = (elem, props, propName) =>
  !isReservedPropName(propName) &&
  !isEventHandler(propName) &&
  isSafePropName(getHtmlName(elem), propName) &&
  isSafeUrl(props, propName)