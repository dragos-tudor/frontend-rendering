import { getHtmlChildNodes } from "../../rendering-html/mod.js"
import { isJsxKeyElement } from "../../rendering-jsx/mod.js"
import { existsElement } from "../elements/verifying.js"
import { orderKeyElements } from "../key-elements/ordering.js"

export const orderHtmlChildren = ($elem, children) =>
  existsElement(children[0]) && isJsxKeyElement(children[0])?
    orderKeyElements(children, getHtmlChildNodes($elem), $elem):
    getHtmlChildNodes($elem)