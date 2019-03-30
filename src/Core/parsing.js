Object.assign(Core, {

    /**
     * Create a Document object from a HTML string.
     * @param {string} html
     * @returns {Document}
     */
    parseHTML(html) {
        return new DOMParser()
            .parseFromString(html, 'text/html');
    },

    /**
     * Create a Document object from an XML string.
     * @param {string} xml
     * @returns {Document}
     */
    parseXML(xml) {
        return new DOMParser()
            .parseFromString(xml, 'application/xml');
    }

});
