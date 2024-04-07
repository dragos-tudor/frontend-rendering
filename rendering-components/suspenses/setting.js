
export const setElementPropsHidden = (elem, value) => (elem.props.hidden = value, elem)

export const setElementsPropsHiodden = (elems, value) =>
  elems.map(elem => setElementPropsHidden(elem, value))