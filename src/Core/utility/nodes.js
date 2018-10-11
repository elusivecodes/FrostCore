Object.assign(Core.prototype, {

    nodeArray(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return Core.isString(value) ?
            this.find(value) :
            Core.makeArray(value)
                .filter(Core.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },

    nodeFirst(value, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        return Core.isString(value) ?
            this.findOne(value) :
            Core.makeArray(value)
                .find(Core.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    }

});