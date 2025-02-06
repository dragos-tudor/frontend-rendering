const existsSingleJsxChild = (children)=>children?.length === 1;
const resolveJsxChildren = (children)=>existsSingleJsxChild(children) ? children[0] : children;
const getJsxInternals = (store)=>store?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const getJsxParent = (internals)=>internals?.ReactCurrentOwner?.current;
const deleteJsxPropsKeyAndRef = (props)=>(delete props.key, delete props.ref, props);
const getJsxPropsKey = (props)=>props?.key ?? null;
const getJsxPropsRef = (props)=>props?.ref ?? null;
const setJsxDefaultProps = (type, props)=>type?.defaultProps ? {
        ...type.defaultProps,
        ...props
    } : props;
const JsxElementType = Symbol.for("react.element");
const JsxFragmentType = Symbol.for("react.fragment");
const createJsxElement = (type, props, maybeKey = null)=>Object.freeze({
        $$typeof: JsxElementType,
        type,
        key: maybeKey ?? getJsxPropsKey(props),
        ref: getJsxPropsRef(props),
        props: deleteJsxPropsKeyAndRef(setJsxDefaultProps(type, props ?? {})),
        _owner: getJsxParent(getJsxInternals(globalThis["React"]))
    });
const createLegacyJsxElement = (type, props, ...children)=>Object.freeze({
        $$typeof: JsxElementType,
        type,
        key: getJsxPropsKey(props),
        ref: getJsxPropsRef(props),
        props: {
            ...deleteJsxPropsKeyAndRef(setJsxDefaultProps(type, props ?? {})),
            children: resolveJsxChildren(children)
        },
        _owner: getJsxParent(getJsxInternals(globalThis["React"]))
    });
const registerReact = (global = globalThis)=>global.React = global.React || Object.freeze({
        createElement: createLegacyJsxElement,
        Fragment: JsxFragmentType
    });
export { registerReact as registerReact };
export { createJsxElement as jsx };
export { createJsxElement as jsxs };
export { createLegacyJsxElement as legacyJsx };
export { JsxFragmentType as Fragment };
