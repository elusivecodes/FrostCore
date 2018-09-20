Object.assign(QuerySet.prototype, {

    // add a class or classes to each element
    addClass(...classes)
    {
        core.addClass(this.nodes, ...classes);
        return this;
    },

    // get the computed style for the first element
    css(style)
    {
        return core.css(this.nodes, style);
    },

    // get a style property for the first element
    getStyle(style)
    {
        return core.getStyle(this.nodes, style);
    },

    // hide each element from display
    hide(duration = 0)
    {
        if (duration > 0) {
            return this.fadeOut(duration).queue(node => core.hide(node));
        }

        core.hide(this.nodes);
        return this;
    },

    // remove a class or classes from each element
    removeClass(...classes)
    {
        core.removeClass(this.nodes, ...classes);
        return this;
    },

    // set style properties for each element
    setStyle(style, value)
    {
        core.setStyle(this.nodes, style, value);
        return this;
    },

    // display each hidden element
    show(duration = 0)
    {
        if (duration > 0) {
            return this.queue(node => {
                core.show(nodes);
                core.fadeIn(node, duration);
            });
        }

        core.show(this.nodes);
        return this;
    },

    // toggle the visibility of each element
    toggle()
    {
        core.toggle(this.nodes);
        return this;
    },

    // toggle a class or classes for each element
    toggleClass(...classes)
    {
        core.toggleClass(this.nodes, ...classes);
        return this;
    }

});