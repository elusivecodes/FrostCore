Object.assign(Core.prototype, {

    // return all elements matching a filter
    filter(nodes, filter)
    {
        filter = this._parseFilter(filter);

        return this.nodeArray(nodes)
            .filter((node, index) =>
                !filter || filter(node, index)
            );
    },

    // return the first element matching a filter
    filterOne(nodes, filter)
    {
        filter = this._parseFilter(filter);

        return this.nodeArray(nodes)
            .find((node, index) =>
                !filter || filter(node, index)
            ) || null;
    },

    // return all elements not matching a filter
    not(nodes, filter)
    {
        filter = this._parseFilter(filter);

        return this.nodeArray(nodes)
            .filter((node, index) =>
                filter && !filter(node, index)
            );
    },

    // return all elements with a descendent matching a filter
    has(nodes, filter)
    {
        filter = this._parseFilterContains(filter);

        return this.nodeArray(nodes, true, true)
            .filter(node =>
                !filter || filter(node)
            );
    },

    // return all hidden elements
    hidden(nodes)
    {
        return this.nodeArray(nodes, false, true, true)
            .filter(node =>
                this.isHidden(node)
            );
    },

    // return all visible elements
    visible(nodes)
    {
        return this.nodeArray(nodes, false, true, true)
            .filter(node =>
                this.isVisible(node)
            );
    }

});