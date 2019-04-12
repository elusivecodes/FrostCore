/**
 * Parsing methods
 */

/**
 * Create a Document object from a HTML string.
 * @param {string} html The HTML input string.
 * @returns {Document} A new document from the parsed HTML string.
 */
Core.parseHTML = html => new DOMParser()
    .parseFromString(html, 'text/html');

/**
 * Create a Document object from an XML string.
 * @param {string} xml The XML input string.
 * @returns {Document} A new document from the parsed XML string.
 */
Core.parseXML = xml => new DOMParser()
    .parseFromString(xml, 'application/xml');
