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