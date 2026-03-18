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
     * Checks whether a value is an array.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is an array.
     */
    const isArray = Array.isArray;

    /**
     * Checks whether a value is array-like.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is array-like.
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
     * Checks whether a value is a boolean.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a boolean.
     */
    const isBoolean = (value) =>
        value === !!value;

    /**
     * Checks whether a value is a Document.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a Document.
     */
    const isDocument = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_NODE;

    /**
     * Checks whether a value is an Element.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is an Element.
     */
    const isElement = (value) =>
        !!value &&
        value.nodeType === ELEMENT_NODE;

    /**
     * Checks whether a value is a DocumentFragment (and not a ShadowRoot).
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a DocumentFragment.
     */
    const isFragment = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Checks whether a value is a function.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a function.
     */
    const isFunction = (value) =>
        typeof value === 'function';

    /**
     * Checks whether a value is NaN.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is NaN.
     */
    const isNaN = Number.isNaN;

    /**
     * Checks whether a value is an Element, Text node, or Comment node.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is an Element, Text node, or Comment node.
     */
    const isNode = (value) =>
        !!value &&
        (
            value.nodeType === ELEMENT_NODE ||
            value.nodeType === TEXT_NODE ||
            value.nodeType === COMMENT_NODE
        );

    /**
     * Checks whether a value is null.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is null.
     */
    const isNull = (value) =>
        value === null;

    /**
     * Checks whether a value is numeric.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is numeric.
     */
    const isNumeric = (value) =>
        (() => {
            try {
                return (
                    !isNaN(parseFloat(value)) &&
                    isFinite(value)
                );
            } catch {
                return false;
            }
        })();

    /**
     * Checks whether a value is an object-like reference, including arrays and functions.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is an object-like reference.
     */
    const isObject = (value) =>
        !!value &&
        value === Object(value);

    /**
     * Checks whether a value is a plain object.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a plain object.
     */
    const isPlainObject = (value) =>
        !!value &&
        value.constructor === Object;

    /**
     * Checks whether a value is a ShadowRoot.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a ShadowRoot.
     */
    const isShadow = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Checks whether a value is a string.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a string.
     */
    const isString = (value) =>
        typeof value === 'string';

    /**
     * Checks whether a value is a text Node.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a text Node.
     */
    const isText = (value) =>
        !!value &&
        value.nodeType === TEXT_NODE;

    /**
     * Checks whether a value is undefined.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is undefined.
     */
    const isUndefined = (value) =>
        value === undefined;

    /**
     * Checks whether a value is a Window.
     * @param {*} value The value to test.
     * @returns {boolean} Whether the value is a Window.
     */
    const isWindow = (value) =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    /**
     * Math methods
     */

    /**
     * Clamps a value between a minimum and a maximum.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @returns {number} The clamped value.
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
     * Clamps a value between 0 and 100.
     * @param {number} value The value to clamp.
     * @returns {number} The clamped value.
     */
    const clampPercent = (value) =>
        clamp(value, 0, 100);

    /**
     * Calculates the distance between two vectors.
     * @param {number} x1 The first vector X co-ordinate.
     * @param {number} y1 The first vector Y co-ordinate.
     * @param {number} x2 The second vector X co-ordinate.
     * @param {number} y2 The second vector Y co-ordinate.
     * @returns {number} The distance between the vectors.
     */
    const dist = (x1, y1, x2, y2) =>
        len(
            x1 - x2,
            y1 - y2,
        );

    /**
     * Calculates the inverse linear interpolation amount from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} value The value to inverse interpolate.
     * @returns {number} The interpolated amount.
     */
    const inverseLerp = (v1, v2, value) =>
        (value - v1) / (v2 - v1);

    /**
     * Calculates the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    const len = Math.hypot;

    /**
     * Calculates a linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @returns {number} The interpolated value.
     */
    const lerp = (v1, v2, amount) =>
        v1 *
        (1 - amount) +
        v2 *
        amount;

    /**
     * Maps a value from one range to another.
     * @param {number} value The value to map.
     * @param {number} fromMin The minimum value of the current range.
     * @param {number} fromMax The maximum value of the current range.
     * @param {number} toMin The minimum value of the target range.
     * @param {number} toMax The maximum value of the target range.
     * @returns {number} The mapped value.
     */
    const map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin) *
        (toMax - toMin) /
        (fromMax - fromMin) +
        toMin;

    /**
     * Returns a random floating-point number.
     * @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @returns {number} A random number.
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
     * Returns a random integer.
     * @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @returns {number} A random integer.
     */
    const randomInt = (a = 1, b = null) =>
        Math.floor(
            random(
                Math.min(
                    a,
                    isNull(b) ? 0 : b,
                ),
                Math.max(
                    a,
                    isNull(b) ? 0 : b,
                ),
            ),
        );

    /**
     * Constrains a number to a specified step size.
     * @param {number} value The value to constrain.
     * @param {number} step The step size.
     * @returns {number} The constrained value.
     */
    const toStep = (value, step = 0.01) => {
        if (step === 0) {
            return value;
        }

        step = Math.abs(step);

        return parseFloat(
            (
                Math.round(value / step) *
                step
            ).toFixed(
                `${step}`.replace(/\d*\.?/, '').length,
            ),
        );
    };

    /**
     * Array methods
     */

    /**
     * Creates a new array containing values from the first array that do not exist in any of the additional arrays.
     * @template T
     * @param {T[]} array The input array.
     * @param {...T[]} arrays The arrays to compare against.
     * @returns {T[]} The filtered array.
     */
    const diff = (array, ...arrays) => {
        arrays = arrays.map(unique);
        return array.filter(
            (value) => !arrays
                .some((other) => other.includes(value)),
        );
    };

    /**
     * Creates a new array containing the unique values that exist in all of the provided arrays.
     * @template T
     * @param {...T[]} arrays The input arrays.
     * @returns {T[]} The intersected array.
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
     * Merges values from one or more arrays or array-like objects into an array.
     * @template T
     * @param {T[]} [array=[]] The array to merge into.
     * @param {...ArrayLike<T>} arrays The arrays or array-like objects to merge.
     * @returns {T[]} The merged array.
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
     * Selects a random value from an array.
     * @template T
     * @param {T[]} array The input array.
     * @returns {T|null} A random value from the array, or null if the array is empty.
     */
    const randomValue = (array) =>
        array.length ?
            array[randomInt(array.length)] :
            null;

    /**
     * Creates an array containing a range of values.
     * @param {number} start The first value of the sequence.
     * @param {number} end The target value for the sequence. It is included only when the step lands on it exactly.
     * @param {number} [step=1] The increment between values in the sequence. Negative values are treated as positive, and `0` returns an empty array.
     * @returns {number[]} The array of values from start toward end.
     */
    const range = (start, end, step = 1) => {
        if (step === 0) {
            return [];
        }

        const sign = Math.sign(end - start);
        step = Math.abs(step);
        return new Array(
            Math.floor(
                (
                    Math.abs(end - start) /
                    step
                ) +
                1,
            ),
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
     * Removes duplicate elements from an array.
     * @template T
     * @param {T[]} array The input array.
     * @returns {T[]} The de-duplicated array.
     */
    const unique = (array) =>
        Array.from(
            new Set(array),
        );

    /**
     * Creates an array from a value.
     * @template T
     * @param {T|T[]|ArrayLike<T>|undefined} value The input value.
     * @returns {T[]} The wrapped array.
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

    /**
     * A wrapped callback that exposes a `cancel()` method.
     * @template {(...args: any[]) => any} T
     * @typedef {((...args: Parameters<T>) => void) & { cancel: () => void }} CancelableWrapper
     */

    const isBrowser = typeof window !== 'undefined' && 'requestAnimationFrame' in window;

    /**
     * Schedules a callback on the next animation frame.
     * @param {Function} callback The callback to execute.
     * @returns {number} The request ID.
     */
    const _requestAnimationFrame = isBrowser ?
        (...args) => window.requestAnimationFrame(...args) :
        (callback) => setTimeout(callback, 1000 / 60);

    /**
     * Creates a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @param {object} [options] Options for executing the function.
     * @param {boolean} [options.leading=false] Whether to execute on the leading edge of the animation frame.
     * @returns {CancelableWrapper<T>} The wrapped function.
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
     * Creates a wrapped function that executes each callback in reverse order,
     * passing the result from each function to the previous.
     * @param {...((value: any) => any)} callbacks Callback functions to execute.
     * @returns {(arg: any) => any} The wrapped function.
     */
    const compose = (...callbacks) =>
        (arg) =>
            callbacks.reduceRight(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Creates a wrapped version of a function that returns new functions
     * until the number of total arguments passed reaches the arguments length
     * of the original function (at which point the function will execute).
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @returns {Function} The wrapped function.
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
     * Creates a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] Options for executing the function.
     * @param {boolean} [options.leading=false] Whether to execute on the leading edge of the wait period.
     * @param {boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @returns {CancelableWrapper<T>} The wrapped function.
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
                if (debounceReference) {
                    clearTimeout(debounceReference);
                    debounceReference = null;
                }

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
     * Evaluates a value from a function or a value.
     * @template T
     * @param {T|(() => T)} value The value to evaluate.
     * @returns {T} The evaluated value.
     */
    const evaluate = (value) =>
        isFunction(value) ?
            value() :
            value;

    /**
     * Creates a wrapped version of a function that only ever executes once.
     * Subsequent calls to the wrapped function will return the result of the first successful call.
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @returns {(...args: Parameters<T>) => ReturnType<T>} The wrapped function.
     */
    const once = (callback) => {
        let ran;
        let result;

        return (...args) => {
            if (ran) {
                return result;
            }

            result = callback(...args);
            ran = true;
            return result;
        };
    };

    /**
     * Creates a wrapped version of a function with predefined arguments.
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @returns {(...args: any[]) => ReturnType<T>} The wrapped function.
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
     * Creates a wrapped function that executes each callback in order,
     * passing the result from each function to the next.
     * @param {...((value: any) => any)} callbacks Callback functions to execute.
     * @returns {(arg: any) => any} The wrapped function.
     */
    const pipe = (...callbacks) =>
        (arg) =>
            callbacks.reduce(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Creates a wrapped version of a function that executes at most once per wait period.
     * (using the most recent arguments passed to it).
     * @template {(...args: any[]) => any} T
     * @param {T} callback The function to wrap.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] Options for executing the function.
     * @param {boolean} [options.leading=true] Whether to execute on the leading edge of the wait period.
     * @param {boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @returns {CancelableWrapper<T>} The wrapped function.
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
     * Executes a function a specified number of times.
     * @param {() => (boolean|void)} callback The callback function to execute.
     * @param {number} amount The number of times to execute the callback.
     * @returns {void} Nothing.
     */
    const times = (callback, amount) => {
        while (amount-- > 0) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Object methods
     */

    /**
     * Merges values from one or more objects into an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @returns {object} The extended object.
     */
    const extend = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                if (val == null) {
                    return acc;
                }

                for (const k in val) {
                    if (!{}.hasOwnProperty.call(val, k)) {
                        continue;
                    }

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
     * Flattens an object using dot notation.
     * @param {object} object The input object.
     * @param {string} [prefix] The key prefix.
     * @returns {object} The flattened object.
     */
    const flatten = (object, prefix = '') =>
        Object.keys(object).reduce((acc, key) => {
            const prefixedKey = `${prefix}${key}`;
            if (isPlainObject(object[key])) {
                Object.assign(acc, flatten(object[key], `${prefixedKey}.`));
            } else {
                acc[prefixedKey] = object[key];
            }

            return acc;
        }, {});

    /**
     * Removes a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     * @returns {void} Nothing.
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
     * Retrieves the value of a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to retrieve from the object.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {*} The value retrieved from the object.
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
     * Checks whether a specified key exists in an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to test for in the object.
     * @returns {boolean} Whether the key exists.
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
     * Retrieves values of a specified key from an array of objects using dot notation.
     * @param {object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @returns {Array<*>} An array of values retrieved from the objects.
     */
    const pluckDot = (objects, key, defaultValue) =>
        objects
            .map((pointer) =>
                getDot(pointer, key, defaultValue),
            );

    /**
     * Sets a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {{overwrite?: boolean}} [options] Options for setting the value.
     * @param {boolean} [options.overwrite=true] Whether to overwrite the value if the key already exists.
     * @returns {void} Nothing.
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
                        { overwrite },
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
     * Splits a string into individual words.
     * @param {string} string The input string.
     * @returns {string[]} The split parts of the string.
     */
    const _splitString = (string) =>
        `${string}`
            .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .reduce(
                (acc, word) => {
                    word = word.replace(/[^\w]/g, '').toLowerCase();
                    if (word) {
                        acc.push(word);
                    }
                    return acc;
                },
                [],
            );

    /**
     * Converts a string to camelCase.
     * @param {string} string The input string.
     * @returns {string} The camelCased string.
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
     * Converts the first character of a string to upper case and the remaining to lower case.
     * @param {string} string The input string.
     * @returns {string} The capitalized string.
     */
    const capitalize = (string) =>
        string.charAt(0).toUpperCase() +
        string.substring(1).toLowerCase();

    /**
     * Escapes HTML special characters in a string using HTML entities.
     * @param {string} string The input string.
     * @returns {string} The escaped string.
     */
    const escape = (string) =>
        string.replace(
            /[&<>"']/g,
            (match) =>
                escapeChars[match],
        );

    /**
     * Escapes RegExp special characters in a string.
     * @param {string} string The input string.
     * @returns {string} The escaped string.
     */
    const escapeRegExp = (string) =>
        string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Converts a string to a humanized form.
     * @param {string} string The input string.
     * @returns {string} The humanized string.
     */
    const humanize = (string) =>
        capitalize(
            _splitString(string)
                .join(' '),
        );

    /**
     * Converts a string to kebab-case.
     * @param {string} string The input string.
     * @returns {string} The kebab-cased string.
     */
    const kebabCase = (string) =>
        _splitString(string)
            .join('-')
            .toLowerCase();

    /**
     * Converts a string to PascalCase.
     * @param {string} string The input string.
     * @returns {string} The PascalCased string.
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
     * Creates a random string.
     * @param {number} [length=16] The length of the output string.
     * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789] The characters to generate the string from.
     * @returns {string} The random string.
     */
    const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') =>
        new Array(length)
            .fill()
            .map(
                (_) =>
                    chars[randomInt(chars.length)],
            )
            .join('');

    /**
     * Converts a string to snake_case.
     * @param {string} string The input string.
     * @returns {string} The snake_cased string.
     */
    const snakeCase = (string) =>
        _splitString(string)
            .join('_')
            .toLowerCase();

    /**
     * Unescapes HTML entities in a string into their corresponding characters.
     * @param {string} string The input string.
     * @returns {string} The unescaped string.
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
    exports.flatten = flatten;
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
