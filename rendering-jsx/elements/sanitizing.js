import { replaceJsxFragments } from "../fragments/replacing.js"
import { isValidJsxText } from "../texts/verifying.js"
import { isJsxType } from "./verifying.js"

export const sanitizeJsxElements = (elems) => replaceJsxFragments(elems).filter(elem => isValidJsxText(elem) && isJsxType(elem))