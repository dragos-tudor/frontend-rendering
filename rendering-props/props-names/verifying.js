import { isSafePropName, isSafeUrl } from "../security/verifying.js";
import { SpecialPropMappings } from "./mappings.js"

const ReservedPropNames = Object.freeze(["children"])

const TogglePropNames = Object.freeze([ "checked", "disabled", "hidden", "readOnly", "selected" ])


export const isAriaPropName = (propName) => propName.startsWith("aria-")

export const isDangerouslyPropName = (propName) => propName === "html"

export const isEventHandlerName = (propName) => propName.startsWith("on")

export const isInternalPropName = (propName) => propName.startsWith("__")

export const isReservedPropName = (propName) => ReservedPropNames.includes(propName)

export const isSpecialPropName = (propName) => propName in SpecialPropMappings

export const isStylePropName = (propName) =>  propName === "style"

export const isTogglePropName = (propName) => TogglePropNames.includes(propName)

export const isValidPropName = (props, propName, tagName) => !isReservedPropName(propName) && !isEventHandlerName(propName) && isSafePropName(tagName, propName) && isSafeUrl(props, propName)