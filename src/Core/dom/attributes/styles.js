Object.assign(Core.prototype, {

    // add a class or classes to each element
    addClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        Core.nodeArray(nodes)
            .forEach(node => node.classList.add(...classes));
    },

    // get the computed style for the first element
    css(nodes, style)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return window.getComputedStyle(node)[style];
    },

    // get a style property for the first element
    getStyle(nodes, style)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return node.style[style];
    },

    // hide each element from display
    hide(nodes)
    {
        this.setStyle(nodes, 'display', 'none');
    },

    // remove a class or classes from each element
    removeClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        Core.nodeArray(nodes)
            .forEach(node => node.classList.remove(...classes));
    },

    // set style properties for each element
    setStyle(nodes, style, value)
    {
        // if style value is an object, loop through and set all values
        if (frost.isObject(style)) {
            Object.keys(style).forEach(key => this.setStyle(nodes, key, style[key]));
            return;
        }

        // camelize style property
        style = frost.camelCase(style);

        // convert value to string
        value = '' + value;

        // if value is numeric and not a number property, add px
        if (value && frost.isNumeric(value) && ! Core.cssNumberProperties.includes(style)) {
            value = value + 'px';
        }

        Core.nodeArray(nodes)
            .forEach(node => {
                node.style[style] = value;
            });
    },

    // display each hidden element
    show(nodes)
    {
        this.setStyle(nodes, 'display', '');
    },

    // toggle the visibility of each element
    toggle(nodes)
    {
        Core.nodeArray(nodes)
            .forEach(node =>
                this.getStyle(node, 'display') === 'none' ?
                    this.show(node) :
                    this.hide(node)
            );
    },

    // toggle a class or classes for each element
    toggleClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        Core.nodeArray(nodes)
            .forEach(node => classes.forEach(className => node.classList.toggle(className)));
    }

});