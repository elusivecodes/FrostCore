import { isArray, isObject, isPlainObject } from './testing.js';

/**
 * Object methods
 */

/**
 * Merges values from one or more objects into an object (recursively).
 * @param {object} object The input object.
 * @param {...object} objects The objects to merge.
 * @returns {object} The extended object.
 */
export const extend = (object, ...objects) =>
    objects.reduce(
        (acc, val) => {
            if (val == null) {
                return acc;
            }

            for (const k in val) {
                if (!{}.hasOwnProperty.call(val, k)) {
                    continue;
                }

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
 * Flattens an object using dot notation.
 * @param {object} object The input object.
 * @param {string} [prefix] The key prefix.
 * @returns {object} The flattened object.
 */
export const flatten = (object, prefix = '') =>
    Object.keys(object).reduce((acc, key) => {
        const prefixedKey = `${prefix}${key}`;
        if (isPlainObject(object[key])) {
            Object.assign(acc, flatten(object[key], `${prefixedKey}.`));
        } else {
            acc[prefixedKey] = object[key];
        }

        return acc;
    }, {});

/**
 * Removes a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to remove from the object.
 * @returns {void} Nothing.
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
 * Retrieves the value of a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to retrieve from the object.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {*} The value retrieved from the object.
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
 * Checks whether a specified key exists in an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to test for in the object.
 * @returns {boolean} Whether the key exists.
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
 * Retrieves values of a specified key from an array of objects using dot notation.
 * @param {object[]} objects The input objects.
 * @param {string} key The key to retrieve from the objects.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {Array<*>} An array of values retrieved from the objects.
 */
export const pluckDot = (objects, key, defaultValue) =>
    objects
        .map((pointer) =>
            getDot(pointer, key, defaultValue),
        );

/**
 * Sets a specified value of a key for an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to set in the object.
 * @param {*} value The value to set.
 * @param {{overwrite?: boolean}} [options] Options for setting the value.
 * @param {boolean} [options.overwrite=true] Whether to overwrite the value if the key already exists.
 * @returns {void} Nothing.
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
                    { overwrite },
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
