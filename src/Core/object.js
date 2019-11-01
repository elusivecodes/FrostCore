/**
 * Object methods
 */

/**
 * Merge the values from one or more objects onto an object (recursively).
 * @param {object} object The input object.
 * @param {...object} objects The objects to merge.
 * @returns {object} The output objects.
 */
Core.extend = (object, ...objects) =>
    objects.reduce(
        (acc, val) => {
            for (const k in val) {
                if (
                    k in acc &&
                    Core.isObject(acc[k]) &&
                    Core.isObject(val[k])
                ) {
                    Core.extend(acc[k], val[k]);
                } else {
                    acc[k] = val[k];
                }
            }
            return acc;
        },
        object
    );

/**
 * Remove a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to remove from the object.
 */
Core.forgetDot = (object, key) => {
    const keys = key.split('.');
    while (key = keys.shift()) {
        if (!Core.isObject(object) || !(key in object)) {
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
 * @returns {*} The value retrieved from the object.
 */
Core.getDot = (object, key, defaultValue) => {
    for (key of key.split('.')) {
        if (!Core.isObject(object) || !(key in object)) {
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
 * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
 */
Core.hasDot = (object, key) => {
    for (key of key.split('.')) {
        if (!Core.isObject(object) || !(key in object)) {
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
 * @returns {array} An array of values retrieved from the objects.
 */
Core.pluckDot = (objects, key, defaultValue) =>
    objects
        .map(pointer =>
            Core.getDot(pointer, key, defaultValue)
        );

/**
 * Set a specified value of a key for an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to set in the object.
 * @param {*} value The value to set.
 * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
 */
Core.setDot = (object, key, value, overwrite = true) => {
    let current;
    const keys = key.split('.');
    while (current = keys.shift()) {
        if (current === '*') {
            for (const k in object) {
                Core.setDot(
                    object,
                    [k].concat(keys).join('.'),
                    value,
                    overwrite
                );
            }
            return;
        }

        if (keys.length) {
            if (!Core.isObject(object[current]) || !(current in object)) {
                object[current] = {};
            }

            object = object[current];
        } else if (overwrite || !(current in object)) {
            object[current] = value;
        }
    }
};
