/**
 * MockDocument class
 * @class
 */
export default class MockDocument {
    /**
     * New MockDocument constructor.
     * @param {MockWindow} window The MockWindow.
     */
    constructor(window = null) {
        this.nodeType = 9;
        this.defaultView = window;
    }
}
