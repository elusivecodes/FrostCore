/**
 * MockDocument class
 * @class
 */
class MockDocument {

    /**
     * New MockDocument constructor.
     * @param {MockWindow} window The MockWindow.
     * @returns {MockDocument} The new MockDocument object.
     */
    constructor(window = null) {
        this.nodeType = 9;
        this.defaultView = window;
    }

}

module.exports = MockDocument;
