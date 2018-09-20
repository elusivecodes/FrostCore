Object.assign(Core.prototype, {

    // insert each other node after the first node
    after(nodes, others)
    {
        const node = Core.nodeFirst(nodes, false);

        if ( ! node) {
            return;
        }

        this.parseQuery(others)
            .reverse()
            .forEach(other => node.parentNode.insertBefore(other, node.nextSibling));
    },

    // append each other nodes to the first node
    append(nodes, others)
    {
        const node = Core.nodeFirst(nodes, false);

        if ( ! node) {
            return;
        }

        this.parseQuery(others, false)
            .forEach(other => node.insertBefore(other, null));
    },

    // append each node to the first other node
    appendTo(nodes, others)
    {
        this.append(others, nodes);
    },

    // insert each other node before the first node
    before(nodes, others)
    {
        const node = Core.nodeFirst(nodes, false);

        if ( ! node) {
            return;
        }

        this.parseQuery(others, false)
            .forEach(other => node.parentNode.insertBefore(other, node));
    },

    // clone each node (optionally deep, and with events and data)
    clone(nodes, deep = true, eventsData = false)
    {
        const results = [];

        Core.nodeArray(nodes, false)
            .forEach(node => {
                const clone = node.cloneNode(deep);

                if (eventsData) {
                    this.cloneEvents(node, clone);
                    this.cloneData(node, clone);

                    if (deep) {
                        const contents = this.find(node, '*');
                        this.find(clone, '*').forEach((child, index) => {
                            this.cloneEvents(contents[index], child);
                            this.cloneData(contents[index], child);
                        });
                    }
                }

                results.push(clone);
            });

        return results;
    },

    // create a new DOM element
    create(tagName)
    {
        return this.context.createElement(tagName);
    },

    // detach an element from the DOM
    detach(nodes)
    {
        Core.nodeArray(nodes, false)
            .forEach(node => {
                if ( ! node.parentNode) {
                    return;
                }

                node.parentNode.removeChild(node);
            });
    },

    // remove all children of each node from the DOM
    empty(nodes)
    {
        this.remove(this.find(nodes, '*'), false);
        this.setProp(nodes, 'innerHTML', '');
    },

    // insert each node after the first other node
    insertAfter(nodes, others)
    {
        this.after(others, nodes);
    },

    // insert each node before the first other node
    insertBefore(nodes, others)
    {
        this.before(others, nodes);
    },

    // prepend each other node to the first node
    prepend(nodes, others)
    {
        const node = Core.nodeFirst(nodes, false);

        if ( ! node) {
            return;
        }

        this.parseQuery(others, false)
            .reverse()
            .forEach(other => node.insertBefore(other, node.firstChild));
    },

    // prepend each node to the first other node
    prependTo(nodes, others)
    {
        this.prepend(others, nodes);
    },

    // remove each node from the DOM
    remove(nodes, deep = true)
    {
        if (deep) {
            this.empty(nodes);
        }

        this.clearQueue(nodes);
        this.stop(nodes);
        this.removeEvent(nodes);
        this.removeData(nodes);
        this.detach(nodes);
    },

    // replace each other node with nodes
    replaceAll(nodes, others)
    {
        this.replaceWith(others, nodes);
    },

    // replace each node with other nodes
    replaceWith(nodes, others)
    {
        others = this.parseQuery(others, false);

        Core.nodeArray(nodes, false)
            .forEach(node => {
                this.before(node, this.clone(others, true));
                this.remove(node);
            });
    },

    // unwrap each node (optionally matching a filter)
    unwrap(nodes, filter)
    {
        Core.nodeArray(nodes, false)
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

        Core.nodeArray(nodes, false)
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

        Core.nodeArray(nodes, false)
            .forEach(node => {
                const clone = this.clone(others, true);
                this.append(node, clone);
                this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, this.contents(node));
            });
    }

});