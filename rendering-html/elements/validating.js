import { isSafeTagName } from "../security/verifying.js"
import { isHtmlElement } from "./verifying.js"

export const validateHtmlElement = (elem) => isHtmlElement(elem)? "": "Element type should be HTML Element."

export const validateHtmlTagName = (name) => isSafeTagName(name)? "": "Unsafe html tag " + name