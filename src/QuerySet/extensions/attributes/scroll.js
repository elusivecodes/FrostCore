Object.assign(QuerySet.prototype, {

    // scroll each element to an X, Y position
    scrollTo(x, y)
    {
        core.scrollTo(this.nodes, x, y);
        return this;
    },

    // scroll each element to an X position
    scrollToX(x)
    {
        core.scrollToX(this.nodes, x);
        return this;
    },

    // scroll each element to a Y position
    scrollToY(y)
    {
        core.scrollToY(this.nodes, y);
        return this;
    },

    // get the scroll X position of the first element
    scrollX()
    {
        return core.scrollX(this.nodes);
    },

    // get the scroll Y position of the first element
    scrollY()
    {
        return core.scrollY(this.nodes);
    }

});