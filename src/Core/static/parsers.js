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
        const values = [];

        if (Array.isArray(data)) {
            data.forEach(value => this.parseParam(value.name, value.value, values));
        } else if (frost.isObject(data)) {
            Object.keys(data).forEach(key => this.parseParam(key, data[key], values));
        }

        return values.map(encodeURI).join('&');
    },

    parseParam(key, value, values)
    {
        if (Array.isArray(value)) {
            value.forEach(val => this.parseParam(key, val, values));
        } else if (frost.isObject(value)) {
            Object.keys(value).forEach(subKey => this.parseParam(key + '[' + subKey + ']', value[subKey], values));
        } else {
            values.push(key + '=' + value);
        }
    },

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

    parseSelectors(selectors)
    {
        if ( ! Array.isArray(selectors)) {
            selectors = selectors.split(this.splitRegex)
                .filter(selector => selector);
        }

        return selectors.map(selector => this.parseSelector(selector.trim(), false));
    },

    parseSubQuery(selector)
    {
        return selector.match(this.subRegex).slice(1);
    }

});