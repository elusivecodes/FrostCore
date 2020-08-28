const assert = require('assert').strict;
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
            assert.equal(
                Core.isDocument(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isDocument(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isDocument(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isDocument(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isDocument(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isDocument(new MockDocument),
                true
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isDocument(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isDocument(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isDocument(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isDocument(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isDocument(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isDocument(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isDocument(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isDocument(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isDocument(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isDocument(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isDocument(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isDocument(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isDocument(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isDocument(new MockWindow),
                false
            );
        });
    });

    describe('#isElement', function() {
        it('works with array', function() {
            assert.equal(
                Core.isElement(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isElement(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isElement(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isElement(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isElement(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isElement(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isElement(new MockElement),
                true
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isElement(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isElement(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isElement(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isElement(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isElement(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isElement(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isElement(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isElement(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isElement(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isElement(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isElement(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isElement(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isElement(new MockWindow),
                false
            );
        });
    });

    describe('#isFragment', function() {
        it('works with array', function() {
            assert.equal(
                Core.isFragment(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isFragment(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isFragment(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isFragment(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isFragment(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isFragment(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isFragment(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isFragment(new MockFragment),
                true
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isFragment(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isFragment(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isFragment(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isFragment(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isFragment(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isFragment(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isFragment(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isFragment(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isFragment(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isFragment(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isFragment(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isFragment(new MockWindow),
                false
            );
        });
    });

    describe('#isNode', function() {
        it('works with array', function() {
            assert.equal(
                Core.isNode(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isNode(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isNode(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isNode(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isNode(new MockCommentNode),
                true
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isNode(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isNode(new MockElement),
                true
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isNode(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isNode(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isNode(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isNode(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isNode(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isNode(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isNode(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isNode(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isNode(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isNode(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isNode(new MockTextNode),
                true
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isNode(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isNode(new MockWindow),
                false
            );
        });
    });

    describe('#isShadow', function() {
        it('works with array', function() {
            assert.equal(
                Core.isShadow(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isShadow(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isShadow(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isShadow(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isShadow(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isShadow(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isShadow(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isShadow(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isShadow(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isShadow(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isShadow(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isShadow(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isShadow(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isShadow(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isShadow(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isShadow(new MockShadow),
                true
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isShadow(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isShadow(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isShadow(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isShadow(new MockWindow),
                false
            );
        });
    });

    describe('#isWindow', function() {
        it('works with array', function() {
            assert.equal(
                Core.isWindow(mockArray),
                false
            );
        });

        it('works with array-like', function() {
            assert.equal(
                Core.isWindow(new MockArrayLike),
                false
            );
        });

        it('works with boolean true', function() {
            assert.equal(
                Core.isWindow(true),
                false
            );
        });

        it('works with boolean false', function() {
            assert.equal(
                Core.isWindow(false),
                false
            );
        });

        it('works with comment node', function() {
            assert.equal(
                Core.isWindow(new MockCommentNode),
                false
            );
        });

        it('works with document', function() {
            assert.equal(
                Core.isWindow(new MockDocument),
                false
            );
        });

        it('works with element', function() {
            assert.equal(
                Core.isWindow(new MockElement),
                false
            );
        });

        it('works with fragment', function() {
            assert.equal(
                Core.isWindow(new MockFragment),
                false
            );
        });

        it('works with function', function() {
            assert.equal(
                Core.isWindow(mockFunction),
                false
            );
        });

        it('works with NaN', function() {
            assert.equal(
                Core.isWindow(NaN),
                false
            );
        });

        it('works with null', function() {
            assert.equal(
                Core.isWindow(null),
                false
            );
        });

        it('works with number', function() {
            assert.equal(
                Core.isWindow(mockNumber),
                false
            );
        });

        it('works with numeric string', function() {
            assert.equal(
                Core.isWindow(mockNumericString),
                false
            );
        });

        it('works with object', function() {
            assert.equal(
                Core.isWindow(new MockObject),
                false
            );
        });

        it('works with plain object', function() {
            assert.equal(
                Core.isWindow(mockPlainObject),
                false
            );
        });

        it('works with shadow', function() {
            assert.equal(
                Core.isWindow(new MockShadow),
                false
            );
        });

        it('works with string', function() {
            assert.equal(
                Core.isWindow(mockString),
                false
            );
        });

        it('works with text node', function() {
            assert.equal(
                Core.isWindow(new MockTextNode),
                false
            );
        });

        it('works with undefined', function() {
            assert.equal(
                Core.isWindow(undefined),
                false
            );
        });

        it('works with window', function() {
            assert.equal(
                Core.isWindow(new MockWindow),
                true
            );
        });
    });

});
