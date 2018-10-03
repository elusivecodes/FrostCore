Object.assign(Core, {

    // convert a string to Camel Case
    camelCase(string)
    {
        return '' + string.replace(/(\-[a-z])/g, match => match.toUpperCase())
            .replace('-', '');
    },

    // convert a string to Snake Case
    snakeCase(string)
    {
        return '' + string.replace(/([A-Z])/g, match => '-' + match.toLowerCase());
    }

});