Object.assign(Core.prototype, {

    // returns a DOM object from an HTML string
    parseHTML(html)
    {
        const parser = new DOMParser;
        return parser.parseFromString(html, 'application/html');
    },

    // returns a DOM object from an XML string
    parseXML(xml)
    {
        const parser = new DOMParser;
        return parser.parseFromString(xml, 'application/xml');
    }

});