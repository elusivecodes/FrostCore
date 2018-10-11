Object.assign(Core.prototype, {

    // unwrap each node (optionally matching a filter)
    unwrap(nodes, filter)
    {
        this.nodeArray(nodes, false)
            .forEach(node => {
                const parent = this.parent(node, filter);

                if ( ! parent) {
                    return;
                }

                this.before(parent, this.contents(parent));
                this.remove(parent);
            });
    },

    // wrap each nodes with other nodes
    wrap(nodes, others)
    {
        others = this.parseQuery(others);

        this.nodeArray(nodes, false)
            .forEach(node => {
                const clone = this.clone(others, true);
                this.before(node, clone);
                this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, node);
            });
    },

    // wrap all nodes with other nodes
    wrapAll(nodes, others)
    {
        others = this.parseQuery(others);

        const clone = this.clone(others, true);
        this.before(nodes, clone);
        this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, nodes);
    },

    // wrap the contents of each node with other nodes
    wrapInner(nodes, others)
    {
        others = this.parseQuery(others);

        this.nodeArray(nodes, false)
            .forEach(node => {
                const clone = this.clone(others, true);
                this.append(node, clone);
                this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, this.contents(node));
            });
    }

});