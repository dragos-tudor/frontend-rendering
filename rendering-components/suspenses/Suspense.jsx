import { setHiddenProps } from "./setting.js"

export const Suspense = ({suspending = true, fallback, children}) =>
{
  setHiddenProps(fallback, !suspending)
  children.forEach(child => setHiddenProps(child, suspending))

  return <>
    {fallback}
    {...children}
  </>
}