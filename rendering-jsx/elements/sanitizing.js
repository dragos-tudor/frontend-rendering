import { replaceJsxFragments } from "../fragments/replacing.js"
import { getJsxPropsChildren } from "../props/getting.js"
import { isValidJsxText } from "../texts/verifying.js"
import { isSafeJsxElement } from "./verifying.js"

export const sanitizeJsxChildren = (elem) => sanitizeJsxElements(getJsxPropsChildren(elem.props))

export const sanitizeJsxElements = (elems) => replaceJsxFragments(elems).filter(elem => isValidJsxText(elem) && isSafeJsxElement(elem))