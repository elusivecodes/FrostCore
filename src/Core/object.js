/**
 * Object methods
 */

/**
 * Remove a specified key from an object using dot notation.
 * @param {Object} object The input object.
 * @param {string} key The key to remove from the object.
 */
Core.forgetDot = (object, key) => {
    let pointer = object;

    const keys = key.split('.');
    while (key = keys.shift()) {
        if (!this.isObject(pointer) || !(key in pointer)) {
            break;
        }

        if (keys.length) {
            pointer = pointer[key];
        } else {
            delete pointer[key];
        }
    }
};

/**
 * Retrieve the value of a specified key from an object using dot notation.
 * @param {Object} object The input object.
 * @param {string} key The key to retrieve from the object.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {*} The value retrieved from the object.
 */
Core.getDot = (object, key, defaultValue) => {
    let pointer = object;

    for (key of key.split('.')) {
        if (!this.isObject(pointer) || !(key in pointer)) {
            return defaultValue;
        }

        pointer = pointer[key];
    }

    return pointer;
};

/**
 * Returns true if a specified key exists in an object using dot notation.
 * @param {Object} object The input object.
 * @param {string} key The key to test for in the object.
 * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
 */
Core.hasDot = (object, key) => {
    let pointer = object;

    for (key of key.split('.')) {
        if (!this.isObject(pointer) || !(key in pointer)) {
            return false;
        }

        pointer = pointer[key];
    }

    return true;
};

/**
 * Retrieve values of a specified key from an array of objects using dot notation.
 * @param {Object[]} objects The input objects.
 * @param {string} key The key to retrieve from the objects.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {Array} An array of values retrieved from the objects.
 */
Core.pluckDot = (objects, key, defaultValue) => objects
    .map(pointer => this.getDot(pointer, key, defaultValue));

/**
 * Set a specified value of a key for an object using dot notation.
 * @param {Array} object The input object.
 * @param {string} key The key to set in the object.
 * @param {*} value The value to set.
 * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
 */
Core.setDot = (object, key, value, overwrite = true) => {
    let pointer = object,
        current;

    const keys = key.split('.');
    while (current = keys.shift()) {
        if (current === '*') {
            for (const k of Object.keys(pointer)) {
                this.setDot(
                    pointer,
                    [k].concat(keys).join('.'),
                    value,
                    overwrite
                );
            }
            return;
        }

        if (keys.length) {
            if (!this.isObject(pointer[current]) || !(current in pointer)) {
                pointer[current] = {};
            }

            pointer = pointer[current];
        } else if (overwrite || !(current in pointer)) {
            pointer[current] = value;
        }
    }
};
