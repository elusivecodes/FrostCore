class Core
{

    constructor(context)
    {
        this.context = context || window.document;

        this.animating = false;
        this.animations = new Map;
        this.queues = new WeakMap;

        this.nodeData = new WeakMap;
        this.nodeEvents = new WeakMap;
        this.nodeStyles = new WeakMap;
    }

    // jQuery-like query method,
    // add a function to the ready queue or return a QuerySet (optionally mutable)
    query(query, mutable = true)
    {
        if (Core.isFunction(query)) {
            return this.ready(query);
        }

        return mutable ?
            new QuerySet(query, this) :
            new QuerySetImmutable(query, this);
    }

    // add a function to the ready queue
    ready(callback)
    {
        if (this.context.readyState === 'complete') {
            callback();
        } else {
            this.addEvent(window, 'DOMContentLoaded', callback);
        }
    }

}