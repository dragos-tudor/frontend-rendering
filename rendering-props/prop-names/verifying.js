import { isSvgHtmlPropValue } from "../prop-values/verifying.js";
import { mapHtmlPropName } from "../prop-maps/mapping.js"
import { SpecialHtmlPropMappings } from "../prop-maps/mappings.js"


const ReservedHtmlPropNames = Object.freeze(["children"])

const ToggleHtmlPropNames = Object.freeze([ "checked", "disabled", "hidden", "readOnly", "readonly", "selected" ])

const isEventHandlerName = (propName) => propName.startsWith("on")

const isReservedHtmlPropName = (propName) => ReservedHtmlPropNames.includes(propName)


export const isAriaHtmlPropName = (propName) => propName.startsWith("aria-")

export const isHtmlPropName = (props, propName) => propName in props

export const isInternalHtmlPropName = (propName) => propName.startsWith("__")

export const isInternalOrHtmlPrtopName = (elem, propName) => isHtmlPropName(elem, mapHtmlPropName(propName)) || isInternalHtmlPropName(propName)

export const isSpecialHtmlPropName = (propName) => propName in SpecialHtmlPropMappings

export const isStyleHtmlPropName = (propName) =>  propName === "style"

export const isToggleHtmlPropName = (propName) => ToggleHtmlPropNames.includes(propName)

export const isValidHtmlPropName = (elem, propName) => isInternalOrHtmlPrtopName(elem, propName) && !isReservedHtmlPropName(propName) && !isEventHandlerName(propName) && !isSvgHtmlPropValue(elem, propName)