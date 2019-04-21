# FrostCore

**FrostCore** is a free, open-source utility library for *JavaScript*.

It is a tiny (~3kb) and modern library, adding various functionality to your JS toolkit for manipulating arrays, functions, objects & more.


## Table of contents
- [Arrays](#arrays)
- [Functions](#functions)
- [Math](#math)
- [Objects](#objects)
- [Parsing](#parsing)
- [Strings](#strings)
- [Testing](#testing)



## Arrays

**Merge**

Merge the values from one or more arrays or array-like objects onto an array.

- `array` is the array you wish to merge onto.

Any additional arguments supplied will be merged onto the first array.

```javascript
Core.merge(array, ...arrays);
```

**Random Value**

Return a random value from an array.

- `array` is the array you wish to retrieve a value from.

```javascript
const randomValue = Core.randomValue(array);
```

**Unique**

Remove duplicate elements in an array.

- `array` is the array you wish to remove duplicates from.

```javascript
const unique = Core.unique(array);
```

**Wrap**

Create an array from any value.

- `value` is the value you wish to create an array from.

```javascript
const array = Core.wrap(value);
```


## Functions

**Animation**

Create a wrapped version of a function that executes at most once per animation frame (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `leading` is a boolean indicating whether you wish the function to execute on the leading edge of the animation frame, and will default to *false*.

```javascript
const animation = Core.animation(callback, leading);
```

**Debounce**

Create a wrapped version of a function that executes once per wait period (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait between executions.
- `leading` is a boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *false*.

```javascript
const debounced = Core.debounce(callback, wait, leading);
```

**Once**

Create a wrapped version of a function that will only ever execute once.

- `callback` is the function you wish to wrap.

```javascript
const once = Core.once(callback);
```

**Partial**

Create a wrapped version of a function with predefined arguments.

- `callback` is the function you wish to wrap.

Any additional arguments supplied will be passed on as default arguments to the wrapped function. Specify *undefined* for a default argument to allow that argument to be sent to the wrapped function.

```javascript
const partial = Core.partial(callback, ...defaultArgs);
```

**Throttle**

Create a wrapped version of a function that executes at most once per wait period.

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait between executions.
- `leading` is a boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *true*.
- `trailing` is a boolean indicating whether you wish the function to execute on the trailing edge of the wait period, and will default to *true*.

```javascript
const throttled = Core.throttle(callback, wait, leading, trailing);
```

**Times**

Execute a function a specified number of times.

- `callback` is the function you wish to execute.
- `amount` is the number of times you wish the function to execute.

```javascript
Core.times(callback, amount);
```


## Math

**Clamp**

Clamp a value between a min and max.

- `value` is the number you wish to clamp.
- `min` is the number which will be the minimum of the clamped value, and will default to *0*.
- `max` is the number which will be the maximum of the clamped value, and will default to *1*.

```javascript
const clamp = Core.clamp(value, min, max);
```

**Clamp Percent**

Clamp a value between *0* and *100*.

- `value` is the number you wish to clamp.

```javascript
const clampPercent = Core.clampPercent(value);
```

**Distance**

Get the distance between two vectors.

- `x1` is the number to be used as the first X co-ordinate.
- `y1` is the number to be used as the first Y co-ordinate.
- `x2` is the number to be used as the second X co-ordinate.
- `y2` is the number to be used as the second Y co-ordinate.

```javascript
const dist = Core.dist(x1, y1, x2, y2);
```

**Length**

Get the length of an X,Y vector.

- `x` is the number to be used as the X co-ordinate.
- `y` is the number to be used as the Y co-ordinate.

```javascript
const len = Core.len(x, y);
```

**Linear Interpolation**

Linear interpolation from one value to another.

- `min` is the number to be used as the minimum of the "lerped" amount.
- `max` is the number to be used as the maximum of the "lerped" amount.
- `amount` is the amount to "lerp" (between *0* and *1*).

```javascript
const lerp = Core.lerp(min, max, amount);
```

**Linear Percent**

Get the linear percent of a value in a specified range.

- `value` is the number you wish to calculate the linear percent of.
- `min` is the number to be used as the minimum value of the range.
- `max` is the number to be used as the maximum value of the range.

```javascript
const linearPercent = Core.linearPercent(value, min, max);
```

**Linear Value**

Get the linear value of a percent in a specified range.

- `percent` is the number you wish to calculate the linear value of.
- `min` is the number to be used as the minimum value of the range.
- `max` is the number to be used as the maximum value of the range.

```javascript
const linearValue = Core.linearValue(percent, min, max);
```

**Logarithmic Percent**

Get the logarithmic percent of a value in a specified range.

- `value` is the number you wish to calculate the logarithmic percent of.
- `min` is the number to be used as the minimum value of the range.
- `max` is the number to be used as the maximum value of the range.

```javascript
const logPrecent = Core.logPercent(value, min, max);
```

**Logarithmic Value**

Get the logarithmic value of a percent in a specified range.

- `percent` is the number you wish to calculate the logarithmic value of.
- `min` is the number to be used as the minimum value of the range.
- `max` is the number to be used as the maximum value of the range.

```javascript
const logValue = Core.logValue(percent, min, max);
```

**Map**

Map a value from one range to another.

- `value` is the number you wish to map.
- `fromMin` is the number to be used as the minimum value of the current range.
- `fromMax` is the number to be used as the maximum value of the current range.
- `toMin` is the number to be used as the minimum value of the target range.
- `toMax` is the number to be used as the maximum value of the target range.

```javascript
const map = Core.map(value, fromMin, fromMax, toMin, toMax);
```

**Random**

Return a random floating-point number.

- `a` is the number to be used as the minimum value (inclusive).
- `b` is the number to be used as the maximum value (exclusive).

If `b` is omitted, this function will return a random number between *0* (inclusive) and `a` (exclusive).

If both arguments are omitted, this function will return a random number between *0* (inclusive) and *1* (exclusive).

```javascript
const random = Core.random(a, b);
```

**To Step**

Round a number to a specified step-size.

- `value` is the number you wish to constrain to a specified "step".
- `step` is the number to be used as the minimum step-size.

```javascript
const toStep = Core.toStep(value, step);
```


## Objects

**Forget Dot**

Remove a specified key from an object using dot notation.

- `object` is the object you wish to remove a key from.
- `key` is a string using dot notation, indicating the key to remove.

```javascript
Core.forgetDot(object, key);
```

**Get Dot**

Retrieve the value of a specified key from an object using dot notation.

- `object` is the object you wish to retrieve a value from.
- `key` is a string using dot notation, indicating the key to retrieve.
- `defaultValue` is the default value to return if the key does not exist, and will default to *undefined*.

```javascript
const value = Core.getDot(object, key);
```

**Has Dot**

Returns *true* if a specified key exists in an object using dot notation.

- `object` is the object you wish to test for a key.
- `key` is a string using dot notation, indicating the key to test for.

```javascript
const hasKey = Core.hasDot(object, key);
```

**Pluck Dot**

Retrieve values of a specified key from an array of objects using dot notation.

- `objects` is the array of objects you wish to retrieve values from.
- `key` is a string using dot notation, indicating the key to retrieve.
- `defaultValue` is the default value to return if the key does not exist, and will default to *undefined*.

```javascript
const values = Core.pluckDot(objects, key, defaultValue);
```

**Set Dot**

Set a specified value of a key for an object using dot notation.

- `object` is the object you wish to set a value for.
- `key` is a string using dot notation, indicating the key to set the value.
- `value` is the value you wish to set the key to.
- `overwrite` is a boolean indicating whether you wish to overwrite an existing key, and will default to *true*.

```javascript
Core.setDot(object, key, value, overwrite);
```


## Strings

**Camel Case**

Convert a string to camelCase.

- `string` is the string you wish to transform to camelCase.

```javascript
const camelCase = Core.camelCase(string);
```

**Random String**

Return a random string.

- `length` is the length of the random string, and will default to *16*.
- `characters` is a sequence of characters to generate the string from, and will default to *'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789'*.

```javascript
const randomString = Core.randomString(length, characters);
```

**RegEx Escape**

Escape a string for use in RegEx.

- `string` is the string you wish to escape.

```javascript
const regExEscape = Core.regExEscape(string);
```

**Snake Case**

Convert a string to snake-case.

- `string` is the string you wish to transform to snake-case.

```javascript
const snakeCase = Core.snakeCase(string);
```


## Testing

**Is Array Like**

Returns *true* is the value is array-like.

- `value` is the value you wish to test.

```javascript
const isArrayLike = Core.isArrayLike(value);
```

**Is Boolean**

Returns *true* if the value is a boolean.

- `value` is the value you wish to test.

```javascript
const isBoolean = Core.isBoolean(value);
```

**Is Function**

Returns *true* if the value is a function.

- `value` is the value you wish to test.

```javascript
const isFunction = Core.isFunction(value);
```

**Is Numeric**

Returns *true* if the value is numeric.

- `value` is the value you wish to test.

```javascript
const isNumeric = Core.isNumeric(value);
```

**Is Plain Object**

Returns *true* if the value is a plain object.

- `value` is the value you wish to test.

```javascript
const isPlainObject = Core.isPlainObject(value);
```

**Is Object**

Returns *true* if the value is an object.

- `value` is the value you wish to test.

```javascript
const isObject = Core.isObject(value);
```

**Is String**

Returns *true* if the value is a string.

- `value` is the value you wish to test.

```javascript
const isString = Core.isString(value);
```

**Is Window**

Returns *true* if the value is a Window.

- `value` is the value you wish to test.

```javascript
const isWindow = Core.isWindow(value);
```