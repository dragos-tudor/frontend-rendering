import { ElementType } from "./ElementType.js"
import { FragmentType } from "../fragments/FragmentType.js"

const SafeTypes = Object.freeze([ElementType, FragmentType])

export const isJsxElement = (elem) => typeof elem.type === 'string'

export const isJsxKeyElement = (elem) => elem.key != undefined

export const isJsxType = (elem) => typeof elem.$$typeof === "symbol"

export const isSafeJsxElement = (elem) => typeof elem.$$typeof === "symbol"? SafeTypes.includes(elem.$$typeof): true