/**
 * String methods
 */

/**
 * Convert a string to camelCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
Core.camelCase = string =>
    Core._splitString(string)
        .map(
            (word, index) =>
                index ?
                    word.charAt(0).toUpperCase() + word.substring(1) :
                    word
        )
        .join('');

/**
 * Convert a string to PascalCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
Core.pascalCase = string =>
    Core._splitString(string)
        .map(
            word =>
                word.charAt(0).toUpperCase() + word.substring(1)
        )
        .join('');

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
    Core._splitString(string).join('-');

/**
 * Convert a string to underscored.
 * @param {string} string The input string.
 * @returns {string} The underscored string.
 */
Core.underscore = string =>
    Core._splitString(string).join('_');

/**
 * Split a string into individual words.
 * @param {string} string The input string.
 * @returns {string[]} The split parts of the string.
 */
Core._splitString = string =>
    `${string}`.split(/[^a-zA-Z0-9']|(?=[A-Z])/)
        .map(word => word.replace(/[^\w]/, '').toLowerCase())
        .filter(word => word);
