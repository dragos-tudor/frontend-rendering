
export const isHtmlAttrName = (elem, propName) => !(propName in elem)

export const isFunctionHtmlAttrValue = (attrValue) => typeof attrValue === "function"

export const isXmlnsHtmlAttrName = (attrName) => attrName === "xmlns"