

export const Suspense = ({suspending = true, fallback, children}) =>
  suspending? fallback: children