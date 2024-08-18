import { existsHtmlParentElement, existsHtmlNodeChildren, getHtmlName, getHtmlText, isHtmlText } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxName, getJsxProps, getJsxText } from "../../rendering-jsx/mod.js"
import { equalObjects } from "../../rendering-equalities/mod.js"
import { isIgnoredElement } from "../ignores/verifying.js"


export const equalElementNames = (elem, $elem) => getJsxName(elem) === getHtmlName($elem)

export const equalElementProps = (elem, $elem) => equalObjects(getJsxProps(elem), getJsxProps(getJsxElement($elem)))

export const equalTexts = (elem, $elem) => getJsxText(elem) === getHtmlText($elem)

export const existsElement = (elem) => !!elem

export const existsNoSkipElementProp = (elem) => getJsxProps(elem)["no-skip"]


export const isRenderedElement = (elem) => existsHtmlParentElement(elem) && !existsHtmlNodeChildren(elem)

export const isUpdatedElement = (elem) => existsHtmlParentElement(elem) && existsHtmlNodeChildren(elem)

export const isUnrenderedElement = (elem) => !existsHtmlParentElement(elem)


export const isStyleElement = (elem) => getHtmlName(elem) === "style"

export const isStyleIgnoredOrTextElement = ($elem) => isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem)

