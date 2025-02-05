import { toJsxPropsChildrenArray } from "../props/converting.js"
import { isJsxFragment } from "./verifying.js"

export const replaceJsxFragments = (elems) => isJsxFragment(elems[0])? toJsxPropsChildrenArray(elems[0].props): elems