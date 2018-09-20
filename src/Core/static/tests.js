Object.assign(Core, {

    // returns true if the value if a Document
    isDocument(value)
    {
        return value instanceof Document;
    },

    // returns true if the value is a HTML Element
    isElement(value)
    {
        return value instanceof HTMLElement;
    },

    // returns true if the value is a HTML Collection
    isElementList(value)
    {
        return value instanceof HTMLCollection;
    },

    // returns true if the value is a Node
    isNode(value)
    {
        return value instanceof Node;
    },

    // returns true if the value is a Node List
    isNodeList(value)
    {
        return value instanceof NodeList;
    },

    // returns true if the value is a Query List
    isQuerySet(value)
    {
        return value instanceof QuerySet;
    },

    // returns true if any of the selectors is "complex"
    isSelectorComplex(selectors)
    {
        return !! this.parseSelectors(selectors)
            .find(selector => ['>', '+', '~'].includes(selector[0]));
    }

});