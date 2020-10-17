const assert = require('assert');
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const MockObject = require('./Mock/MockObject');
const { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } = require('./Mock/vars');

describe('Testing (Primitive)', function() {

    describe('#isArray', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isArray(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isArray(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isArray(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isArray(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isArray(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isArray(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isArray(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isArray(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isArray(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isArray(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isArray(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isArray(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isArray(undefined),
                false
            );
        });
    });

    describe('#isBoolean', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isBoolean(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isBoolean(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isBoolean(true),
                true
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isBoolean(false),
                true
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isBoolean(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isBoolean(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isBoolean(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isBoolean(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isBoolean(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isBoolean(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isBoolean(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isBoolean(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isBoolean(undefined),
                false
            );
        });
    });

    describe('#isFunction', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isFunction(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isFunction(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isFunction(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isFunction(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isFunction(mockFunction),
                true
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isFunction(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isFunction(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isFunction(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isFunction(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isFunction(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isFunction(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isFunction(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isFunction(undefined),
                false
            );
        });
    });

    describe('#isNaN', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isNaN(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isNaN(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isNaN(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isNaN(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isNaN(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isNaN(NaN),
                true
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isNaN(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isNaN(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isNaN(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isNaN(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isNaN(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isNaN(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isNaN(undefined),
                false
            );
        });
    });

    describe('#isNull', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isNull(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isNull(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isNull(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isNull(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isNull(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isNull(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isNull(null),
                true
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isNull(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isNull(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isNull(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isNull(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isNull(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isNull(undefined),
                false
            );
        });
    });

    describe('#isObject', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isObject(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isObject(new MockArrayLike),
                true
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isObject(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isObject(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isObject(mockFunction),
                true
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isObject(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isObject(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isObject(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isObject(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isObject(new MockObject),
                true
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isObject(mockPlainObject),
                true
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isObject(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isObject(undefined),
                false
            );
        });
    });

    describe('#isString', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isString(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isString(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isString(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isString(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isString(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isString(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isString(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isString(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isString(mockNumericString),
                true
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isString(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isString(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isString(mockString),
                true
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isString(undefined),
                false
            );
        });
    });

    describe('#isUndefined', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isUndefined(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isUndefined(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isUndefined(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isUndefined(false),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isUndefined(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isUndefined(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isUndefined(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isUndefined(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isUndefined(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isUndefined(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isUndefined(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isUndefined(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isUndefined(undefined),
                true
            );
        });
    });

});
