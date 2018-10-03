(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

    const frost = {};

    class Core
    {

        constructor(context)
        {
            this.context = context || window.document;

            this.animating = false;
            this.animations = new Map;
            this.queues = new WeakMap;

            this.nodeData = new WeakMap;
            this.nodeEvents = new WeakMap;
            this.nodeStyles = new WeakMap;
        }

        // jQuery-like query method,
        // add a function to the ready queue or return a QuerySet (optionally mutable)
        query(query, mutable = true)
        {
            if (frost.isFunction(query)) {
                return this.ready(query);
            }

            return mutable ?
                new QuerySet(query) :
                new QuerySetImmutable(query);
        }

        // add a function to the ready queue
        ready(callback)
        {
            if (this.context.readyState === 'complete') {
                callback();
            } else {
                this.addEvent(window, 'DOMContentLoaded', callback);
            }
        }

    }

    Object.assign(Core.prototype, {

        // add an animation to each element
        animate(nodes, callback, duration = 1000)
        {
            const start = Date.now();
            const promises = [];

            Core.nodeArray(nodes)
                .forEach(node => {
                    if ( ! this.animations.has(node)) {
                        this.animations.set(node, []);
                    }

                    const promise = new Promise((resolve, reject) => {
                        const animation = (stop = false, finish = false) => {
                            if ( ! core.contains(this.context, node) || (stop && ! finish)) {
                                reject(node);
                                return false;
                            }

                            const progress = finish ? 1 : frost.clamp((Date.now() - start) / duration);
                            callback(node, progress);

                            if (progress === 1) {
                                resolve(node);
                                return false;
                            }

                            return true;
                        };

                        this.animations.get(node).push(animation);
                    });

                    promises.push(promise);
                });

            if (promises.length && ! this.animating) {
                this.animating = true;
                this.animationFrame();
            }

            return Promise.all(promises);
        },

        // run a single frame of all animations, and then queue up the next frame
        animationFrame()
        {
            const completeNodes = [];

            this.animations.forEach((animations, node) => {
                const completeAnimations = [];

                animations.forEach((animation, index) => {
                    if ( ! animation()) {
                        completeAnimations.push(index);
                    }
                });

                if ( ! completeAnimations.length) {
                    return;
                }

                animations = animations.filter((animation, index) => ! completeAnimations.includes(index));

                if ( ! animations.length) {
                    completeNodes.push(node);
                }
            });

            completeNodes.forEach(node => this.animations.delete(node));

            if (this.animations.size) {
                window.requestAnimationFrame(() => this.animationFrame());
            } else {
                this.animating = false;
            }
        },

        // stop all animations for each element
        stop(nodes, finish = true)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    if ( ! this.animations.has(node)) {
                        return;
                    }

                    const animations = this.animations.get(node);
                    animations.forEach(animation => animation(true, finish));
                    this.animations.delete(node);
                });
        }

    });

    Object.assign(Core.prototype, {

        // slide each element in from the top over a duration
        dropIn(nodes, duration = 1000)
        {
            return this.slideIn(nodes, 'top', duration);
        },

        // slide each element out to the top over a duration
        dropOut(nodes, duration = 1000)
        {
            return this.slideOut(nodes, 'top', duration);
        },

        // fade the opacity of each element in over a duration
        fadeIn(nodes, duration = 1000)
        {
            return this.animate(nodes, (node, progress) =>
                this.setStyle(node, 'opacity', progress < 1 ? progress : '')
            , duration);
        },

        // fade the opacity of each element out over a duration
        fadeOut(nodes, duration = 1000)
        {
            return this.animate(nodes, (node, progress) =>
                this.setStyle(node, 'opacity', progress < 1 ? 1 - progress : '')
            , duration);
        },

        // rotate each element in on an x,y over a duration
        rotateIn(nodes, x = 0, y = 1, inverse = false, duration = 1000)
        {
            return this.animate(nodes, (node, progress) => {
                if (progress === 1) {
                    return this.setStyle(node, 'transform', '');
                }

                let amount = 90 - (progress * 90);

                if (inverse) {
                    amount *= -1;
                }

                this.setStyle(node, 'transform', 'rotate3d(' + x + ', ' + y + ', 0, ' + amount + 'deg)');
            }, duration);
        },

        // rotate each element out on an x,y over a duration
        rotateOut(nodes, x = 0, y = 1, inverse = false, duration = 1000)
        {
            return this.animate(nodes, (node, progress) => {

                if (progress === 1) {
                    return this.setStyle(node, 'transform', '');
                }

                let amount = progress * 90;

                if (inverse) {
                    amount *= -1;
                }

                this.setStyle(node, 'transform', 'rotate3d(' + x + ', ' + y + ', 0, ' + amount + 'deg)');
            }, duration);
        },

        // slide each element into place from a direction over a duration
        slideIn(nodes, direction = 'bottom', duration = 1000)
        {
            return this.animate(nodes, (node, progress) => {

                if (progress === 1) {
                    return this.setStyle(node, 'transform', '');
                }

                const dir = frost.isFunction(direction) ?
                    direction() : direction;

                if (dir === 'top' || dir === 'bottom') {
                    const height = this.height(node);
                    let amount = Math.round(height - (height * progress));
                    if (dir === 'top') {
                        amount *= -1;
                    }
                    this.setStyle(node, 'transform', 'translateY(' + amount + 'px)');
                } else {
                    const width = this.width(node);
                    let amount = Math.round(width - (width * progress));
                    if (dir === 'left') {
                        amount *= -1;
                    }
                    this.setStyle(node, 'transform', 'translateX(' + amount + 'px)');
                }

            }, duration);
        },

        // slide each element out of place to a direction over a duration
        slideOut(nodes, direction = 'bottom', duration = 1000)
        {
            return this.animate(nodes, (node, progress) => {

                if (progress === 1) {
                    return this.setStyle(node, 'transform', '');
                }

                const dir = frost.isFunction(direction) ?
                    direction() : direction;

                if (dir === 'top' || dir === 'bottom') {
                    const height = this.height(node);
                    let amount = Math.round(height * progress);
                    if (dir === 'top') {
                        amount *= -1;
                    }
                    this.setStyle(node, 'transform', 'translateY(' + amount + 'px)');
                } else {
                    const width = this.width(node);
                    let amount = Math.round(width * progress);
                    if (dir === 'left') {
                        amount *= -1;
                    }
                    this.setStyle(node, 'transform', 'translateX(' + amount + 'px)');
                }

            }, duration);
        },

        // squeeze each element into place from a direction over a duration
        squeezeIn(nodes, direction = 'bottom', duration = 1000)
        {
            const wrapper = this.create('div');
            this.setStyle(wrapper, 'overflow', 'hidden');
            this.setStyle(wrapper, 'position', 'relative');

            const animations = [];

            Core.nodeArray(nodes)
                .forEach(node => {
                    this.wrap(node, wrapper);
                    const parent = this.parent(node);

                    animations.push(this.animate(node, (node, progress) => {
                        if (progress === 1) {
                            this.before(parent, this.contents(parent));
                            this.remove(parent);
                            return;
                        }

                        const dir = frost.isFunction(direction) ?
                            direction() : direction;

                        if (dir === 'top' || dir === 'bottom') {
                            const height = Math.round(this.height(node, true));
                            const width = Math.round(this.width(node, true, true, true));
                            this.setStyle(parent, 'width', width);

                            const amount = Math.round(height * progress);
                            this.setStyle(parent, 'height', amount);
                            if (dir === 'top') {
                                this.setStyle(parent, 'transform', 'translateY(' + (height - amount) + 'px)');
                            }
                        } else {
                            const height = Math.round(this.height(node, true, true, true));
                            const width = Math.round(this.width(node, true));
                            this.setStyle(parent, 'height', height);

                            const amount = Math.round(width * progress);
                            this.setStyle(parent, 'width', amount);
                            if (dir === 'left') {
                                this.setStyle(parent, 'transform', 'translateX(' + (width - amount) + 'px)');
                            }
                        }
                    }, duration));
                });

            return Promise.all(animations);
        },

        // squeeze each element out of place to a direction over a duration
        squeezeOut(nodes, direction = 'bottom', duration = 1000)
        {
            const wrapper = this.create('div');
            this.setStyle(wrapper, 'overflow', 'hidden');
            this.setStyle(wrapper, 'position', 'relative');

            const animations = [];

            Core.nodeArray(nodes)
                .forEach(node => {
                    this.wrap(node, wrapper);
                    const parent = this.parent(node);

                    animations.push(this.animate(node, (node, progress) => {
                        if (progress === 1) {
                            this.before(parent, this.contents(parent));
                            this.remove(parent);
                            return;
                        }

                        const dir = frost.isFunction(direction) ?
                            direction() : direction;

                        if (dir === 'top' || dir === 'bottom') {
                            const height = Math.round(this.height(node, true));
                            const width = Math.round(this.width(node, true, true, true));
                            this.setStyle(parent, 'width', width);

                            const amount = Math.round(height - (height * progress));
                            this.setStyle(parent, 'height', amount);
                            if (dir === 'top') {
                                this.setStyle(parent, 'transform', 'translateY(' + (height - amount) + 'px)');
                            }
                        } else {
                            const height = Math.round(this.height(node, true, true, true));
                            const width = Math.round(this.width(node, true));
                            this.setStyle(parent, 'height', height);

                            const amount = Math.round(width - (width * progress));
                            this.setStyle(parent, 'width', amount);
                            if (dir === 'left') {
                                this.setStyle(parent, 'transform', 'translateX(' + (width - amount) + 'px)');
                            }
                        }
                    }, duration));
                });

            return Promise.all(animations);
        }

    });

    Object.assign(Core.prototype, {

        // clear the queue of each element
        clearQueue(nodes)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    if ( ! this.queues.has(node)) {
                        return;
                    }

                    this.queues.delete(node);
                });
        },

        // run the next queued callback for each element
        dequeue(nodes)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    if ( ! this.queues.has(node)) {
                        return;
                    }

                    const next = this.queues.get(node).shift();

                    if ( ! next) {
                        this.queues.delete(node);
                        return;
                    }

                    Promise.resolve(next.bind(node)(node))
                        .finally(() => this.dequeue(node));
                });
        },

        // queue a callback on each element
        queue(nodes, callback)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    const newQueue = ! this.queues.has(node);
                    if (newQueue) {
                        this.queues.set(node, []);
                    }

                    this.queues.get(node).push(callback);

                    if (newQueue) {
                        this.dequeue(node);
                    }
                });
        }

    });

    Object.assign(Core.prototype, {

        /* ATTRIBUTES */

        // get an attribute value for the first element
        getAttribute(nodes, attribute)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            return node.getAttribute(attribute);
        },

        // set attributes for each element
        setAttribute(nodes, attribute, value)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    if (frost.isObject(attribute)) {
                        Object.keys(attribute)
                            .forEach(key => node.setAttribute(key, attribute[key]));
                        return;
                    }

                    node.setAttribute(attribute, value);
                });
        },

        // remove an attribute from each element
        removeAttribute(nodes, attribute)
        {
            Core.nodeArray(nodes)
                .forEach(node => node.removeAttribute(attribute));
        },

        /* DATASET */

        // get a dataset value for the first element
        getDataset(nodes, key)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            if ( ! key) {
                return node.dataset;
            }

            return node.dataset[key];
        },

        // set dataset values for each element
        setDataset(nodes, key, value)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    node.dataset[key] = value;
                });
        },

        /* HTML */

        // get the HTML contents of the first element
        getHTML(nodes)
        {
            return this.getProperty(nodes, 'innerHTML');
        },

        // set the HTML contents for each element
        setHTML(nodes, html)
        {
            this.empty(nodes);
            this.setProperty(nodes, 'innerHTML', html);
        },

        /* PROPERTIES */

        // get a property value for the first element
        getProperty(nodes, property)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            return node[property];
        },

        // set property values for each element
        setProperty(nodes, property, value)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    if (frost.isObject(property)) {
                        Object.keys(property).forEach(key => node[key] = property[key]);
                        return;
                    }

                    node[property] = value;
                });
        },

        // remove a property from each element
        removeProperty(nodes, property)
        {
            Core.nodeArray(nodes)
                .forEach(node => {
                    delete node[property];
                });
        },

        /* TEXT */

        // get the text contents of the first element
        getText(nodes)
        {
            return this.getProperty(nodes, 'innerText');
        },

        // set the text contents for each element
        setText(nodes, text)
        {
            this.empty(nodes);
            this.setProperty(nodes, 'innerText', text);
        },

        /* VALUE */

        // get the value property of the first element
        getValue(nodes)
        {
            return this.getProperty(nodes, 'value');
        },

        // set the value property for each element
        setValue(nodes, value)
        { 
            this.setProperty(nodes, 'value', value);
        }

    });

    Object.assign(Core.prototype, {

        // get custom data for the first node
        getData(nodes, key)
        {
            const node = Core.nodeFirst(nodes, false, true, true);

            if ( ! node) {
                return;
            }

            if ( ! this.nodeData.has(node)) {
                return;
            }

            const nodeData = this.nodeData.get(node);

            if ( ! key) {
                return nodeData;
            }

            return nodeData[key];
        },

        // set custom data for each node
        setData(nodes, key, value)
        {
            Core.nodeArray(nodes, false, true, true)
                .forEach(node => {
                    if ( ! this.nodeData.has(node)) {
                        this.nodeData.set(node, {});
                    }

                    this.getData(node)[key] = value;
                });
        },

        // remove custom data for each node
        removeData(nodes, key)
        {
            Core.nodeArray(nodes, false, true, true)
                .forEach(node => {
                    if ( ! this.nodeData.has(node)) {
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

            if ( ! nodeBox) {
                return;
            }

            return {
                x: nodeBox.left + nodeBox.width / 2,
                y: nodeBox.top + nodeBox.height / 2
            };
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

            return frost.dist(nodeCenter.x, nodeCenter.y, x, y);
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

            return frost.clampPercent((x - nodeBox.left) / nodeBox.width * 100);
        },

        // get the percentage of a Y co-ordinate relative to an element
        percentY(nodes, y, offset)
        {
            const nodeBox = this.rect(nodes, offset);

            if ( ! nodeBox) {
                return;
            }

            return frost.clampPercent((y - nodeBox.top) / nodeBox.height * 100);
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
        }

    });

    Object.assign(Core.prototype, {

        // scroll each element to an X,Y position
        scrollTo(nodes, x, y)
        {
            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    if (frost.isWindow(node)) {
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
        scrollToX(nodes, x)
        {
            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    if (frost.isWindow(node)) {
                        node.scroll(x, node.scrollY)
                    } else if (Core.isDocument(node)) {
                        node.scrollingElement.scrollLeft = x;
                    } else if (Core.isElement(node)) {
                        node.scrollLeft = x;
                    }
                });
        },

        // scroll each element to a Y position
        scrollToY(nodes, y)
        {
            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    if (frost.isWindow(node)) {
                        node.scroll(node.scrollX, y)
                    } else if (Core.isDocument(node)) {
                        node.scrollingElement.scrollTop = y;
                    } else if (Core.isElement(node)) {
                        node.scrollTop = y;
                    }
                });
        },

        // get the scroll X position of the first element
        scrollX(nodes)
        {
            let node = Core.nodeFirst(nodes, true, true, true);

            if ( ! node) {
                return;
            }

            if (frost.isWindow(node)) {
                return node.scrollX;
            }

            if (Core.isDocument(node)) {
                node = node.scrollingElement;
            }

            return node.scrollLeft;
        },

        // get the scroll Y position of the first element
        scrollY(nodes)
        {
            let node = Core.nodeFirst(nodes, true, true, true);

            if ( ! node) {
                return;
            }

            if (frost.isWindow(node)) {
                return node.scrollY;
            }

            if (Core.isDocument(node)) {
                node = node.scrollingElement;
            }

            return node.scrollTop;
        }

    });

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

    Object.assign(Core.prototype, {

        /* CLASSES */

        // add a class or classes to each element
        addClass(nodes, ...classes)
        {
            classes = Core.parseClasses(classes);

            if ( ! classes.length) {
                return;
            }

            Core.nodeArray(nodes)
                .forEach(node => node.classList.add(...classes));
        },

        // remove a class or classes from each element
        removeClass(nodes, ...classes)
        {
            classes = Core.parseClasses(classes);

            if ( ! classes.length) {
                return;
            }

            Core.nodeArray(nodes)
                .forEach(node => node.classList.remove(...classes));
        },

        // toggle a class or classes for each element
        toggleClass(nodes, ...classes)
        {
            classes = Core.parseClasses(classes);

            if ( ! classes.length) {
                return;
            }

            Core.nodeArray(nodes)
                .forEach(node => classes.forEach(className => node.classList.toggle(className)));
        },

        // get the computed style for the first element
        css(nodes, style)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            return window.getComputedStyle(node)[style];
        },

        /* STYLES */

        // get a style property for the first element
        getStyle(nodes, style)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            // camelize style property
            style = frost.snakeCase(style);

            return node.style.getPropertyValue(style);
        },

        // set style properties for each element
        setStyle(nodes, style, value, important)
        {
            // if style value is an object, loop through and set all values
            if (frost.isObject(style)) {
                Object.keys(style).forEach(key => this.setStyle(nodes, key, style[key]));
                return;
            }

            // camelize style property
            style = frost.snakeCase(style);

            // convert value to string
            value = '' + value;

            // if value is numeric and not a number property, add px
            if (value && frost.isNumeric(value) && ! Core.cssNumberProperties.includes(style)) {
                value = value + 'px';
            }

            Core.nodeArray(nodes)
                .forEach(node =>
                    node.style.setProperty(style, value, important ? 'important' : '')
                );
        },

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
            Core.nodeArray(nodes)
                .forEach(node =>
                    this.getStyle(node, 'display') === 'none' ?
                        this.show(node) :
                        this.hide(node)
                );
        }

    });

    Object.assign(Core.prototype, {

        // add an event to each element
        addEvent(nodes, events, delegate, callback, selfDestruct = false)
        {
            if (frost.isFunction(delegate)) {
                if (frost.isBoolean(callback)) {
                    selfDestruct = callback;
                }
                callback = delegate;
                delegate = false;
            }

            const eventArray = Core.parseEvents(events);

            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    let realCallback = callback;

                    if (selfDestruct) {
                        realCallback = this.selfDestructFactory(node, events, realCallback);
                    }

                    if (delegate) {
                        realCallback = this.delegateFactory(node, delegate, realCallback);
                    }

                    if ( ! this.nodeEvents.has(node)) {
                        this.nodeEvents.set(node, {});
                    }
                    const nodeEvents = this.nodeEvents.get(node);

                    const eventData = {
                        delegate: delegate,
                        callback: callback,
                        realCallback: realCallback
                    };

                    eventArray.forEach(event => {
                        const realEvent = Core.parseEvent(event);
                        eventData.event = event;
                        eventData.realEvent = realEvent;

                        if ( ! nodeEvents[realEvent]) {
                            nodeEvents[realEvent] = [];
                        } else if (nodeEvents[realEvent].includes(eventData)) {
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
            return this.addEvent(nodes, events, delegate, callback, true);
        },

        // trigger a blur event on the first element
        blur(nodes)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            node.blur();
        },

        // trigger a click event on the first element
        click(nodes)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            node.click();
        },

        // clone all events from each element to other elements
        cloneEvents(nodes, others)
        {
            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    if ( ! this.nodeEvents.has(node)) {
                        return;
                    }

                    this.nodeEvents.get(node).forEach(eventData => {
                        this.addEvent(others, eventData.event, eventData.delegate, eventData.callback);
                    });
                });
        },

        // trigger a focus event on the first element
        focus(nodes)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            node.focus();
        },

        // remove an event from each element
        removeEvent(nodes, events, delegate, callback)
        {
            if (delegate && frost.isFunction(delegate)) {
                callback = delegate;
                delegate = false;
            }

            let eventArray = events ? Core.parseEvents(events) : false;

            Core.nodeArray(nodes, true, true, true)
                .forEach(node => {
                    if ( ! this.nodeEvents.has(node)) {
                        return;
                    }

                    const nodeEvents = this.nodeEvents.get(node);
                    if ( ! eventArray) {
                        eventArray = Object.keys(nodeEvents);
                    }

                    eventArray.forEach(event => {
                        const realEvent = Core.parseEvent(event);

                        if ( ! nodeEvents[realEvent]) {
                            return;
                        }

                        let realEvents = nodeEvents[realEvent];
                        const remove = [];
                        realEvents.forEach((eventData, index) => {
                            if (realEvent === event) {
                                if (realEvent !== eventData.realEvent) {
                                    return;
                                }
                            } else if (event !== eventData.event) {
                                return;
                            }

                            if (delegate) {
                                if (delegate !== eventData.delegate || (callback && callback !== eventData.callback)) {
                                    return;
                                }
                            } else if (callback && callback !== eventData.realCallback) {
                                return;
                            }

                            node.removeEventListener(eventData.realEvent, eventData.realCallback);
                            remove.push(index);
                        });

                        realEvents = realEvents.filter((eventData, index) => ! remove.includes(index));
                        if ( ! realEvents.length) {
                            delete nodeEvents[realEvent];
                        }
                    });

                    if ( ! Object.keys(nodeEvents).length) {
                        this.nodeEvents.delete(node);
                    }
                });
        },

        // trigger an event on each element
        triggerEvent(nodes, events, data)
        {
            Core.nodeArray(nodes, true, true, true)
                .forEach(node =>
                    Core.parseEvents(events).forEach(event => {
                        const realEvent = Core.parseEvent(event);

                        const eventData = new Event(realEvent);
                        if (data) {
                            Object.assign(eventData, data);
                        }

                        node.dispatchEvent(eventData);
                    })
                );
        }

    });

    Object.assign(Core.prototype, {

        // insert each other node after the first node
        after(nodes, others)
        {
            const node = Core.nodeFirst(nodes, false);

            if ( ! node) {
                return;
            }

            if ( ! node.parentNode) {
                return;
            }

            this.parseQuery(others)
                .reverse()
                .forEach(other => node.parentNode.insertBefore(other, node.nextSibling));
        },

        // append each other node to the first node
        append(nodes, others)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            this.parseQuery(others, false)
                .forEach(other => node.insertBefore(other, null));
        },

        // append each node to the first other node
        appendTo(nodes, others)
        {
            this.append(others, nodes);
        },

        // insert each other node before the first node
        before(nodes, others)
        {
            const node = Core.nodeFirst(nodes, false);

            if ( ! node) {
                return;
            }

            if ( ! node.parentNode) {
                return;
            }

            this.parseQuery(others, false)
                .forEach(other => node.parentNode.insertBefore(other, node));
        },

        // clone each node (optionally deep, and with events and data)
        clone(nodes, deep = true, eventsData = false)
        {
            const results = [];

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    const clone = node.cloneNode(deep);

                    if (eventsData) {
                        this.cloneEvents(node, clone);
                        this.cloneData(node, clone);

                        if (deep) {
                            const contents = this.find(node, '*');
                            this.find(clone, '*').forEach((child, index) => {
                                this.cloneEvents(contents[index], child);
                                this.cloneData(contents[index], child);
                            });
                        }
                    }

                    results.push(clone);
                });

            return results;
        },

        // create a new DOM element
        create(tagName)
        {
            return this.context.createElement(tagName);
        },

        // detach an element from the DOM
        detach(nodes)
        {
            Core.nodeArray(nodes, false)
                .forEach(node => {
                    if ( ! node.parentNode) {
                        return;
                    }

                    node.parentNode.removeChild(node);
                });
        },

        // remove all children of each node from the DOM
        empty(nodes)
        {
            this.remove(this.find(nodes, '*'), false);
            this.setProperty(nodes, 'innerHTML', '');
        },

        // insert each node after the first other node
        insertAfter(nodes, others)
        {
            this.after(others, nodes);
        },

        // insert each node before the first other node
        insertBefore(nodes, others)
        {
            this.before(others, nodes);
        },

        // prepend each other node to the first node
        prepend(nodes, others)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            this.parseQuery(others, false)
                .reverse()
                .forEach(other => node.insertBefore(other, node.firstChild));
        },

        // prepend each node to the first other node
        prependTo(nodes, others)
        {
            this.prepend(others, nodes);
        },

        // remove each node from the DOM
        remove(nodes, deep = true)
        {
            if (deep) {
                this.empty(nodes);
            }

            this.clearQueue(nodes);
            this.stop(nodes);
            this.removeEvent(nodes);
            this.removeData(nodes);
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
            others = this.parseQuery(others, false);

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    this.before(node, this.clone(others, true));
                    this.remove(node);
                });
        },

        // unwrap each node (optionally matching a filter)
        unwrap(nodes, filter)
        {
            Core.nodeArray(nodes, false)
                .forEach(node => {
                    const parent = this.parent(node, filter);

                    if ( ! parent) {
                        return;
                    }

                    this.before(parent, this.contents(parent));
                    this.remove(parent);
                });
        },

        // wrap each nodes with other nodes
        wrap(nodes, others)
        {
            others = this.parseQuery(others);

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    const clone = this.clone(others, true);
                    this.before(node, clone);
                    this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, node);
                });
        },

        // wrap all nodes with other nodes
        wrapAll(nodes, others)
        {
            others = this.parseQuery(others);

            const clone = this.clone(others, true);
            this.before(nodes, clone);
            this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, nodes);
        },

        // wrap the contents of each node with other nodes
        wrapInner(nodes, others)
        {
            others = this.parseQuery(others);

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    const clone = this.clone(others, true);
                    this.append(node, clone);
                    this.append(this.filterOne(this.find(clone, '*'), test => ! this.child(test)) || clone, this.contents(node));
                });
        }

    });

    Object.assign(Core.prototype, {

        // returns true if any of the elements contains a descendent matching a filter
        contains(nodes, filter)
        {
            filter = Core.parseFilterContains(filter);

            return !! Core.nodeArray(nodes, true, true)
                .find(node => ! filter || filter(node));
        },

        // returns true if any of the elements has a specified attribute
        hasAttribute(nodes, attribute)
        {
            return !! Core.nodeArray(nodes)
                .find(node => node.hasAttribute(attribute));
        },

        // returns true if any of the elements has any of the specified classes
        hasClass(nodes, ...classes)
        {
            classes = Core.parseClasses(classes);

            return !! Core.nodeArray(nodes)
                .find(node => classes.find(className => node.classList.contains(className)));
        },

        // returns true if any of the nodes has custom data
        hasData(nodes, key)
        {
            return !! Core.nodeArray(nodes, false)
                .find(node => this.nodeData.has(node) && ( ! key || this.nodeData.get(node).hasOwnProperty(key)));
        },

        // returns true if any of the elements has a specified property
        hasProperty(nodes, prop)
        {
            return !! Core.nodeArray(nodes)
                .find(node => node.hasOwnProperty(prop));
        },

        // returns true if any of the elements matches a filter
        is(filter)
        {
            filter = Core.parseFilter(filter);

            return !! Core.nodeArray(nodes)
                .find(node => ! filter || filter(node));
        },

        // returns true if any of the elements or a parent of any of the elements is "fixed"
        isFixed(nodes)
        {
            return !! Core.nodeArray(nodes)
                .find(node => this.css(node, 'position') === 'fixed' || this.closest(node, parent => this.css(parent, 'position') === 'fixed'));
        },

        // returns true if any of the elements is hidden
        isHidden(nodes)
        {
            return !! Core.nodeArray(nodes, false, true)
                .find(node => ! Core.isDocument(node) && (Core.isNode(node) && ! node.offsetParent));
        },

        // returns true if any of the elements is visible
        isVisible(nodes)
        {
            return !! Core.nodeArray(nodes, false, true, true)
                .find(node => frost.isWindow(node) || Core.isDocument(node) || (Core.isNode(node) && node.offsetParent));
        }

    });

    Object.assign(Core.prototype, {

        // return all elements matching a filter
        filter(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            return Core.nodeArray(nodes)
                .filter((node, index) => ! filter || filter(node, index));
        },

        // return the first element matching a filter
        filterOne(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            return Core.nodeArray(nodes)
                .find((node, index) => ! filter || filter(node, index)) || null;
        },

        // return all elements with a descendent matching a filter
        has(nodes, filter)
        {
            filter = Core.parseFilterContains(filter);

            return !! Core.nodeArray(nodes, true, true)
                .filter(node => ! filter || filter(node));
        },

        // return all hidden elements
        hidden(nodes)
        {
            return Core.nodeArray(nodes)
                .filter(node => this.isHidden(node));
        },

        // return all elements not matching a filter
        not(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            return Core.nodeArray(nodes)
                .filter((node, index) => filter && ! filter(node, index));
        },

        // return all visible elements
        visible(nodes)
        {
            return Core.nodeArray(nodes)
                .filter(node => this.isVisible(node));
        }

    });

    Object.assign(Core.prototype, {

        // find all elements matching a selector
        find(nodes, selectors)
        {
            if ( ! selectors) {
                selectors = nodes;
                nodes = this.context;
            }

            const [type, value] = Core.parseSelector(selectors);
 
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

        // find all elements with a specific class
        findByClass(nodes, className)
        {
            const results = new Set;

            Core.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.getElementsByClassName(className))
                        .forEach(result => results.add(result))
                );

            return Core.sortNodes([...results]);
        },

        // find all elements with a specific ID
        findById(nodes, id)
        {
            return this.findSelector(nodes, '#' + id);
        },

        // find all elements with a specific tag
        findByTag(nodes, tagName)
        {
            const results = new Set;

            Core.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.getElementsByTagName(tagName))
                        .forEach(result => results.add(result))
                );

            return Core.sortNodes([...results]);
        },

        // find all elements matching a standard CSS selector
        findSelector(nodes, selector)
        {
            const results = new Set;

            Core.nodeArray(nodes, true, true)
                .forEach(node =>
                    Array.from(node.querySelectorAll(selector))
                        .forEach(result => results.add(result))
                );

            return Core.sortNodes([...results]);
        },

        // find a single element matching a selector
        findOne(nodes, selectors)
        {
            if ( ! selectors) {
                selectors = nodes;
                nodes = this.context;
            }

            const [type, value] = Core.parseSelector(selectors);
 
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

        // find the first element with a specific class
        findOneByClass(nodes, className)
        {
            return this.findByClass(nodes, className).shift() || null;
        },

        // find the first element with a specific ID
        findOneById(nodes, id)
        {
            const results = new Set;

            Core.nodeArray(nodes, true, true)
                .forEach(node => results.add(node.getElementById(id)));

            return Core.sortNodes([...results].filter(node => !! node)).shift() || null;
        },

        // find the first element with a specific tag
        findOneByTag(nodes, tagName)
        {
            return this.findByTag(nodes, tagName).shift() || null;
        },

        // find the first element matching a standard CSS selector
        findOneSelector(nodes, selector)
        {
            const results = new Set;

            Core.nodeArray(nodes, true, true)
                .forEach(node => results.add(node.querySelector(selector)));

            return Core.sortNodes([...results].filter(node => !! node)).shift() || null;
        },

        // find all elements matching a custom CSS selector
        _findByCustom(nodes, selectors)
        {
            const results = new Set;

            Core.parseSelectors(selectors)
                .forEach(selector => {
                    const [type, value] = selector;
                    let selectorNodes = [];

                    if (type === '#') {
                        selectorNodes = this.findById(nodes, value);
                    } else if (type === '.') {
                        selectorNodes = this.findByClass(nodes, value);
                    } else if (type === true) {
                        selectorNodes = this.findByTag(nodes, value);
                    } else if ( ! type) {
                        selectorNodes = this.findSelector(nodes, value);

                    // special cases
                    } else if (['>', '+', '~'].includes(type)) {
                        const [filter, query] = Core.parseSubQuery(value);

                        // node child
                        if (type === '>') {
                            selectorNodes = this.children(nodes, filter);

                        // node next
                        } else if (type === '+') {
                            selectorNodes = this.next(nodes, filter);

                        // node after
                        } else if (type === '~') {
                            selectorNodes = this.nextAll(nodes, filter);
                        }

                        if (selectorNodes.length && query) {
                            selectorNodes = this.find(selectorNodes, query);
                        }
                    }

                    selectorNodes.forEach(node => results.add(node));
                });

            return Core.sortNodes([...results]);
        },

        // find the first element matching a custom CSS selector
        _findOneByCustom(nodes, selectors)
        {
            const results = new Set;

            Core.parseSelectors(selectors)
                .forEach(selector => {
                    const [type, value] = selector;
                    let selectorNode;

                    if (type === '#') {
                        selectorNode = this.findOneById(nodes, value);
                    } else if (type === '.') {
                        selectorNode = this.findOneByClass(nodes, value);
                    } else if (type === true) {
                        selectorNode = this.findOneByTag(nodes, value);
                    } else if ( ! type) {
                        selectorNode = this.findOneSelector(nodes, value);

                    // special cases
                    } else if (['>', '+', '~'].includes(type)) {
                        const [filter, query] = Core.parseSubQuery(value);

                        // node child
                        if (type === '>') {
                            selectorNode = this.child(nodes, filter);
                        // node next
                        } else if (type === '+') {
                            selectorNode = this.next(nodes, filter);
                        // node after
                        } else if (type === '~') {
                            selectorNode = this.nextAll(nodes, filter, false, true);
                        }

                        if (results.length && query) {
                            selectorNode = this.findOne(selectorNode, query);
                        }

                        selectorNode = Core.nodeArray(selectorNode).shift();
                    }

                    if (selectorNode) {
                        results.add(selectorNode);
                    }
                });

            return Core.sortNodes([...results]).shift() || null;
        }

    });

    Object.assign(Core.prototype, {

        // find the closest ancestor to each element matching a filter,
        // and optionally before hitting a limit
        closest(nodes, filter, until)
        {
            return this.parents(nodes, filter, until, true);
        },

        // find the first child of each element matching a filter
        child(nodes, filter)
        {
            return this.children(nodes, filter, true);
        },

        // find all children of each element,
        // and optionally matching a filter
        children(nodes, filter, first = false, elementsOnly = true)
        {
            filter = Core.parseFilter(filter);

            const results = new Set;

            Core.nodeArray(nodes)
                .forEach(node =>
                    Core.nodeArray(node.childNodes, elementsOnly)
                        .forEach(child => {
                            if (filter && ! filter(child)) {
                                return;
                            }

                            results.add(child);
                            return !first;
                        })
                );

            const nodeArray = Core.sortNodes([...results]);

            return first && Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all child nodes for each element,
        // (including text and comment nodes)
        contents(nodes)
        {
            return this.children(nodes, false, false, false);
        },

        // find the next sibling for each element matching a filter
        next(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    if ( ! node.nextSibling) {
                        return;
                    }

                    if (filter && ! filter(node.nextSibling)) {
                        return;
                    }

                    results.add(node.nextSibling);
                });

            const nodeArray = Core.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all next siblings for each element matching a filter,
        // and optionally before hitting a limit
        nextAll(nodes, filter, until = false, first = false)
        {
            filter = Core.parseFilter(filter);
            until = Core.parseFilter(until);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    while (node = node.nextSibling) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && ! filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (first) {
                            break;
                        }
                    }
                });

            return Core.sortNodes([...results]);
        },

        // find the offset parent (relatively positioned) of the first element
        offsetParent(nodes)
        {
            return this.forceShow(nodes, node => node.offsetParent);
        },

        // find the parent of each element matching a filter
        parent(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    if ( ! node.parentNode) {
                        return;
                    }

                    if (filter && ! filter(node.parentNode)) {
                        return;
                    }

                    results.add(node.parentNode);
                });

            const nodeArray = Core.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all parents of each element matching a filter,
        // and optionally before hitting a limit
        parents(nodes, filter, until, closest = false)
        {
            filter = Core.parseFilter(filter);
            until = Core.parseFilter(until);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    while (node = node.parentNode) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && ! filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (closest) {
                            return;
                        }
                    }
                });

            const nodeArray = Core.sortNodes([...results]);

            return closest && Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find the previous sibling for each element matching a filter,
        // and optionally before hitting a limit
        prev(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    if ( ! node.previousSibling) {
                        return;
                    }

                    if (filter && ! filter(node.previousSibling)) {
                        return;
                    }

                    results.add(node.previousSibling);
                });

            const nodeArray = Core.sortNodes([...results]);

            return Core.isNode(nodes) ?
                nodeArray.shift() || null :
                nodeArray;
        },

        // find all previous siblings for each element matching a filter,
        // and optionally before hitting a limit
        prevAll(nodes, filter, until = false, first = false)
        {
            filter = Core.parseFilter(filter);
            until = Core.parseFilter(until);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    while (node = node.previousSibling) {
                        if (until && until(node)) {
                            break;
                        }

                        if (filter && ! filter(node)) {
                            continue;
                        }

                        results.add(node);

                        if (first) {
                            break;
                        }
                    }
                });

            return Core.sortNodes([...results]);
        },

        // find all siblings for each element matching a filter
        siblings(nodes, filter, elementsOnly = true)
        {
            filter = Core.parseFilter(filter);

            const results = new Set;

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    if ( ! node.parentNode) {
                        return;
                    }

                    Core.nodeArray(node.parentNode.childNodes, elementsOnly)
                        .forEach(child => {
                            if (child.isSameNode(node)) {
                                return;
                            }

                            if (filter && ! filter(child)) {
                                return;
                            }

                            results.add(child);
                        })
                    });

            return Core.sortNodes([...results]);
        }

    });

    Object.assign(Core.prototype, {

        // force an element to be shown, and then execute a callback
        forceShow(nodes, callback)
        {
            const node = Core.nodeFirst(nodes, true, true, true);

            if ( ! node) {
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
                    styles.push(this.getStyle(parent, 'display'));
                });

            this.setStyle(elements, 'display', 'initial', true);

            const result = callback(node);

            elements.forEach((element, index) => this.setStyle(element, 'display', styles[index]));

            return result;
        },

        // get the index of the first element matching a filter
        index(nodes, filter)
        {
            filter = Core.parseFilter(filter);

            return Core.nodeArray(nodes)
                .findIndex(node => ! filter || filter(node));
        },

        // get the index of the first element relative to it's parent element
        indexOf(nodes)
        {
            const node = Core.nodeFirst(nodes);

            if ( ! node) {
                return;
            }

            return this.children(this.parent(node)).indexOf(node);
        },

        // create a selection on the first node
        select(nodes)
        {
            const node = Core.nodeFirst(nodes, false);

            if (node && node.select) {
                return node.select();
            }

            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            if ( ! node) {
                return;
            }

            const range = this.context.createRange();
            range.selectNode(node);
            selection.addRange(range);
        },

        // create a selection on all nodes
        selectAll(nodes)
        {
            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            Core.nodeArray(nodes, false)
                .forEach(node => {
                    const range = this.context.createRange();
                    range.selectNode(node);
                    selection.addRange(range);
                });
        },

        // returns a serialized string containing names and values of all form elements
        serialize(nodes)
        {
            return Core.parseParams(this.serializeObject(nodes));
        },

        // returns a serialized array containing names and values of all form elements
        serializeArray(nodes)
        {
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
        serializeObject(nodes)
        {
            return Core.nodeArray(nodes)
                .reduce((values, node) => {
                    if (node.matches('form')) {
                        Object.assign(values, this.serializeObject(core.find(node, 'input, select, textarea')));
                        return;
                    }

                    if (node.matches('[disabled], input[type=submit], input[type=reset], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                        return;
                    }

                    const name = core.getAttribute(node, 'name');
                    const value = core.getValue(node);

                    if (name.substring(-2) === '[]') {
                        if ( ! values[name]) {
                            values[name] = [];
                        }

                        values[name].push(value);
                    } else {
                        values[name] = value;
                    }
                }, {});
        }

    });

    Object.assign(Core, {

        // returns an array from an array, node list, element list, query list or arbitrary value
        makeArray(value)
        {
            if ( ! value) {
                return [];
            }

            if (Array.isArray(value)) {
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

        // returns an array of nodes or elements (and optionally document or window)
        nodeArray(value, elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return this.makeArray(value)
                .filter(this.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
        },

        // returns a function for filtering nodes (by element, document or window)
        nodeFilterFactory(elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return node =>
                ( ! elementsOnly && this.isNode(node)) ||
                (elementsOnly && this.isElement(node)) ||
                (allowDocument && this.isDocument(node)) ||
                (allowWindow && frost.isWindow(node));
        },

        // get the first node or element (and optionally document or window)
        nodeFirst(value, elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            return this.makeArray(value)
                .find(this.nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
        },

        // sorts nodes by their position in the document
        sortNodes(nodes)
        {
            return this.nodeArray(nodes, false)
                .sort((a, b) => {
                    if (a.isSameNode(b)) {
                        return 0;
                    }

                    const pos = a.compareDocumentPosition(b);
                    if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                        return -1;
                    } else if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINS) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
        }

    });

    Object.assign(Core, {

        // returns a single dimensional array of classes (from a multi-dimensional array or space-separated strings)
        parseClasses(classList)
        {
            return frost.uniqueArray(
                frost.flattenArray(classList)
                    .reduce((acc, val) => acc.concat(...val.split(' ')), [])
                    .filter(val => val)
            );
        },

        // returns a "real" event from a dot-separated namespaced event
        parseEvent(event)
        {
            return event.split('.').shift();
        },

        // returns an array of events from a space-separated string
        parseEvents(events)
        {
            return events.split(' ');
        },

        // returns an element filter function from a function, string, node, node list, element list or array
        parseFilter(filter) {
            if ( ! filter) {
                return false;
            }

            if (frost.isFunction(filter)) {
                return filter;
            }

            if (frost.isString(filter)) {
                return node => node.matches(filter);
            }

            if (this.isNode(filter)) {
                return node => node.isSameNode(filter);
            }

            filter = this.nodeArray(filter);
            if (filter.length) {
                return node => filter.includes(node);
            }

            return false;
        },

        // returns an element contains filter function from a function, string, node, node list, element list or array
        parseFilterContains(filter)
        {
            if ( ! filter) {
                return false;
            }

            if (frost.isFunction(filter)) {
                return filter;
            }

            if (frost.isString(filter)) {
                return node => node.findOne(filter);
            }

            if (this.isNode(filter)) {
                return node => node.contains(filter);
            }

            filter = Core.nodeArray(filter);
            if (filter.length) {
                return node => filter.find(other => node.contains(other));
            }

            return false;
        },

        // returns a URI-encoded attribute string from an array or object
        parseParams(data)
        {
            let values = [];

            if (Array.isArray(data)) {
                values = data.map(value => this.parseParam(value.name, value.value));
            } else if (frost.isObject(data)) {
                values = Object.keys(data).map(key => this.parseParam(key, data[key]));
            }

            return frost.flattenArray(values).map(encodeURI).join('&');
        },

        // returns an array or string of key value pairs from an array, object or string
        parseParam(key, value)
        {
            if (Array.isArray(value)) {
                return value.map(val => this.parseParam(key, val));
            }

            if (frost.isObject(value)) {
                return Object.keys(value).map(subKey => this.parseParam(key + '[' + subKey + ']', value[subKey]));
            }

            return key + '=' + value;
        },

        // returns a type and selector from a string (optionally only fast)
        parseSelector(selector, fast = true)
        {
            const fastMatch = selector.match(this.fastRegex);
            if (fastMatch) {
                return fastMatch.slice(1);
            }

            if ( ! fast) {
                const specialMatch = selector.match(this.specialRegex);
                if (specialMatch) {
                    return specialMatch.slice(1);
                }
            }

            return [false, selector];
        },

        // returns an array of types and selectors from an array or string
        parseSelectors(selectors)
        {
            if ( ! Array.isArray(selectors)) {
                selectors = selectors.split(this.splitRegex)
                    .filter(selector => selector);
            }

            return selectors.map(selector => this.parseSelector(selector.trim(), false));
        },

        // returns the subquery selector from a string
        parseSubQuery(selector)
        {
            return selector.match(this.subRegex).slice(1);
        }

    });

    Object.assign(Core, {

        // returns true if the value if a Document
        isDocument(value)
        {
            return value instanceof Document;
        },

        // returns true if the value is a HTML Element
        isElement(value)
        {
            return value instanceof HTMLElement;
        },

        // returns true if the value is a HTML Collection
        isElementList(value)
        {
            return value instanceof HTMLCollection;
        },

        // returns true if the value is a Node
        isNode(value)
        {
            return value instanceof Node;
        },

        // returns true if the value is a Node List
        isNodeList(value)
        {
            return value instanceof NodeList;
        },

        // returns true if the value is a Query List
        isQuerySet(value)
        {
            return value instanceof QuerySet;
        },

        // returns true if any of the selectors is "complex"
        isSelectorComplex(selectors)
        {
            return !! this.parseSelectors(selectors)
                .find(selector => ['>', '+', '~'].includes(selector[0]));
        }

    });

    Object.assign(Core.prototype, {

        // perform an XHR request
        ajax(url, data = null, method = 'GET')
        {
            if (frost.isObject(url)) {
                method = data || method;
                data = url;
            } else {
                data = data || {};
                data.url = url;
            }

            const settings = {
                ...Core.ajaxDefaults,
                ...data
            };

            if ( ! settings.method) {
                settings.method = method;
            }

            if ( ! settings.url) {
                settings.url = window.location;
            }

            if (settings.cache) {
                settings.url += (settings.url.indexOf('?') < 0 ? '?' : '&') + Date.now();
            }

            if (settings.contentType && ! settings.headers['Content-Type']) {
                settings.headers['Content-Type'] = settings.contentType;
            }

            if ( ! settings.headers['X-Requested-With']) {
                settings.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.open(settings.method, settings.url, true);

                Object.keys(settings.headers).forEach(key => xhr.setRequestHeader(key, settings.headers[key]));

                if (settings.responseType) {
                    xhr.responseType = settings.responseType;
                }

                xhr.onload = e => {
                    if (xhr.status === 200) {
                        resolve(xhr.response, xhr, e);
                    } else {
                        reject(xhr.status, xhr, e);
                    }
                };

                xhr.onerror = e => {
                    reject(xhr.status, xhr, e);
                };

                if (settings.uploadProgress) {
                    xhr.upload.onprogress = e => {
                        settings.uploadProgress(e.loaded / e.total * 100, xhr, e);
                    };
                }

                if (settings.beforeSend) {
                    settings.beforeSend(xhr);
                }

                if (settings.data) {
                    if (settings.processData) {
                        if (settings.contentType == 'application/json') {
                            settings.data = JSON.stringify(settings.data);
                        } else {
                            settings.data = Core.parseParams(settings.data);
                        }
                    }
                    xhr.send(settings.data);
                } else {
                    xhr.send();
                }
            });
        },

        // load and executes a JavaScript file
        loadScript(script)
        {
            return this.xhr(script)
                .then(response => eval.apply(window, response));
        },

        // load and execute multiple JavaScript files (in order)
        loadScripts(scripts)
        {
            return Promise.all(scripts.map(script => this.xhr(script)))
                .then(responses => responses.forEach(response => eval.apply(window, response)));
        },

        // import A CSS Stylesheet file
        loadStyle(stylesheet)
        {
            const head = this.findOne('head');

            const link = this.create('link');
            this.setAttribute(link, 'rel', 'stylesheet');
            this.setAttribute(link, 'href', stylesheet);
            this.append(head, link);
        },

        // import multiple CSS Stylesheet files
        loadStyles(stylesheets)
        {
            stylesheets.forEach(stylesheet => this.loadStyle(stylesheet));
        },

        // perform an XHR request for a file upload
        upload(url, data, method = 'POST')
        {
            if (frost.isObject(url)) {
                data = url;
            } else {
                data.url = url;
            }

            const formData = new FormData();
            Object.keys(data.data).forEach(key => formData.append(key, data.data[key]));
            data.data = formData;

            if ( ! data.contentType) {
                data.contentType = 'multipart/form-data';
            }

            if ( ! data.processData) {
                data.processData = false;
            }

            this.xhr(data, null, method);
        }

    });

    Object.assign(Core.prototype, {

        // get a cookie value (optionally json encoded)
        getCookie(name, json = false)
        {
            const cookie = decodeURIComponent(this.context.cookie)
                .split(';')
                .find(cookie => cookie.trimStart().substring(0, name.length - 1) === name);

            if ( ! cookie) {
                return null;
            }

            const value = cookie.trimStart().substring(name.length + 1);

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
            if ( ! name) {
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

            const realCallback = e => {
                if (updating) {
                    return;
                }

                updating = true;
                window.requestAnimationFrame(() => {
                    callback(e);
                    updating = false;
                });
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

        // returns a function for matching a delegate target to a complex selector
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

        // returns a function for matching a delegate target to a simple selector
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
                move = this.animationEventFactory(move);
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

    Object.assign(Core.prototype, {

        // returns an array containing nodes parsed from a HTML string
        parseHTML(string)
        {
            const container = this.create('template');
            this.html(container, string);
            return this.contents(container);
        },

        // returns an array of nodes from a HTML string, query selector string, node, node list, element list or array
        parseQuery(query, elementsOnly = true, allowDocument = false, allowWindow = false)
        {
            if (query && ! frost.isString(query)) {
                return Core.nodeArray(query, elementsOnly, allowDocument, allowWindow);
            }

            if (query && query.match(Core.htmlRegex)) {
                return this.parseHTML(query);
            }

            return this.find(this.context, query || '*');
        },

        // returns a DOM object from an XML string
        parseXML(string)
        {
            const parser = new DOMParser();
            return parser.parseFromString(string, 'application/xml');
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
        contentType: 'application/x-www-form-urlencoded',
        data: false,
        dataType: false,
        headers: {},
        method: false,
        processData: true
    };

    Object.assign(frost, {

        // create a single-dimensional Array from a multiple-dimensional Array
        flattenArray(array)
        {
            return array.reduce((acc, val) =>
                Array.isArray(val) ?
                    acc.concat(...this.flattenArray(val)) :
                    acc.concat(val)
                , []);
        },

        // remove duplicate elements in an array
        uniqueArray(array)
        {
            return [...new Set(array)];
        }

    });

    Object.assign(frost, {

        // clamp a value between a min and max
        clamp(val, min = 0, max = 1)
        {
            return Math.max(min, Math.min(max, val));
        },

        // clamp a value between 0 and 100
        clampPercent(val)
        {
            return this.clamp(val, 0, 100);
        },

        // get the distance between two vectors
        dist(x1, y1, x2, y2)
        {
            return this.len(x1 - x2, y1 - y2);
        },

        // get the length of an X,Y vector
        len(x, y)
        {
            return Math.hypot(x, y);
        },

        // linear interpolation from one value to another
        lerp(a, b, amount)
        {
            return a * (1 - amount) + b * amount;
        },

        // get the linear percent of a value in a specified range
        linearPercent(a, b, value)
        {
            if (a === b) {
                return 0;
            }

            return this.clampPercent(100 * (value - a) / (b - a));
        },

        // get the linear value of a percent in a specified range
        linearValue(a, b, percent)
        {
            return this.clamp(
                a + (percent / 100 * (b - a)),
                a,
                b
            );
        },

        // get the logarithmic percent of a value in a specified range
        logPercent(a, b, value)
        {
            if (a === b) {
                return 0;
            }

            const min = a ?
                Math.log(a) :
                0;

            return this.clampPercent(
                100 * ((value ? Math.log(value) : 0) - min) / (Math.log(b) - min)
            );
        },

        // get the logarithmic value of a percent in a specified range
        logValue(a, b, percent)
        {
            const min = a ?
                Math.log(a) :
                0;

            return this.clamp(
                Math.exp(min + (Math.log(b) - min) * percent / 100),
                a,
                b
            );
        },

        // map a value from one range to another
        map(value, fromMin, fromMax, toMin, toMax)
        {
            return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
        },

        // round a number to a specified precision
        toStep(value, step)
        {
            return Math.round(value / step) * step;
        }

    });

    Object.assign(frost, {

        // convert a string to Camel Case
        camelCase(string)
        {
            return '' + string.replace(/(\-[a-z])/g, match => match.toUpperCase())
                .replace('-', '');
        },

        // convert a string to Snake Case
        snakeCase(string)
        {
            return '' + string.replace(/([A-Z])/g, match => '-' + match.toLowerCase());
        }

    });

    Object.assign(frost, {

        // returns true if the value is an Array
        isArray(value)
        {
            return Array.isArray(value);
        },

        // returns true if the value is a Boolean
        isBoolean(value)
        {
            return value === !!value;
        },

        // returns true if the value is a Function
        isFunction(value)
        {
            return typeof value === 'function';
        },

        // returns true if the value is numeric
        isNumeric(value)
        {
            return ! isNaN(parseFloat(value)) && isFinite(value);
        },

        // returns true if the value is an Object
        isObject(value)
        {
            return value instanceof Object;
        },

        // returns true if the value is a String
        isString(value)
        {
            return value === '' + value;
        },

        // returns true if the value is a Window
        isWindow(value)
        {
            return value instanceof Window;
        }

    });

    class QuerySet
    {

        constructor(nodes)
        {
            this.nodes = core.parseQuery(nodes, true, true, true);
            this.stack = [];
        }

        delay(duration)
        {
            return this.queue(() => {
                return new Promise(resolve => setTimeout(resolve, duration));
            });
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

        get(index)
        {
            if ( ! index) {
                return this.nodes;
            }

            return index < 0 ?
                this.nodes[index + this.nodes.length] : this.nodes[index];
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

        slice()
        {
            return this.pushStack(this.nodes.slice(...arguments));
        }

    }

    class QuerySetImmutable extends QuerySet
    {

        constructor(...args)
        {
            super(...args);
        }

        pushStack(nodes)
        {
            return new QuerySetImmutable(nodes);
        }

    }

    Object.assign(QuerySet.prototype, {

        // add an animation to each element
        animate(callback, duration)
        {
            return this.queue(node => core.animate(node, callback, duration));
        },

        // stop all animations for each element
        stop(finish = true)
        {
            core.stop(this.nodes, finish);
            return this.clearQueue();
        }

    });

    Object.assign(QuerySet.prototype, {

        // slide each element in from the top over a duration
        dropIn(duration = 1000)
        {
            return this.queue(node => core.dropIn(node, duration));
        },

        // slide each element out to the top over a duration
        dropOut(duration = 1000)
        {
            return this.queue(node => core.dropOut(node, duration));
        },

        // fade the opacity of each element in over a duration
        fadeIn(duration = 1000)
        {
            return this.queue(node => core.fadeIn(node, duration));
        },

        // fade the opacity of each element out over a duration
        fadeOut(duration = 1000)
        {
            return this.queue(node => core.fadeOut(node, duration));
        },

        // rotate each element in on an x,y over a duration
        rotateIn(x = 0, y = 1, inverse = false, duration = 1000)
        {
            return this.queue(node => core.rotateIn(node, x, y, inverse, duration));
        },

        // rotate each element out on an x,y over a duration
        rotateOut(x = 0, y = 1, inverse = false, duration = 1000)
        {
            return this.queue(node => core.rotateOut(node, x, y, inverse, duration));
        },

        // slide each element into place from a direction over a duration
        slideIn(direction = 'bottom', duration = 1000)
        {
            return this.queue(node => core.slideIn(node, direction, duration));
        },

        // slide each element out of place to a direction over a duration
        slideOut(direction = 'bottom', duration = 1000)
        {
            return this.queue(node => core.slideOut(node, direction, duration));
        },

        // squeeze each element into place from a direction over a duration
        squeezeIn(direction = 'bottom', duration = 1000)
        {
            return this.queue(node => core.squeezeIn(node, direction, duration));
        },

        // squeeze each element out of place to a direction over a duration
        squeezeOut(direction = 'bottom', duration = 1000)
        {
            return this.queue(node => core.squeezeOut(node, direction, duration));
        }

    });

    Object.assign(QuerySet.prototype, {

        // clear the queue of each element
        clearQueue()
        {
            core.clearQueue(this.nodes);
            return this;
        },

        // queue a callback on each element
        queue(callback)
        {
            core.queue(this.nodes, callback);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get an attribute value for the first element
        getAttribute(attribute)
        {
            return core.getAttribute(this.nodes, attribute);
        },

        // get a dataset value for the first element
        getDataset(key)
        {
            return core.getDataset(this.nodes, key);
        },

        // get the HTML contents of the first element
        getHTML()
        {
            return core.getHTML(this.nodes);
        },

        // get a property value for the first element
        getProperty(property)
        {
            return core.getProperty(this.nodes, property);
        },

        // get the text contents of the first element
        getText()
        {
            return core.getText(this.nodes);
        },

        // get the value property of the first element
        getValue()
        {
            return core.getValue(this.nodes);
        },

        // remove an attribute from each element
        removeAttribute(attribute)
        {
            core.removeAttribute(this.nodes, attribute);
            return this;
        },

        // remove a property from each element
        removeProperty(property)
        {
            core.removeProperty(this.nodes, property);
            return this;
        },

        // set attributes for each element
        setAttribute(attribute, value)
        {
            core.setAttribute(this.nodes, attribute, value);
            return this;
        },

        // set dataset values for each element
        setDataset(key, value)
        {
            core.setDataset(this.nodes, key, value);
            return this;
        },

        // set the HTML contents for each element
        setHTML(html)
        {
            core.setHTML(this.nodes, html);
            return this;
        },

        // set property values for each element
        setProperty(property, value)
        {
            core.setProperty(this.nodes, property, value);
            return this;
        },

        // set the text contents for each element
        setText(text)
        {
            core.setText(this.nodes, text);
            return this;
        },

        // set the value property for each element
        setValue(value)
        {
            core.setValue(this.nodes, value);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get data for the first node
        getData(key)
        {
            return core.getData(this.nodes, key);
        },

        // remove custom data for each node
        removeData(key)
        {
            core.removeData(this.nodes, key);
            return this;
        },

        // set custom data for each node
        setData(key, value)
        {
            core.setData(this.nodes, key, value);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // get the X,Y co-ordinates for the center of the first element (optionally offset)
        center(offset)
        {
            return core.center(this.nodes, offset);
        },

        // constrain each element to a container element
        constrain(container)
        {
            return core.constrain(this.nodes, container);
        },

        // get the distance of an element to an X, Y position in the window
        distTo(x, y)
        {
            return core.distTo(this.nodes, x, y);
        },

        // get the distance between two elements
        distToNode(others)
        {
            return core.distToNode(this.nodes, others);
        },

        // get the nearest element to an X, Y position in the window
        nearestTo(x, y)
        {
            return core.nearestTo(this.nodes, x, y);
        },

        // get the nearest element to another element
        nearestToNode(others)
        {
            return core.nearestToNode(this.nodes, others);
        },

        // get the percentage of an X co-ordinate relative to an element
        percentX(x)
        {
            return core.percentX(this.nodes, x);
        },

        // get the percentage of a Y co-ordinate relative to an element
        percentY(y)
        {
            return core.percentY(this.nodes, y);
        },

        // get the position of the first element relative to the window (optionally offset)
        position(offset)
        {
            return core.position(this.nodes, offset);
        },

        // get the computed bounding rectangle of the first element
        rect(offset)
        {
            return core.rect(this.nodes, offset);
        }

    });

    Object.assign(QuerySet.prototype, {

        // scroll each element to an X, Y position
        scrollTo(x, y)
        {
            core.scrollTo(this.nodes, x, y);
            return this;
        },

        // scroll each element to an X position
        scrollToX(x)
        {
            core.scrollToX(this.nodes, x);
            return this;
        },

        // scroll each element to a Y position
        scrollToY(y)
        {
            core.scrollToY(this.nodes, y);
            return this;
        },

        // get the scroll X position of the first element
        scrollX()
        {
            return core.scrollX(this.nodes);
        },

        // get the scroll Y position of the first element
        scrollY()
        {
            return core.scrollY(this.nodes);
        }

    });

    Object.assign(QuerySet.prototype, {

        // get the computed height of the first element
        // (and optionally padding, border or margin)
        height(padding, border, margin)
        {
            return core.height(this.nodes, padding, border, margin);
        },

        // get the computed width of the first element
        // (and optionally padding, border or margin)
        width(padding, border, margin)
        {
            return core.width(this.nodes, padding, border, margin);
        }

    });

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

    Object.assign(QuerySet.prototype, {

        // add an event to each element
        addEvent(events, delegate, callback)
        {
            core.addEvent(this.nodes, events, delegate, callback);
            return this;
        },

        // add a self-destructing event to each element
        addEventOnce(events, delegate, callback)
        {
            core.addEvent(this.nodes, events, delegate, callback, true);
            return this;
        },

        // trigger a blur event on the first element
        blur()
        {
            core.blur(this.nodes);
            return this;
        },

        // trigger a click event on the first element
        click()
        {
            core.click(this.nodes);
            return this;
        },

        // clone all events from each element to other elements
        cloneEvents(clones)
        {
            core.cloneEvents(this.nodes, clones);
            return this;
        },

        // trigger a focus event on the first element
        focus()
        {
            core.focus(this.nodes);
            return this;
        },

        // remove an event from each element
        removeEvent(events, delegate, callback)
        {
            core.removeEvent(this.nodes, events, delegate, callback);
            return this;
        },

        // trigger an event on each element
        triggerEvent(events, data)
        {
            core.triggerEvent(this.nodes, events, data);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // insert each other node after the first node
        after(others)
        {
            core.after(this.nodes, others);
            return this;
        },

        // append each other nodes to the first node
        append(others)
        {
            core.append(this.nodes, others);
            return this;
        },

        // append each node to the first other node
        appendTo(others)
        {
            core.appendTo(this.nodes, others);
            return this;
        },

        // insert each other node before the first node
        before(others)
        {
            core.before(this.nodes, others);
            return this;
        },

        // clone each node (optionally deep, and with events and data)
        clone(deep = true, eventsData = false)
        {
            return this.pushStack(core.clone(this.nodes, deep, eventsData));
        },

        // detach an element from the DOM
        detach()
        {
            core.detach(this.nodes);
            return this;
        },

        // remove all children of each node from the DOM
        empty()
        {
            core.empty(this.nodes);
            return this;
        },

        // insert each node after the first other node
        insertAfter(others)
        {
            core.insertAfter(this.nodes, others);
            return this;
        },

        // insert each node before the first other node
        insertBefore(others)
        {
            core.insertBefore(this.nodes, others);
            return this;
        },

        // prepend each other node to the first node
        prepend(others)
        {
            core.prepend(this.nodes, others);
            return this;
        },

        // prepend each node to the first other node
        prependTo(others)
        {
            core.prependTo(this.nodes, others);
            return this;
        },

        // remove each node from the DOM
        remove()
        {
            core.remove(this.nodes);
            return this;
        },

        // replace each other node with nodes
        replaceAll(others)
        {
            core.replaceAll(this.nodes, others);
            return this;
        },

        // replace each node with other nodes
        replaceWith(others)
        {
            core.replaceWith(this.nodes, others);
            return this;
        },

        // unwrap each node (optionally matching a filter)
        unwrap(filter)
        {
            core.unwrap(this.nodes, filter);
            return this;
        },

        // wrap each nodes with other nodes
        wrap(others)
        {
            core.wrap(this.nodes, others);
            return this;
        },

        // wrap all nodes with other nodes
        wrapAll(others)
        {
            core.wrapAll(this.nodes, others);
            return this;
        },

        // wrap the contents of each node with other nodes
        wrapInner(others)
        {
            core.wrapInner(this.nodes, others);
            return this;
        }

    });

    Object.assign(QuerySet.prototype, {

        // returns true if any of the elements contains a descendent matching a filter
        contains(filter)
        {
            return core.contains(this.nodes, filter);
        },

        // returns true if any of the elements has a specified attribute
        hasAttribute(attribute)
        {
            return core.hasAttribute(this.nodes, attribute);
        },

        // returns true if any of the elements has any of the specified classes
        hasClass(...classes)
        {
            return core.hasClass(this.nodes, ...classes);
        },

        // returns true if any of the nodes has data
        hasData(key)
        {
            return core.hasData(this.nodes, key);
        },

        // returns true if any of the elements has a specified property
        hasProperty(property)
        {
            return core.hasProperty(this.nodes, property);
        },

        // returns true if any of the elements or a parent of the elements is "fixed"
        isFixed()
        {
            return core.isFixed(this.nodes);
        },

        // returns true if any of the elements in the set is hidden
        isHidden()
        {
            return core.isHidden(this.nodes);
        },

        // returns true if any of the elements in the set is visible
        isVisible()
        {
            return core.isVisible(this.nodes);
        }

    });

    Object.assign(QuerySet.prototype, {

        // return all elements matching a filter
        filter(filter)
        {
            return this.pushStack(core.filter(this.nodes, filter));
        },

        // return the first element matching a filter
        filterOne(filter)
        {
            return this.pushStack(core.filterOne(this.nodes, filter));
        },

        // return all elements with a descendent matching the selector
        has(selector)
        {
            return this.pushStack(core.has(this.nodes, selector));
        },

        // return all hidden elements
        hidden()
        {
            return this.pushStack(core.hidden(this.nodes));
        },

        // return all elements not matching a filter
        not(filter)
        {
            return this.pushStack(core.not(this.nodes, filter));
        },

        // return all visible elements
        visible()
        {
            return this.pushStack(core.visible(this.nodes));
        }

    });

    Object.assign(QuerySet.prototype, {

        // find all elements matching a selector
        find(selector)
        {
            return this.pushStack(core.find(this.nodes, selector));
        },

        // find all elements with a specific class
        findByClass(className)
        {
            return this.pushStack(core.findByClass(this.nodes, className));
        },

        // find all elements with a specific ID
        findById(id)
        {
            return this.pushStack(core.findById(this.nodes, id));
        },

        // find all elements with a specific tag
        findByTag(tagName)
        {
            return this.pushStack(core.findByTag(this.nodes, tagName));
        },

        // find a single element matching a selector
        findOne(selector)
        {
            return this.pushStack(core.findOne(this.nodes, selector));
        },

        // find the first element with a specific class
        findOneByClass(className)
        {
            return this.pushStack(core.findOneByClass(this.nodes, className));
        },

        // find the first element with a specific ID
        findOneById(id)
        {
            return this.pushStack(core.findOneById(this.nodes, id));
        },

        // find the first element with a specific tag
        findOneByTag(tagName)
        {
            return this.pushStack(core.findOneByTag(this.nodes, tagName));
        }

    });

    Object.assign(QuerySet.prototype, {

        // find the closest ancestor to each element matching a filter,
        // and optionally before hitting a limit
        closest(filter, until)
        {
            return this.pushStack(core.closest(this.nodes, filter, until));
        },

        // find the first child of each element matching a filter
        child(filter)
        {
            return this.pushStack(core.child(this.nodes, filter));
        },

        // find all children of each element,
        // and optionally matching a filter
        children(filter)
        {
            return this.pushStack(core.children(this.nodes, filter));
        },

        // find all child nodes for each element,
        // (including text and comment nodes)
        contents() {
            return this.pushStack(core.contents(this.nodes));
        },

        // find the next sibling for each element matching a filter
        next(filter)
        {
            return this.pushStack(core.next(this.nodes, filter));
        },

        // find all next siblings for each element matching a filter,
        // and optionally before hitting a limit
        nextAll(filter, until = false, first = false)
        {
            return this.pushStack(core.nextAll(this.nodes, filter, until, first));
        },

        // find the offset parent (relatively positioned) of the first element
        offsetParent()
        {
            return this.pushStack(core.offsetParent(this.nodes));
        },

        // find the parent of each element matching a filter
        parent(filter)
        {
            return this.pushStack(core.parent(this.nodes, filter));
        },

        // find all parents of each element matching a filter,
        // and optionally before hitting a limit
        parents(filter, until)
        {
            return this.pushStack(core.parents(this.nodes, filter, until));
        },

        // find the previous sibling for each element matching a filter,
        // and optionally before hitting a limit
        prev(filter)
        {
            return this.pushStack(core.prev(this.nodes, filter));
        },

        // find all previous siblings for each element matching a filter,
        // and optionally before hitting a limit
        prevAll(filter, until = false, first = false)
        {
            return this.pushStack(core.prevAll(this.nodes, filter, until, first));
        },

        // find all siblings for each element matching a filter
        siblings(filter)
        {
            return this.pushStack(core.siblings(this.nodes, filter));
        }

    });

    Object.assign(QuerySet.prototype, {

        // force an element to be shown, and then execute a callback
        forceShow(callback)
        {
            return core.forceShow(this.nodes, callback);
        },

        // get the index of the first element matching a filter
        index(filter)
        {
            return core.index(this.nodes, filter);
        },

        // get the index of the first element relative to it's parent element
        indexOf()
        {
            return core.indexOf(this.nodes);
        },

        // create a selection on the first node
        select()
        {
            core.select(this.nodes);
            return this;
        },

        // create a selection on all nodes
        selectAll()
        {
            core.selectAll(this.nodes);
            return this;
        },

        // returns a serialized string containing names and values of all form elements
        serialize()
        {
            return core.serialize(this.nodes);
        },

        // returns a serialized array containing names and values of all form elements
        serializeArray()
        {
            return core.serializeArray(this.nodes);
        },

        // returns an object containing keys and values of all form elements
        serializeObject()
        {
            return core.serializeObject(this.nodes);
        }

    });

    frost.core = new Core;
    frost.Core = Core;
    frost.QuerySet = QuerySet;
    frost.QuerySetImmutable = QuerySetImmutable;

    return {
        frost,
        Core,
        core: frost.core,
        $: frost.core.query
    };

});