const assert = require('assert').strict;
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const MockObject = require('./Mock/MockObject');
const { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } = require('./Mock/vars');

describe('Testing (Primitive)', function() {

    describe('#isArray', function() {
        it('works with array', function() {
            assert.equal(
                Core.isArray(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isArray(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isArray(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isArray(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isArray(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isArray(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isArray(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isArray(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isArray(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isArray(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isArray(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isArray(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isArray(undefined),
                false
            );
        });
    });

    describe('#isBoolean', function() {
        it('works with array', function() {
            assert.equal(
                Core.isBoolean(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isBoolean(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isBoolean(true),
                true
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isBoolean(false),
                true
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isBoolean(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isBoolean(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isBoolean(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isBoolean(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isBoolean(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isBoolean(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isBoolean(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isBoolean(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isBoolean(undefined),
                false
            );
        });
    });

    describe('#isFunction', function() {
        it('works with array', function() {
            assert.equal(
                Core.isFunction(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isFunction(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isFunction(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isFunction(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isFunction(mockFunction),
                true
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isFunction(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isFunction(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isFunction(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isFunction(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isFunction(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isFunction(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isFunction(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isFunction(undefined),
                false
            );
        });
    });

    describe('#isNaN', function() {
        it('works with array', function() {
            assert.equal(
                Core.isNaN(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isNaN(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isNaN(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isNaN(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isNaN(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isNaN(NaN),
                true
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isNaN(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isNaN(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isNaN(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isNaN(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isNaN(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isNaN(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isNaN(undefined),
                false
            );
        });
    });

    describe('#isNull', function() {
        it('works with array', function() {
            assert.equal(
                Core.isNull(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isNull(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isNull(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isNull(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isNull(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isNull(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isNull(null),
                true
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isNull(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isNull(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isNull(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isNull(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isNull(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isNull(undefined),
                false
            );
        });
    });

    describe('#isObject', function() {
        it('works with array', function() {
            assert.equal(
                Core.isObject(mockArray),
                true
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isObject(new MockArrayLike),
                true
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isObject(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isObject(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isObject(mockFunction),
                true
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isObject(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isObject(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isObject(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isObject(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isObject(new MockObject),
                true
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isObject(mockPlainObject),
                true
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isObject(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isObject(undefined),
                false
            );
        });
    });

    describe('#isString', function() {
        it('works with array', function() {
            assert.equal(
                Core.isString(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isString(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isString(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isString(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isString(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isString(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isString(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isString(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isString(mockNumericString),
                true
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isString(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isString(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isString(mockString),
                true
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isString(undefined),
                false
            );
        });
    });

    describe('#isUndefined', function() {
        it('works with array', function() {
            assert.equal(
                Core.isUndefined(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isUndefined(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isUndefined(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isUndefined(false),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isUndefined(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isUndefined(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isUndefined(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isUndefined(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isUndefined(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isUndefined(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isUndefined(mockPlainObject),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isUndefined(mockString),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isUndefined(undefined),
                true
            );
        });
    });

});
