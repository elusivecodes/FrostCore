Object.assign(Core, {

    /**
     * Remove a specified key from an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     */
    forgetDot(object, key) {
        let pointer = object;

        const keys = key.split('.');
        while (key = keys.shift()) {
            if (!pointer.hasOwnProperty(key)) {
                break;
            }

            if (keys.length) {
                pointer = pointer[key];
            } else {
                delete pointer[key];
            }
        }
    },

    /**
     * Retrieve the value of a specified key from an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {*}
     */
    getDot(object, key, defaultValue) {
        let value = object;

        key.split('.').forEach(key => {
            if (!value.hasOwnProperty(key)) {
                value = defaultValue;
                return false;
            }

            value = value[key];
        });

        return value;
    },

    /**
     * Returns true if a specified key exists in an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     * @returns {Boolean}
     */
    hasDot(object, key) {
        let result = true,
            pointer = object;

        key.split('.').forEach(key => {
            if (!pointer.hasOwnProperty(key)) {
                result = false;
                return false;
            }

            pointer = pointer[key];
        });

        return result;
    },

    /**
     * Retrieve values of a specified key from an Array of Objects using dot notation.
     * @param {Object[]} objects
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {Array}
     */
    pluckDot(objects, key, defaultValue) {
        return objects
            .slice()
            .map(pointer => this.getDot(pointer, key, defaultValue));
    },

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {Array} object
     * @param {string} key
     * @param {*} value
     * @param {Boolean} [overwrite=true]
     */
    setDot(object, key, value, overwrite = true) {
        let pointer = object,
            current;

        const keys = key.split('.');
        while (current = keys.shift()) {
            if (current === '*') {
                Object.keys(pointer).forEach(k =>
                    this.setDot(
                        pointer,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite
                    )
                );
                return;
            }

            if (keys.length) {
                if (!this.isObject(pointer[current]) || !pointer.hasOwnProperty(current)) {
                    pointer[current] = {};
                }

                pointer = pointer[current];
            } else if (overwrite || !pointer.hasOwnProperty(current)) {
                pointer[current] = value;
            }
        }
    }

});
