Object.assign(Core.prototype, {

    // force an element to be shown, and then execute a callback
    forceShow(nodes, callback)
    {
        const node = Core.nodeFirst(nodes, true, true, true);

        if ( ! node) {
            return;
        }

        if (this.isVisible(node)) {
            return callback(node);
        }

        const elements = [];
        const styles = [];

        if (this.css(node, 'display') === 'none') {
            elements.push(node);
            styles.push(this.getStyle(node, 'display'));
        }

        this.parents(node, parent => this.css(parent, 'display') === 'none')
            .forEach(parent => {
                elements.push(parent);
                styles.push(this.getStyle(parent, 'display'));
            });

        this.setStyle(elements, 'display', 'initial !important');

        const result = callback(node);

        elements.forEach((element, index) => this.setStyle(element, 'display', styles[index]));

        return result;
    },

    // get the index of the first element matching a filter
    index(nodes, filter)
    {
        filter = Core.parseFilter(filter);

        return Core.nodeArray(nodes)
            .findIndex(node => ! filter || filter(node));
    },

    // get the index of the first element relative to it's parent element
    indexOf(nodes)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return this.children(this.parent(node)).indexOf(node);
    },

    // create a selection on the first node
    select(nodes)
    {
        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        const node = Core.nodeFirst(nodes, false);

        if ( ! node) {
            return;
        }

        const range = this.context.createRange();
        range.selectNode(node);
        selection.addRange(range);
    },

    // create a selection on all nodes
    selectAll(nodes)
    {
        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        Core.nodeArray(nodes, false)
            .forEach(node => {
                const range = this.context.createRange();
                range.selectNode(node);
                selection.addRange(range);
            });
    },

    // returns a serialized string containing names and values of all form elements
    serialize(nodes)
    {
        return Core.parseParams(this.serializeObject(nodes));
    },

    // returns a serialized array containing names and values of all form elements
    serializeArray(nodes)
    {
        const values = this.serializeObject(nodes);
        return Object.keys(values)
            .map(name => {
                return {
                    name,
                    value: values[name]
                };
            });
    },

    // returns an object containing keys and values of all form elements
    serializeObject(nodes)
    {
        return Core.nodeArray(nodes)
            .reduce((values, node) => {
                if (node.matches('form')) {
                    Object.assign(values, this.serializeObject(core.find(node, 'input, select, textarea')));
                    return;
                }

                if (node.matches('[disabled], input[type=submit], input[type=reset], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                    return;
                }

                const name = core.getAttribute(node, 'name');
                const value = core.getValue(node);

                if (name.substring(-2) === '[]') {
                    if ( ! values[name]) {
                        values[name] = [];
                    }

                    values[name].push(value);
                } else {
                    values[name] = value;
                }
            }, {});
    }

});