class QuerySet
{

    constructor(nodes, core = core)
    {
        this.core = core;
        this.nodes = this.core.parseQuery(nodes, true, true, true);
        this.stack = [];
    }

    delay(duration)
    {
        return this.queue(() => {
            return new Promise(resolve => setTimeout(resolve, duration));
        });
    }

    each(callback)
    {
        this.nodes.forEach(callback);
        return this;
    }

    eq(index)
    {
        return this.pushStack(this.get(index));
    }

    filter(callback)
    {
        return this.pushStack(this.nodes.filter(callback));
    }

    first()
    {
        return this.eq(0);
    }

    get(index)
    {
        if ( ! index) {
            return this.nodes;
        }

        return index < 0 ?
            this.nodes[index + this.nodes.length] : this.nodes[index];
    }

    last()
    {
        return this.eq(-1);
    }

    map(callback)
    {
        this.nodes.map(callback);
        return this;
    }

    popStack()
    {
        this.nodes = this.stack.pop() || [];
        return this;
    }

    pushStack(nodes)
    {
        this.stack.push(this.nodes.slice());
        this.nodes = nodes;
        return this;
    }

    slice(...args)
    {
        return this.pushStack(this.nodes.slice(...args));
    }

}