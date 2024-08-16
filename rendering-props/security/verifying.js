
// deno-lint-ignore no-control-regex
const JavaScriptProtocolRegex = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i

const UnsafePropNames = Object.freeze(["css", "innerHTML", "outerHTML"])

const UrlPropNames = Object.freeze(["action", "background", "dynsrv", "href", "lowsrc", "src"])


const isSafePropNameForTag = (propName, tagName) => tagName === "style" && propName === "css"

export const isSafePropName = (tagName, propName) => isSafePropNameForTag(propName, tagName) || !UnsafePropNames.includes(propName)

export const isSafeUrl = (props, propName) => UrlPropNames.includes(propName)? !JavaScriptProtocolRegex.test(props[propName]||""): true