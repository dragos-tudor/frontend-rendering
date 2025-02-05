import { existsSingleJsxChild } from "./verifying.js"

export const resolveJsxChildren = (children) => existsSingleJsxChild(children)? children[0]: children