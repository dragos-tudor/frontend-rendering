import { getValidHtmlPropNames } from "../props-names/getting.js"
import { getHtmlPropValue } from "../props-values/getting.js"
import { setHtmlPropValue } from "../props-values/setting.js"

export const setHtmlProps = (elem, props) => getValidHtmlPropNames(elem, props).reduce((elem, propName) => (setHtmlPropValue(elem, propName, getHtmlPropValue(props, propName)), elem), elem)