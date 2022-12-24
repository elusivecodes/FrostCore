import MockDocument from './MockDocument.js';

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
