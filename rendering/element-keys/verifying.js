import { getJsxKey, getJsxElement } from "../../rendering-jsx/mod.js"

export const equalKeyElements = (elem, $elem) => getJsxKey(elem) === getJsxKey(getJsxElement($elem))
