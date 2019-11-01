/**
 * Array methods
 */

/**
 * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
 * @param {array} array The input array.
 * @param {...array} arrays The arrays to compare against.
 * @returns {array} The output array.
 */
Core.diff = (array, ...arrays) => {
    arrays = arrays.map(Core.unique);
    return array.filter(
        value => !arrays
            .some(other => other.includes(value))
    )
};

/**
 * Create a new array containing the unique values that exist in all of the passed arrays.
 * @param {...array} arrays The input arrays.
 * @returns {array} The output array.
 */
Core.intersect = (...arrays) =>
    Core.unique(
        arrays
            .reduce(
                (acc, array, index) => {
                    array = Core.unique(array);
                    return Core.merge(
                        acc,
                        array.filter(
                            value =>
                                arrays.every(
                                    (other, otherIndex) =>
                                        index == otherIndex ||
                                        other.includes(value)
                                )
                        )
                    )
                },
                []
            )
    );

/**
 * Merge the values from one or more arrays or array-like objects onto an array.
 * @param {array} array The input array.
 * @param {...array|...object} arrays The arrays or array-like objects to merge.
 * @returns {array} The output array.
 */
Core.merge = (array = [], ...arrays) =>
    arrays.reduce(
        (acc, other) => {
            Array.prototype.push.apply(acc, other);
            return array;
        },
        array
    );

/**
 * Return a random value from an array.
 * @param {array} array The input array.
 * @returns {*} A random value from the array, or null if it is empty.
 */
Core.randomValue = array =>
    array.length ?
        array[Core.randomInt(array.length)] :
        null;

/**
 * Return an array containing a range of values.
 * @param {number} start The first value of the sequence.
 * @param {number} end The value to end the sequence on.
 * @param {number} [step=1] The increment between values in the sequence.
 * @returns {number[]} The array of values from start to end.
 */
Core.range = (start, end, step = 1) => {
    const sign = Math.sign(end - start);
    return new Array(
        (
            (Math.abs(end - start) / step)
            + 1
        ) | 0
    )
        .fill()
        .map(
            (_, i) =>
                start + Core.toStep(
                    (i * step * sign),
                    step
                )
        );
};

/**
 * Remove duplicate elements in an array.
 * @param {array} array The input array.
 * @returns {array} The filtered array.
 */
Core.unique = array =>
    Array.from(
        new Set(array)
    );

/**
 * Create an array from any value.
 * @param {*} value The input value.
 * @returns {array} The wrapped array.
 */
Core.wrap = value =>
    Core.isUndefined(value) ?
        [] :
        (
            Core.isArray(value) ?
                value :
                (
                    Core.isArrayLike(value) ?
                        Core.merge([], value) :
                        [value]
                )
        );
