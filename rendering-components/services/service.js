import { setService, setServices } from "./setting.js"

export const Service = (props, elem) =>
{
  const services = setServices(elem)
  setService(services, props.name, props.value)
  return props.children
}