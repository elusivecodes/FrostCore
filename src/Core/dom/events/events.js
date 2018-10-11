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

        const eventArray = Core.parseEvents(events);

        this.nodeArray(nodes, true, true, true)
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

    // remove an event from each element
    removeEvent(nodes, events, delegate, callback)
    {
        if (delegate && Core.isFunction(delegate)) {
            callback = delegate;
            delegate = false;
        }

        let eventArray = events ? Core.parseEvents(events) : false;

        this.nodeArray(nodes, true, true, true)
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
        this.nodeArray(nodes, true, true, true)
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
    },

    // clone all events from each element to other elements
    cloneEvents(nodes, others)
    {
        this.nodeArray(nodes, true, true, true)
            .forEach(node => {
                if ( ! this.nodeEvents.has(node)) {
                    return;
                }

                this.nodeEvents.get(node).forEach(eventData => {
                    this.addEvent(others, eventData.event, eventData.delegate, eventData.callback);
                });
            });
    },

    // trigger a blur event on the first element
    blur(nodes)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        node.blur();
    },

    // trigger a click event on the first element
    click(nodes)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        node.click();
    },

    // trigger a focus event on the first element
    focus(nodes)
    {
        const node = this.nodeFirst(nodes);

        if ( ! node) {
            return;
        }

        node.focus();
    }

});