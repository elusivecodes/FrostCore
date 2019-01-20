Object.assign(Core, {

    // returns an array from an array, node list, element list, query list or arbitrary value
    makeArray(value)
    {
        if (!value) {
            return [];
        }

        if (this.isArray(value)) {
            return value;
        }

        if (this.isNodeList(value) || this.isElementList(value)) {
            return Array.from(value);
        }

        if (this.isQuerySet(value)) {
            return value.get();
        }

        return [value];
    },

    // returns a function for filtering nodes (by element, document or window)
    _nodeFilterFactory(elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return node =>
            (!elementsOnly && this.isNode(node)) ||
            (elementsOnly && this.isElement(node)) ||
            (allowDocument && this.isDocument(node)) ||
            (allowWindow && this.isWindow(node));
    }

});