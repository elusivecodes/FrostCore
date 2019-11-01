/**
 * Core Properties
 */

// Node type constants
Core.ELEMENT_NODE = 1;
Core.TEXT_NOTE = 3;
Core.COMMENT_NODE = 8;
Core.DOCUMENT_NODE = 9;
Core.DOCUMENT_FRAGMENT_NODE = 11;

// HTML escape regex
Core._escapeRegExp = /[&<>"']/g;
Core._unescapeRegExp = /\&(amp|lt|gt|quos|apos);/g;

// HTML escape characters
Core._escapeChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;'
};

Core._unescapeChars = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'apos': '\''
};
