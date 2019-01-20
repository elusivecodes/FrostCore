Object.assign(Core.prototype, {

    // create a new DOM element
    create(tagName, options) {
        const node = this.context.createElement(tagName);

        if (!options) {
            return node;
        }

        if (options.html) {
            this.setHTML(node, options.html);
        } else if (options.text) {
            this.setText(node, options.text);
        }

        if (options.class) {
            this.addClass(node, options.class);
        }

        if (options.style) {
            this.setStyle(node, options.style);
        }

        if (options.value) {
            this.setValue(node, options.value);
        }

        if (options.attributes) {
            this.setAttribute(node, options.attributes);
        }

        if (options.properties) {
            this.setProperty(node, options.properties);
        }

        if (options.dataset) {
            this.setDataset(node, options.dataset);
        }

        return node;
    },

    // create a new comment node
    createComment(comment) {
        return this.context.createComment(comment);
    },

    // create a new text node
    createText(text) {
        return this.context.createTextNode(text);
    }

});