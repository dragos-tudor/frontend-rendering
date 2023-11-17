
export const iterateHtmlChildren = (elem, func) => {
  for(let index = 0; index < elem.children.length; index++)
    func(elem.children[index])
}