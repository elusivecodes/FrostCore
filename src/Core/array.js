Object.assign(Core, {

    /**
     * Create a single-dimensional Array from a multiple-dimensional Array.
     * @param {Array} array 
     * @returns {Array}
     */
    flatten(array) {
        return array.reduce(
            (acc, val) =>
                Array.isArray(val) ?
                    acc.concat(
                        ...this.flatten(val)
                    ) :
                    acc.concat(val),
            []
        );
    },

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
