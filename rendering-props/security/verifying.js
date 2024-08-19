
// deno-lint-ignore no-control-regex
const JavaScriptProtocolRegex = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i

const UnsafeHtmlPropNames = Object.freeze(["css", "innerHTML", "outerHTML"])

const UrlHtmlPropNames = Object.freeze(["action", "background", "dynsrv", "href", "lowsrc", "src"])


const isSafeHtmlPropNameForTag = (propName, tagName) => tagName === "style" && propName === "css"

export const isSafeHtmlPropName = (tagName, propName) => isSafeHtmlPropNameForTag(propName, tagName) || !UnsafeHtmlPropNames.includes(propName)

export const isSafeUrl = (props, propName) => UrlHtmlPropNames.includes(propName)? !JavaScriptProtocolRegex.test(props[propName]||""): true