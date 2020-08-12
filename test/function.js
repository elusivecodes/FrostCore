const assert = require('assert').strict;
const Core = require('../dist/frost-core.min');

describe('Function Tests', function() {

    describe('#animation', function() {
        it('returns an animation function', function(done) {
            let callCount = 0;
            const animation = Core.animation(_ => callCount++);

            animation();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 32);
        });

        it('only executes once per animation frame', function(done) {
            let callCount = 0;
            const animation = Core.animation(_ => callCount++);

            animation();
            animation();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 32);
        });

        it('executes for each animation frame', function(done) {
            let callCount = 0;
            const animation = Core.animation(_ => callCount++);

            animation();
            setTimeout(animation, 32);

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading argument', function(done) {
            let finished = false;
            let callCount = 0;
            const animation = Core.animation(_ => {
                if (finished) {
                    callCount++;
                }
            });

            animation();
            finished = true;

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 32);
        });

        it('works with leading argument', function(done) {
            let finished = false;
            let callCount = 0;
            const animation = Core.animation(_ => {
                if (!finished) {
                    callCount++;
                }
            }, true);

            animation();
            finished = true;

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 32);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const animation = Core.animation(finished => {
                if (!finished) {
                    return;
                }

                callCount++;
            });

            animation();
            animation(true);

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 32);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const animation = Core.animation(_ => callCount++);

            animation();
            animation.cancel();

            setTimeout(_ => {
                assert.equal(callCount, 0);
                done();
            }, 32);
        });
    });

    describe('#compose', function() {
        it('returns a composed function', function() {
            assert.equal(
                Core.compose(
                    x => x / 2,
                    x => x + 2,
                    x => x * 3
                )(5),
                8.5
            );
        });
    });

    describe('#curry', function() {
        it('returns a curried function', function() {
            assert.equal(
                Core.curry(
                    (a, b) =>
                        a * b
                )(2)(5),
                10
            );
        });
    });

    describe('#debounce', function() {
        it('returns a debounced function', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32);

            debounced();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('only executes once per wait period', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32);

            debounced();
            debounced();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('executes for each wait period', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32);

            debounced();
            setTimeout(debounced, 32);

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('works with leading only', function(done) {
            let finished = false;
            let callCount = 0;
            const debounced = Core.debounce(_ => {
                if (!finished) {
                    callCount++;
                }
            }, 32, true, false);

            debounced();
            setTimeout(debounced, 32);
            finished = true;

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('works with trailing only', function(done) {
            let finished = false;
            let callCount = 0;
            const debounced = Core.debounce(_ => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32);

            debounced();
            setTimeout(debounced, 32);

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('works with leading and trailing', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32, true);

            debounced();
            debounced();

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading or trailing', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32, false, false);

            debounced();
            debounced();

            setTimeout(_ => {
                assert.equal(callCount, 0);
                done();
            }, 64);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(finished => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            debounced();
            debounced(true);

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const debounced = Core.debounce(_ => callCount++, 32);

            debounced();
            debounced.cancel();

            setTimeout(_ => {
                assert.equal(callCount, 0);
                done();
            }, 64);
        });
    });

    describe('#evaluate', function() {
        it('returns the result of a function', function() {
            const value = Core.random();
            const result = Core.evaluate(
                _ => value
            );

            assert.equal(result, value);
        });

        it('returns the value of a non-function', function() {
            const value = Core.random();
            const result = Core.evaluate(value);

            assert.equal(result, value);
        });
    });

    describe('#once', function() {
        it('returns a function that only executes once', function() {
            let result = 0;
            const addOneOnce = Core.once(
                _ => result++
            );

            for (let i = 0; i < 10; i++) {
                addOneOnce();
            }

            assert.equal(result, 1);
        });

        it('returns the result of the first execution on subsequent calls', function() {
            const rand = Core.once(Math.random);
            const results = new Set;

            for (let i = 0; i < 100; i++) {
                const value = rand();
                results.add(value);
            }

            assert.equal(
                results.size,
                1
            );
        });
    });

    describe('#partial', function() {
        it('returns a function with partial arguments', function() {
            assert.equal(
                Core.partial(
                    (a, b) =>
                        a * b,
                    2
                )(5),
                10
            );
        });
    });

    describe('#pipe', function() {
        it('returns a piped function', function() {
            assert.equal(
                Core.pipe(
                    x => x / 2,
                    x => x + 2,
                    x => x * 3
                )(5),
                13.5
            );
        });
    });

    describe('#throttle', function() {
        it('returns a throttled function', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32);

            throttled();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('only executes once per wait period', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32);

            throttled();
            throttled();
            throttled();

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('executes for each wait period', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32);

            throttled();
            setTimeout(throttled, 32);

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('works with leading only', function(done) {
            let finished = false;
            let callCount = 0;
            const throttled = Core.throttle(_ => {
                if (!finished) {
                    callCount++;
                }
            }, 32, true, false);

            throttled();
            setTimeout(throttled, 32);
            finished = true;

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('works with trailing only', function(done) {
            let finished = false;
            let callCount = 0;
            const throttled = Core.throttle(_ => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32);

            throttled();
            setTimeout(throttled, 32);

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('works with leading and trailing', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32, true);

            throttled();
            throttled();

            setTimeout(_ => {
                assert.equal(callCount, 2);
                done();
            }, 64);
        });

        it('works without leading or trailing', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32, false, false);

            throttled();
            throttled();

            setTimeout(_ => {
                assert.equal(callCount, 0);
                done();
            }, 64);
        });

        it('uses the most recent arguments', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(finished => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            throttled();
            throttled(true);

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });

        it('allows callback to be cancelled', function(done) {
            let callCount = 0;
            const throttled = Core.throttle(_ => callCount++, 32);

            throttled();
            throttled();
            throttled.cancel();

            setTimeout(_ => {
                assert.equal(callCount, 1);
                done();
            }, 64);
        });
    });

    describe('#times', function() {
        it('executes a function x times', function() {
            let result = 0;

            Core.times(
                _ => result++,
                500
            );

            assert.equal(
                result,
                500
            );
        });
    });

});
