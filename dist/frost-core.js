(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

    class Core {

        constructor(context) {
            this.context = context || window.document;

            this.animating = false;
            this.animations = new Map;
            this.queues = new WeakMap;

            this.nodeData = new WeakMap;
            this.nodeEvents = new WeakMap;
            this.nodeStyles = new WeakMap;
        }

        exec(command, showDefaultUI, value = null) {
            return this.context.execCommand(command, showDefaultUI, value);
        }

        // jQuery-like query method,
        // add a function to the ready queue or return a QuerySet (optionally mutable)
        query(query, mutable = true) {
            if (Core.isFunction(query)) {
                return this.ready(query);
            }

            return mutable ?
                new QuerySet(query, this) :
                new QuerySetImmutable(query, this);
        }

    }

    Object.assign(Core.prototype, {

        // add an animation to each element
        animate(nodes, callback, options) {
            options = {
                duration: 1000,
                type: 'ease-in-out',
                ...options
            };

            // get current timestamp for progress calculation
            const start = Date.now();

            // initialize promises array
            const promises = [];

            // loop through nodes
            this.nodeArray(nodes)
                .forEach(node => {

                    // if this is the first animation for the node,
                    // initialize an animation array
                    if (!this.animations.has(node)) {
                        this.animations.set(node, []);
                    }

                    // create promise for the animation
                    const promise = new Promise((resolve, reject) => {

                        // create function for the animation
                        const animation = (stop = false, finish = false) => {

                            // if the node is no longer in the document,
                            // or the animation was stopped and not finished
                            // reject the promise and return false
                            if (!core.contains(this.context, node) || (stop && !finish)) {
                                reject(node);
                                return true;
                            }

                            // calculate the progress
                            let progress;
                            if (finish) {
                                progress = 1;
                            } else {
                                progress = (Date.now() - start) / options.duration;

                                if (options.infinite) {
                                    progress %= 1;
                                } else {
                                    progress = Core.clamp(progress);
                                }

                                if (options.type === 'ease-in') {
                                    progress = Math.pow(progress, 2);
                                } else if (options.type === 'ease-out') {
                                    progress = Math.sqrt(progress);
                                } else if (options.type === 'ease-in-out') {
                                    if (progress <= 0.5) {
                                        progress = Math.pow(progress, 2) * 2;
                                    } else {
                                        progress = 1 - ((1 - progress) ** 2 * 2);
                                    }
                                }
                            }

                            // run the animation callback
                            callback(node, progress);

                            // if the animation is complete,
                            // resolve the promise and return false
                            if (progress === 1) {
                                resolve(node);
                                return true;
                            }
                        };

                        // push the animation to the animations array
                        this.animations.get(node)
                            .push(animation);
                    });

                    // push the promise to the promises array
                    promises.push(promise);
                });

            // if we have animations, and are not already animating
            // start the animation
            if (promises.length && !this.animating) {
                this.animating = true;
                this._animationFrame();
            }

            // return all promises
            return Promise.all(promises);
        },

        // stop all animations for each element
        stop(nodes, finish = true) {
            // loop through nodes
            this.nodeArray(nodes)
                .forEach(node => {

                    // if no animations exist for the node, return
                    if (!this.animations.has(node)) {
                        return;
                    }

                    // loop through the animations and run the callback
                    this.animations.get(node)
                        .forEach(animation =>
                            animation(true, finish)
                        );

                    // remove node from animations
                    this.animations.delete(node);
                });
        },

        // run a single frame of all animations, and then queue up the next frame
        _animationFrame() {
            // initialize complete nodes array
            const completeNodes = [];

            // loop through animations
            this.animations.forEach((animations, node) => {

                // initialize complete animations array
                const completeAnimations = [];

                // loop through node animations
                animations.forEach((animation, index) => {
                    // if the animation is complete,
                    // push index to complete animations
                    if (animation()) {
                        completeAnimations.push(index);
                    }
                });

                // if we have no complete animations, return
                if (!completeAnimations.length) {
                    return;
                }

                // filter complete animations from the node animations array
                animations = animations.filter((animation, index) =>
                    !completeAnimations.includes(index)
                );

                // if we have no remaining animations, push the node to complete nodes
                if (!animations.length) {
                    completeNodes.push(node);
                }
            });

            // loop through complete nodes and delete from animations
            completeNodes.forEach(node =>
                this.animations.delete(node)
            );

            // if we have remaining animations, queue up the next frame,
            // otherwise, set animating to false
            if (this.animations.size) {
                window.requestAnimationFrame(() =>
                    this._animationFrame()
                );
            }
            else {
                this.animating = false;
            }
        }

    });

    Object.assign(Core.prototype, {

        // slide each element in from the top over a duration
        dropIn(nodes, options) {
            return this.slideIn(
                nodes,
                {
                    dir: 'top',
                    ...options
                }
            );
        },

        // slide each element out to the top over a duration
        dropOut(nodes, options) {
            return this.slideOut(
                nodes,
                {
                    dir: 'top',
                    ...options
                }
            );
        },

        // fade the opacity of each element in over a duration
        fadeIn(nodes, options) {
            return this.animate(
                nodes,
                (node, progress) =>
                    this.setStyle(
                        node,
                        'opacity',
                        progress < 1 ?
                            progress :
                            ''
                    ),
                options
            );
        },

        // fade the opacity of each element out over a duration
        fadeOut(nodes, options) {
            return this.animate(
                nodes,
                (node, progress) =>
                    this.setStyle(
                        node,
                        'opacity',
                        progress < 1 ?
                            1 - progress :
                            ''
                    ),
                options
            );
        },

        // rotate each element in on an x,y over a duration
        rotateIn(nodes, options) {
            options = {
                x: 0,
                y: 1,
                ...options
            };

            return this.animate(
                nodes,
                (node, progress) =>
                    this.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(90 - (progress * 90)) * (options.inverse ? -1 : 1)}deg)` :
                            ''
                    ),
                options
            );
        },

        // rotate each element out on an x,y over a duration
        rotateOut(nodes, options) {
            options = {
                x: 0,
                y: 1,
                ...options
            };

            return this.animate(
                nodes,
                (node, progress) =>
                    this.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(progress * 90) * (options.inverse ? -1 : 1)}deg)` :
                            ''
                    ),
                options
            );
        },

        // slide each element into place from a direction over a duration
        slideIn(nodes, options) {
            options = {
                dir: 'bottom',
                ...options
            };

            return this.animate(
                nodes,
                (node, progress) => {
                    let axis, size, inverse;

                    if (progress < 1) {
                        const dir = Core.isFunction(options.dir) ?
                            options.dir() :
                            options.dir;

                        if (dir === 'top' || dir === 'bottom') {
                            axis = 'Y';
                            size = this.height(node);
                            inverse = dir === 'top';
                        }
                        else {
                            axis = 'X';
                            size = this.width(node);
                            inverse = dir === 'left';
                        }
                    }

                    this.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `translate${axis}(${
                            Math.round(
                                size
                                - (size * progress)
                            )
                            * (inverse ?
                                -1 :
                                1
                            )
                            }px)` :
                            ''
                    );
                },
                options
            );
        },

        // slide each element out of place to a direction over a duration
        slideOut(nodes, options) {
            options = {
                dir: 'bottom',
                ...options
            };

            return this.animate(
                nodes,
                (node, progress) => {
                    let axis, size, inverse;

                    if (progress < 1) {
                        const dir = Core.isFunction(options.dir) ?
                            options.dir() :
                            options.dir;

                        if (dir === 'top' || dir === 'bottom') {
                            axis = 'Y';
                            size = this.height(node);
                            inverse = dir === 'top';
                        }
                        else {
                            axis = 'X';
                            size = this.width(node);
                            inverse = dir === 'left';
                        }
                    }

                    this.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `translate${axis}(${
                            Math.round(
                                size * progress
                            )
                            * (inverse ?
                                -1 :
                                1
                            )
                            }px)` :
                            ''
                    );
                },
                options
            );
        },

        // squeeze each element into place from a direction over a duration
        squeezeIn(nodes, options) {
            options = {
                dir: 'bottom',
                ...options
            };

            const wrapper = this.create('div', {
                style: {
                    overflow: 'hidden',
                    position: 'relative'
                }
            });

            const animations = [];

            this.nodeArray(nodes)
                .forEach(node => {
                    this.wrap(node, wrapper);
                    const parent = this.parent(node);

                    animations.push(
                        this.animate(
                            node,
                            (node, progress) => {
                                if (progress === 1) {
                                    this.before(parent, this.contents(parent));
                                    this.remove(parent);
                                    return;
                                }

                                const dir = Core.isFunction(options.dir) ?
                                    options.dir() :
                                    options.dir;

                                let sizeStyle, translateStyle;
                                if (dir === 'top' || dir === 'bottom') {
                                    sizeStyle = 'height';
                                    if (dir === 'top') {
                                        translateStyle = 'Y';
                                    }
                                } else if (dir === 'left' || dir === 'right') {
                                    sizeStyle = 'width';
                                    if (dir === 'left') {
                                        translateStyle = 'X';
                                    }
                                }

                                const size = Math.round(this[sizeStyle](node, true));
                                const amount = Math.round(size * progress);

                                const styles = {
                                    [sizeStyle]: amount
                                };
                                if (translateStyle) {
                                    styles.transform = `translate${translateStyle}(${size - amount}px)`;
                                }
                                core.setStyle(parent, styles);
                            },
                            duration,
                            'ease-in-out'
                        )
                    );
                });

            return Promise.all(animations);
        },

        // squeeze each element out of place to a direction over a duration
        squeezeOut(nodes, options) {
            options = {
                dir: 'bottom',
                ...options
            };

            const wrapper = this.create('div', {
                style: {
                    overflow: 'hidden',
                    position: 'relative'
                }
            });

            const animations = [];

            this.nodeArray(nodes)
                .forEach(node => {
                    this.wrap(node, wrapper);
                    const parent = this.parent(node);

                    animations.push(
                        this.animate(
                            node,
                            (node, progress) => {
                                if (progress === 1) {
                                    this.before(parent, this.contents(parent));
                                    this.remove(parent);
                                    return;
                                }

                                const dir = Core.isFunction(options.dir) ?
                                    options.dir() :
                                    options.dir;

                                let sizeStyle, translateStyle;
                                if (dir === 'top' || dir === 'bottom') {
                                    sizeStyle = 'height';
                                    if (dir === 'top') {
                                        translateStyle = 'Y';
                                    }
                                }
                                else if (dir === 'left' || dir === 'right') {
                                    sizeStyle = 'width';
                                    if (dir === 'left') {
                                        translateStyle = 'X';
                                    }
                                }

                                const size = Math.round(this[sizeStyle](node, true));
                                const amount = Math.round(size - (size * progress));

                                const styles = {
                                    [sizeStyle]: amount
                                };
                                if (translateStyle) {
                                    styles.transform = `translate${translateStyle}(${size - amount}px)`;
                                }
                                core.setStyle(parent, styles);
                            },
                            duration,
                            'ease-in-out'
                        )
                    );
                });

            return Promise.all(animations);
        }

    });

    Object.assign(Core.prototype, {

        // queue a callback on each element
        queue(nodes, callback)
        {
            // loop through nodes
            this.nodeArray(nodes)
                .forEach(node =>
                {
                    // test if node has a new queue
                    const newQueue = ! this.queues.has(node);

                    // if it's a new queue,
                    // initialize an empty array in the queue
                    if (newQueue)
                    {
                        this.queues.set(node, []);
                    }

                    // push the callback to the queue
                    this.queues.get(node)
                        .push(callback);

                    // if it's a new queue,
                    // dequeue the node
                    if (newQueue)
                    {
                        this._dequeue(node);
                    }
                });
        },

        // clear the queue of each element
        clearQueue(nodes)
        {
            // loop through nodes
            this.nodeArray(nodes)
                .forEach(node =>
                    this.queues.has(node) &&
                    this.queues.delete(node)
                );
        },

        // run the next queued callback for each element
        _dequeue(nodes)
        {
            // loop through nodes
            this.nodeArray(nodes)
                .forEach(node =>
                {
                    // if node doesn't have a queue, return
                    if ( ! this.queues.has(node))
                    {
                        return;
                    }

                    // get next item in queue
                    const next = this.queues.get(node).shift();

                    // if there's no next item,
                    // delete node from the queue
                    if ( ! next)
                    {
                        this.queues.delete(node);
                        return;
                    }

                    // resolve next item then dequeue node
                    Promise.resolve(next(node))
                        .finally(() =>
                            this._dequeue(node)
                        );
                });
        }

    });

    Object.assign(Core.prototype, {

        // get an attribute value for the first element
        getAttribute(nodes, attribute)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            return node.getAttribute(attribute);
        },

        // set attributes for each element
        setAttribute(nodes, attribute, value)
        {
            const attributes = Core._parseData(attribute, value);
            const keys = Object.keys(attributes);

            this.nodeArray(nodes)
                .forEach(node =>
                    keys.forEach(key =>
                        node.setAttribute(
                            key,
                            attributes[key]
                        )
                    )
                );
        },

        // remove an attribute from each element
        removeAttribute(nodes, attribute)
        {
            this.nodeArray(nodes)
                .forEach(node =>
                    node.removeAttribute(attribute)
                );
        },

        // get a dataset value for the first element
        getDataset(nodes, key)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            if (!key) {
                return node.dataset;
            }

            return node.dataset[key];
        },

        // set dataset values for each element
        setDataset(nodes, key, value)
        {
            const dataset = Core._parseData(key, value);

            this.nodeArray(nodes)
                .forEach(node =>
                    Object.assign(
                        node.dataset,
                        dataset
                    )
                );
        },

        // get the HTML contents of the first element
        getHTML(nodes)
        {
            return this.getProperty(
                nodes,
                'innerHTML'
            );
        },

        // set the HTML contents for each element
        setHTML(nodes, html)
        {
            // empty nodes
            this.empty(nodes);

            // set inner html property
            this.setProperty(
                nodes,
                'innerHTML',
                html
            );
        },

        // get a property value for the first element
        getProperty(nodes, property)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            return node[property];
        },

        // set property values for each element
        setProperty(nodes, property, value)
        {
            const properties = Core._parseData(property, value);

            this.nodeArray(nodes)
                .forEach(node =>
                    Object.assign(
                        node,
                        properties
                    )
                );
        },

        // remove a property from each element
        removeProperty(nodes, property)
        {
            this.nodeArray(nodes)
                .forEach(node =>
                {
                    delete node[property];
                });
        },

        // get the text contents of the first element
        getText(nodes)
        {
            return this.getProperty(
                nodes,
                'innerText'
            );
        },

        // set the text contents for each element
        setText(nodes, text)
        {
            // empty nodes
            this.empty(nodes);

            // set inner text property
            this.setProperty(
                nodes,
                'innerText',
                text
            );
        },

        // get the value property of the first element
        getValue(nodes)
        {
            return this.getProperty(
                nodes,
                'value'
            );
        },

        // set the value property for each element
        setValue(nodes, value)
        {
            this.setProperty(
                nodes,
                'value',
                value
            );
        }

    });

    Object.assign(Core.prototype, {

        // get custom data for the first node
        getData(nodes, key)
        {
            const node = this.nodeFirst(nodes, false, true, true);

            if (!node) {
                return;
            }

            if (!this.nodeData.has(node)) {
                return;
            }

            if (!key) {
                return this.nodeData.get(node);
            }

            return this.nodeData.get(node)[key];
        },

        // set custom data for each node
        setData(nodes, key, value)
        {
            const data = Core._parseData(key, value);

            this.nodeArray(nodes, false, true, true)
                .forEach(node =>
                {
                    if (!this.nodeData.has(node)) {
                        this.nodeData.set(node, {});
                    }

                    Object.assign(
                        this.nodeData.get(node),
                        data
                    );
                });
        },

        // remove custom data for each node
        removeData(nodes, key)
        {
            this.nodeArray(nodes, false, true, true)
                .forEach(node =>
                {
                    if (!this.nodeData.has(node)) {
                        return;
                    }

                    if (key) {
                        const nodeData = this.nodeData.get(node);
                        delete nodeData[key];
                        if (Object.keys(nodeData).length) {
                            return;
                        }
                    }

                    this.nodeData.delete(node);
                });
        }

    });

    Object.assign(Core.prototype, {

        // get the X,Y co-ordinates for the center of the first element (optionally offset)
        center(nodes, offset)
        {
            const nodeBox = this.rect(nodes, offset);

            if ( ! nodeBox)
            {
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
            const node = this.nodeFirst(nodes);

            if ( ! node)
            {
                return;
            }

            return this.forceShow(
                node,
                node =>
                {
                    const result = {
                        x: node.offsetLeft,
                        y: node.offsetTop
                    };

                    if (offset)
                    {
                        let offsetParent = node;

                        while (offsetParent = offsetParent.offsetParent)
                        {
                            result.x += offsetParent.offsetLeft;
                            result.y += offsetParent.offsetTop;
                        }
                    }

                    return result;
                }
            );
        },

        // get the computed bounding rectangle of the first element
        rect(nodes, offset)
        {
            const node = this.nodeFirst(nodes);

            if ( ! node)
            {
                return;
            }

            return this.forceShow(
                node,
                node =>
                {
                    const result = node.getBoundingClientRect();

                    if (offset)
                    {
                        result.x += this.getScrollX(window);
                        result.y += this.getScrollY(window);
                    }

                    return result;
                }
            );
        },

        // constrain each element to a container element
        constrain(nodes, container)
        {
            const containerBox = this.rect(container);

            if ( ! containerBox)
            {
                return;
            }

            this.nodeArray(nodes)
                .forEach(node =>
                {
                    const nodeBox = this.rect(node);

                    if (nodeBox.height > containerBox.height)
                    {
                        this.setStyle(
                            node,
                            'height',
                            containerBox.height
                        );
                    }

                    if (nodeBox.width > containerBox.width)
                    {
                        this.setStyle(
                            node,
                            'width',
                            containerBox.width
                        );
                    }

                    if (nodeBox.top < containerBox.top)
                    {
                        this.setStyle(
                            node,
                            'top',
                            containerBox.top
                        );
                    }

                    if (nodeBox.right > containerBox.right)
                    {
                        this.setStyle(
                            node,
                            'left',
                            containerBox.right - nodeBox.width
                        );
                    }

                    if (nodeBox.bottom > containerBox.bottom)
                    {
                        this.setStyle(
                            node,
                            'top',
                            containerBox.bottom - nodeBox.height
                        );
                    }

                    if (nodeBox.left < containerBox.left)
                    {
                        this.setStyle(
                            node,
                            'left',
                            containerBox.left
                        );
                    }
                });
        },

        // get the distance of an element to an X,Y position in the window (optionally offset)
        distTo(nodes, x, y, offset)
        {
            const nodeCenter = this.center(nodes, offset);

            if ( ! nodeCenter)
            {
                return;
            }

            return Core.dist(
                nodeCenter.x,
                nodeCenter.y,
                x,
                y
            );
        },

        // get the distance between two elements
        distToNode(nodes, others)
        {
            const otherCenter = this.center(others);

            if ( ! otherCenter)
            {
                return;
            }

            return this.distTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
        },

        // get the nearest element to an X,Y position in the window (optionally offset)
        nearestTo(nodes, x, y, offset)
        {
            let closest = null;
            let closestDistance = Number.MAX_VALUE;

            this.nodeArray(nodes)
                .forEach(node =>
                {
                    const dist = this.distTo(node, x, y, offset);
                    if (dist && dist < closestDistance)
                    {
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

            if ( ! otherCenter)
            {
                return;
            }

            return this.nearestTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
        },

        // get the percentage of an X co-ordinate relative to an element
        percentX(nodes, x, offset)
        {
            const nodeBox = this.rect(nodes, offset);

            if ( ! nodeBox)
            {
                return;
            }

            return Core.clampPercent(
                (x - nodeBox.left)
                / nodeBox.width
                * 100
            );
        },

        // get the percentage of a Y co-ordinate relative to an element
        percentY(nodes, y, offset)
        {
            const nodeBox = this.rect(nodes, offset);

            if ( ! nodeBox)
            {
                return;
            }

            return Core.clampPercent(
                (y - nodeBox.top)
                / nodeBox.height
                * 100
            );
        }

    });

    Object.assign(Core.prototype, {

        // get the scroll X position of the first element
        getScrollX(nodes)
        {
            let node = this.nodeFirst(nodes, true, true, true);

            if ( ! node)
            {
                return;
            }

            if (Core.isWindow(node))
            {
                return node.scrollX;
            }

            if (Core.isDocument(node))
            {
                node = node.scrollingElement;
            }

            return node.scrollLeft;
        },

        // get the scroll Y position of the first element
        getScrollY(nodes)
        {
            let node = this.nodeFirst(nodes, true, true, true);

            if ( ! node)
            {
                return;
            }

            if (Core.isWindow(node))
            {
                return node.scrollY;
            }

            if (Core.isDocument(node))
            {
                node = node.scrollingElement;
            }

            return node.scrollTop;
        },

        // scroll each element to an X,Y position
        setScroll(nodes, x, y)
        {
            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                {
                    if (Core.isWindow(node))
                    {
                        return node.scroll(x, y);
                    }

                    if (Core.isDocument(node))
                    {
                        node = node.scrollingElement;
                    }

                    node.scrollLeft = x;
                    node.scrollTop = y;
                });
        },

        // scroll each element to an X position
        setScrollX(nodes, x)
        {
            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                {
                    if (Core.isWindow(node))
                    {
                        return node.scroll(x, node.scrollY)
                    }

                    if (Core.isDocument(node))
                    {
                        node = node.scrollingElement;
                    }

                    node.scrollLeft = x;
                });
        },

        // scroll each element to a Y position
        setScrollY(nodes, y)
        {
            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                {
                    if (Core.isWindow(node))
                    {
                        return node.scroll(node.scrollX, y)
                    }

                    if (Core.isDocument(node))
                    {
                        node = node.scrollingElement;
                    }

                    node.scrollTop = y;
                });
        }

    });

    Object.assign(Core.prototype, {

        // get the computed height of the first element
        // (and optionally padding, border or margin)
        height(nodes, padding, border, margin)
        {
            let node = this.nodeFirst(nodes, true, true, true);

            if ( ! node)
            {
                return;
            }

            if (Core.isWindow(node))
            {
                return padding ?
                    node.outerHeight :
                    node.innerHeight;
            }

            if (Core.isDocument(node))
            {
                node = node.documentElement;
            }

            return this.forceShow(
                node,
                node =>
                {
                    let result = node.clientHeight;

                    if ( ! padding)
                    {
                        result -= parseInt(this.css(node, 'padding-top'))
                            + parseInt(this.css(node, 'padding-bottom'));
                    }

                    if (border)
                    {
                        result += parseInt(this.css(node, 'border-top-width'))
                            + parseInt(this.css(node, 'border-bottom-width'));
                    }

                    if (margin)
                    {
                        result += parseInt(this.css(node, 'margin-top'))
                            + parseInt(this.css(node, 'margin-bottom'));
                    }

                    return result;
                }
            );
        },

        // get the computed width of the first element
        // (and optionally padding, border or margin)
        width(nodes, padding, border, margin)
        {
            let node = this.nodeFirst(nodes, true, true, true);

            if ( ! node)
            {
                return;
            }

            if (Core.isWindow(node))
            {
                return padding ?
                    node.outerWidth :
                    node.innerWidth;
            }

            if (Core.isDocument(node))
            {
                node = node.documentElement;
            }

            return this.forceShow(
                node,
                node =>
                {
                    let result = node.clientWidth;

                    if ( ! padding)
                    {
                        result -= parseInt(this.css(node, 'padding-left'))
                            + parseInt(this.css(node, 'padding-right'));
                    }

                    if (border)
                    {
                        result += parseInt(this.css(node, 'border-left-width'))
                            + parseInt(this.css(node, 'border-right-width'));
                    }

                    if (margin)
                    {
                        result += parseInt(this.css(node, 'margin-left'))
                            + parseInt(this.css(node, 'margin-right'));
                    }

                    return result;
                }
            );
        }

    });

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

    Object.assign(Core.prototype, {

        // create a new DOM element
        create(tagName, options) {
            const node = this.context.createElement(tagName);

            if (!options) {
                return node;
            }

            if (options.html) {
                this.setHTML(node, options.html);
            } else if (options.text) {
                this.setText(node, options.text);
            }

            if (options.class) {
                this.addClass(node, options.class);
            }

            if (options.style) {
                this.setStyle(node, options.style);
            }

            if (options.value) {
                this.setValue(node, options.value);
            }

            if (options.attribute) {
                this.setAttribute(node, options.attribute);
            }

            if (options.property) {
                this.setProperty(nodes, options.property);
            }

            if (options.dataset) {
                this.setDataset(nodes, options.dataset);
            }

            return node;
        },

        // create a new comment node
        createComment(comment) {
            return this.context.createComment(comment);
        },

        // create a new text node
        createText(text) {
            return this.context.createTextNode(text);
        }

    });

    Object.assign(Core.prototype, {

        // add an event to each element
        addEvent(nodes, events, delegate, callback, selfDestruct = false)
        {
            if (Core.isFunction(delegate)) {
                if (Core.isBoolean(callback)) {
                    selfDestruct = callback;
                }

                callback = delegate;
                delegate = false;
            }

            const eventArray = Core._parseEvents(events);

            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                {
                    let realCallback = callback;

                    if (selfDestruct) {
                        realCallback = this._selfDestructFactory(node, events, realCallback);
                    }

                    if (delegate) {
                        realCallback = this._delegateFactory(node, delegate, realCallback);
                    }

                    if (!this.nodeEvents.has(node)) {
                        this.nodeEvents.set(node, {});
                    }

                    const nodeEvents = this.nodeEvents.get(node);

                    const eventData = {
                        delegate: delegate,
                        callback: callback,
                        realCallback: realCallback
                    };

                    eventArray.forEach(event =>
                    {
                        const realEvent = Core._parseEvent(event);
                        eventData.event = event;
                        eventData.realEvent = realEvent;

                        if (!nodeEvents[realEvent]) {
                            nodeEvents[realEvent] = [];
                        }
                        else if (nodeEvents[realEvent].includes(eventData)) {
                            return;
                        }

                        node.addEventListener(realEvent, realCallback);

                        nodeEvents[realEvent].push(eventData);
                    });
                });
        },

        // add a self-destructing event to each element
        addEventOnce(nodes, events, delegate, callback)
        {
            return this.addEvent(
                nodes,
                events,
                delegate,
                callback,
                true
            );
        },

        // remove an event from each element
        removeEvent(nodes, events, delegate, callback)
        {
            if (delegate && Core.isFunction(delegate)) {
                callback = delegate;
                delegate = false;
            }

            let eventArray = events ?
                Core._parseEvents(events) :
                false;

            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                {
                    if (!this.nodeEvents.has(node)) {
                        return;
                    }

                    const nodeEvents = this.nodeEvents.get(node);

                    if (!eventArray) {
                        eventArray = Object.keys(nodeEvents);
                    }

                    eventArray.forEach(event =>
                    {
                        const realEvent = Core._parseEvent(event);

                        if (!nodeEvents[realEvent]) {
                            return;
                        }

                        let realEvents = nodeEvents[realEvent];

                        const remove = [];

                        realEvents.forEach((eventData, index) =>
                        {
                            if (realEvent === event) {
                                if (realEvent !== eventData.realEvent) {
                                    return;
                                }
                            }
                            else if (event !== eventData.event) {
                                return;
                            }

                            if (delegate) {
                                if (delegate !== eventData.delegate || (callback && callback !== eventData.callback)) {
                                    return;
                                }
                            }
                            else if (callback && callback !== eventData.realCallback) {
                                return;
                            }

                            node.removeEventListener(eventData.realEvent, eventData.realCallback);

                            remove.push(index);
                        });

                        realEvents = realEvents.filter((eventData, index) =>
                            !remove.includes(index)
                        );

                        if (!realEvents.length) {
                            delete nodeEvents[realEvent];
                        }
                    });

                    if (!Object.keys(nodeEvents).length) {
                        this.nodeEvents.delete(node);
                    }
                });
        },

        // trigger an event on each element
        triggerEvent(nodes, events, data)
        {
            this.nodeArray(nodes, true, true, true)
                .forEach(node =>
                    Core._parseEvents(events)
                        .forEach(event =>
                        {
                            const realEvent = Core._parseEvent(event);

                            const eventData = new Event(realEvent);

                            if (data) {
                                Object.assign(eventData, data);
                            }

                            node.dispatchEvent(eventData);
                        })
                );
        },

        // clone all events from each element to other elements
        cloneEvents(nodes, others)
        {
            this.nodeArray(nodes, true, true, true)
                .forEach(node => 
                {
                    if (!this.nodeEvents.has(node)) {
                        return;
                    }

                    this.nodeEvents.get(node)
                        .forEach(eventData =>
                        {
                            this.addEvent(
                                others,
                                eventData.event,
                                eventData.delegate,
                                eventData.callback
                            );
                        });
                });
        },

        // trigger a blur event on the first element
        blur(nodes)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            node.blur();
        },

        // trigger a click event on the first element
        click(nodes)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            node.click();
        },

        // trigger a focus event on the first element
        focus(nodes)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            node.focus();
        },

        // add a function to the ready queue
        ready(callback)
        {
            if (this.context.readyState === 'complete') {
                callback();
            }
            else {
                this.addEvent(
                    window,
                    'DOMContentLoaded',
                    callback
                );
            }
        }

    });

    Object.assign(Core.prototype, {

        // clone each node (optionally deep, and with events and data)
        clone(nodes, deep = true, eventsData = false)
        {
            const results = [];

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    const clone = node.cloneNode(deep);

                    if (eventsData) {
                        this.cloneEvents(node, clone);
                        this.cloneData(node, clone);

                        if (deep) {
                            const contents = this.find(node, '*');
                            this.find(clone, '*')
                                .forEach((child, index) =>
                                {
                                    this.cloneEvents(contents[index], child);
                                    this.cloneData(contents[index], child);
                                });
                        }
                    }

                    results.push(clone);
                });

            return results;
        },

        // detach an element from the DOM
        detach(nodes)
        {
            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    if (!node.parentNode) {
                        return;
                    }

                    node.parentNode.removeChild(node);
                });
        },

        // remove all children of each node from the DOM
        empty(nodes)
        {
            this.remove(
                this.find(nodes, '*'),
                false
            );
            this.setProperty(
                nodes,
                'innerHTML',
                ''
            );
        },

        // remove each node from the DOM
        remove(nodes, deep = true)
        {
            if (deep) {
                this.empty(nodes);
            }

            // clear queue
            this.clearQueue(nodes);

            // stop animations
            this.stop(nodes);

            // remove events
            this.removeEvent(nodes);

            // remove data
            this.removeData(nodes);

            // delete styles
            this.nodeArray(nodes)
                .forEach(
                    node =>
                        this.nodeStyles.has(node) &&
                        this.nodeStyles.delete(node)
                );

            // detach node
            this.detach(nodes);
        },

        // replace each other node with nodes
        replaceAll(nodes, others)
        {
            this.replaceWith(others, nodes);
        },

        // replace each node with other nodes
        replaceWith(nodes, others)
        {
            others = this._parseQuery(others, false);

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    this.before(
                        node,
                        this.clone(others, true)
                    );
                    this.remove(node);
                });
        }

    });

    Object.assign(Core.prototype, {

        // insert each other node after the first node
        after(nodes, others)
        {
            const node = this.nodeFirst(nodes, false);

            if (!node) {
                return;
            }

            if (!node.parentNode) {
                return;
            }

            this._parseQuery(others)
                .reverse()
                .forEach(other =>
                    node.parentNode.insertBefore(
                        other,
                        node.nextSibling
                    )
                );
        },

        // insert each node after the first other node
        insertAfter(nodes, others)
        {
            this.after(others, nodes);
        },

        // insert each other node before the first node
        before(nodes, others)
        {
            const node = this.nodeFirst(nodes, false);

            if (!node) {
                return;
            }

            if (!node.parentNode) {
                return;
            }

            this._parseQuery(others, false)
                .forEach(other =>
                    node.parentNode.insertBefore(
                        other,
                        node
                    )
                );
        },

        // insert each node before the first other node
        insertBefore(nodes, others)
        {
            this.before(others, nodes);
        },

        // append each other node to the first node
        append(nodes, others)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            this._parseQuery(others, false)
                .forEach(other =>
                    node.insertBefore(other, null)
                );
        },

        // append each node to the first other node
        appendTo(nodes, others)
        {
            this.append(others, nodes);
        },

        // prepend each other node to the first node
        prepend(nodes, others)
        {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            this._parseQuery(others, false)
                .reverse()
                .forEach(other =>
                    node.insertBefore(other, node.firstChild)
                );
        },

        // prepend each node to the first other node
        prependTo(nodes, others)
        {
            this.prepend(others, nodes);
        }

    });

    Object.assign(Core.prototype, {

        // unwrap each node (optionally matching a filter)
        unwrap(nodes, filter)
        {
            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    const parent = this.parent(node, filter);

                    if (!parent) {
                        return;
                    }

                    this.before(
                        parent,
                        this.contents(parent)
                    );
                    this.remove(parent);
                });
        },

        // wrap each nodes with other nodes
        wrap(nodes, others)
        {
            others = this._parseQuery(others);

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    const clone = this.clone(others, true);
                    this.before(node, clone);
                    this.append(
                        this.filterOne(
                            this.find(clone, '*'),
                            test => !this.child(test)
                        ) || clone,
                        node
                    );
                });
        },

        // wrap all nodes with other nodes
        wrapAll(nodes, others)
        {
            others = this._parseQuery(others);

            const clone = this.clone(others, true);

            this.before(nodes, clone);

            this.append(
                this.filterOne(
                    this.find(clone, '*'),
                    test => !this.child(test)
                ) || clone,
                nodes
            );
        },

        // wrap the contents of each node with other nodes
        wrapInner(nodes, others)
        {
            others = this._parseQuery(others);

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    const clone = this.clone(others, true);

                    this.append(node, clone);

                    this.append(
                        this.filterOne(
                            this.find(clone, '*'),
                            test => !this.child(test)
                        ) || clone,
                        this.contents(node)
                    );
                });
        }

    });

    Object.assign(Core.prototype, {

        // return all elements matching a filter
        filter(nodes, filter)
        {
            filter = this._parseFilter(filter);

            return this.nodeArray(nodes)
                .filter((node, index) =>
                    !filter || filter(node, index)
                );
        },

        // return the first element matching a filter
        filterOne(nodes, filter)
        {
            filter = this._parseFilter(filter);

            return this.nodeArray(nodes)
                .find((node, index) =>
                    !filter || filter(node, index)
                ) || null;
        },

        // return all elements not matching a filter
        not(nodes, filter)
        {
            filter = this._parseFilter(filter);

            return this.nodeArray(nodes)
                .filter((node, index) =>
                    filter && !filter(node, index)
                );
        },

        // return all elements with a descendent matching a filter
        has(nodes, filter)
        {
            filter = this._parseFilterContains(filter);

            return this.nodeArray(nodes, true, true)
                .filter(node =>
                    !filter || filter(node)
                );
        },

        // return all hidden elements
        hidden(nodes)
        {
            return this.nodeArray(nodes, false, true, true)
                .filter(node =>
                    this.isHidden(node)
                );
        },

        // return all visible elements
        visible(nodes)
        {
            return this.nodeArray(nodes, false, true, true)
                .filter(node =>
                    this.isVisible(node)
                );
        }

    });

    Object.assign(Core.prototype, {

        // find all elements matching a selector
        find(nodes, selectors)
        {
            if (!selectors) {
                selectors = nodes;
                nodes = this.context;
            }

            const [type, value] = Core._parseSelector(selectors);

            if (type === '#') {
                return this.findById(nodes, value);
            }

            if (type === '.') {
                return this.findByClass(nodes, value);
            }

            if (type) {
                return this.findByTag(nodes, value);
            }

            if (Core.isSelectorComplex(selectors)) {
                return this._findByCustom(nodes, selectors);
            }

            return this.findSelector(nodes, selectors);
        },

        // find a single element matching a selector
        findOne(nodes, selectors)
        {
            if (!selectors) {
                selectors = nodes;
                nodes = this.context;
            }

            const [type, value] = Core._parseSelector(selectors);

            if (type === '#') {
                return this.findOneById(nodes, value);
            }

            if (type === '.') {
                return this.findOneByClass(nodes, value);
            }

            if (type) {
                return this.findOneByTag(nodes, value);
            }

            if (Core.isSelectorComplex(selectors)) {
                return this._findOneByCustom(nodes, selectors);
            }

            return this.findOneSelector(nodes, selectors);
        },

        // find all elements with a specific class
        findByClass(nodes, className)
        {
            if (!className) {
                className = nodes;
                nodes = this.context;
            }

            const results = new Set;

            this.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.getElementsByClassName(className))
                        .forEach(result =>
                            results.add(result)
                        )
                );

            return this.sortNodes([...results]);
        },

        // find the first element with a specific class
        findOneByClass(nodes, className)
        {
            return this.findByClass(nodes, className)
                .shift() || null;
        },

        // find all elements with a specific ID
        findById(nodes, id)
        {
            if (!id) {
                id = nodes;
                nodes = this.context;
            }

            const results = new Set;

            this.nodeArray(nodes, true, true)
                .forEach(node =>
                    results.add(
                        node.getElementById(id)
                    )
                );

            return this.sortNodes([...results].filter(node => !!node));
        },

        // find the first element with a specific ID
        findOneById(nodes, id)
        {
            return this.findById(nodes, id)
                .shift() || null;
        },

        // find all elements with a specific tag
        findByTag(nodes, tagName)
        {
            if (!tagName) {
                tagName = nodes;
                nodes = this.context;
            }

            const results = new Set;

            this.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.getElementsByTagName(tagName))
                        .forEach(result =>
                            results.add(result)
                        )
                );

            return this.sortNodes([...results]);
        },

        // find the first element with a specific tag
        findOneByTag(nodes, tagName)
        {
            return this.findByTag(nodes, tagName)
                .shift() || null;
        },

        // find all elements matching a standard CSS selector
        findSelector(nodes, selector)
        {
            const results = new Set;

            this.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.querySelectorAll(selector))
                        .forEach(result =>
                            results.add(result)
                        )
                );

            return this.sortNodes([...results]);
        },

        // find the first element matching a standard CSS selector
        findOneSelector(nodes, selector)
        {
            const results = new Set;

            this.nodeArray(nodes, true, true)
                .forEach(node =>
                    results.add(
                        node.querySelector(selector)
                    )
                );

            return this.sortNodes(
                [...results]
                    .filter(node => !!node)
            )
                .shift() || null;
        },

        // find all elements matching a custom CSS selector
        _findByCustom(nodes, selectors)
        {
            const results = new Set;

            Core._parseSelector(selectors)
                .forEach(selector =>
                {
                    const [type, value] = selector;
                    let selectorNodes = [];

                    if (type === '#') {
                        selectorNodes = this.findById(nodes, value);
                    }
                    else if (type === '.') {
                        selectorNodes = this.findByClass(nodes, value);
                    }
                    else if (type === true) {
                        selectorNodes = this.findByTag(nodes, value);
                    }
                    else if (!type) {
                        selectorNodes = this.findSelector(nodes, value);

                        // special cases
                    }
                    else if (['>', '+', '~'].includes(type)) {
                        const [filter, query] = Core._parseSubQuery(value);

                        // node child
                        if (type === '>') {
                            selectorNodes = this.children(nodes, filter);

                            // node next
                        }
                        else if (type === '+') {
                            selectorNodes = this.next(nodes, filter);

                            // node after
                        }
                        else if (type === '~') {
                            selectorNodes = this.nextAll(nodes, filter);
                        }

                        if (selectorNodes.length && query) {
                            selectorNodes = this.find(selectorNodes, query);
                        }
                    }

                    selectorNodes.forEach(node =>
                        results.add(node)
                    );
                });

            return this.sortNodes([...results]);
        },

        // find the first element matching a custom CSS selector
        _findOneByCustom(nodes, selectors)
        {
            const results = new Set;

            Core._parseSelectors(selectors)
                .forEach(selector =>
                {
                    const [type, value] = selector;
                    let selectorNode;

                    if (type === '#') {
                        selectorNode = this.findOneById(nodes, value);
                    }
                    else if (type === '.') {
                        selectorNode = this.findOneByClass(nodes, value);
                    }
                    else if (type === true) {
                        selectorNode = this.findOneByTag(nodes, value);
                    }
                    else if (!type) {
                        selectorNode = this.findOneSelector(nodes, value);

                        // special cases
                    }
                    else if (['>', '+', '~'].includes(type)) {
                        const [filter, query] = Core._parseSubQuery(value);

                        // node child
                        if (type === '>') {
                            selectorNode = this.child(nodes, filter);
                            // node next
                        }
                        else if (type === '+') {
                            selectorNode = this.next(nodes, filter);
                            // node after
                        }
                        else if (type === '~') {
                            selectorNode = this.nextAll(nodes, filter, false, true);
                        }

                        if (results.length && query) {
                            selectorNode = this.findOne(selectorNode, query);
                        }

                        selectorNode = this.nodeArray(selectorNode)
                            .shift();
                    }

                    if (selectorNode) {
                        results.add(selectorNode);
                    }
                });

            return this.sortNodes([...results])
                .shift() || null;
        }

    });

    Object.assign(Core.prototype, {

        // find the first child of each element matching a filter
        child(nodes, filter)
        {
            return this.children(
                nodes,
                filter,
                true
            );
        },

        // find all children of each element,
        // and optionally matching a filter
        children(nodes, filter, first = false, elementsOnly = true)
        {
            filter = this._parseFilter(filter);

            const results = new Set;

            this.nodeArray(nodes)
                .forEach(node =>
                    this.nodeArray(node.childNodes, elementsOnly)
                        .forEach(child =>
                        {
                            if (filter && !filter(child)) {
                                return;
                            }

                            results.add(child);
                            return !first;
                        })
                );

            const nodeArray = this.sortNodes([...results]);

            return first && Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all child nodes for each element,
        // (including text and comment nodes)
        contents(nodes)
        {
            return this.children(
                nodes,
                false,
                false,
                false
            );
        },

        // find the closest ancestor to each element matching a filter,
        // and optionally before hitting a limit
        closest(nodes, filter, until)
        {
            return this.parents(
                nodes,
                filter,
                until,
                true
            );
        },

        // find the parent of each element matching a filter
        parent(nodes, filter)
        {
            filter = this._parseFilter(filter);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    if (!node.parentNode) {
                        return;
                    }

                    if (filter && !filter(node.parentNode)) {
                        return;
                    }

                    results.add(node.parentNode);
                });

            const nodeArray = this.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all parents of each element matching a filter,
        // and optionally before hitting a limit
        parents(nodes, filter, until, closest = false)
        {
            filter = this._parseFilter(filter);
            until = this._parseFilter(until);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    while (node = node.parentNode) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && !filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (closest) {
                            return;
                        }
                    }
                });

            const nodeArray = this.sortNodes([...results]);

            return closest && Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find the offset parent (relatively positioned) of the first element
        offsetParent(nodes)
        {
            return this.forceShow(
                nodes,
                node => node.offsetParent
            );
        },

        // find the next sibling for each element matching a filter
        next(nodes, filter)
        {
            filter = this._parseFilter(filter);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    if (!node.nextSibling) {
                        return;
                    }

                    if (filter && !filter(node.nextSibling)) {
                        return;
                    }

                    results.add(node.nextSibling);
                });

            const nodeArray = this.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all next siblings for each element matching a filter,
        // and optionally before hitting a limit
        nextAll(nodes, filter, until = false, first = false)
        {
            filter = this._parseFilter(filter);
            until = this._parseFilter(until);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    while (node = node.nextSibling) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && !filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (first) {
                            break;
                        }
                    }
                });

            return this.sortNodes([...results]);
        },

        // find the previous sibling for each element matching a filter,
        // and optionally before hitting a limit
        prev(nodes, filter)
        {
            filter = this._parseFilter(filter);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    if (!node.previousSibling) {
                        return;
                    }

                    if (filter && !filter(node.previousSibling)) {
                        return;
                    }

                    results.add(node.previousSibling);
                });

            const nodeArray = this.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all previous siblings for each element matching a filter,
        // and optionally before hitting a limit
        prevAll(nodes, filter, until = false, first = false)
        {
            filter = this._parseFilter(filter);
            until = this._parseFilter(until);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    while (node = node.previousSibling) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && !filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (first) {
                            break;
                        }
                    }
                });

            return this.sortNodes([...results]);
        },

        // find all siblings for each element matching a filter
        siblings(nodes, filter, elementsOnly = true)
        {
            filter = this._parseFilter(filter);

            const results = new Set;

            this.nodeArray(nodes, false)
                .forEach(node =>
                {
                    if (!node.parentNode) {
                        return;
                    }

                    this.nodeArray(node.parentNode.childNodes, elementsOnly)
                        .forEach(child =>
                        {
                            if (child.isSameNode(node)) {
                                return;
                            }

                            if (filter && !filter(child)) {
                                return;
                            }

                            results.add(child);
                        })
                });

            return this.sortNodes([...results]);
        }

    });

    Object.assign(Core.prototype, {

        // returns true if any of the elements has a specified attribute
        hasAttribute(nodes, attribute)
        {
            return !!this.nodeArray(nodes)
                .find(node =>
                    node.hasAttribute(attribute)
                );
        },

        // returns true if any of the elements has any of the specified classes
        hasClass(nodes, ...classes)
        {
            classes = Core._parseClasses(classes);

            return !!this.nodeArray(nodes)
                .find(node =>
                    classes.find(className =>
                        node.classList.contains(className)
                    )
                );
        },

        // returns true if any of the nodes has custom data
        hasData(nodes, key)
        {
            return !!this.nodeArray(nodes, false, true, true)
                .find(node =>
                    this.nodeData.has(node) &&
                    (!key || this.nodeData.get(node).hasOwnProperty(key))
                );
        },

        // returns true if any of the elements has a specified property
        hasProperty(nodes, property)
        {
            return !!this.nodeArray(nodes)
                .find(node =>
                    node.hasOwnProperty(property)
                );
        },

        // returns true if any of the elements contains a descendent matching a filter
        contains(nodes, filter)
        {
            filter = this._parseFilterContains(filter);

            return !!this.nodeArray(nodes, true, true)
                .find(node =>
                    !filter ||
                    filter(node)
                );
        },

        // returns true if any of the elements matches a filter
        is(nodes, filter)
        {
            filter = this._parseFilter(filter);

            return !!this.nodeArray(nodes)
                .find(node =>
                    !filter ||
                    filter(node)
                );
        },

        // returns true if any of the nodes is connected to the DOM
        isConnected(nodes)
        {
            return !!this.nodeArray(nodes, false)
                .find(node => node.isConnected);
        },

        // returns true if any of the elements or a parent of any of the elements is "fixed"
        isFixed(nodes)
        {
            return !!this.nodeArray(nodes)
                .find(node =>
                    this.css(node, 'position') === 'fixed' ||
                    this.closest(
                        node,
                        parent =>
                            this.css(parent, 'position') === 'fixed')
                );
        },

        // returns true if any of the elements is hidden
        isHidden(nodes)
        {
            return !!this.nodeArray(nodes, false, true, true)
                .find(node =>
                {
                    if (Core.isWindow(node)) {
                        return this.context.visibilityState !== 'visible';
                    }

                    if (Core.isDocument(node)) {
                        return node.visibilityState !== 'visible';
                    }

                    if (Core.isBody(node)) {
                        return this.getStyle(node, 'display') === 'none';
                    }

                    if (Core.isNode(node)) {
                        return !node.offsetParent;
                    }
                });
        },

        // returns true if any of the elements is visible
        isVisible(nodes)
        {
            return !!this.nodeArray(nodes, false, true, true)
                .find(node =>
                {
                    if (Core.isWindow(node)) {
                        return this.context.visibilityState === 'visible';
                    }

                    if (Core.isDocument(node)) {
                        return node.visibilityState === 'visible';
                    }

                    if (Core.isBody(node)) {
                        return this.getStyle(node, 'display') !== 'none';
                    }

                    if (Core.isNode(node)) {
                        return node.offsetParent;
                    }
                });
        }

    });

    Object.assign(Core.prototype, {

        // force an element to be shown, and then execute a callback
        forceShow(nodes, callback) {
            const node = this.nodeFirst(nodes, true, true, true);

            if (!node) {
                return;
            }

            if (this.isVisible(node)) {
                return callback(node);
            }

            const elements = [];
            const styles = [];

            if (this.css(node, 'display') === 'none') {
                elements.push(node);
                styles.push(this.getStyle(node, 'display'));
            }

            this.parents(node, parent => this.css(parent, 'display') === 'none')
                .forEach(parent => {
                    elements.push(parent);
                    styles.push(
                        this.getStyle(parent, 'display')
                    );
                });

            this.setStyle(
                elements,
                'display',
                'initial',
                true
            );

            const result = callback(node);

            elements.forEach((element, index) =>
                this.setStyle(
                    element,
                    'display',
                    styles[index]
                )
            );

            return result;
        },

        // get the index of the first element matching a filter
        index(nodes, filter) {
            filter = this._parseFilter(filter);

            return this.nodeArray(nodes)
                .findIndex(node =>
                    !filter || filter(node)
                );
        },

        // get the index of the first element relative to it's parent element
        indexOf(nodes) {
            const node = this.nodeFirst(nodes);

            if (!node) {
                return;
            }

            return this.children(
                this.parent(node)
            ).indexOf(node);
        },

        // create a selection on the first node
        select(nodes) {
            const node = this.nodeFirst(nodes, false);

            if (node && node.select) {
                return node.select();
            }

            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            if (!node) {
                return;
            }

            const range = this.context.createRange();
            range.selectNode(node);
            selection.addRange(range);
        },

        // create a selection on all nodes
        selectAll(nodes) {
            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            this.nodeArray(nodes, false)
                .forEach(node => {
                    const range = this.context.createRange();
                    range.selectNode(node);
                    selection.addRange(range);
                });
        },

        // returns a serialized string containing names and values of all form elements
        serialize(nodes) {
            return Core._parseParams(this.serializeObject(nodes));
        },

        // returns a serialized array containing names and values of all form elements
        serializeArray(nodes) {
            const values = this.serializeObject(nodes);

            return Object.keys(values)
                .map(name => {
                    return {
                        name,
                        value: values[name]
                    };
                });
        },

        // returns an object containing keys and values of all form elements
        serializeObject(nodes) {
            return this.nodeArray(nodes)
                .reduce(
                    (values, node) => {
                        if (node.matches('form')) {
                            Object.assign(
                                values,
                                this.serializeObject(
                                    this.find(
                                        node,
                                        'input, select, textarea'
                                    )
                                )
                            );
                        } else if (!this.is(node, '[disabled], input[type=submit], input[type=reset], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                            const name = this.getAttribute(node, 'name');
                            const value = this.getValue(node);

                            if (name.substring(-2) === '[]') {
                                if (!values[name]) {
                                    values[name] = [];
                                }

                                values[name].push(value);
                            }
                            else {
                                values[name] = value;
                            }
                        }
                        return values;
                    },
                    {}
                );
        }

    });

    Object.assign(Core, {

        // create a single-dimensional Array from a multiple-dimensional Array
        flattenArray(array)
        {
            return array.reduce(
                (acc, val) =>
                    Array.isArray(val) ?
                        acc.concat(
                            ...this.flattenArray(val)
                        ) :
                        acc.concat(val),
                []
            );
        },

        // remove duplicate elements in an array
        uniqueArray(array)
        {
            return [...new Set(array)];
        }

    });

    Object.assign(Core, {

        // clamp a value between a min and max
        clamp(value, min = 0, max = 1)
        {
            return Math.max(
                min,
                Math.min(
                    max,
                    value
                )
            );
        },

        // clamp a value between 0 and 100
        clampPercent(value)
        {
            return this.clamp(
                value,
                0,
                100
            );
        },

        // get the distance between two vectors
        dist(x1, y1, x2, y2)
        {
            return this.len(
                x1 - x2,
                y1 - y2
            );
        },

        // get the length of an X,Y vector
        len(x, y)
        {
            return Math.hypot(x, y);
        },

        // linear interpolation from one value to another
        lerp(min, max, amount)
        {
            return min
                * (1 - amount)
                + max
                * amount;
        },

        // map a value from one range to another
        map(value, fromMin, fromMax, toMin, toMax)
        {
            return (value - fromMin)
                * (toMax - toMin)
                / (fromMax - fromMin)
                + toMin;
        },

        // round a number to a specified precision
        toStep(value, step)
        {
            return Math.round(value / step)
                * step;
        },

        // get the linear percent of a value in a specified range
        linearPercent(value, min, max)
        {
            if (min === max) {
                return 0;
            }

            return this.clampPercent(
                100
                * (value - min)
                / (max - min)
            );
        },

        // get the linear value of a percent in a specified range
        linearValue(percent, min, max)
        {
            return this.clamp(
                min
                    + (
                        percent
                        / 100
                        * (max - min)
                    ),
                min,
                max
            );
        },

        // get the logarithmic percent of a value in a specified range
        logPercent(value, min, max)
        {
            if (min === max) {
                return 0;
            }

            min = min ?
                Math.log(min) :
                0;

            return this.clampPercent(
                100
                * (
                    (value ?
                        Math.log(value) :
                        0
                    )
                    - min
                )
                / (
                    Math.log(max)
                    - min
                )
            );
        },

        // get the logarithmic value of a percent in a specified range
        logValue(percent, min, max)
        {
            min = min ?
                Math.log(min) :
                0;

            return this.clamp(
                Math.exp(
                    min
                    + (
                        Math.log(max)
                        - min
                    )
                    * percent
                    / 100
                ),
                min,
                max
            );
        }

    });

    Object.assign(Core, {

        // returns an array from an array, node list, element list, query list or arbitrary value
        makeArray(value)
        {
            if (!value) {
                return [];
            }

            if (this.isArray(value)) {
                return value;
            }

            if (this.isNodeList(value) || this.isElementList(value)) {
                return Array.from(value);
            }

            if (this.isQuerySet(value)) {
                return value.get();
            }

            return [value];
        },

        // returns a function for filtering nodes (by element, document or window)
        _nodeFilterFactory(elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return node =>
                (!elementsOnly && this.isNode(node)) ||
                (elementsOnly && this.isElement(node)) ||
                (allowDocument && this.isDocument(node)) ||
                (allowWindow && this.isWindow(node));
        }

    });

    Object.assign(Core, {

        forgetDot(pointer, key) {
            const keys = key.split('.');

            let current;
            while (current = keys.shift() && keys.length) {
                if (!pointer.hasOwnProperty(current)) {
                    return;
                }
            }

            delete pointer[current];
        },

        getDot(pointer, key, defaultValue) {
            key.split('.').forEach(key => {
                if (!pointer.hasOwnProperty(key)) {
                    pointer = defaultValue;
                    return false;
                }

                pointer = pointer[key];
            });

            return pointer;
        },

        hasDot(pointer, key) {
            let result = true;

            key.split('.').forEach(key => {
                if (!pointer.hasOwnProperty(key)) {
                    result = false;
                    return false;
                }
            });

            return result;
        },

        pluckDot(pointers, key) {
            return pointers.map(pointer => this.getDot(pointer, key));
        },

        setDot(pointer, key, value, overwrite = true) {
            const keys = key.split('.');

            let current;
            while (current = keys.shift() && keys.length) {
                if (current === '*') {
                    return Object.keys(pointer).forEach(k =>
                        this.dotSet(
                            pointer[k],
                            keys.join('.'),
                            value,
                            overwrite
                        )
                    );
                }

                if (!pointer.hasOwnProperty(current)) {
                    pointer[current] = {};
                }

                pointer = pointer[current];
            }

            if (overwrite || !pointer.hasOwnProperty(current)) {
                pointer[current] = value;
            }
        }

    });

    Object.assign(Core.prototype, {

        // returns a DOM object from an HTML string
        parseHTML(html)
        {
            const parser = new DOMParser;
            return parser.parseFromString(html, 'application/html');
        },

        // returns a DOM object from an XML string
        parseXML(xml)
        {
            const parser = new DOMParser;
            return parser.parseFromString(xml, 'application/xml');
        }

    });

    Object.assign(Core, {

        // convert a string to Camel Case
        camelCase(string)
        {
            return '' + string
                .replace(
                    /(\-[a-z])/g,
                    match =>
                        match.toUpperCase()
                )
                .replace('-', '');
        },

        // convert a string to Snake Case
        snakeCase(string)
        {
            return '' + string
                .replace(
                    /([A-Z])/g,
                    match =>
                        `-${match.toLowerCase()}`
                );
        }

    });

    Object.assign(Core, {

        // returns true if the value is an Array
        isArray(value) {
            return Array.isArray(value);
        },

        // returns true if the value if a Body Element
        isBody(value) {
            return value instanceof HTMLBodyElement;
        },

        // returns true if the value is a Boolean
        isBoolean(value) {
            return value === !!value;
        },

        // returns true if the value if a Document
        isDocument(value) {
            return value instanceof Document;
        },

        // returns true if the value is a HTML Element
        isElement(value) {
            return value instanceof HTMLElement;
        },

        // returns true if the value is a HTML Collection
        isElementList(value) {
            return value instanceof HTMLCollection;
        },

        // returns true if the value is a Function
        isFunction(value) {
            return typeof value === 'function';
        },

        // returns true if the value is a Node
        isNode(value) {
            return value instanceof Node;
        },

        // returns true if the value is a Node List
        isNodeList(value) {
            return value instanceof NodeList;
        },

        // returns true if the value is numeric
        isNumeric(value) {
            return !isNaN(parseFloat(value)) &&
                isFinite(value);
        },

        // returns true if the value is a plain Object
        isPlainObject(value) {
            return this.isObject(value) && value.constructor === Object;
        },

        // returns true if the value is an Object
        isObject(value) {
            return value instanceof Object;
        },

        // returns true if the value is a Query Set
        isQuerySet(value) {
            return value instanceof QuerySet;
        },

        // returns true if any of the selectors is "complex"
        isSelectorComplex(selectors) {
            return !!this._parseSelectors(selectors)
                .find(selector =>
                    ['>', '+', '~'].includes(selector[0])
                );
        },

        // returns true if the value is a String
        isString(value) {
            return value === '' + value;
        },

        // returns true if the value is a Window
        isWindow(value) {
            return value instanceof Window;
        }

    });

    Object.assign(Core, {

        // returns a single dimensional array of classes (from a multi-dimensional array or space-separated strings)
        _parseClasses(classList) {
            return this.uniqueArray(
                this.flattenArray(classList)
                    .reduce(
                        (acc, val) =>
                            acc.concat(
                                ...val.split(' ')
                            ),
                        []
                    )
                    .filter(val => val)
            );
        },

        _parseData(key, value) {
            return this.isObject(key) ?
                key :
                { [key]: value };
        },

        // returns a "real" event from a dot-separated namespaced event
        _parseEvent(event) {
            return event.split('.').shift();
        },

        // returns an array of events from a space-separated string
        _parseEvents(events) {
            return events.split(' ');
        },

        // returns a FormData object from an array or object
        _parseFormData(data) {
            const formData = new FormData;

            if (this.isArray(data)) {
                const obj = {};
                data.forEach(value => obj[value.name] = value.value);
                data = obj;
            }

            this._parseFormValues(data, formData);

            return formData;
        },

        // recursively appends an object to a formData object
        _parseFormValues(data, formData, prevKey) {
            Object.keys(data).forEach(key => {
                const value = data[key];

                if (this.isPlainObject(value)) {
                    return this._parseFormValues(value, formData, key);
                }

                if (prevKey) {
                    key = `${prevKey}[${key}]`;
                }

                if (!this.isArray(value)) {
                    return formData.set(key, value);
                }

                value.forEach(val =>
                    formData.append(key, val)
                );
            });
        },

        // returns a URI-encoded attribute string from an array or object
        _parseParams(data) {
            let values = [];

            if (this.isArray(data)) {
                values = data.map(value =>
                    this._parseParam(
                        value.name,
                        value.value
                    )
                );
            }
            else if (this.isObject(data)) {
                values = Object.keys(data)
                    .map(key =>
                        this._parseParam(key, data[key])
                    );
            }

            return this.flattenArray(values)
                .map(encodeURI)
                .join('&');
        },

        // returns an array or string of key value pairs from an array, object or string
        _parseParam(key, value) {
            if (this.isArray(value)) {
                return value.map(val =>
                    this._parseParam(key, val)
                );
            }

            if (this.isObject(value)) {
                return Object.keys(value)
                    .map(subKey =>
                        this._parseParam(
                            key + '[' + subKey + ']',
                            value[subKey]
                        )
                    );
            }

            return key + '=' + value;
        },

        // returns a type and selector from a string (optionally only fast)
        _parseSelector(selector, fast = true) {
            const fastMatch = selector.match(this.fastRegex);

            if (fastMatch) {
                return fastMatch.slice(1);
            }

            if (!fast) {
                const specialMatch = selector.match(this.specialRegex);
                if (specialMatch) {
                    return specialMatch.slice(1);
                }
            }

            return [false, selector];
        },

        // returns an array of types and selectors from an array or string
        _parseSelectors(selectors) {
            if (!this.isArray(selectors)) {
                selectors = selectors.split(this.splitRegex)
                    .filter(selector => selector);
            }

            return selectors.map(selector =>
                this._parseSelector(
                    selector.trim(),
                    false
                )
            );
        },

        // returns the subquery selector from a string
        _parseSubQuery(selector) {
            return selector.match(this.subRegex)
                .slice(1);
        }

    });

    Object.assign(Core.prototype, {

        // perform an XHR request
        ajax(url, data = null) {
            if (Core.isObject(url)) {
                data = url;
            } else {
                data = data || {};
                data.url = url;
            }

            const settings = {
                ...Core.ajaxDefaults,
                ...data
            };

            if (!settings.url) {
                settings.url = window.location;
            }

            if (settings.cache) {
                settings.url += (
                    settings.url.indexOf('?') < 0 ?
                        '?' :
                        '&'
                ) + Date.now();
            }

            if (!settings.headers) {
                settings.headers = {};
            }

            if (settings.contentType && !settings.headers['Content-Type']) {
                settings.headers['Content-Type'] = settings.contentType;
            }

            if (!settings.headers['X-Requested-With']) {
                settings.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest;

                xhr.open(settings.method, settings.url, true);

                Object.keys(settings.headers)
                    .forEach(key =>
                        xhr.setRequestHeader(key, settings.headers[key])
                    );

                if (settings.responseType) {
                    xhr.responseType = settings.responseType;
                }

                xhr.onload = e => {
                    if (xhr.status > 400) {
                        reject(xhr.status, xhr, e);
                    } else {
                        resolve(xhr.response, xhr, e);
                    }
                };

                xhr.onerror = e => {
                    reject(xhr.status, xhr, e);
                };

                if (settings.uploadProgress) {
                    xhr.upload.onprogress = e => {
                        settings.uploadProgress(e.loaded / e.total, xhr, e);
                    };
                }

                if (settings.beforeSend) {
                    settings.beforeSend(xhr);
                }

                if (settings.data && settings.processData) {
                    if (settings.contentType == 'application/json') {
                        settings.data = JSON.stringify(settings.data);
                    } else {
                        settings.data = Core._parseParams(settings.data);
                    }
                }
                xhr.send(settings.data);
            });
        },

        // perform an XHR request for a file upload
        upload(url, data) {
            if (Core.isObject(url)) {
                data = url;
            } else {
                data.url = url;
            }

            if (!data.method) {
                data.method = 'POST';
            }

            if (data.data) {
                data.data = Core._parseFormData(data.data);
                data.processData = false;
                data.contentType = false;
            }

            return this.ajax(data);
        },

        // load and executes a JavaScript file
        loadScript(script, cache) {
            return this.ajax(script, { cache })
                .then(response =>
                    eval.apply(window, response)
                );
        },

        // load and execute multiple JavaScript files (in order)
        loadScripts(scripts, cache) {
            return Promise.all
                (
                    scripts.map(script =>
                        this.ajax(script, { cache })
                    )
                )
                .then(responses =>
                    responses.forEach(response =>
                        eval.apply(window, response)
                    )
                );
        },

        // import A CSS Stylesheet file
        loadStyle(stylesheet, cache) {
            return this.ajax(stylesheet, { cache })
                .then(response =>
                    this.append(
                        this.findOne('head'),
                        this.create('style', response)
                    )
                );
        },

        // import multiple CSS Stylesheet files
        loadStyles(stylesheets, cache) {
            const head = this.findOne('head');

            return Promise.all
                (
                    stylesheets.map(stylesheet =>
                        this.ajax(stylesheet, { cache })
                    )
                )
                .then(responses =>
                    responses.forEach(response =>
                        this.append(
                            head,
                            this.create('style', response)
                        )
                    )
                );
        }

    });

    Object.assign(Core.prototype, {

        // get a cookie value (optionally json encoded)
        getCookie(name, json = false)
        {
            const cookie = decodeURIComponent(this.context.cookie)
                .split(';')
                .find(cookie =>
                    cookie.trimStart()
                        .substring(0, name.length) === name
                );

            if (!cookie) {
                return null;
            }

            const value = cookie.trimStart().
                substring(name.length + 1);

            return json ?
                JSON.parse(value) :
                value;
        },

        // remove a cookie
        removeCookie(name, options)
        {
            this.setCookie(
                name,
                '',
                {
                    expires: -1,
                    ...options
                }
            );
        },

        // set a cookie (optionally json encoded)
        setCookie(name, value, options, json = false)
        {
            if (!name) {
                return;
            }

            if (json) {
                value = JSON.stringify(value);
            }

            let cookie = name + '=' + value;

            if (options) {
                if (options.expires) {
                    let date = new Date();
                    date.setTime(date.getTime() + (options.expires * 1000));
                    cookie += ';expires=' + date.toUTCString();
                }

                if (options.path) {
                    cookie += ';path=' + options.path;
                }

                if (options.secure) {
                    cookie += ';secure';
                }
            }

            this.context.cookie = cookie;
        }

    });

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

    Object.assign(Core.prototype, {

        // returns an element filter function from a function, string, node, node list, element list or array
        _parseFilter(filter)
        {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return filter;
            }

            if (Core.isString(filter)) {
                return node => node.matches(filter);
            }

            if (Core.isNode(filter)) {
                return node => node.isSameNode(filter);
            }

            filter = this.nodeArray(filter);
            if (filter.length) {
                return node => filter.includes(node);
            }

            return false;
        },

        // returns an element contains filter function from a function, string, node, node list, element list or array
        _parseFilterContains(filter)
        {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return filter;
            }

            if (Core.isString(filter)) {
                return node => !!this.findOne(node, filter);
            }

            if (Core.isNode(filter)) {
                return node => node.contains(filter);
            }

            filter = this.nodeArray(filter);
            if (filter.length) {
                return node => !!filter.find(other => node.contains(other));
            }

            return false;
        }

    });

    Object.assign(Core.prototype, {

        nodeArray(value, elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return Core.isString(value) ?
                this.find(value) :
                Core.makeArray(value)
                    .filter(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
        },

        nodeFirst(value, elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return Core.isString(value) ?
                this.findOne(value) :
                Core.makeArray(value)
                    .find(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
        },

        // sorts nodes by their position in the document
        sortNodes(nodes)
        {
            return this.nodeArray(nodes, false)
                .sort((a, b) =>
                {
                    if (a.isSameNode(b)) {
                        return 0;
                    }

                    const pos = a.compareDocumentPosition(b);
                    if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                        return -1;
                    }
                    else if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINS) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
        }

    });

    Object.assign(Core.prototype, {

        // returns an array containing nodes parsed from a HTML string
        parseHTML(html) {
            const fragment = this.context.createRange().createContextualFragment(html);
            return Array.from(fragment.children);
        },

        // returns an array of nodes from a HTML string, query selector string, node, node list, element list or array
        _parseQuery(query, elementsOnly = true, allowDocument = false, allowWindow = false) {
            if (query && Core.isString(query) && query.match(Core.htmlRegex)) {
                return this.parseHTML(query);
            }

            return this.nodeArray(query || '*', elementsOnly, allowDocument, allowWindow);
        }

    });

    // matches id, class or tag only selectors
    Core.fastRegex = /^\s*([\#\.]?)([\w\-]+)\s*$/;

    // matches a selector beginning with > + or ~
    Core.specialRegex = /^\s*([\>\+\~])(.*)$/;

    // splits the first node of a special selector
    Core.subRegex = /^\s*((?:[\w\#\.\:\-]|(?:\[(?:[^\[\]]*|\[[^\[\]]*\])*\]))*)\s*(.*)$/

    // splits comma seperator selectors into each selector
    Core.splitRegex = /\s*((?:[\w\#\.\:\-]|\[(?:[^\[\]]*|\[[^\[\]]*\])*\]|[\s\>\~\+])+)\s*\,?/;

    // matches html query strings
    Core.htmlRegex = /^\s*\</;

    // css properties that have number-only values
    Core.cssNumberProperties = ['font-weight', 'line-height', 'opacity', 'orphans', 'widows', 'z-index'];

    // default ajax settings
    Core.ajaxDefaults = {
        beforeSend: false,
        cache: false,
        contentType: 'application/x-www-form-urlencoded', //'application/x-www-form-urlencoded',
        data: false,
        dataType: false,
        method: 'GET',
        processData: true,
        url: false
    };

    class QuerySet
    {

        constructor(nodes, core = core)
        {
            this.core = core;
            this.nodes = this.core._parseQuery(nodes, true, true, true);
            this.stack = [];
        }

        delay(duration)
        {
            return this.queue(() =>
                new Promise(resolve =>
                    setTimeout(
                        resolve,
                        duration
                    )
                )
            );
        }

        each(callback)
        {
            this.nodes.forEach(callback);
            return this;
        }

        eq(index)
        {
            return this.pushStack(this.get(index));
        }

        filter(callback)
        {
            return this.pushStack(this.nodes.filter(callback));
        }

        first()
        {
            return this.eq(0);
        }

        get(index = false)
        {
            if (index === false) {
                return this.nodes;
            }

            return index < 0 ?
                this.nodes[index + this.nodes.length] :
                this.nodes[index];
        }

        last()
        {
            return this.eq(-1);
        }

        map(callback)
        {
            this.nodes.map(callback);
            return this;
        }

        popStack()
        {
            this.nodes = this.stack.pop() || [];
            return this;
        }

        pushStack(nodes)
        {
            this.stack.push(this.nodes.slice());
            this.nodes = nodes;
            return this;
        }

        slice(...args)
        {
            return this.pushStack(this.nodes.slice(...args));
        }

    }

    class QuerySetImmutable extends QuerySet
    {

        pushStack(nodes)
        {
            return new QuerySetImmutable(nodes);
        }

    }

    Object.assign(QuerySet.prototype, {

        // add an animation to each element
        animate(callback, options) {
            return this.queue(node => this.core.animate(node, callback, options));
        },

        // stop all animations for each element
        stop(finish = true) {
            this.core.stop(this.nodes, finish);
            return this.clearQueue();
        }

    });

    Object.assign(QuerySet.prototype, {

        // slide each element in from the top over a duration
        dropIn(options) {
            return this.queue(node => this.core.dropIn(node, options));
        },

        // slide each element out to the top over a duration
        dropOut(options) {
            return this.queue(node => this.core.dropOut(node, options));
        },

        // fade the opacity of each element in over a duration
        fadeIn(options) {
            return this.queue(node => this.core.fadeIn(node, options));
        },

        // fade the opacity of each element out over a duration
        fadeOut(options) {
            return this.queue(node => this.core.fadeOut(node, options));
        },

        // rotate each element in on an x,y over a duration
        rotateIn(options) {
            return this.queue(node => this.core.rotateIn(node, options));
        },

        // rotate each element out on an x,y over a duration
        rotateOut(options) {
            return this.queue(node => this.core.rotateOut(node, options));
        },

        // slide each element into place from a direction over a duration
        slideIn(options) {
            return this.queue(node => this.core.slideIn(node, options));
        },

        // slide each element out of place to a direction over a duration
        slideOut(options) {
            return this.queue(node => this.core.slideOut(node, options));
        },

        // squeeze each element into place from a direction over a duration
        squeezeIn(options) {
            return this.queue(node => this.core.squeezeIn(node, options));
        },

        // squeeze each element out of place to a direction over a duration
        squeezeOut(options) {
            return this.queue(node => this.core.squeezeOut(node, options));
        }

    });

    Object.assign(QuerySet.prototype, {

        // clear the queue of each element
        clearQueue()
        {
            this.core.clearQueue(this.nodes);
            return this;
        },

        // queue a callback on each element
        queue(callback)
        {
            this.core.queue(this.nodes, callback);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get an attribute value for the first element
        getAttribute(attribute)
        {
            return this.core.getAttribute(this.nodes, attribute);
        },

        // get a dataset value for the first element
        getDataset(key)
        {
            return this.core.getDataset(this.nodes, key);
        },

        // get the HTML contents of the first element
        getHTML()
        {
            return this.core.getHTML(this.nodes);
        },

        // get a property value for the first element
        getProperty(property)
        {
            return this.core.getProperty(this.nodes, property);
        },

        // get the text contents of the first element
        getText()
        {
            return this.core.getText(this.nodes);
        },

        // get the value property of the first element
        getValue()
        {
            return this.core.getValue(this.nodes);
        },

        // remove an attribute from each element
        removeAttribute(attribute)
        {
            this.core.removeAttribute(this.nodes, attribute);
            return this;
        },

        // remove a property from each element
        removeProperty(property)
        {
            this.core.removeProperty(this.nodes, property);
            return this;
        },

        // set attributes for each element
        setAttribute(attribute, value)
        {
            this.core.setAttribute(this.nodes, attribute, value);
            return this;
        },

        // set dataset values for each element
        setDataset(key, value)
        {
            this.core.setDataset(this.nodes, key, value);
            return this;
        },

        // set the HTML contents for each element
        setHTML(html)
        {
            this.core.setHTML(this.nodes, html);
            return this;
        },

        // set property values for each element
        setProperty(property, value)
        {
            this.core.setProperty(this.nodes, property, value);
            return this;
        },

        // set the text contents for each element
        setText(text)
        {
            this.core.setText(this.nodes, text);
            return this;
        },

        // set the value property for each element
        setValue(value)
        {
            this.core.setValue(this.nodes, value);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get data for the first node
        getData(key)
        {
            return this.core.getData(this.nodes, key);
        },

        // remove custom data for each node
        removeData(key)
        {
            this.core.removeData(this.nodes, key);
            return this;
        },

        // set custom data for each node
        setData(key, value)
        {
            this.core.setData(this.nodes, key, value);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get the X,Y co-ordinates for the center of the first element (optionally offset)
        center(offset)
        {
            return this.core.center(this.nodes, offset);
        },

        // constrain each element to a container element
        constrain(container)
        {
            return this.core.constrain(this.nodes, container);
        },

        // get the distance of an element to an X, Y position in the window
        distTo(x, y)
        {
            return this.core.distTo(this.nodes, x, y);
        },

        // get the distance between two elements
        distToNode(others)
        {
            return this.core.distToNode(this.nodes, others);
        },

        // get the nearest element to an X, Y position in the window
        nearestTo(x, y)
        {
            return this.core.nearestTo(this.nodes, x, y);
        },

        // get the nearest element to another element
        nearestToNode(others)
        {
            return this.core.nearestToNode(this.nodes, others);
        },

        // get the percentage of an X co-ordinate relative to an element
        percentX(x)
        {
            return this.core.percentX(this.nodes, x);
        },

        // get the percentage of a Y co-ordinate relative to an element
        percentY(y)
        {
            return this.core.percentY(this.nodes, y);
        },

        // get the position of the first element relative to the window (optionally offset)
        position(offset)
        {
            return this.core.position(this.nodes, offset);
        },

        // get the computed bounding rectangle of the first element
        rect(offset)
        {
            return this.core.rect(this.nodes, offset);
        }

    });

    Object.assign(QuerySet.prototype, {

        // scroll each element to an X, Y position
        scrollTo(x, y)
        {
            this.core.scrollTo(this.nodes, x, y);
            return this;
        },

        // scroll each element to an X position
        scrollToX(x)
        {
            this.core.scrollToX(this.nodes, x);
            return this;
        },

        // scroll each element to a Y position
        scrollToY(y)
        {
            this.core.scrollToY(this.nodes, y);
            return this;
        },

        // get the scroll X position of the first element
        scrollX()
        {
            return this.core.scrollX(this.nodes);
        },

        // get the scroll Y position of the first element
        scrollY()
        {
            return this.core.scrollY(this.nodes);
        }

    });

    Object.assign(QuerySet.prototype, {

        // get the computed height of the first element
        // (and optionally padding, border or margin)
        height(padding, border, margin)
        {
            return this.core.height(this.nodes, padding, border, margin);
        },

        // get the computed width of the first element
        // (and optionally padding, border or margin)
        width(padding, border, margin)
        {
            return this.core.width(this.nodes, padding, border, margin);
        }

    });

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

    Object.assign(QuerySet.prototype, {

        // add an event to each element
        addEvent(events, delegate, callback)
        {
            this.core.addEvent(this.nodes, events, delegate, callback);
            return this;
        },

        // add a self-destructing event to each element
        addEventOnce(events, delegate, callback)
        {
            this.core.addEvent(this.nodes, events, delegate, callback, true);
            return this;
        },

        // trigger a blur event on the first element
        blur()
        {
            this.core.blur(this.nodes);
            return this;
        },

        // trigger a click event on the first element
        click()
        {
            this.core.click(this.nodes);
            return this;
        },

        // clone all events from each element to other elements
        cloneEvents(clones)
        {
            this.core.cloneEvents(this.nodes, clones);
            return this;
        },

        // trigger a focus event on the first element
        focus()
        {
            this.core.focus(this.nodes);
            return this;
        },

        // remove an event from each element
        removeEvent(events, delegate, callback)
        {
            this.core.removeEvent(this.nodes, events, delegate, callback);
            return this;
        },

        // trigger an event on each element
        triggerEvent(events, data)
        {
            this.core.triggerEvent(this.nodes, events, data);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // insert each other node after the first node
        after(others)
        {
            this.core.after(this.nodes, others);
            return this;
        },

        // append each other nodes to the first node
        append(others)
        {
            this.core.append(this.nodes, others);
            return this;
        },

        // append each node to the first other node
        appendTo(others)
        {
            this.core.appendTo(this.nodes, others);
            return this;
        },

        // insert each other node before the first node
        before(others)
        {
            this.core.before(this.nodes, others);
            return this;
        },

        // clone each node (optionally deep, and with events and data)
        clone(deep = true, eventsData = false)
        {
            return this.pushStack(this.core.clone(this.nodes, deep, eventsData));
        },

        // detach an element from the DOM
        detach()
        {
            this.core.detach(this.nodes);
            return this;
        },

        // remove all children of each node from the DOM
        empty()
        {
            this.core.empty(this.nodes);
            return this;
        },

        // insert each node after the first other node
        insertAfter(others)
        {
            this.core.insertAfter(this.nodes, others);
            return this;
        },

        // insert each node before the first other node
        insertBefore(others)
        {
            this.core.insertBefore(this.nodes, others);
            return this;
        },

        // prepend each other node to the first node
        prepend(others)
        {
            this.core.prepend(this.nodes, others);
            return this;
        },

        // prepend each node to the first other node
        prependTo(others)
        {
            this.core.prependTo(this.nodes, others);
            return this;
        },

        // remove each node from the DOM
        remove()
        {
            this.core.remove(this.nodes);
            return this;
        },

        // replace each other node with nodes
        replaceAll(others)
        {
            this.core.replaceAll(this.nodes, others);
            return this;
        },

        // replace each node with other nodes
        replaceWith(others)
        {
            this.core.replaceWith(this.nodes, others);
            return this;
        },

        // unwrap each node (optionally matching a filter)
        unwrap(filter)
        {
            this.core.unwrap(this.nodes, filter);
            return this;
        },

        // wrap each nodes with other nodes
        wrap(others)
        {
            this.core.wrap(this.nodes, others);
            return this;
        },

        // wrap all nodes with other nodes
        wrapAll(others)
        {
            this.core.wrapAll(this.nodes, others);
            return this;
        },

        // wrap the contents of each node with other nodes
        wrapInner(others)
        {
            this.core.wrapInner(this.nodes, others);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // returns true if any of the elements contains a descendent matching a filter
        contains(filter)
        {
            return this.core.contains(this.nodes, filter);
        },

        // returns true if any of the elements has a specified attribute
        hasAttribute(attribute)
        {
            return this.core.hasAttribute(this.nodes, attribute);
        },

        // returns true if any of the elements has any of the specified classes
        hasClass(...classes)
        {
            return this.core.hasClass(this.nodes, ...classes);
        },

        // returns true if any of the nodes has data
        hasData(key)
        {
            return this.core.hasData(this.nodes, key);
        },

        // returns true if any of the elements has a specified property
        hasProperty(property)
        {
            return this.core.hasProperty(this.nodes, property);
        },

        // returns true if any of the elements or a parent of the elements is "fixed"
        isFixed()
        {
            return this.core.isFixed(this.nodes);
        },

        // returns true if any of the elements in the set is hidden
        isHidden()
        {
            return this.core.isHidden(this.nodes);
        },

        // returns true if any of the elements in the set is visible
        isVisible()
        {
            return this.core.isVisible(this.nodes);
        }

    });

    Object.assign(QuerySet.prototype, {

        // return all elements matching a filter
        filter(filter)
        {
            return this.pushStack(this.core.filter(this.nodes, filter));
        },

        // return the first element matching a filter
        filterOne(filter)
        {
            return this.pushStack(this.core.filterOne(this.nodes, filter));
        },

        // return all elements with a descendent matching the selector
        has(selector)
        {
            return this.pushStack(this.core.has(this.nodes, selector));
        },

        // return all hidden elements
        hidden()
        {
            return this.pushStack(this.core.hidden(this.nodes));
        },

        // return all elements not matching a filter
        not(filter)
        {
            return this.pushStack(this.core.not(this.nodes, filter));
        },

        // return all visible elements
        visible()
        {
            return this.pushStack(this.core.visible(this.nodes));
        }

    });

    Object.assign(QuerySet.prototype, {

        // find all elements matching a selector
        find(selector)
        {
            return this.pushStack(this.core.find(this.nodes, selector));
        },

        // find all elements with a specific class
        findByClass(className)
        {
            return this.pushStack(this.core.findByClass(this.nodes, className));
        },

        // find all elements with a specific ID
        findById(id)
        {
            return this.pushStack(this.core.findById(this.nodes, id));
        },

        // find all elements with a specific tag
        findByTag(tagName)
        {
            return this.pushStack(this.core.findByTag(this.nodes, tagName));
        },

        // find a single element matching a selector
        findOne(selector)
        {
            return this.pushStack(this.core.findOne(this.nodes, selector));
        },

        // find the first element with a specific class
        findOneByClass(className)
        {
            return this.pushStack(this.core.findOneByClass(this.nodes, className));
        },

        // find the first element with a specific ID
        findOneById(id)
        {
            return this.pushStack(this.core.findOneById(this.nodes, id));
        },

        // find the first element with a specific tag
        findOneByTag(tagName)
        {
            return this.pushStack(this.core.findOneByTag(this.nodes, tagName));
        }

    });

    Object.assign(QuerySet.prototype, {

        // find the closest ancestor to each element matching a filter,
        // and optionally before hitting a limit
        closest(filter, until)
        {
            return this.pushStack(this.core.closest(this.nodes, filter, until));
        },

        // find the first child of each element matching a filter
        child(filter)
        {
            return this.pushStack(this.core.child(this.nodes, filter));
        },

        // find all children of each element,
        // and optionally matching a filter
        children(filter)
        {
            return this.pushStack(this.core.children(this.nodes, filter));
        },

        // find all child nodes for each element,
        // (including text and comment nodes)
        contents() {
            return this.pushStack(this.core.contents(this.nodes));
        },

        // find the next sibling for each element matching a filter
        next(filter)
        {
            return this.pushStack(this.core.next(this.nodes, filter));
        },

        // find all next siblings for each element matching a filter,
        // and optionally before hitting a limit
        nextAll(filter, until = false, first = false)
        {
            return this.pushStack(this.core.nextAll(this.nodes, filter, until, first));
        },

        // find the offset parent (relatively positioned) of the first element
        offsetParent()
        {
            return this.pushStack(this.core.offsetParent(this.nodes));
        },

        // find the parent of each element matching a filter
        parent(filter)
        {
            return this.pushStack(this.core.parent(this.nodes, filter));
        },

        // find all parents of each element matching a filter,
        // and optionally before hitting a limit
        parents(filter, until)
        {
            return this.pushStack(this.core.parents(this.nodes, filter, until));
        },

        // find the previous sibling for each element matching a filter,
        // and optionally before hitting a limit
        prev(filter)
        {
            return this.pushStack(this.core.prev(this.nodes, filter));
        },

        // find all previous siblings for each element matching a filter,
        // and optionally before hitting a limit
        prevAll(filter, until = false, first = false)
        {
            return this.pushStack(this.core.prevAll(this.nodes, filter, until, first));
        },

        // find all siblings for each element matching a filter
        siblings(filter)
        {
            return this.pushStack(this.core.siblings(this.nodes, filter));
        }

    });

    Object.assign(QuerySet.prototype, {

        // force an element to be shown, and then execute a callback
        forceShow(callback)
        {
            return this.core.forceShow(this.nodes, callback);
        },

        // get the index of the first element matching a filter
        index(filter)
        {
            return this.core.index(this.nodes, filter);
        },

        // get the index of the first element relative to it's parent element
        indexOf()
        {
            return this.core.indexOf(this.nodes);
        },

        // create a selection on the first node
        select()
        {
            this.core.select(this.nodes);
            return this;
        },

        // create a selection on all nodes
        selectAll()
        {
            this.core.selectAll(this.nodes);
            return this;
        },

        // returns a serialized string containing names and values of all form elements
        serialize()
        {
            return this.core.serialize(this.nodes);
        },

        // returns a serialized array containing names and values of all form elements
        serializeArray()
        {
            return this.core.serializeArray(this.nodes);
        },

        // returns an object containing keys and values of all form elements
        serializeObject()
        {
            return this.core.serializeObject(this.nodes);
        }

    });

    return {
        Core,
        core: new Core,
        QuerySet,
        QuerySetImmutable
    };

});