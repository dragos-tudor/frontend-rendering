import { equalKeyElements } from "./verifying.js"

export const findKeyElements = (elem, $elems) => $elems.find($elem => equalKeyElements(elem, $elem))
