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
Core.clampPercent = value =>
    Core.clamp(value, 0, 100);

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
 * Inverse linear interpolation from one value to another.
 * @param {number} v1 The starting value.
 * @param {number} v2 The ending value.
 * @param {number} value The value to inverse interpolate.
 * @returns {number} The interpolated amount.
 */
Core.inverseLerp = (v1, v2, value) =>
    (value - v1) / (v2 - v1);

/**
 * Get the length of an X,Y vector.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @returns {number} The length of the vector.
 */
Core.len = Math.hypot;

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
 * @param {number} value The value to map.
 * @param {number} fromMin The minimum value of the current range.
 * @param {number} fromMax The maximum value of the current range.
 * @param {number} toMin The minimum value of the target range.
 * @param {number} toMax The maximum value of the target range.
 * @returns {number} The mapped value.
 */
Core.map = (value, fromMin, fromMax, toMin, toMax) =>
    (value - fromMin)
    * (toMax - toMin)
    / (fromMax - fromMin)
    + toMin;

/**
 * Return a random floating-point number.
 * @param {number} [a=1] The minimum value (inclusive).
 * @param {number} [b] The maximum value (exclusive).
 * @returns {number} A random number.
 */
Core.random = (a = 1, b = null) =>
    Core.isNull(b) ?
        Math.random() * a :
        Core.map(
            Math.random(),
            0,
            1,
            a,
            b
        );

/**
 * Return a random number.
 * @param {number} [a=1] The minimum value (inclusive).
 * @param {number} [b] The maximum value (exclusive).
 * @returns {number} A random number.
 */
Core.randomInt = (a = 1, b = null) =>
    Core.random(a, b) | 0;

/**
 * Constrain a number to a specified step-size.
 * @param {number} value The value to constrain.
 * @param {number} step The minimum step-size.
 * @returns {number} The constrained value.
 */
Core.toStep = (value, step = 0.01) =>
    parseFloat(
        (
            Math.round(value / step)
            * step
        ).toFixed(
            `${step}`.replace('\d*\.?/', '').length
        )
    );
