Object.assign(Core, {

    // returns an array from an array, node list, element list, query list or arbitrary value
    makeArray(value)
    {
        if ( ! value) {
            return [];
        }

        if (Array.isArray(value)) {
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

    // returns an array of nodes or elements (and optionally document or window)
    nodeArray(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return this.makeArray(value)
            .filter(this.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },

    // returns a function for filtering nodes (by element, document or window)
    nodeFilterFactory(elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return node =>
            ( ! elementsOnly && this.isNode(node)) ||
            (elementsOnly && this.isElement(node)) ||
            (allowDocument && this.isDocument(node)) ||
            (allowWindow && Core.isWindow(node));
    },

    // get the first node or element (and optionally document or window)
    nodeFirst(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return this.makeArray(value)
            .find(this.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },

    // sorts nodes by their position in the document
    sortNodes(nodes)
    {
        return this.nodeArray(nodes, false)
            .sort((a, b) => {
                if (a.isSameNode(b)) {
                    return 0;
                }

                const pos = a.compareDocumentPosition(b);
                if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    return -1;
                } else if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINS) {
                    return 1;
                } else {
                    return 0;
                }
            });
    }

});