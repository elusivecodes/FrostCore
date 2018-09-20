Object.assign(QuerySet.prototype, {

    // find all elements matching a selector
    find(selector)
    {
        return this.pushStack(core.find(this.nodes, selector));
    },

    // find all elements with a specific class
    findByClass(className)
    {
        return this.pushStack(core.findByClass(this.nodes, className));
    },

    // find all elements with a specific ID
    findById(id)
    {
        return this.pushStack(core.findById(this.nodes, id));
    },

    // find all elements with a specific tag
    findByTag(tagName)
    {
        return this.pushStack(core.findByTag(this.nodes, tagName));
    },

    // find a single element matching a selector
    findOne(selector)
    {
        return this.pushStack(core.findOne(this.nodes, selector));
    },

    // find the first element with a specific class
    findOneByClass(className)
    {
        return this.pushStack(core.findOneByClass(this.nodes, className));
    },

    // find the first element with a specific ID
    findOneById(id)
    {
        return this.pushStack(core.findOneById(this.nodes, id));
    },

    // find the first element with a specific tag
    findOneByTag(tagName)
    {
        return this.pushStack(core.findOneByTag(this.nodes, tagName));
    }

});