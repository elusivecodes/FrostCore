Object.assign(Core.prototype, {

    /* ATTRIBUTES */

    // get an attribute value for the first element
    getAttribute(nodes, attribute)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return node.getAttribute(attribute);
    },

    // set attributes for each element
    setAttribute(nodes, attribute, value)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                if (Core.isObject(attribute)) {
                    Object.keys(attribute)
                        .forEach(key => node.setAttribute(key, attribute[key]));
                    return;
                }

                node.setAttribute(attribute, value);
            });
    },

    // remove an attribute from each element
    removeAttribute(nodes, attribute)
    {
        this.nodeArray(nodes)
            .forEach(node => node.removeAttribute(attribute));
    },

    /* DATASET */

    // get a dataset value for the first element
    getDataset(nodes, key)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        if ( ! key) {
            return node.dataset;
        }

        return node.dataset[key];
    },

    // set dataset values for each element
    setDataset(nodes, key, value)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                node.dataset[key] = value;
            });
    },

    /* HTML */

    // get the HTML contents of the first element
    getHTML(nodes)
    {
        return this.getProperty(nodes, 'innerHTML');
    },

    // set the HTML contents for each element
    setHTML(nodes, html)
    {
        this.empty(nodes);
        this.setProperty(nodes, 'innerHTML', html);
    },

    /* PROPERTIES */

    // get a property value for the first element
    getProperty(nodes, property)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return node[property];
    },

    // set property values for each element
    setProperty(nodes, property, value)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                if (Core.isObject(property)) {
                    Object.keys(property).forEach(key => node[key] = property[key]);
                    return;
                }

                node[property] = value;
            });
    },

    // remove a property from each element
    removeProperty(nodes, property)
    {
        this.nodeArray(nodes)
            .forEach(node => {
                delete node[property];
            });
    },

    /* TEXT */

    // get the text contents of the first element
    getText(nodes)
    {
        return this.getProperty(nodes, 'innerText');
    },

    // set the text contents for each element
    setText(nodes, text)
    {
        this.empty(nodes);
        this.setProperty(nodes, 'innerText', text);
    },

    /* VALUE */

    // get the value property of the first element
    getValue(nodes)
    {
        return this.getProperty(nodes, 'value');
    },

    // set the value property for each element
    setValue(nodes, value)
    { 
        this.setProperty(nodes, 'value', value);
    }

});