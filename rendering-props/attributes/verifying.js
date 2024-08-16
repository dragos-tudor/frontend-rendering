
export const isAttrName = (elem, propName) => !(propName in elem)

export const isFunctionAttrValue = (attrValue) => typeof attrValue === "function"

export const isXmlnsAttrName = (attrName) => attrName === "xmlns"