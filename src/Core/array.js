/**
 * Array methods
 */

/**
 * Remove duplicate elements in an array.
 * @param {Array} array The input array.
 * @returns {Array} The filtered array.
 */
Core.unique = array => [...new Set(array)];

/**
 * Create an array from any value.
 * @param {*} value The input value.
 * @returns {Array} The wrapped array.
 */
Core.wrap = value =>
    Array.isArray(value) ?
        value :
        Core.isArrayLike(value) ?
            Array.from(value) :
            [value];
