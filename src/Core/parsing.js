Object.assign(Core.prototype, {

    /**
     * Create a Document object from a HTML string.
     * @param {string} html
     * @returns {Document}
     */
    parseHTML(html) {
        const parser = new DOMParser;
        return parser.parseFromString(html, 'application/html');
    },

    /**
     * Create a Document object from an XML string.
     * @param {string} xml
     * @returns {Document}
     */
    parseXML(xml) {
        const parser = new DOMParser;
        return parser.parseFromString(xml, 'application/xml');
    }

});
