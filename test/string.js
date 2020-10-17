const assert = require('assert');
const Core = require('../dist/frost-core.min');

describe('String', function() {

    describe('#camelCase', function() {
        it('returns a camelized string', function() {
            assert.strictEqual(
                Core.camelCase('This is a sample string'),
                'thisIsASampleString'
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                Core.camelCase('this-is-a-sample-string'),
                'thisIsASampleString'
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                Core.camelCase('ThisIsASampleString'),
                'thisIsASampleString'
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                Core.camelCase('this_is_a_sample_string'),
                'thisIsASampleString'
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                Core.camelCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'thisIsASampleString'
            );
        });
    });

    describe('#capitalize', function() {
        it('returns a capitalized string', function() {
            assert.strictEqual(
                Core.capitalize('This is a sample string'),
                'This is a sample string'
            );
        });

        it('works from lower case', function() {
            assert.strictEqual(
                Core.capitalize('this is a sample string'),
                'This is a sample string'
            );
        });

        it('works from upper case', function() {
            assert.strictEqual(
                Core.capitalize('THIS IS A SAMPLE STRING'),
                'This is a sample string'
            );
        });
    });

    describe('#escape', function() {
        it('returns an escaped string', function() {
            assert.strictEqual(
                Core.escape('This is a sample string'),
                'This is a sample string'
            );
        });

        it('escapes ampersand', function() {
            assert.strictEqual(
                Core.escape('&'),
                '&amp;'
            );
        });

        it('escapes apostrophe', function() {
            assert.strictEqual(
                Core.escape(`'`),
                '&apos;'
            );
        });

        it('escapes greater than', function() {
            assert.strictEqual(
                Core.escape('>'),
                '&gt;'
            );
        });

        it('escapes less than', function() {
            assert.strictEqual(
                Core.escape('<'),
                '&lt;'
            );
        });

        it('escapes quotation mark', function() {
            assert.strictEqual(
                Core.escape('"'),
                '&quot;'
            );
        });
    });

    describe('#escapeRegExp', function() {
        it('returns an escaped string', function() {
            assert.strictEqual(
                Core.escapeRegExp('This is a sample string'),
                'This is a sample string'
            );
        });

        it('escapes asterisk', function() {
            assert.strictEqual(
                Core.escapeRegExp('*'),
                '\\*'
            );
        });

        it('escapes backlash', function() {
            assert.strictEqual(
                Core.escapeRegExp('\\'),
                '\\\\'
            );
        });

        it('escapes caret', function() {
            assert.strictEqual(
                Core.escapeRegExp('^'),
                '\\^'
            );
        });

        it('escapes close curly brace', function() {
            assert.strictEqual(
                Core.escapeRegExp('}'),
                '\\}'
            );
        });

        it('escapes close parentheses', function() {
            assert.strictEqual(
                Core.escapeRegExp(')'),
                '\\)'
            );
        });

        it('escapes close square bracket', function() {
            assert.strictEqual(
                Core.escapeRegExp(']'),
                '\\]'
            );
        });

        it('escapes dollar sign', function() {
            assert.strictEqual(
                Core.escapeRegExp('$'),
                '\\$'
            );
        });

        it('escapes dot', function() {
            assert.strictEqual(
                Core.escapeRegExp('.'),
                '\\.'
            );
        });

        it('escapes forward slash', function() {
            assert.strictEqual(
                Core.escapeRegExp('/'),
                '\\/'
            );
        });

        it('escapes minus', function() {
            assert.strictEqual(
                Core.escapeRegExp('-'),
                '\\-'
            );
        });

        it('escapes open curly brace', function() {
            assert.strictEqual(
                Core.escapeRegExp('{'),
                '\\{'
            );
        });

        it('escapes open parentheses', function() {
            assert.strictEqual(
                Core.escapeRegExp('('),
                '\\('
            );
        });

        it('escapes open square bracket', function() {
            assert.strictEqual(
                Core.escapeRegExp('['),
                '\\['
            );
        });

        it('escapes plus', function() {
            assert.strictEqual(
                Core.escapeRegExp('+'),
                '\\+'
            );
        });

        it('escapes pipe', function() {
            assert.strictEqual(
                Core.escapeRegExp('|'),
                '\\|'
            );
        });

        it('escapes question mark', function() {
            assert.strictEqual(
                Core.escapeRegExp('?'),
                '\\?'
            );
        });
    });

    describe('humanize', function() {
        it('returns a humanized string', function() {
            assert.strictEqual(
                Core.humanize('This is a sample string'),
                'This is a sample string'
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                Core.humanize('thisIsASampleString'),
                'This is a sample string'
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                Core.humanize('this-is-a-sample-string'),
                'This is a sample string'
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                Core.humanize('ThisIsASampleString'),
                'This is a sample string'
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                Core.humanize('this_is_a_sample_string'),
                'This is a sample string'
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                Core.humanize('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'This is a sample string'
            );
        });
    });

    describe('#kebabCase', function() {
        it('returns a kebab-case string', function() {
            assert.strictEqual(
                Core.kebabCase('This is a sample string'),
                'this-is-a-sample-string'
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                Core.kebabCase('thisIsASampleString'),
                'this-is-a-sample-string'
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                'this-is-a-sample-string',
                Core.kebabCase('ThisIsASampleString')
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                Core.kebabCase('this_is_a_sample_string'),
                'this-is-a-sample-string'
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                Core.kebabCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this-is-a-sample-string'
            );
        });
    });

    describe('#pascalCase', function() {
        it('returns a pascalized string', function() {
            assert.strictEqual(
                Core.pascalCase('This is a sample string'),
                'ThisIsASampleString'
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                Core.pascalCase('thisIsASampleString'),
                'ThisIsASampleString'
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                Core.pascalCase('this-is-a-sample-string'),
                'ThisIsASampleString'
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                Core.pascalCase('this_is_a_sample_string'),
                'ThisIsASampleString'
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
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
        it('returns an snake_cased string', function() {
            assert.strictEqual(
                Core.snakeCase('This is a sample string'),
                'this_is_a_sample_string'
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                Core.snakeCase('thisIsASampleString'),
                'this_is_a_sample_string'
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                Core.snakeCase('ThisIsASampleString'),
                'this_is_a_sample_string'
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                Core.snakeCase('this-is-a-sample-string'),
                'this_is_a_sample_string'
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                Core.snakeCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this_is_a_sample_string'
            );
        });
    });

    describe('#unescape', function() {
        it('returns an unescaped string', function() {
            assert.strictEqual(
                Core.unescape('This is a sample string'),
                'This is a sample string'
            );
        });

        it('unescapes ampersand', function() {
            assert.strictEqual(
                Core.unescape('&amp;'),
                '&'
            );
        });

        it('unescapes apostrophe', function() {
            assert.strictEqual(
                Core.unescape('&apos;'),
                `'`
            );
        });

        it('unescapes greater than', function() {
            assert.strictEqual(
                Core.unescape('&gt;'),
                '>'
            );
        });

        it('unescapes less than', function() {
            assert.strictEqual(
                Core.unescape('&lt;'),
                '<'
            );
        });

        it('unescapes quotation mark', function() {
            assert.strictEqual(
                Core.unescape('&quot;'),
                '"'
            );
        });
    });

});
