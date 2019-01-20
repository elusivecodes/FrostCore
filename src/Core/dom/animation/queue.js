Object.assign(Core.prototype, {

    // queue a callback on each element
    queue(nodes, callback)
    {
        // loop through nodes
        this.nodeArray(nodes)
            .forEach(node =>
            {
                // test if node has a new queue
                const newQueue = ! this.queues.has(node);

                // if it's a new queue,
                // initialize an empty array in the queue
                if (newQueue)
                {
                    this.queues.set(node, []);
                }

                // push the callback to the queue
                this.queues.get(node)
                    .push(callback);

                // if it's a new queue,
                // dequeue the node
                if (newQueue)
                {
                    this._dequeue(node);
                }
            });
    },

    // clear the queue of each element
    clearQueue(nodes)
    {
        // loop through nodes
        this.nodeArray(nodes)
            .forEach(node =>
                this.queues.has(node) &&
                this.queues.delete(node)
            );
    },

    // run the next queued callback for each element
    _dequeue(nodes)
    {
        // loop through nodes
        this.nodeArray(nodes)
            .forEach(node =>
            {
                // if node doesn't have a queue, return
                if ( ! this.queues.has(node))
                {
                    return;
                }

                // get next item in queue
                const next = this.queues.get(node).shift();

                // if there's no next item,
                // delete node from the queue
                if ( ! next)
                {
                    this.queues.delete(node);
                    return;
                }

                // resolve next item then dequeue node
                Promise.resolve(next(node))
                    .finally(() =>
                        this._dequeue(node)
                    );
            });
    }

});