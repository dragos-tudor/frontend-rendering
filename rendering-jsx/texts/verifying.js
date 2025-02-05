
const InvalidValues = [true, false, null, undefined]

export const isJsxText = (value) => value?.$$typeof === undefined

export const isValidJsxText = (value) => !InvalidValues.includes(value)