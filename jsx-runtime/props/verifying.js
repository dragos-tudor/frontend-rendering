import { getJsxPropsKey, getJsxPropsRef } from "./getting.js"

const ResevedPropNames = Object.freeze({ key: undefined, ref: undefined, __self: undefined, __source: undefined })

export const existsJsxKey = (key) => key !== undefined

export const existsJsxPropsKey = (props) => getJsxPropsKey(props) !== undefined

export const existsJsxPropsRef = (props) => getJsxPropsRef(props) !== undefined

export const existsJsxPropValue = (props, propName) => props[propName] !== undefined

export const isReservedJsxPropName = (propName) => propName in ResevedPropNames