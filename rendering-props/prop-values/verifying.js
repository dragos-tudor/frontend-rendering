
export const isEmptyHtmlPropValue = (propValue) => propValue == undefined || propValue === ""

export const isSvgHtmlPropValue = (elem, propName) => elem[propName]?.constructor?.name.startsWith("SVG")