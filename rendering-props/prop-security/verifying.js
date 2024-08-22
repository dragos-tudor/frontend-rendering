
// deno-lint-ignore no-control-regex
const JavaScriptProtocolRegex = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i

const UnsafeHtmlPropNames = Object.freeze(["innerHTML", "outerHTML"])

const UrlHtmlPropNames = Object.freeze(["action", "background", "dynsrv", "href", "lowsrc", "src"])


const isJavascriptInjection = (propValue) => JavaScriptProtocolRegex.test(propValue||"")

const isUrlHtmlPropName = (propName) => UrlHtmlPropNames.includes(propName)

const isSafeUrlHtmlPropValue = (props, propName) => isUrlHtmlPropName(propName)? !isJavascriptInjection(props[propName]): true


export const isDangerouslyHtmlPropName = (propName) => propName === "html"

export const isSafeHtmlPropName = (props, propName) => !UnsafeHtmlPropNames.includes(propName) && isSafeUrlHtmlPropValue(props, propName)




