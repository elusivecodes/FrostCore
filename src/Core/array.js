/**
 * Array methods
 */

/**
 * Merge the values from one or more arrays or array-like objects onto an array.
 * @param {array} array The input array.
 * @param {...array|...object} arrays The arrays or array-like objects to merge.
 * @returns {array} The output array.
 */
Core.merge = (array = [], ...arrays) => {
    for (const arr of arrays) {
        Array.prototype.push.apply(array, arr);
    }

    return array;
};

/**
 * Return a random value from an array.
 * @param {array} array The input array.
 * @returns {*} A random value from the array, or null if it is empty.
 */
Core.randomValue = array =>
    array.length ?
        array[Core.random(array.length) | 0] :
        null;

/**
 * Remove duplicate elements in an array.
 * @param {array} array The input array.
 * @returns {array} The filtered array.
 */
Core.unique = array => Core.merge([], new Set(array));

/**
 * Create an array from any value.
 * @param {*} value The input value.
 * @returns {array} The wrapped array.
 */
Core.wrap = value => {
    if (Core.isArray(value)) {
        return value;
    }

    if (Core.isArrayLike(value)) {
        return Core.merge([], value);
    }

    return [value];
};
