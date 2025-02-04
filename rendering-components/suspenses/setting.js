
export const setElementPropsHidden = (elem, value) => (elem.props.hidden = value, elem)

export const setElementsPropsHidden = (elems, value) => elems.map(elem => setElementPropsHidden(elem, value))