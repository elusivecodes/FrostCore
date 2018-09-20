(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

    const frost = {};

// {{code}}

    frost.Core = Core;
    frost.QuerySet = QuerySet;
    frost.QuerySetImmutable = QuerySetImmutable;

    const core = new Core;

    return {
        frost,
        Core,
        core,
        $: core.query
    };

});