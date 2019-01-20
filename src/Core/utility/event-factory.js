Object.assign(Core.prototype, {

    // create a self regenerating event that will execute once per animation frame
    animationEventFactory(callback)
    {
        let updating = false;

        return e =>
        {
            if (updating) {
                return;
            }

            updating = true;
            window.requestAnimationFrame(() =>
            {
                callback(e);
                updating = false;
            });
        };
    },

    // create a mouse drag event (optionally limited by animation frame)
    mouseDragFactory(down, move, up, animated = true)
    {
        if (move && animated) {
            move = this.animationEventFactory(move);
        }

        return e =>
        {
            if (down && down(e) === false) {
                return;
            }

            if (move) {
                this.addEvent(window, 'mousemove', move);
            }

            this.addEventOnce(window, 'mouseup', e =>
            {
                // needed to make sure up callback runs after move callback
                window.requestAnimationFrame(() =>
                {
                    if (move) {
                        this.removeEvent(window, 'mousemove', move);
                    }

                    if (up) {
                        up(e);
                    }
                });
            });
        };
    },

    // create a delegated event
    _delegateFactory(node, selectors, callback)
    {
        const getDelegate = Core.isSelectorComplex(selectors) ?
            this._getDelegateContainsFactory(node, selectors) :
            this._getDelegateMatchFactory(node, selectors);

        return e =>
        {
            if (e.target.isSameNode(node)) {
                return;
            }

            const delegate = getDelegate(e.target);

            if (!delegate) {
                return;
            }

            e.delegateTarget = delegate;

            return callback(e);
        };
    },

    // returns a function for matching a delegate target to a complex selector
    _getDelegateContainsFactory(node, selector)
    {
        return target =>
        {
            const matches = this.find(node, selector);
            if (!matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return this.closest(target, parent => matches.contains(parent), node);
        };
    },

    // returns a function for matching a delegate target to a simple selector
    _getDelegateMatchFactory(node, selector)
    {
        return target =>
        {
            return target.matches(selector) ?
                target :
                this.closest(target, parent => parent.matches(selector), node);
        };
    },

    // create a self-destructing event
    _selfDestructFactory(node, event, callback)
    {
        const realCallback = e =>
        {
            this.removeEvent(node, event, realCallback);
            return callback(e);
        };

        return realCallback;
    }

});