Object.assign(Core.prototype, {

    // find the first child of each element matching a filter
    child(nodes, filter)
    {
        return this.children(nodes, filter, true);
    },

    // find all children of each element,
    // and optionally matching a filter
    children(nodes, filter, first = false, elementsOnly = true)
    {
        filter = Core.parseFilter(filter);

        const results = new Set;

        Core.nodeArray(nodes)
            .forEach(node =>
                Core.nodeArray(node.childNodes, elementsOnly)
                    .forEach(child => {
                        if (filter && ! filter(child)) {
                            return;
                        }

                        results.add(child);
                        return !first;
                    })
            );

        const nodeArray = Core.sortNodes([...results]);

        return first && Core.isNode(nodes) ?
            nodeArray.shift() || null :
            nodeArray;
    },

    // find all child nodes for each element,
    // (including text and comment nodes)
    contents(nodes)
    {
        return this.children(nodes, false, false, false);
    },

    // find the closest ancestor to each element matching a filter,
    // and optionally before hitting a limit
    closest(nodes, filter, until)
    {
        return this.parents(nodes, filter, until, true);
    },

    // find the parent of each element matching a filter
    parent(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                if ( ! node.parentNode) {
                    return;
                }

                if (filter && ! filter(node.parentNode)) {
                    return;
                }

                results.add(node.parentNode);
            });

        const nodeArray = Core.sortNodes([...results]);

        return Core.isNode(nodes) ?
            nodeArray.shift() || null :
            nodeArray;
    },

    // find all parents of each element matching a filter,
    // and optionally before hitting a limit
    parents(nodes, filter, until, closest = false)
    {
        filter = Core.parseFilter(filter);
        until = Core.parseFilter(until);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                while (node = node.parentNode) {
                    if (until && until(node)) {
                        break;
                    }

                    if (filter && ! filter(node)) {
                        continue;
                    }

                    results.add(node);

                    if (closest) {
                        return;
                    }
                }
            });

        const nodeArray = Core.sortNodes([...results]);

        return closest && Core.isNode(nodes) ?
            nodeArray.shift() || null :
            nodeArray;
    },

    // find the offset parent (relatively positioned) of the first element
    offsetParent(nodes)
    {
        return this.forceShow(nodes, node => node.offsetParent);
    },

    // find the next sibling for each element matching a filter
    next(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                if ( ! node.nextSibling) {
                    return;
                }

                if (filter && ! filter(node.nextSibling)) {
                    return;
                }

                results.add(node.nextSibling);
            });

        const nodeArray = Core.sortNodes([...results]);

        return Core.isNode(nodes) ?
            nodeArray.shift() || null :
            nodeArray;
    },

    // find all next siblings for each element matching a filter,
    // and optionally before hitting a limit
    nextAll(nodes, filter, until = false, first = false)
    {
        filter = Core.parseFilter(filter);
        until = Core.parseFilter(until);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                while (node = node.nextSibling) {
                    if (until && until(node)) {
                        break;
                    }

                    if (filter && ! filter(node)) {
                        continue;
                    }

                    results.add(node);

                    if (first) {
                        break;
                    }
                }
            });

        return Core.sortNodes([...results]);
    },

    // find the previous sibling for each element matching a filter,
    // and optionally before hitting a limit
    prev(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                if ( ! node.previousSibling) {
                    return;
                }

                if (filter && ! filter(node.previousSibling)) {
                    return;
                }

                results.add(node.previousSibling);
            });

        const nodeArray = Core.sortNodes([...results]);

        return Core.isNode(nodes) ?
            nodeArray.shift() || null :
            nodeArray;
    },

    // find all previous siblings for each element matching a filter,
    // and optionally before hitting a limit
    prevAll(nodes, filter, until = false, first = false)
    {
        filter = Core.parseFilter(filter);
        until = Core.parseFilter(until);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                while (node = node.previousSibling) {
                    if (until && until(node)) {
                        break;
                    }

                    if (filter && ! filter(node)) {
                        continue;
                    }

                    results.add(node);

                    if (first) {
                        break;
                    }
                }
            });

        return Core.sortNodes([...results]);
    },

    // find all siblings for each element matching a filter
    siblings(nodes, filter, elementsOnly = true)
    {
        filter = Core.parseFilter(filter);

        const results = new Set;

        Core.nodeArray(nodes, false)
            .forEach(node => {
                if ( ! node.parentNode) {
                    return;
                }

                Core.nodeArray(node.parentNode.childNodes, elementsOnly)
                    .forEach(child => {
                        if (child.isSameNode(node)) {
                            return;
                        }

                        if (filter && ! filter(child)) {
                            return;
                        }

                        results.add(child);
                    })
                });

        return Core.sortNodes([...results]);
    }

});