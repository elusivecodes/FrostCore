import assert from 'node:assert/strict';
import { animation, compose, curry, debounce, evaluate, once, partial, pipe, random, throttle, times } from './../src/index.js';

describe('Function', function() {
    describe('#animation', function() {
        it('returns an animation function', function(done) {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 32);
        });

        it('only executes once per animation frame', function(done) {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            callback();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 32);
        });

        it('executes for each animation frame', function(done) {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            setTimeout(callback, 32);

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading argument', function(done) {
            let finished = false;
            let callCount = 0;
            const callback = animation((_) => {
                if (finished) {
                    callCount++;
                }
            });

            callback();
            finished = true;

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 32);
        });

        it('works with leading argument', function(done) {
            let finished = false;
            let callCount = 0;
            const callback = animation((_) => {
                if (!finished) {
                    callCount++;
                }
            }, true);

            callback();
            finished = true;

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 32);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const callback = animation((finished) => {
                if (!finished) {
                    return;
                }

                callCount++;
            });

            callback();
            callback(true);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 32);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            callback.cancel();

            setTimeout((_) => {
                assert.strictEqual(callCount, 0);
                done();
            }, 32);
        });
    });

    describe('#compose', function() {
        it('returns a composed function', function() {
            assert.strictEqual(
                compose(
                    (x) => x / 2,
                    (x) => x + 2,
                    (x) => x * 3,
                )(5),
                8.5,
            );
        });
    });

    describe('#curry', function() {
        it('returns a curried function', function() {
            assert.strictEqual(
                curry(
                    (a, b) =>
                        a * b,
                )(2)(5),
                10,
            );
        });
    });

    describe('#debounce', function() {
        it('returns a debounced function', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('only executes once per wait period', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();
            debounced();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('executes for each wait period', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 16);

            debounced();
            setTimeout(debounced, 16);

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('only executes after wait period', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 16);

            debounced();
            setTimeout(debounced, 8);
            setTimeout(debounced, 16);

            setTimeout((_) => {
                assert.strictEqual(callCount, 0);
            }, 32);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('works with leading only', function(done) {
            let finished = false;
            let callCount = 0;
            const debounced = debounce((_) => {
                if (!finished) {
                    callCount++;
                }
            }, 32, true, false);

            debounced();
            setTimeout(debounced, 32);
            finished = true;

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('works with trailing only', function(done) {
            let finished = false;
            let callCount = 0;
            const debounced = debounce((_) => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32);

            debounced();
            setTimeout(debounced, 32);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('works with leading and trailing', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32, true);

            debounced();
            debounced();

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading or trailing', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32, false, false);

            debounced();
            debounced();

            setTimeout((_) => {
                assert.strictEqual(callCount, 0);
                done();
            }, 64);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const debounced = debounce((finished) => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            debounced();
            debounced(true);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();
            debounced.cancel();

            setTimeout((_) => {
                assert.strictEqual(callCount, 0);
                done();
            }, 64);
        });
    });

    describe('#evaluate', function() {
        it('returns the result of a function', function() {
            const value = random();
            const result = evaluate(
                (_) => value,
            );

            assert.strictEqual(result, value);
        });

        it('returns the value of a non-function', function() {
            const value = random();
            const result = evaluate(value);

            assert.strictEqual(result, value);
        });
    });

    describe('#once', function() {
        it('returns a function that only executes once', function() {
            let result = 0;
            const addOneOnce = once(
                (_) => result++,
            );

            for (let i = 0; i < 10; i++) {
                addOneOnce();
            }

            assert.strictEqual(result, 1);
        });

        it('returns the result of the first execution on subsequent calls', function() {
            const rand = once(Math.random);
            const results = new Set;

            for (let i = 0; i < 100; i++) {
                const value = rand();
                results.add(value);
            }

            assert.strictEqual(
                results.size,
                1,
            );
        });
    });

    describe('#partial', function() {
        it('returns a function with partial arguments', function() {
            assert.strictEqual(
                partial(
                    (a, b) =>
                        a * b,
                    2,
                )(5),
                10,
            );
        });
    });

    describe('#pipe', function() {
        it('returns a piped function', function() {
            assert.strictEqual(
                pipe(
                    (x) => x / 2,
                    (x) => x + 2,
                    (x) => x * 3,
                )(5),
                13.5,
            );
        });
    });

    describe('#throttle', function() {
        it('returns a throttled function', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('only executes once per wait period', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            throttled();
            throttled();

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('executes for each wait period', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            setTimeout(throttled, 32);

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('works with leading only', function(done) {
            let finished = false;
            let callCount = 0;
            const throttled = throttle((_) => {
                if (!finished) {
                    callCount++;
                }
            }, 32, true, false);

            throttled();
            setTimeout(throttled, 32);
            finished = true;

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('works with trailing only', function(done) {
            let finished = false;
            let callCount = 0;
            const throttled = throttle((_) => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32);

            throttled();
            setTimeout(throttled, 32);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('works with leading and trailing', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32, true);

            throttled();
            throttled();

            setTimeout((_) => {
                assert.strictEqual(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading or trailing', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32, false, false);

            throttled();
            throttled();

            setTimeout((_) => {
                assert.strictEqual(callCount, 0);
                done();
            }, 64);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const throttled = throttle((finished) => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            throttled();
            throttled(true);

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            throttled();
            throttled.cancel();

            setTimeout((_) => {
                assert.strictEqual(callCount, 1);
                done();
            }, 64);
        });
    });

    describe('#times', function() {
        it('executes a function x times', function() {
            let result = 0;

            times(
                (_) => result++,
                500,
            );

            assert.strictEqual(
                result,
                500,
            );
        });
    });
});
