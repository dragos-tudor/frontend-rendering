
const TogglePropNames = Object.freeze(["checked", "disabled", "hidden", "readOnly", "selected"])

export const isDangerouslyHtmlPropName = (propName) => propName === "html"

export const isEmptyPropValue = (propValue) => propValue == undefined || propValue === ""

export const isTogglePropName = (propName) => TogglePropNames.includes(propName)
