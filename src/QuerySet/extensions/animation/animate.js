Object.assign(QuerySet.prototype, {

    // add an animation to each element
    animate(callback, duration)
    {
        return this.queue(node => this.core.animate(node, callback, duration));
    },

    // stop all animations for each element
    stop(finish = true)
    {
        this.core.stop(this.nodes, finish);
        return this.clearQueue();
    }

});