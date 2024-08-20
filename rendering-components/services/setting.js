
export const setService = (services, name, value) => services[name] = value

export const setServices = (elem) => elem.ownerDocument.__services = elem.ownerDocument.__services || {}
