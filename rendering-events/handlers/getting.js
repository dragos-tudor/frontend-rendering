
export const getEventHandlerStoreName = (handlerName) => "__" + handlerName

export const getEventHandlerFromStore = (elem, handlerName) => elem[getEventHandlerStoreName(handlerName)]