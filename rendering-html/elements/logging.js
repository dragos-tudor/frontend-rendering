import { getHtmlName } from "./getting.js"

export const logHtmlElement = ($elem, $parent, message, props, logger) => logger($elem, message, "elem:", getHtmlName($elem), "props:", props, "parent:", $parent && getHtmlName($parent))