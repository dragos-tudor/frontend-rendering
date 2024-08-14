import { getHtmlParentElement, isHtmlText, logHtmlElement, logHtmlText } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"
import { logInfo } from "../loggers/logging.js"

export const logElement = ($elem, message) => logHtmlElement($elem, getHtmlParentElement($elem), message, getJsxProps(getJsxElement($elem)), logInfo)

export const logElementOrText = ($elem, message) => isHtmlText($elem)? logText($elem, message): logElement($elem, message)

export const logText = ($elem, message) => logHtmlText($elem, getHtmlParentElement($elem), message, logInfo)
