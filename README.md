# FrostCore

**FrostCore** is a free, open-source utility library for *JavaScript*.

It is a lightweight (~2kb) and modern library, adding various functionality to your JS toolkit for manipulating Arrays, functions, Objects & more.


## Table of contents
- [Arrays](#arrays)
- [Functions](#functions)
- [Math](#math)
- [Objects](#objects)
- [Parsing](#parsing)
- [Strings](#strings)
- [Testing](#testing)



## Arrays

**Unique**

Remove duplicate elements in an Array.

- `array` is an Array you wish to remove duplicates from.

```javascript
const unique = Core.unique(array);
```

**Wrap**

Create an Array from any value.

- `value` is the value you wish to create an Array from.

```javascript
const array = Core.wrap(value);
```


## Functions

**Animation**

Create a wrapped version of a function that executes at most once per animation frame (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `leading` is a Boolean indicating whether you wish the function to execute on the leading edge of the animation frame, and will default to *false*.

```javascript
const animation = Core.animation(callback, leading);
```

**Debounce**

Create a wrapped version of a function that executes once per wait period (using the most recent arguments passed to it).

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait between executions.
- `leading` is a Boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *false*.

```javascript
const debounced = Core.debounce(callback, wait, leading);
```

**Defer**

Create a wrapped version of a function that executes on the next cycle of the event queue.

- `callback` is the function you wish to wrap.

Any additional arguments supplied will be passed on as default arguments to the wrapped function.

```javascript
const deferred = Core.defer(callback, ...defaultArgs);
```

**Delay**

Create a wrapped version of a function that executes after a wait period.

- `callback` is the function you wish to wrap.
- `wait` is the number of milliseconds to wait before execution.

Any additional arguments supplied will be passed on as default arguments to the wrapped function.

```javascript
const delayed = Core.delay(callback, wait, ...defaultArgs);
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
- `leading` is a Boolean indicating whether you wish the function to execute on the leading edge of the wait period, and will default to *true*.
- `trailing` is a Boolean indicating whether you wish the function to execute on the trailing edge of the wait period, and will default to *true*.

```javascript
const throttled = Core.throttle(callback, wait, leading, trailing);
```


## Math

**Clamp**

Clamp a value between a min and max.

- `value` is a number you wish to clamp.
- `min` is a number which will be the minimum of the clamped value, and will default to *0*.
- `max` is a number which will be the maximum of the clamped value, and will default to *1*.

```javascript
const clamp = Core.clamp(value, min = 0, max = 1);
```

**Clamp Percent**

Clamp a value between 0 and 100.

- `value` is a number you wish to clamp.

```javascript
const clampPercent = Core.clampPercent(value);
```

**Distance**

Get the distance between two vectors.

- `x1` is a number containing the first X co-ordinate.
- `y1` is a number containing the first Y co-ordinate.
- `x2` is a number containing the second X co-ordinate.
- `y2` is a number containing the second Y co-ordinate.

```javascript
const dist = Core.dist(x1, y1, x2, y2);
```

**Length**

Get the length of an X,Y vector.

- `x` is a number containing the X co-ordinate.
- `y` is a number containing the Y co-ordinate.

```javascript
const len = Core.len(x, y);
```

**Linear Interpolation**

Linear interpolation from one value to another.

- `min` is a number to be used as the minimum of the "lerped" amount.
- `max` is a number to be used as the maximum of the "lerped" amount.
- `amount` is the amount to "lerp" (between 0 and 1).

```javascript
const lerp = Core.lerp(min, max, amount);
```

**Map**

Map a value from one range to another.

- `value` is a number you wish to map.
- `fromMin` is a number to be used as the minimum amount of the "from" range.
- `fromMax` is a number to be used as the maximum amount of the "from" range.
- `toMin` is a number to be used as the minimum amount of the "to" range.
- `toMax` is a number to be used as the maximum amount of the "to" range.

```javascript
const map = Core.map(value, fromMin, fromMax, toMin, toMax);
```

**To Step**

Round a number to a specified step-size.

- `value` is a number you wish to constrain to a specified "step".
- `step` is a number to be used as the minimum step-size.

```javascript
const toStep = Core.toStep(value, step);
```

**Linear Percent**

Get the linear percent of a value in a specified range.

- `value` is a number you wish to calculate the linear percent of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const linearPercent = Core.linearPercent(value, min, max);
```

**Linear Value**

Get the linear value of a percent in a specified range.

- `percent` is a number you wish to calculate the linear value of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const linearValue = Core.linearValue(percent, min, max);
```

**Logarithmic Percent**

Get the logarithmic percent of a value in a specified range.

- `value` is a number you wish to calculate the logarithmic percent of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const logPrecent = Core.logPercent(value, min, max);
```

**Logarithmic Value**

Get the logarithmic value of a percent in a specified range.

- `percent` is a number you wish to calculate the logarithmic value of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const logValue = Core.logValue(percent, min, max);
```


## Objects

**Forget Dot**

Remove a specified key from an Object using dot notation.

- `object` is the Object you wish to remove a key from.
- `key` is a string using dot notation, indicating the key to remove.

```javascript
Core.forgetDot(object, key);
```

**Get Dot**

Retrieve the value of a specified key from an Object using dot notation.

- `object` is the Object you wish to retrieve a value from.
- `key` is a string using dot notation, indicating the key to retrieve.
- `defaultValue` is the default value to return if the key does not exist, and will default to *undefined*.

```javascript
const value = Core.getDot(object, key);
```

**Has Dot**

Returns *true* if a specified key exists in an Object using dot notation.

- `object` is the Object you wish to test for a key.
- `key` is a string using dot notation, indicating the key to test for.

```javascript
const hasKey = Core.hasDot(object, key);
```

**Pluck Dot**

Retrieve values of a specified key from an Array of Objects using dot notation.

- `objects` is an Array of Objects you wish to retrieve values from.
- `key` is a string using dot notation, indicating the key to retrieve.
- `defaultValue` is the default value to return if the key does not exist, and will default to *undefined*.

```javascript
const values = Core.pluckDot(objects, key, defaultValue);
```

**Set Dot**

Set a specified value of a key for an object using dot notation.

- `object` is the Object you wish to set a value for.
- `key` is a string using dot notation, indicating the key to set the value.
- `value` is the value you wish to set the key to.
- `overwrite` is a Boolean indicating whether you wish to overwrite an existing key, and will default to *true*.

```javascript
Core.setDot(object, key, value, overwrite);
```


## Parsing

**Parse HTML**

Create a Document object from a HTML string.

- `html` is a string indicating the HTML to parse.

```javascript
const htmlDoc = Core.parseHTML(html);
```


**Parse XML**

Create a Document object from an XML string.

- `xml` is a string indicating the XML to parse.

```javascript
const xmlDoc = Core.parseXML(html);
```


## Strings

**Camel Case**

Convert a string to camelCase.

- `string` is a string you wish to transform to camelCase.

```javascript
const camelCase = Core.camelCase(string);
```

**Snake Case**

Convert a string to snake-case.

- `string` is a string you wish to transform to snake-case.

```javascript
const snakeCase = Core.snakeCase(string);
```


## Testing

**Is Array Like**

Returns *true* is the value is Array-like.

- `value` is the value you wish to test.

```javascript
const isArrayLike = Core.isArrayLike(value);
```

**Is Boolean**

Returns *true* if the value is a Boolean.

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

Returns *true* if the value is a plain Object.

- `value` is the value you wish to test.

```javascript
const isPlainObject = Core.isPlainObject(value);
```

**Is Object**

Returns *true* if the value is an Object.

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
