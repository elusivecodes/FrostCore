Object.assign(Core.prototype, {

    // return all elements matching a filter
    filter(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        return Core.nodeArray(nodes)
            .filter((node, index) => ! filter || filter(node, index));
    },

    // return the first element matching a filter
    filterOne(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        return Core.nodeArray(nodes)
            .find((node, index) => ! filter || filter(node, index)) || null;
    },

    // return all elements with a descendent matching the selector
    has(nodes, selector)
    {
        return Core.nodeArray(nodes)
            .filter(node => this.findOne(node, selector));
    },

    // return all hidden elements
    hidden(nodes)
    {
        return Core.nodeArray(nodes)
            .filter(node => this.isHidden(node));
    },

    // return all elements not matching a filter
    not(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        return Core.nodeArray(nodes)
            .filter((node, index) => ! filter || ! filter(node, index));
    },

    // return all visible elements
    visible(nodes)
    {
        return Core.nodeArray(nodes)
            .filter(node => this.isVisible(node));
    }

});