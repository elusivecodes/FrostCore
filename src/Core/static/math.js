Object.assign(Core, {

    // clamp a value between a min and max
    clamp(val, min = 0, max = 1)
    {
        return Math.max(min, Math.min(max, val));
    },

    // clamp a value between 0 and 100
    clampPercent(val)
    {
        return this.clamp(val, 0, 100);
    },

    // get the distance between two vectors
    dist(x1, y1, x2, y2)
    {
        return this.len(x1 - x2, y1 - y2);
    },

    // get the length of an X,Y vector
    len(x, y)
    {
        return Math.hypot(x, y);
    },

    // linear interpolation from one value to another
    lerp(a, b, amount)
    {
        return a * (1 - amount) + b * amount;
    },

    // get the linear percent of a value in a specified range
    linearPercent(a, b, value)
    {
        if (a === b) {
            return 0;
        }

        return this.clampPercent(100 * (value - a) / (b - a));
    },

    // get the linear value of a percent in a specified range
    linearValue(a, b, percent)
    {
        return this.clamp(
            a + (percent / 100 * (b - a)),
            a,
            b
        );
    },

    // get the logarithmic percent of a value in a specified range
    logPercent(a, b, value)
    {
        if (a === b) {
            return 0;
        }

        const min = a ?
            Math.log(a) :
            0;

        return this.clampPercent(
            100 * ((value ? Math.log(value) : 0) - min) / (Math.log(b) - min)
        );
    },

    // get the logarithmic value of a percent in a specified range
    logValue(a, b, percent)
    {
        const min = a ?
            Math.log(a) :
            0;

        return this.clamp(
            Math.exp(min + (Math.log(b) - min) * percent / 100),
            a,
            b
        );
    },

    // map a value from one range to another
    map(value, fromMin, fromMax, toMin, toMax)
    {
        return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    },

    // round a number to a specified precision
    toStep(value, step)
    {
        return Math.round(value / step) * step;
    }

});