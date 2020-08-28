const assert = require('assert').strict;
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const MockObject = require('./Mock/MockObject');
const { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } = require('./Mock/vars');

describe('Testing (Custom)', function() {

    describe('#isArrayLike', function() {
        it('works with array', function() {
            assert.equal(
                Core.isArrayLike(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isArrayLike(new MockArrayLike),
                true
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isArrayLike(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isArrayLike(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isArrayLike(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isArrayLike(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isArrayLike(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isArrayLike(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isArrayLike(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isArrayLike(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isArrayLike(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isArrayLike(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isArrayLike(undefined),
                false
            );
        });
    });

    describe('#isNumeric', function() {
        it('works with array', function() {
            assert.equal(
                Core.isNumeric(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isNumeric(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isNumeric(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isNumeric(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isNumeric(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isNumeric(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isNumeric(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isNumeric(mockNumber),
                true
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isNumeric(mockNumericString),
                true
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isNumeric(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isNumeric(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isNumeric(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isNumeric(undefined),
                false
            );
        });
    });

    describe('#isPlainObject', function() {
        it('works with array', function() {
            assert.equal(
                Core.isPlainObject(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isPlainObject(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isPlainObject(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isPlainObject(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isPlainObject(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isPlainObject(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isPlainObject(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isPlainObject(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isPlainObject(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isPlainObject(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isPlainObject(mockPlainObject),
                true
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isPlainObject(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isPlainObject(undefined),
                false
            );
        });
    });

});
