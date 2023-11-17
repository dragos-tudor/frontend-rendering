import { getJsxElementType } from "./getting.js";

export const createJsxElement = (type, props, key, parent, ref) => ({
  $$typeof: getJsxElementType(type), type, props, key, ref, _owner: parent,
});
