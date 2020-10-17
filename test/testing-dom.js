const assert = require('assert');
const Core = require('../dist/frost-core.min');
const MockArrayLike = require('./Mock/MockArrayLike');
const MockCommentNode = require('./Mock/MockCommentNode');
const MockDocument = require('./Mock/MockDocument');
const MockElement = require('./Mock/MockElement');
const MockFragment = require('./Mock/MockFragment');
const MockObject = require('./Mock/MockObject');
const MockShadow = require('./Mock/MockShadow');
const MockTextNode = require('./Mock/MockTextNode');
const MockWindow = require('./Mock/MockWindow');
const { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } = require('./Mock/vars');

describe('Testing (DOM)', function() {

    describe('#isDocument', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isDocument(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isDocument(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isDocument(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isDocument(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isDocument(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isDocument(new MockDocument),
                true
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isDocument(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isDocument(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isDocument(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isDocument(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isDocument(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isDocument(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isDocument(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isDocument(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isDocument(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isDocument(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isDocument(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isDocument(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isDocument(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isDocument(new MockWindow),
                false
            );
        });
    });

    describe('#isElement', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isElement(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isElement(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isElement(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isElement(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isElement(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isElement(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isElement(new MockElement),
                true
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isElement(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isElement(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isElement(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isElement(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isElement(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isElement(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isElement(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isElement(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isElement(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isElement(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isElement(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isElement(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isElement(new MockWindow),
                false
            );
        });
    });

    describe('#isFragment', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isFragment(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isFragment(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isFragment(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isFragment(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isFragment(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isFragment(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isFragment(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isFragment(new MockFragment),
                true
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isFragment(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isFragment(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isFragment(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isFragment(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isFragment(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isFragment(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isFragment(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isFragment(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isFragment(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isFragment(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isFragment(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isFragment(new MockWindow),
                false
            );
        });
    });

    describe('#isNode', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isNode(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isNode(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isNode(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isNode(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isNode(new MockCommentNode),
                true
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isNode(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isNode(new MockElement),
                true
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isNode(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isNode(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isNode(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isNode(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isNode(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isNode(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isNode(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isNode(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isNode(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isNode(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isNode(new MockTextNode),
                true
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isNode(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isNode(new MockWindow),
                false
            );
        });
    });

    describe('#isShadow', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isShadow(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isShadow(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isShadow(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isShadow(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isShadow(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isShadow(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isShadow(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isShadow(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isShadow(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isShadow(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isShadow(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isShadow(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isShadow(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isShadow(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isShadow(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isShadow(new MockShadow),
                true
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isShadow(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isShadow(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isShadow(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isShadow(new MockWindow),
                false
            );
        });
    });

    describe('#isWindow', function() {
        it('works with array', function() {
            assert.strictEqual(
                Core.isWindow(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                Core.isWindow(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                Core.isWindow(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                Core.isWindow(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                Core.isWindow(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                Core.isWindow(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                Core.isWindow(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                Core.isWindow(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                Core.isWindow(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                Core.isWindow(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                Core.isWindow(null),
                false
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                Core.isWindow(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                Core.isWindow(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                Core.isWindow(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                Core.isWindow(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                Core.isWindow(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                Core.isWindow(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                Core.isWindow(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                Core.isWindow(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                Core.isWindow(new MockWindow),
                true
            );
        });
    });

});
