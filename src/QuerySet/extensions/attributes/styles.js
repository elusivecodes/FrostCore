Object.assign(QuerySet.prototype, {

    // add a class or classes to each element
    addClass(...classes)
    {
        this.core.addClass(this.nodes, ...classes);
        return this;
    },

    // get the computed style for the first element
    css(style)
    {
        return this.core.css(this.nodes, style);
    },

    // get a style property for the first element
    getStyle(style)
    {
        return this.core.getStyle(this.nodes, style);
    },

    // hide each element from display
    hide(duration = 0)
    {
        if (duration > 0) {
            return this.fadeOut(duration).queue(node => this.core.hide(node));
        }

        this.core.hide(this.nodes);
        return this;
    },

    // remove a class or classes from each element
    removeClass(...classes)
    {
        this.core.removeClass(this.nodes, ...classes);
        return this;
    },

    // set style properties for each element
    setStyle(style, value)
    {
        this.core.setStyle(this.nodes, style, value);
        return this;
    },

    // display each hidden element
    show(duration = 0)
    {
        if (duration > 0) {
            return this.queue(node => {
                this.core.show(nodes);
                this.core.fadeIn(node, duration);
            });
        }

        this.core.show(this.nodes);
        return this;
    },

    // toggle the visibility of each element
    toggle()
    {
        this.core.toggle(this.nodes);
        return this;
    },

    // toggle a class or classes for each element
    toggleClass(...classes)
    {
        this.core.toggleClass(this.nodes, ...classes);
        return this;
    }

});