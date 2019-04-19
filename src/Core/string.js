/**
 * String methods
 */

/**
 * Convert a string to camelCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
Core.camelCase = string =>
    `${string}`
        .replace(
            /\-([a-z])/g,
            match =>
                match.substring(1).toUpperCase()
        );

/**
 * Return a random string.
 * @param {number} [length=16] The length of the output string.
 * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
 * @returns {string} The random string.
 */
Core.randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
    new Array(length)
        .fill()
        .map(_ => chars[Core.random(chars.length) | 0])
        .join('');

/**
 * Return an escaped string for use in RegEx.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string.
 */
Core.regExEscape = string =>
    string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$$&');

/**
 * Convert a string to snake-case.
 * @param {string} string The input string.
 * @returns {string} The snake-cased string.
 */
Core.snakeCase = string =>
    `${string}`
        .replace(
            /([A-Z])/g,
            match =>
                `-${match.toLowerCase()}`
        );
