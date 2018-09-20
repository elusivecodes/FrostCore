Object.assign(QuerySet.prototype, {

    // insert each other node after the first node
    after(others)
    {
        core.after(this.nodes, others);
        return this;
    },

    // append each other nodes to the first node
    append(others)
    {
        core.append(this.nodes, others);
        return this;
    },

    // append each node to the first other node
    appendTo(others)
    {
        core.appendTo(this.nodes, others);
        return this;
    },

    // insert each other node before the first node
    before(others)
    {
        core.before(this.nodes, others);
        return this;
    },

    // clone each node (optionally deep, and with events and data)
    clone(deep = true, eventsData = false)
    {
        return this.pushStack(core.clone(this.nodes, deep, eventsData));
    },

    // detach an element from the DOM
    detach()
    {
        core.detach(this.nodes);
        return this;
    },

    // remove all children of each node from the DOM
    empty()
    {
        core.empty(this.nodes);
        return this;
    },

    // insert each node after the first other node
    insertAfter(others)
    {
        core.insertAfter(this.nodes, others);
        return this;
    },

    // insert each node before the first other node
    insertBefore(others)
    {
        core.insertBefore(this.nodes, others);
        return this;
    },

    // prepend each other node to the first node
    prepend(others)
    {
        core.prepend(this.nodes, others);
        return this;
    },

    // prepend each node to the first other node
    prependTo(others)
    {
        core.prependTo(this.nodes, others);
        return this;
    },

    // remove each node from the DOM
    remove()
    {
        core.remove(this.nodes);
        return this;
    },

    // replace each other node with nodes
    replaceAll(others)
    {
        core.replaceAll(this.nodes, others);
        return this;
    },

    // replace each node with other nodes
    replaceWith(others)
    {
        core.replaceWith(this.nodes, others);
        return this;
    },

    // unwrap each node (optionally matching a filter)
    unwrap(filter)
    {
        core.unwrap(this.nodes, filter);
        return this;
    },

    // wrap each nodes with other nodes
    wrap(others)
    {
        core.wrap(this.nodes, others);
        return this;
    },

    // wrap all nodes with other nodes
    wrapAll(others)
    {
        core.wrapAll(this.nodes, others);
        return this;
    },

    // wrap the contents of each node with other nodes
    wrapInner(others)
    {
        core.wrapInner(this.nodes, others);
        return this;
    }

});