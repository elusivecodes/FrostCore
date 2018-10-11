Object.assign(Core.prototype, {

    // scroll each element to an X,Y position
    setScroll(nodes, x, y)
    {
        this.nodeArray(nodes, true, true, true)
            .forEach(node => {
                if (Core.isWindow(node)) {
                    node.scroll(x, y);
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollLeft = x;
                    node.scrollingElement.scrollTop = y;
                } else if (Core.isElement(node)) {
                    node.scrollLeft = x;
                    node.scrollTop = y;
                }
            });
    },

    // scroll each element to an X position
    setScrollX(nodes, x)
    {
        this.nodeArray(nodes, true, true, true)
            .forEach(node => {
                if (Core.isWindow(node)) {
                    node.scroll(x, node.scrollY)
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollLeft = x;
                } else if (Core.isElement(node)) {
                    node.scrollLeft = x;
                }
            });
    },

    // scroll each element to a Y position
    setScrollY(nodes, y)
    {
        this.nodeArray(nodes, true, true, true)
            .forEach(node => {
                if (Core.isWindow(node)) {
                    node.scroll(node.scrollX, y)
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollTop = y;
                } else if (Core.isElement(node)) {
                    node.scrollTop = y;
                }
            });
    },

    // get the scroll X position of the first element
    getScrollX(nodes)
    {
        let node = this.nodeFirst(nodes, true, true, true);

        if ( ! node) {
            return;
        }

        if (Core.isWindow(node)) {
            return node.scrollX;
        }

        if (Core.isDocument(node)) {
            node = node.scrollingElement;
        }

        return node.scrollLeft;
    },

    // get the scroll Y position of the first element
    getScrollY(nodes)
    {
        let node = this.nodeFirst(nodes, true, true, true);

        if ( ! node) {
            return;
        }

        if (Core.isWindow(node)) {
            return node.scrollY;
        }

        if (Core.isDocument(node)) {
            node = node.scrollingElement;
        }

        return node.scrollTop;
    }

});