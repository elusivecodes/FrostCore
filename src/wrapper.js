(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

// {{code}}

    const core = new Core;
    Core.QuerySet = QuerySet;
    Core.QuerySetImmutable = QuerySetImmutable;

    return {
        Core,
        core,
        $: core.query
    };

});