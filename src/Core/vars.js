// matches id, class or tag only selectors
Core.fastRegex = /^\s*([\#\.]?)([\w\-]+)\s*$/;

// matches a selector beginning with > + or ~
Core.specialRegex = /^\s*([\>\+\~])(.*)$/;

// splits the first node of a special selector
Core.subRegex = /^\s*((?:[\w\#\.\:\-]|(?:\[(?:[^\[\]]*|\[[^\[\]]*\])*\]))*)\s*(.*)$/

// splits comma seperator selectors into each selector
Core.splitRegex = /\s*((?:[\w\#\.\:\-]|\[(?:[^\[\]]*|\[[^\[\]]*\])*\]|[\s\>\~\+])+)\s*\,?/;

// matches html query strings
Core.htmlRegex = /^\s*\</;

// css properties that have number-only values
Core.cssNumberProperties = ['font-weight', 'line-height', 'opacity', 'orphans', 'widows', 'z-index'];

// default ajax settings
Core.ajaxDefaults = {
    beforeSend: false,
    cache: false,
    contentType: 'application/x-www-form-urlencoded', //'application/x-www-form-urlencoded',
    data: false,
    dataType: false,
    method: 'GET',
    processData: true,
    url: false
};