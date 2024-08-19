import { isEmptyHtmlPropValue } from "./verifying.js"

export const getToggleHtmlPropValue = (propValue) => isEmptyHtmlPropValue(propValue) || propValue
