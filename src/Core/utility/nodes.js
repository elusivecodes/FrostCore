Object.assign(Core.prototype, {

    nodeArray(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return Core.isString(value) ?
            this.find(value) :
            Core.makeArray(value)
                .filter(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },

    nodeFirst(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return Core.isString(value) ?
            this.findOne(value) :
            Core.makeArray(value)
                .find(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },

    // sorts nodes by their position in the document
    sortNodes(nodes)
    {
        return this.nodeArray(nodes, false)
            .sort((a, b) =>
            {
                if (a.isSameNode(b)) {
                    return 0;
                }

                const pos = a.compareDocumentPosition(b);
                if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    return -1;
                }
                else if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINS) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
    }

});