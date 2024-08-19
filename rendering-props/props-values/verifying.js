
export const isEmptyHtmlPropValue = (propValue) => propValue == undefined || propValue === ""

export const isSVGHtmlPropValue = (elem, propName) => elem[propName]?.constructor?.name.startsWith("SVG")