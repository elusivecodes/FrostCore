import MockElement from './MockElement.js';

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
