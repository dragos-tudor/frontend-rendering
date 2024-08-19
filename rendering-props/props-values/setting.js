import { getHtmlPropNames } from "../props-names/getting.js"

export const setHtmlPropValue = (elem, propName, propValue) => elem[propName] = propValue

export const setStyleHtmlPropValue = (style) => (elem, styleName) => (elem.style[styleName] = style[styleName], styleName)

export const setStyleHtmlPropValues = (elem, style) => getHtmlPropNames(style).reduce(setStyleHtmlPropValue(style), elem)