Object.assign(QuerySet.prototype, {

    // get an attribute value for the first element
    getAttribute(attribute)
    {
        return this.core.getAttribute(this.nodes, attribute);
    },

    // get a dataset value for the first element
    getDataset(key)
    {
        return this.core.getDataset(this.nodes, key);
    },

    // get the HTML contents of the first element
    getHTML()
    {
        return this.core.getHTML(this.nodes);
    },

    // get a property value for the first element
    getProperty(property)
    {
        return this.core.getProperty(this.nodes, property);
    },

    // get the text contents of the first element
    getText()
    {
        return this.core.getText(this.nodes);
    },

    // get the value property of the first element
    getValue()
    {
        return this.core.getValue(this.nodes);
    },

    // remove an attribute from each element
    removeAttribute(attribute)
    {
        this.core.removeAttribute(this.nodes, attribute);
        return this;
    },

    // remove a property from each element
    removeProperty(property)
    {
        this.core.removeProperty(this.nodes, property);
        return this;
    },

    // set attributes for each element
    setAttribute(attribute, value)
    {
        this.core.setAttribute(this.nodes, attribute, value);
        return this;
    },

    // set dataset values for each element
    setDataset(key, value)
    {
        this.core.setDataset(this.nodes, key, value);
        return this;
    },

    // set the HTML contents for each element
    setHTML(html)
    {
        this.core.setHTML(this.nodes, html);
        return this;
    },

    // set property values for each element
    setProperty(property, value)
    {
        this.core.setProperty(this.nodes, property, value);
        return this;
    },

    // set the text contents for each element
    setText(text)
    {
        this.core.setText(this.nodes, text);
        return this;
    },

    // set the value property for each element
    setValue(value)
    {
        this.core.setValue(this.nodes, value);
        return this;
    }

});