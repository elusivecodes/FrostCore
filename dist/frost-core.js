/**
 * FrostCore v1.0.0
 * https://github.com/elusivecodes/FrostCore
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        global.Core = factory(global);
    }

})(this, function(window) {
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
    Core.diff = (array, ...arrays) => {
        arrays = arrays.map(Core.unique);
        return array.filter(
            value => !arrays
                .some(other => other.includes(value))
        )
    };

    /**
     * Create a new array containing the unique values that exist in all of the passed arrays.
     * @param {...array} arrays The input arrays.
     * @returns {array} The output array.
     */
    Core.intersect = (...arrays) =>
        Core.unique(
            arrays
                .reduce(
                    (acc, array, index) => {
                        array = Core.unique(array);
                        return Core.merge(
                            acc,
                            array.filter(
                                value =>
                                    arrays.every(
                                        (other, otherIndex) =>
                                            index == otherIndex ||
                                            other.includes(value)
                                    )
                            )
                        )
                    },
                    []
                )
        );

    /**
     * Merge the values from one or more arrays or array-like objects onto an array.
     * @param {array} array The input array.
     * @param {...array|...object} arrays The arrays or array-like objects to merge.
     * @returns {array} The output array.
     */
    Core.merge = (array = [], ...arrays) =>
        arrays.reduce(
            (acc, other) => {
                Array.prototype.push.apply(acc, other);
                return array;
            },
            array
        );

    /**
     * Return a random value from an array.
     * @param {array} array The input array.
     * @returns {*} A random value from the array, or null if it is empty.
     */
    Core.randomValue = array =>
        array.length ?
            array[Core.randomInt(array.length)] :
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
            (
                (
                    Math.abs(end - start)
                    / step
                )
                + 1
            ) | 0
        )
            .fill()
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
    Core.unique = array =>
        Array.from(
            new Set(array)
        );

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @returns {array} The wrapped array.
     */
    Core.wrap = value =>
        Core.isUndefined(value) ?
            [] :
            (
                Core.isArray(value) ?
                    value :
                    (
                        Core.isArrayLike(value) ?
                            Core.merge([], value) :
                            [value]
                    )
            );

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
        let animationReference,
            newArgs,
            running;

        const animation = (...args) => {
            newArgs = args;

            if (running) {
                return;
            }

            if (leading) {
                callback(...newArgs);
            }

            running = true;
            animationReference = Core._requestAnimationFrame(_ => {
                if (!leading) {
                    callback(...newArgs);
                }

                running = false;
                animationReference = null;
            });
        };

        animation.cancel = _ => {
            if (!animationReference) {
                return;
            }

            if ('requestAnimationFrame' in window) {
                window.cancelAnimationFrame(animationReference);
            } else {
                clearTimeout(animationReference);
            }

            running = false;
            animationReference = null;
        };

        return animation;
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
                (...newArgs) =>
                    curried(
                        ...args.concat(newArgs)
                    );

        return curried;
    };

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} wait The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
     * @returns {function} The wrapped function.
     */
    Core.debounce = (callback, wait, leading, trailing = true) => {
        let debounceReference,
            lastRan,
            newArgs,
            running;

        const debounced = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                lastRan - now :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (running || !trailing) {
                return;
            }

            running = true;
            debounceReference = setTimeout(
                _ => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    running = false;
                    debounceReference = null;
                },
                delta
            );
        };

        debounced.cancel = _ => {
            if (!debounceReference) {
                return;
            }

            clearTimeout(debounceReference);

            running = false;
            debounceReference = null;
        };

        return debounced;
    };

    /**
     * Evaluate a value from a function or value.
     * @param {*} value The value to evaluate.
     * @returns {*} The evaluated value.
     */
    Core.evaluate = value =>
        Core.isFunction(value) ?
            value() :
            value;

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * Subsequent calls to the wrapped function will return the result of the initial call.
     * @param {function} callback Callback function to execute.
     * @returns {function} The wrapped function.
     */
    Core.once = callback => {
        let ran,
            result;

        return (...args) => {
            if (ran) {
                return result;
            }

            ran = true;
            result = callback(...args);
            return result;

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
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} wait The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
     * @returns {function} The wrapped function.
     */
    Core.throttle = (callback, wait, leading = true, trailing = true) =>
        Core.debounce(callback, wait, leading, trailing);

    /**
     * Execute a function a specified number of times.
     * @param {function} callback Callback function to execute.
     * @param {number} amount The amount of times to execute the callback.
     */
    Core.times = (callback, amount) => {
        while (amount--) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Execute a callback on the next animation frame
     * @param {function} callback Callback function to execute.
     */
    Core._requestAnimationFrame = 'requestAnimationFrame' in window ?
        (...args) => window.requestAnimationFrame(...args) :
        callback => setTimeout(callback, 1000 / 60);

    /**
     * Split a string into individual words.
     * @param {string} string The input string.
     * @returns {string[]} The split parts of the string.
     */
    Core._splitString = string =>
        `${string}`
            .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .reduce(
                (acc, word) => {
                    word = word.replace(/[^\w]/, '').toLowerCase();
                    if (word) {
                        acc.push(word)
                    }
                    return acc;
                },
                []
            );

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
    Core.clampPercent = value =>
        Core.clamp(value, 0, 100);

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
     * Inverse linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} value The value to inverse interpolate.
     * @returns {number} The interpolated amount.
     */
    Core.inverseLerp = (v1, v2, value) =>
        (value - v1) / (v2 - v1);

    /**
     * Get the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    Core.len = Math.hypot;

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
     * Return a random number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @returns {number} A random number.
     */
    Core.randomInt = (a = 1, b = null) =>
        Core.random(a, b) | 0;

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
     * Merge the values from one or more objects onto an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @returns {object} The output objects.
     */
    Core.extend = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                for (const k in val) {
                    if (Core.isArray(val[k])) {
                        acc[k] = Core.extend(
                            Core.isArray(acc[k]) ?
                                acc[k] :
                                [],
                            val[k]
                        );
                    } else if (Core.isPlainObject(val[k])) {
                        acc[k] = Core.extend(
                            Core.isPlainObject(acc[k]) ?
                                acc[k] :
                                {},
                            val[k]
                        );
                    } else {
                        acc[k] = val[k];
                    }
                }
                return acc;
            },
            object
        );

    /**
     * Remove a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    Core.forgetDot = (object, key) => {
        const keys = key.split('.');
        while (key = keys.shift()) {
            if (
                !Core.isObject(object) ||
                !(key in object)
            ) {
                break;
            }

            if (keys.length) {
                object = object[key];
            } else {
                delete object[key];
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
        const keys = key.split('.');
        while (key = keys.shift()) {
            if (
                !Core.isObject(object) ||
                !(key in object)
            ) {
                return defaultValue;
            }

            object = object[key];
        }

        return object;
    };

    /**
     * Returns true if a specified key exists in an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to test for in the object.
     * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    Core.hasDot = (object, key) => {
        const keys = key.split('.');
        while (key = keys.shift()) {
            if (
                !Core.isObject(object) ||
                !(key in object)
            ) {
                return false;
            }

            object = object[key];
        }

        return true;
    };

    /**
     * Retrieve values of a specified key from an array of objects using dot notation.
     * @param {object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {array} An array of values retrieved from the objects.
     */
    Core.pluckDot = (objects, key, defaultValue) =>
        objects
            .map(pointer =>
                Core.getDot(pointer, key, defaultValue)
            );

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
     */
    Core.setDot = (object, key, value, overwrite = true) => {
        const keys = key.split('.');
        while (key = keys.shift()) {
            if (key === '*') {
                for (const k in object) {
                    Core.setDot(
                        object,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite
                    );
                }
                return;
            }

            if (keys.length) {
                if (
                    !Core.isObject(object[key]) ||
                    !(key in object)
                ) {
                    object[key] = {};
                }

                object = object[key];
            } else if (
                overwrite ||
                !(key in object)
            ) {
                object[key] = value;
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
                        Core.capitalize(word) :
                        word
            )
            .join('');

    /**
     * Convert the first character of string to upper case and the remaining to lower case.
     * @param {string} string The input string.
     * @returns {string} The capitalized string.
     */
    Core.capitalize = string =>
        string.charAt(0).toUpperCase() +
        string.substring(1).toLowerCase();

    /**
     * Convert HTML special characters in a string to their corresponding HTML entities.
     * @param {string} string The input string.
     * @returns {string} The escaped string.
     */
    Core.escape = string =>
        string.replace(
            Core._escapeRegExp,
            match =>
                Core._escapeChars[match]
        );

    /**
     * Escape RegExp special characters in a string.
     * @param {string} string The input string.
     * @returns {string} The escaped string.
     */
    Core.escapeRegExp = string =>
        string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Convert a string to a humanized form.
     * @param {string} string The input string.
     * @returns {string} The humanized string.
     */
    Core.humanize = string =>
        Core.capitalize(
            Core._splitString(string)
                .join(' ')
        );

    /**
     * Convert a string to kebab-case.
     * @param {string} string The input string.
     * @returns {string} The kebab-cased string.
     */
    Core.kebabCase = string =>
        Core._splitString(string)
            .join('-')
            .toLowerCase();

    /**
     * Convert a string to PascalCase.
     * @param {string} string The input string.
     * @returns {string} The camelCased string.
     */
    Core.pascalCase = string =>
        Core._splitString(string)
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1)
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
            .map(
                _ =>
                    chars[Core.random(chars.length) | 0]
            )
            .join('');

    /**
     * Convert a string to snake_case.
     * @param {string} string The input string.
     * @returns {string} The snake_cased string.
     */
    Core.snakeCase = string =>
        Core._splitString(string)
            .join('_')
            .toLowerCase();

    /**
     * Convert HTML entities in a string to their corresponding characters.
     * @param {string} string The input string.
     * @returns {string} The unescaped string.
     */
    Core.unescape = string =>
        string.replace(
            Core._unescapeRegExp,
            (_, code) =>
                Core._unescapeChars[code]
        );

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
    Core.isBoolean = value =>
        value === !!value;

    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    Core.isDocument = value =>
        !!value &&
        value.nodeType === Core.DOCUMENT_NODE;

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    Core.isElement = value =>
        !!value &&
        value.nodeType === Core.ELEMENT_NODE;

    /**
     * Returns true if the value is a DocumentFragment.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
     */
    Core.isFragment = value =>
        !!value &&
        value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    Core.isFunction = value =>
        typeof value === 'function';

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
            value.nodeType === Core.ELEMENT_NODE ||
            value.nodeType === Core.TEXT_NODE ||
            value.nodeType === Core.COMMENT_NODE
        );

    /**
     * Returns true if the value is null.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
     */
    Core.isNull = value =>
        value === null;

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
        value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    Core.isString = value =>
        value === `${value}`;

    /**
     * Returns true if the value is undefined.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
     */
    Core.isUndefined = value =>
        value === undefined;

    /**
     * Returns true if the value is a Window.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
     */
    Core.isWindow = value =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    /**
     * Core Properties
     */

    // Node type constants
    Core.ELEMENT_NODE = 1;
    Core.TEXT_NODE = 3;
    Core.COMMENT_NODE = 8;
    Core.DOCUMENT_NODE = 9;
    Core.DOCUMENT_FRAGMENT_NODE = 11;

    // HTML escape regex
    Core._escapeRegExp = /[&<>"']/g;
    Core._unescapeRegExp = /\&(amp|lt|gt|quot|apos);/g;

    // HTML escape characters
    Core._escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;'
    };

    Core._unescapeChars = {
        'amp': '&',
        'lt': '<',
        'gt': '>',
        'quot': '"',
        'apos': '\''
    };

    return Core;

});