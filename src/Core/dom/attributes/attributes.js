Object.assign(Core.prototype, {

    // get an attribute value for the first element
    getAttribute(nodes, attribute)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        return node.getAttribute(attribute);
    },

    // set attributes for each element
    setAttribute(nodes, attribute, value)
    {
        const attributes = Core._parseData(attribute, value);
        const keys = Object.keys(attributes);

        this.nodeArray(nodes)
            .forEach(node =>
                keys.forEach(key =>
                    node.setAttribute(
                        key,
                        attributes[key]
                    )
                )
            );
    },

    // remove an attribute from each element
    removeAttribute(nodes, attribute)
    {
        this.nodeArray(nodes)
            .forEach(node =>
                node.removeAttribute(attribute)
            );
    },

    // get a dataset value for the first element
    getDataset(nodes, key)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        if (!key) {
            return node.dataset;
        }

        return node.dataset[key];
    },

    // set dataset values for each element
    setDataset(nodes, key, value)
    {
        const dataset = Core._parseData(key, value);

        this.nodeArray(nodes)
            .forEach(node =>
                Object.assign(
                    node.dataset,
                    dataset
                )
            );
    },

    // get the HTML contents of the first element
    getHTML(nodes)
    {
        return this.getProperty(
            nodes,
            'innerHTML'
        );
    },

    // set the HTML contents for each element
    setHTML(nodes, html)
    {
        // empty nodes
        this.empty(nodes);

        // set inner html property
        this.setProperty(
            nodes,
            'innerHTML',
            html
        );
    },

    // get a property value for the first element
    getProperty(nodes, property)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        return node[property];
    },

    // set property values for each element
    setProperty(nodes, property, value)
    {
        const properties = Core._parseData(property, value);

        this.nodeArray(nodes)
            .forEach(node =>
                Object.assign(
                    node,
                    properties
                )
            );
    },

    // remove a property from each element
    removeProperty(nodes, property)
    {
        this.nodeArray(nodes)
            .forEach(node =>
            {
                delete node[property];
            });
    },

    // get the text contents of the first element
    getText(nodes)
    {
        return this.getProperty(
            nodes,
            'innerText'
        );
    },

    // set the text contents for each element
    setText(nodes, text)
    {
        // empty nodes
        this.empty(nodes);

        // set inner text property
        this.setProperty(
            nodes,
            'innerText',
            text
        );
    },

    // get the value property of the first element
    getValue(nodes)
    {
        return this.getProperty(
            nodes,
            'value'
        );
    },

    // set the value property for each element
    setValue(nodes, value)
    {
        this.setProperty(
            nodes,
            'value',
            value
        );
    }

});