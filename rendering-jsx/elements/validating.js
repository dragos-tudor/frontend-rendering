import { isJsxType } from "./verifying.js"

export const validateJsxElement = (elem) => isJsxType(elem)? "": "Element should be jsx element."