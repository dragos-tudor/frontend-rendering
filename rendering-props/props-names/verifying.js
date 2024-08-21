import { isSvgHtmlPropValue } from "../props-values/verifying.js";
import { isSafeHtmlPropName, isSafeUrlHtmlPropValue } from "../security/verifying.js";
import { mapHtmlPropName } from "./mapping.js";
import { SpecialHtmlPropMappings } from "./mappings.js"

const ReservedHtmlPropNames = Object.freeze(["children"])

const ToggleHtmlPropNames = Object.freeze([ "checked", "disabled", "hidden", "readOnly", "readonly", "selected" ])


export const isAriaHtmlPropName = (propName) => propName.startsWith("aria-")

export const isDangerouslyHtmlPropName = (propName) => propName === "html"

export const isEventHandlerName = (propName) => propName.startsWith("on")

export const isHtmlPropName = (props, propName) => propName in props

export const isInternalHtmlPropName = (propName) => propName.startsWith("__")

export const isReservedHtmlPropName = (propName) => ReservedHtmlPropNames.includes(propName)

export const isSpecialHtmlPropName = (propName) => propName in SpecialHtmlPropMappings

export const isStyleHtmlPropName = (propName) =>  propName === "style"

export const isToggleHtmlPropName = (propName) => ToggleHtmlPropNames.includes(propName)

export const isValidHtmlPropName = (elem, props, propName) =>
  (isHtmlPropName(elem, mapHtmlPropName(propName)) || isInternalHtmlPropName(propName)) &&
  !isReservedHtmlPropName(propName) && !isEventHandlerName(propName) && !isSvgHtmlPropValue(elem, propName) && isSafeHtmlPropName(propName) && isSafeUrlHtmlPropValue(props, propName)