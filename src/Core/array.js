Object.assign(Core, {

    /**
     * Remove duplicate elements in an Array.
     * @param {Array} array 
     * @returns {Array}
     */
    unique(array) {
        return [...new Set(array)];
    },

    /**
     * Create an Array from any value.
     * @param {*} value
     * @returns {Array}
     */
    wrap(value) {
        if (Array.isArray(value)) {
            return [...value];
        }

        if (this.isArrayLike(value)) {
            return Array.from(value);
        }

        return [value];
    }

});
