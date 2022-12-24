/**
 * MockArrayLike class
 * @class
 */
export default class MockArrayLike {
    /**
     * New MockArrayLike constructor.
     */
    constructor() {
        this[0] = 1;
        this[1] = 2;
        this[2] = 3;
        this.length = 3;
    }
}
