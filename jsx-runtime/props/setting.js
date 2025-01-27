
export const setJsxPropChildren = (props, children) => setJsxPropValue(props, "children", children)

export const setJsxPropValue = (props, propName, propValue) => Object.assign(props, {[propName]: propValue})