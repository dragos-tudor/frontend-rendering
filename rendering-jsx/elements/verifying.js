import { JsxTypes } from "./types.js"

export const existsJsxElement = (elem) => !!elem || elem === ""

export const isJsxElement = (elem) => typeof elem.type === 'string'

export const isJsxElementsArray = (elems) => elems instanceof Array

export const isJsxKeyElement = (elem) => elem.key != undefined

export const isJsxType = (elem) => typeof elem.$$typeof === "symbol"? JsxTypes.includes(elem.$$typeof): true