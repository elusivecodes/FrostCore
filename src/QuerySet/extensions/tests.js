Object.assign(QuerySet.prototype, {

    // returns true if any of the elements contains a descendent matching a filter
    contains(filter)
    {
        return core.contains(this.nodes, filter);
    },

    // returns true if any of the elements has a specified attribute
    hasAttribute(attribute)
    {
        return core.hasAttribute(this.nodes, attribute);
    },

    // returns true if any of the elements has any of the specified classes
    hasClass(...classes)
    {
        return core.hasClass(this.nodes, ...classes);
    },

    // returns true if any of the nodes has data
    hasData(key)
    {
        return core.hasData(this.nodes, key);
    },

    // returns true if any of the elements has a specified property
    hasProperty(property)
    {
        return core.hasProperty(this.nodes, property);
    },

    // returns true if any of the elements or a parent of the elements is "fixed"
    isFixed()
    {
        return core.isFixed(this.nodes);
    },

    // returns true if any of the elements in the set is hidden
    isHidden()
    {
        return core.isHidden(this.nodes);
    },

    // returns true if any of the elements in the set is visible
    isVisible()
    {
        return core.isVisible(this.nodes);
    }

});