import MockDocument from './mock-document.js';

/**
 * MockWindow class
 * @class
 */
export default class MockWindow {
    /**
     * New MockWindow constructor.
     */
    constructor() {
        this.document = new MockDocument(this);
    }
}
