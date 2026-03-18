import { isFunction, isUndefined } from './testing.js';

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
export const animation = (callback, { leading = false } = {}) => {
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
export const compose = (...callbacks) =>
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
export const curry = (callback) => {
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
export const debounce = (callback, wait = 0, { leading = false, trailing = true } = {}) => {
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
export const evaluate = (value) =>
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
export const once = (callback) => {
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
export const partial = (callback, ...defaultArgs) =>
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
export const pipe = (...callbacks) =>
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
export const throttle = (callback, wait = 0, { leading = true, trailing = true } = {}) => {
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
export const times = (callback, amount) => {
    while (amount-- > 0) {
        if (callback() === false) {
            break;
        }
    }
};
