Object.assign(Core.prototype, {

    // clone each node (optionally deep, and with events and data)
    clone(nodes, deep = true, eventsData = false)
    {
        const results = [];

        this.nodeArray(nodes, false)
            .forEach(node =>
            {
                const clone = node.cloneNode(deep);

                if (eventsData) {
                    this.cloneEvents(node, clone);
                    this.cloneData(node, clone);

                    if (deep) {
                        const contents = this.find(node, '*');
                        this.find(clone, '*')
                            .forEach((child, index) =>
                            {
                                this.cloneEvents(contents[index], child);
                                this.cloneData(contents[index], child);
                            });
                    }
                }

                results.push(clone);
            });

        return results;
    },

    // detach an element from the DOM
    detach(nodes)
    {
        this.nodeArray(nodes, false)
            .forEach(node =>
            {
                if (!node.parentNode) {
                    return;
                }

                node.parentNode.removeChild(node);
            });
    },

    // remove all children of each node from the DOM
    empty(nodes)
    {
        this.remove(
            this.find(nodes, '*'),
            false
        );
        this.setProperty(
            nodes,
            'innerHTML',
            ''
        );
    },

    // remove each node from the DOM
    remove(nodes, deep = true)
    {
        if (deep) {
            this.empty(nodes);
        }

        // clear queue
        this.clearQueue(nodes);

        // stop animations
        this.stop(nodes);

        // remove events
        this.removeEvent(nodes);

        // remove data
        this.removeData(nodes);

        // delete styles
        this.nodeArray(nodes)
            .forEach(
                node =>
                    this.nodeStyles.has(node) &&
                    this.nodeStyles.delete(node)
            );

        // detach node
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
        others = this._parseQuery(others, false);

        this.nodeArray(nodes, false)
            .forEach(node =>
            {
                this.before(
                    node,
                    this.clone(others, true)
                );
                this.remove(node);
            });
    }

});