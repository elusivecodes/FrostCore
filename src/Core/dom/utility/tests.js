Object.assign(Core.prototype, {

    // returns true if any of the elements has a specified attribute
    hasAttribute(nodes, attribute)
    {
        return !! Core.nodeArray(nodes)
            .find(node => node.hasAttribute(attribute));
    },

    // returns true if any of the elements has any of the specified classes
    hasClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        return !! Core.nodeArray(nodes)
            .find(node => classes.find(className => node.classList.contains(className)));
    },

    // returns true if any of the nodes has custom data
    hasData(nodes, key)
    {
        return !! Core.nodeArray(nodes, false, true, true)
            .find(node => this.nodeData.has(node) && ( ! key || this.nodeData.get(node).hasOwnProperty(key)));
    },

    // returns true if any of the elements has a specified property
    hasProperty(nodes, property)
    {
        return !! Core.nodeArray(nodes)
            .find(node => node.hasOwnProperty(property));
    },

    // returns true if any of the elements contains a descendent matching a filter
    contains(nodes, filter)
    {
        filter = Core.parseFilterContains(filter);

        return !! Core.nodeArray(nodes, true, true)
            .find(node => ! filter || filter(node));
    },

    // returns true if any of the elements matches a filter
    is(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        return !! Core.nodeArray(nodes)
            .find(node => ! filter || filter(node));
    },

    // returns true if any of the elements or a parent of any of the elements is "fixed"
    isFixed(nodes)
    {
        return !! Core.nodeArray(nodes)
            .find(node => this.css(node, 'position') === 'fixed' || this.closest(node, parent => this.css(parent, 'position') === 'fixed'));
    },

    // returns true if any of the elements is hidden
    isHidden(nodes)
    {
        return !! Core.nodeArray(nodes, false, true)
            .find(node => ! Core.isDocument(node) && (Core.isNode(node) && ! node.offsetParent));
    },

    // returns true if any of the elements is visible
    isVisible(nodes)
    {
        return !! Core.nodeArray(nodes, false, true, true)
            .find(node => Core.isWindow(node) || Core.isDocument(node) || (Core.isNode(node) && node.offsetParent));
    }

});