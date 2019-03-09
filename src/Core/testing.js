Object.assign(Core, {

    /**
     * Returns true if the value is a Array-like.
     * @param {*} value 
     * @returns {Boolean}
     */
    isArrayLike(value) {
        return Array.isArray(value) ||
            (
                this.isObject(value) &&
                (
                    this.isFunction(value[Symbol.iterator]) ||
                    (
                        this.isNumeric(value.length) &&
                        !value.length ||
                        value[value.length - 1]
                    )
                )
            );
    },

    /**
     * Returns true if the value is a Boolean.
     * @param {*} value 
     * @returns {Boolean}
     */
    isBoolean(value) {
        return value === !!value;
    },

    /**
     * Returns true if the value is a function.
     * @param {*} value 
     * @returns {Boolean}
     */
    isFunction(value) {
        return typeof value === 'function';
    },

    /**
     * Returns true if the value is numeric.
     * @param {*} value 
     * @returns {Boolean}
     */
    isNumeric(value) {
        return !isNaN(parseFloat(value)) &&
            isFinite(value);
    },

    /**
     * Returns true if the value is a plain Object.
     * @param {*} value 
     * @returns {Boolean}
     */
    isPlainObject(value) {
        return this.isObject(value) &&
            value.constructor === Object;
    },

    /**
     * Returns true if the value is an Object.
     * @param {*} value 
     * @returns {Boolean}
     */
    isObject(value) {
        return value === Object(value);
    },

    /**
     * Returns true if the value is a string.
     * @param {*} value 
     * @returns {Boolean}
     */
    isString(value) {
        return value === `${value}`;
    }

});
