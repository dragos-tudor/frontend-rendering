import { setElementPropsHidden, setElementsPropsHidden } from "./setting.js"

export const Suspense = ({suspending = true, fallback, children}) =>
{
  setElementPropsHidden(fallback, !suspending)
  setElementsPropsHidden(children, suspending)

  return <>
    {fallback}
    {...children}
  </>
}