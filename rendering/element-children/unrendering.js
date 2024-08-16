import { getHtmlChildNodes } from "../../rendering-html/mod.js"
import { unrenderElement } from "../elements/unrendering.js"

export const unrenderElementChildren = ($elem) => getHtmlChildNodes($elem).map(unrenderElement)