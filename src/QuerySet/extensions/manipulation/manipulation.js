Object.assign(QuerySet.prototype, {

    // insert each other node after the first node
    after(others)
    {
        this.core.after(this.nodes, others);
        return this;
    },

    // append each other nodes to the first node
    append(others)
    {
        this.core.append(this.nodes, others);
        return this;
    },

    // append each node to the first other node
    appendTo(others)
    {
        this.core.appendTo(this.nodes, others);
        return this;
    },

    // insert each other node before the first node
    before(others)
    {
        this.core.before(this.nodes, others);
        return this;
    },

    // clone each node (optionally deep, and with events and data)
    clone(deep = true, eventsData = false)
    {
        return this.pushStack(this.core.clone(this.nodes, deep, eventsData));
    },

    // detach an element from the DOM
    detach()
    {
        this.core.detach(this.nodes);
        return this;
    },

    // remove all children of each node from the DOM
    empty()
    {
        this.core.empty(this.nodes);
        return this;
    },

    // insert each node after the first other node
    insertAfter(others)
    {
        this.core.insertAfter(this.nodes, others);
        return this;
    },

    // insert each node before the first other node
    insertBefore(others)
    {
        this.core.insertBefore(this.nodes, others);
        return this;
    },

    // prepend each other node to the first node
    prepend(others)
    {
        this.core.prepend(this.nodes, others);
        return this;
    },

    // prepend each node to the first other node
    prependTo(others)
    {
        this.core.prependTo(this.nodes, others);
        return this;
    },

    // remove each node from the DOM
    remove()
    {
        this.core.remove(this.nodes);
        return this;
    },

    // replace each other node with nodes
    replaceAll(others)
    {
        this.core.replaceAll(this.nodes, others);
        return this;
    },

    // replace each node with other nodes
    replaceWith(others)
    {
        this.core.replaceWith(this.nodes, others);
        return this;
    },

    // unwrap each node (optionally matching a filter)
    unwrap(filter)
    {
        this.core.unwrap(this.nodes, filter);
        return this;
    },

    // wrap each nodes with other nodes
    wrap(others)
    {
        this.core.wrap(this.nodes, others);
        return this;
    },

    // wrap all nodes with other nodes
    wrapAll(others)
    {
        this.core.wrapAll(this.nodes, others);
        return this;
    },

    // wrap the contents of each node with other nodes
    wrapInner(others)
    {
        this.core.wrapInner(this.nodes, others);
        return this;
    }

});