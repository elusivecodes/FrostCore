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