import { getHtmlName, getHtmlText } from "../../rendering-html/mod.js"
import { logInfo } from "../../support-loggers/mod.js"

export const logHtmlText = ($text, $parent, message) => logInfo($text, message, "text:", getHtmlText($text), "parent:", $parent && getHtmlName($parent))