import { logHtmlElement, logHtmlText } from "../../rendering-elements/mod.js"
import { getHtmlParentElement, isHtmlText } from "../../rendering-html/mod.js"

const getLogger = ($elem) => isHtmlText($elem)? logHtmlText: logHtmlElement

export const logElement = ($elem, message) => getLogger($elem)($elem, getHtmlParentElement($elem), message)