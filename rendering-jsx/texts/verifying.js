
const isBoolean = (value) => typeof value === "boolean"

const isNull = (value) => value === null

const isUndefined = (value) => typeof value === "undefined"

export const isJsxText = (value) => value?.$$typeof === undefined

export const isValidJsxText = (value) => !isBoolean(value) && !isNull(value) && !isUndefined(value)