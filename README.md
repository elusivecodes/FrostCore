# FrostCore

**FrostCore** is a free, open-source utility library for *JavaScript*.

It is a tiny (~2kb gzipped) and modern library, adding various functionality to your JS toolkit for manipulating arrays, functions, objects & more.


## Table Of Contents
- [Installation](#installation)
- [Arrays](#arrays)
- [Functions](#functions)
- [Math](#math)
- [Objects](#objects)
- [Strings](#strings)
- [Testing](#testing)



## Installation

**In Browser**

```html
<script type="text/javascript" src="/path/to/frost-core.min.js"></script>
```

**Using NPM**

```
npm i frostcore
```

In Node.js:

```javascript
const Core = require('frostcore');
```


## Arrays

**Difference**

Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.

- `array` is the array you wish to filter.

Any additional arguments supplied will be used to test for the values of the first array.

```javascript
const diff = Core.diff(array, ...arrays);
```

**Intersect**

Create a new array containing the unique values that exist in all of the passed arrays.

All arguments supplied to this method will be tested for intersections.

```javascript
const intersect = Core.intersect(...arrays);
```

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

**Range**

Return an array containing a range of values.

- `start` is a number indicating the first value of the sequence.
- `end` is a number indicating where the sequence will end.
- `step` is a number indicating the increment between values in the sequence, and will default to *1*.

```javascript
const range = Core.range(start, end, step);
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

The returned animation function has a cancel method which will cancel the callback.

```javascript
animation.cancel();
```

**Compose**

Create a wrapped function that will execute each callback in reverse order, passing the result from each function to the previous.

Any arguments supplied will be added to the chain of callbacks.

```javascript
const composed = Core.compose(...callbacks);
```

**Curry**

Create a wrapped version of a function, that will return new functions until the number of total arguments passed reaches the arguments length of the original function (at which point the function will execute).

- `callback` is the function you wish to wrap.

```javascript
const curried = Core.curry(callback);
```

**Debounce**

Create a wrapped version of a function that executes once per wait period (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait between executions, and will default to *0*.
- `leading` is a boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *false*.
- `trailing` is a boolean indicating whether you wish the function to execute on the trailing edge of the wait period, and will default to *true*.

```javascript
const debounced = Core.debounce(callback, wait, leading, trailing);
```

The returned debounced function has a cancel method which will cancel the (trailing) callback.

```javascript
debounced.cancel();
```

**Evaluate**

Evaluate a value from a function or value.

- `value` is the value to evaluate.

```javascript
const result = Core.evaluate(value);
```

**Once**

Create a wrapped version of a function that will only ever execute once. Subsequent calls to the wrapped function will return the result of the initial call.

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

**Pipe**

Create a wrapped function that will execute each callback in order, passing the result from each function to the next.

Any arguments supplied will be added to the chain of callbacks.

```javascript
const piped = Core.pipe(...callbacks);
```

**Throttle**

Create a wrapped version of a function that executes at most once per wait period (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait between executions, and will default to *0*.
- `leading` is a boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *true*.
- `trailing` is a boolean indicating whether you wish the function to execute on the trailing edge of the wait period, and will default to *true*.

```javascript
const throttled = Core.throttle(callback, wait, leading, trailing);
```

The returned throttled function has a cancel method which will cancel the (trailing) callback.

```javascript
throttled.cancel();
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

**Inverse Linear Interpolation**

Inverse linear interpolation from one value to another.

- `min` is the number to be used as the minimum of the "lerped" amount.
- `max` is the number to be used as the maximum of the "lerped" amount.
- `value` is the value to inverse interpolate.

```javascript
const lerp = Core.inverseLerp(min, max, value);
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
- `amount` is the amount to interpolate (between *0* and *1*).

```javascript
const lerp = Core.lerp(min, max, amount);
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

**Extend**

Merge the values from one or more objects onto an object (recursively).

- `object` is the object you are merging to.

Any additional arguments supplied will be merged onto the first object.

```javascript
Core.extend(object, ...objects);
```

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

**Capitalize**

Convert the first character of string to upper case and the remaining to lower case.

- `string` is the string you wish to capitalize.

```javascript
const capitalized = Core.capitalize(string);
```

**Escape**

Convert HTML special characters in a string to their corresponding HTML entities.

- `string` is the string you wish to escape.

```javascript
const escape = Core.escape(string);
```

**Escape RegExp**

Escape a string for use in RegExp.

- `string` is the string you wish to escape.

```javascript
const escapeRegExp = Core.escapeRegExp(string);
```

**Humanize**

Convert a string to a humanized form.

- `string` is the string you wish to humanize.

```javascript
const humanized = Core.humanize(string);
```

**Kebab Case**

Convert a string to kebab-case.

- `string` is the string you wish to transform to kebab-case.

```javascript
const kebabCase = Core.kebabCase(string);
```

**Pascal Case**

Convert a string to PascalCase.

- `string` is the string you wish to transform to PascalCase.

```javascript
const pascalCase = Core.pascalCase(string);
```

**Random String**

Return a random string.

- `length` is the length of the random string, and will default to *16*.
- `characters` is a sequence of characters to generate the string from, and will default to *'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789'*.

```javascript
const randomString = Core.randomString(length, characters);
```

**Snake Case**

Convert a string to snake_case.

- `string` is the string you wish to transform to snake_case.

```javascript
const snakeCase = Core.snakeCase(string);
```

**Unescape**

Convert HTML entities in a string to their corresponding characters.

- `string` is the string you wish to unescape.

```javascript
const unescape = Core.unescape(string);
```


## Testing

**Is Array**

Returns *true* is the value is an array.

- `value` is the value you wish to test.

```javascript
const isArray = Core.isArray(value);
```

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

**Is Document**

Returns *true* is the value is a *Document*.

- `value` is the value you wish to test.

```javascript
const isDocument = Core.isDocument(value);
```

**Is Element**

Returns *true* is the value is a *HTMLElement*.

- `value` is the value you wish to test.

```javascript
const isElement = Core.isElement(value);
```

**Is Fragment**

Returns *true* if the value is a *DocumentFragment*.

```javascript
const isFragment = Core.isFragment(value);
```

**Is Function**

Returns *true* if the value is a function.

- `value` is the value you wish to test.

```javascript
const isFunction = Core.isFunction(value);
```

**Is NaN**

Returns *true* if the value is *NaN*.

- `value` is the value you wish to test.

```javascript
const isNaN = Core.isNaN(value);
```

**Is Node**

Returns *true* is the value is a *Node*.

- `value` is the value you wish to test.

```javascript
const isNode = Core.isNode(value);
```

**Is Null**

Returns *true* if the value is *null*.

- `value` is the value you wish to test.

```javascript
const isNull = Core.isNull(value);
```

**Is Numeric**

Returns *true* if the value is numeric.

- `value` is the value you wish to test.

```javascript
const isNumeric = Core.isNumeric(value);
```

**Is Object**

Returns *true* if the value is an object.

- `value` is the value you wish to test.

```javascript
const isObject = Core.isObject(value);
```

**Is Plain Object**

Returns *true* if the value is a plain object.

- `value` is the value you wish to test.

```javascript
const isPlainObject = Core.isPlainObject(value);
```

**Is Shadow**

Returns *true* if the value is a *ShadowRoot*.

```javascript
const isShadow = Core.isShadow(value);
```

**Is Text**

Returns *true* if the value is a text *Node*.

```javascript
const isText = Core.isText(value);
```

**Is String**

Returns *true* if the value is a string.

- `value` is the value you wish to test.

```javascript
const isString = Core.isString(value);
```

**Is Undefined**

Returns *true* if the value is *undefined*.

- `value` is the value you wish to test.

```javascript
const isUndefined = Core.isUndefined(value);
```

**Is Window**

Returns *true* if the value is a *Window*.

- `value` is the value you wish to test.

```javascript
const isWindow = Core.isWindow(value);
```