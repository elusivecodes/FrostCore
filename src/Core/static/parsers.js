Object.assign(Core, {

    // returns a single dimensional array of classes (from a multi-dimensional array or space-separated strings)
    parseClasses(classList)
    {
        return this.uniqueArray(
            this.flattenArray(classList)
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

    // returns a URI-encoded attribute string from an array or object
    parseParams(data)
    {
        let values = [];

        if (this.isArray(data)) {
            values = data.map(value => this.parseParam(value.name, value.value));
        } else if (this.isObject(data)) {
            values = Object.keys(data)
                .map(key => this.parseParam(key, data[key]));
        }

        return this.flattenArray(values)
            .map(encodeURI)
            .join('&');
    },

    // returns an array or string of key value pairs from an array, object or string
    parseParam(key, value)
    {
        if (this.isArray(value)) {
            return value.map(val => this.parseParam(key, val));
        }

        if (this.isObject(value)) {
            return Object.keys(value)
                .map(subKey => this.parseParam(key + '[' + subKey + ']', value[subKey]));
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
        if ( ! this.isArray(selectors)) {
            selectors = selectors.split(this.splitRegex)
                .filter(selector => selector);
        }

        return selectors.map(selector => this.parseSelector(selector.trim(), false));
    },

    // returns the subquery selector from a string
    parseSubQuery(selector)
    {
        return selector.match(this.subRegex)
            .slice(1);
    }

});