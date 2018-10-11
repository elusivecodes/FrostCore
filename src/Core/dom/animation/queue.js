Object.assign(Core.prototype, {

    // queue a callback on each element
    queue(nodes, callback)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                const newQueue = ! this.queues.has(node);
                if (newQueue) {
                    this.queues.set(node, []);
                }

                this.queues.get(node).push(callback);

                if (newQueue) {
                    this._dequeue(node);
                }
            });
    },

    // clear the queue of each element
    clearQueue(nodes)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                if ( ! this.queues.has(node)) {
                    return;
                }

                this.queues.delete(node);
            });
    },

    // run the next queued callback for each element
    _dequeue(nodes)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                if ( ! this.queues.has(node)) {
                    return;
                }

                const next = this.queues.get(node).shift();

                if ( ! next) {
                    this.queues.delete(node);
                    return;
                }

                Promise.resolve(next.bind(node)(node))
                    .finally(() => this._dequeue(node));
            });
    }

});