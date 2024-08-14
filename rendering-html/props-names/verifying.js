import { getHtmlName } from "../elements/getting.js"
import { isEventHandler } from "../event-handlers/verifying.js"
import { isSafePropName, isSafeUrl } from "../security/validating.js"
import { ReservedPropNames } from "./reserved.js"
import { SpecialPropMappings } from "./mappings.js"
import { TogglePropNames } from "./toggles.js"


export const isAriaPropName = (propName) => propName.startsWith("aria-")

export const isDangerouslyPropName = (propName) => propName === "html"

export const isHtmlPropName = (elem, propName) => propName in elem

export const isHtmlOrInternalPropName = (elem, propName) => isHtmlPropName(elem, propName) || isInternalPropName(propName)

export const isInternalPropName = (propName) => propName.startsWith("__")

export const isReservedPropName = (propName) => ReservedPropNames.includes(propName)

export const isSpecialPropName = (propName) => propName in SpecialPropMappings

export const isStylePropName = (propName) =>  propName === "style"

export const isTogglePropName = (propName) => TogglePropNames.includes(propName)

export const isValidPropName = (elem, props, propName) =>
  !isReservedPropName(propName) &&
  !isEventHandler(propName) &&
  isSafePropName(getHtmlName(elem), propName) &&
  isSafeUrl(props, propName)

