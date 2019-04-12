/**
 * Math methods
 */

/**
 * Clamp a value between a min and max.
 * @param {number} value The value to clamp.
 * @param {number} [min=0] The minimum value of the clamped range.
 * @param {number} [max=1] The maximum value of the clamped range.
 * @returns {number} The clamped value.
 */
Core.clamp = (value, min = 0, max = 1) =>
    Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

/**
 * Clamp a value between 0 and 100.
 * @param {number} value The value to clamp.
 * @returns {number} The clamped value.
 */
Core.clampPercent = value => Core.clamp(value, 0, 100);

/**
 * Get the distance between two vectors.
 * @param {number} x1 The first vector X co-ordinate.
 * @param {number} y1 The first vector Y co-ordinate.
 * @param {number} x2 The second vector X co-ordinate.
 * @param {number} y2 The second vector Y co-ordinate.
 * @returns {number} The distance between the vectors.
 */
Core.dist = (x1, y1, x2, y2) =>
    Core.len(
        x1 - x2,
        y1 - y2
    );

/**
 * Get the length of an X,Y vector.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @returns {number} The length of the vector.
 */
Core.len = (x, y) => Math.hypot(x, y);

/**
 * Linear interpolation from one value to another.
 * @param {number} v1 The starting value.
 * @param {number} v2 The ending value.
 * @param {number} amount The amount to interpolate.
 * @returns {number} The interpolated value.
 */
Core.lerp = (v1, v2, amount) =>
    v1
    * (1 - amount)
    + v2
    * amount;

/**
 * Map a value from one range to another.
 * @param {number} value
 * @param {number} fromMin
 * @param {number} fromMax
 * @param {number} toMin
 * @param {number} toMax
 * @returns {number} The mapped value.
 */
Core.map = (value, fromMin, fromMax, toMin, toMax) =>
    (value - fromMin)
    * (toMax - toMin)
    / (fromMax - fromMin)
    + toMin;

/**
 * Constrain a number to a specified step-size.
 * @param {number} value The value to constrain.
 * @param {number} step The minimum step-size.
 * @returns {number} The constrained value.
 */
Core.toStep = (value, step = 0.01) =>
    Math.round(value / step)
    * step;

/**
 * Get the linear percent of a value in a specified range.
 * @param {number} value The value to process.
 * @param {number} min The minimum of the range.
 * @param {number} max The maximum of the range.
 * @returns {number} The linear percent.
 */
Core.linearPercent = (value, min, max) =>
    min === max ?
        0 :
        Core.clampPercent(
            100
            * (value - min)
            / (max - min)
        );

/**
 * Get the linear value of a percent in a specified range.
 * @param {number} percent The percent to process.
 * @param {number} min The minimum of the range.
 * @param {number} max The maximum of the range.
 * @returns {number} The linear value.
 */
Core.linearValue = (percent, min, max) =>
    Core.clamp(
        min
        + (
            percent
            / 100
            * (max - min)
        ),
        min,
        max
    );

/**
 * Get the logarithmic percent of a value in a specified range.
 * @param {number} value The value to process.
 * @param {number} min The minimum of the range.
 * @param {number} max The maximum of the range.
 * @returns {number} The logarithmic percent.
 */
Core.logPercent = (value, min, max) => {
    if (min === max) {
        return 0;
    }

    min = min ?
        Math.log(min) :
        0;

    return Core.clampPercent(
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
};

/**
 * Get the logarithmic value of a percent in a specified range.
 * @param {number} percent The percent to process.
 * @param {number} min The minimum of the range.
 * @param {number} max The maximum of the range.
 * @returns {number} The logarithmic value;
 */
Core.logValue = (percent, min, max) => {
    min = min ?
        Math.log(min) :
        0;

    return Core.clamp(
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
};
