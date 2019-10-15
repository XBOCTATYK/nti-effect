export function isFunction(value) {
    return value && {}.toString.call(value) === '[object Function]';
}

export const valueOrFunction = (valueOrFunction) => {
    if (isFunction(valueOrFunction)) {
        return valueOrFunction();
    } else {
        return valueOrFunction;
    }
};
