import { isArrayPropsChildren } from "./verifying.js"

export const getJsxPropsChildren = (props) => isArrayPropsChildren(props)? props.children: [props.children]

export const getJsxPropsKey = (props) => props.key

export const getJsxPropNames = (props) => Object.getOwnPropertyNames(props)

export const getJsxPropsRef = (props) => props.ref