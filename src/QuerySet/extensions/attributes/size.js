Object.assign(QuerySet.prototype, {

    // get the computed height of the first element
    // (and optionally padding, border or margin)
    height(padding, border, margin)
    {
        return core.height(this.nodes, padding, border, margin);
    },

    // get the computed width of the first element
    // (and optionally padding, border or margin)
    width(padding, border, margin)
    {
        return core.width(this.nodes, padding, border, margin);
    }

});