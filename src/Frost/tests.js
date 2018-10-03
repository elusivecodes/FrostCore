Object.assign(frost, {

    // returns true if the value is an Array
    isArray(value)
    {
        return Array.isArray(value);
    },

    // returns true if the value is a Boolean
    isBoolean(value)
    {
        return value === !!value;
    },

    // returns true if the value is a Function
    isFunction(value)
    {
        return typeof value === 'function';
    },

    // returns true if the value is numeric
    isNumeric(value)
    {
        return ! isNaN(parseFloat(value)) && isFinite(value);
    },

    // returns true if the value is an Object
    isObject(value)
    {
        return value instanceof Object;
    },

    // returns true if the value is a String
    isString(value)
    {
        return value === '' + value;
    },

    // returns true if the value is a Window
    isWindow(value)
    {
        return value instanceof Window;
    }

});