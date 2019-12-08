/**
 * MockArrayLike class
 * @class
 */
class MockArrayLike {

    /**
     * New MockArrayLike constructor.
     * @returns {MockArrayLike} The new MockArrayLike object.
     */
    constructor() {
        this[0] = 1;
        this[1] = 2;
        this[2] = 3;
        this.length = 3;
    }

}

module.exports = MockArrayLike;
