Object.assign(Core.prototype, {

    // slide each element in from the top over a duration
    dropIn(nodes, options) {
        return this.slideIn(
            nodes,
            {
                dir: 'top',
                ...options
            }
        );
    },

    // slide each element out to the top over a duration
    dropOut(nodes, options) {
        return this.slideOut(
            nodes,
            {
                dir: 'top',
                ...options
            }
        );
    },

    // fade the opacity of each element in over a duration
    fadeIn(nodes, options) {
        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'opacity',
                    progress < 1 ?
                        progress :
                        ''
                ),
            options
        );
    },

    // fade the opacity of each element out over a duration
    fadeOut(nodes, options) {
        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'opacity',
                    progress < 1 ?
                        1 - progress :
                        ''
                ),
            options
        );
    },

    // rotate each element in on an x,y over a duration
    rotateIn(nodes, options) {
        options = {
            x: 0,
            y: 1,
            ...options
        };

        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, 0, ${(90 - (progress * 90)) * (options.inverse ? -1 : 1)}deg)` :
                        ''
                ),
            options
        );
    },

    // rotate each element out on an x,y over a duration
    rotateOut(nodes, options) {
        options = {
            x: 0,
            y: 1,
            ...options
        };

        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, 0, ${(progress * 90) * (options.inverse ? -1 : 1)}deg)` :
                        ''
                ),
            options
        );
    },

    // slide each element into place from a direction over a duration
    slideIn(nodes, options) {
        options = {
            dir: 'bottom',
            ...options
        };

        return this.animate(
            nodes,
            (node, progress) => {
                let axis, size, inverse;

                if (progress < 1) {
                    const dir = Core.isFunction(options.dir) ?
                        options.dir() :
                        options.dir;

                    if (dir === 'top' || dir === 'bottom') {
                        axis = 'Y';
                        size = this.height(node);
                        inverse = dir === 'top';
                    }
                    else {
                        axis = 'X';
                        size = this.width(node);
                        inverse = dir === 'left';
                    }
                }

                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `translate${axis}(${
                        Math.round(
                            size
                            - (size * progress)
                        )
                        * (inverse ?
                            -1 :
                            1
                        )
                        }px)` :
                        ''
                );
            },
            options
        );
    },

    // slide each element out of place to a direction over a duration
    slideOut(nodes, options) {
        options = {
            dir: 'bottom',
            ...options
        };

        return this.animate(
            nodes,
            (node, progress) => {
                let axis, size, inverse;

                if (progress < 1) {
                    const dir = Core.isFunction(options.dir) ?
                        options.dir() :
                        options.dir;

                    if (dir === 'top' || dir === 'bottom') {
                        axis = 'Y';
                        size = this.height(node);
                        inverse = dir === 'top';
                    }
                    else {
                        axis = 'X';
                        size = this.width(node);
                        inverse = dir === 'left';
                    }
                }

                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `translate${axis}(${
                        Math.round(
                            size * progress
                        )
                        * (inverse ?
                            -1 :
                            1
                        )
                        }px)` :
                        ''
                );
            },
            options
        );
    },

    // squeeze each element into place from a direction over a duration
    squeezeIn(nodes, options) {
        options = {
            dir: 'bottom',
            ...options
        };

        const wrapper = this.create('div', {
            style: {
                overflow: 'hidden',
                position: 'relative'
            }
        });

        const animations = [];

        this.nodeArray(nodes)
            .forEach(node => {
                this.wrap(node, wrapper);
                const parent = this.parent(node);

                animations.push(
                    this.animate(
                        node,
                        (node, progress) => {
                            if (progress === 1) {
                                this.before(parent, this.contents(parent));
                                this.remove(parent);
                                return;
                            }

                            const dir = Core.isFunction(options.dir) ?
                                options.dir() :
                                options.dir;

                            let sizeStyle, translateStyle;
                            if (dir === 'top' || dir === 'bottom') {
                                sizeStyle = 'height';
                                if (dir === 'top') {
                                    translateStyle = 'Y';
                                }
                            } else if (dir === 'left' || dir === 'right') {
                                sizeStyle = 'width';
                                if (dir === 'left') {
                                    translateStyle = 'X';
                                }
                            }

                            const size = Math.round(this[sizeStyle](node, true));
                            const amount = Math.round(size * progress);

                            const styles = {
                                [sizeStyle]: amount
                            };
                            if (translateStyle) {
                                styles.transform = `translate${translateStyle}(${size - amount}px)`;
                            }
                            core.setStyle(parent, styles);
                        },
                        duration,
                        'ease-in-out'
                    )
                );
            });

        return Promise.all(animations);
    },

    // squeeze each element out of place to a direction over a duration
    squeezeOut(nodes, options) {
        options = {
            dir: 'bottom',
            ...options
        };

        const wrapper = this.create('div', {
            style: {
                overflow: 'hidden',
                position: 'relative'
            }
        });

        const animations = [];

        this.nodeArray(nodes)
            .forEach(node => {
                this.wrap(node, wrapper);
                const parent = this.parent(node);

                animations.push(
                    this.animate(
                        node,
                        (node, progress) => {
                            if (progress === 1) {
                                this.before(parent, this.contents(parent));
                                this.remove(parent);
                                return;
                            }

                            const dir = Core.isFunction(options.dir) ?
                                options.dir() :
                                options.dir;

                            let sizeStyle, translateStyle;
                            if (dir === 'top' || dir === 'bottom') {
                                sizeStyle = 'height';
                                if (dir === 'top') {
                                    translateStyle = 'Y';
                                }
                            }
                            else if (dir === 'left' || dir === 'right') {
                                sizeStyle = 'width';
                                if (dir === 'left') {
                                    translateStyle = 'X';
                                }
                            }

                            const size = Math.round(this[sizeStyle](node, true));
                            const amount = Math.round(size - (size * progress));

                            const styles = {
                                [sizeStyle]: amount
                            };
                            if (translateStyle) {
                                styles.transform = `translate${translateStyle}(${size - amount}px)`;
                            }
                            core.setStyle(parent, styles);
                        },
                        options
                    )
                );
            });

        return Promise.all(animations);
    }

});