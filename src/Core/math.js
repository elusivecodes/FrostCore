Object.assign(Core, {

    /**
     * Clamp a value between a min and max.
     * @param {number} value 
     * @param {number} [min=0]
     * @param {number} [max=1]
     * @returns {number}
     */
    clamp(value, min = 0, max = 1) {
        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );
    },

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value 
     * @returns {number}
     */
    clampPercent(value) {
        return this.clamp(
            value,
            0,
            100
        );
    },

    /**
     * Get the distance between two vectors.
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {number}
     */
    dist(x1, y1, x2, y2) {
        return this.len(
            x1 - x2,
            y1 - y2
        );
    },

    /**
     * Get the length of an X,Y vector.
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    len(x, y) {
        return Math.hypot(x, y);
    },

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1
     * @param {number} v2
     * @param {number} amount
     * @returns {number}
     */
    lerp(v1, v2, amount) {
        return v1
            * (1 - amount)
            + v2
            * amount;
    },

    /**
     * Map a value from one range to another.
     * @param {number} value
     * @param {number} fromMin
     * @param {number} fromMax
     * @param {number} toMin
     * @param {number} toMax
     * @returns {number}
     */
    map(value, fromMin, fromMax, toMin, toMax) {
        return (value - fromMin)
            * (toMax - toMin)
            / (fromMax - fromMin)
            + toMin;
    },

    /**
     * Round a number to a specified step-size.
     * @param {number} value
     * @param {number} step
     * @returns {number}
     */
    toStep(value, step = 0.01) {
        return Math.round(value / step)
            * step;
    },

    /**
     * Get the linear percent of a value in a specified range.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    linearPercent(value, min, max) {
        if (min === max) {
            return 0;
        }

        return this.clampPercent(
            100
            * (value - min)
            / (max - min)
        );
    },

    /**
     * Get the linear value of a percent in a specified range.
     * @param {number} percent
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    linearValue(percent, min, max) {
        return this.clamp(
            min
            + (
                percent
                / 100
                * (max - min)
            ),
            min,
            max
        );
    },

    /**
     * Get the logarithmic percent of a value in a specified range.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    logPercent(value, min, max) {
        if (min === max) {
            return 0;
        }

        min = min ?
            Math.log(min) :
            0;

        return this.clampPercent(
            100
            * (
                (value ?
                    Math.log(value) :
                    0
                )
                - min
            )
            / (
                Math.log(max)
                - min
            )
        );
    },

    /**
     * Get the logarithmic value of a percent in a specified range.
     * @param {number} percent
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    logValue(percent, min, max) {
        min = min ?
            Math.log(min) :
            0;

        return this.clamp(
            Math.exp(
                min
                + (
                    Math.log(max)
                    - min
                )
                * percent
                / 100
            ),
            min,
            max
        );
    }

});
