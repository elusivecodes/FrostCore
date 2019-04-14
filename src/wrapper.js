/**
 * FrostCore v1.0.2
 * https://github.com/elusivecodes/FrostCore
 */
(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        global.Core = factory();
    }

})(this, function() {
    'use strict';

    const Core = {};

    // {{code}}
    return Core;

});