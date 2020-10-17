const assert = require('assert');
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const MockObject = require('./Mock/MockObject');
const { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } = require('./Mock/vars');

describe('Testing (Custom)', function() {

    describe('#isArrayLike', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isArrayLike(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isArrayLike(new MockArrayLike),
                true
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isArrayLike(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isArrayLike(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isArrayLike(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isArrayLike(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isArrayLike(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isArrayLike(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isArrayLike(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isArrayLike(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isArrayLike(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isArrayLike(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isArrayLike(undefined),
                false
            );
        });
    });

    describe('#isNumeric', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isNumeric(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isNumeric(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isNumeric(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isNumeric(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isNumeric(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isNumeric(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isNumeric(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isNumeric(mockNumber),
                true
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isNumeric(mockNumericString),
                true
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isNumeric(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isNumeric(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isNumeric(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isNumeric(undefined),
                false
            );
        });
    });

    describe('#isPlainObject', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isPlainObject(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isPlainObject(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isPlainObject(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isPlainObject(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isPlainObject(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isPlainObject(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isPlainObject(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isPlainObject(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isPlainObject(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isPlainObject(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isPlainObject(mockPlainObject),
                true
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isPlainObject(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isPlainObject(undefined),
                false
            );
        });
    });

});
