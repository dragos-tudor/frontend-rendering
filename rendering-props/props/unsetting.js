import { getHtmlPropNames, getValidHtmlPropNames } from "../prop-names/getting.js"
import { isInternalHtmlPropName } from "../prop-names/verifying.js"
import { unsetHtmlPropValue } from "../prop-values/unsetting.js"

export const unsetInternalHtmlProps = (elem) => getHtmlPropNames(elem).filter(isInternalHtmlPropName).reduce((elem, propName) => (unsetHtmlPropValue(elem, propName), elem), elem)

export const unsetHtmlProps = (elem, props) => getValidHtmlPropNames(elem, props).reduce((elem, propName) => (unsetHtmlPropValue(elem, propName), elem), elem)