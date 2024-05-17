import { getHtmlName } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"
import { logInfo } from "../loggers/logging.js"

export const logHtmlElement = ($elem, $parent, message) =>
  logInfo($elem, message, "elem:", getHtmlName($elem), "props:", getJsxProps(getJsxElement($elem)), "parent:", $parent && getHtmlName($parent))