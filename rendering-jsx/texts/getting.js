import { isJsxText } from "./verifying.js"

export const getJsxText = (value) => isJsxText(value) && value?.toString()

export const getJsxTextName = () => "text"