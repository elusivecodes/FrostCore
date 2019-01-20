Object.assign(Core.prototype, {

    /* CLASSES */

    // add a class or classes to each element
    addClass(nodes, ...classes)
    {
        classes = Core._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node =>
                node.classList.add(...classes)
            );
    },

    // remove a class or classes from each element
    removeClass(nodes, ...classes)
    {
        classes = Core._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node =>
                node.classList.remove(...classes)
            );
    },

    // toggle a class or classes for each element
    toggleClass(nodes, ...classes)
    {
        classes = Core._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this.nodeArray(nodes)
            .forEach(node =>
                classes.forEach(className =>
                    node.classList.toggle(className)
                )
            );
    },

    /* STYLES */

    // get a style property for the first element
    getStyle(nodes, style)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        // camelize style property
        style = Core.snakeCase(style);

        return node.style[style];
    },

    // set style properties for each element
    setStyle(nodes, style, value, important)
    {
        if (Core.isObject(style)) {
            important = value;
        }

        const styles = Core._parseData(style, value);
        const realStyles = {};

        Object.keys(styles)
            .forEach(key =>
            {
                let value = '' + styles[key];
                key = Core.snakeCase(key);

                // if value is numeric and not a number property, add px
                if (value && Core.isNumeric(value) && !Core.cssNumberProperties.includes(key)) {
                    value = value + 'px';
                }

                realStyles[key] = value;
            });

        important = important ?
            'important' :
            '';

        this.nodeArray(nodes)
            .forEach(node =>
                Object.keys(realStyles)
                    .forEach(style =>
                        node.style.setProperty(
                            style,
                            realStyles[style],
                            important
                        )
                    )
            );
    },

    /* COMPUTED STYLE */

    // get the computed style for the first element
    css(nodes, style)
    {
        const node = this.nodeFirst(nodes);

        if (!node) {
            return;
        }

        if (!this.nodeStyles.has(node)) {
            this.nodeStyles.set(
                node,
                window.getComputedStyle(node)
            );
        }

        return this.nodeStyles.get(node)
            .getPropertyValue(style);
    },

    /* VISIBILITY */

    // hide each element from display
    hide(nodes)
    {
        this.setStyle(
            nodes,
            'display',
            'none'
        );
    },

    // display each hidden element
    show(nodes)
    {
        this.setStyle(
            nodes,
            'display',
            ''
        );
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