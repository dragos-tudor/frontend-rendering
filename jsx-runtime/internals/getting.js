
export const getJsxInternals = (store) => store?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

export const getJsxParent = (internals) => internals?.ReactCurrentOwner?.current
