/**
 * FrostCore v1.0.7
 * https://github.com/elusivecodes/FrostCore
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        global.Core = factory(global);
    }

})(this || window, function(window) {
    'use strict';

    const Core = {};

    // {{code}}
    return Core;

});