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
        !Core.isFunction(value) &&
        !Core.isWindow(value) &&
        !Core.isElement(value) &&
        Core.isObject(value) &&
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
    Core.isObject(value) &&
    value.nodeType === Node.DOCUMENT_NODE;

/**
 * Returns true if the value is a HTMLElement.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
 */
Core.isElement = value =>
    !!value &&
    value.nodeType === Node.ELEMENT_NODE;

/**
 * Returns true if the value is a function.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
 */
Core.isFunction = value => typeof value === 'function';

/**
 * Returns true if the value is a Node.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
 */
Core.isNode = value =>
    !!value &&
    (
        value.nodeType === Node.ELEMENT_NODE ||
        value.nodeType === Node.TEXT_NODE ||
        value.nodeType === Node.COMMENT_NODE
    );

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
Core.isObject = value => value === Object(value);

/**
 * Returns true if the value is a ShadowRoot.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
 */
Core.isShadowRoot = value =>
    !!value &&
    value.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
    value.host;

/**
 * Returns true if the value is a string.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
 */
Core.isString = value => value === `${value}`;

/**
 * Returns true if the value is a Window.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
 */
Core.isWindow = value =>
    !!value &&
    !!value.document &&
    value.document.defaultView === value;
