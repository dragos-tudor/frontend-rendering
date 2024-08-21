
export const isFunctionHtmlAttrValue = (attrValue) => typeof attrValue === "function"

export const isSvgHtmlPropValue = (elem, attrName) => elem[attrName]?.constructor?.name.startsWith("SVG")