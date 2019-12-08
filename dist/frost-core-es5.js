"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostCore v1.0.0
 * https://github.com/elusivecodes/FrostCore
 */
(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory(global);
  } else {
    global.Core = factory(global);
  }
})(void 0, function (window) {
  'use strict';

  var Core = {};
  /**
   * Array methods
   */

  /**
   * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
   * @param {array} array The input array.
   * @param {...array} arrays The arrays to compare against.
   * @returns {array} The output array.
   */

  Core.diff = function (array) {
    for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arrays[_key - 1] = arguments[_key];
    }

    arrays = arrays.map(Core.unique);
    return array.filter(function (value) {
      return !arrays.some(function (other) {
        return other.includes(value);
      });
    });
  };
  /**
   * Create a new array containing the unique values that exist in all of the passed arrays.
   * @param {...array} arrays The input arrays.
   * @returns {array} The output array.
   */


  Core.intersect = function () {
    for (var _len2 = arguments.length, arrays = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      arrays[_key2] = arguments[_key2];
    }

    return Core.unique(arrays.reduce(function (acc, array, index) {
      array = Core.unique(array);
      return Core.merge(acc, array.filter(function (value) {
        return arrays.every(function (other, otherIndex) {
          return index == otherIndex || other.includes(value);
        });
      }));
    }, []));
  };
  /**
   * Merge the values from one or more arrays or array-like objects onto an array.
   * @param {array} array The input array.
   * @param {...array|...object} arrays The arrays or array-like objects to merge.
   * @returns {array} The output array.
   */


  Core.merge = function () {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    for (var _len3 = arguments.length, arrays = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      arrays[_key3 - 1] = arguments[_key3];
    }

    return arrays.reduce(function (acc, other) {
      Array.prototype.push.apply(acc, other);
      return array;
    }, array);
  };
  /**
   * Return a random value from an array.
   * @param {array} array The input array.
   * @returns {*} A random value from the array, or null if it is empty.
   */


  Core.randomValue = function (array) {
    return array.length ? array[Core.randomInt(array.length)] : null;
  };
  /**
   * Return an array containing a range of values.
   * @param {number} start The first value of the sequence.
   * @param {number} end The value to end the sequence on.
   * @param {number} [step=1] The increment between values in the sequence.
   * @returns {number[]} The array of values from start to end.
   */


  Core.range = function (start, end) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var sign = Math.sign(end - start);
    return new Array(Math.abs(end - start) / step + 1 | 0).fill().map(function (_, i) {
      return start + Core.toStep(i * step * sign, step);
    });
  };
  /**
   * Remove duplicate elements in an array.
   * @param {array} array The input array.
   * @returns {array} The filtered array.
   */


  Core.unique = function (array) {
    return Array.from(new Set(array));
  };
  /**
   * Create an array from any value.
   * @param {*} value The input value.
   * @returns {array} The wrapped array.
   */


  Core.wrap = function (value) {
    return Core.isUndefined(value) ? [] : Core.isArray(value) ? value : Core.isArrayLike(value) ? Core.merge([], value) : [value];
  };
  /**
   * Function methods
   */

  /**
   * Create a wrapped version of a function that executes at most once per animation frame
   * (using the most recent arguments passed to it).
   * @param {function} callback Callback function to execute.
   * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
   * @returns {function} The wrapped function.
   */


  Core.animation = function (callback, leading) {
    var newArgs, running;
    return function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      newArgs = args;

      if (running) {
        return;
      }

      if (leading) {
        callback.apply(void 0, _toConsumableArray(newArgs));
      }

      running = true;

      Core._requestAnimationFrame(function (_) {
        running = false;

        if (!leading) {
          callback.apply(void 0, _toConsumableArray(newArgs));
        }
      });
    };
  };
  /**
   * Create a wrapped function that will execute each callback in reverse order,
   * passing the result from each function to the previous.
   * @param {...function} callbacks Callback functions to execute.
   * @returns {function} The wrapped function.
   */


  Core.compose = function () {
    for (var _len5 = arguments.length, callbacks = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      callbacks[_key5] = arguments[_key5];
    }

    return function (arg) {
      return callbacks.reduceRight(function (acc, callback) {
        return callback(acc);
      }, arg);
    };
  };
  /**
   * Create a wrapped version of a function, that will return new functions
   * until the number of total arguments passed reaches the arguments length
   * of the original function (at which point the function will execute).
   * @param {function} callback Callback function to execute.
   * @returns {function} The wrapped function.
   */


  Core.curry = function (callback) {
    var curried = function curried() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return args.length >= callback.length ? callback.apply(void 0, args) : function () {
        for (var _len7 = arguments.length, newArgs = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          newArgs[_key7] = arguments[_key7];
        }

        return curried.apply(void 0, _toConsumableArray(args.concat(newArgs)));
      };
    };

    return curried;
  };
  /**
   * Create a wrapped version of a function that executes once per wait period
   * (using the most recent arguments passed to it).
   * @param {function} callback Callback function to execute.
   * @param {number} wait The number of milliseconds to wait until next execution.
   * @param {Boolean} [leading] Whether to execute on the leading edge of the wait period.
   * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
   * @returns {function} The wrapped function.
   */


  Core.debounce = function (callback, wait, leading) {
    var trailing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var lastRan, newArgs, running;
    return function () {
      var now = Date.now();
      var delta = lastRan ? lastRan - now : null;

      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      if (leading && (delta === null || delta >= wait)) {
        lastRan = now;
        callback.apply(void 0, args);
        return;
      }

      newArgs = args;

      if (running || !trailing) {
        return;
      }

      running = true;
      setTimeout(function (_) {
        running = false;
        lastRan = Date.now();
        callback.apply(void 0, _toConsumableArray(newArgs));
      }, delta);
    };
  };
  /**
   * Create a wrapped version of a function that will only ever execute once.
   * @param {function} callback Callback function to execute.
   * @returns {function} The wrapped function.
   */


  Core.once = function (callback) {
    var ran;
    return function () {
      if (ran) {
        return;
      }

      ran = true;
      return callback.apply(void 0, arguments);
    };
  };
  /**
   * Create a wrapped version of a function with predefined arguments.
   * @param {function} callback Callback function to execute.
   * @param {...*} [defaultArgs] Default arguments to pass to the function.
   * @returns {function} The wrapped function.
   */


  Core.partial = function (callback) {
    for (var _len9 = arguments.length, defaultArgs = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      defaultArgs[_key9 - 1] = arguments[_key9];
    }

    return function () {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return callback.apply(void 0, _toConsumableArray(defaultArgs.slice().map(function (v) {
        return Core.isUndefined(v) ? args.shift() : v;
      }).concat(args)));
    };
  };
  /**
   * Create a wrapped function that will execute each callback in order,
   * passing the result from each function to the next.
   * @param {...function} callbacks Callback functions to execute.
   * @returns {function} The wrapped function.
   */


  Core.pipe = function () {
    for (var _len11 = arguments.length, callbacks = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      callbacks[_key11] = arguments[_key11];
    }

    return function (arg) {
      return callbacks.reduce(function (acc, callback) {
        return callback(acc);
      }, arg);
    };
  };
  /**
   * Create a wrapped version of a function that executes at most once per wait period.
   * (using the most recent arguments passed to it).
   * @param {function} callback Callback function to execute.
   * @param {number} wait The number of milliseconds to wait until next execution.
   * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
   * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
   * @returns {function} The wrapped function.
   */


  Core.throttle = function (callback, wait) {
    var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var trailing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return Core.debounce(callback, wait, leading, trailing);
  };
  /**
   * Execute a function a specified number of times.
   * @param {function} callback Callback function to execute.
   * @param {number} amount The amount of times to execute the callback.
   */


  Core.times = function (callback, amount) {
    while (amount--) {
      if (callback() === false) {
        break;
      }
    }
  };
  /**
   * Execute a callback on the next animation frame
   * @param {function} callback Callback function to execute.
   */


  Core._requestAnimationFrame = 'requestAnimationFrame' in window ? window.requestAnimationFrame : function (callback) {
    return setTimeout(callback, 1000 / 60);
  };
  /**
   * Math methods
   */

  /**
   * Clamp a value between a min and max.
   * @param {number} value The value to clamp.
   * @param {number} [min=0] The minimum value of the clamped range.
   * @param {number} [max=1] The maximum value of the clamped range.
   * @returns {number} The clamped value.
   */

  Core.clamp = function (value) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  };
  /**
   * Clamp a value between 0 and 100.
   * @param {number} value The value to clamp.
   * @returns {number} The clamped value.
   */


  Core.clampPercent = function (value) {
    return Core.clamp(value, 0, 100);
  };
  /**
   * Get the distance between two vectors.
   * @param {number} x1 The first vector X co-ordinate.
   * @param {number} y1 The first vector Y co-ordinate.
   * @param {number} x2 The second vector X co-ordinate.
   * @param {number} y2 The second vector Y co-ordinate.
   * @returns {number} The distance between the vectors.
   */


  Core.dist = function (x1, y1, x2, y2) {
    return Core.len(x1 - x2, y1 - y2);
  };
  /**
   * Get the length of an X,Y vector.
   * @param {number} x The X co-ordinate.
   * @param {number} y The Y co-ordinate.
   * @returns {number} The length of the vector.
   */


  Core.len = Math.hypot;
  /**
   * Linear interpolation from one value to another.
   * @param {number} v1 The starting value.
   * @param {number} v2 The ending value.
   * @param {number} amount The amount to interpolate.
   * @returns {number} The interpolated value.
   */

  Core.lerp = function (v1, v2, amount) {
    return v1 * (1 - amount) + v2 * amount;
  };
  /**
   * Get the linear percent of a value in a specified range.
   * @param {number} value The value to process.
   * @param {number} min The minimum of the range.
   * @param {number} max The maximum of the range.
   * @returns {number} The linear percent.
   */


  Core.linearPercent = function (value, min, max) {
    return min === max ? 0 : Core.clampPercent(100 * (value - min) / (max - min));
  };
  /**
   * Get the linear value of a percent in a specified range.
   * @param {number} percent The percent to process.
   * @param {number} min The minimum of the range.
   * @param {number} max The maximum of the range.
   * @returns {number} The linear value.
   */


  Core.linearValue = function (percent, min, max) {
    return min === max ? min : Core.clamp(min + percent / 100 * (max - min), Math.min(min, max), Math.max(min, max));
  };
  /**
   * Get the logarithmic percent of a value in a specified range.
   * @param {number} value The value to process.
   * @param {number} min The minimum of the range.
   * @param {number} max The maximum of the range.
   * @returns {number} The logarithmic percent.
   */


  Core.logPercent = function (value, min, max) {
    if (min === max) {
      return 0;
    }

    min = min ? Math.log(min) : 0;
    return Core.clampPercent(100 * ((value ? Math.log(value) : 0) - min) / (Math.log(max) - min));
  };
  /**
   * Get the logarithmic value of a percent in a specified range.
   * @param {number} percent The percent to process.
   * @param {number} min The minimum of the range.
   * @param {number} max The maximum of the range.
   * @returns {number} The logarithmic value;
   */


  Core.logValue = function (percent, min, max) {
    min = min ? Math.log(min) : 0;
    return Core.clamp(Math.exp(min + (Math.log(max) - min) * percent / 100), min, max);
  };
  /**
   * Map a value from one range to another.
   * @param {number} value The value to map.
   * @param {number} fromMin The minimum value of the current range.
   * @param {number} fromMax The maximum value of the current range.
   * @param {number} toMin The minimum value of the target range.
   * @param {number} toMax The maximum value of the target range.
   * @returns {number} The mapped value.
   */


  Core.map = function (value, fromMin, fromMax, toMin, toMax) {
    return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
  };
  /**
   * Return a random floating-point number.
   * @param {number} [a=1] The minimum value (inclusive).
   * @param {number} [b] The maximum value (exclusive).
   * @returns {number} A random number.
   */


  Core.random = function () {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return Core.isNull(b) ? Math.random() * a : Core.map(Math.random(), 0, 1, a, b);
  };
  /**
   * Return a random number.
   * @param {number} [a=1] The minimum value (inclusive).
   * @param {number} [b] The maximum value (exclusive).
   * @returns {number} A random number.
   */


  Core.randomInt = function () {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return Core.random(a, b) | 0;
  };
  /**
   * Constrain a number to a specified step-size.
   * @param {number} value The value to constrain.
   * @param {number} step The minimum step-size.
   * @returns {number} The constrained value.
   */


  Core.toStep = function (value) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.01;
    return parseFloat((Math.round(value / step) * step).toFixed("".concat(step).replace('\d*\.?/', '').length));
  };
  /**
   * Object methods
   */

  /**
   * Merge the values from one or more objects onto an object (recursively).
   * @param {object} object The input object.
   * @param {...object} objects The objects to merge.
   * @returns {object} The output objects.
   */


  Core.extend = function (object) {
    for (var _len12 = arguments.length, objects = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      objects[_key12 - 1] = arguments[_key12];
    }

    return objects.reduce(function (acc, val) {
      for (var k in val) {
        if (k in acc && Core.isObject(acc[k]) && Core.isObject(val[k])) {
          Core.extend(acc[k], val[k]);
        } else {
          acc[k] = val[k];
        }
      }

      return acc;
    }, object);
  };
  /**
   * Remove a specified key from an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to remove from the object.
   */


  Core.forgetDot = function (object, key) {
    var keys = key.split('.');

    while (key = keys.shift()) {
      if (!Core.isObject(object) || !(key in object)) {
        break;
      }

      if (keys.length) {
        object = object[key];
      } else {
        delete object[key];
      }
    }
  };
  /**
   * Retrieve the value of a specified key from an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to retrieve from the object.
   * @param {*} [defaultValue] The default value if key does not exist.
   * @returns {*} The value retrieved from the object.
   */


  Core.getDot = function (object, key, defaultValue) {
    var keys = key.split('.');

    while (key = keys.shift()) {
      if (!Core.isObject(object) || !(key in object)) {
        return defaultValue;
      }

      object = object[key];
    }

    return object;
  };
  /**
   * Returns true if a specified key exists in an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to test for in the object.
   * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
   */


  Core.hasDot = function (object, key) {
    var keys = key.split('.');

    while (key = keys.shift()) {
      if (!Core.isObject(object) || !(key in object)) {
        return false;
      }

      object = object[key];
    }

    return true;
  };
  /**
   * Retrieve values of a specified key from an array of objects using dot notation.
   * @param {object[]} objects The input objects.
   * @param {string} key The key to retrieve from the objects.
   * @param {*} [defaultValue] The default value if key does not exist.
   * @returns {array} An array of values retrieved from the objects.
   */


  Core.pluckDot = function (objects, key, defaultValue) {
    return objects.map(function (pointer) {
      return Core.getDot(pointer, key, defaultValue);
    });
  };
  /**
   * Set a specified value of a key for an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to set in the object.
   * @param {*} value The value to set.
   * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
   */


  Core.setDot = function (object, key, value) {
    var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var keys = key.split('.');

    while (key = keys.shift()) {
      if (key === '*') {
        for (var k in object) {
          Core.setDot(object, [k].concat(keys).join('.'), value, overwrite);
        }

        return;
      }

      if (keys.length) {
        if (!Core.isObject(object[key]) || !(key in object)) {
          object[key] = {};
        }

        object = object[key];
      } else if (overwrite || !(key in object)) {
        object[key] = value;
      }
    }
  };
  /**
   * String methods
   */

  /**
   * Convert a string to camelCase.
   * @param {string} string The input string.
   * @returns {string} The camelCased string.
   */


  Core.camelCase = function (string) {
    return Core._splitString(string).map(function (word, index) {
      return index ? word.charAt(0).toUpperCase() + word.substring(1) : word;
    }).join('');
  };
  /**
   * Convert HTML special characters in a string to their corresponding HTML entities.
   * @param {string} string The input string.
   * @returns {string} The escaped string.
   */


  Core.escape = function (string) {
    return string.replace(Core._escapeRegExp, function (match) {
      return Core._escapeChars[match];
    });
  };
  /**
   * Escape RegExp special characters in a string.
   * @param {string} string The string to escape.
   * @returns {string} The escaped string.
   */


  Core.escapeRegExp = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  /**
   * Convert a string to PascalCase.
   * @param {string} string The input string.
   * @returns {string} The camelCased string.
   */


  Core.pascalCase = function (string) {
    return Core._splitString(string).map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    }).join('');
  };
  /**
   * Return a random string.
   * @param {number} [length=16] The length of the output string.
   * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
   * @returns {string} The random string.
   */


  Core.randomString = function () {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789';
    return new Array(length).fill().map(function (_) {
      return chars[Core.random(chars.length) | 0];
    }).join('');
  };
  /**
   * Convert a string to snake-case.
   * @param {string} string The input string.
   * @returns {string} The snake-cased string.
   */


  Core.snakeCase = function (string) {
    return Core._splitString(string).join('-').toLowerCase();
  };
  /**
   * Convert a string to underscored.
   * @param {string} string The input string.
   * @returns {string} The underscored string.
   */


  Core.underscore = function (string) {
    return Core._splitString(string).join('_').toLowerCase();
  };
  /**
   * Convert HTML entities in a string to their corresponding characters.
   * @param {string} string The input string.
   * @returns {string} The unescaped string.
   */


  Core.unescape = function (string) {
    return string.replace(Core._unescapeRegExp, function (_, code) {
      return Core._unescapeChars[code];
    });
  };
  /**
   * Split a string into individual words.
   * @param {string} string The input string.
   * @returns {string[]} The split parts of the string.
   */


  Core._splitString = function (string) {
    return "".concat(string).split(/[^a-zA-Z0-9']|(?=[A-Z])/).reduce(function (acc, word) {
      word = word.replace(/[^\w]/, '').toLowerCase();

      if (word) {
        acc.push(word);
      }

      return acc;
    }, []);
  };
  /**
   * Testing methods
   */

  /**
   * Returns true if the value is an array.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
   */


  Core.isArray = Array.isArray;
  /**
   * Returns true if the value is array-like.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
   */

  Core.isArrayLike = function (value) {
    return Core.isArray(value) || Core.isObject(value) && !Core.isFunction(value) && !Core.isWindow(value) && !Core.isElement(value) && (Symbol.iterator in value && Core.isFunction(value[Symbol.iterator]) || 'length' in value && Core.isNumeric(value.length) && (!value.length || value.length - 1 in value));
  };
  /**
   * Returns true if the value is a Boolean.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is boolean, otherwise FALSE.
   */


  Core.isBoolean = function (value) {
    return value === !!value;
  };
  /**
   * Returns true if the value is a Document.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
   */


  Core.isDocument = function (value) {
    return !!value && value.nodeType === Core.DOCUMENT_NODE;
  };
  /**
   * Returns true if the value is a HTMLElement.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
   */


  Core.isElement = function (value) {
    return !!value && value.nodeType === Core.ELEMENT_NODE;
  };
  /**
   * Returns true if the value is a DocumentFragment.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
   */


  Core.isFragment = function (value) {
    return !!value && value.nodeType === Core.DOCUMENT_FRAGMENT_NODE && !value.host;
  };
  /**
   * Returns true if the value is a function.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
   */


  Core.isFunction = function (value) {
    return typeof value === 'function';
  };
  /**
   * Returns true if the value is NaN.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
   */


  Core.isNaN = Number.isNaN;
  /**
   * Returns true if the value is a Node.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
   */

  Core.isNode = function (value) {
    return !!value && (value.nodeType === Core.ELEMENT_NODE || value.nodeType === Core.TEXT_NODE || value.nodeType === Core.COMMENT_NODE);
  };
  /**
   * Returns true if the value is null.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
   */


  Core.isNull = function (value) {
    return value === null;
  };
  /**
   * Returns true if the value is numeric.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
   */


  Core.isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  /**
   * Returns true if the value is a plain object.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
   */


  Core.isPlainObject = function (value) {
    return !!value && value.constructor === Object;
  };
  /**
   * Returns true if the value is an object.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
   */


  Core.isObject = function (value) {
    return !!value && value === Object(value);
  };
  /**
   * Returns true if the value is a ShadowRoot.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
   */


  Core.isShadow = function (value) {
    return !!value && value.nodeType === Core.DOCUMENT_FRAGMENT_NODE && !!value.host;
  };
  /**
   * Returns true if the value is a string.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
   */


  Core.isString = function (value) {
    return value === "".concat(value);
  };
  /**
   * Returns true if the value is undefined.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
   */


  Core.isUndefined = function (value) {
    return value === undefined;
  };
  /**
   * Returns true if the value is a Window.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
   */


  Core.isWindow = function (value) {
    return !!value && !!value.document && value.document.defaultView === value;
  };
  /**
   * Core Properties
   */
  // Node type constants


  Core.ELEMENT_NODE = 1;
  Core.TEXT_NODE = 3;
  Core.COMMENT_NODE = 8;
  Core.DOCUMENT_NODE = 9;
  Core.DOCUMENT_FRAGMENT_NODE = 11; // HTML escape regex

  Core._escapeRegExp = /[&<>"']/g;
  Core._unescapeRegExp = /\&(amp|lt|gt|quot|apos);/g; // HTML escape characters

  Core._escapeChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;'
  };
  Core._unescapeChars = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'apos': '\''
  };
  return Core;
});