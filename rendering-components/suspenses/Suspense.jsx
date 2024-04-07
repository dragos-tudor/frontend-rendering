import { setElementPropsHidden, setElementsPropsHiodden } from "./setting.js"

export const Suspense = ({suspending = true, fallback, children}) =>
{
  setElementPropsHidden(fallback, !suspending)
  setElementsPropsHiodden(children, suspending)

  return <>
    {fallback}
    {...children}
  </>
}