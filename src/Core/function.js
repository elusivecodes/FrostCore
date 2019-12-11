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
    window.requestAnimationFrame :
    callback => setTimeout(callback, 1000 / 60);
