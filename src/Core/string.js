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
                    Core.capitalize(word) :
                    word
        )
        .join('');

/**
 * Convert the first character of string to upper case and the remaining to lower case.
 * @param {string} string The input string.
 * @returns {string} The capitalized string.
 */
Core.capitalize = string =>
    string.charAt(0).toUpperCase() +
    string.substring(1).toLowerCase();

/**
 * Convert HTML special characters in a string to their corresponding HTML entities.
 * @param {string} string The input string.
 * @returns {string} The escaped string.
 */
Core.escape = string =>
    string.replace(
        Core._escapeRegExp,
        match =>
            Core._escapeChars[match]
    );

/**
 * Escape RegExp special characters in a string.
 * @param {string} string The input string.
 * @returns {string} The escaped string.
 */
Core.escapeRegExp = string =>
    string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Convert a string to a humanized form.
 * @param {string} string The input string.
 * @returns {string} The humanized string.
 */
Core.humanize = string =>
    Core.capitalize(
        Core._splitString(string)
            .join(' ')
    );

/**
 * Convert a string to kebab-case.
 * @param {string} string The input string.
 * @returns {string} The kebab-cased string.
 */
Core.kebabCase = string =>
    Core._splitString(string)
        .join('-')
        .toLowerCase();

/**
 * Convert a string to PascalCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
Core.pascalCase = string =>
    Core._splitString(string)
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.substring(1)
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
        .map(
            _ =>
                chars[Core.random(chars.length) | 0]
        )
        .join('');

/**
 * Convert a string to snake_case.
 * @param {string} string The input string.
 * @returns {string} The snake_cased string.
 */
Core.snakeCase = string =>
    Core._splitString(string)
        .join('_')
        .toLowerCase();

/**
 * Convert HTML entities in a string to their corresponding characters.
 * @param {string} string The input string.
 * @returns {string} The unescaped string.
 */
Core.unescape = string =>
    string.replace(
        Core._unescapeRegExp,
        (_, code) =>
            Core._unescapeChars[code]
    );
