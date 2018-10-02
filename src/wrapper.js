(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

    const frost = {};

// {{code}}

    frost.core = new Core;
    frost.Core = Core;
    frost.QuerySet = QuerySet;
    frost.QuerySetImmutable = QuerySetImmutable;

    return {
        frost,
        Core,
        core: frost.core,
        $: frost.core.query
    };

});