import { isJsxPropsChildrenArray } from "./verifying.js"

export const toJsxPropsChildrenArray = (props) => isJsxPropsChildrenArray(props)? props.children: [props.children]