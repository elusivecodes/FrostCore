Object.assign(Core, {

    /**
     * Convert a string to camelCase.
     * @param {string} string
     * @returns {string}
     */
    camelCase(string) {
        return `${string}`
            .replace(
                /(\-[a-z])/g,
                match =>
                    match.toUpperCase()
            )
            .replace('-', '');
    },

    /**
     * Convert a string to snake-case.
     * @param {string} string
     * @returns {string}
     */
    snakeCase(string) {
        return `${string}`
            .replace(
                /([A-Z])/g,
                match =>
                    `-${match.toLowerCase()}`
            );
    }

});
