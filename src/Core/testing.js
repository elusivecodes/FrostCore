/**
 * Testing methods
 */

/**
 * Returns true if the value is an array.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
 */
Core.isArray = Array.isArray;

/**
 * Returns true if the value is array-like.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
 */
Core.isArrayLike = value =>
    Core.isArray(value) ||
    (
        Core.isObject(value) &&
        !Core.isFunction(value) &&
        !Core.isWindow(value) &&
        !Core.isElement(value) &&
        (
            (
                Symbol.iterator in value &&
                Core.isFunction(value[Symbol.iterator])
            ) ||
            (
                'length' in value &&
                Core.isNumeric(value.length) &&
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
 * @returns {Boolean} TRUE if the value is boolean, otherwise FALSE.
 */
Core.isBoolean = value => value === !!value;

/**
 * Returns true if the value is a Document.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
 */
Core.isDocument = value =>
    !!value &&
    value.nodeType === Core.DOCUMENT_NODE;

/**
 * Returns true if the value is a HTMLElement.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
 */
Core.isElement = value =>
    !!value &&
    value.nodeType === Core.ELEMENT_NODE;

/**
 * Returns true if the value is a DocumentFragment.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
 */
Core.isFragment = value =>
    !!value &&
    value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
    !value.host;

/**
 * Returns true if the value is a function.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
 */
Core.isFunction = value => typeof value === 'function';

/**
 * Returns true if the value is NaN.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
 */
Core.isNaN = Number.isNaN;

/**
 * Returns true if the value is a Node.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
 */
Core.isNode = value =>
    !!value &&
    (
        value.nodeType === Core.ELEMENT_NODE ||
        value.nodeType === Core.TEXT_NODE ||
        value.nodeType === Core.COMMENT_NODE
    );

/**
 * Returns true if the value is null.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
 */
Core.isNull = value => value === null;

/**
 * Returns true if the value is numeric.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
 */
Core.isNumeric = value =>
    !isNaN(parseFloat(value)) &&
    isFinite(value);

/**
 * Returns true if the value is a plain object.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
 */
Core.isPlainObject = value =>
    !!value &&
    value.constructor === Object;

/**
 * Returns true if the value is an object.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
 */
Core.isObject = value =>
    !!value &&
    value === Object(value);

/**
 * Returns true if the value is a ShadowRoot.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
 */
Core.isShadow = value =>
    !!value &&
    value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
    !!value.host;

/**
 * Returns true if the value is a string.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
 */
Core.isString = value => value === `${value}`;

/**
 * Returns true if the value is undefined.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
 */
Core.isUndefined = value => value === undefined;

/**
 * Returns true if the value is a Window.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
 */
Core.isWindow = value =>
    !!value &&
    !!value.document &&
    value.document.defaultView === value;
