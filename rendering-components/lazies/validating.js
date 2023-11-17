import { isFunctionLazyLoader } from "./verifying.js"

export const validateLazyLoader = (loader) => isFunctionLazyLoader(loader)? "": "Lazy loader should be function."