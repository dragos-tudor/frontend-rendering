import { getHtmlParentElement, isHtmlText } from "../rendering-html/mod.js";
import { logHtmlElement } from "./elements/logging.js"
import { logHtmlText } from "./texts/logging.js"

const getLogger = ($elem) => isHtmlText($elem)? logHtmlText: logHtmlElement

export const logElement = ($elem, message) => getLogger($elem)($elem, getHtmlParentElement($elem), message)