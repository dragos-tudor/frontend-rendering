import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"

export const getMaxLengthElements = (elems, $elems) => elems.length > $elems.length? elems: $elems

export const getJsxElementNS = (elem) => getJsxProps(elem).xmlns

export const getHtmlElementNS = ($elem) => $elem && getJsxElement($elem) && getJsxProps(getJsxElement($elem)).xmlns
