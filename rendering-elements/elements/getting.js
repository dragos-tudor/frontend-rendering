import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"

export const getElementNS = (elem) =>
  getJsxProps(elem).xmlns

export const getHtmlElementNS = ($elem) =>
  $elem && getJsxElement($elem) && getJsxProps(getJsxElement($elem)).xmlns

export const getHtmlPropNames = ($elem) =>
  Object.getOwnPropertyNames($elem)
