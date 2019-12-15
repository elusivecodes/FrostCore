const assert = require('assert').strict;
const Core = require('../dist/frost-core.min');

describe('String Tests', function() {

    describe('#camelCase', function() {
        it('returns a camelized string', function() {
            assert.equal(
                Core.camelCase('This is a sample string'),
                'thisIsASampleString'
            );
        });

        it('works from pascal case', function() {
            assert.equal(
                Core.camelCase('ThisIsASampleString'),
                'thisIsASampleString'
            );
        });

        it('works from snake case', function() {
            assert.equal(
                Core.camelCase('this-is-a-sample-string'),
                'thisIsASampleString'
            );
        });

        it('works from underscore', function() {
            assert.equal(
                Core.camelCase('this_is_a_sample_string'),
                'thisIsASampleString'
            );
        });

        it('strips invalid characters', function() {
            assert.equal(
                Core.camelCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'thisIsASampleString'
            );
        });
    });

    describe('#escape', function() {
        it('returns an escaped string', function() {
            assert.equal(
                Core.escape('This is a sample string'),
                'This is a sample string'
            );
        });

        it('escapes ampersand', function() {
            assert.equal(
                Core.escape('&'),
                '&amp;'
            );
        });

        it('escapes apostrophe', function() {
            assert.equal(
                Core.escape(`'`),
                '&apos;'
            );
        });

        it('escapes greater than', function() {
            assert.equal(
                Core.escape('>'),
                '&gt;'
            );
        });

        it('escapes less than', function() {
            assert.equal(
                Core.escape('<'),
                '&lt;'
            );
        });

        it('escapes quotation mark', function() {
            assert.equal(
                Core.escape('"'),
                '&quot;'
            );
        });
    });

    describe('#escapeRegExp', function() {
        it('returns an escaped string', function() {
            assert.equal(
                Core.escapeRegExp('This is a sample string'),
                'This is a sample string'
            );
        });

        it('escapes asterisk', function() {
            assert.equal(
                Core.escapeRegExp('*'),
                '\\*'
            );
        });

        it('escapes backlash', function() {
            assert.equal(
                Core.escapeRegExp('\\'),
                '\\\\'
            );
        });

        it('escapes caret', function() {
            assert.equal(
                Core.escapeRegExp('^'),
                '\\^'
            );
        });

        it('escapes close curly brace', function() {
            assert.equal(
                Core.escapeRegExp('}'),
                '\\}'
            );
        });

        it('escapes close parentheses', function() {
            assert.equal(
                Core.escapeRegExp(')'),
                '\\)'
            );
        });

        it('escapes close square bracket', function() {
            assert.equal(
                Core.escapeRegExp(']'),
                '\\]'
            );
        });

        it('escapes dollar sign', function() {
            assert.equal(
                Core.escapeRegExp('$'),
                '\\$'
            );
        });

        it('escapes dot', function() {
            assert.equal(
                Core.escapeRegExp('.'),
                '\\.'
            );
        });

        it('escapes forward slash', function() {
            assert.equal(
                Core.escapeRegExp('/'),
                '\\/'
            );
        });

        it('escapes minus', function() {
            assert.equal(
                Core.escapeRegExp('-'),
                '\\-'
            );
        });

        it('escapes open curly brace', function() {
            assert.equal(
                Core.escapeRegExp('{'),
                '\\{'
            );
        });

        it('escapes open parentheses', function() {
            assert.equal(
                Core.escapeRegExp('('),
                '\\('
            );
        });

        it('escapes open square bracket', function() {
            assert.equal(
                Core.escapeRegExp('['),
                '\\['
            );
        });

        it('escapes plus', function() {
            assert.equal(
                Core.escapeRegExp('+'),
                '\\+'
            );
        });

        it('escapes pipe', function() {
            assert.equal(
                Core.escapeRegExp('|'),
                '\\|'
            );
        });

        it('escapes question mark', function() {
            assert.equal(
                Core.escapeRegExp('?'),
                '\\?'
            );
        });
    });

    describe('#pascalCase', function() {
        it('returns a pascalized string', function() {
            assert.equal(
                Core.pascalCase('This is a sample string'),
                'ThisIsASampleString'
            );
        });

        it('works from camel case', function() {
            assert.equal(
                Core.pascalCase('thisIsASampleString'),
                'ThisIsASampleString'
            );
        });

        it('works from snake case', function() {
            assert.equal(
                Core.pascalCase('this-is-a-sample-string'),
                'ThisIsASampleString'
            );
        });

        it('works from underscore', function() {
            assert.equal(
                Core.pascalCase('this_is_a_sample_string'),
                'ThisIsASampleString'
            );
        });

        it('strips invalid characters', function() {
            assert.equal(
                Core.pascalCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'ThisIsASampleString'
            );
        });
    });

    describe('#randomString', function() {
        it('returns a random string', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = Core.randomString();
                assert.ok(/[0-9a-zA-Z]{16}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with a custom length', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = Core.randomString(24);
                assert.ok(/[0-9a-zA-Z]{24}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with custom characters', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = Core.randomString(8, '0123456789');
                assert.ok(/[0-9]{8}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });
    });

    describe('#snakeCase', function() {
        it('returns a snake case string', function() {
            assert.equal(
                Core.snakeCase('This is a sample string'),
                'this-is-a-sample-string'
            );
        });

        it('works from camel case', function() {
            assert.equal(
                Core.snakeCase('thisIsASampleString'),
                'this-is-a-sample-string'
            );
        });

        it('works from pascal case', function() {
            assert.equal(
                'this-is-a-sample-string',
                Core.snakeCase('ThisIsASampleString')
            );
        });

        it('works from underscore', function() {
            assert.equal(
                Core.snakeCase('this_is_a_sample_string'),
                'this-is-a-sample-string'
            );
        });

        it('strips invalid characters', function() {
            assert.equal(
                Core.snakeCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this-is-a-sample-string'
            );
        });
    });

    describe('#underscore', function() {
        it('returns an underscored string', function() {
            assert.equal(
                Core.underscore('This is a sample string'),
                'this_is_a_sample_string'
            );
        });

        it('works from camel case', function() {
            assert.equal(
                Core.underscore('thisIsASampleString'),
                'this_is_a_sample_string'
            );
        });

        it('works from pascal case', function() {
            assert.equal(
                Core.underscore('ThisIsASampleString'),
                'this_is_a_sample_string'
            );
        });

        it('works from snake case', function() {
            assert.equal(
                Core.underscore('this-is-a-sample-string'),
                'this_is_a_sample_string'
            );
        });

        it('strips invalid characters', function() {
            assert.equal(
                Core.underscore('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this_is_a_sample_string'
            );
        });
    });

    describe('#unescape', function() {
        it('returns an unescaped string', function() {
            assert.equal(
                Core.unescape('This is a sample string'),
                'This is a sample string'
            );
        });

        it('unescapes ampersand', function() {
            assert.equal(
                Core.unescape('&amp;'),
                '&'
            );
        });

        it('unescapes apostrophe', function() {
            assert.equal(
                Core.unescape('&apos;'),
                `'`
            );
        });

        it('unescapes greater than', function() {
            assert.equal(
                Core.unescape('&gt;'),
                '>'
            );
        });

        it('unescapes less than', function() {
            assert.equal(
                Core.unescape('&lt;'),
                '<'
            );
        });

        it('unescapes quotation mark', function() {
            assert.equal(
                Core.unescape('&quot;'),
                '"'
            );
        });
    });

});
