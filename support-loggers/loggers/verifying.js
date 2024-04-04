
const isLogCategoryEnabled = (elem, category) => elem.__log.includes(category)

export const isLogMounted = (elem) => elem.__log instanceof Array

export const isLogEnabled = (elem, category) => isLogMounted(elem) && isLogCategoryEnabled(elem, category)
