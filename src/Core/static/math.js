Object.assign(Core, {

    // clamp a value between a min and max
    clamp(value, min = 0, max = 1)
    {
        return Math.max(min, Math.min(max, value));
    },

    // clamp a value between 0 and 100
    clampPercent(value)
    {
        return this.clamp(value, 0, 100);
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
    lerp(min, max, amount)
    {
        return min * (1 - amount) + max * amount;
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
    },

    // get the linear percent of a value in a specified range
    linearPercent(value, min, max)
    {
        if (min === max) {
            return 0;
        }

        return this.clampPercent(100 * (value - min) / (max - min));
    },

    // get the linear value of a percent in a specified range
    linearValue(percent, min, max)
    {
        return this.clamp(
            min + (percent / 100 * (max - min)),
            min,
            max
        );
    },

    // get the logarithmic percent of a value in a specified range
    logPercent(value, min, max)
    {
        if (min === max) {
            return 0;
        }

        min = min ?
            Math.log(min) :
            0;

        return this.clampPercent(
            100 * ((value ? Math.log(value) : 0) - min) / (Math.log(max) - min)
        );
    },

    // get the logarithmic value of a percent in a specified range
    logValue(percent, min, max)
    {
        min = min ?
            Math.log(min) :
            0;

        return this.clamp(
            Math.exp(min + (Math.log(max) - min) * percent / 100),
            min,
            max
        );
    }

});