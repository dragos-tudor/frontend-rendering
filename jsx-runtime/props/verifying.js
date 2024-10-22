import { getJsxPropsKey, getJsxPropsRef } from "./getting.js"

const ResevedPropNames = ["key", "ref", "__self", "__source"]

export const existsJsxKey = (key) => key !== undefined

export const existsJsxPropsKey = (props) => getJsxPropsKey(props) !== undefined

export const existsJsxPropsRef = (props) => getJsxPropsRef(props) !== undefined

export const existsJsxPropValue = (props, propName) => props[propName] !== undefined

export const isReservedJsxPropName = (propName) => ResevedPropNames.includes(propName)