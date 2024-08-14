import { removeAttribute } from "../attributes/removing.js"
import { getPropNameType, getValidPropNames, PropNameTypes } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { unsetHtmlInternalValue, unsetHtmlPropertyValue } from "../props-values/unsetting.js"

const unsetHtmlProperty = (elem, propName) =>
{
  const htmlPropName = mapPropName(propName)
  switch (getPropNameType(elem, htmlPropName)) {
    case PropNameTypes.attr: removeAttribute(elem, htmlPropName); break
    case PropNameTypes.internal: unsetHtmlInternalValue(elem, htmlPropName); break
    case PropNameTypes.writableProp: unsetHtmlPropertyValue(elem, htmlPropName); break
    case PropNameTypes.style: break
  }
  return elem
}

export const unsetHtmlProperties = (elem, props) => getValidPropNames(elem, props).reduce(unsetHtmlProperty, elem)