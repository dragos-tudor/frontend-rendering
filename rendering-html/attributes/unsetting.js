
export const unsetAttribute = (elem, attrName) =>
  elem.setAttribute?.(attrName, undefined)