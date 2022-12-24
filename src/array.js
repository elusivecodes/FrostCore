import { randomInt, toStep } from './math.js';
import { isArray, isArrayLike, isUndefined } from './testing.js';

/**
 * Array methods
 */

/**
 * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
 * @param {array} array The input array.
 * @param {...array} arrays The arrays to compare against.
 * @return {array} The output array.
 */
export const diff = (array, ...arrays) => {
    arrays = arrays.map(unique);
    return array.filter(
        (value) => !arrays
            .some((other) => other.includes(value)),
    );
};

/**
 * Create a new array containing the unique values that exist in all of the passed arrays.
 * @param {...array} arrays The input arrays.
 * @return {array} The output array.
 */
export const intersect = (...arrays) =>
    unique(
        arrays
            .reduce(
                (acc, array, index) => {
                    array = unique(array);
                    return merge(
                        acc,
                        array.filter(
                            (value) =>
                                arrays.every(
                                    (other, otherIndex) =>
                                        index == otherIndex ||
                                        other.includes(value),
                                ),
                        ),
                    );
                },
                [],
            ),
    );

/**
 * Merge the values from one or more arrays or array-like objects onto an array.
 * @param {array} array The input array.
 * @param {...array|object} arrays The arrays or array-like objects to merge.
 * @return {array} The output array.
 */
export const merge = (array = [], ...arrays) =>
    arrays.reduce(
        (acc, other) => {
            Array.prototype.push.apply(acc, other);
            return array;
        },
        array,
    );

/**
 * Return a random value from an array.
 * @param {array} array The input array.
 * @return {*} A random value from the array, or null if it is empty.
 */
export const randomValue = (array) =>
    array.length ?
        array[randomInt(array.length)] :
        null;

/**
 * Return an array containing a range of values.
 * @param {number} start The first value of the sequence.
 * @param {number} end The value to end the sequence on.
 * @param {number} [step=1] The increment between values in the sequence.
 * @return {number[]} The array of values from start to end.
 */
export const range = (start, end, step = 1) => {
    const sign = Math.sign(end - start);
    return new Array(
        (
            (
                Math.abs(end - start) /
                step
            ) +
            1
        ) | 0,
    )
        .fill()
        .map(
            (_, i) =>
                start + toStep(
                    (i * step * sign),
                    step,
                ),
        );
};

/**
 * Remove duplicate elements in an array.
 * @param {array} array The input array.
 * @return {array} The filtered array.
 */
export const unique = (array) =>
    Array.from(
        new Set(array),
    );

/**
 * Create an array from any value.
 * @param {*} value The input value.
 * @return {array} The wrapped array.
 */
export const wrap = (value) =>
    isUndefined(value) ?
        [] :
        (
            isArray(value) ?
                value :
                (
                    isArrayLike(value) ?
                        merge([], value) :
                        [value]
                )
        );
