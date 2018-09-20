Object.assign(QuerySet.prototype, {

    // add an event to each element
    addEvent(events, delegate, callback)
    {
        core.addEvent(this.nodes, events, delegate, callback);
        return this;
    },

    // add a self-destructing event to each element
    addEventOnce(events, delegate, callback)
    {
        core.addEvent(this.nodes, events, delegate, callback, true);
        return this;
    },

    // clone all events from each element to other elements
    cloneEvents(clones)
    {
        core.cloneEvents(this.nodes, clones);
        return this;
    },

    // remove an event from each element
    removeEvent(events, delegate, callback)
    {
        core.removeEvent(this.nodes, events, delegate, callback);
        return this;
    },

    // trigger an event on each element
    triggerEvent(events, data)
    {
        core.triggerEvent(this.nodes, events, data);
        return this;
    }

});