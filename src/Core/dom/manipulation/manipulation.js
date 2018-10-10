Object.assign(Core.prototype, {

    // create a new DOM element
    create(tagName)
    {
        return this.context.createElement(tagName);
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
        this.setProperty(nodes, 'innerHTML', '');
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
    }

});