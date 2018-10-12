Object.assign(QuerySet.prototype, {

    // clear the queue of each element
    clearQueue()
    {
        this.core.clearQueue(this.nodes);
        return this;
    },

    // queue a callback on each element
    queue(callback)
    {
        this.core.queue(this.nodes, callback);
        return this;
    }

});