Object.assign(QuerySet.prototype, {

    // clear the queue of each element
    clearQueue()
    {
        core.clearQueue(this.nodes);
        return this;
    },

    // queue a callback on each element
    queue(callback)
    {
        core.queue(this.nodes, callback);
        return this;
    }

});