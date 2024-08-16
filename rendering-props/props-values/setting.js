import { getPropNames } from "../props-names/getting.js"

export const setPropValue = (elem, propName, propValue) => elem[propName] = propValue

export const setStylePropValue = (style) => (elem, styleName) => (elem.style[styleName] = style[styleName], styleName)

export const setStylePropValues = (elem, style) => getPropNames(style).reduce(setStylePropValue(style), elem)