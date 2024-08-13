import { isJsxFactory } from "./verifying.js"

export const getJsxFactoryName = (elem) => elem.type.name.toLowerCase()

export const getJsxFactoryClassName = (elem) => isJsxFactory(elem)? elem.type.className: ""