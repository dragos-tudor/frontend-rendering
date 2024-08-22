
const EncodingCharsRegex = /[^\w. ]/gi


const getHtmlEntity = (char) => `&#${char.charCodeAt(0)};`

const getHexString = (char) => '0000'+ char.charCodeAt(0).toString(16)

const getUnicodePoint = (char) => '\\u' + (getHexString(char)).slice(-4)


export const encodeHtml = (string) => string.replace(EncodingCharsRegex, getHtmlEntity)

export const encodeJs = (string) => string.replace(EncodingCharsRegex, getUnicodePoint)
