import { isFunction, isUndefined } from './testing.js';

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
 * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
 * @return {function} The wrapped function.
 */
export const animation = (callback, leading) => {
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
export const compose = (...callbacks) =>
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
 * Create a wrapped version of a function that executes once per wait period
 * (using the most recent arguments passed to it).
 * @param {function} callback Callback function to execute.
 * @param {number} [wait=0] The number of milliseconds to wait until next execution.
 * @param {Boolean} [leading=false] Whether to execute on the leading edge of the wait period.
 * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
 * @return {function} The wrapped function.
 */
export const debounce = (callback, wait = 0, leading = false, trailing = true) => {
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
export const evaluate = (value) =>
    isFunction(value) ?
        value() :
        value;

/**
 * Create a wrapped version of a function that will only ever execute once.
 * Subsequent calls to the wrapped function will return the result of the initial call.
 * @param {function} callback Callback function to execute.
 * @return {function} The wrapped function.
 */
export const once = (callback) => {
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
 * Create a wrapped function that will execute each callback in order,
 * passing the result from each function to the next.
 * @param {...function} callbacks Callback functions to execute.
 * @return {function} The wrapped function.
 */
export const pipe = (...callbacks) =>
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
 * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
 * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
 * @return {function} The wrapped function.
 */
export const throttle = (callback, wait = 0, leading = true, trailing = true) => {
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
export const times = (callback, amount) => {
    while (amount--) {
        if (callback() === false) {
            break;
        }
    }
};
