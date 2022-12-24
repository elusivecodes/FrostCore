import { random } from './math.js';

// HTML escape characters
const escapeChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
};

const unescapeChars = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: '\'',
};

/**
 * String methods
 */

/**
 * Split a string into individual words.
 * @param {string} string The input string.
 * @return {string[]} The split parts of the string.
 */
const _splitString = (string) =>
    `${string}`
        .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
        .reduce(
            (acc, word) => {
                word = word.replace(/[^\w]/, '').toLowerCase();
                if (word) {
                    acc.push(word);
                }
                return acc;
            },
            [],
        );

/**
 * Convert a string to camelCase.
 * @param {string} string The input string.
 * @return {string} The camelCased string.
 */
export const camelCase = (string) =>
    _splitString(string)
        .map(
            (word, index) =>
                index ?
                    capitalize(word) :
                    word,
        )
        .join('');

/**
 * Convert the first character of string to upper case and the remaining to lower case.
 * @param {string} string The input string.
 * @return {string} The capitalized string.
 */
export const capitalize = (string) =>
    string.charAt(0).toUpperCase() +
    string.substring(1).toLowerCase();

/**
 * Convert HTML special characters in a string to their corresponding HTML entities.
 * @param {string} string The input string.
 * @return {string} The escaped string.
 */
export const escape = (string) =>
    string.replace(
        /[&<>"']/g,
        (match) =>
            escapeChars[match],
    );

/**
 * Escape RegExp special characters in a string.
 * @param {string} string The input string.
 * @return {string} The escaped string.
 */
export const escapeRegExp = (string) =>
    string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Convert a string to a humanized form.
 * @param {string} string The input string.
 * @return {string} The humanized string.
 */
export const humanize = (string) =>
    capitalize(
        _splitString(string)
            .join(' '),
    );

/**
 * Convert a string to kebab-case.
 * @param {string} string The input string.
 * @return {string} The kebab-cased string.
 */
export const kebabCase = (string) =>
    _splitString(string)
        .join('-')
        .toLowerCase();

/**
 * Convert a string to PascalCase.
 * @param {string} string The input string.
 * @return {string} The camelCased string.
 */
export const pascalCase = (string) =>
    _splitString(string)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.substring(1),
        )
        .join('');

/**
 * Return a random string.
 * @param {number} [length=16] The length of the output string.
 * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
 * @return {string} The random string.
 */
export const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
    new Array(length)
        .fill()
        .map(
            (_) =>
                chars[random(chars.length) | 0],
        )
        .join('');

/**
 * Convert a string to snake_case.
 * @param {string} string The input string.
 * @return {string} The snake_cased string.
 */
export const snakeCase = (string) =>
    _splitString(string)
        .join('_')
        .toLowerCase();

/**
 * Convert HTML entities in a string to their corresponding characters.
 * @param {string} string The input string.
 * @return {string} The unescaped string.
 */
export const unescape = (string) =>
    string.replace(
        /&(amp|lt|gt|quot|apos);/g,
        (_, code) =>
            unescapeChars[code],
    );
