import { isHtmlText } from "../../rendering-html/mod.js"
import { isStyleElement } from "../elements/verifying.js"
import { isIgnoredElement } from "../ignores/verifying.js"

export const shouldSkipChildren = ($elem) => isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem)