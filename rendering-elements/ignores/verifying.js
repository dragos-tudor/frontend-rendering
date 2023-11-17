import { getHtmlName } from "../../rendering-html/mod.js"

export const isIgnoreArray = (elem) => elem.__ignore instanceof Array

export const isIgnoredElement = ($elem) => $elem.__ignore?.includes(getHtmlName($elem))