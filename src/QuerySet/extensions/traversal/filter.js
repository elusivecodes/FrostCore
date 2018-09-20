Object.assign(QuerySet.prototype, {

    // return all elements matching a filter
    filter(filter)
    {
        return this.pushStack(core.filter(this.nodes, filter));
    },

    // return the first element matching a filter
    filterOne(filter)
    {
        return this.pushStack(core.filterOne(this.nodes, filter));
    },

    // return all elements with a descendent matching the selector
    has(selector)
    {
        return this.pushStack(core.has(this.nodes, selector));
    },

    // return all hidden elements
    hidden()
    {
        return this.pushStack(core.hidden(this.nodes));
    },

    // return all elements not matching a filter
    not(filter)
    {
        return this.pushStack(core.not(this.nodes, filter));
    },

    // return all visible elements
    visible()
    {
        return this.pushStack(core.visible(this.nodes));
    }

});