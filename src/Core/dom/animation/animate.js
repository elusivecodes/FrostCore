Object.assign(Core.prototype, {

    // add an animation to each element
    animate(nodes, callback, options) {
        options = {
            duration: 1000,
            type: 'ease-in-out',
            ...options
        };

        // get current timestamp for progress calculation
        const start = Date.now();

        // initialize promises array
        const promises = [];

        // loop through nodes
        this.nodeArray(nodes)
            .forEach(node => {

                // if this is the first animation for the node,
                // initialize an animation array
                if (!this.animations.has(node)) {
                    this.animations.set(node, []);
                }

                // create promise for the animation
                const promise = new Promise((resolve, reject) => {

                    // create function for the animation
                    const animation = (stop = false, finish = false) => {

                        // if the node is no longer in the document,
                        // or the animation was stopped and not finished
                        // reject the promise and return false
                        if (!this.contains(this.context, node) || (stop && !finish)) {
                            reject(node);
                            return true;
                        }

                        // calculate the progress
                        let progress;
                        if (finish) {
                            progress = 1;
                        } else {
                            progress = (Date.now() - start) / options.duration;

                            if (options.infinite) {
                                progress %= 1;
                            } else {
                                progress = Core.clamp(progress);
                            }

                            if (options.type === 'ease-in') {
                                progress = Math.pow(progress, 2);
                            } else if (options.type === 'ease-out') {
                                progress = Math.sqrt(progress);
                            } else if (options.type === 'ease-in-out') {
                                if (progress <= 0.5) {
                                    progress = Math.pow(progress, 2) * 2;
                                } else {
                                    progress = 1 - ((1 - progress) ** 2 * 2);
                                }
                            }
                        }

                        // run the animation callback
                        callback(node, progress);

                        // if the animation is complete,
                        // resolve the promise and return false
                        if (progress === 1) {
                            resolve(node);
                            return true;
                        }
                    };

                    // push the animation to the animations array
                    this.animations.get(node)
                        .push(animation);
                });

                // push the promise to the promises array
                promises.push(promise);
            });

        // if we have animations, and are not already animating
        // start the animation
        if (promises.length && !this.animating) {
            this.animating = true;
            this._animationFrame();
        }

        // return all promises
        return Promise.all(promises);
    },

    // stop all animations for each element
    stop(nodes, finish = true) {
        // loop through nodes
        this.nodeArray(nodes)
            .forEach(node => {

                // if no animations exist for the node, return
                if (!this.animations.has(node)) {
                    return;
                }

                // loop through the animations and run the callback
                this.animations.get(node)
                    .forEach(animation =>
                        animation(true, finish)
                    );

                // remove node from animations
                this.animations.delete(node);
            });
    },

    // run a single frame of all animations, and then queue up the next frame
    _animationFrame() {
        // initialize complete nodes array
        const completeNodes = [];

        // loop through animations
        this.animations.forEach((animations, node) => {

            // initialize complete animations array
            const completeAnimations = [];

            // loop through node animations
            animations.forEach((animation, index) => {
                // if the animation is complete,
                // push index to complete animations
                if (animation()) {
                    completeAnimations.push(index);
                }
            });

            // if we have no complete animations, return
            if (!completeAnimations.length) {
                return;
            }

            // filter complete animations from the node animations array
            animations = animations.filter((animation, index) =>
                !completeAnimations.includes(index)
            );

            // if we have no remaining animations, push the node to complete nodes
            if (!animations.length) {
                completeNodes.push(node);
            }
        });

        // loop through complete nodes and delete from animations
        completeNodes.forEach(node =>
            this.animations.delete(node)
        );

        // if we have remaining animations, queue up the next frame,
        // otherwise, set animating to false
        if (this.animations.size) {
            window.requestAnimationFrame(() =>
                this._animationFrame()
            );
        }
        else {
            this.animating = false;
        }
    }

});