(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {

// {{code}}

    return {
        Core,
        core: new Core,
        QuerySet,
        QuerySetImmutable
    };

});