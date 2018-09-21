Object.assign(QuerySet.prototype, {

    // force an element to be shown, and then execute a callback
    forceShow(callback)
    {
        return core.forceShow(this.nodes, callback);
    },

    // get the index of the first element matching a filter
    index(filter)
    {
        return core.index(this.nodes, filter);
    },

    // get the index of the first element relative to it's parent element
    indexOf()
    {
        return core.indexOf(this.nodes);
    },

    // create a selection on the first node
    select()
    {
        core.select(this.nodes);
        return this;
    },

    // create a selection on all nodes
    selectAll()
    {
        core.selectAll(this.nodes);
        return this;
    },

    // returns a serialized string containing names and values of all form elements
    serialize()
    {
        return core.serialize(this.nodes);
    },

    // returns a serialized array containing names and values of all form elements
    serializeArray()
    {
        return core.serializeArray(this.nodes);
    },

    // returns an object containing keys and values of all form elements
    serializeObject()
    {
        return core.serializeObject(this.nodes);
    }

});