import { isEmptyPropValue } from "./verifying.js"

export const getTogglePropValue = (propValue) => isEmptyPropValue(propValue) || propValue
