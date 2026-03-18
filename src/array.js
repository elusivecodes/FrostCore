import { randomInt, toStep } from './math.js';
import { isArray, isArrayLike, isUndefined } from './testing.js';

/**
 * Array methods
 */

/**
 * Creates a new array containing values from the first array that do not exist in any of the additional arrays.
 * @template T
 * @param {T[]} array The input array.
 * @param {...T[]} arrays The arrays to compare against.
 * @returns {T[]} The filtered array.
 */
export const diff = (array, ...arrays) => {
    arrays = arrays.map(unique);
    return array.filter(
        (value) => !arrays
            .some((other) => other.includes(value)),
    );
};

/**
 * Creates a new array containing the unique values that exist in all of the provided arrays.
 * @template T
 * @param {...T[]} arrays The input arrays.
 * @returns {T[]} The intersected array.
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
 * Merges values from one or more arrays or array-like objects into an array.
 * @template T
 * @param {T[]} [array=[]] The array to merge into.
 * @param {...ArrayLike<T>} arrays The arrays or array-like objects to merge.
 * @returns {T[]} The merged array.
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
 * Selects a random value from an array.
 * @template T
 * @param {T[]} array The input array.
 * @returns {T|null} A random value from the array, or null if the array is empty.
 */
export const randomValue = (array) =>
    array.length ?
        array[randomInt(array.length)] :
        null;

/**
 * Creates an array containing a range of values.
 * @param {number} start The first value of the sequence.
 * @param {number} end The target value for the sequence. It is included only when the step lands on it exactly.
 * @param {number} [step=1] The increment between values in the sequence. Negative values are treated as positive, and `0` returns an empty array.
 * @returns {number[]} The array of values from start toward end.
 */
export const range = (start, end, step = 1) => {
    if (step === 0) {
        return [];
    }

    const sign = Math.sign(end - start);
    step = Math.abs(step);
    return new Array(
        Math.floor(
            (
                Math.abs(end - start) /
                step
            ) +
            1,
        ),
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
 * Removes duplicate elements from an array.
 * @template T
 * @param {T[]} array The input array.
 * @returns {T[]} The de-duplicated array.
 */
export const unique = (array) =>
    Array.from(
        new Set(array),
    );

/**
 * Creates an array from a value.
 * @template T
 * @param {T|T[]|ArrayLike<T>|undefined} value The input value.
 * @returns {T[]} The wrapped array.
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
