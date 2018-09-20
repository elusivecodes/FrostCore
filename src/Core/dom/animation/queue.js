Object.assign(Core.prototype, {

    // clear the queue of each element
    clearQueue(nodes)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                if ( ! this.queues.has(node)) {
                    return;
                }

                this.queues.delete(node);
            });
    },

    // run the next queued callback for each element
    dequeue(nodes)
    {
        Core.nodeArray(nodes)
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
                    .finally(() => this.dequeue(node));
            });
    },

    // queue a callback on each element
    queue(nodes, callback)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                const newQueue = ! this.queues.has(node);
                if (newQueue) {
                    this.queues.set(node, []);
                }

                this.queues.get(node).push(callback);

                if (newQueue) {
                    this.dequeue(node);
                }
            });
    }

});