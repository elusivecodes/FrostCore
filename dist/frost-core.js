/**
 * FrostCore v1.0
 * https://github.com/elusivecodes/FrostCore
 */
(function (global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        global.Core = factory();
    }

})(this, function () {
    'use strict';

    const Core = {};

    /**
     * Array methods
     */

    /**
     * Remove duplicate elements in an array.
     * @param {Array} array The input array.
     * @returns {Array} The filtered array.
     */
    Core.unique = array => [...new Set(array)];

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @returns {Array} The wrapped array.
     */
    Core.wrap = value =>
        Array.isArray(value) ?
            value :
            Core.isArrayLike(value) ?
                Array.from(value) :
                [value];

    /**
     * Function methods
     */

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
     * @returns {function} The wrapped function.
     */
    Core.animation = (callback, leading) => {
        let newArgs,
            running;

        return (...args) => {
            newArgs = args;

            if (running) {
                return;
            }

            running = true;
            window.requestAnimationFrame(_ => {
                running = false;
                if (!leading) {
                    callback(...newArgs);
                }
            });

            if (leading) {
                callback(...newArgs);
            }
        };
    };

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} wait The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading] Whether to execute on the leading edge of the wait period.
     * @returns {function} The wrapped function.
     */
    Core.debounce = (callback, wait, leading) => {
        let newArgs,
            running,
            runLead = leading;

        return (...args) => {
            newArgs = args;

            if (running) {
                runLead = false;
                return;
            }

            if (runLead) {
                callback(...newArgs);
            }

            running = true;
            setTimeout(
                _ => {
                    if (!runLead) {
                        callback(...newArgs);
                    }
                    running = false;
                    runLead = leading;
                },
                wait
            );
        };
    };

    /**
     * Create a wrapped version of a function that executes on the next cycle of the event queue.
     * @param {function} callback Callback function to execute.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @returns {function} The wrapped function.
     */
    Core.defer = (callback, ...defaultArgs) => Core.delay(callback, 0, ...defaultArgs);

    /**
     * Create a wrapped version of a function that executes after a wait period.
     * @param {function} callback Callback function to execute.
     * @param {number} wait The number of milliseconds to wait until execution.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @returns {function} The wrapped function.
     */
    Core.delay = (callback, wait, ...defaultArgs) =>
        (...args) => {
            setTimeout(
                _ => callback(...(
                    defaultArgs.concat(args)
                )),
                wait
            );
        };

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * @param {function} callback Callback function to execute.
     * @returns {function} The wrapped function.
     */
    Core.once = callback => {
        let ran;

        return (...args) => {
            if (ran) {
                return;
            }

            ran = true;
            return callback(...args);
        };
    };

    /**
     * Create a wrapped version of a function with predefined arguments.
     * @param {function} callback Callback function to execute.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @returns {function} The wrapped function.
     */
    Core.partial = (callback, ...defaultArgs) =>
        (...args) =>
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

    /**
     * Create a wrapped version of a function that executes at most once per wait period.
     * @param {function} callback Callback function to execute.
     * @param {number} wait The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
     * @returns {function} The wrapped function.
     */
    Core.throttle = (callback, wait, leading = true, trailing = true) => {
        let ran,
            running;

        return (...args) => {
            if (running) {
                return;
            }

            if (leading && (!ran || !trailing)) {
                ran = true;
                callback(...args);
            }

            running = true;
            setTimeout(
                _ => {
                    if (trailing) {
                        callback(...args);
                    }
                    running = false;
                },
                wait
            );
        };
    };

    /**
     * Execute a function a specified number of times.
     * @param {function} callback Callback function to execute.
     * @param {number} amount The amount of times to execute the callback.
     */
    Core.times = (callback, amount) => {
        for (let i = 0; i < amount; i++) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Math methods
     */

    /**
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @returns {number} The clamped value.
     */
    Core.clamp = (value, min = 0, max = 1) =>
        Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value The value to clamp.
     * @returns {number} The clamped value.
     */
    Core.clampPercent = value => Core.clamp(value, 0, 100);

    /**
     * Get the distance between two vectors.
     * @param {number} x1 The first vector X co-ordinate.
     * @param {number} y1 The first vector Y co-ordinate.
     * @param {number} x2 The second vector X co-ordinate.
     * @param {number} y2 The second vector Y co-ordinate.
     * @returns {number} The distance between the vectors.
     */
    Core.dist = (x1, y1, x2, y2) =>
        Core.len(
            x1 - x2,
            y1 - y2
        );

    /**
     * Get the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    Core.len = (x, y) => Math.hypot(x, y);

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @returns {number} The interpolated value.
     */
    Core.lerp = (v1, v2, amount) =>
        v1
        * (1 - amount)
        + v2
        * amount;

    /**
     * Map a value from one range to another.
     * @param {number} value
     * @param {number} fromMin
     * @param {number} fromMax
     * @param {number} toMin
     * @param {number} toMax
     * @returns {number} The mapped value.
     */
    Core.map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin)
        * (toMax - toMin)
        / (fromMax - fromMin)
        + toMin;

    /**
     * Constrain a number to a specified step-size.
     * @param {number} value The value to constrain.
     * @param {number} step The minimum step-size.
     * @returns {number} The constrained value.
     */
    Core.toStep = (value, step = 0.01) =>
        Math.round(value / step)
        * step;

    /**
     * Get the linear percent of a value in a specified range.
     * @param {number} value The value to process.
     * @param {number} min The minimum of the range.
     * @param {number} max The maximum of the range.
     * @returns {number} The linear percent.
     */
    Core.linearPercent = (value, min, max) =>
        min === max ?
            0 :
            Core.clampPercent(
                100
                * (value - min)
                / (max - min)
            );

    /**
     * Get the linear value of a percent in a specified range.
     * @param {number} percent The percent to process.
     * @param {number} min The minimum of the range.
     * @param {number} max The maximum of the range.
     * @returns {number} The linear value.
     */
    Core.linearValue = (percent, min, max) =>
        Core.clamp(
            min
            + (
                percent
                / 100
                * (max - min)
            ),
            min,
            max
        );

    /**
     * Get the logarithmic percent of a value in a specified range.
     * @param {number} value The value to process.
     * @param {number} min The minimum of the range.
     * @param {number} max The maximum of the range.
     * @returns {number} The logarithmic percent.
     */
    Core.logPercent = (value, min, max) => {
        if (min === max) {
            return 0;
        }

        min = min ?
            Math.log(min) :
            0;

        return Core.clampPercent(
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
    };

    /**
     * Get the logarithmic value of a percent in a specified range.
     * @param {number} percent The percent to process.
     * @param {number} min The minimum of the range.
     * @param {number} max The maximum of the range.
     * @returns {number} The logarithmic value;
     */
    Core.logValue = (percent, min, max) => {
        min = min ?
            Math.log(min) :
            0;

        return Core.clamp(
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
    };

    /**
     * Object methods
     */

    /**
     * Remove a specified key from an object using dot notation.
     * @param {Object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    Core.forgetDot = (object, key) => {
        let pointer = object;

        const keys = key.split('.');
        while (key = keys.shift()) {
            if (!this.isObject(pointer) || !(key in pointer)) {
                break;
            }

            if (keys.length) {
                pointer = pointer[key];
            } else {
                delete pointer[key];
            }
        }
    };

    /**
     * Retrieve the value of a specified key from an object using dot notation.
     * @param {Object} object The input object.
     * @param {string} key The key to retrieve from the object.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {*} The value retrieved from the object.
     */
    Core.getDot = (object, key, defaultValue) => {
        let pointer = object;

        for (key of key.split('.')) {
            if (!this.isObject(pointer) || !(key in pointer)) {
                return defaultValue;
            }

            pointer = pointer[key];
        }

        return pointer;
    };

    /**
     * Returns true if a specified key exists in an object using dot notation.
     * @param {Object} object The input object.
     * @param {string} key The key to test for in the object.
     * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    Core.hasDot = (object, key) => {
        let pointer = object;

        for (key of key.split('.')) {
            if (!this.isObject(pointer) || !(key in pointer)) {
                return false;
            }

            pointer = pointer[key];
        }

        return true;
    };

    /**
     * Retrieve values of a specified key from an array of objects using dot notation.
     * @param {Object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {Array} An array of values retrieved from the objects.
     */
    Core.pluckDot = (objects, key, defaultValue) => objects
        .map(pointer => this.getDot(pointer, key, defaultValue));

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {Array} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
     */
    Core.setDot = (object, key, value, overwrite = true) => {
        let pointer = object,
            current;

        const keys = key.split('.');
        while (current = keys.shift()) {
            if (current === '*') {
                for (const k of Object.keys(pointer)) {
                    this.setDot(
                        pointer,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite
                    );
                }
                return;
            }

            if (keys.length) {
                if (!this.isObject(pointer[current]) || !(current in pointer)) {
                    pointer[current] = {};
                }

                pointer = pointer[current];
            } else if (overwrite || !(current in pointer)) {
                pointer[current] = value;
            }
        }
    };

    /**
     * Parsing methods
     */

    /**
     * Create a Document object from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {Document} A new document from the parsed HTML string.
     */
    Core.parseHTML = html => new DOMParser()
        .parseFromString(html, 'text/html');

    /**
     * Create a Document object from an XML string.
     * @param {string} xml The XML input string.
     * @returns {Document} A new document from the parsed XML string.
     */
    Core.parseXML = xml => new DOMParser()
        .parseFromString(xml, 'application/xml');

    /**
     * String methods
     */

    /**
     * Convert a string to camelCase.
     * @param {string} string The input string.
     * @returns {string} The camelCased string.
     */
    Core.camelCase = string => `${string}`
        .replace(
            /\-([a-z])/g,
            match =>
                match.substring(1).toUpperCase()
        );

    /**
     * Convert a string to snake-case.
     * @param {string} string The input string.
     * @returns {string} The snake-cased string.
     */
    Core.snakeCase = string => `${string}`
        .replace(
            /([A-Z])/g,
            match =>
                `-${match.toLowerCase()}`
        );

    /**
     * Testing methods
     */

    /**
     * Returns true if the value is a Array-like.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
     */
    Core.isArrayLike = value =>
        Array.isArray(value) ||
        (
            !Core.isFunction(value) &&
            !(value instanceof Window) &&
            Core.isObject(value) &&
            (
                (
                    value[Symbol.iterator] &&
                    Core.isFunction(value[Symbol.iterator])
                ) ||
                (
                    'length' in value &&
                    Core.isNumeric(value.length) &&
                    (
                        !value.length ||
                        value.length - 1 in value
                    )
                )
            )
        );

    /**
     * Returns true if the value is a Boolean.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is boolean, otherwise FALSE.
     */
    Core.isBoolean = value => value === !!value;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    Core.isFunction = value => typeof value === 'function';

    /**
     * Returns true if the value is numeric.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
     */
    Core.isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);

    /**
     * Returns true if the value is a plain Object.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
     */
    Core.isPlainObject = value => Core.isObject(value) && value.constructor === Object;

    /**
     * Returns true if the value is an Object.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
     */
    Core.isObject = value => value === Object(value);

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    Core.isString = value => value === `${value}`;

    return Core;

});