import { getHtmlName } from "../../rendering-html/mod.js"

export const isIgnoredElement = ($elem) => $elem.__ignore?.includes(getHtmlName($elem))

export const isIgnoreSet = (elem) => elem.__ignore instanceof Array