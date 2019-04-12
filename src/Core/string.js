/**
 * String methods
 */

/**
 * Convert a string to camelCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
Core.camelCase = string => `${string}`
    .replace(
        /\-([a-z])/g,
        match =>
            match.substring(1).toUpperCase()
    );

/**
 * Convert a string to snake-case.
 * @param {string} string The input string.
 * @returns {string} The snake-cased string.
 */
Core.snakeCase = string => `${string}`
    .replace(
        /([A-Z])/g,
        match =>
            `-${match.toLowerCase()}`
    );
