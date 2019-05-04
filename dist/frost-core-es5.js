"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostCore v1.0.6
 * https://github.com/elusivecodes/FrostCore
 */
(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    global.Core = factory();
  }
})(void 0, function () {
  'use strict';

  var Core = {};
  /**
   * Array methods
   */

  /**
   * Merge the values from one or more arrays or array-like objects onto an array.
   * @param {array} array The input array.
   * @param {...array|...object} arrays The arrays or array-like objects to merge.
   * @returns {array} The output array.
   */

  Core.merge = function () {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arrays[_key - 1] = arguments[_key];
    }

    for (var _i = 0, _arrays = arrays; _i < _arrays.length; _i++) {
      var arr = _arrays[_i];
      Array.prototype.push.apply(array, arr);
    }

    return array;
  };
  /**
   * Return a random value from an array.
   * @param {array} array The input array.
   * @returns {*} A random value from the array, or null if it is empty.
   */


  Core.randomValue = function (array) {
    return array.length ? array[Core.random(array.length) | 0] : null;
  };
  /**
   * Remove duplicate elements in an array.
   * @param {array} array The input array.
   * @returns {array} The filtered array.
   */


  Core.unique = function (array) {
    return Core.merge([], new Set(array));
  };
  /**
   * Create an array from any value.
   * @param {*} value The input value.
   * @returns {array} The wrapped array.
   */


  Core.wrap = function (value) {
    if (Core.isArray(value)) {
      return value;
    }

    if (Core.isArrayLike(value)) {
      return Core.merge([], value);
    }

    return [value];
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
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      newArgs = args;

      if (running) {
        return;
      }

      running = true;
      window.requestAnimationFrame(function (_) {
        running = false;

        if (!leading) {
          callback.apply(void 0, _toConsumableArray(newArgs));
        }
      });

      if (leading) {
        callback.apply(void 0, _toConsumableArray(newArgs));
      }
    };
  };
  /**
   * Create a wrapped version of a function that executes once per wait period
   * (using the most recent arguments passed to it).
   * @param {function} callback Callback function to execute.
   * @param {number} wait The number of milliseconds to wait until next execution.
   * @param {Boolean} [leading] Whether to execute on the leading edge of the wait period.
   * @returns {function} The wrapped function.
   */


  Core.debounce = function (callback, wait, leading) {
    var newArgs,
        running,
        runLead = leading;
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      newArgs = args;

      if (running) {
        runLead = false;
        return;
      }

      if (runLead) {
        callback.apply(void 0, _toConsumableArray(newArgs));
      }

      running = true;
      setTimeout(function (_) {
        if (!runLead) {
          callback.apply(void 0, _toConsumableArray(newArgs));
        }

        running = false;
        runLead = leading;
      }, wait);
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
    for (var _len4 = arguments.length, defaultArgs = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      defaultArgs[_key4 - 1] = arguments[_key4];
    }

    return function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return callback.apply(void 0, _toConsumableArray(defaultArgs.slice().map(function (v) {
        return v === undefined ? args.shift() : v;
      }).concat(args)));
    };
  };
  /**
   * Create a wrapped version of a function that executes at most once per wait period.
   * @param {function} callback Callback function to execute.
   * @param {number} wait The number of milliseconds to wait until next execution.
   * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
   * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
   * @returns {function} The wrapped function.
   */


  Core.throttle = function (callback, wait) {
    var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var trailing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var ran, running;
    return function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      if (running) {
        return;
      }

      if (leading && (!ran || !trailing)) {
        ran = true;
        callback.apply(void 0, args);
      }

      running = true;
      setTimeout(function (_) {
        if (trailing) {
          callback.apply(void 0, args);
        }

        running = false;
      }, wait);
    };
  };
  /**
   * Execute a function a specified number of times.
   * @param {function} callback Callback function to execute.
   * @param {number} amount The amount of times to execute the callback.
   */


  Core.times = function (callback, amount) {
    for (var i = 0; i < amount; i++) {
      if (callback() === false) {
        break;
      }
    }
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


  Core.len = function (x, y) {
    return Math.hypot(x, y);
  };
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
    return Core.clamp(min + percent / 100 * (max - min), min, max);
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
    return b === null ? Math.random() * a : Core.map(Math.random(), 0, 1, a, b);
  };
  /**
   * Constrain a number to a specified step-size.
   * @param {number} value The value to constrain.
   * @param {number} step The minimum step-size.
   * @returns {number} The constrained value.
   */


  Core.toStep = function (value) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.01;
    return Math.round(value / step) * step;
  };
  /**
   * Object methods
   */

  /**
   * Remove a specified key from an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to remove from the object.
   */


  Core.forgetDot = function (object, key) {
    var pointer = object;
    var keys = key.split('.');

    while (key = keys.shift()) {
      if (!Core.isObject(pointer) || !(key in pointer)) {
        break;
      }

      if (keys.length) {
        pointer = pointer[key];
      } else {
        delete pointer[key];
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
    var pointer = object;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = key.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        key = _step.value;

        if (!Core.isObject(pointer) || !(key in pointer)) {
          return defaultValue;
        }

        pointer = pointer[key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return pointer;
  };
  /**
   * Returns true if a specified key exists in an object using dot notation.
   * @param {object} object The input object.
   * @param {string} key The key to test for in the object.
   * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
   */


  Core.hasDot = function (object, key) {
    var pointer = object;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = key.split('.')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        key = _step2.value;

        if (!Core.isObject(pointer) || !(key in pointer)) {
          return false;
        }

        pointer = pointer[key];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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
    var pointer = object,
        current;
    var keys = key.split('.');

    while (current = keys.shift()) {
      if (current === '*') {
        for (var k in pointer) {
          Core.setDot(pointer, [k].concat(keys).join('.'), value, overwrite);
        }

        return;
      }

      if (keys.length) {
        if (!Core.isObject(pointer[current]) || !(current in pointer)) {
          pointer[current] = {};
        }

        pointer = pointer[current];
      } else if (overwrite || !(current in pointer)) {
        pointer[current] = value;
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
   * Return an escaped string for use in RegEx.
   * @param {string} string The string to escape.
   * @returns {string} The escaped string.
   */


  Core.regExEscape = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  /**
   * Convert a string to snake-case.
   * @param {string} string The input string.
   * @returns {string} The snake-cased string.
   */


  Core.snakeCase = function (string) {
    return Core._splitString(string).join('-');
  };
  /**
   * Convert a string to underscored.
   * @param {string} string The input string.
   * @returns {string} The underscored string.
   */


  Core.underscore = function (string) {
    return Core._splitString(string).join('_');
  };
  /**
   * Split a string into individual words.
   * @param {string} string The input string.
   * @returns {string[]} The split parts of the string.
   */


  Core._splitString = function (string) {
    return "".concat(string).split(/[^a-zA-Z0-9'"]/).filter(function (word) {
      return word;
    }).flatMap(function (word) {
      return word.split(/(?=[A-Z])/);
    }).map(function (word) {
      return word.replace(/[^\w]/, '').toLowerCase();
    });
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
    return Core.isArray(value) || !Core.isFunction(value) && !Core.isWindow(value) && !Core.isElement(value) && Core.isObject(value) && (Symbol.iterator in value && Core.isFunction(value[Symbol.iterator]) || 'length' in value && Core.isNumeric(value.length) && (!value.length || value.length - 1 in value));
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
    return Core.isObject(value) && value.nodeType === Node.DOCUMENT_NODE;
  };
  /**
   * Returns true if the value is a HTMLElement.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
   */


  Core.isElement = function (value) {
    return !!value && value.nodeType === Node.ELEMENT_NODE;
  };
  /**
   * Returns true if the value is a DocumentFragment.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
   */


  Core.isShadow = function (value) {
    return !!value && value.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !value.host;
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
   * Returns true if the value is a Node.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
   */


  Core.isNode = function (value) {
    return !!value && (value.nodeType === Node.ELEMENT_NODE || value.nodeType === Node.TEXT_NODE || value.nodeType === Node.COMMENT_NODE);
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
    return value === Object(value);
  };
  /**
   * Returns true if the value is a ShadowRoot.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
   */


  Core.isShadow = function (value) {
    return !!value && value.nodeType === Node.DOCUMENT_FRAGMENT_NODE && value.host;
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
   * Returns true if the value is a Window.
   * @param {*} value The value to test.
   * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
   */


  Core.isWindow = function (value) {
    return !!value && !!value.document && value.document.defaultView === value;
  };

  return Core;
});