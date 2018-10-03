Object.assign(Core.prototype, {

    // slide each element in from the top over a duration
    dropIn(nodes, duration = 1000)
    {
        return this.slideIn(nodes, 'top', duration);
    },

    // slide each element out to the top over a duration
    dropOut(nodes, duration = 1000)
    {
        return this.slideOut(nodes, 'top', duration);
    },

    // fade the opacity of each element in over a duration
    fadeIn(nodes, duration = 1000)
    {
        return this.animate(nodes, (node, progress) =>
            this.setStyle(node, 'opacity', progress < 1 ? progress : '')
        , duration);
    },

    // fade the opacity of each element out over a duration
    fadeOut(nodes, duration = 1000)
    {
        return this.animate(nodes, (node, progress) =>
            this.setStyle(node, 'opacity', progress < 1 ? 1 - progress : '')
        , duration);
    },

    // rotate each element in on an x,y over a duration
    rotateIn(nodes, x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.animate(nodes, (node, progress) => {
            if (progress === 1) {
                return this.setStyle(node, 'transform', '');
            }

            let amount = 90 - (progress * 90);

            if (inverse) {
                amount *= -1;
            }

            this.setStyle(node, 'transform', 'rotate3d(' + x + ', ' + y + ', 0, ' + amount + 'deg)');
        }, duration);
    },

    // rotate each element out on an x,y over a duration
    rotateOut(nodes, x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.animate(nodes, (node, progress) => {

            if (progress === 1) {
                return this.setStyle(node, 'transform', '');
            }

            let amount = progress * 90;

            if (inverse) {
                amount *= -1;
            }

            this.setStyle(node, 'transform', 'rotate3d(' + x + ', ' + y + ', 0, ' + amount + 'deg)');
        }, duration);
    },

    // slide each element into place from a direction over a duration
    slideIn(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(nodes, (node, progress) => {

            if (progress === 1) {
                return this.setStyle(node, 'transform', '');
            }

            const dir = Core.isFunction(direction) ?
                direction() : direction;

            if (dir === 'top' || dir === 'bottom') {
                const height = this.height(node);
                let amount = Math.round(height - (height * progress));
                if (dir === 'top') {
                    amount *= -1;
                }
                this.setStyle(node, 'transform', 'translateY(' + amount + 'px)');
            } else {
                const width = this.width(node);
                let amount = Math.round(width - (width * progress));
                if (dir === 'left') {
                    amount *= -1;
                }
                this.setStyle(node, 'transform', 'translateX(' + amount + 'px)');
            }

        }, duration);
    },

    // slide each element out of place to a direction over a duration
    slideOut(nodes, direction = 'bottom', duration = 1000)
    {
        return this.animate(nodes, (node, progress) => {

            if (progress === 1) {
                return this.setStyle(node, 'transform', '');
            }

            const dir = Core.isFunction(direction) ?
                direction() : direction;

            if (dir === 'top' || dir === 'bottom') {
                const height = this.height(node);
                let amount = Math.round(height * progress);
                if (dir === 'top') {
                    amount *= -1;
                }
                this.setStyle(node, 'transform', 'translateY(' + amount + 'px)');
            } else {
                const width = this.width(node);
                let amount = Math.round(width * progress);
                if (dir === 'left') {
                    amount *= -1;
                }
                this.setStyle(node, 'transform', 'translateX(' + amount + 'px)');
            }

        }, duration);
    },

    // squeeze each element into place from a direction over a duration
    squeezeIn(nodes, direction = 'bottom', duration = 1000)
    {
        const wrapper = this.create('div');
        this.setStyle(wrapper, 'overflow', 'hidden');
        this.setStyle(wrapper, 'position', 'relative');

        const animations = [];

        Core.nodeArray(nodes)
            .forEach(node => {
                this.wrap(node, wrapper);
                const parent = this.parent(node);

                animations.push(this.animate(node, (node, progress) => {
                    if (progress === 1) {
                        this.before(parent, this.contents(parent));
                        this.remove(parent);
                        return;
                    }

                    const dir = Core.isFunction(direction) ?
                        direction() : direction;

                    if (dir === 'top' || dir === 'bottom') {
                        const height = Math.round(this.height(node, true));
                        const width = Math.round(this.width(node, true, true, true));
                        this.setStyle(parent, 'width', width);

                        const amount = Math.round(height * progress);
                        this.setStyle(parent, 'height', amount);
                        if (dir === 'top') {
                            this.setStyle(parent, 'transform', 'translateY(' + (height - amount) + 'px)');
                        }
                    } else {
                        const height = Math.round(this.height(node, true, true, true));
                        const width = Math.round(this.width(node, true));
                        this.setStyle(parent, 'height', height);

                        const amount = Math.round(width * progress);
                        this.setStyle(parent, 'width', amount);
                        if (dir === 'left') {
                            this.setStyle(parent, 'transform', 'translateX(' + (width - amount) + 'px)');
                        }
                    }
                }, duration));
            });

        return Promise.all(animations);
    },

    // squeeze each element out of place to a direction over a duration
    squeezeOut(nodes, direction = 'bottom', duration = 1000)
    {
        const wrapper = this.create('div');
        this.setStyle(wrapper, 'overflow', 'hidden');
        this.setStyle(wrapper, 'position', 'relative');

        const animations = [];

        Core.nodeArray(nodes)
            .forEach(node => {
                this.wrap(node, wrapper);
                const parent = this.parent(node);

                animations.push(this.animate(node, (node, progress) => {
                    if (progress === 1) {
                        this.before(parent, this.contents(parent));
                        this.remove(parent);
                        return;
                    }

                    const dir = Core.isFunction(direction) ?
                        direction() : direction;

                    if (dir === 'top' || dir === 'bottom') {
                        const height = Math.round(this.height(node, true));
                        const width = Math.round(this.width(node, true, true, true));
                        this.setStyle(parent, 'width', width);

                        const amount = Math.round(height - (height * progress));
                        this.setStyle(parent, 'height', amount);
                        if (dir === 'top') {
                            this.setStyle(parent, 'transform', 'translateY(' + (height - amount) + 'px)');
                        }
                    } else {
                        const height = Math.round(this.height(node, true, true, true));
                        const width = Math.round(this.width(node, true));
                        this.setStyle(parent, 'height', height);

                        const amount = Math.round(width - (width * progress));
                        this.setStyle(parent, 'width', amount);
                        if (dir === 'left') {
                            this.setStyle(parent, 'transform', 'translateX(' + (width - amount) + 'px)');
                        }
                    }
                }, duration));
            });

        return Promise.all(animations);
    }

});