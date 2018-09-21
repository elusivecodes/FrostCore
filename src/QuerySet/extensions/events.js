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

    // trigger a blur event on the first element
    blur()
    {
        core.blur(this.nodes);
        return this;
    },

    // trigger a click event on the first element
    click()
    {
        core.click(this.nodes);
        return this;
    },

    // clone all events from each element to other elements
    cloneEvents(clones)
    {
        core.cloneEvents(this.nodes, clones);
        return this;
    },

    // trigger a focus event on the first element
    focus()
    {
        core.focus(this.nodes);
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