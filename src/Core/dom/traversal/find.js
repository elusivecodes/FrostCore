Object.assign(Core.prototype, {

    // find all elements matching a selector
    find(nodes, selectors)
    {
        if ( ! selectors) {
            selectors = nodes;
            nodes = this.context;
        }

        const [type, value] = Core.parseSelector(selectors);
 
        if (type === '#') {
            return this.findById(nodes, value);
        }

        if (type === '.') {
            return this.findByClass(nodes, value);
        }

        if (type) {
            return this.findByTag(nodes, value);
        }

        if (Core.isSelectorComplex(selectors)) {
            return this._findByCustom(nodes, selectors);
        }

        return this.findSelector(nodes, selectors);
    },

    // find a single element matching a selector
    findOne(nodes, selectors)
    {
        if ( ! selectors) {
            selectors = nodes;
            nodes = this.context;
        }

        const [type, value] = Core.parseSelector(selectors);
 
        if (type === '#') {
            return this.findOneById(nodes, value);
        }

        if (type === '.') {
            return this.findOneByClass(nodes, value);
        }

        if (type) {
            return this.findOneByTag(nodes, value);
        }

        if (Core.isSelectorComplex(selectors)) {
            return this._findOneByCustom(nodes, selectors);
        }

        return this.findOneSelector(nodes, selectors);
    },

    // find all elements with a specific class
    findByClass(nodes, className)
    {
        if ( ! className) {
            className = nodes;
            nodes = this.context;
        }

        const results = new Set;

        this.nodeArray(nodes, true, true)
            .forEach(node =>
                Array.from(node.getElementsByClassName(className))
                    .forEach(result => results.add(result))
            );

        return Core.sortNodes([...results]);
    },

    // find the first element with a specific class
    findOneByClass(nodes, className)
    {
        return this.findByClass(nodes, className).shift() || null;
    },

    // find all elements with a specific ID
    findById(nodes, id)
    {
        return this.findSelector(nodes, '#' + id);
    },

    // find the first element with a specific ID
    findOneById(nodes, id)
    {
        if ( ! id) {
            id = nodes;
            nodes = this.context;
        }

        const results = new Set;

        this.nodeArray(nodes, true, true)
            .forEach(node => results.add(node.getElementById(id)));

        return Core.sortNodes([...results].filter(node => !! node)).shift() || null;
    },

    // find all elements with a specific tag
    findByTag(nodes, tagName)
    {
        if ( ! tagName) {
            tagName = nodes;
            nodes = this.context;
        }

        const results = new Set;

        this.nodeArray(nodes, true, true)
            .forEach(node =>
                Array.from(node.getElementsByTagName(tagName))
                    .forEach(result => results.add(result))
            );

        return Core.sortNodes([...results]);
    },

    // find the first element with a specific tag
    findOneByTag(nodes, tagName)
    {
        return this.findByTag(nodes, tagName).shift() || null;
    },

    // find all elements matching a standard CSS selector
    findSelector(nodes, selector)
    {
        const results = new Set;

        this.nodeArray(nodes, true, true)
            .forEach(node =>
                Array.from(node.querySelectorAll(selector))
                    .forEach(result => results.add(result))
            );

        return Core.sortNodes([...results]);
    },

    // find the first element matching a standard CSS selector
    findOneSelector(nodes, selector)
    {
        const results = new Set;

        this.nodeArray(nodes, true, true)
            .forEach(node => results.add(node.querySelector(selector)));

        return Core.sortNodes([...results].filter(node => !! node)).shift() || null;
    },

    // find all elements matching a custom CSS selector
    _findByCustom(nodes, selectors)
    {
        const results = new Set;

        Core.parseSelectors(selectors)
            .forEach(selector => {
                const [type, value] = selector;
                let selectorNodes = [];

                if (type === '#') {
                    selectorNodes = this.findById(nodes, value);
                } else if (type === '.') {
                    selectorNodes = this.findByClass(nodes, value);
                } else if (type === true) {
                    selectorNodes = this.findByTag(nodes, value);
                } else if ( ! type) {
                    selectorNodes = this.findSelector(nodes, value);

                // special cases
                } else if (['>', '+', '~'].includes(type)) {
                    const [filter, query] = Core.parseSubQuery(value);

                    // node child
                    if (type === '>') {
                        selectorNodes = this.children(nodes, filter);

                    // node next
                    } else if (type === '+') {
                        selectorNodes = this.next(nodes, filter);

                    // node after
                    } else if (type === '~') {
                        selectorNodes = this.nextAll(nodes, filter);
                    }

                    if (selectorNodes.length && query) {
                        selectorNodes = this.find(selectorNodes, query);
                    }
                }

                selectorNodes.forEach(node => results.add(node));
            });

        return Core.sortNodes([...results]);
    },

    // find the first element matching a custom CSS selector
    _findOneByCustom(nodes, selectors)
    {
        const results = new Set;

        Core.parseSelectors(selectors)
            .forEach(selector => {
                const [type, value] = selector;
                let selectorNode;

                if (type === '#') {
                    selectorNode = this.findOneById(nodes, value);
                } else if (type === '.') {
                    selectorNode = this.findOneByClass(nodes, value);
                } else if (type === true) {
                    selectorNode = this.findOneByTag(nodes, value);
                } else if ( ! type) {
                    selectorNode = this.findOneSelector(nodes, value);

                // special cases
                } else if (['>', '+', '~'].includes(type)) {
                    const [filter, query] = Core.parseSubQuery(value);

                    // node child
                    if (type === '>') {
                        selectorNode = this.child(nodes, filter);
                    // node next
                    } else if (type === '+') {
                        selectorNode = this.next(nodes, filter);
                    // node after
                    } else if (type === '~') {
                        selectorNode = this.nextAll(nodes, filter, false, true);
                    }

                    if (results.length && query) {
                        selectorNode = this.findOne(selectorNode, query);
                    }

                    selectorNode = this.nodeArray(selectorNode).shift();
                }

                if (selectorNode) {
                    results.add(selectorNode);
                }
            });

        return Core.sortNodes([...results]).shift() || null;
    }

});