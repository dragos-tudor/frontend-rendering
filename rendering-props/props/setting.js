import { getValidHtmlPropNames } from "../prop-names/getting.js"
import { getHtmlPropValue } from "../prop-values/getting.js"
import { setHtmlPropValue } from "../prop-values/setting.js"

export const setHtmlProps = (elem, props) => getValidHtmlPropNames(elem, props).reduce((elem, propName) => (setHtmlPropValue(elem, propName, getHtmlPropValue(props, propName)), elem), elem)