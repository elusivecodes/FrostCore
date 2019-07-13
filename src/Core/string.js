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
 * Convert HTML special characters in a string to their corresponding HTML entities.
 * @param {string} string The input string.
 * @returns {string} The escaped string.
 */
Core.escape = string =>
    new Option(string).innerHTML;

/**
 * Escape RegExp special characters in a string.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string.
 */
Core.escapeRegExp = string =>
    string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$$&');

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
 * Convert HTML entities in a string to their corresponding characters.
 * @param {string} string The input string.
 * @returns {string} The unescaped string.
 */
Core.unescape = string =>
    new DOMParser()
        .parseFromString(string, 'text/html')
        .documentElement
        .textContent;

/**
 * Split a string into individual words.
 * @param {string} string The input string.
 * @returns {string[]} The split parts of the string.
 */
Core._splitString = string =>
    `${string}`.split(/[^a-zA-Z0-9']|(?=[A-Z])/)
        .map(word => word.replace(/[^\w]/, '').toLowerCase())
        .filter(word => word);
