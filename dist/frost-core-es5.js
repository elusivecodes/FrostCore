"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    Object.assign(global, factory());
  }
})(void 0, function () {
  'use strict';

  var Core = {};
  Object.assign(Core, {
    /**
     * Create a single-dimensional Array from a multiple-dimensional Array.
     * @param {Array} array 
     * @returns {Array}
     */
    flatten: function flatten(array) {
      var _this = this;

      return array.reduce(function (acc, val) {
        return Array.isArray(val) ? acc.concat.apply(acc, _toConsumableArray(_this.flatten(val))) : acc.concat(val);
      }, []);
    },

    /**
     * Remove duplicate elements in an Array.
     * @param {Array} array 
     * @returns {Array}
     */
    unique: function unique(array) {
      return _toConsumableArray(new Set(array));
    }
  });
  Object.assign(Core, {
    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {Boolean} [leading]
     * @returns {Promise}
     */
    animation: function animation(callback, leading) {
      var newArgs, running;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
          newArgs = args;

          if (running) {
            return reject();
          }

          running = true;
          window.requestAnimationFrame(function (_) {
            running = false;

            if (!leading) {
              resolve(callback.apply(void 0, _toConsumableArray(newArgs)));
            }
          });

          if (leading) {
            resolve(callback.apply(void 0, _toConsumableArray(newArgs)));
          }
        });
      };
    },

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback
     * @param {number} wait
     * @param {Boolean} [leading]
     * @returns {Promise}
     */
    debounce: function debounce(callback, wait, leading) {
      var newArgs, running;
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return new Promise(function (resolve, reject) {
          newArgs = args;

          if (running) {
            return reject();
          }

          running = true;
          setTimeout(function (_) {
            running = false;

            if (!leading) {
              resolve(callback.apply(void 0, _toConsumableArray(newArgs)));
            }
          }, wait);

          if (leading) {
            resolve(callback.apply(void 0, _toConsumableArray(newArgs)));
          }
        });
      };
    },

    /**
     * Create a wrapped version of a function that executes on the next cycle of the event queue.
     * @param {function} callback
     * @param {...*} [defaultArgs]
     * @returns {Promise}
     */
    defer: function defer(callback) {
      for (var _len3 = arguments.length, defaultArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        defaultArgs[_key3 - 1] = arguments[_key3];
      }

      return this.delay.apply(this, [callback, 0].concat(defaultArgs));
    },

    /**
     * Create a wrapped version of a function that executes after a wait period.
     * @param {function} callback
     * @param {number} wait
     * @param {...*} [defaultArgs]
     * @returns {Promise}
     */
    delay: function delay(callback, wait) {
      for (var _len4 = arguments.length, defaultArgs = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        defaultArgs[_key4 - 2] = arguments[_key4];
      }

      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return new Promise(function (resolve) {
          return setTimeout(function (_) {
            return resolve(callback.apply(void 0, _toConsumableArray(defaultArgs.concat(args))));
          }, wait);
        });
      };
    },

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * @param {function} callback
     * @returns {function}
     */
    once: function once(callback) {
      var ran;
      return function () {
        if (ran) {
          return;
        }

        ran = true;
        return callback.apply(void 0, arguments);
      };
    },

    /**
     * Create a wrapped version of a function with predefined arguments.
     * @param {function} callback
     * @param {...*} [defaultArgs]
     * @returns {function}
     */
    partial: function partial(callback) {
      for (var _len6 = arguments.length, defaultArgs = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        defaultArgs[_key6 - 1] = arguments[_key6];
      }

      return function () {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return callback.apply(void 0, _toConsumableArray(defaultArgs.slice().map(function (v) {
          return v === undefined ? args.shift() : v;
        }).concat(args)));
      };
    },

    /**
     * Create a wrapped version of a function that executes at most once per wait period.
     * @param {function} callback
     * @param {number} wait
     * @param {Boolean} [leading=true]
     * @param {Boolean} [trailing=true]
     * @returns {Promise}
     */
    throttle: function throttle(callback, wait) {
      var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var trailing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var ran, running;
      return function () {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return new Promise(function (resolve, reject) {
          if (running) {
            return reject();
          }

          if (leading && !ran) {
            ran = true;
            return resolve(callback.apply(void 0, args));
          }

          running = true;
          setTimeout(function (_) {
            running = false;

            if (trailing) {
              resolve(callback.apply(void 0, args));
            } else {
              reject();
            }
          }, wait);
        });
      };
    }
  });
  Object.assign(Core, {
    /**
     * Clamp a value between a min and max.
     * @param {number} value 
     * @param {number} [min=0]
     * @param {number} [max=1]
     * @returns {number}
     */
    clamp: function clamp(value) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return Math.max(min, Math.min(max, value));
    },

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value 
     * @returns {number}
     */
    clampPercent: function clampPercent(value) {
      return this.clamp(value, 0, 100);
    },

    /**
     * Get the distance between two vectors.
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {number}
     */
    dist: function dist(x1, y1, x2, y2) {
      return this.len(x1 - x2, y1 - y2);
    },

    /**
     * Get the length of an X,Y vector.
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    len: function len(x, y) {
      return Math.hypot(x, y);
    },

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1
     * @param {number} v2
     * @param {number} amount
     * @returns {number}
     */
    lerp: function lerp(v1, v2, amount) {
      return v1 * (1 - amount) + v2 * amount;
    },

    /**
     * Map a value from one range to another.
     * @param {number} value
     * @param {number} fromMin
     * @param {number} fromMax
     * @param {number} toMin
     * @param {number} toMax
     * @returns {number}
     */
    map: function map(value, fromMin, fromMax, toMin, toMax) {
      return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    },

    /**
     * Round a number to a specified step-size.
     * @param {number} value
     * @param {number} step
     * @returns {number}
     */
    toStep: function toStep(value, step) {
      return Math.round(value / step) * step;
    },

    /**
     * Get the linear percent of a value in a specified range.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    linearPercent: function linearPercent(value, min, max) {
      if (min === max) {
        return 0;
      }

      return this.clampPercent(100 * (value - min) / (max - min));
    },

    /**
     * Get the linear value of a percent in a specified range.
     * @param {number} percent
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    linearValue: function linearValue(percent, min, max) {
      return this.clamp(min + percent / 100 * (max - min), min, max);
    },

    /**
     * Get the logarithmic percent of a value in a specified range.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    logPercent: function logPercent(value, min, max) {
      if (min === max) {
        return 0;
      }

      min = min ? Math.log(min) : 0;
      return this.clampPercent(100 * ((value ? Math.log(value) : 0) - min) / (Math.log(max) - min));
    },

    /**
     * Get the logarithmic value of a percent in a specified range.
     * @param {number} percent
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    logValue: function logValue(percent, min, max) {
      min = min ? Math.log(min) : 0;
      return this.clamp(Math.exp(min + (Math.log(max) - min) * percent / 100), min, max);
    }
  });
  Object.assign(Core, {
    /**
     * Remove a specified key from an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     */
    forgetDot: function forgetDot(object, key) {
      var pointer = object;
      var keys = key.split('.');

      while (key = keys.shift() && keys.length) {
        if (!pointer.hasOwnProperty(key)) {
          return;
        }

        pointer = pointer[key];
      }

      delete pointer[key];
    },

    /**
     * Retrieve the value of a specified key from an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {*}
     */
    getDot: function getDot(object, key, defaultValue) {
      var value = object;
      key.split('.').forEach(function (key) {
        if (!value.hasOwnProperty(key)) {
          value = defaultValue;
          return false;
        }

        value = value[key];
      });
      return value;
    },

    /**
     * Returns true if a specified key exists in an Object using dot notation.
     * @param {Object} object 
     * @param {string} key
     * @returns {Boolean}
     */
    hasDot: function hasDot(object, key) {
      var result = true,
          pointer = object;
      key.split('.').forEach(function (key) {
        if (!pointer.hasOwnProperty(key)) {
          result = false;
          return false;
        }

        pointer = pointer[key];
      });
      return result;
    },

    /**
     * Retrieve values of a specified key from an Array of Objects using dot notation.
     * @param {Object[]} objects
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {Array}
     */
    pluckDot: function pluckDot(objects, key, defaultValue) {
      var _this2 = this;

      return objects.slice().map(function (pointer) {
        return _this2.getDot(pointer, key, defaultValue);
      });
    },

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {Array} object
     * @param {string} key
     * @param {*} value
     * @param {Boolean} [overwrite=true]
     */
    setDot: function setDot(object, key, value) {
      var _this3 = this;

      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var pointer = object,
          current;
      var keys = key.split('.');

      while (current = keys.shift() && keys.length) {
        if (current === '*') {
          return Object.keys(pointer).forEach(function (k) {
            return _this3.dotSet(pointer[k], keys.join('.'), value, overwrite);
          });
        }

        if (!pointer.hasOwnProperty(current)) {
          pointer[current] = {};
        }

        pointer = pointer[current];
      }

      if (overwrite || !pointer.hasOwnProperty(current)) {
        pointer[current] = value;
      }
    }
  });
  Object.assign(Core.prototype, {
    /**
     * Create a Document object from a HTML string.
     * @param {string} html
     * @returns {Document}
     */
    parseHTML: function parseHTML(html) {
      var parser = new DOMParser();
      return parser.parseFromString(html, 'application/html');
    },

    /**
     * Create a Document object from an XML string.
     * @param {string} xml
     * @returns {Document}
     */
    parseXML: function parseXML(xml) {
      var parser = new DOMParser();
      return parser.parseFromString(xml, 'application/xml');
    }
  });
  Object.assign(Core, {
    /**
     * Convert a string to camelCase.
     * @param {string} string
     * @returns {string}
     */
    camelCase: function camelCase(string) {
      return "".concat(string).replace(/(\-[a-z])/g, function (match) {
        return match.toUpperCase();
      }).replace('-', '');
    },

    /**
     * Convert a string to snake-case.
     * @param {string} string
     * @returns {string}
     */
    snakeCase: function snakeCase(string) {
      return "".concat(string).replace(/([A-Z])/g, function (match) {
        return "-".concat(match.toLowerCase());
      });
    }
  });
  Object.assign(Core, {
    /**
     * Returns true if the value is a Boolean.
     * @param {*} value 
     * @returns {Boolean}
     */
    isBoolean: function isBoolean(value) {
      return value === !!value;
    },

    /**
     * Returns true if the value is a function.
     * @param {*} value 
     * @returns {Boolean}
     */
    isFunction: function isFunction(value) {
      return typeof value === 'function';
    },

    /**
     * Returns true if the value is numeric.
     * @param {*} value 
     * @returns {Boolean}
     */
    isNumeric: function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Returns true if the value is a plain Object.
     * @param {*} value 
     * @returns {Boolean}
     */
    isPlainObject: function isPlainObject(value) {
      return this.isObject(value) && value.constructor === Object;
    },

    /**
     * Returns true if the value is an Object.
     * @param {*} value 
     * @returns {Boolean}
     */
    isObject: function isObject(value) {
      return value === Object(value);
    },

    /**
     * Returns true if the value is a string.
     * @param {*} value 
     * @returns {Boolean}
     */
    isString: function isString(value) {
      return value === "".concat(value);
    }
  });
  return {
    Core: Core
  };
});