Object.assign(Core.prototype, {

    // returns an array containing nodes parsed from a HTML string
    parseHTML(html) {
        const fragment = this.context.createRange().createContextualFragment(html);
        return Array.from(fragment.children);
    },

    // returns an array of nodes from a HTML string, query selector string, node, node list, element list or array
    _parseQuery(query, elementsOnly = true, allowDocument = false, allowWindow = false) {
        if (query && Core.isString(query) && query.match(Core.htmlRegex)) {
            return this.parseHTML(query);
        }

        return this.nodeArray(query || '*', elementsOnly, allowDocument, allowWindow);
    }

});