import { isArray, isObject, isPlainObject } from './testing.js';

/**
 * Object methods
 */

/**
 * Merge the values from one or more objects onto an object (recursively).
 * @param {object} object The input object.
 * @param {...object} objects The objects to merge.
 * @return {object} The output objects.
 */
export const extend = (object, ...objects) =>
    objects.reduce(
        (acc, val) => {
            for (const k in val) {
                if (isArray(val[k])) {
                    acc[k] = extend(
                        isArray(acc[k]) ?
                            acc[k] :
                            [],
                        val[k],
                    );
                } else if (isPlainObject(val[k])) {
                    acc[k] = extend(
                        isPlainObject(acc[k]) ?
                            acc[k] :
                            {},
                        val[k],
                    );
                } else {
                    acc[k] = val[k];
                }
            }
            return acc;
        },
        object,
    );

/**
 * Remove a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to remove from the object.
 */
export const forgetDot = (object, key) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !(key in object)
        ) {
            break;
        }

        if (keys.length) {
            object = object[key];
        } else {
            delete object[key];
        }
    }
};

/**
 * Retrieve the value of a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to retrieve from the object.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @return {*} The value retrieved from the object.
 */
export const getDot = (object, key, defaultValue) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !(key in object)
        ) {
            return defaultValue;
        }

        object = object[key];
    }

    return object;
};

/**
 * Returns true if a specified key exists in an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to test for in the object.
 * @return {Boolean} TRUE if the key exists, otherwise FALSE.
 */
export const hasDot = (object, key) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !(key in object)
        ) {
            return false;
        }

        object = object[key];
    }

    return true;
};

/**
 * Retrieve values of a specified key from an array of objects using dot notation.
 * @param {object[]} objects The input objects.
 * @param {string} key The key to retrieve from the objects.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @return {array} An array of values retrieved from the objects.
 */
export const pluckDot = (objects, key, defaultValue) =>
    objects
        .map((pointer) =>
            getDot(pointer, key, defaultValue),
        );

/**
 * Set a specified value of a key for an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to set in the object.
 * @param {*} value The value to set.
 * @param {object} [options] The options for setting the value.
 * @param {Boolean} [options.overwrite=true] Whether to overwrite, if the key already exists.
 */
export const setDot = (object, key, value, { overwrite = true } = {}) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (key === '*') {
            for (const k in object) {
                if (!{}.hasOwnProperty.call(object, k)) {
                    continue;
                }

                setDot(
                    object,
                    [k].concat(keys).join('.'),
                    value,
                    overwrite,
                );
            }
            return;
        }

        if (keys.length) {
            if (
                !isObject(object[key]) ||
                !(key in object)
            ) {
                object[key] = {};
            }

            object = object[key];
        } else if (
            overwrite ||
            !(key in object)
        ) {
            object[key] = value;
        }
    }
};
