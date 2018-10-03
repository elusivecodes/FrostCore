Object.assign(Core, {

    // create a single-dimensional Array from a multiple-dimensional Array
    flattenArray(array)
    {
        return array.reduce((acc, val) =>
            Array.isArray(val) ?
                acc.concat(...this.flattenArray(val)) :
                acc.concat(val)
            , []);
    },

    // remove duplicate elements in an array
    uniqueArray(array)
    {
        return [...new Set(array)];
    }

});