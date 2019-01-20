Object.assign(Core.prototype, {

    // insert each other node after the first node
    after(nodes, others)
    {
        const node = this.nodeFirst(nodes, false);

        if (!node) {
            return;
        }

        if (!node.parentNode) {
            return;
        }

        this._parseQuery(others)
            .reverse()
            .forEach(other =>
                node.parentNode.insertBefore(
                    other,
                    node.nextSibling
                )
            );
    },

    // insert each node after the first other node
    insertAfter(nodes, others)
    {
        this.after(others, nodes);
    },

    // insert each other node before the first node
    before(nodes, others)
    {
        const node = this.nodeFirst(nodes, false);

        if (!node) {
            return;
        }

        if (!node.parentNode) {
            return;
        }

        this._parseQuery(others, false)
            .forEach(other =>
                node.parentNode.insertBefore(
                    other,
                    node
                )
            );
    },

    // insert each node before the first other node
    insertBefore(nodes, others)
    {
        this.before(others, nodes);
    },

    // append each other node to the first node
    append(nodes, others)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        this._parseQuery(others, false)
            .forEach(other =>
                node.insertBefore(other, null)
            );
    },

    // append each node to the first other node
    appendTo(nodes, others)
    {
        this.append(others, nodes);
    },

    // prepend each other node to the first node
    prepend(nodes, others)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        this._parseQuery(others, false)
            .reverse()
            .forEach(other =>
                node.insertBefore(other, node.firstChild)
            );
    },

    // prepend each node to the first other node
    prependTo(nodes, others)
    {
        this.prepend(others, nodes);
    }

});