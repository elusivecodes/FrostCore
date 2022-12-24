/**
 * Testing methods
 */

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;

/**
 * Returns true if the value is an array.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
 */
export const isArray = Array.isArray;

/**
 * Returns true if the value is array-like.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is array-like, otherwise FALSE.
 */
export const isArrayLike = (value) =>
    isArray(value) ||
    (
        isObject(value) &&
        !isFunction(value) &&
        !isWindow(value) &&
        !isElement(value) &&
        (
            (
                Symbol.iterator in value &&
                isFunction(value[Symbol.iterator])
            ) ||
            (
                'length' in value &&
                isNumeric(value.length) &&
                (
                    !value.length ||
                    value.length - 1 in value
                )
            )
        )
    );

/**
 * Returns true if the value is a Boolean.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is boolean, otherwise FALSE.
 */
export const isBoolean = (value) =>
    value === !!value;

/**
 * Returns true if the value is a Document.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a Document, otherwise FALSE.
 */
export const isDocument = (value) =>
    !!value &&
    value.nodeType === DOCUMENT_NODE;

/**
 * Returns true if the value is a HTMLElement.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
 */
export const isElement = (value) =>
    !!value &&
    value.nodeType === ELEMENT_NODE;

/**
 * Returns true if the value is a DocumentFragment.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
 */
export const isFragment = (value) =>
    !!value &&
    value.nodeType === DOCUMENT_FRAGMENT_NODE &&
    !value.host;

/**
 * Returns true if the value is a function.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a function, otherwise FALSE.
 */
export const isFunction = (value) =>
    typeof value === 'function';

/**
 * Returns true if the value is NaN.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
 */
export const isNaN = Number.isNaN;

/**
 * Returns true if the value is a Node.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a Node, otherwise FALSE.
 */
export const isNode = (value) =>
    !!value &&
    (
        value.nodeType === ELEMENT_NODE ||
        value.nodeType === TEXT_NODE ||
        value.nodeType === COMMENT_NODE
    );

/**
 * Returns true if the value is null.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is null, otherwise FALSE.
 */
export const isNull = (value) =>
    value === null;

/**
 * Returns true if the value is numeric.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is numeric, otherwise FALSE.
 */
export const isNumeric = (value) =>
    !isNaN(parseFloat(value)) &&
    isFinite(value);

/**
 * Returns true if the value is an object.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is an object, otherwise FALSE.
 */
export const isObject = (value) =>
    !!value &&
    value === Object(value);

/**
 * Returns true if the value is a plain object.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a plain object, otherwise FALSE.
 */
export const isPlainObject = (value) =>
    !!value &&
    value.constructor === Object;

/**
 * Returns true if the value is a ShadowRoot.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
 */
export const isShadow = (value) =>
    !!value &&
    value.nodeType === DOCUMENT_FRAGMENT_NODE &&
    !!value.host;

/**
 * Returns true if the value is a string.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE is the value is a string, otherwise FALSE.
 */
export const isString = (value) =>
    value === `${value}`;

/**
 * Returns true if the value is a text Node.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is a text Node, otherwise FALSE.
 */
export const isText = (value) =>
    !!value &&
    value.nodeType === TEXT_NODE;

/**
 * Returns true if the value is undefined.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE if the value is undefined, otherwise FALSE.
 */
export const isUndefined = (value) =>
    value === undefined;

/**
 * Returns true if the value is a Window.
 * @param {*} value The value to test.
 * @return {Boolean} TRUE is the value is a Window, otherwise FALSE.
 */
export const isWindow = (value) =>
    !!value &&
    !!value.document &&
    value.document.defaultView === value;
