Object.assign(Core.prototype, {

    // get an attribute value for the first element
    getAttribute(nodes, attribute)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return node.getAttribute(attribute);
    },

    // get a dataset value for the first element
    getDataset(nodes, key)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        if ( ! key) {
            return node.dataset;
        }

        return node.dataset[key];
    },

    // get the HTML contents of the first element
    getHTML(nodes)
    {
        return this.getProp(nodes, 'innerHTML');
    },

    // get a property value for the first element
    getProp(nodes, prop)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return node[prop];
    },

    // get the text contents of the first element
    getText(nodes)
    {
        return this.getProp(nodes, 'innerText');
    },

    // get the value property of the first element
    getValue(nodes)
    {
        return this.getProp(nodes, 'value');
    },

    // remove an attribute from each element
    removeAttribute(nodes, attribute)
    {
        Core.nodeArray(nodes)
            .forEach(node => node.removeAttribute(attribute));
    },

    // remove a property from each element
    removeProp(nodes, prop)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                delete node[prop];
            });
    },

    // set attributes for each element
    setAttribute(nodes, attribute, value)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                if (frost.isObject(attribute)) {
                    Object.keys(attribute).forEach(key => node[key] = attribute[key]);
                    return;
                }

                node.setAttribute(attribute, value);
            });
    },

    // set dataset values for each element
    setDataset(nodes, key, value)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                node.dataset[key] = value;
            });
    },

    // set the HTML contents for each element
    setHTML(nodes, html)
    {
        this.empty(nodes);
        this.setProp(nodes, 'innerHTML', html);
    },

    // set property values for each element
    setProp(nodes, property, value)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                if (frost.isObject(property)) {
                    Object.keys(property).forEach(key => node[key] = property[key]);
                    return;
                }

                node[property] = value;
            });
    },

    // set the text contents for each element
    setText(nodes, text)
    {
        this.empty(nodes);
        this.setProp(nodes, 'innerText', text);
    },

    // set the value property for each element
    setValue(nodes, value)
    { 
        this.setProp(nodes, 'value', value);
    }

});