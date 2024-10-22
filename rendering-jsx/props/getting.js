import { isArrayPropsChildren } from "./verifying.js"

export const getJsxPropsChildren = (props) => isArrayPropsChildren(props)? props.children: [props.children]