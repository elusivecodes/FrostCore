Object.assign(Core.prototype, {

    // get the X,Y co-ordinates for the center of the first element (optionally offset)
    center(nodes, offset)
    {
        const nodeBox = this.rect(nodes, offset);

        if ( ! nodeBox) {
            return;
        }

        return {
            x: nodeBox.left + nodeBox.width / 2,
            y: nodeBox.top + nodeBox.height / 2
        };
    },

    // get the position of the first element relative to the window (optionally offset)
    position(nodes, offset)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return this.forceShow(node, node => {
            const result = {
                x: node.offsetLeft,
                y: node.offsetTop
            };

            if (offset) {
                const parentPosition = this.position(this.offsetParent(node), true);
                if (parentPosition) {
                    result.x += parentPosition.x;
                    result.y += parentPosition.y;
                }
            }

            return result;
        });
    },

    // get the computed bounding rectangle of the first element
    rect(nodes, offset)
    {
        const node = Core.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        return this.forceShow(node, node => {
            const result = node.getBoundingClientRect();

            if (offset) {
                result.x += this.scrollX(window);
                result.y += this.scrollY(window);
            }

            return result;
        });
    },

    // constrain each element to a container element
    constrain(nodes, container)
    {
        const containerBox = this.rect(container);

        if ( ! containerBox) {
            return;
        }

        Core.nodeArray(nodes)
            .forEach(node => {
                const nodeBox = this.rect(node);

                if (nodeBox.height > containerBox.height) {
                    this.setStyle(node, 'height', containerBox.height + 'px');
                }

                if (nodeBox.width > containerBox.width) {
                    this.setStyle(node, 'width', containerBox.width + 'px');
                }

                if (nodeBox.top < containerBox.top) {
                    this.setStyle(node, 'top', containerBox.top);
                }

                if (nodeBox.right > containerBox.right) {
                    this.setStyle(node, 'left', containerBox.right - nodeBox.width);
                }

                if (nodeBox.bottom > containerBox.bottom) {
                    this.setStyle(node, 'top', containerBox.bottom - nodeBox.height);
                }

                if (nodeBox.left < containerBox.left) {
                    this.setStyle(node, 'left', containerBox.left);
                }
            });
    },

    // get the distance of an element to an X,Y position in the window (optionally offset)
    distTo(nodes, x, y, offset)
    {
        const nodeCenter = this.center(nodes, offset);

        if ( ! nodeCenter) {
            return;
        }

        return Core.dist(nodeCenter.x, nodeCenter.y, x, y);
    },

    // get the distance between two elements
    distToNode(nodes, others)
    {
        const otherCenter = this.center(others);

        if ( ! otherCenter) {
            return;
        }

        return this.distTo(nodes, otherCenter.x, otherCenter.y);
    },

    // get the nearest element to an X,Y position in the window (optionally offset)
    nearestTo(nodes, x, y, offset)
    {
        let closest = null;
        let closestDistance = Number.MAX_VALUE;

        Core.nodeArray(nodes)
            .forEach(node => {
                const dist = this.distTo(node, x, y, offset);
                if (dist && dist < closestDistance) {
                    closestDistance = dist;
                    closest = node;
                }
            });

        return closest;
    },

    // get the nearest element to another element
    nearestToNode(nodes, others)
    {
        const otherCenter = this.center(others);

        if ( ! otherCenter) {
            return;
        }

        return this.nearestTo(nodes, otherCenter.x, otherCenter.y);
    },

    // get the percentage of an X co-ordinate relative to an element
    percentX(nodes, x, offset)
    {
        const nodeBox = this.rect(nodes, offset);

        if ( ! nodeBox) {
            return;
        }

        return Core.clampPercent((x - nodeBox.left) / nodeBox.width * 100);
    },

    // get the percentage of a Y co-ordinate relative to an element
    percentY(nodes, y, offset)
    {
        const nodeBox = this.rect(nodes, offset);

        if ( ! nodeBox) {
            return;
        }

        return Core.clampPercent((y - nodeBox.top) / nodeBox.height * 100);
    }

});