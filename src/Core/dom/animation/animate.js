Object.assign(Core.prototype, {

    // add an animation to each element
    animate(nodes, callback, duration = 1000)
    {
        const start = Date.now();
        const promises = [];

        Core.nodeArray(nodes)
            .forEach(node => {
                if ( ! this.animations.has(node)) {
                    this.animations.set(node, []);
                }

                const promise = new Promise((resolve, reject) => {
                    const animation = (stop = false, finish = false) => {
                        if ( ! core.contains(this.context, node) || (stop && ! finish)) {
                            reject(node);
                            return false;
                        }

                        const progress = finish ? 1 : Core.clamp((Date.now() - start) / duration);
                        callback(node, progress);

                        if (progress === 1) {
                            resolve(node);
                            return false;
                        }

                        return true;
                    };

                    this.animations.get(node).push(animation);
                });

                promises.push(promise);
            });

        if (promises.length && ! this.animating) {
            this.animating = true;
            this.animationFrame();
        }

        return Promise.all(promises);
    },

    // run a single frame of all animations, and then queue up the next frame
    animationFrame()
    {
        const completeNodes = [];

        this.animations.forEach((animations, node) => {
            const completeAnimations = [];

            animations.forEach((animation, index) => {
                if ( ! animation()) {
                    completeAnimations.push(index);
                }
            });

            if ( ! completeAnimations.length) {
                return;
            }

            animations = animations.filter((animation, index) => ! completeAnimations.includes(index));

            if ( ! animations.length) {
                completeNodes.push(node);
            }
        });

        completeNodes.forEach(node => this.animations.delete(node));

        if (this.animations.size) {
            window.requestAnimationFrame(() => this.animationFrame());
        } else {
            this.animating = false;
        }
    },

    // stop all animations for each element
    stop(nodes, finish = true)
    {
        Core.nodeArray(nodes)
            .forEach(node => {
                if ( ! this.animations.has(node)) {
                    return;
                }

                const animations = this.animations.get(node);
                animations.forEach(animation => animation(true, finish));
                this.animations.delete(node);
            });
    }

});