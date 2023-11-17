import { getJsxPropNames } from "./getting.js";
import { setJsxPropValue } from "./setting.js";
import { existsJsxPropValue, isReservedJsxPropName } from "./verifying.js"


const copyJsxProp = (sourceProps) => (targetProps, propName) => {
  setJsxPropValue(targetProps, propName, sourceProps[propName])
  return targetProps
}

export const copyDefaultJsxProps = (sourceProps, targetProps) =>
  getJsxPropNames(sourceProps)
    .filter(propName => !existsJsxPropValue(targetProps, propName))
    .reduce(copyJsxProp(sourceProps), targetProps)

export const copyValidJsxProps = (sourceProps, targetProps = {}) =>
  getJsxPropNames(sourceProps)
    .filter(propName => !isReservedJsxPropName(propName))
    .reduce(copyJsxProp(sourceProps), targetProps)