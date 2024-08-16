
const isLogCategoryEnabled = (elem, category) => elem.__log.includes(category)

export const isLogEnabled = (elem, category) => isLogSet(elem) && isLogCategoryEnabled(elem, category)

export const isLogSet = (elem) => elem.__log instanceof Array
