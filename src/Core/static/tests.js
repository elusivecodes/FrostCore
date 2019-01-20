Object.assign(Core, {

    // returns true if the value is an Array
    isArray(value) {
        return Array.isArray(value);
    },

    // returns true if the value if a Body Element
    isBody(value) {
        return value instanceof HTMLBodyElement;
    },

    // returns true if the value is a Boolean
    isBoolean(value) {
        return value === !!value;
    },

    // returns true if the value if a Document
    isDocument(value) {
        return value instanceof Document;
    },

    // returns true if the value is a HTML Element
    isElement(value) {
        return value instanceof HTMLElement;
    },

    // returns true if the value is a HTML Collection
    isElementList(value) {
        return value instanceof HTMLCollection;
    },

    // returns true if the value is a Function
    isFunction(value) {
        return typeof value === 'function';
    },

    // returns true if the value is a Node
    isNode(value) {
        return value instanceof Node;
    },

    // returns true if the value is a Node List
    isNodeList(value) {
        return value instanceof NodeList;
    },

    // returns true if the value is numeric
    isNumeric(value) {
        return !isNaN(parseFloat(value)) &&
            isFinite(value);
    },

    // returns true if the value is a plain Object
    isPlainObject(value) {
        return this.isObject(value) && value.constructor === Object;
    },

    // returns true if the value is an Object
    isObject(value) {
        return value instanceof Object;
    },

    // returns true if the value is a Query Set
    isQuerySet(value) {
        return value instanceof QuerySet;
    },

    // returns true if any of the selectors is "complex"
    isSelectorComplex(selectors) {
        return !!this._parseSelectors(selectors)
            .find(selector =>
                ['>', '+', '~'].includes(selector[0])
            );
    },

    // returns true if the value is a String
    isString(value) {
        return value === '' + value;
    },

    // returns true if the value is a Window
    isWindow(value) {
        return value instanceof Window;
    }

});