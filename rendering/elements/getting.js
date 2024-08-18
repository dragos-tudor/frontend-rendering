import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"

const getJsxElementNS = (elem) => getJsxProps(elem).xmlns

const getHtmlElementNS = ($elem) => $elem && getJsxElement($elem) && getJsxProps(getJsxElement($elem)).xmlns


export const getElementNS = (elem, $elem) => getJsxElementNS(elem) || getHtmlElementNS($elem)

export const getElementPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getMaxLengthElements = (elems, $elems) => elems.length > $elems.length? elems: $elems