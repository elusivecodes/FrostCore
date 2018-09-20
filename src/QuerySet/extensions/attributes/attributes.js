Object.assign(QuerySet.prototype, {

    // get an attribute value for the first element
    getAttribute(attribute)
    {
        return core.getAttribute(this.nodes, attribute);
    },

    // get a dataset value for the first element
    getDataset(key)
    {
        return core.getDataset(this.nodes, key);
    },

    // get the HTML contents of the first element
    getHTML()
    {
        return core.getHTML(this.nodes);
    },

    // get a property value for the first element
    getProp(property)
    {
        return core.getAttribute(this.nodes, property);
    },

    // get the text contents of the first element
    getText()
    {
        return core.getText(this.nodes);
    },

    // get the value property of the first element
    getValue()
    {
        return core.getValue(this.nodes);
    },

    // remove an attribute from each element
    removeAttribute(attribute)
    {
        core.removeAttribute(this.nodes, attribute);
        return this;
    },

    // remove a property from each element
    removeProp(property)
    {
        core.removeProp(this.nodes, property);
        return this;
    },

    // set attributes for each element
    setAttribute(attribute, value)
    {
        core.setAttribute(this.nodes, attribute, value);
        return this;
    },

    // set dataset values for each element
    setDataset(key, value)
    {
        core.setDataset(this.nodes, key, value);
        return this;
    },

    // set the HTML contents for each element
    setHTML(html)
    {
        core.setHTML(this.nodes, html);
        return this;
    },

    // set property values for each element
    setProp(property, value)
    {
        core.setProperty(this.nodes, property, value);
        return this;
    },

    // set the text contents for each element
    setText(text)
    {
        core.setText(this.nodes, text);
        return this;
    },

    // set the value property for each element
    setValue(value)
    {
        core.setValue(this.nodes, value);
        return this;
    }

});