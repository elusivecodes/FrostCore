Object.assign(QuerySet.prototype, {

    // slide each element in from the top over a duration
    dropIn(options) {
        return this.queue(node => this.core.dropIn(node, options));
    },

    // slide each element out to the top over a duration
    dropOut(options) {
        return this.queue(node => this.core.dropOut(node, options));
    },

    // fade the opacity of each element in over a duration
    fadeIn(options) {
        return this.queue(node => this.core.fadeIn(node, options));
    },

    // fade the opacity of each element out over a duration
    fadeOut(options) {
        return this.queue(node => this.core.fadeOut(node, options));
    },

    // rotate each element in on an x,y over a duration
    rotateIn(options) {
        return this.queue(node => this.core.rotateIn(node, options));
    },

    // rotate each element out on an x,y over a duration
    rotateOut(options) {
        return this.queue(node => this.core.rotateOut(node, options));
    },

    // slide each element into place from a direction over a duration
    slideIn(options) {
        return this.queue(node => this.core.slideIn(node, options));
    },

    // slide each element out of place to a direction over a duration
    slideOut(options) {
        return this.queue(node => this.core.slideOut(node, options));
    },

    // squeeze each element into place from a direction over a duration
    squeezeIn(options) {
        return this.queue(node => this.core.squeezeIn(node, options));
    },

    // squeeze each element out of place to a direction over a duration
    squeezeOut(options) {
        return this.queue(node => this.core.squeezeOut(node, options));
    }

});