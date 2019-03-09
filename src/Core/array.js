Object.assign(Core, {

    /**
     * Create a single-dimensional Array from a multiple-dimensional Array.
     * @param {Array} array 
     * @returns {Array}
     */
    flattenArray(array) {
        return array.reduce(
            (acc, val) =>
                Array.isArray(val) ?
                    acc.concat(
                        ...this.flattenArray(val)
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
    uniqueArray(array) {
        return [...new Set(array)];
    }

});
