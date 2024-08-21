import { isEmptyHtmlPropValue } from "./verifying.js"

export const getPropValue = (props, propName) => props[propName]

export const getToggleHtmlPropValue = (propValue) => isEmptyHtmlPropValue(propValue) || propValue
