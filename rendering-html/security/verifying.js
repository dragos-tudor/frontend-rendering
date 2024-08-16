
const UnsafeTagNames = Object.freeze(["SCRIPT", "IFRAME"])

export const isSafeTagName = (tagName) => !UnsafeTagNames.includes(tagName.toUpperCase())
