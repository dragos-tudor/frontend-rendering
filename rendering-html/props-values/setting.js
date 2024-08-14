import { getPropNames } from "../props-names/getting.js"

export const setHtmlInternalValue = (elem, propName, propValue) => elem[propName] = propValue

export const setHtmlPropValue = (elem, propName, propValue) => elem[propName] = propValue

export const setHtmlStylePropValue = (style) => (elem, styleName) => (elem.style[styleName] = style[styleName], styleName)

export const setHtmlStylePropValues = (elem, style) => getPropNames(style).reduce(setHtmlStylePropValue(style), elem)