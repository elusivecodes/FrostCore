Object.assign(QuerySet.prototype, {

    // get the X,Y co-ordinates for the center of the first element (optionally offset)
    center(offset)
    {
        return core.center(this.nodes, offset);
    },

    // constrain each element to a container element
    constrain(container)
    {
        return core.constrain(this.nodes, container);
    },

    // get the distance of an element to an X, Y position in the window
    distTo(x, y)
    {
        return core.distTo(this.nodes, x, y);
    },

    // get the distance between two elements
    distToNode(others)
    {
        return core.distToNode(this.nodes, others);
    },

    // get the nearest element to an X, Y position in the window
    nearestTo(x, y)
    {
        return core.nearestTo(this.nodes, x, y);
    },

    // get the nearest element to another element
    nearestToNode(others)
    {
        return core.nearestToNode(this.nodes, others);
    },

    // get the percentage of an X co-ordinate relative to an element
    percentX(x)
    {
        return core.percentX(this.nodes, x);
    },

    // get the percentage of a Y co-ordinate relative to an element
    percentY(y)
    {
        return core.percentY(this.nodes, y);
    },

    // get the position of the first element relative to the window (optionally offset)
    position(offset)
    {
        return core.position(this.nodes, offset);
    },

    // get the computed bounding rectangle of the first element
    rect(offset)
    {
        return core.rect(this.nodes, offset);
    }

});