import MockElement from './mock-element.js';

/**
 * MockShadow class
 * @class
 */
export default class MockShadow {
    /**
     * New MockShadow constructor.
     */
    constructor() {
        this.nodeType = 11;
        this.host = new MockElement;
    }
}
