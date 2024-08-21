// deno-lint-ignore-file no-control-regex
const getHtmlChildren = (elem)=>Array.from(elem.children ?? []);
const getHtmlName = (elem)=>elem.tagName?.toLowerCase().replace("_", "-") || "text";
const getHtmlOwnerDocument = (elem)=>elem?.ownerDocument;
const getHtmlParentElement = (elem)=>elem?.parentElement;
const findBreadthHtmlDescendant = (elems, func)=>{
    for (const elem of elems)if (func(elem)) return elem;
    for (const elem of elems){
        const descendant = findBreadthHtmlDescendant(getHtmlChildren(elem), func);
        if (descendant) return descendant;
    }
};
const findBreadthHtmlDescendants = (elems, func, result = [])=>{
    for (const elem of elems)if (func(elem)) result.push(elem);
    for (const elem of elems)findBreadthHtmlDescendants(getHtmlChildren(elem), func, result);
    return result;
};
const existsHtmlElement = (elem)=>elem;
const existsHtmlParentElement = (elem)=>elem.parentElement;
const isHtmlElement = (elem)=>elem.nodeType === 1;
const findHtmlAscendant = (elem, func)=>{
    if (!existsHtmlElement(elem)) return undefined;
    if (func(elem)) return elem;
    return findHtmlAscendant(getHtmlParentElement(elem), func);
};
const findHtmlAscendants = (elem, func, result = [])=>{
    if (!existsHtmlElement(elem)) return [];
    if (existsHtmlElement(elem)) result.push(elem);
    if (func(elem)) return result;
    return findHtmlAscendants(getHtmlParentElement(elem), func, result);
};
const findHtmlDescendants = (elem, func, result = [], findStrategy = findBreadthHtmlDescendants)=>findStrategy(getHtmlChildren(elem), func, result);
const logHtmlElement = ($elem, $parent, message, props, logger)=>logger($elem, message, "elem:", getHtmlName($elem), "props:", props, "parent:", $parent && getHtmlName($parent));
const appendHtmlNode = (node, parent)=>parent.appendChild(node);
const createHtmlElement = (document, tagName)=>document.createElement(tagName);
const createHtmlElementNS = (document, ns, tagName)=>document.createElementNS(ns, tagName);
const renderHtmlElement = (tagName, namespace, $parent)=>{
    const document = getHtmlOwnerDocument($parent);
    const $elem = namespace ? createHtmlElementNS(document, namespace, tagName) : createHtmlElement(document, tagName);
    appendHtmlNode($elem, $parent);
    return $elem;
};
const getHtmlChildNode = (node, index)=>node.childNodes[index];
const getHtmlChildNodes = (node)=>Array.from(node.childNodes);
const getHtmlParentNode = (node)=>node.parentNode;
const replaceHtmlNode = (node, oldNode)=>getHtmlParentNode(oldNode).replaceChild(node, oldNode);
const removeHtmlNode = (node)=>getHtmlParentNode(node).removeChild(node);
const unrenderHtmlElement = ($elem)=>getHtmlParentElement($elem) ? removeHtmlNode($elem) : $elem;
const UnsafeTagNames = Object.freeze([
    "SCRIPT",
    "IFRAME"
]);
const isSafeTagName = (tagName)=>!UnsafeTagNames.includes(tagName.toUpperCase());
const validateHtmlElement = (elem)=>isHtmlElement(elem) ? "" : "Element type should be HTML Element.";
const validateHtmlTagName = (name)=>isSafeTagName(name) ? "" : "Unsafe html tag " + name;
const insertHtmlNode = (node, oldNode)=>getHtmlParentNode(oldNode).insertBefore(node, oldNode) && node;
const existsHtmlNodeChildren = (node)=>node.childNodes !== 0;
const HtmlMimeType = "text/html";
const parseHtml = (html)=>new DOMParser().parseFromString(html, HtmlMimeType).documentElement;
const DOMLibraryUrl = "https://esm.sh/linkedom@0.14.26";
const registerDOMParser = async (url = DOMLibraryUrl, global = globalThis)=>{
    const dom = await import(url);
    global.DOMParser = global.DOMParser || dom.DOMParser;
    global.CustomEvent = dom.CustomEvent;
    return global.DOMParser;
};
const isHtmlText = (elem)=>elem.nodeType === 3;
const getHtmlText = ($elem)=>isHtmlText($elem) && $elem.textContent;
const createHtmlText = (document, text)=>document.createTextNode(text);
const insertHtmlText = (text, $elem, $parent)=>{
    const document = getHtmlOwnerDocument($parent);
    const $text = createHtmlText(document, text);
    return insertHtmlNode($text, $elem);
};
const logHtmlText = ($text, $parent, message, logger)=>logger($text, message, "text:", getHtmlText($text), "parent:", $parent && getHtmlName($parent));
const renderHtmlText = (text, $parent)=>{
    const document = getHtmlOwnerDocument($parent);
    const $text = createHtmlText(document, text);
    return appendHtmlNode($text, $parent);
};
const unrenderHtmlText = ($elem)=>getHtmlParentElement($elem) ? removeHtmlNode($elem) : $elem;
const setHtmlText = ($elem, text)=>$elem.textContent = text;
const updateHtmlText = (text, $elem)=>{
    setHtmlText($elem, text);
    return $elem;
};
const getEffect = (effects, name)=>effects[name];
const getEffects = (elem)=>elem.__effects;
const runInitialFunc = (effect)=>effect.initialFunc?.();
const runFunc = (effect)=>effect.func?.();
const runInitialEffects = (effects)=>effects ? Object.values(effects).map(runInitialFunc) : [];
const runEffects = (effects)=>effects ? Object.values(effects).map(runFunc) : [];
const setDepsEffect = (effect, deps)=>effect.deps = deps;
const setEffect = (effects, effect)=>effects[effect.name] = effect;
const setEffects = (elem, effects = {})=>elem.__effects = elem.__effects ?? effects;
const setFuncEffect = (effect, func)=>effect.func = func;
const setInitialFuncEffect = (effect, func)=>effect.initialFunc = func;
const setInitialEffect = (effects, name, func)=>setInitialFuncEffect(getEffect(effects, name), func);
const resetEffectFunc = (effect)=>effect.func = undefined;
const equalPrimitives = (value1, value2)=>value1 === value2;
const falsy = ()=>false;
const truthy = ()=>true;
const ReservedPropNames = Object.freeze([
    "children"
]);
const getObjectPropNames = (obj)=>Object.getOwnPropertyNames(obj);
const isReservedObjectPropName = (propName)=>ReservedPropNames.includes(propName);
const getObjectPropsLength = (obj)=>getObjectPropNames(obj).filter((propName)=>!isReservedObjectPropName(propName)).length;
const equalObjectsPropsLength = (obj1, obj2)=>getObjectPropsLength(obj1) === getObjectPropsLength(obj2);
const existsObject = (obj)=>obj != null;
const existsObjects = (obj1, obj2)=>existsObject(obj1) && existsObject(obj2);
const isObjectType = (value)=>typeof value === "object" && value !== null;
const equalArraysLength = (arr1, arr2)=>arr1.length === arr2.length;
const existsArray = (arr)=>arr != null;
const existsArrays = (arr1, arr2)=>existsArray(arr1) && existsArray(arr2);
const isArrayType = (value)=>value instanceof Array;
const isFunctionType = (value)=>typeof value === "function";
const equalArrayItems = (arr1, arr2)=>arr1.every((_, index)=>equalValues(arr1[index], arr2[index]));
const equalArrays = (arr1, arr2)=>(!existsArrays(arr1, arr2) && equalPrimitives || !equalArraysLength(arr1, arr2) && falsy || equalArrayItems)(arr1, arr2);
const equalValues = (value1, value2)=>(isFunctionType(value1) && isFunctionType(value2) && truthy || isArrayType(value1) && isArrayType(value2) && equalArrays || isObjectType(value1) && isObjectType(value2) && equalObjects || equalPrimitives)(value1, value2);
const equalObjectsProp = (obj1, obj2, propName)=>isReservedObjectPropName(propName) || equalValues(obj1[propName], obj2[propName]);
const equalObjectsProps = (obj1, obj2)=>getObjectPropNames(obj1).every((propName)=>equalObjectsProp(obj1, obj2, propName));
const equalObjects = (obj1, obj2)=>(!existsObjects(obj1, obj2) && equalPrimitives || !equalObjectsPropsLength(obj1, obj2) && falsy || equalObjectsProps)(obj1, obj2);
const createEffect = (name, func, deps)=>({
        name,
        func,
        deps,
        initialFunc: undefined
    });
const existsEffect = (effects, name)=>effects[name];
const isDefaultDeps = (deps)=>deps === undefined;
const useEffect = (effects, name, func, deps)=>{
    if (!existsEffect(effects, name)) return setEffect(effects, createEffect(name, func, deps));
    const effect = getEffect(effects, name);
    if (equalArrays(effect.deps, deps) && !isDefaultDeps(deps)) return resetEffectFunc(effect), effect;
    setDepsEffect(effect, deps);
    setFuncEffect(effect, func);
    return effect;
};
const ResevedPropNames = Object.freeze({
    key: undefined,
    ref: undefined,
    __self: undefined,
    __source: undefined
});
const existsJsxKey = (key)=>key !== undefined;
const getJsxPropsKey = (props)=>props.key;
const existsJsxPropsKey = (props)=>getJsxPropsKey(props) !== undefined;
const isArrayPropsChildren = (props)=>props.children instanceof Array;
const getJsxPropsChildren = (props)=>isArrayPropsChildren(props) ? props.children : [
        props.children
    ];
const getJsxPropNames = (props)=>Object.getOwnPropertyNames(props);
const getJsxPropsRef = (props)=>props.ref;
const existsJsxPropsRef = (props)=>getJsxPropsRef(props) !== undefined;
const existsJsxPropValue = (props, propName)=>props[propName] !== undefined;
const isReservedJsxPropName = (propName)=>propName in ResevedPropNames;
const FragmentType = Symbol.for("react.fragment");
const isJsxFragment = (elem)=>elem?.type === FragmentType;
const replaceJsxFragments = (elems, firstElem = elems[0])=>isJsxFragment(firstElem) ? getJsxPropsChildren(firstElem.props) : elems;
const isBoolean = (value)=>typeof value === "boolean";
const isNull = (value)=>value === null;
const isUndefined = (value)=>typeof value === "undefined";
const isJsxText = (value)=>value?.$$typeof === undefined;
const isValidJsxText = (value)=>!isBoolean(value) && !isNull(value) && !isUndefined(value);
const ElementType = Symbol.for("react.element");
const SafeTypes = Object.freeze([
    ElementType,
    FragmentType
]);
const existsJsxElement = (elem)=>!!elem;
const isJsxElement = (elem)=>typeof elem.type === 'string';
const isJsxKeyElement = (elem)=>elem.key != undefined;
const isJsxType = (elem)=>typeof elem.$$typeof === "symbol";
const isSafeJsxElement = (elem)=>typeof elem.$$typeof === "symbol" ? SafeTypes.includes(elem.$$typeof) : true;
const sanitizeJsxChildren = (elem)=>sanitizeJsxElements(getJsxPropsChildren(elem.props));
const sanitizeJsxElements = (elems)=>replaceJsxFragments(elems).filter((elem)=>isValidJsxText(elem) && isSafeJsxElement(elem));
const getJsxFactoryName = (elem)=>elem.type.name.toLowerCase().replace("_", "-");
const isJsxArrayElems = (elems)=>elems instanceof Array;
const isJsxFactory = (elem)=>typeof elem.type === "function";
const getJsxFragmentName = ()=>"fragment";
const getJsxText = (value)=>isJsxText(value) && value?.toString();
const getJsxTextName = ()=>"text";
const getJsxElement = (store)=>store.__elem;
const getJsxElementKey = (elem)=>elem.key;
const getJsxElementName = (elem)=>elem.type;
const getJsxElementProps = (elem)=>elem.props;
const getJsxElementType = (type)=>typeof type === 'symbol' ? type : ElementType;
const getJsxName = (elem)=>isJsxFactory(elem) && getJsxFactoryName(elem) || isJsxElement(elem) && getJsxElementName(elem) || isJsxFragment(elem) && getJsxFragmentName() || getJsxTextName();
const getJsxProps = getJsxElementProps;
const getJsxKey = getJsxElementKey;
const createJsxElement = (type, props, key, parent, ref)=>({
        $$typeof: getJsxElementType(type),
        type,
        props,
        key,
        ref,
        _owner: parent
    });
const storeJsxElement = (store, elem)=>store.__elem = elem;
const validateJsxElement = (elem)=>isJsxType(elem) ? "" : "Element should be jsx element.";
const sanitizeJsxPropsChildren = (props, children)=>({
        ...props,
        children: sanitizeJsxElements(children)
    });
const runJsxFactory = (elem, $elem, props)=>elem.type(Object.freeze(props), $elem);
const buildJsxFactoryChildren = (elem, $elem)=>{
    const children = getJsxPropsChildren(elem.props);
    const sanitizeProps = sanitizeJsxPropsChildren(elem.props, children);
    const factoryElems = runJsxFactory(elem, $elem, sanitizeProps);
    return sanitizeJsxElements(isJsxArrayElems(factoryElems) ? factoryElems : [
        factoryElems
    ]);
};
const isFunctionLazyLoader = (loader)=>typeof loader === "function";
const validateLazyLoader = (loader)=>isFunctionLazyLoader(loader) ? "" : "Lazy loader should be function.";
const throwError = (message)=>{
    if (!message) return false;
    throw new Error(message);
};
const createMemo = (name, value, deps)=>({
        name,
        value,
        deps
    });
const setMemo = (states, memo)=>states[memo.name] = memo;
const setMemoDeps = (memo, deps)=>memo.deps = deps;
const setMemoValue = (memo, value)=>memo.value = value;
const getMemo = (memos, name)=>memos[name];
const getMemoUsage = (memo)=>[
        memo.value,
        (func)=>setMemoValue(memo, func())
    ];
const existsMemo = (states, name)=>states[name];
const isDefaultDeps1 = (deps)=>deps === undefined;
const useMemo = (states, name, func, deps)=>{
    if (!existsMemo(states, name)) {
        const memo = setMemo(states, createMemo(name, func(), deps));
        return getMemoUsage(memo);
    }
    const memo = getMemo(states, name);
    if (equalArrays(memo.deps, deps) && !isDefaultDeps1(deps)) return getMemoUsage(memo);
    setMemoDeps(memo, deps);
    setMemoValue(memo, func());
    return getMemoUsage(memo);
};
const setState = (states, state)=>states[state.name] = state;
const setStateDeps = (state, deps)=>state.deps = deps;
const setStateValue = (state, value)=>state.value = value;
const setStates = (elem, states = {})=>elem.__states = elem.__states ?? states;
const getState = (states, name)=>states[name];
const getStateUsage = (state)=>[
        state.value,
        (value)=>setStateValue(state, value)
    ];
const createState = (name, value, deps)=>({
        name,
        value,
        deps
    });
const existsState = (states, name)=>states[name];
const isDefaultDeps2 = (deps)=>deps === undefined;
const useState = (states, name, value, deps)=>{
    if (!existsState(states, name)) {
        const state = setState(states, createState(name, value, deps));
        return getStateUsage(state);
    }
    const state = getState(states, name);
    if (equalArrays(state.deps, deps) && !isDefaultDeps2(deps)) return getStateUsage(state);
    setStateDeps(state, deps);
    setStateValue(state, value);
    return getStateUsage(state);
};
const setContext = (contexts, context)=>contexts[context.name] = context;
const setContexts = (elem, contexts = {})=>elem.__contexts = elem.__contexts ?? contexts;
const setContextValue = (context, value)=>(context.value = value, context);
const createContext = (name, value)=>({
        name,
        value
    });
const getContext = (contexts, name)=>contexts[name];
const getContexts = (elem)=>elem.__contexts;
const existsContext = (contexts, name)=>name in contexts;
const isContextConsumer = (elem, name)=>getHtmlName(elem) !== "context" && existsContext(getContexts(elem), name);
const isContextProducer = (elem, name)=>getHtmlName(elem) === "context" && existsContext(getContexts(elem), name);
const findProducer = (elem, name)=>findHtmlAscendant(elem, (elem)=>isContextProducer(elem, name));
const getContextValue = (contexts, name)=>getContext(contexts, name).value;
const getProducerContextValue = (name, fallbackValue, elem)=>{
    const producer = findProducer(elem, name);
    if (!producer) return fallbackValue;
    const contexts = getContexts(producer);
    const context = getContext(contexts, name);
    return context.value;
};
const findConsumer = (elem, name)=>findHtmlDescendants(elem, (elem)=>isContextConsumer(elem, name));
const createCustomEvent = (eventName, detail)=>new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail
    });
const dispatchEvent = (elem, eventName, detail)=>elem.dispatchEvent(createCustomEvent(eventName, detail));
const isFunctionHtmlPropValue = (props, propName)=>typeof props[propName] === "function";
const isHtmlEventHandler = (props, propName)=>isHtmlEventHandlerName(propName) && isFunctionHtmlPropValue(props, propName);
const isHtmlEventHandlerName = (propName)=>propName.startsWith("on");
const getHtmlPropNames = (props)=>Object.getOwnPropertyNames(props);
const getHtmlEventName = (handlerName)=>handlerName.replace("on", "");
const getValidHtmlEventHandlerNames = (props)=>getHtmlPropNames(props).filter((propName)=>isHtmlEventHandler(props, propName));
const storeHtmlEventHandler = (elem, handlerName, handler)=>elem[handlerName] = handler;
const unstoreHtmlEventHandler = (elem, handlerName)=>delete elem[handlerName];
const unsetHtmlEventHandler = (elem, handlerName)=>{
    elem.removeEventListener(getHtmlEventName(handlerName), elem[handlerName]);
    unstoreHtmlEventHandler(elem, handlerName);
    return handlerName;
};
const unsetHtmlEventHandlers = (elem, props)=>getValidHtmlEventHandlerNames(props).map((handlerName)=>unsetHtmlEventHandler(elem, handlerName));
const setHtmlEventHandler = (elem, handlerName, handler)=>{
    unsetHtmlEventHandler(elem, handlerName);
    storeHtmlEventHandler(elem, handlerName, handler);
    return handlerName;
};
const setHtmlEventHandlers = (elem, props)=>getValidHtmlEventHandlerNames(props).map((handlerName)=>setHtmlEventHandler(elem, handlerName, props[handlerName]));
const isHtmlAttrName = (elem, propName)=>!(propName in elem);
const isFunctionHtmlAttrValue = (attrValue)=>typeof attrValue === "function";
const isXmlnsHtmlAttrName = (attrName)=>attrName === "xmlns";
const setHtmlAttrNSValue = (elem, attrName, attrValue)=>elem.setAttributeNS?.(null, attrName, attrValue);
const setHtmlAttrValue = (elem, attrName, attrValue)=>{
    if (isFunctionHtmlAttrValue(attrValue)) return;
    if (isXmlnsHtmlAttrName(attrName)) return;
    setHtmlAttrNSValue(elem, attrName, attrValue);
    return attrValue;
};
const JavaScriptProtocolRegex = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
const UnsafeHtmlPropNames = Object.freeze([
    "css",
    "innerHTML",
    "outerHTML"
]);
const UrlHtmlPropNames = Object.freeze([
    "action",
    "background",
    "dynsrv",
    "href",
    "lowsrc",
    "src"
]);
const isSafeHtmlPropNameForTag = (propName, tagName)=>tagName === "style" && propName === "css";
const isSafeHtmlPropName = (tagName, propName)=>isSafeHtmlPropNameForTag(propName, tagName) || !UnsafeHtmlPropNames.includes(propName);
const isSafeUrl = (props, propName)=>UrlHtmlPropNames.includes(propName) ? !JavaScriptProtocolRegex.test(props[propName] || "") : true;
const AriaHtmlPropMappings = Object.freeze({
    "aria-autocomplete": "ariaAutoComplete",
    "aria-colcount": "ariaColCount",
    "aria-colindex": "ariaColIndex",
    "aria-colindextext": "ariaColIndexText",
    "aria-haspopup": "ariaHasPopUp",
    "aria-keyshortcuts": "ariaKeyShortcuts",
    "aria-multiselectable": "ariaMultiSelectable",
    "aria-posinset": "ariaPosInSet",
    "aria-readonly": "ariaReadOnly",
    "aria-roledescription": "ariaRoleDescription",
    "aria-rowcount": "ariaRowCount",
    "aria-rowindex": "ariaRowIndex",
    "aria-rowspan": "ariaRowSpan",
    "aria-setsize": "ariaSetSize",
    "aria-valuemax": "ariaValueMax",
    "aria-valuemin": "ariaValueMin",
    "aria-valuenow": "ariaValueNow",
    "aria-valuetext": "ariaValueText"
});
const SpecialHtmlPropMappings = Object.freeze({
    class: "className",
    for: "htmlFor",
    readonly: "readOnly",
    tabindex: "tabIndex",
    css: "innerHTML",
    html: "innerHTML"
});
const ReservedHtmlPropNames = Object.freeze([
    "children"
]);
const ToggleHtmlPropNames = Object.freeze([
    "checked",
    "disabled",
    "hidden",
    "readOnly",
    "selected"
]);
const isAriaHtmlPropName = (propName)=>propName.startsWith("aria-");
const isDangerouslyHtmlPropName = (propName)=>propName === "html";
const isEventHandlerName = (propName)=>propName.startsWith("on");
const isInternalHtmlPropName = (propName)=>propName.startsWith("__");
const isReservedHtmlPropName = (propName)=>ReservedHtmlPropNames.includes(propName);
const isSpecialHtmlPropName = (propName)=>propName in SpecialHtmlPropMappings;
const isStyleHtmlPropName = (propName)=>propName === "style";
const isToggleHtmlPropName = (propName)=>ToggleHtmlPropNames.includes(propName);
const isValidHtmlPropName = (props, propName, tagName)=>!isReservedHtmlPropName(propName) && !isEventHandlerName(propName) && isSafeHtmlPropName(tagName, propName) && isSafeUrl(props, propName);
const getHtmlPropNames1 = (elem)=>Object.getOwnPropertyNames(elem);
const getValidHtmlPropNames = (props, tagName)=>getHtmlPropNames1(props).filter((propName)=>isValidHtmlPropName(props, propName, tagName));
const toAriaCamelCaseName = (attrName)=>`aria${attrName[5].toUpperCase()}${attrName.substring(6)}`;
const mapHtmlPropName = (propName)=>isSpecialHtmlPropName(propName) && SpecialHtmlPropMappings[propName] || isAriaHtmlPropName(propName) && (AriaHtmlPropMappings[propName] || toAriaCamelCaseName(propName)) || propName;
const isEmptyHtmlPropValue = (propValue)=>propValue == undefined || propValue === "";
const isSVGHtmlPropValue = (elem, propName)=>elem[propName]?.constructor?.name.startsWith("SVG");
const getPropValue = (props, propName)=>props[propName];
const getToggleHtmlPropValue = (propValue)=>isEmptyHtmlPropValue(propValue) || propValue;
const EncodingCharsRegex = /[^\w. ]/gi;
const getHtmlEntity = (__char)=>`&#${__char.charCodeAt(0)};`;
const encodeHtml = (string)=>string.replace(EncodingCharsRegex, getHtmlEntity);
const resolveHtmlPropValue = (propName, propValue)=>isToggleHtmlPropName(mapHtmlPropName(propName)) && getToggleHtmlPropValue(propValue) || isDangerouslyHtmlPropName(propName) && encodeHtml(propValue) || propValue;
const setHtmlPropValue = (elem, propName, propValue)=>elem[propName] = propValue;
const setStyleHtmlPropValue = (style)=>(elem, styleName)=>(elem.style[styleName] = style[styleName], styleName);
const setStyleHtmlPropValues = (elem, style)=>getHtmlPropNames1(style).reduce(setStyleHtmlPropValue(style), elem);
const HtmlPropTypes = Object.freeze({
    attr: 0,
    readonlyProp: 1,
    writableProp: 2,
    style: 3,
    svgProp: 4
});
const getHtmlPropDescriptor = (elem, propName)=>Object.getOwnPropertyDescriptor(elem, propName);
const isWritableHtmlProp = (elem, propName)=>{
    const propDescriptor = getHtmlPropDescriptor(elem, propName);
    if (propDescriptor && "writable" in propDescriptor) return propDescriptor.writable;
    if (propDescriptor && "set" in propDescriptor) return true;
    return true;
};
const getHtmlPropType = (elem, propName)=>{
    if (isInternalHtmlPropName(propName)) return HtmlPropTypes.writableProp;
    if (isSVGHtmlPropValue(elem, propName)) return HtmlPropTypes.svgProp;
    if (isStyleHtmlPropName(propName)) return HtmlPropTypes.style;
    if (isHtmlAttrName(elem, propName)) return HtmlPropTypes.attr;
    if (isWritableHtmlProp(elem, propName)) return HtmlPropTypes.writableProp;
    return HtmlPropTypes.readonlyProp;
};
const setHtmlProp = (elem, props, propName)=>{
    const mappedName = mapHtmlPropName(propName);
    const propValue = getPropValue(props, propName);
    const propType = getHtmlPropType(elem, mappedName);
    switch(propType){
        case HtmlPropTypes.attr:
            setHtmlAttrValue(elem, mappedName, propValue);
            break;
        case HtmlPropTypes.style:
            setStyleHtmlPropValues(elem, propValue);
            break;
        case HtmlPropTypes.svgProp:
            setHtmlAttrValue(elem, propName, propValue);
            break;
        case HtmlPropTypes.writableProp:
            setHtmlPropValue(elem, mappedName, resolveHtmlPropValue(propName, propValue));
            break;
    }
    return elem;
};
const setHtmlProps = (elem, props, tagName)=>getValidHtmlPropNames(props, tagName).reduce((elem, propName)=>setHtmlProp(elem, props, propName), elem);
const removeHtmlAttr = (elem, attrName)=>elem.removeAttribute(attrName);
const unsetHtmlPropValue = (elem, propName)=>elem[propName] = undefined;
const unsetHtmlProp = (elem, propName)=>{
    const mappedName = mapHtmlPropName(propName);
    const propType = getHtmlPropType(elem, mappedName);
    switch(propType){
        case HtmlPropTypes.attr:
            removeHtmlAttr(elem, mappedName);
            break;
        case HtmlPropTypes.writableProp:
            unsetHtmlPropValue(elem, mappedName);
            break;
    }
    return elem;
};
const unsetInternalHtmlProps = (elem)=>getHtmlPropNames1(elem).filter(isInternalHtmlPropName).reduce((elem, propName)=>unsetHtmlProp(elem, propName), elem);
const unsetHtmlProps = (elem, props, tagName)=>getValidHtmlPropNames(props, tagName).reduce((elem, propName)=>unsetHtmlProp(elem, propName), elem);
const throwError1 = (message)=>{
    if (!message) return false;
    throw new Error(message);
};
const setIgnore = ($elem, $parent)=>$elem.__ignore = [
        ...$parent.__ignore
    ];
const isIgnoredElement = ($elem)=>$elem.__ignore?.includes(getHtmlName($elem));
const isIgnoreSet = (elem)=>elem.__ignore instanceof Array;
const enableIgnoring = ($elem, $parent)=>isIgnoreSet($elem) || isIgnoreSet($parent) && setIgnore($elem, $parent);
const setLog = ($elem, $parent)=>$elem.__log = [
        ...$parent.__log
    ];
const isLogCategoryEnabled = (elem, category)=>elem.__log.includes(category);
const isLogEnabled = (elem, category)=>isLogSet(elem) && isLogCategoryEnabled(elem, category);
const isLogSet = (elem)=>elem.__log instanceof Array;
const enableLogging = ($elem, $parent)=>isLogSet($elem) || isLogSet($parent) && setLog($elem, $parent);
const getJsxElementNS = (elem)=>getJsxProps(elem).xmlns;
const getHtmlElementNS = ($elem)=>$elem && getJsxElement($elem) && getJsxProps(getJsxElement($elem)).xmlns;
const getElementNS = (elem, $elem)=>getJsxElementNS(elem) || getHtmlElementNS($elem);
const getMaxLengthElements = (elems, $elems)=>elems.length > $elems.length ? elems : $elems;
const Category = "rendering";
const LogHeader = "[rendering]";
const logError = (elem, ...args)=>isLogEnabled(elem, Category) && console.error(LogHeader, ...args);
const logInfo = (elem, ...args)=>isLogEnabled(elem, Category) && console.info(LogHeader, ...args);
const logElement = ($elem, message)=>logHtmlElement($elem, getHtmlParentElement($elem), message, getJsxProps(getJsxElement($elem)), logInfo);
const logElementOrText = ($elem, message)=>isHtmlText($elem) ? logText($elem, message) : logElement($elem, message);
const logText = ($elem, message)=>logHtmlText($elem, getHtmlParentElement($elem), message, logInfo);
const renderElement = (elem, $parent)=>{
    if (isJsxText(elem)) return renderHtmlText(elem, $parent);
    throwError1(validateHtmlElement($parent));
    throwError1(validateJsxElement(elem));
    throwError1(validateHtmlTagName(getJsxName(elem)));
    const tagName = getJsxName(elem);
    const props = getJsxProps(elem);
    const $elem = renderHtmlElement(tagName, getElementNS(elem, $parent), $parent);
    setHtmlProps($elem, props, tagName);
    setHtmlEventHandlers($elem, props);
    enableIgnoring($elem, $parent);
    enableLogging($elem, $parent);
    storeJsxElement($elem, elem);
    logElementOrText($elem, "render");
    return $elem;
};
const dispatchError = (elem, error)=>dispatchEvent(elem, "error", {
        error
    });
const handleError = (func, elem)=>{
    try {
        return func();
    } catch (error) {
        logError(elem, error.message, error.stack);
        dispatchError(elem, error);
        throw error;
    }
};
const resolveJsxChildren = (elem, $elem)=>isJsxFactory(elem) && handleError(()=>buildJsxFactoryChildren(elem, $elem), $elem) || isJsxElement(elem) && sanitizeJsxChildren(elem) || [];
const renderElementChildren = ($elem)=>resolveJsxChildren(getJsxElement($elem), $elem).map((child)=>renderElement(child, $elem));
const equalElementNames = (elem, $elem)=>getJsxName(elem) === getHtmlName($elem);
const equalElementProps = (elem, $elem)=>equalObjects(getJsxProps(elem), getJsxProps(getJsxElement($elem)));
const equalTexts = (elem, $elem)=>getJsxText(elem) === getHtmlText($elem);
const existsElement = (elem)=>!!elem;
const existsNoSkipElementProp = (elem)=>getJsxProps(elem)["no-skip"];
const isRenderedElement = (elem)=>existsHtmlParentElement(elem) && !existsHtmlNodeChildren(elem);
const isUpdatedElement = (elem)=>existsHtmlParentElement(elem) && existsHtmlNodeChildren(elem);
const isUnrenderedElement = (elem)=>!existsHtmlParentElement(elem);
const isStyleElement = (elem)=>getHtmlName(elem) === "style";
const isStyleIgnoredOrTextElement = ($elem)=>isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem);
const renderElementTree = (elem, $parent = parseHtml("<main></main>"))=>{
    const $elems = [
        renderElement(elem, $parent)
    ];
    for (const $elem of $elems)isStyleIgnoredOrTextElement($elem) || $elems.push(...renderElementChildren($elem));
    $elems.forEach(($elem)=>runEffects(getEffects($elem)));
    return $elems;
};
const updateElement = (elem, $elem)=>{
    logElementOrText($elem, "update");
    if (isJsxText(elem)) return updateHtmlText(elem, $elem);
    throwError1(validateHtmlElement($elem));
    throwError1(validateJsxElement(elem));
    const props = getJsxProps(elem);
    const tagName = getHtmlName($elem);
    setHtmlProps($elem, props, tagName);
    setHtmlEventHandlers($elem, props);
    storeJsxElement($elem, elem);
    return $elem;
};
const unrenderElement = ($elem)=>{
    logElementOrText($elem, "unrender");
    if (isHtmlText($elem)) return unrenderHtmlText($elem);
    throwError1(validateHtmlElement($elem));
    const props = getJsxProps(getJsxElement($elem));
    const tagName = getHtmlName($elem);
    runInitialEffects(getEffects($elem));
    unsetHtmlProps($elem, tagName);
    unsetHtmlEventHandlers($elem, props);
    unsetInternalHtmlProps($elem);
    unrenderHtmlElement($elem);
    return $elem;
};
const replaceElement = ($elem, $oldElem)=>{
    logElementOrText($oldElem, "replace");
    isHtmlText($oldElem) ? replaceHtmlNode($elem, $oldElem) : replaceHtmlNode($elem, $oldElem);
    return $elem;
};
const ReconcilingTypes = Object.freeze({
    render: 0,
    update: 1,
    replace: 2,
    unrender: 3,
    skip: 4
});
const getReconcilingType = (elem, $elem)=>{
    if (!existsHtmlElement($elem)) return ReconcilingTypes.render;
    if (!existsJsxElement(elem)) return ReconcilingTypes.unrender;
    if (!equalElementNames(elem, $elem)) return ReconcilingTypes.replace;
    if (isJsxElement(elem)) return ReconcilingTypes.update;
    if (isJsxFactory(elem) && !equalElementProps(elem, $elem)) return ReconcilingTypes.update;
    if (isJsxFactory(elem) && existsNoSkipElementProp(elem)) return ReconcilingTypes.update;
    if (isJsxText(elem) && !equalTexts(elem, $elem)) return ReconcilingTypes.update;
    return ReconcilingTypes.skip;
};
const reconcileElement = (elem, $elem, $parent)=>{
    switch(getReconcilingType(elem, $elem)){
        case ReconcilingTypes.render:
            return renderElement(elem, $parent);
        case ReconcilingTypes.replace:
            return [
                replaceElement(renderElement(elem, $parent), $elem),
                unrenderElement($elem)
            ];
        case ReconcilingTypes.update:
            return updateElement(elem, $elem);
        case ReconcilingTypes.unrender:
            return unrenderElement($elem);
        default:
            return [];
    }
};
const equalKeyElements = (elem, $elem)=>getJsxKey(elem) === getJsxKey(getJsxElement($elem));
const findKeyElements = (elem, $elems)=>$elems.find(($elem)=>equalKeyElements(elem, $elem));
const moveKeyElement = ($source, $target, $parent)=>$target === $source && $source || $source && $target && insertHtmlNode($target, $source) || $source && insertHtmlText("", $source, $parent);
const orderKeyElements = (elems, $elems, $parent)=>{
    elems.forEach((elem, index)=>moveKeyElement(getHtmlChildNode($parent, index), findKeyElements(elem, $elems), $parent));
    return getHtmlChildNodes($parent);
};
const orderHtmlChildren = ($elem, children)=>existsElement(children[0]) && isJsxKeyElement(children[0]) ? orderKeyElements(children, getHtmlChildNodes($elem), $elem) : getHtmlChildNodes($elem);
const updateElementChildren = ($elem)=>{
    const children = resolveJsxChildren(getJsxElement($elem), $elem);
    const $children = orderHtmlChildren($elem, children);
    return getMaxLengthElements(children, $children).flatMap((_, index)=>reconcileElement(children[index], $children[index], $elem));
};
const unrenderElementChildren = ($elem)=>getHtmlChildNodes($elem).map(unrenderElement);
const updateElementTree = ($elem, elem = getJsxElement($elem))=>{
    const $elems = [
        updateElement(elem, $elem)
    ];
    for (const $elem of $elems){
        if (isStyleIgnoredOrTextElement($elem)) continue;
        if (isRenderedElement($elem)) {
            $elems.push(...renderElementChildren($elem));
            continue;
        }
        if (isUpdatedElement($elem)) {
            $elems.push(...updateElementChildren($elem));
            continue;
        }
        if (isUnrenderedElement($elem)) {
            $elems.push(...unrenderElementChildren($elem));
            continue;
        }
    }
    $elems.forEach(($elem)=>runEffects(getEffects($elem)));
    return $elems;
};
const unrenderElementTree = ($elem)=>{
    const $elems = [
        unrenderElement($elem)
    ];
    for (const $elem of $elems)isStyleIgnoredOrTextElement($elem) || $elems.push(...unrenderElementChildren($elem));
    return $elems;
};
const render = (elem, $parent = parseHtml("<main></main>"))=>{
    $parent.ownerDocument.__render = $parent.ownerDocument.__render || renderElementTree;
    $parent.ownerDocument.__update = $parent.ownerDocument.__update || updateElementTree;
    $parent.ownerDocument.__unrender = $parent.ownerDocument.__unrender || unrenderElementTree;
    return renderElementTree(elem, $parent)[0];
};
export { updateElementTree as update };
export { unrenderElementTree as unrender };
export { render as render };
const updateConsumerContext = (name, value, elem)=>{
    const contexts = getContexts(elem);
    const context = getContext(contexts, name);
    if (equalValues(context.value, value)) return;
    setContextValue(context, value);
    return updateElementTree(elem);
};
const updateProducerContext = (name, value, elem)=>{
    const contexts = getContexts(elem);
    const context = getContext(contexts, name);
    return setContextValue(context, value);
};
const updateContexts = (name, value, elem)=>{
    const producer = findProducer(elem, name);
    updateProducerContext(name, value, producer);
    return findConsumer(producer, name).map((consumer)=>updateConsumerContext(name, value, consumer));
};
const useContext = (contexts, name, initialValue, elem)=>{
    if (!existsContext(contexts, name)) {
        const contextValue = getProducerContextValue(name, initialValue, elem);
        const context = createContext(name, contextValue);
        setContext(contexts, context);
    }
    return [
        getContextValue(contexts, name),
        (value)=>updateContexts(name, value, elem)
    ];
};
const Context = ({ name, value, children }, elem)=>{
    const [, setContext] = useContext(setContexts(elem), name, value, elem);
    useEffect(setEffects(elem), "setcontext", ()=>setContext(value, elem), [
        value
    ]);
    return children;
};
const isErrorBoundaryElement = (elem, boundary)=>elem === boundary;
const getErrorPath = (source, boundary)=>findHtmlAscendants(source, (elem)=>isErrorBoundaryElement(elem, boundary));
const getEventDetailError = (event)=>event.detail?.error;
const toStringErrorPath = (elems)=>elems.map(getHtmlName).reverse().join("/");
const ErrorBoundary = ({ path, error, children }, elem)=>{
    setHtmlEventHandler(elem, "onerror", (event)=>{
        event.stopPropagation();
        return updateErrorBoundary(elem, event);
    });
    return error ? React.createElement("error", null, React.createElement("span", {
        class: "path"
    }, `Path: ${path}`), React.createElement("pre", {
        class: "error"
    }, `Error: ${error}`)) : children;
};
const updateErrorBoundary = (elem, event)=>{
    const error = getEventDetailError(event);
    const path = getErrorPath(event.target, elem);
    return updateElementTree(elem, React.createElement(ErrorBoundary, {
        error: error?.message,
        path: toStringErrorPath(path)
    }));
};
const setService = (services, name, value)=>services[name] = value;
const setServices = (elem)=>elem.ownerDocument.__services = elem.ownerDocument.__services || {};
const Service = (props, elem)=>{
    const services = setServices(elem);
    setService(services, props.name, props.value);
    return props.children;
};
const setElementPropsHidden = (elem, value)=>(elem.props.hidden = value, elem);
const setElementsPropsHiodden = (elems, value)=>elems.map((elem)=>setElementPropsHidden(elem, value));
const Suspense = ({ suspending = true, fallback, children })=>{
    setElementPropsHidden(fallback, !suspending);
    setElementsPropsHiodden(children, suspending);
    return React.createElement(React.Fragment, null, fallback, ...children);
};
const getService = (services, name)=>services?.[name];
const getServices = (elem)=>elem.ownerDocument.__services;
const getJsxParent = (internals)=>internals?.ReactCurrentOwner?.current;
const getJsxInternals = (store)=>store?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const setJsxPropValue = (props, propName, propValue)=>props[propName] = propValue;
const copyJsxProp = (sourceProps)=>(targetProps, propName)=>{
        setJsxPropValue(targetProps, propName, sourceProps[propName]);
        return targetProps;
    };
const copyDefaultJsxProps = (sourceProps, targetProps)=>getJsxPropNames(sourceProps).filter((propName)=>!existsJsxPropValue(targetProps, propName)).reduce(copyJsxProp(sourceProps), targetProps);
const copyValidJsxProps = (sourceProps, targetProps = {})=>getJsxPropNames(sourceProps).filter((propName)=>!isReservedJsxPropName(propName)).reduce(copyJsxProp(sourceProps), targetProps);
const resolveJsxPropsKey = (props, maybeKey)=>existsJsxPropsKey(props) && getJsxPropsKey(props).toString() || existsJsxKey(maybeKey) && maybeKey.toString() || null;
const resolveJsxPropsRef = (props)=>existsJsxPropsRef(props) && getJsxPropsRef(props) || null;
const resolveJsxProps = (initialProps, type)=>type && type.defaultProps ? copyDefaultJsxProps(type.defaultProps, copyValidJsxProps(initialProps)) : copyValidJsxProps(initialProps);
const getJsxLegacyChildren = (children)=>children?.length == 1 ? children[0] : children;
const emptyLegacyJsxChildren = (children)=>!children || children.length === 0;
const compileJsxExpression = (type, props, maybeKey)=>createJsxElement(type, resolveJsxProps(props, type), resolveJsxPropsKey(props, maybeKey), getJsxParent(getJsxInternals(globalThis["React"])), resolveJsxPropsRef(props));
const compileLegacyJsxExpression = (type, props, ...children)=>emptyLegacyJsxChildren(children) ? compileJsxExpression(type, props ?? {}) : compileJsxExpression(type, {
        ...props ?? {},
        children: getJsxLegacyChildren(children)
    });
const jsx = compileJsxExpression;
const jsxs = compileJsxExpression;
const createElement = compileLegacyJsxExpression;
export { jsx as jsx };
export { jsxs as jsxs };
export { createElement as createElement };
export { FragmentType as Fragment };
export { dispatchEvent as dispatchEvent };
export { setHtmlEventHandler as setHtmlEventHandler };
try {
    globalThis["DOMParser"] || await registerDOMParser();
    globalThis["React"] = globalThis["React"] ?? {};
    globalThis["React"].createElement = createElement;
    globalThis["React"].Fragment = FragmentType;
} catch (error) {
    console.error(error);
    throw error;
}
export { Context as Context };
const Lazy = (props, elem)=>{
    throwError(validateHtmlElement(elem));
    throwError(validateLazyLoader(props.loader));
    const [factory, setFactory] = useState(setStates(elem), "factory", undefined, []);
    useEffect(setEffects(elem), "load", async ()=>{
        const factory = await props.loader();
        setFactory(factory);
        render(createJsxElement(factory, props), elem);
    }, []);
    if (factory) return createJsxElement(factory, props);
    return React.createElement(React.Fragment, null);
};
export { setEffects as setEffects, useEffect as useEffect, setInitialEffect as setInitialEffect };
export { setStates as setStates, useMemo as useMemo, useState as useState };
export { ErrorBoundary as ErrorBoundary };
export { Lazy as Lazy };
export { Service as Service };
export { Suspense as Suspense };
export { getContexts as getContexts };
export { setContexts as setContexts };
export { useContext as useContext };
export { getServices as getServices };
export { setServices as setServices };
export { getService as useService };
