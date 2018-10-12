Object.assign(QuerySet.prototype, {

    // return all elements matching a filter
    filter(filter)
    {
        return this.pushStack(this.core.filter(this.nodes, filter));
    },

    // return the first element matching a filter
    filterOne(filter)
    {
        return this.pushStack(this.core.filterOne(this.nodes, filter));
    },

    // return all elements with a descendent matching the selector
    has(selector)
    {
        return this.pushStack(this.core.has(this.nodes, selector));
    },

    // return all hidden elements
    hidden()
    {
        return this.pushStack(this.core.hidden(this.nodes));
    },

    // return all elements not matching a filter
    not(filter)
    {
        return this.pushStack(this.core.not(this.nodes, filter));
    },

    // return all visible elements
    visible()
    {
        return this.pushStack(this.core.visible(this.nodes));
    }

});