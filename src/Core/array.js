/**
 * Array methods
 */

/**
 * Return a new array with the values from one or more arrays or array-like objects.
 * @param {...array|...object} arrays The input arrays or array-like objects.
 * @returns {*} A new array with the combined values.
 */
Core.merge = (...arrays) => {
    const result = [];

    for (const arr of arrays) {
        Array.prototype.push.apply(result, arr);
    }

    return result;
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
Core.unique = array => [...new Set(array)];

/**
 * Create an array from any value.
 * @param {*} value The input value.
 * @returns {array} The wrapped array.
 */
Core.wrap = value => {
    if (Array.isArray(value)) {
        return value.slice();
    }

    const results = [];

    if (Core.isArrayLike(value)) {
        Array.prototype.push.apply(results, value);
    } else {
        results.push(value);
    }

    return results;
};
