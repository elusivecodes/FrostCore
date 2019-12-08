const MockDocument = require('./MockDocument');

/**
 * MockWindow class
 * @class
 */
class MockWindow {

    /**
     * New MockWindow constructor.
     * @returns {MockWindow} The new MockWindow object.
     */
    constructor() {
        this.document = new MockDocument(this);
    }

}

module.exports = MockWindow;
