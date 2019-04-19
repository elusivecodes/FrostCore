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
 * Execute a callback on the next cycle of the event queue.
 * @param {function} callback Callback function to execute.
 * @param {...*} [defaultArgs] Default arguments to pass to the function.
 * @returns {function} The wrapped function.
 */
Core.defer = (callback, ...defaultArgs) => Core.delay(callback, 0, ...defaultArgs);

/**
 * Execute a callback after a wait period.
 * @param {function} callback Callback function to execute.
 * @param {number} wait The number of milliseconds to wait until execution.
 * @param {...*} [defaultArgs] Default arguments to pass to the function.
 * @returns {function} The wrapped function.
 */
Core.delay = (callback, wait, ...defaultArgs) =>
    setTimeout(
        _ => callback(...defaultArgs),
        wait
    );

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
