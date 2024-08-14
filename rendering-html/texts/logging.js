import { getHtmlName } from "../elements/getting.js"
import { getHtmlText } from "./getting.js"

export const logHtmlText = ($text, $parent, message, logger) => logger($text, message, "text:", getHtmlText($text), "parent:", $parent && getHtmlName($parent))