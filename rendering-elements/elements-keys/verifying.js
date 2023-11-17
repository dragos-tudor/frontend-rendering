import { getJsxKey, getJsxElement } from "../../rendering-jsx/mod.js"

export const equalElementsKeys = (elem, $elem) => getJsxKey(elem) === getJsxKey(getJsxElement($elem))
