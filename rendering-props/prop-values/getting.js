import { isEmptyHtmlPropValue } from "./verifying.js"

export const NeutralCSSPropValue = "*"

export const getHtmlPropValue = (props, propName) => props[propName]

export const getToggleHtmlPropValue = (propValue) => isEmptyHtmlPropValue(propValue) || propValue
