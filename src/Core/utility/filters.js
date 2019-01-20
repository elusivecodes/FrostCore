Object.assign(Core.prototype, {

    // returns an element filter function from a function, string, node, node list, element list or array
    _parseFilter(filter)
    {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node => node.matches(filter);
        }

        if (Core.isNode(filter)) {
            return node => node.isSameNode(filter);
        }

        filter = this.nodeArray(filter);
        if (filter.length) {
            return node => filter.includes(node);
        }

        return false;
    },

    // returns an element contains filter function from a function, string, node, node list, element list or array
    _parseFilterContains(filter)
    {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node => !!this.findOne(node, filter);
        }

        if (Core.isNode(filter)) {
            return node => node.contains(filter);
        }

        filter = this.nodeArray(filter);
        if (filter.length) {
            return node => !!filter.find(other => node.contains(other));
        }

        return false;
    }

});