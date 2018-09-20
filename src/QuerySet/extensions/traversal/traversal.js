Object.assign(QuerySet.prototype, {

    // find the closest ancestor to each element matching a filter,
    // and optionally before hitting a limit
    closest(filter, until)
    {
        return this.pushStack(core.closest(this.nodes, filter, until));
    },

    // find the first child of each element matching a filter
    child(filter)
    {
        return this.pushStack(core.child(this.nodes, filter));
    },

    // find all children of each element,
    // and optionally matching a filter
    children(filter)
    {
        return this.pushStack(core.children(this.nodes, filter));
    },

    // find all child nodes for each element,
    // (including text and comment nodes)
    contents() {
        return this.pushStack(core.contents(this.nodes));
    },

    // find the next sibling for each element matching a filter
    next(filter)
    {
        return this.pushStack(core.next(this.nodes, filter));
    },

    // find all next siblings for each element matching a filter,
    // and optionally before hitting a limit
    nextAll(filter, until = false, first = false)
    {
        return this.pushStack(core.nextAll(this.nodes, filter, until, first));
    },

    // find the offset parent (relatively positioned) of the first element
    offsetParent()
    {
        return this.pushStack(core.offsetParent(this.nodes));
    },

    // find the parent of each element matching a filter
    parent(filter)
    {
        return this.pushStack(core.parent(this.nodes, filter));
    },

    // find all parents of each element matching a filter,
    // and optionally before hitting a limit
    parents(filter, until)
    {
        return this.pushStack(core.parents(this.nodes, filter, until));
    },

    // find the previous sibling for each element matching a filter,
    // and optionally before hitting a limit
    prev(filter)
    {
        return this.pushStack(core.prev(this.nodes, filter));
    },

    // find all previous siblings for each element matching a filter,
    // and optionally before hitting a limit
    prevAll(filter, until = false, first = false)
    {
        return this.pushStack(core.prevAll(this.nodes, filter, until, first));
    },

    // find all siblings for each element matching a filter
    siblings(filter)
    {
        return this.pushStack(core.siblings(this.nodes, filter));
    }

});