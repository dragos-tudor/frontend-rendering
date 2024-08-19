import { isSafeHtmlPropName, isSafeUrl } from "../security/verifying.js";
import { SpecialHtmlPropMappings } from "./mappings.js"

const ReservedHtmlPropNames = Object.freeze(["children"])

const ToggleHtmlPropNames = Object.freeze([ "checked", "disabled", "hidden", "readOnly", "selected" ])


export const isAriaHtmlPropName = (propName) => propName.startsWith("aria-")

export const isDangerouslyHtmlPropName = (propName) => propName === "html"

export const isEventHandlerName = (propName) => propName.startsWith("on")

export const isInternalHtmlPropName = (propName) => propName.startsWith("__")

export const isReservedHtmlPropName = (propName) => ReservedHtmlPropNames.includes(propName)

export const isSpecialHtmlPropName = (propName) => propName in SpecialHtmlPropMappings

export const isStyleHtmlPropName = (propName) =>  propName === "style"

export const isToggleHtmlPropName = (propName) => ToggleHtmlPropNames.includes(propName)

export const isValidHtmlPropName = (props, propName, tagName) => !isReservedHtmlPropName(propName) && !isEventHandlerName(propName) && isSafeHtmlPropName(tagName, propName) && isSafeUrl(props, propName)