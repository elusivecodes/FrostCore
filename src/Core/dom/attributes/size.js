Object.assign(Core.prototype, {

    // get the computed height of the first element
    // (and optionally padding, border or margin)
    height(nodes, padding, border, margin)
    {
        let node = Core.nodeFirst(nodes, true, true, true);

        if ( ! node) {
            return;
        }

        if (frost.isWindow(node)) {
            return padding ?
                node.outerHeight :
                node.innerHeight;
        }

        if (Core.isDocument(node)) {
            node = node.documentElement;
        }

        return this.forceShow(node, node => {
            let result = node.clientHeight;

            if ( ! padding) {
                result -= parseInt(this.css(node, 'padding-top')) + parseInt(this.css(node, 'padding-bottom'));
            }

            if (border) {
                result += parseInt(this.css(node, 'border-top-width')) + parseInt(this.css(node, 'border-bottom-width'));
            }

            if (margin) {
                result += parseInt(this.css(node, 'margin-top')) + parseInt(this.css(node, 'margin-bottom'));
            }

            return result;
        });
    },

    // get the computed width of the first element
    // (and optionally padding, border or margin)
    width(nodes, padding, border, margin)
    {
        let node = Core.nodeFirst(nodes, true, true, true);

        if ( ! node) {
            return;
        }

        if (frost.isWindow(node)) {
            return padding ?
                node.outerWidth :
                node.innerWidth;
        }

        if (Core.isDocument(node)) {
            node = node.documentElement;
        }

        return this.forceShow(node, node => {
            let result = node.clientWidth;

            if ( ! padding) {
                result -= parseInt(this.css(node, 'padding-left')) + parseInt(this.css(node, 'padding-right'));
            }

            if (border) {
                result += parseInt(this.css(node, 'border-left-width')) + parseInt(this.css(node, 'border-right-width'));
            }

            if (margin) {
                result += parseInt(this.css(node, 'margin-left')) + parseInt(this.css(node, 'margin-right'));
            }

            return result;
        });
    }

});