Object.assign(Core.prototype, {

    // create a self regenerating event that will execute once per animation frame
    animationEventFactory(node, event, callback)
    {
        callback = this.selfDestructFactory(node, event, callback);

        const realCallback = e => {
            callback(e);
            window.requestAnimationFrame(() => this.addEventOnce(node, event, realCallback));
        };

        return realCallback;
    },

    // create a delegated event
    delegateFactory(node, selectors, callback)
    {
        const getDelegate = Core.isSelectorComplex(selectors) ?
            this.getDelegateContainsFactory(node, selectors) :
            this.getDelegateMatchFactory(node, selectors);

        return e => {
            if (e.target.isSameNode(node)) {
                return;
            }

            const delegate = getDelegate(e.target);

            if ( ! delegate) {
                return;
            }

            e.delegateTarget = delegate;

            return callback(e);
        };
    },

    getDelegateContainsFactory(node, selector)
    {
        return target => {
            const matches = this.find(node, selector);
            if ( ! matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return this.closest(target, parent => matches.contains(parent), node);
        };
    },

    getDelegateMatchFactory(node, selector)
    {
        return target => {
            return target.matches(selector) ?
                target :
                this.closest(target, parent => parent.matches(selector), node);
        };
    },

    // create a mouse drag event (optionally limited by animation frame)
    mouseDragFactory(down, move, up, animated = true)
    {
        if (move && animated) {
            move = this.animationEventFactory(window, 'mousemove', move);
        }

        return e => {
            if (down && down(e) === false) {
                return;
            }

            if (move) {
                this.addEvent(window, 'mousemove', move);
            }

            this.addEventOnce(window, 'mouseup', e => {
                if (move) {
                    this.removeEvent(window, 'mousemove', move);
                }

                if (up) {
                    up(e);
                }
            });
        };
    },

    // create a self-destructing event
    selfDestructFactory(node, event, callback)
    {
        const realCallback = e => {
            this.removeEvent(node, event, realCallback);
            return callback(e);
        };

        return realCallback;
    }

});