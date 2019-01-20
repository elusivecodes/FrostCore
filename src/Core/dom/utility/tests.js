Object.assign(Core.prototype, {

    // returns true if any of the elements has a specified attribute
    hasAttribute(nodes, attribute)
    {
        return !!this.nodeArray(nodes)
            .find(node =>
                node.hasAttribute(attribute)
            );
    },

    // returns true if any of the elements has any of the specified classes
    hasClass(nodes, ...classes)
    {
        classes = Core._parseClasses(classes);

        return !!this.nodeArray(nodes)
            .find(node =>
                classes.find(className =>
                    node.classList.contains(className)
                )
            );
    },

    // returns true if any of the nodes has custom data
    hasData(nodes, key)
    {
        return !!this.nodeArray(nodes, false, true, true)
            .find(node =>
                this.nodeData.has(node) &&
                (!key || this.nodeData.get(node).hasOwnProperty(key))
            );
    },

    // returns true if any of the elements has a specified property
    hasProperty(nodes, property)
    {
        return !!this.nodeArray(nodes)
            .find(node =>
                node.hasOwnProperty(property)
            );
    },

    // returns true if any of the elements contains a descendent matching a filter
    contains(nodes, filter)
    {
        filter = this._parseFilterContains(filter);

        return !!this.nodeArray(nodes, true, true)
            .find(node =>
                !filter ||
                filter(node)
            );
    },

    // returns true if any of the elements matches a filter
    is(nodes, filter)
    {
        filter = this._parseFilter(filter);

        return !!this.nodeArray(nodes)
            .find(node =>
                !filter ||
                filter(node)
            );
    },

    // returns true if any of the nodes is connected to the DOM
    isConnected(nodes)
    {
        return !!this.nodeArray(nodes, false)
            .find(node => node.isConnected);
    },

    // returns true if any of the elements or a parent of any of the elements is "fixed"
    isFixed(nodes)
    {
        return !!this.nodeArray(nodes)
            .find(node =>
                this.css(node, 'position') === 'fixed' ||
                this.closest(
                    node,
                    parent =>
                        this.css(parent, 'position') === 'fixed')
            );
    },

    // returns true if any of the elements is hidden
    isHidden(nodes)
    {
        return !!this.nodeArray(nodes, false, true, true)
            .find(node =>
            {
                if (Core.isWindow(node)) {
                    return this.context.visibilityState !== 'visible';
                }

                if (Core.isDocument(node)) {
                    return node.visibilityState !== 'visible';
                }

                if (Core.isBody(node)) {
                    return this.getStyle(node, 'display') === 'none';
                }

                if (Core.isNode(node)) {
                    return !node.offsetParent;
                }
            });
    },

    // returns true if any of the elements is visible
    isVisible(nodes)
    {
        return !!this.nodeArray(nodes, false, true, true)
            .find(node =>
            {
                if (Core.isWindow(node)) {
                    return this.context.visibilityState === 'visible';
                }

                if (Core.isDocument(node)) {
                    return node.visibilityState === 'visible';
                }

                if (Core.isBody(node)) {
                    return this.getStyle(node, 'display') !== 'none';
                }

                if (Core.isNode(node)) {
                    return node.offsetParent;
                }
            });
    }

});