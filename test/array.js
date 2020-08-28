const assert = require('assert').strict;
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const { mockArray, mockNumber, mockPlainObject, mockString } = require('./Mock/vars');

describe('Array', function() {

    describe('#diff', function() {
        it('returns the elements that exist only in the first array', function() {
            assert.deepEqual(
                Core.diff(
                    [1, 2, 3, 4, 5],
                    [2, 4],
                    [5, 6]
                ),
                [1, 3]
            );
        });
    });

    describe('#intersect', function() {
        it('returns the elements that exist in all arrays', function() {
            assert.deepEqual(
                Core.intersect(
                    [1, 2, 3, 4, 5],
                    [2, 4, 6, 8],
                    [1, 2, 3, 4]
                ),
                [2, 4]
            );
        });
    });

    describe('#merge', function() {
        it('merges the elements to the first array', function() {
            const test = [1];
            Core.merge(test, [2, 3], [4, 5]);
            assert.deepEqual(
                test,
                [1, 2, 3, 4, 5]
            );
        });

        it('returns the merged array', function() {
            assert.deepEqual(
                Core.merge([], [1], [2, 3], [4, 5]),
                [1, 2, 3, 4, 5]
            );
        });
    });

    describe('#randomValue', function() {
        it('always returns a valid element', function() {
            const array = [1, 2, 3, 4, 5];

            let i;
            for (i = 0; i < 1000; i++) {
                assert.ok(
                    array.includes(
                        Core.randomValue(array)
                    )
                );
            }
        });

        it('does not always return the same element', function() {
            const array = [1, 2, 3, 4, 5];
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                found.add(
                    Core.randomValue(array)
                );
            }

            assert.equal(found.size, array.length);
        });
    });

    describe('#range', function() {
        it('works with incrementing integers', function() {
            assert.deepEqual(
                Core.range(0, 10),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            );
        });

        it('works with incrementing decimals', function() {
            assert.deepEqual(
                Core.range(0, 1, .1),
                [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
            );
        });

        it('works with decrementing integers', function() {
            assert.deepEqual(
                Core.range(0, -10),
                [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]
            );
        });

        it('works with decrementing decimals', function() {
            assert.deepEqual(
                Core.range(0, -1, .1),
                [0, -.1, -.2, -.3, -.4, -.5, -.6, -.7, -.8, -.9, -1]
            );
        });

        it('works with an offset', function() {
            assert.deepEqual(
                Core.range(10, 20),
                [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            );
        });

        it('works with a negative offset', function() {
            assert.deepEqual(
                Core.range(-10, -20),
                [-10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20]
            );
        });
    });

    describe('#unique', function() {
        it('returns the unique elements', function() {
            assert.deepEqual(
                Core.unique(
                    [1, 2, 2, 3, 4, 5]
                ),
                [1, 2, 3, 4, 5]
            );
        });

        it('only removes "strict" duplicates', function() {
            assert.deepEqual(
                Core.unique(
                    [1, 2, '2', 3, 4, 5]
                ),
                [1, 2, '2', 3, 4, 5]
            );
        });
    });

    describe('#wrap', function() {
        it('returns an array from an array', function() {
            assert.deepEqual(
                Core.wrap(mockArray),
                mockArray
            );
        });

        it('returns an array from an array-like', function() {
            assert.deepEqual(
                Core.wrap(new MockArrayLike()),
                [1, 2, 3]
            );
        });

        it('returns an array from false', function() {
            assert.deepEqual(
                Core.wrap(false),
                [false]
            );
        });

        it('returns an array from null', function() {
            assert.deepEqual(
                Core.wrap(null),
                [null]
            );
        });

        it('returns an array from a number', function() {
            assert.deepEqual(
                Core.wrap(mockNumber),
                [mockNumber]
            );
        });

        it('returns an array from an object', function() {
            assert.deepEqual(
                Core.wrap(mockPlainObject),
                [mockPlainObject]
            );
        });

        it('returns an array from a string', function() {
            assert.deepEqual(
                Core.wrap(mockString),
                [mockString]
            );
        });

        it('returns an array from true', function() {
            assert.deepEqual(
                Core.wrap(true),
                [true]
            );
        });

        it('returns an empty array from undefined', function() {
            assert.deepEqual(
                Core.wrap(undefined),
                []
            );
        });
    });

});
