import { getJsxFactoryName } from "../factories/getting.js"
import { isJsxFactory } from "../factories/verifying.js"
import { getJsxFragmentName } from "../fragments/getting.js"
import { isJsxFragment } from "../fragments/verifying.js"
import { getJsxTextName } from "../texts/getting.js"
import { ElementType } from "./ElementType.js"
import { isJsxElement } from "./verifying.js"


export const getJsxElement = (store) => store.__elem

export const getJsxElementKey = (elem) => elem.key

export const getJsxElementName = (elem) => elem.type

export const getJsxElementProps = (elem) => elem.props

export const getJsxElementType = (type) => typeof type === 'symbol'? type: ElementType

export const getJsxName = (elem) =>
  (isJsxFactory(elem) && getJsxFactoryName(elem)) ||
  (isJsxElement(elem) && getJsxElementName(elem)) ||
  (isJsxFragment(elem) && getJsxFragmentName()) ||
  getJsxTextName()

export const getJsxProps = getJsxElementProps

export const getJsxKey = getJsxElementKey