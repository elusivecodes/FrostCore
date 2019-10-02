/**
 * FrostCore v1.0.0
 * https://github.com/elusivecodes/FrostCore
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        global.Core = factory();
    }

})(this, function() {
    'use strict';

    const Core = {};

    /**
     * Array methods
     */

    /**
     * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
     * @param {array} array The input array.
     * @param {...array} arrays The arrays to compare against.
     * @returns {array} The output array.
     */
    Core.diff = (array, ...arrays) =>
        array.filter(
            value => !arrays
                .map(Core.unique)
                .some(other => other.includes(value))
        );

    /**
     * Create a new array containing the unique values that exist in all of the passed arrays.
     * @param {...array} arrays The input arrays.
     * @returns {array} The output array.
     */
    Core.intersect = (...arrays) =>
        Core.unique(
            arrays
                .map(Core.unique)
                .reduce((acc, array, index) =>
                    Core.merge(
                        acc,
                        array.filter(
                            value =>
                                arrays.every(
                                    (other, otherIndex) =>
                                        index == otherIndex ||
                                        other.includes(value)
                                )
                        )
                    ),
                    []
                )
        );

    /**
     * Merge the values from one or more arrays or array-like objects onto an array.
     * @param {array} array The input array.
     * @param {...array|...object} arrays The arrays or array-like objects to merge.
     * @returns {array} The output array.
     */
    Core.merge = (array = [], ...arrays) => {
        for (const arr of arrays) {
            Array.prototype.push.apply(array, arr);
        }

        return array;
    };

    /**
     * Return a random value from an array.
     * @param {array} array The input array.
     * @returns {*} A random value from the array, or null if it is empty.
     */
    Core.randomValue = array =>
        array.length ?
            array[Core.random(array.length) | 0] :
            null;

    /**
     * Return an array containing a range of values.
     * @param {number} start The first value of the sequence.
     * @param {number} end The value to end the sequence on.
     * @param {number} [step=1] The increment between values in the sequence.
     * @returns {number[]} The array of values from start to end.
     */
    Core.range = (start, end, step = 1) => {
        const sign = Math.sign(end - start);
        return new Array(
            ((Math.abs(end - start) / step) + 1) | 0
        ).fill()
            .map(
                (_, i) =>
                    start + Core.toStep(
                        (i * step * sign),
                        step
                    )
            );
    };

    /**
     * Remove duplicate elements in an array.
     * @param {array} array The input array.
     * @returns {array} The filtered array.
     */
    Core.unique = array => Array.from(new Set(array));

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @returns {array} The wrapped array.
     */
    Core.wrap = value => {
        if (Core.isArray(value)) {
            return value;
        }

        if (Core.isArrayLike(value)) {
            return Core.merge([], value);
        }

        return [value];
    };

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
     * Create a wrapped function that will execute each callback in reverse order,
     * passing the result from each function to the previous.
     * @param {...function} callbacks Callback functions to execute.
     * @returns {function} The wrapped function.
     */
    Core.compose = (...callbacks) =>
        arg =>
            callbacks.reduceRight(
                (acc, callback) =>
                    callback(acc),
                arg
            );

    /**
     * Create a wrapped version of a function, that will return new functions
     * until the number of total arguments passed reaches the arguments length
     * of the original function (at which point the function will execute).
     * @param {function} callback Callback function to execute.
     * @returns {function} The wrapped function.
     */
    Core.curry = callback => {
        const curried = (...args) =>
            args.length >= callback.length ?
                callback(...args) :
                (...newArgs) => curried(...args.concat(newArgs));

        return curried;
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
                        Core.isUndefined(v) ?
                            args.shift() :
                            v
                    ).concat(args)
                )
            );

    /**
     * Create a wrapped function that will execute each callback in order,
     * passing the result from each function to the next.
     * @param {...function} callbacks Callback functions to execute.
     * @returns {function} The wrapped function.
     */
    Core.pipe = (...callbacks) =>
        arg =>
            callbacks.reduce(
                (acc, callback) =>
                    callback(acc),
                arg
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
     * Map a value from one range to another.
     * @param {number} value The value to map.
     * @param {number} fromMin The minimum value of the current range.
     * @param {number} fromMax The maximum value of the current range.
     * @param {number} toMin The minimum value of the target range.
     * @param {number} toMax The maximum value of the target range.
     * @returns {number} The mapped value.
     */
    Core.map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin)
        * (toMax - toMin)
        / (fromMax - fromMin)
        + toMin;

    /**
     * Return a random floating-point number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @returns {number} A random number.
     */
    Core.random = (a = 1, b = null) =>
        Core.isNull(b) ?
            Math.random() * a :
            Core.map(
                Math.random(),
                0,
                1,
                a,
                b
            );

    /**
     * Constrain a number to a specified step-size.
     * @param {number} value The value to constrain.
     * @param {number} step The minimum step-size.
     * @returns {number} The constrained value.
     */
    Core.toStep = (value, step = 0.01) =>
        parseFloat(
            (
                Math.round(value / step)
                * step
            ).toFixed(
                `${step}`.replace('\d*\.?/', '').length
            )
        );

    /**
     * Object methods
     */

    /**
     * Remove a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    Core.forgetDot = (object, key) => {
        let pointer = object;

        const keys = key.split('.');
        while (key = keys.shift()) {
            if (!Core.isObject(pointer) || !(key in pointer)) {
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
     * @param {object} object The input object.
     * @param {string} key The key to retrieve from the object.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {*} The value retrieved from the object.
     */
    Core.getDot = (object, key, defaultValue) => {
        let pointer = object;

        for (key of key.split('.')) {
            if (!Core.isObject(pointer) || !(key in pointer)) {
                return defaultValue;
            }

            pointer = pointer[key];
        }

        return pointer;
    };

    /**
     * Returns true if a specified key exists in an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to test for in the object.
     * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    Core.hasDot = (object, key) => {
        let pointer = object;

        for (key of key.split('.')) {
            if (!Core.isObject(pointer) || !(key in pointer)) {
                return false;
            }

            pointer = pointer[key];
        }

        return true;
    };

    /**
     * Merge the values from one or more objects onto an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @returns {object} The output objects.
     */
    Core.mergeDeep = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                for (const k in val) {
                    if (
                        k in acc &&
                        Core.isObject(acc[k]) &&
                        Core.isObject(val[k])
                    ) {
                        Core.mergeDeep(acc[k], val[k]);
                    } else {
                        acc[k] = val[k];
                    }
                }
            },
            object
        );

    /**
     * Retrieve values of a specified key from an array of objects using dot notation.
     * @param {object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {array} An array of values retrieved from the objects.
     */
    Core.pluckDot = (objects, key, defaultValue) => objects
        .map(pointer => Core.getDot(pointer, key, defaultValue));

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
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
                for (const k in pointer) {
                    Core.setDot(
                        pointer,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite
                    );
                }
                return;
            }

            if (keys.length) {
                if (!Core.isObject(pointer[current]) || !(current in pointer)) {
                    pointer[current] = {};
                }

                pointer = pointer[current];
            } else if (overwrite || !(current in pointer)) {
                pointer[current] = value;
            }
        }
    };

    /**
     * String methods
     */

    /**
     * Convert a string to camelCase.
     * @param {string} string The input string.
     * @returns {string} The camelCased string.
     */
    Core.camelCase = string =>
        Core._splitString(string)
            .map(
                (word, index) =>
                    index ?
                        word.charAt(0).toUpperCase() + word.substring(1) :
                        word
            )
            .join('');

    /**
     * Convert HTML special characters in a string to their corresponding HTML entities.
     * @param {string} string The input string.
     * @returns {string} The escaped string.
     */
    Core.escape = string =>
        new Option(string).innerHTML;

    /**
     * Escape RegExp special characters in a string.
     * @param {string} string The string to escape.
     * @returns {string} The escaped string.
     */
    Core.escapeRegExp = string =>
        string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Convert a string to PascalCase.
     * @param {string} string The input string.
     * @returns {string} The camelCased string.
     */
    Core.pascalCase = string =>
        Core._splitString(string)
            .map(
                word =>
                    word.charAt(0).toUpperCase() + word.substring(1)
            )
            .join('');

    /**
     * Return a random string.
     * @param {number} [length=16] The length of the output string.
     * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
     * @returns {string} The random string.
     */
    Core.randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
        new Array(length)
            .fill()
            .map(_ => chars[Core.random(chars.length) | 0])
            .join('');

    /**
     * Convert a string to snake-case.
     * @param {string} string The input string.
     * @returns {string} The snake-cased string.
     */
    Core.snakeCase = string =>
        Core._splitString(string).join('-');

    /**
     * Convert a string to underscored.
     * @param {string} string The input string.
     * @returns {string} The underscored string.
     */
    Core.underscore = string =>
        Core._splitString(string).join('_');

    /**
     * Convert HTML entities in a string to their corresponding characters.
     * @param {string} string The input string.
     * @returns {string} The unescaped string.
     */
    Core.unescape = string =>
        new DOMParser()
            .parseFromString(string, 'text/html')
            .documentElement
            .textContent;

    /**
     * Split a string into individual words.
     * @param {string} string The input string.
     * @returns {string[]} The split parts of the string.
     */
    Core._splitString = string =>
        `${string}`.split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .map(word => word.replace(/[^\w]/, '').toLowerCase())
            .filter(word => word);

    /**
     * Testing methods
     */

    /**
     * Returns true if the value is an array.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
     */
    Core.isArray = Array.isArray;

    /**
     * Returns true if the value is array-like.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
     */
    Core.isArrayLike = value =>
        Core.isArray(value) ||
        (
            Core.isObject(value) &&
            !Core.isFunction(value) &&
            !Core.isWindow(value) &&
            !Core.isElement(value) &&
            (
                (
                    Symbol.iterator in value &&
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
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    Core.isDocument = value =>
        !!value &&
        value.nodeType === Node.DOCUMENT_NODE;

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    Core.isElement = value =>
        !!value &&
        value.nodeType === Node.ELEMENT_NODE;

    /**
     * Returns true if the value is a DocumentFragment.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
     */
    Core.isFragment = value =>
        !!value &&
        value.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    Core.isFunction = value => typeof value === 'function';

    /**
     * Returns true if the value is NaN.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
     */
    Core.isNaN = Number.isNaN;

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    Core.isNode = value =>
        !!value &&
        (
            value.nodeType === Node.ELEMENT_NODE ||
            value.nodeType === Node.TEXT_NODE ||
            value.nodeType === Node.COMMENT_NODE
        );

    /**
     * Returns true if the value is null.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
     */
    Core.isNull = value => value === null;

    /**
     * Returns true if the value is numeric.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
     */
    Core.isNumeric = value =>
        !isNaN(parseFloat(value)) &&
        isFinite(value);

    /**
     * Returns true if the value is a plain object.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
     */
    Core.isPlainObject = value =>
        !!value &&
        value.constructor === Object;

    /**
     * Returns true if the value is an object.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
     */
    Core.isObject = value =>
        !!value &&
        value === Object(value);

    /**
     * Returns true if the value is a ShadowRoot.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
     */
    Core.isShadow = value =>
        !!value &&
        value.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    Core.isString = value => value === `${value}`;

    /**
     * Returns true if the value is undefined.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
     */
    Core.isUndefined = value => value === undefined;

    /**
     * Returns true if the value is a Window.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
     */
    Core.isWindow = value =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    return Core;

});