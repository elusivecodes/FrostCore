import assert from 'node:assert/strict';
import { clamp, clampPercent, dist, inverseLerp, lerp, map, random, randomInt, toStep } from './../src/index.js';

describe('Math', function() {
    describe('#clamp', function() {
        it('returns a value in range', function() {
            assert.strictEqual(
                clamp(0, -50, 50),
                0,
            );
        });

        it('works with default arguments', function() {
            assert.strictEqual(
                clamp(0.5),
                0.5,
            );
        });

        it('clamps to lower bounds', function() {
            assert.strictEqual(
                clamp(-100, -50, 50),
                -50,
            );
        });

        it('clamps to lower bounds with default arguments', function() {
            assert.strictEqual(
                clamp(-1),
                0,
            );
        });

        it('clamps to upper bounds', function() {
            assert.strictEqual(
                clamp(100, -50, 50),
                50,
            );
        });

        it('clamps to upper bounds with default arguments', function() {
            assert.strictEqual(
                clamp(2),
                1,
            );
        });
    });

    describe('#clampPercent', function() {
        it('returns a value in range', function() {
            assert.strictEqual(
                clampPercent(50),
                50,
            );
        });

        it('clamps to lower bounds', function() {
            assert.strictEqual(
                clampPercent(-50),
                0,
            );
        });

        it('clamps to upper bounds', function() {
            assert.strictEqual(
                clampPercent(150),
                100,
            );
        });
    });

    describe('#dist', function() {
        it('returns the distance of the co-ordinates', function() {
            const x1 = Math.random();
            const y1 = Math.random();
            const x2 = Math.random();
            const y2 = Math.random();

            assert.strictEqual(
                dist(x1, y1, x2, y2),
                Math.hypot(x2 - x1, y2 - y1),
            );
        });
    });

    describe('#inverseLerp', function() {
        it('returns the inverse interpolated value', function() {
            assert.strictEqual(
                inverseLerp(50, 100, 75),
                .5,
            );
        });

        it('works from negative numbers', function() {
            assert.strictEqual(
                inverseLerp(-100, 100, 50),
                .75,
            );
        });

        it('works to negative numbers', function() {
            assert.strictEqual(
                inverseLerp(100, -100, -50),
                .75,
            );
        });
    });

    describe('#lerp', function() {
        it('returns the interpolated value', function() {
            assert.strictEqual(
                lerp(50, 100, .5),
                75,
            );
        });

        it('works from negative numbers', function() {
            assert.strictEqual(
                lerp(-100, 100, .75),
                50,
            );
        });

        it('works to negative numbers', function() {
            assert.strictEqual(
                lerp(100, -100, .75),
                -50,
            );
        });
    });

    describe('#map', function() {
        it('returns the mapped value', function() {
            assert.strictEqual(
                map(25, 10, 50, 25, 150),
                71.875,
            );
        });

        it('works from negative start', function() {
            assert.strictEqual(
                map(5, -10, 50, 25, 150),
                56.25,
            );
        });

        it('works from negative end', function() {
            assert.strictEqual(
                map(-5, 10, -50, 25, 150),
                56.25,
            );
        });

        it('works to negative start', function() {
            assert.strictEqual(
                map(25, 10, 50, -25, 50),
                3.125,
            );
        });

        it('works to negative end', function() {
            assert.strictEqual(
                map(25, 10, 50, 25, -50),
                -3.125,
            );
        });
    });

    describe('#random', function() {
        it('works with default arguments', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = random();
                assert.ok(value >= 0 && value < 1);
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with a lower bound', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = random(10, 50);
                assert.ok(value >= 10 && value < 50);
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with an upper bound', function() {
            const found = new Set;
            const foundHigh = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = random(10);
                assert.ok(value >= 0 && value < 10);
                found.add(value);
                if (value > 1) {
                    foundHigh.add(value);
                }
            }

            assert.ok(found.size > 100);
            assert.ok(foundHigh.size > 50);
        });

        it('works with a negative range', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = random(-50, -10);
                assert.ok(value >= -50 && value < -10);
                found.add(value);
            }

            assert.ok(found.size > 100);
        });
    });

    describe('#randomInt', function() {
        it('works with a lower bound', function() {
            const found2 = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomInt(10, 50);
                assert.ok(value >= 10 && value <= 50);
                assert.strictEqual(value, Math.round(value));
                found2.add(value);
            }

            assert.ok(found2.size > 1);
        });

        it('works with an upper bound', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomInt(10);
                assert.ok(value >= 0 && value <= 10);
                assert.strictEqual(value, Math.round(value));
                found.add(value);
            }

            assert.ok(found.size > 1);
        });

        it('works with a negative range', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomInt(-50, -10);
                assert.ok(value >= -50 && value <= -10);
                assert.strictEqual(value, Math.round(value));
                found.add(value);
            }

            assert.ok(found.size > 1);
        });
    });

    describe('#toStep', function() {
        it('works with a decimal', function() {
            assert.strictEqual(
                toStep(0.123456, .1),
                0.1,
            );
        });

        it('works with a fraction', function() {
            assert.strictEqual(
                toStep(1.23456, 1 / 4),
                1.25,
            );
        });

        it('works with a whole number', function() {
            assert.strictEqual(
                toStep(123.456, 33),
                132,
            );
        });
    });
});
