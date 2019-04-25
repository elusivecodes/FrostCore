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
    Array.isArray(value) ||
    (
        !Core.isFunction(value) &&
        !Core.isWindow(value) &&
        Core.isObject(value) &&
        (
            (
                value[Symbol.iterator] &&
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
Core.isDocument = node =>
    Core.isObject(node) &&
    'nodeType' in node &&
    node.nodeType === Node.DOCUMENT_NODE;

/**
 * Returns true if the value is a HTMLElement.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
 */
Core.isElement = node =>
    Core.isObject(node) &&
    'nodeType' in node &&
    node.nodeType === Node.ELEMENT_NODE;

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
Core.isNode = node =>
    Core.isObject(node) &&
    'nodeType' in node &&
    (
        node.nodeType === Node.ELEMENT_NODE ||
        node.nodeType === Node.TEXT_NODE ||
        node.nodeType === Node.COMMENT_NODE
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
    Core.isObject(value) &&
    value.constructor === Object;

/**
 * Returns true if the value is an object.
 * @param {*} value The value to test.
 * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
 */
Core.isObject = value => value === Object(value);

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
    Core.isObject(value) &&
    Core.isObject(value.document) &&
    value.document.defaultView === value;
