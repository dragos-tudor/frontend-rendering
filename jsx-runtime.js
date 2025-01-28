const FragmentType = Symbol.for("react.fragment");
const ElementType = Symbol.for("react.element");
Object.freeze([
    ElementType,
    FragmentType
]);
const getJsxElementType = (type)=>typeof type === 'symbol' ? type : ElementType;
const createJsxElement = (type, props, key, parent, ref)=>({
        $$typeof: getJsxElementType(type),
        type,
        props,
        key,
        ref,
        _owner: parent
    });
const getJsxInternals = (store)=>store?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const getJsxParent = (internals)=>internals?.ReactCurrentOwner?.current;
const getJsxPropsKey = (props)=>props.key;
const getJsxPropNames = (props)=>Object.getOwnPropertyNames(props);
const getJsxPropsRef = (props)=>props.ref;
const setJsxPropChildren = (props, children)=>setJsxPropValue(props, "children", children);
const setJsxPropValue = (props, propName, propValue)=>Object.assign(props, {
        [propName]: propValue
    });
const ResevedPropNames = [
    "key",
    "ref",
    "__self",
    "__source"
];
const existsJsxKey = (key)=>key !== undefined;
const existsJsxPropsKey = (props)=>getJsxPropsKey(props) !== undefined;
const existsJsxPropsRef = (props)=>getJsxPropsRef(props) !== undefined;
const existsJsxPropValue = (props, propName)=>props[propName] !== undefined;
const isReservedJsxPropName = (propName)=>ResevedPropNames.includes(propName);
const copyJsxProp = (sourceProps)=>(targetProps, propName)=>{
        setJsxPropValue(targetProps, propName, sourceProps[propName]);
        return targetProps;
    };
const copyDefaultJsxProps = (sourceProps, targetProps)=>getJsxPropNames(sourceProps).filter((propName)=>!existsJsxPropValue(targetProps, propName)).reduce(copyJsxProp(sourceProps), targetProps);
const copyValidJsxProps = (sourceProps, targetProps = {})=>getJsxPropNames(sourceProps).filter((propName)=>!isReservedJsxPropName(propName)).reduce(copyJsxProp(sourceProps), targetProps);
const resolveJsxPropsKey = (props, maybeKey)=>existsJsxPropsKey(props) && getJsxPropsKey(props).toString() || existsJsxKey(maybeKey) && maybeKey.toString() || null;
const resolveJsxPropsRef = (props)=>existsJsxPropsRef(props) && getJsxPropsRef(props) || null;
const resolveJsxProps = (initialProps, type)=>type && type.defaultProps ? copyDefaultJsxProps(type.defaultProps, copyValidJsxProps(initialProps)) : copyValidJsxProps(initialProps);
const compileJsxExpression = (type, props, maybeKey)=>createJsxElement(type, resolveJsxProps(props, type), resolveJsxPropsKey(props, maybeKey), getJsxParent(getJsxInternals(globalThis["React"])), resolveJsxPropsRef(props));
const toJsxChildreArray = (children)=>children?.length == 1 ? children[0] : children;
const existsJsxChildren = (children)=>children && children.length > 0;
const compileLegacyJsxExpression = (type, props, ...children)=>existsJsxChildren(children) ? compileJsxExpression(type, setJsxPropChildren(props ?? {}, toJsxChildreArray(children))) : compileJsxExpression(type, props ?? {});
const registerReact = (global = globalThis)=>global.React = global.React || Object.freeze({
        createElement: compileLegacyJsxExpression,
        Fragment: FragmentType
    });
export { registerReact as registerReact };
export { compileJsxExpression as jsx };
export { compileJsxExpression as jsxs };
export { compileLegacyJsxExpression as legacyJsx };
export { FragmentType as Fragment };
