Object.assign(Core.prototype, {

    // returns an array containing nodes parsed from a HTML string
    parseHTML(string)
    {
        const container = this.create('template');
        this.html(container, string);
        return this.contents(container);
    },

    // returns an array of nodes from a HTML string, query selector string, node, node list, element list or array
    parseQuery(query, elementsOnly = true, allowDocument = false, allowWindow = false)
    {
        if (query && ! Core.isString(query)) {
            return Core.nodeArray(query, elementsOnly, allowDocument, allowWindow);
        }

        if (query && query.match(Core.htmlRegex)) {
            return this.parseHTML(query);
        }

        return this.find(this.context, query || '*');
    },

    // returns a DOM object from an XML string
    parseXML(string)
    {
        const parser = new DOMParser();
        return parser.parseFromString(string, 'application/xml');
    }

});