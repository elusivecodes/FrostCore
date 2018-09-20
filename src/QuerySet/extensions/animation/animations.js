Object.assign(QuerySet.prototype, {

    // slide each element in from the top over a duration
    dropIn(duration = 1000)
    {
        return this.queue(node => core.dropIn(node, duration));
    },

    // slide each element out to the top over a duration
    dropOut(duration = 1000)
    {
        return this.queue(node => core.dropOut(node, duration));
    },

    // fade the opacity of each element in over a duration
    fadeIn(duration = 1000)
    {
        return this.queue(node => core.fadeIn(node, duration));
    },

    // fade the opacity of each element out over a duration
    fadeOut(duration = 1000)
    {
        return this.queue(node => core.fadeOut(node, duration));
    },

    // rotate each element in on an x,y over a duration
    rotateIn(x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.queue(node => core.rotateIn(node, x, y, inverse, duration));
    },

    // rotate each element out on an x,y over a duration
    rotateOut(x = 0, y = 1, inverse = false, duration = 1000)
    {
        return this.queue(node => core.rotateOut(node, x, y, inverse, duration));
    },

    // slide each element into place from a direction over a duration
    slideIn(direction = 'bottom', duration = 1000)
    {
        return this.queue(node => core.slideIn(node, direction, duration));
    },

    // slide each element out of place to a direction over a duration
    slideOut(direction = 'bottom', duration = 1000)
    {
        return this.queue(node => core.slideOut(node, direction, duration));
    },

    // squeeze each element into place from a direction over a duration
    squeezeIn(direction = 'bottom', duration = 1000)
    {
        return this.queue(node => core.squeezeIn(node, direction, duration));
    },

    // squeeze each element out of place to a direction over a duration
    squeezeOut(direction = 'bottom', duration = 1000)
    {
        return this.queue(node => core.squeezeOut(node, direction, duration));
    }

});