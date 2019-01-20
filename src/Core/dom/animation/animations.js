Object.assign(Core.prototype, {

    // slide each element in from the top over a duration
    dropIn(nodes, duration = 1000)
    {
        return this.slideIn(
            nodes,
            'top',
            duration
        );
    },

    // slide each element out to the top over a duration
    dropOut(nodes, duration = 1000)
    {
        return this.slideOut(
            nodes,
            'top',
            duration
        );
    },

    // fade the opacity of each element in over a duration
    fadeIn(nodes, duration = 1000)
    {
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
            duration
        );
    },

    // fade the opacity of each element out over a duration
    fadeOut(nodes, duration = 1000)
    {
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
            duration
        );
    },

    // rotate each element in on an x,y over a duration
    rotateIn(nodes, x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${x}, ${y}, 0, ${(90 - (progress * 90)) * (inverse ? -1 : 1)}deg)` :
                        ''
                ),
            duration
        );
    },

    // rotate each element out on an x,y over a duration
    rotateOut(nodes, x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
                this.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${x}, ${y}, 0, ${(progress * 90) * (inverse ? -1 : 1)}deg)` :
                        ''
                ),
            duration
        );
    },

    // slide each element into place from a direction over a duration
    slideIn(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
            {
                let axis, size, inverse;

                if (progress < 1) {
                    const dir = Core.isFunction(direction) ?
                        direction() :
                        direction;

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
            duration
        );
    },

    // slide each element out of place to a direction over a duration
    slideOut(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
            {
                let axis, size, inverse;

                if (progress < 1) {
                    const dir = Core.isFunction(direction) ?
                        direction() :
                        direction;

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
            duration
        );
    },

    // squeeze each element into place from a direction over a duration
    squeezeIn(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
            {
                this.setStyle(
                    node,
                    {
                        overflow: '',
                        height: '',
                        width: '',
                        marginTop: '',
                        marginLeft: ''
                    }
                );

                if (progress === 1) {
                    return;
                }

                const dir = Core.isFunction(direction) ?
                    direction() :
                    direction;

                let sizeStyle, marginStyle;
                if (dir === 'top' || dir === 'bottom') {
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        marginStyle = 'marginTop';
                    }
                }
                else if (dir === 'left' || dir === 'right') {
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        marginStyle = 'marginLeft';
                    }
                }

                const size = Math.round(this[sizeStyle](node, true));
                const amount = Math.round(size * progress);

                const styles = {
                    overflow: 'hidden',
                    [sizeStyle]: amount
                };

                if (marginStyle) {
                    styles[marginStyle] = size - amount;
                }

                this.setStyle(node, styles);
            },
            duration
        );
    },

    // squeeze each element out of place to a direction over a duration
    squeezeOut(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(
            nodes,
            (node, progress) =>
            {
                this.setStyle(
                    node,
                    {
                        overflow: '',
                        height: '',
                        width: '',
                        marginTop: '',
                        marginLeft: ''
                    }
                );

                if (progress === 1) {
                    return;
                }

                const dir = Core.isFunction(direction) ?
                    direction() :
                    direction;

                let sizeStyle, marginStyle;
                if (dir === 'top' || dir === 'bottom') {
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        marginStyle = 'marginTop';
                    }
                }
                else if (dir === 'left' || dir === 'right') {
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        marginStyle = 'marginLeft';
                    }
                }

                const size = Math.round(this[sizeStyle](node, true));
                const amount = Math.round(size - (size * progress));

                const styles = {
                    overflow: 'hidden',
                    [sizeStyle]: amount
                };
                if (marginStyle) {
                    styles[marginStyle] = size - amount;
                }

                this.setStyle(node, styles);
            },
            duration
        );
    }

});