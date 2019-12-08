const MockElement = require('./MockElement');

/**
 * MockShadow class
 * @class
 */
class MockShadow {

    /**
     * New MockShadow constructor.
     * @returns {MockShadow} The new MockShadow object.
     */
    constructor() {
        this.nodeType = 11;
        this.host = new MockElement;
    }

}

module.exports = MockShadow;
