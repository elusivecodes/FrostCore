/**
 * Execute a callback on the next animation frame
 * @param {function} callback Callback function to execute.
 */
Core._requestAnimationFrame = 'requestAnimationFrame' in window ?
    (...args) => window.requestAnimationFrame(...args) :
    callback => setTimeout(callback, 1000 / 60);

/**
 * Split a string into individual words.
 * @param {string} string The input string.
 * @returns {string[]} The split parts of the string.
 */
Core._splitString = string =>
    `${string}`
        .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
        .reduce(
            (acc, word) => {
                word = word.replace(/[^\w]/, '').toLowerCase();
                if (word) {
                    acc.push(word)
                }
                return acc;
            },
            []
        );
