
export const equalArraysLength = (arr1, arr2) => arr1.length === arr2.length

export const existsArray = (arr) => arr != null

export const existsArrays = (arr1, arr2) => existsArray(arr1) && existsArray(arr2)

export const isArrayType = (value) => value instanceof Array
