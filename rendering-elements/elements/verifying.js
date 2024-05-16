import { getHtmlName, isHtmlText } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxName, getJsxProps, isJsxFactory } from "../../rendering-jsx/mod.js"
import { equalObjects } from "../../support-equalities/mod.js"

export const equalElementNames = (elem, $elem) => getJsxName(elem) === getHtmlName($elem)

export const equalElementProps = (elem, $elem) => equalObjects(getJsxProps(elem), getJsxProps(getJsxElement($elem)))

export const existsElement = (elem) => !!elem

export const isFactoryElement = ($elem)=> !isHtmlText($elem) && isJsxFactory(getJsxElement($elem))

export const isStyleElement = (elem) => getHtmlName(elem) === "style"