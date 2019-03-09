(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {

    const Core = {};

    Object.assign(Core, {

        /**
         * Create a single-dimensional Array from a multiple-dimensional Array.
         * @param {Array} array 
         * @returns {Array}
         */
        flattenArray(array) {
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

        /**
         * Remove duplicate elements in an Array.
         * @param {Array} array 
         * @returns {Array}
         */
        uniqueArray(array) {
            return [...new Set(array)];
        }

    });

    Object.assign(Core, {

        /**
         * Create a wrapped version of a function that executes at most once per animation frame
         * (using the most recent arguments passed to it).
         * @param {function} callback
         * @param {Boolean} [leading]
         * @returns {Promise}
         */
        animationFactory(callback, leading) {
            let newArgs,
                running;

            return (...args) => new Promise((resolve, reject) => {
                newArgs = args;

                if (running) {
                    return reject();
                }

                running = true;
                window.requestAnimationFrame(_ => {
                    running = false;
                    if (!leading) {
                        resolve(
                            callback(...newArgs)
                        );
                    }
                });

                if (leading) {
                    resolve(
                        callback(...newArgs)
                    );
                }
            });
        },

        /**
         * Create a wrapped version of a function that executes once per wait period
         * (using the most recent arguments passed to it).
         * @param {function} callback
         * @param {number} wait
         * @param {Boolean} [leading]
         * @returns {Promise}
         */
        debounceFactory(callback, wait, leading) {
            let newArgs,
                running;

            return (...args) => new Promise((resolve, reject) => {
                newArgs = args;

                if (running) {
                    return reject();
                }

                running = true;
                setTimeout(
                    _ => {
                        running = false;
                        if (!leading) {
                            resolve(
                                callback(...newArgs)
                            );
                        }
                    },
                    wait
                );

                if (leading) {
                    resolve(
                        callback(...newArgs)
                    );
                }
            });
        },

        /**
         * Create a wrapped version of a function that executes on the next cycle of the event queue.
         * @param {function} callback
         * @param {...*} [defaultArgs]
         * @returns {Promise}
         */
        deferFactory(callback, ...defaultArgs) {
            return this.delayFactory(callback, 0, ...defaultArgs);
        },

        /**
         * Create a wrapped version of a function that executes after a wait period.
         * @param {function} callback
         * @param {number} wait
         * @param {...*} [defaultArgs]
         * @returns {Promise}
         */
        delayFactory(callback, wait, ...defaultArgs) {
            return (...args) => new Promise(resolve =>
                setTimeout(
                    _ => resolve(
                        callback(...(
                            defaultArgs.concat(args)
                        ))
                    ),
                    wait
                )
            );
        },

        /**
         * Create a wrapped version of a function that will only ever execute once.
         * @param {function} callback
         * @returns {function}
         */
        onceFactory(callback) {
            let ran;

            return (...args) => {
                if (ran) {
                    return;
                }

                ran = true;
                return callback(...args);
            };
        },

        /**
         * Create a wrapped version of a function with predefined arguments.
         * @param {function} callback
         * @param {...*} [defaultArgs]
         * @returns {function}
         */
        partialFactory(callback, ...defaultArgs) {
            return (...args) =>
                callback(
                    ...(defaultArgs
                        .slice()
                        .map(v =>
                            v === undefined ?
                                args.shift() :
                                v
                        ).concat(args)
                    )
                );
        },

        /**
         * Create a wrapped version of a function that executes at most once per wait period.
         * @param {function} callback
         * @param {number} wait
         * @param {Boolean} [leading=true]
         * @param {Boolean} [trailing=true]
         * @returns {Promise}
         */
        throttleFactory(callback, wait, leading = true, trailing = true) {
            let ran,
                running;

            return (...args) => new Promise((resolve, reject) => {
                if (running) {
                    return reject();
                }

                if (leading && !ran) {
                    ran = true;
                    return resolve(
                        callback(...args)
                    );
                }

                running = true;
                setTimeout(
                    _ => {
                        running = false;
                        if (trailing) {
                            resolve(
                                callback(...args)
                            );
                        } else {
                            reject();
                        }
                    },
                    wait
                );
            });
        }

    });

    Object.assign(Core, {

        /**
         * Clamp a value between a min and max.
         * @param {number} value 
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {number}
         */
        clamp(value, min = 0, max = 1) {
            return Math.max(
                min,
                Math.min(
                    max,
                    value
                )
            );
        },

        /**
         * Clamp a value between 0 and 100.
         * @param {number} value 
         * @returns {number}
         */
        clampPercent(value) {
            return this.clamp(
                value,
                0,
                100
            );
        },

        /**
         * Get the distance between two vectors.
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @returns {number}
         */
        dist(x1, y1, x2, y2) {
            return this.len(
                x1 - x2,
                y1 - y2
            );
        },

        /**
         * Get the length of an X,Y vector.
         * @param {number} x
         * @param {number} y
         * @returns {number}
         */
        len(x, y) {
            return Math.hypot(x, y);
        },

        /**
         * Linear interpolation from one value to another.
         * @param {number} v1
         * @param {number} v2
         * @param {number} amount
         * @returns {number}
         */
        lerp(v1, v2, amount) {
            return v1
                * (1 - amount)
                + v2
                * amount;
        },

        /**
         * Map a value from one range to another.
         * @param {number} value
         * @param {number} fromMin
         * @param {number} fromMax
         * @param {number} toMin
         * @param {number} toMax
         * @returns {number}
         */
        map(value, fromMin, fromMax, toMin, toMax) {
            return (value - fromMin)
                * (toMax - toMin)
                / (fromMax - fromMin)
                + toMin;
        },

        /**
         * Round a number to a specified step-size.
         * @param {number} value
         * @param {number} step
         * @returns {number}
         */
        toStep(value, step) {
            return Math.round(value / step)
                * step;
        },

        /**
         * Get the linear percent of a value in a specified range.
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        linearPercent(value, min, max) {
            if (min === max) {
                return 0;
            }

            return this.clampPercent(
                100
                * (value - min)
                / (max - min)
            );
        },

        /**
         * Get the linear value of a percent in a specified range.
         * @param {number} percent
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        linearValue(percent, min, max) {
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

        /**
         * Get the logarithmic percent of a value in a specified range.
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        logPercent(value, min, max) {
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

        /**
         * Get the logarithmic value of a percent in a specified range.
         * @param {number} percent
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        logValue(percent, min, max) {
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

        /**
         * Remove a specified key from an Object using dot notation.
         * @param {Object} object 
         * @param {string} key
         */
        forgetDot(object, key) {
            let pointer = object;

            const keys = key.split('.');
            while (key = keys.shift() && keys.length) {
                if (!pointer.hasOwnProperty(key)) {
                    return;
                }

                pointer = pointer[key];
            }

            delete pointer[key];
        },

        /**
         * Retrieve the value of a specified key from an Object using dot notation.
         * @param {Object} object 
         * @param {string} key
         * @param {*} [defaultValue]
         * @returns {*}
         */
        getDot(object, key, defaultValue) {
            let value = object;

            key.split('.').forEach(key => {
                if (!value.hasOwnProperty(key)) {
                    value = defaultValue;
                    return false;
                }

                value = value[key];
            });

            return value;
        },

        /**
         * Returns true if a specified key exists in an Object using dot notation.
         * @param {Object} object 
         * @param {string} key
         * @returns {Boolean}
         */
        hasDot(object, key) {
            let result = true,
                pointer = object;

            key.split('.').forEach(key => {
                if (!pointer.hasOwnProperty(key)) {
                    result = false;
                    return false;
                }

                pointer = pointer[key];
            });

            return result;
        },

        /**
         * Retrieve values of a specified key from an Array of Objects using dot notation.
         * @param {Array} objects
         * @param {string} key
         * @param {*} [defaultValue]
         * @returns {Array}
         */
        pluckDot(objects, key, defaultValue) {
            return objects
                .slice()
                .map(pointer => this.getDot(pointer, key, defaultValue));
        },

        /**
         * Set a specified value of a key for an object using dot notation.
         * @param {Array} object
         * @param {string} key
         * @param {*} value
         * @param {Boolean} [overwrite=true]
         */
        setDot(object, key, value, overwrite = true) {
            let pointer = object,
                current;

            const keys = key.split('.');
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

        /**
         * Create a Document object from a HTML string.
         * @param {string} html
         * @returns {Document}
         */
        parseHTML(html) {
            const parser = new DOMParser;
            return parser.parseFromString(html, 'application/html');
        },

        /**
         * Create a Document object from an XML string.
         * @param {string} xml
         * @returns {Document}
         */
        parseXML(xml) {
            const parser = new DOMParser;
            return parser.parseFromString(xml, 'application/xml');
        }

    });

    Object.assign(Core, {

        /**
         * Convert a string to camelCase.
         * @param {string} string
         * @returns {string}
         */
        camelCase(string) {
            return `${string}`
                .replace(
                    /(\-[a-z])/g,
                    match =>
                        match.toUpperCase()
                )
                .replace('-', '');
        },

        /**
         * Convert a string to snake-case.
         * @param {string} string
         * @returns {string}
         */
        snakeCase(string) {
            return `${string}`
                .replace(
                    /([A-Z])/g,
                    match =>
                        `-${match.toLowerCase()}`
                );
        }

    });

    Object.assign(Core, {

        /**
         * Returns true if the value is a Boolean.
         * @param {*} value 
         * @returns {Boolean}
         */
        isBoolean(value) {
            return value === !!value;
        },

        /**
         * Returns true if the value is a function.
         * @param {*} value 
         * @returns {Boolean}
         */
        isFunction(value) {
            return typeof value === 'function';
        },

        /**
         * Returns true if the value is numeric.
         * @param {*} value 
         * @returns {Boolean}
         */
        isNumeric(value) {
            return !isNaN(parseFloat(value)) &&
                isFinite(value);
        },

        /**
         * Returns true if the value is a plain Object.
         * @param {*} value 
         * @returns {Boolean}
         */
        isPlainObject(value) {
            return this.isObject(value) &&
                value.constructor === Object;
        },

        /**
         * Returns true if the value is an Object.
         * @param {*} value 
         * @returns {Boolean}
         */
        isObject(value) {
            return value === Object(value);
        },

        /**
         * Returns true if the value is a string.
         * @param {*} value 
         * @returns {Boolean}
         */
        isString(value) {
            return value === `${value}`;
        }

    });

    return {
        Core
    };

});