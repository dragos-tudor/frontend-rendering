import { getJsxPropsChildren } from "../props/getting.js"
import { isJsxFragment } from "./verifying.js"

export const replaceJsxFragments = (elems, firstElem = elems[0]) => isJsxFragment(firstElem)? getJsxPropsChildren(firstElem.props): elems