(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._ = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Testing methods
     */

    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const COMMENT_NODE = 8;
    const DOCUMENT_NODE = 9;
    const DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Returns true if the value is an array.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
     */
    const isArray = Array.isArray;

    /**
     * Returns true if the value is array-like.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is array-like, otherwise FALSE.
     */
    const isArrayLike = (value) =>
        isArray(value) ||
        (
            isObject(value) &&
            !isFunction(value) &&
            !isWindow(value) &&
            !isElement(value) &&
            (
                (
                    Symbol.iterator in value &&
                    isFunction(value[Symbol.iterator])
                ) ||
                (
                    'length' in value &&
                    isNumeric(value.length) &&
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
     * @return {Boolean} TRUE if the value is boolean, otherwise FALSE.
     */
    const isBoolean = (value) =>
        value === !!value;

    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    const isDocument = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_NODE;

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    const isElement = (value) =>
        !!value &&
        value.nodeType === ELEMENT_NODE;

    /**
     * Returns true if the value is a DocumentFragment.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
     */
    const isFragment = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    const isFunction = (value) =>
        typeof value === 'function';

    /**
     * Returns true if the value is NaN.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
     */
    const isNaN = Number.isNaN;

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    const isNode = (value) =>
        !!value &&
        (
            value.nodeType === ELEMENT_NODE ||
            value.nodeType === TEXT_NODE ||
            value.nodeType === COMMENT_NODE
        );

    /**
     * Returns true if the value is null.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is null, otherwise FALSE.
     */
    const isNull = (value) =>
        value === null;

    /**
     * Returns true if the value is numeric.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is numeric, otherwise FALSE.
     */
    const isNumeric = (value) =>
        !isNaN(parseFloat(value)) &&
        isFinite(value);

    /**
     * Returns true if the value is an object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is an object, otherwise FALSE.
     */
    const isObject = (value) =>
        !!value &&
        value === Object(value);

    /**
     * Returns true if the value is a plain object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a plain object, otherwise FALSE.
     */
    const isPlainObject = (value) =>
        !!value &&
        value.constructor === Object;

    /**
     * Returns true if the value is a ShadowRoot.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
     */
    const isShadow = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    const isString = (value) =>
        value === `${value}`;

    /**
     * Returns true if the value is a text Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a text Node, otherwise FALSE.
     */
    const isText = (value) =>
        !!value &&
        value.nodeType === TEXT_NODE;

    /**
     * Returns true if the value is undefined.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is undefined, otherwise FALSE.
     */
    const isUndefined = (value) =>
        value === undefined;

    /**
     * Returns true if the value is a Window.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a Window, otherwise FALSE.
     */
    const isWindow = (value) =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    /**
     * Math methods
     */

    /**
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @return {number} The clamped value.
     */
    const clamp = (value, min = 0, max = 1) =>
        Math.max(
            min,
            Math.min(
                max,
                value,
            ),
        );

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value The value to clamp.
     * @return {number} The clamped value.
     */
    const clampPercent = (value) =>
        clamp(value, 0, 100);

    /**
     * Get the distance between two vectors.
     * @param {number} x1 The first vector X co-ordinate.
     * @param {number} y1 The first vector Y co-ordinate.
     * @param {number} x2 The second vector X co-ordinate.
     * @param {number} y2 The second vector Y co-ordinate.
     * @return {number} The distance between the vectors.
     */
    const dist = (x1, y1, x2, y2) =>
        len(
            x1 - x2,
            y1 - y2,
        );

    /**
     * Inverse linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} value The value to inverse interpolate.
     * @return {number} The interpolated amount.
     */
    const inverseLerp = (v1, v2, value) =>
        (value - v1) / (v2 - v1);

    /**
     * Get the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    const len = Math.hypot;

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @return {number} The interpolated value.
     */
    const lerp = (v1, v2, amount) =>
        v1 *
        (1 - amount) +
        v2 *
        amount;

    /**
     * Map a value from one range to another.
     * @param {number} value The value to map.
     * @param {number} fromMin The minimum value of the current range.
     * @param {number} fromMax The maximum value of the current range.
     * @param {number} toMin The minimum value of the target range.
     * @param {number} toMax The maximum value of the target range.
     * @return {number} The mapped value.
     */
    const map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin) *
        (toMax - toMin) /
        (fromMax - fromMin) +
        toMin;

    /**
     * Return a random floating-point number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const random = (a = 1, b = null) =>
        isNull(b) ?
            Math.random() * a :
            map(
                Math.random(),
                0,
                1,
                a,
                b,
            );

    /**
     * Return a random number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const randomInt = (a = 1, b = null) =>
        random(a, b) | 0;

    /**
     * Constrain a number to a specified step-size.
     * @param {number} value The value to constrain.
     * @param {number} step The minimum step-size.
     * @return {number} The constrained value.
     */
    const toStep = (value, step = 0.01) =>
        parseFloat(
            (
                Math.round(value / step) *
                step
            ).toFixed(
                `${step}`.replace(/\d*\.?/, '').length,
            ),
        );

    /**
     * Array methods
     */

    /**
     * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
     * @param {array} array The input array.
     * @param {...array} arrays The arrays to compare against.
     * @return {array} The output array.
     */
    const diff = (array, ...arrays) => {
        arrays = arrays.map(unique);
        return array.filter(
            (value) => !arrays
                .some((other) => other.includes(value)),
        );
    };

    /**
     * Create a new array containing the unique values that exist in all of the passed arrays.
     * @param {...array} arrays The input arrays.
     * @return {array} The output array.
     */
    const intersect = (...arrays) =>
        unique(
            arrays
                .reduce(
                    (acc, array, index) => {
                        array = unique(array);
                        return merge(
                            acc,
                            array.filter(
                                (value) =>
                                    arrays.every(
                                        (other, otherIndex) =>
                                            index == otherIndex ||
                                            other.includes(value),
                                    ),
                            ),
                        );
                    },
                    [],
                ),
        );

    /**
     * Merge the values from one or more arrays or array-like objects onto an array.
     * @param {array} array The input array.
     * @param {...array|object} arrays The arrays or array-like objects to merge.
     * @return {array} The output array.
     */
    const merge = (array = [], ...arrays) =>
        arrays.reduce(
            (acc, other) => {
                Array.prototype.push.apply(acc, other);
                return array;
            },
            array,
        );

    /**
     * Return a random value from an array.
     * @param {array} array The input array.
     * @return {*} A random value from the array, or null if it is empty.
     */
    const randomValue = (array) =>
        array.length ?
            array[randomInt(array.length)] :
            null;

    /**
     * Return an array containing a range of values.
     * @param {number} start The first value of the sequence.
     * @param {number} end The value to end the sequence on.
     * @param {number} [step=1] The increment between values in the sequence.
     * @return {number[]} The array of values from start to end.
     */
    const range = (start, end, step = 1) => {
        const sign = Math.sign(end - start);
        return new Array(
            (
                (
                    Math.abs(end - start) /
                    step
                ) +
                1
            ) | 0,
        )
            .fill()
            .map(
                (_, i) =>
                    start + toStep(
                        (i * step * sign),
                        step,
                    ),
            );
    };

    /**
     * Remove duplicate elements in an array.
     * @param {array} array The input array.
     * @return {array} The filtered array.
     */
    const unique = (array) =>
        Array.from(
            new Set(array),
        );

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @return {array} The wrapped array.
     */
    const wrap = (value) =>
        isUndefined(value) ?
            [] :
            (
                isArray(value) ?
                    value :
                    (
                        isArrayLike(value) ?
                            merge([], value) :
                            [value]
                    )
            );

    /**
     * Function methods
     */

    const isBrowser = typeof window !== 'undefined' && 'requestAnimationFrame' in window;

    /**
     * Execute a callback on the next animation frame
     * @param {function} callback Callback function to execute.
     * @return {number} The request ID.
     */
    const _requestAnimationFrame = isBrowser ?
        (...args) => window.requestAnimationFrame(...args) :
        (callback) => setTimeout(callback, 1000 / 60);

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=false] Whether to execute on the leading edge of the animation frame.
     * @return {function} The wrapped function.
     */
    const animation = (callback, { leading = false } = {}) => {
        let animationReference;
        let newArgs;
        let running;

        const animation = (...args) => {
            newArgs = args;

            if (running) {
                return;
            }

            if (leading) {
                callback(...newArgs);
            }

            running = true;
            animationReference = _requestAnimationFrame((_) => {
                if (!leading) {
                    callback(...newArgs);
                }

                running = false;
                animationReference = null;
            });
        };

        animation.cancel = (_) => {
            if (!animationReference) {
                return;
            }

            if (isBrowser) {
                global.cancelAnimationFrame(animationReference);
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
     * @return {function} The wrapped function.
     */
    const compose = (...callbacks) =>
        (arg) =>
            callbacks.reduceRight(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function, that will return new functions
     * until the number of total arguments passed reaches the arguments length
     * of the original function (at which point the function will execute).
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const curry = (callback) => {
        const curried = (...args) =>
            args.length >= callback.length ?
                callback(...args) :
                (...newArgs) =>
                    curried(
                        ...args.concat(newArgs),
                    );

        return curried;
    };

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=false] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const debounce = (callback, wait = 0, { leading = false, trailing = true } = {}) => {
        let debounceReference;
        let lastRan;
        let newArgs;

        const debounced = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (!trailing) {
                return;
            }

            if (debounceReference) {
                clearTimeout(debounceReference);
            }

            debounceReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    debounceReference = null;
                },
                wait,
            );
        };

        debounced.cancel = (_) => {
            if (!debounceReference) {
                return;
            }

            clearTimeout(debounceReference);

            debounceReference = null;
        };

        return debounced;
    };

    /**
     * Evaluate a value from a function or value.
     * @param {*} value The value to evaluate.
     * @return {*} The evaluated value.
     */
    const evaluate = (value) =>
        isFunction(value) ?
            value() :
            value;

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * Subsequent calls to the wrapped function will return the result of the initial call.
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const once = (callback) => {
        let ran;
        let result;

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
     * @return {function} The wrapped function.
     */
    const partial = (callback, ...defaultArgs) =>
        (...args) =>
            callback(
                ...(defaultArgs
                    .slice()
                    .map((v) =>
                        isUndefined(v) ?
                            args.shift() :
                            v,
                    ).concat(args)
                ),
            );

    /**
     * Create a wrapped function that will execute each callback in order,
     * passing the result from each function to the next.
     * @param {...function} callbacks Callback functions to execute.
     * @return {function} The wrapped function.
     */
    const pipe = (...callbacks) =>
        (arg) =>
            callbacks.reduce(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function that executes at most once per wait period.
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=true] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const throttle = (callback, wait = 0, { leading = true, trailing = true } = {}) => {
        let throttleReference;
        let lastRan;
        let newArgs;
        let running;

        const throttled = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
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
            throttleReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    running = false;
                    throttleReference = null;
                },
                delta === null ?
                    wait :
                    wait - delta,
            );
        };

        throttled.cancel = (_) => {
            if (!throttleReference) {
                return;
            }

            clearTimeout(throttleReference);

            running = false;
            throttleReference = null;
        };

        return throttled;
    };

    /**
     * Execute a function a specified number of times.
     * @param {function} callback Callback function to execute.
     * @param {number} amount The amount of times to execute the callback.
     */
    const times = (callback, amount) => {
        while (amount--) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Object methods
     */

    /**
     * Merge the values from one or more objects onto an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @return {object} The output objects.
     */
    const extend = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                for (const k in val) {
                    if (isArray(val[k])) {
                        acc[k] = extend(
                            isArray(acc[k]) ?
                                acc[k] :
                                [],
                            val[k],
                        );
                    } else if (isPlainObject(val[k])) {
                        acc[k] = extend(
                            isPlainObject(acc[k]) ?
                                acc[k] :
                                {},
                            val[k],
                        );
                    } else {
                        acc[k] = val[k];
                    }
                }
                return acc;
            },
            object,
        );

    /**
     * Remove a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    const forgetDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
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
     * @return {*} The value retrieved from the object.
     */
    const getDot = (object, key, defaultValue) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
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
     * @return {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    const hasDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
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
     * @return {array} An array of values retrieved from the objects.
     */
    const pluckDot = (objects, key, defaultValue) =>
        objects
            .map((pointer) =>
                getDot(pointer, key, defaultValue),
            );

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {object} [options] The options for setting the value.
     * @param {Boolean} [options.overwrite=true] Whether to overwrite, if the key already exists.
     */
    const setDot = (object, key, value, { overwrite = true } = {}) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (key === '*') {
                for (const k in object) {
                    if (!{}.hasOwnProperty.call(object, k)) {
                        continue;
                    }

                    setDot(
                        object,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite,
                    );
                }
                return;
            }

            if (keys.length) {
                if (
                    !isObject(object[key]) ||
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

    // HTML escape characters
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
    };

    const unescapeChars = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        apos: '\'',
    };

    /**
     * String methods
     */

    /**
     * Split a string into individual words.
     * @param {string} string The input string.
     * @return {string[]} The split parts of the string.
     */
    const _splitString = (string) =>
        `${string}`
            .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .reduce(
                (acc, word) => {
                    word = word.replace(/[^\w]/, '').toLowerCase();
                    if (word) {
                        acc.push(word);
                    }
                    return acc;
                },
                [],
            );

    /**
     * Convert a string to camelCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const camelCase = (string) =>
        _splitString(string)
            .map(
                (word, index) =>
                    index ?
                        capitalize(word) :
                        word,
            )
            .join('');

    /**
     * Convert the first character of string to upper case and the remaining to lower case.
     * @param {string} string The input string.
     * @return {string} The capitalized string.
     */
    const capitalize = (string) =>
        string.charAt(0).toUpperCase() +
        string.substring(1).toLowerCase();

    /**
     * Convert HTML special characters in a string to their corresponding HTML entities.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escape = (string) =>
        string.replace(
            /[&<>"']/g,
            (match) =>
                escapeChars[match],
        );

    /**
     * Escape RegExp special characters in a string.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escapeRegExp = (string) =>
        string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Convert a string to a humanized form.
     * @param {string} string The input string.
     * @return {string} The humanized string.
     */
    const humanize = (string) =>
        capitalize(
            _splitString(string)
                .join(' '),
        );

    /**
     * Convert a string to kebab-case.
     * @param {string} string The input string.
     * @return {string} The kebab-cased string.
     */
    const kebabCase = (string) =>
        _splitString(string)
            .join('-')
            .toLowerCase();

    /**
     * Convert a string to PascalCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const pascalCase = (string) =>
        _splitString(string)
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1),
            )
            .join('');

    /**
     * Return a random string.
     * @param {number} [length=16] The length of the output string.
     * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
     * @return {string} The random string.
     */
    const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
        new Array(length)
            .fill()
            .map(
                (_) =>
                    chars[random(chars.length) | 0],
            )
            .join('');

    /**
     * Convert a string to snake_case.
     * @param {string} string The input string.
     * @return {string} The snake_cased string.
     */
    const snakeCase = (string) =>
        _splitString(string)
            .join('_')
            .toLowerCase();

    /**
     * Convert HTML entities in a string to their corresponding characters.
     * @param {string} string The input string.
     * @return {string} The unescaped string.
     */
    const unescape = (string) =>
        string.replace(
            /&(amp|lt|gt|quot|apos);/g,
            (_, code) =>
                unescapeChars[code],
        );

    exports.animation = animation;
    exports.camelCase = camelCase;
    exports.capitalize = capitalize;
    exports.clamp = clamp;
    exports.clampPercent = clampPercent;
    exports.compose = compose;
    exports.curry = curry;
    exports.debounce = debounce;
    exports.diff = diff;
    exports.dist = dist;
    exports.escape = escape;
    exports.escapeRegExp = escapeRegExp;
    exports.evaluate = evaluate;
    exports.extend = extend;
    exports.forgetDot = forgetDot;
    exports.getDot = getDot;
    exports.hasDot = hasDot;
    exports.humanize = humanize;
    exports.intersect = intersect;
    exports.inverseLerp = inverseLerp;
    exports.isArray = isArray;
    exports.isArrayLike = isArrayLike;
    exports.isBoolean = isBoolean;
    exports.isDocument = isDocument;
    exports.isElement = isElement;
    exports.isFragment = isFragment;
    exports.isFunction = isFunction;
    exports.isNaN = isNaN;
    exports.isNode = isNode;
    exports.isNull = isNull;
    exports.isNumeric = isNumeric;
    exports.isObject = isObject;
    exports.isPlainObject = isPlainObject;
    exports.isShadow = isShadow;
    exports.isString = isString;
    exports.isText = isText;
    exports.isUndefined = isUndefined;
    exports.isWindow = isWindow;
    exports.kebabCase = kebabCase;
    exports.len = len;
    exports.lerp = lerp;
    exports.map = map;
    exports.merge = merge;
    exports.once = once;
    exports.partial = partial;
    exports.pascalCase = pascalCase;
    exports.pipe = pipe;
    exports.pluckDot = pluckDot;
    exports.random = random;
    exports.randomInt = randomInt;
    exports.randomString = randomString;
    exports.randomValue = randomValue;
    exports.range = range;
    exports.setDot = setDot;
    exports.snakeCase = snakeCase;
    exports.throttle = throttle;
    exports.times = times;
    exports.toStep = toStep;
    exports.unescape = unescape;
    exports.unique = unique;
    exports.wrap = wrap;

}));
//# sourceMappingURL=frost-core.js.map
