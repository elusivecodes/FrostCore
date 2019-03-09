Object.assign(Core, {

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {Boolean} [leading]
     * @returns {Promise}
     */
    animationFactory(callback, leading) {
        let newArgs,
            running;

        return (...args) => new Promise((resolve, reject) => {
            newArgs = args;

            if (running) {
                return reject();
            }

            running = true;
            window.requestAnimationFrame(_ => {
                running = false;
                if (!leading) {
                    resolve(
                        callback(...newArgs)
                    );
                }
            });

            if (leading) {
                resolve(
                    callback(...newArgs)
                );
            }
        });
    },

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {number} wait
     * @param {Boolean} [leading]
     * @returns {Promise}
     */
    debounceFactory(callback, wait, leading) {
        let newArgs,
            running;

        return (...args) => new Promise((resolve, reject) => {
            newArgs = args;

            if (running) {
                return reject();
            }

            running = true;
            setTimeout(
                _ => {
                    running = false;
                    if (!leading) {
                        resolve(
                            callback(...newArgs)
                        );
                    }
                },
                wait
            );

            if (leading) {
                resolve(
                    callback(...newArgs)
                );
            }
        });
    },

    /**
     * Create a wrapped version of a function that executes on the next cycle of the event queue.
     * @param {function} callback
     * @param {...*} [defaultArgs]
     * @returns {Promise}
     */
    deferFactory(callback, ...defaultArgs) {
        return this.delayFactory(callback, 0, ...defaultArgs);
    },

    /**
     * Create a wrapped version of a function that executes after a wait period.
     * @param {function} callback
     * @param {number} wait
     * @param {...*} [defaultArgs]
     * @returns {Promise}
     */
    delayFactory(callback, wait, ...defaultArgs) {
        return (...args) => new Promise(resolve =>
            setTimeout(
                _ => resolve(
                    callback(...(
                        defaultArgs.concat(args)
                    ))
                ),
                wait
            )
        );
    },

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * @param {function} callback
     * @returns {function}
     */
    onceFactory(callback) {
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
    partialFactory(callback, ...defaultArgs) {
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
     * @returns {Promise}
     */
    throttleFactory(callback, wait, leading = true, trailing = true) {
        let ran,
            running;

        return (...args) => new Promise((resolve, reject) => {
            if (running) {
                return reject();
            }

            if (leading && !ran) {
                ran = true;
                return resolve(
                    callback(...args)
                );
            }

            running = true;
            setTimeout(
                _ => {
                    running = false;
                    if (trailing) {
                        resolve(
                            callback(...args)
                        );
                    } else {
                        reject();
                    }
                },
                wait
            );
        });
    }

});
