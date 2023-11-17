
const isLogLibraryEnabled = (elem, libraryName) => elem.__log.includes(libraryName)

export const isLogMounted = (elem) => elem.__log instanceof Array

export const isLogEnabled = (elem, libraryName) => isLogMounted(elem) && isLogLibraryEnabled(elem, libraryName)
