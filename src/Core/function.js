Object.assign(Core, {

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {Boolean} [leading]
     * @returns {function}
     */
    animation(callback, leading) {
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
    },

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {number} wait
     * @param {Boolean} [leading]
     * @returns {function}
     */
    debounce(callback, wait, leading) {
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
    },

    /**
     * Create a wrapped version of a function that executes on the next cycle of the event queue.
     * @param {function} callback
     * @param {...*} [defaultArgs]
     * @returns {function}
     */
    defer(callback, ...defaultArgs) {
        return this.delay(callback, 0, ...defaultArgs);
    },

    /**
     * Create a wrapped version of a function that executes after a wait period.
     * @param {function} callback
     * @param {number} wait
     * @param {...*} [defaultArgs]
     * @returns {function}
     */
    delay(callback, wait, ...defaultArgs) {
        return (...args) => {
            setTimeout(
                _ => callback(...(
                    defaultArgs.concat(args)
                )),
                wait
            );
        };
    },

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * @param {function} callback
     * @returns {function}
     */
    once(callback) {
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
    partial(callback, ...defaultArgs) {
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
     * @returns {function}
     */
    throttle(callback, wait, leading = true, trailing = true) {
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
    }

});
