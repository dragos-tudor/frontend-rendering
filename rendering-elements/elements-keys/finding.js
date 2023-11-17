import { equalElementsKeys } from "./verifying.js"

export const findElementsByKey = (elem, $elems) => $elems.find($elem => equalElementsKeys(elem, $elem))
