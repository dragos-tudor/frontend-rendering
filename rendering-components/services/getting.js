
export const getService = (elem, name, fallback) =>
  getServices(elem)?.[name] ?? fallback

export const getServices = (elem) =>
  elem.ownerDocument.__services