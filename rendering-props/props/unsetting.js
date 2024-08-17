import { removeAttr } from "../attributes/removing.js"
import { getPropNames, getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { isInternalPropName } from "../props-names/verifying.js"
import { unsetPropValue } from "../props-values/unsetting.js"
import { getPropType, PropTypes } from "./getting.js";

export const unsetProp = (elem, propName) =>
{
  const mappedName = mapPropName(propName)
  const propType = getPropType(elem, mappedName)

  switch (propType) {
    case PropTypes.attr: removeAttr(elem, mappedName); break
    case PropTypes.writableProp: unsetPropValue(elem, mappedName); break
  }
  return elem
}

export const unsetInternalProps = (elem) => getPropNames(elem).filter(isInternalPropName).reduce((elem, propName) => unsetProp(elem, propName), elem)

export const unsetProps = (elem, props, tagName) => getValidPropNames(props, tagName).reduce((elem, propName) => unsetProp(elem, propName), elem)