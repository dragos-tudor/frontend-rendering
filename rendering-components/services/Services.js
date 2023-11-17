import { setServices } from "./setting.js"

export const Services = (props, elem) => {
  setServices(elem, props)
  return props.children
}