Object.assign(Core.prototype, {

    /* CLASSES */

    // add a class or classes to each element
    addClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node => node.classList.add(...classes));
    },

    // remove a class or classes from each element
    removeClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node => node.classList.remove(...classes));
    },

    // toggle a class or classes for each element
    toggleClass(nodes, ...classes)
    {
        classes = Core.parseClasses(classes);

        if ( ! classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node => classes.forEach(className => node.classList.toggle(className)));
    },

    /* STYLES */

    // get a style property for the first element
    getStyle(nodes, style)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        // camelize style property
        style = Core.snakeCase(style);

        return node.style.getPropertyValue(style);
    },

    // set style properties for each element
    setStyle(nodes, style, value, important)
    {
        // if style value is an object, loop through and set all values
        if (Core.isObject(style)) {
            Object.keys(style).forEach(key => this.setStyle(nodes, key, style[key]));
            return;
        }

        // camelize style property
        style = Core.snakeCase(style);

        // convert value to string
        value = '' + value;

        // if value is numeric and not a number property, add px
        if (value && Core.isNumeric(value) && ! Core.cssNumberProperties.includes(style)) {
            value = value + 'px';
        }

        this.nodeArray(nodes)
            .forEach(node =>
                node.style.setProperty(style, value, important ? 'important' : '')
            );
    },

    /* COMPUTED STYLE */

    // get the computed style for the first element
    css(nodes, style)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return window.getComputedStyle(node)[style];
    },

    /* VISIBILITY */

    // hide each element from display
    hide(nodes)
    {
        this.setStyle(nodes, 'display', 'none');
    },

    // display each hidden element
    show(nodes)
    {
        this.setStyle(nodes, 'display', '');
    },

    // toggle the visibility of each element
    toggle(nodes)
    {
        this.nodeArray(nodes)
            .forEach(node =>
                this.getStyle(node, 'display') === 'none' ?
                    this.show(node) :
                    this.hide(node)
            );
    }

});