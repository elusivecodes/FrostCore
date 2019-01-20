"use strict";

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory(global);
  } else {
    Object.assign(global, factory(global));
  }
})(window, function (window) {
  var Core =
  /*#__PURE__*/
  function () {
    function Core(context) {
      _classCallCheck(this, Core);

      this.context = context || window.document;
      this.animating = false;
      this.animations = new Map();
      this.queues = new WeakMap();
      this.nodeData = new WeakMap();
      this.nodeEvents = new WeakMap();
      this.nodeStyles = new WeakMap();
    }

    _createClass(Core, [{
      key: "exec",
      value: function exec(command, showDefaultUI) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return this.context.execCommand(command, showDefaultUI, value);
      } // jQuery-like query method,
      // add a function to the ready queue or return a QuerySet (optionally mutable)

    }, {
      key: "query",
      value: function query(_query) {
        var mutable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (Core.isFunction(_query)) {
          return this.ready(_query);
        }

        return mutable ? new QuerySet(_query, this) : new QuerySetImmutable(_query, this);
      }
    }]);

    return Core;
  }();

  Object.assign(Core.prototype, {
    // add an animation to each element
    animate: function animate(nodes, callback, options) {
      var _this = this;

      options = _objectSpread({
        duration: 1000,
        type: 'ease-in-out'
      }, options); // get current timestamp for progress calculation

      var start = Date.now(); // initialize promises array

      var promises = []; // loop through nodes

      this.nodeArray(nodes).forEach(function (node) {
        // if this is the first animation for the node,
        // initialize an animation array
        if (!_this.animations.has(node)) {
          _this.animations.set(node, []);
        } // create promise for the animation


        var promise = new Promise(function (resolve, reject) {
          // create function for the animation
          var animation = function animation() {
            var stop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // if the node is no longer in the document,
            // or the animation was stopped and not finished
            // reject the promise and return false
            if (!_this.contains(_this.context, node) || stop && !finish) {
              reject(node);
              return true;
            } // calculate the progress


            var progress;

            if (finish) {
              progress = 1;
            } else {
              progress = (Date.now() - start) / options.duration;

              if (options.infinite) {
                progress %= 1;
              } else {
                progress = Core.clamp(progress);
              }

              if (options.type === 'ease-in') {
                progress = Math.pow(progress, 2);
              } else if (options.type === 'ease-out') {
                progress = Math.sqrt(progress);
              } else if (options.type === 'ease-in-out') {
                if (progress <= 0.5) {
                  progress = Math.pow(progress, 2) * 2;
                } else {
                  progress = 1 - Math.pow(1 - progress, 2) * 2;
                }
              }
            } // run the animation callback


            callback(node, progress); // if the animation is complete,
            // resolve the promise and return false

            if (progress === 1) {
              resolve(node);
              return true;
            }
          }; // push the animation to the animations array


          _this.animations.get(node).push(animation);
        }); // push the promise to the promises array

        promises.push(promise);
      }); // if we have animations, and are not already animating
      // start the animation

      if (promises.length && !this.animating) {
        this.animating = true;

        this._animationFrame();
      } // return all promises


      return Promise.all(promises);
    },
    // stop all animations for each element
    stop: function stop(nodes) {
      var _this2 = this;

      var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // loop through nodes
      this.nodeArray(nodes).forEach(function (node) {
        // if no animations exist for the node, return
        if (!_this2.animations.has(node)) {
          return;
        } // loop through the animations and run the callback


        _this2.animations.get(node).forEach(function (animation) {
          return animation(true, finish);
        }); // remove node from animations


        _this2.animations.delete(node);
      });
    },
    // run a single frame of all animations, and then queue up the next frame
    _animationFrame: function _animationFrame() {
      var _this3 = this;

      // initialize complete nodes array
      var completeNodes = []; // loop through animations

      this.animations.forEach(function (animations, node) {
        // initialize complete animations array
        var completeAnimations = []; // loop through node animations

        animations.forEach(function (animation, index) {
          // if the animation is complete,
          // push index to complete animations
          if (animation()) {
            completeAnimations.push(index);
          }
        }); // if we have no complete animations, return

        if (!completeAnimations.length) {
          return;
        } // filter complete animations from the node animations array


        animations = animations.filter(function (animation, index) {
          return !completeAnimations.includes(index);
        }); // if we have no remaining animations, push the node to complete nodes

        if (!animations.length) {
          completeNodes.push(node);
        }
      }); // loop through complete nodes and delete from animations

      completeNodes.forEach(function (node) {
        return _this3.animations.delete(node);
      }); // if we have remaining animations, queue up the next frame,
      // otherwise, set animating to false

      if (this.animations.size) {
        window.requestAnimationFrame(function () {
          return _this3._animationFrame();
        });
      } else {
        this.animating = false;
      }
    }
  });
  Object.assign(Core.prototype, {
    // slide each element in from the top over a duration
    dropIn: function dropIn(nodes, options) {
      return this.slideIn(nodes, _objectSpread({
        dir: 'top'
      }, options));
    },
    // slide each element out to the top over a duration
    dropOut: function dropOut(nodes, options) {
      return this.slideOut(nodes, _objectSpread({
        dir: 'top'
      }, options));
    },
    // fade the opacity of each element in over a duration
    fadeIn: function fadeIn(nodes, options) {
      var _this4 = this;

      return this.animate(nodes, function (node, progress) {
        return _this4.setStyle(node, 'opacity', progress < 1 ? progress : '');
      }, options);
    },
    // fade the opacity of each element out over a duration
    fadeOut: function fadeOut(nodes, options) {
      var _this5 = this;

      return this.animate(nodes, function (node, progress) {
        return _this5.setStyle(node, 'opacity', progress < 1 ? 1 - progress : '');
      }, options);
    },
    // rotate each element in on an x,y over a duration
    rotateIn: function rotateIn(nodes, options) {
      var _this6 = this;

      options = _objectSpread({
        x: 0,
        y: 1
      }, options);
      return this.animate(nodes, function (node, progress) {
        return _this6.setStyle(node, 'transform', progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat((90 - progress * 90) * (options.inverse ? -1 : 1), "deg)") : '');
      }, options);
    },
    // rotate each element out on an x,y over a duration
    rotateOut: function rotateOut(nodes, options) {
      var _this7 = this;

      options = _objectSpread({
        x: 0,
        y: 1
      }, options);
      return this.animate(nodes, function (node, progress) {
        return _this7.setStyle(node, 'transform', progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat(progress * 90 * (options.inverse ? -1 : 1), "deg)") : '');
      }, options);
    },
    // slide each element into place from a direction over a duration
    slideIn: function slideIn(nodes, options) {
      var _this8 = this;

      options = _objectSpread({
        dir: 'bottom'
      }, options);
      return this.animate(nodes, function (node, progress) {
        var axis, size, inverse;

        if (progress < 1) {
          var dir = Core.isFunction(options.dir) ? options.dir() : options.dir;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = _this8.height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = _this8.width(node);
            inverse = dir === 'left';
          }
        }

        _this8.setStyle(node, 'transform', progress < 1 ? "translate".concat(axis, "(").concat(Math.round(size - size * progress) * (inverse ? -1 : 1), "px)") : '');
      }, options);
    },
    // slide each element out of place to a direction over a duration
    slideOut: function slideOut(nodes, options) {
      var _this9 = this;

      options = _objectSpread({
        dir: 'bottom'
      }, options);
      return this.animate(nodes, function (node, progress) {
        var axis, size, inverse;

        if (progress < 1) {
          var dir = Core.isFunction(options.dir) ? options.dir() : options.dir;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = _this9.height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = _this9.width(node);
            inverse = dir === 'left';
          }
        }

        _this9.setStyle(node, 'transform', progress < 1 ? "translate".concat(axis, "(").concat(Math.round(size * progress) * (inverse ? -1 : 1), "px)") : '');
      }, options);
    },
    // squeeze each element into place from a direction over a duration
    squeezeIn: function squeezeIn(nodes, options) {
      var _this10 = this;

      options = _objectSpread({
        dir: 'bottom'
      }, options);
      var wrapper = this.create('div', {
        style: {
          overflow: 'hidden',
          position: 'relative'
        }
      });
      var animations = [];
      this.nodeArray(nodes).forEach(function (node) {
        _this10.wrap(node, wrapper);

        var parent = _this10.parent(node);

        animations.push(_this10.animate(node, function (node, progress) {
          if (progress === 1) {
            _this10.before(parent, _this10.contents(parent));

            _this10.remove(parent);

            return;
          }

          var dir = Core.isFunction(options.dir) ? options.dir() : options.dir;
          var sizeStyle, translateStyle;

          if (dir === 'top' || dir === 'bottom') {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = 'Y';
            }
          } else if (dir === 'left' || dir === 'right') {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = 'X';
            }
          }

          var size = Math.round(_this10[sizeStyle](node, true));
          var amount = Math.round(size * progress);

          var styles = _defineProperty({}, sizeStyle, amount);

          if (translateStyle) {
            styles.transform = "translate".concat(translateStyle, "(").concat(size - amount, "px)");
          }

          core.setStyle(parent, styles);
        }, options));
      });
      return Promise.all(animations);
    },
    // squeeze each element out of place to a direction over a duration
    squeezeOut: function squeezeOut(nodes, options) {
      var _this11 = this;

      options = _objectSpread({
        dir: 'bottom'
      }, options);
      var wrapper = this.create('div', {
        style: {
          overflow: 'hidden',
          position: 'relative'
        }
      });
      var animations = [];
      this.nodeArray(nodes).forEach(function (node) {
        _this11.wrap(node, wrapper);

        var parent = _this11.parent(node);

        animations.push(_this11.animate(node, function (node, progress) {
          if (progress === 1) {
            _this11.before(parent, _this11.contents(parent));

            _this11.remove(parent);

            return;
          }

          var dir = Core.isFunction(options.dir) ? options.dir() : options.dir;
          var sizeStyle, translateStyle;

          if (dir === 'top' || dir === 'bottom') {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = 'Y';
            }
          } else if (dir === 'left' || dir === 'right') {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = 'X';
            }
          }

          var size = Math.round(_this11[sizeStyle](node, true));
          var amount = Math.round(size - size * progress);

          var styles = _defineProperty({}, sizeStyle, amount);

          if (translateStyle) {
            styles.transform = "translate".concat(translateStyle, "(").concat(size - amount, "px)");
          }

          core.setStyle(parent, styles);
        }, options));
      });
      return Promise.all(animations);
    }
  });
  Object.assign(Core.prototype, {
    // queue a callback on each element
    queue: function queue(nodes, callback) {
      var _this12 = this;

      // loop through nodes
      this.nodeArray(nodes).forEach(function (node) {
        // test if node has a new queue
        var newQueue = !_this12.queues.has(node); // if it's a new queue,
        // initialize an empty array in the queue

        if (newQueue) {
          _this12.queues.set(node, []);
        } // push the callback to the queue


        _this12.queues.get(node).push(callback); // if it's a new queue,
        // dequeue the node


        if (newQueue) {
          _this12._dequeue(node);
        }
      });
    },
    // clear the queue of each element
    clearQueue: function clearQueue(nodes) {
      var _this13 = this;

      // loop through nodes
      this.nodeArray(nodes).forEach(function (node) {
        return _this13.queues.has(node) && _this13.queues.delete(node);
      });
    },
    // run the next queued callback for each element
    _dequeue: function _dequeue(nodes) {
      var _this14 = this;

      // loop through nodes
      this.nodeArray(nodes).forEach(function (node) {
        // if node doesn't have a queue, return
        if (!_this14.queues.has(node)) {
          return;
        } // get next item in queue


        var next = _this14.queues.get(node).shift(); // if there's no next item,
        // delete node from the queue


        if (!next) {
          _this14.queues.delete(node);

          return;
        } // resolve next item then dequeue node


        Promise.resolve(next(node)).finally(function () {
          return _this14._dequeue(node);
        });
      });
    }
  });
  Object.assign(Core.prototype, {
    // get an attribute value for the first element
    getAttribute: function getAttribute(nodes, attribute) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      return node.getAttribute(attribute);
    },
    // set attributes for each element
    setAttribute: function setAttribute(nodes, attribute, value) {
      var attributes = Core._parseData(attribute, value);

      var keys = Object.keys(attributes);
      this.nodeArray(nodes).forEach(function (node) {
        return keys.forEach(function (key) {
          return node.setAttribute(key, attributes[key]);
        });
      });
    },
    // remove an attribute from each element
    removeAttribute: function removeAttribute(nodes, attribute) {
      this.nodeArray(nodes).forEach(function (node) {
        return node.removeAttribute(attribute);
      });
    },
    // get a dataset value for the first element
    getDataset: function getDataset(nodes, key) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      if (!key) {
        return node.dataset;
      }

      return node.dataset[key];
    },
    // set dataset values for each element
    setDataset: function setDataset(nodes, key, value) {
      var dataset = Core._parseData(key, value);

      this.nodeArray(nodes).forEach(function (node) {
        return Object.assign(node.dataset, dataset);
      });
    },
    // get the HTML contents of the first element
    getHTML: function getHTML(nodes) {
      return this.getProperty(nodes, 'innerHTML');
    },
    // set the HTML contents for each element
    setHTML: function setHTML(nodes, html) {
      // empty nodes
      this.empty(nodes); // set inner html property

      this.setProperty(nodes, 'innerHTML', html);
    },
    // get a property value for the first element
    getProperty: function getProperty(nodes, property) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      return node[property];
    },
    // set property values for each element
    setProperty: function setProperty(nodes, property, value) {
      var properties = Core._parseData(property, value);

      this.nodeArray(nodes).forEach(function (node) {
        return Object.assign(node, properties);
      });
    },
    // remove a property from each element
    removeProperty: function removeProperty(nodes, property) {
      this.nodeArray(nodes).forEach(function (node) {
        delete node[property];
      });
    },
    // get the text contents of the first element
    getText: function getText(nodes) {
      return this.getProperty(nodes, 'innerText');
    },
    // set the text contents for each element
    setText: function setText(nodes, text) {
      // empty nodes
      this.empty(nodes); // set inner text property

      this.setProperty(nodes, 'innerText', text);
    },
    // get the value property of the first element
    getValue: function getValue(nodes) {
      return this.getProperty(nodes, 'value');
    },
    // set the value property for each element
    setValue: function setValue(nodes, value) {
      this.setProperty(nodes, 'value', value);
    }
  });
  Object.assign(Core.prototype, {
    // get custom data for the first node
    getData: function getData(nodes, key) {
      var node = this.nodeFirst(nodes, false, true, true);

      if (!node) {
        return;
      }

      if (!this.nodeData.has(node)) {
        return;
      }

      if (!key) {
        return this.nodeData.get(node);
      }

      return this.nodeData.get(node)[key];
    },
    // set custom data for each node
    setData: function setData(nodes, key, value) {
      var _this15 = this;

      var data = Core._parseData(key, value);

      this.nodeArray(nodes, false, true, true).forEach(function (node) {
        if (!_this15.nodeData.has(node)) {
          _this15.nodeData.set(node, {});
        }

        Object.assign(_this15.nodeData.get(node), data);
      });
    },
    // remove custom data for each node
    removeData: function removeData(nodes, key) {
      var _this16 = this;

      this.nodeArray(nodes, false, true, true).forEach(function (node) {
        if (!_this16.nodeData.has(node)) {
          return;
        }

        if (key) {
          var nodeData = _this16.nodeData.get(node);

          delete nodeData[key];

          if (Object.keys(nodeData).length) {
            return;
          }
        }

        _this16.nodeData.delete(node);
      });
    }
  });
  Object.assign(Core.prototype, {
    // get the X,Y co-ordinates for the center of the first element (optionally offset)
    center: function center(nodes, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return {
        x: nodeBox.left + nodeBox.width / 2,
        y: nodeBox.top + nodeBox.height / 2
      };
    },
    // get the position of the first element relative to the window (optionally offset)
    position: function position(nodes, offset) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      return this.forceShow(node, function (node) {
        var result = {
          x: node.offsetLeft,
          y: node.offsetTop
        };

        if (offset) {
          var offsetParent = node;

          while (offsetParent = offsetParent.offsetParent) {
            result.x += offsetParent.offsetLeft;
            result.y += offsetParent.offsetTop;
          }
        }

        return result;
      });
    },
    // get the computed bounding rectangle of the first element
    rect: function rect(nodes, offset) {
      var _this17 = this;

      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      return this.forceShow(node, function (node) {
        var result = node.getBoundingClientRect();

        if (offset) {
          result.x += _this17.getScrollX(window);
          result.y += _this17.getScrollY(window);
        }

        return result;
      });
    },
    // constrain each element to a container element
    constrain: function constrain(nodes, container) {
      var _this18 = this;

      var containerBox = this.rect(container);

      if (!containerBox) {
        return;
      }

      this.nodeArray(nodes).forEach(function (node) {
        var nodeBox = _this18.rect(node);

        if (nodeBox.height > containerBox.height) {
          _this18.setStyle(node, 'height', containerBox.height);
        }

        if (nodeBox.width > containerBox.width) {
          _this18.setStyle(node, 'width', containerBox.width);
        }

        if (nodeBox.top < containerBox.top) {
          _this18.setStyle(node, 'top', containerBox.top);
        }

        if (nodeBox.right > containerBox.right) {
          _this18.setStyle(node, 'left', containerBox.right - nodeBox.width);
        }

        if (nodeBox.bottom > containerBox.bottom) {
          _this18.setStyle(node, 'top', containerBox.bottom - nodeBox.height);
        }

        if (nodeBox.left < containerBox.left) {
          _this18.setStyle(node, 'left', containerBox.left);
        }
      });
    },
    // get the distance of an element to an X,Y position in the window (optionally offset)
    distTo: function distTo(nodes, x, y, offset) {
      var nodeCenter = this.center(nodes, offset);

      if (!nodeCenter) {
        return;
      }

      return Core.dist(nodeCenter.x, nodeCenter.y, x, y);
    },
    // get the distance between two elements
    distToNode: function distToNode(nodes, others) {
      var otherCenter = this.center(others);

      if (!otherCenter) {
        return;
      }

      return this.distTo(nodes, otherCenter.x, otherCenter.y);
    },
    // get the nearest element to an X,Y position in the window (optionally offset)
    nearestTo: function nearestTo(nodes, x, y, offset) {
      var _this19 = this;

      var closest = null;
      var closestDistance = Number.MAX_VALUE;
      this.nodeArray(nodes).forEach(function (node) {
        var dist = _this19.distTo(node, x, y, offset);

        if (dist && dist < closestDistance) {
          closestDistance = dist;
          closest = node;
        }
      });
      return closest;
    },
    // get the nearest element to another element
    nearestToNode: function nearestToNode(nodes, others) {
      var otherCenter = this.center(others);

      if (!otherCenter) {
        return;
      }

      return this.nearestTo(nodes, otherCenter.x, otherCenter.y);
    },
    // get the percentage of an X co-ordinate relative to an element
    percentX: function percentX(nodes, x, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return Core.clampPercent((x - nodeBox.left) / nodeBox.width * 100);
    },
    // get the percentage of a Y co-ordinate relative to an element
    percentY: function percentY(nodes, y, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return Core.clampPercent((y - nodeBox.top) / nodeBox.height * 100);
    }
  });
  Object.assign(Core.prototype, {
    // get the scroll X position of the first element
    getScrollX: function getScrollX(nodes) {
      var node = this.nodeFirst(nodes, true, true, true);

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return node.scrollX;
      }

      if (Core.isDocument(node)) {
        node = node.scrollingElement;
      }

      return node.scrollLeft;
    },
    // get the scroll Y position of the first element
    getScrollY: function getScrollY(nodes) {
      var node = this.nodeFirst(nodes, true, true, true);

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return node.scrollY;
      }

      if (Core.isDocument(node)) {
        node = node.scrollingElement;
      }

      return node.scrollTop;
    },
    // scroll each element to an X,Y position
    setScroll: function setScroll(nodes, x, y) {
      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        if (Core.isWindow(node)) {
          return node.scroll(x, y);
        }

        if (Core.isDocument(node)) {
          node = node.scrollingElement;
        }

        node.scrollLeft = x;
        node.scrollTop = y;
      });
    },
    // scroll each element to an X position
    setScrollX: function setScrollX(nodes, x) {
      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        if (Core.isWindow(node)) {
          return node.scroll(x, node.scrollY);
        }

        if (Core.isDocument(node)) {
          node = node.scrollingElement;
        }

        node.scrollLeft = x;
      });
    },
    // scroll each element to a Y position
    setScrollY: function setScrollY(nodes, y) {
      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        if (Core.isWindow(node)) {
          return node.scroll(node.scrollX, y);
        }

        if (Core.isDocument(node)) {
          node = node.scrollingElement;
        }

        node.scrollTop = y;
      });
    }
  });
  Object.assign(Core.prototype, {
    // get the computed height of the first element
    // (and optionally padding, border or margin)
    height: function height(nodes, padding, border, margin) {
      var _this20 = this;

      var node = this.nodeFirst(nodes, true, true, true);

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return padding ? node.outerHeight : node.innerHeight;
      }

      if (Core.isDocument(node)) {
        node = node.documentElement;
      }

      return this.forceShow(node, function (node) {
        var result = node.clientHeight;

        if (!padding) {
          result -= parseInt(_this20.css(node, 'padding-top')) + parseInt(_this20.css(node, 'padding-bottom'));
        }

        if (border) {
          result += parseInt(_this20.css(node, 'border-top-width')) + parseInt(_this20.css(node, 'border-bottom-width'));
        }

        if (margin) {
          result += parseInt(_this20.css(node, 'margin-top')) + parseInt(_this20.css(node, 'margin-bottom'));
        }

        return result;
      });
    },
    // get the computed width of the first element
    // (and optionally padding, border or margin)
    width: function width(nodes, padding, border, margin) {
      var _this21 = this;

      var node = this.nodeFirst(nodes, true, true, true);

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return padding ? node.outerWidth : node.innerWidth;
      }

      if (Core.isDocument(node)) {
        node = node.documentElement;
      }

      return this.forceShow(node, function (node) {
        var result = node.clientWidth;

        if (!padding) {
          result -= parseInt(_this21.css(node, 'padding-left')) + parseInt(_this21.css(node, 'padding-right'));
        }

        if (border) {
          result += parseInt(_this21.css(node, 'border-left-width')) + parseInt(_this21.css(node, 'border-right-width'));
        }

        if (margin) {
          result += parseInt(_this21.css(node, 'margin-left')) + parseInt(_this21.css(node, 'margin-right'));
        }

        return result;
      });
    }
  });
  Object.assign(Core.prototype, {
    /* CLASSES */
    // add a class or classes to each element
    addClass: function addClass(nodes) {
      for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classes[_key - 1] = arguments[_key];
      }

      classes = Core._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this.nodeArray(nodes).forEach(function (node) {
        var _node$classList;

        return (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(classes));
      });
    },
    // remove a class or classes from each element
    removeClass: function removeClass(nodes) {
      for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        classes[_key2 - 1] = arguments[_key2];
      }

      classes = Core._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this.nodeArray(nodes).forEach(function (node) {
        var _node$classList2;

        return (_node$classList2 = node.classList).remove.apply(_node$classList2, _toConsumableArray(classes));
      });
    },
    // toggle a class or classes for each element
    toggleClass: function toggleClass(nodes) {
      for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        classes[_key3 - 1] = arguments[_key3];
      }

      classes = Core._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this.nodeArray(nodes).forEach(function (node) {
        return classes.forEach(function (className) {
          return node.classList.toggle(className);
        });
      });
    },

    /* STYLES */
    // get a style property for the first element
    getStyle: function getStyle(nodes, style) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      } // camelize style property


      style = Core.snakeCase(style);
      return node.style[style];
    },
    // set style properties for each element
    setStyle: function setStyle(nodes, style, value, important) {
      if (Core.isObject(style)) {
        important = value;
      }

      var styles = Core._parseData(style, value);

      var realStyles = {};
      Object.keys(styles).forEach(function (key) {
        var value = '' + styles[key];
        key = Core.snakeCase(key); // if value is numeric and not a number property, add px

        if (value && Core.isNumeric(value) && !Core.cssNumberProperties.includes(key)) {
          value = value + 'px';
        }

        realStyles[key] = value;
      });
      important = important ? 'important' : '';
      this.nodeArray(nodes).forEach(function (node) {
        return Object.keys(realStyles).forEach(function (style) {
          return node.style.setProperty(style, realStyles[style], important);
        });
      });
    },

    /* COMPUTED STYLE */
    // get the computed style for the first element
    css: function css(nodes, style) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      if (!this.nodeStyles.has(node)) {
        this.nodeStyles.set(node, window.getComputedStyle(node));
      }

      return this.nodeStyles.get(node).getPropertyValue(style);
    },

    /* VISIBILITY */
    // hide each element from display
    hide: function hide(nodes) {
      this.setStyle(nodes, 'display', 'none');
    },
    // display each hidden element
    show: function show(nodes) {
      this.setStyle(nodes, 'display', '');
    },
    // toggle the visibility of each element
    toggle: function toggle(nodes) {
      var _this22 = this;

      this.nodeArray(nodes).forEach(function (node) {
        return _this22.getStyle(node, 'display') === 'none' ? _this22.show(node) : _this22.hide(node);
      });
    }
  });
  Object.assign(Core.prototype, {
    // create a new DOM element
    create: function create(tagName, options) {
      var node = this.context.createElement(tagName);

      if (!options) {
        return node;
      }

      if (options.html) {
        this.setHTML(node, options.html);
      } else if (options.text) {
        this.setText(node, options.text);
      }

      if (options.class) {
        this.addClass(node, options.class);
      }

      if (options.style) {
        this.setStyle(node, options.style);
      }

      if (options.value) {
        this.setValue(node, options.value);
      }

      if (options.attributes) {
        this.setAttribute(node, options.attributes);
      }

      if (options.properties) {
        this.setProperty(node, options.properties);
      }

      if (options.dataset) {
        this.setDataset(node, options.dataset);
      }

      return node;
    },
    // create a new comment node
    createComment: function createComment(comment) {
      return this.context.createComment(comment);
    },
    // create a new text node
    createText: function createText(text) {
      return this.context.createTextNode(text);
    }
  });
  Object.assign(Core.prototype, {
    // add an event to each element
    addEvent: function addEvent(nodes, events, delegate, callback) {
      var _this23 = this;

      var selfDestruct = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (Core.isFunction(delegate)) {
        if (Core.isBoolean(callback)) {
          selfDestruct = callback;
        }

        callback = delegate;
        delegate = false;
      }

      var eventArray = Core._parseEvents(events);

      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        var realCallback = callback;

        if (selfDestruct) {
          realCallback = _this23._selfDestructFactory(node, events, realCallback);
        }

        if (delegate) {
          realCallback = _this23._delegateFactory(node, delegate, realCallback);
        }

        if (!_this23.nodeEvents.has(node)) {
          _this23.nodeEvents.set(node, {});
        }

        var nodeEvents = _this23.nodeEvents.get(node);

        var eventData = {
          delegate: delegate,
          callback: callback,
          realCallback: realCallback
        };
        eventArray.forEach(function (event) {
          var realEvent = Core._parseEvent(event);

          eventData.event = event;
          eventData.realEvent = realEvent;

          if (!nodeEvents[realEvent]) {
            nodeEvents[realEvent] = [];
          } else if (nodeEvents[realEvent].includes(eventData)) {
            return;
          }

          node.addEventListener(realEvent, realCallback);
          nodeEvents[realEvent].push(eventData);
        });
      });
    },
    // add a self-destructing event to each element
    addEventOnce: function addEventOnce(nodes, events, delegate, callback) {
      return this.addEvent(nodes, events, delegate, callback, true);
    },
    // remove an event from each element
    removeEvent: function removeEvent(nodes, events, delegate, callback) {
      var _this24 = this;

      if (delegate && Core.isFunction(delegate)) {
        callback = delegate;
        delegate = false;
      }

      var eventArray = events ? Core._parseEvents(events) : false;
      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        if (!_this24.nodeEvents.has(node)) {
          return;
        }

        var nodeEvents = _this24.nodeEvents.get(node);

        if (!eventArray) {
          eventArray = Object.keys(nodeEvents);
        }

        eventArray.forEach(function (event) {
          var realEvent = Core._parseEvent(event);

          if (!nodeEvents[realEvent]) {
            return;
          }

          var realEvents = nodeEvents[realEvent];
          var remove = [];
          realEvents.forEach(function (eventData, index) {
            if (realEvent === event) {
              if (realEvent !== eventData.realEvent) {
                return;
              }
            } else if (event !== eventData.event) {
              return;
            }

            if (delegate) {
              if (delegate !== eventData.delegate || callback && callback !== eventData.callback) {
                return;
              }
            } else if (callback && callback !== eventData.realCallback) {
              return;
            }

            node.removeEventListener(eventData.realEvent, eventData.realCallback);
            remove.push(index);
          });
          realEvents = realEvents.filter(function (eventData, index) {
            return !remove.includes(index);
          });

          if (!realEvents.length) {
            delete nodeEvents[realEvent];
          }
        });

        if (!Object.keys(nodeEvents).length) {
          _this24.nodeEvents.delete(node);
        }
      });
    },
    // trigger an event on each element
    triggerEvent: function triggerEvent(nodes, events, data) {
      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        return Core._parseEvents(events).forEach(function (event) {
          var realEvent = Core._parseEvent(event);

          var eventData = new Event(realEvent);

          if (data) {
            Object.assign(eventData, data);
          }

          node.dispatchEvent(eventData);
        });
      });
    },
    // clone all events from each element to other elements
    cloneEvents: function cloneEvents(nodes, others) {
      var _this25 = this;

      this.nodeArray(nodes, true, true, true).forEach(function (node) {
        if (!_this25.nodeEvents.has(node)) {
          return;
        }

        _this25.nodeEvents.get(node).forEach(function (eventData) {
          _this25.addEvent(others, eventData.event, eventData.delegate, eventData.callback);
        });
      });
    },
    // trigger a blur event on the first element
    blur: function blur(nodes) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      node.blur();
    },
    // trigger a click event on the first element
    click: function click(nodes) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      node.click();
    },
    // trigger a focus event on the first element
    focus: function focus(nodes) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      node.focus();
    },
    // add a function to the ready queue
    ready: function ready(callback) {
      if (this.context.readyState === 'complete') {
        callback();
      } else {
        this.addEvent(window, 'DOMContentLoaded', callback);
      }
    }
  });
  Object.assign(Core.prototype, {
    // clone each node (optionally deep, and with events and data)
    clone: function clone(nodes) {
      var _this26 = this;

      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var eventsData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var results = [];
      this.nodeArray(nodes, false).forEach(function (node) {
        var clone = node.cloneNode(deep);

        if (eventsData) {
          _this26.cloneEvents(node, clone);

          _this26.cloneData(node, clone);

          if (deep) {
            var contents = _this26.find(node, '*');

            _this26.find(clone, '*').forEach(function (child, index) {
              _this26.cloneEvents(contents[index], child);

              _this26.cloneData(contents[index], child);
            });
          }
        }

        results.push(clone);
      });
      return results;
    },
    // detach an element from the DOM
    detach: function detach(nodes) {
      this.nodeArray(nodes, false).forEach(function (node) {
        if (!node.parentNode) {
          return;
        }

        node.parentNode.removeChild(node);
      });
    },
    // remove all children of each node from the DOM
    empty: function empty(nodes) {
      this.remove(this.find(nodes, '*'), false);
      this.setProperty(nodes, 'innerHTML', '');
    },
    // remove each node from the DOM
    remove: function remove(nodes) {
      var _this27 = this;

      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (deep) {
        this.empty(nodes);
      } // clear queue


      this.clearQueue(nodes); // stop animations

      this.stop(nodes); // remove events

      this.removeEvent(nodes); // remove data

      this.removeData(nodes); // delete styles

      this.nodeArray(nodes).forEach(function (node) {
        return _this27.nodeStyles.has(node) && _this27.nodeStyles.delete(node);
      }); // detach node

      this.detach(nodes);
    },
    // replace each other node with nodes
    replaceAll: function replaceAll(nodes, others) {
      this.replaceWith(others, nodes);
    },
    // replace each node with other nodes
    replaceWith: function replaceWith(nodes, others) {
      var _this28 = this;

      others = this._parseQuery(others, false);
      this.nodeArray(nodes, false).forEach(function (node) {
        _this28.before(node, _this28.clone(others, true));

        _this28.remove(node);
      });
    }
  });
  Object.assign(Core.prototype, {
    // insert each other node after the first node
    after: function after(nodes, others) {
      var node = this.nodeFirst(nodes, false);

      if (!node) {
        return;
      }

      if (!node.parentNode) {
        return;
      }

      this._parseQuery(others).reverse().forEach(function (other) {
        return node.parentNode.insertBefore(other, node.nextSibling);
      });
    },
    // insert each node after the first other node
    insertAfter: function insertAfter(nodes, others) {
      this.after(others, nodes);
    },
    // insert each other node before the first node
    before: function before(nodes, others) {
      var node = this.nodeFirst(nodes, false);

      if (!node) {
        return;
      }

      if (!node.parentNode) {
        return;
      }

      this._parseQuery(others, false).forEach(function (other) {
        return node.parentNode.insertBefore(other, node);
      });
    },
    // insert each node before the first other node
    insertBefore: function insertBefore(nodes, others) {
      this.before(others, nodes);
    },
    // append each other node to the first node
    append: function append(nodes, others) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      this._parseQuery(others, false).forEach(function (other) {
        return node.insertBefore(other, null);
      });
    },
    // append each node to the first other node
    appendTo: function appendTo(nodes, others) {
      this.append(others, nodes);
    },
    // prepend each other node to the first node
    prepend: function prepend(nodes, others) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      this._parseQuery(others, false).reverse().forEach(function (other) {
        return node.insertBefore(other, node.firstChild);
      });
    },
    // prepend each node to the first other node
    prependTo: function prependTo(nodes, others) {
      this.prepend(others, nodes);
    }
  });
  Object.assign(Core.prototype, {
    // unwrap each node (optionally matching a filter)
    unwrap: function unwrap(nodes, filter) {
      var _this29 = this;

      this.nodeArray(nodes, false).forEach(function (node) {
        var parent = _this29.parent(node, filter);

        if (!parent) {
          return;
        }

        _this29.before(parent, _this29.contents(parent));

        _this29.remove(parent);
      });
    },
    // wrap each nodes with other nodes
    wrap: function wrap(nodes, others) {
      var _this30 = this;

      others = this._parseQuery(others);
      this.nodeArray(nodes, false).forEach(function (node) {
        var clone = _this30.clone(others, true);

        _this30.before(node, clone);

        _this30.append(_this30.filterOne(_this30.find(clone, '*'), function (test) {
          return !_this30.child(test);
        }) || clone, node);
      });
    },
    // wrap all nodes with other nodes
    wrapAll: function wrapAll(nodes, others) {
      var _this31 = this;

      others = this._parseQuery(others);
      var clone = this.clone(others, true);
      this.before(nodes, clone);
      this.append(this.filterOne(this.find(clone, '*'), function (test) {
        return !_this31.child(test);
      }) || clone, nodes);
    },
    // wrap the contents of each node with other nodes
    wrapInner: function wrapInner(nodes, others) {
      var _this32 = this;

      others = this._parseQuery(others);
      this.nodeArray(nodes, false).forEach(function (node) {
        var clone = _this32.clone(others, true);

        _this32.append(node, clone);

        _this32.append(_this32.filterOne(_this32.find(clone, '*'), function (test) {
          return !_this32.child(test);
        }) || clone, _this32.contents(node));
      });
    }
  });
  Object.assign(Core.prototype, {
    // return all elements matching a filter
    filter: function filter(nodes, _filter) {
      _filter = this._parseFilter(_filter);
      return this.nodeArray(nodes).filter(function (node, index) {
        return !_filter || _filter(node, index);
      });
    },
    // return the first element matching a filter
    filterOne: function filterOne(nodes, filter) {
      filter = this._parseFilter(filter);
      return this.nodeArray(nodes).find(function (node, index) {
        return !filter || filter(node, index);
      }) || null;
    },
    // return all elements not matching a filter
    not: function not(nodes, filter) {
      filter = this._parseFilter(filter);
      return this.nodeArray(nodes).filter(function (node, index) {
        return filter && !filter(node, index);
      });
    },
    // return all elements with a descendent matching a filter
    has: function has(nodes, filter) {
      filter = this._parseFilterContains(filter);
      return this.nodeArray(nodes, true, true).filter(function (node) {
        return !filter || filter(node);
      });
    },
    // return all hidden elements
    hidden: function hidden(nodes) {
      var _this33 = this;

      return this.nodeArray(nodes, false, true, true).filter(function (node) {
        return _this33.isHidden(node);
      });
    },
    // return all visible elements
    visible: function visible(nodes) {
      var _this34 = this;

      return this.nodeArray(nodes, false, true, true).filter(function (node) {
        return _this34.isVisible(node);
      });
    }
  });
  Object.assign(Core.prototype, {
    // find all elements matching a selector
    find: function find(nodes, selectors) {
      if (!selectors) {
        selectors = nodes;
        nodes = this.context;
      }

      var _Core$_parseSelector = Core._parseSelector(selectors),
          _Core$_parseSelector2 = _slicedToArray(_Core$_parseSelector, 2),
          type = _Core$_parseSelector2[0],
          value = _Core$_parseSelector2[1];

      if (type === '#') {
        return this.findById(nodes, value);
      }

      if (type === '.') {
        return this.findByClass(nodes, value);
      }

      if (type) {
        return this.findByTag(nodes, value);
      }

      if (Core.isSelectorComplex(selectors)) {
        return this._findByCustom(nodes, selectors);
      }

      return this.findSelector(nodes, selectors);
    },
    // find a single element matching a selector
    findOne: function findOne(nodes, selectors) {
      if (!selectors) {
        selectors = nodes;
        nodes = this.context;
      }

      var _Core$_parseSelector3 = Core._parseSelector(selectors),
          _Core$_parseSelector4 = _slicedToArray(_Core$_parseSelector3, 2),
          type = _Core$_parseSelector4[0],
          value = _Core$_parseSelector4[1];

      if (type === '#') {
        return this.findOneById(nodes, value);
      }

      if (type === '.') {
        return this.findOneByClass(nodes, value);
      }

      if (type) {
        return this.findOneByTag(nodes, value);
      }

      if (Core.isSelectorComplex(selectors)) {
        return this._findOneByCustom(nodes, selectors);
      }

      return this.findOneSelector(nodes, selectors);
    },
    // find all elements with a specific class
    findByClass: function findByClass(nodes, className) {
      if (!className) {
        className = nodes;
        nodes = this.context;
      }

      var results = new Set();
      this.nodeArray(nodes, true, true).forEach(function (node) {
        return Array.from(node.getElementsByClassName(className)).forEach(function (result) {
          return results.add(result);
        });
      });
      return this.sortNodes(_toConsumableArray(results));
    },
    // find the first element with a specific class
    findOneByClass: function findOneByClass(nodes, className) {
      return this.findByClass(nodes, className).shift() || null;
    },
    // find all elements with a specific ID
    findById: function findById(nodes, id) {
      if (!id) {
        id = nodes;
        nodes = this.context;
      }

      var results = new Set();
      this.nodeArray(nodes, true, true).forEach(function (node) {
        return results.add(node.getElementById(id));
      });
      return this.sortNodes(_toConsumableArray(results).filter(function (node) {
        return !!node;
      }));
    },
    // find the first element with a specific ID
    findOneById: function findOneById(nodes, id) {
      return this.findById(nodes, id).shift() || null;
    },
    // find all elements with a specific tag
    findByTag: function findByTag(nodes, tagName) {
      if (!tagName) {
        tagName = nodes;
        nodes = this.context;
      }

      var results = new Set();
      this.nodeArray(nodes, true, true).forEach(function (node) {
        return Array.from(node.getElementsByTagName(tagName)).forEach(function (result) {
          return results.add(result);
        });
      });
      return this.sortNodes(_toConsumableArray(results));
    },
    // find the first element with a specific tag
    findOneByTag: function findOneByTag(nodes, tagName) {
      return this.findByTag(nodes, tagName).shift() || null;
    },
    // find all elements matching a standard CSS selector
    findSelector: function findSelector(nodes, selector) {
      var results = new Set();
      this.nodeArray(nodes, true, true).forEach(function (node) {
        return Array.from(node.querySelectorAll(selector)).forEach(function (result) {
          return results.add(result);
        });
      });
      return this.sortNodes(_toConsumableArray(results));
    },
    // find the first element matching a standard CSS selector
    findOneSelector: function findOneSelector(nodes, selector) {
      var results = new Set();
      this.nodeArray(nodes, true, true).forEach(function (node) {
        return results.add(node.querySelector(selector));
      });
      return this.sortNodes(_toConsumableArray(results).filter(function (node) {
        return !!node;
      })).shift() || null;
    },
    // find all elements matching a custom CSS selector
    _findByCustom: function _findByCustom(nodes, selectors) {
      var _this35 = this;

      var results = new Set();

      Core._parseSelectors(selectors).forEach(function (selector) {
        var _selector = _slicedToArray(selector, 2),
            type = _selector[0],
            value = _selector[1];

        var selectorNodes = [];

        if (type === '#') {
          selectorNodes = _this35.findById(nodes, value);
        } else if (type === '.') {
          selectorNodes = _this35.findByClass(nodes, value);
        } else if (type === true) {
          selectorNodes = _this35.findByTag(nodes, value);
        } else if (!type) {
          selectorNodes = _this35.findSelector(nodes, value); // special cases
        } else if (['>', '+', '~'].includes(type)) {
          var _Core$_parseSubQuery = Core._parseSubQuery(value),
              _Core$_parseSubQuery2 = _slicedToArray(_Core$_parseSubQuery, 2),
              filter = _Core$_parseSubQuery2[0],
              query = _Core$_parseSubQuery2[1]; // node child


          if (type === '>') {
            selectorNodes = _this35.children(nodes, filter); // node next
          } else if (type === '+') {
            selectorNodes = _this35.next(nodes, filter); // node after
          } else if (type === '~') {
            selectorNodes = _this35.nextAll(nodes, filter);
          }

          if (selectorNodes.length && query) {
            selectorNodes = _this35.find(selectorNodes, query);
          }
        }

        selectorNodes.forEach(function (node) {
          return results.add(node);
        });
      });

      return this.sortNodes(_toConsumableArray(results));
    },
    // find the first element matching a custom CSS selector
    _findOneByCustom: function _findOneByCustom(nodes, selectors) {
      var _this36 = this;

      var results = new Set();

      Core._parseSelectors(selectors).forEach(function (selector) {
        var _selector2 = _slicedToArray(selector, 2),
            type = _selector2[0],
            value = _selector2[1];

        var selectorNode;

        if (type === '#') {
          selectorNode = _this36.findOneById(nodes, value);
        } else if (type === '.') {
          selectorNode = _this36.findOneByClass(nodes, value);
        } else if (type === true) {
          selectorNode = _this36.findOneByTag(nodes, value);
        } else if (!type) {
          selectorNode = _this36.findOneSelector(nodes, value); // special cases
        } else if (['>', '+', '~'].includes(type)) {
          var _Core$_parseSubQuery3 = Core._parseSubQuery(value),
              _Core$_parseSubQuery4 = _slicedToArray(_Core$_parseSubQuery3, 2),
              filter = _Core$_parseSubQuery4[0],
              query = _Core$_parseSubQuery4[1]; // node child


          if (type === '>') {
            selectorNode = _this36.child(nodes, filter); // node next
          } else if (type === '+') {
            selectorNode = _this36.next(nodes, filter); // node after
          } else if (type === '~') {
            selectorNode = _this36.nextAll(nodes, filter, false, true);
          }

          if (results.length && query) {
            selectorNode = _this36.findOne(selectorNode, query);
          }

          selectorNode = _this36.nodeArray(selectorNode).shift();
        }

        if (selectorNode) {
          results.add(selectorNode);
        }
      });

      return this.sortNodes(_toConsumableArray(results)).shift() || null;
    }
  });
  Object.assign(Core.prototype, {
    // find the first child of each element matching a filter
    child: function child(nodes, filter) {
      return this.children(nodes, filter, true);
    },
    // find all children of each element,
    // and optionally matching a filter
    children: function children(nodes, filter) {
      var _this37 = this;

      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elementsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      filter = this._parseFilter(filter);
      var results = new Set();
      this.nodeArray(nodes).forEach(function (node) {
        return _this37.nodeArray(node.childNodes, elementsOnly).forEach(function (child) {
          if (filter && !filter(child)) {
            return;
          }

          results.add(child);
          return !first;
        });
      });
      var nodeArray = this.sortNodes(_toConsumableArray(results));
      return first && Core.isNode(nodes) ? nodeArray.shift() || null : nodeArray;
    },
    // find all child nodes for each element,
    // (including text and comment nodes)
    contents: function contents(nodes) {
      return this.children(nodes, false, false, false);
    },
    // find the closest ancestor to each element matching a filter,
    // and optionally before hitting a limit
    closest: function closest(nodes, filter, until) {
      return this.parents(nodes, filter, until, true);
    },
    // find the parent of each element matching a filter
    parent: function parent(nodes, filter) {
      filter = this._parseFilter(filter);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        if (!node.parentNode) {
          return;
        }

        if (filter && !filter(node.parentNode)) {
          return;
        }

        results.add(node.parentNode);
      });
      var nodeArray = this.sortNodes(_toConsumableArray(results));
      return Core.isNode(nodes) ? nodeArray.shift() || null : nodeArray;
    },
    // find all parents of each element matching a filter,
    // and optionally before hitting a limit
    parents: function parents(nodes, filter, until) {
      var closest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      until = this._parseFilter(until);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        while (node = node.parentNode) {
          if (until && until(node)) {
            break;
          }

          if (filter && !filter(node)) {
            continue;
          }

          results.add(node);

          if (closest) {
            return;
          }
        }
      });
      var nodeArray = this.sortNodes(_toConsumableArray(results));
      return closest && Core.isNode(nodes) ? nodeArray.shift() || null : nodeArray;
    },
    // find the offset parent (relatively positioned) of the first element
    offsetParent: function offsetParent(nodes) {
      return this.forceShow(nodes, function (node) {
        return node.offsetParent;
      });
    },
    // find the next sibling for each element matching a filter
    next: function next(nodes, filter) {
      filter = this._parseFilter(filter);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        if (!node.nextSibling) {
          return;
        }

        if (filter && !filter(node.nextSibling)) {
          return;
        }

        results.add(node.nextSibling);
      });
      var nodeArray = this.sortNodes(_toConsumableArray(results));
      return Core.isNode(nodes) ? nodeArray.shift() || null : nodeArray;
    },
    // find all next siblings for each element matching a filter,
    // and optionally before hitting a limit
    nextAll: function nextAll(nodes, filter) {
      var until = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      until = this._parseFilter(until);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        while (node = node.nextSibling) {
          if (until && until(node)) {
            break;
          }

          if (filter && !filter(node)) {
            continue;
          }

          results.add(node);

          if (first) {
            break;
          }
        }
      });
      return this.sortNodes(_toConsumableArray(results));
    },
    // find the previous sibling for each element matching a filter,
    // and optionally before hitting a limit
    prev: function prev(nodes, filter) {
      filter = this._parseFilter(filter);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        if (!node.previousSibling) {
          return;
        }

        if (filter && !filter(node.previousSibling)) {
          return;
        }

        results.add(node.previousSibling);
      });
      var nodeArray = this.sortNodes(_toConsumableArray(results));
      return Core.isNode(nodes) ? nodeArray.shift() || null : nodeArray;
    },
    // find all previous siblings for each element matching a filter,
    // and optionally before hitting a limit
    prevAll: function prevAll(nodes, filter) {
      var until = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      until = this._parseFilter(until);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        while (node = node.previousSibling) {
          if (until && until(node)) {
            break;
          }

          if (filter && !filter(node)) {
            continue;
          }

          results.add(node);

          if (first) {
            break;
          }
        }
      });
      return this.sortNodes(_toConsumableArray(results));
    },
    // find all siblings for each element matching a filter
    siblings: function siblings(nodes, filter) {
      var _this38 = this;

      var elementsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      filter = this._parseFilter(filter);
      var results = new Set();
      this.nodeArray(nodes, false).forEach(function (node) {
        if (!node.parentNode) {
          return;
        }

        _this38.nodeArray(node.parentNode.childNodes, elementsOnly).forEach(function (child) {
          if (child.isSameNode(node)) {
            return;
          }

          if (filter && !filter(child)) {
            return;
          }

          results.add(child);
        });
      });
      return this.sortNodes(_toConsumableArray(results));
    }
  });
  Object.assign(Core.prototype, {
    // returns true if any of the elements has a specified attribute
    hasAttribute: function hasAttribute(nodes, attribute) {
      return !!this.nodeArray(nodes).find(function (node) {
        return node.hasAttribute(attribute);
      });
    },
    // returns true if any of the elements has any of the specified classes
    hasClass: function hasClass(nodes) {
      for (var _len4 = arguments.length, classes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        classes[_key4 - 1] = arguments[_key4];
      }

      classes = Core._parseClasses(classes);
      return !!this.nodeArray(nodes).find(function (node) {
        return classes.find(function (className) {
          return node.classList.contains(className);
        });
      });
    },
    // returns true if any of the nodes has custom data
    hasData: function hasData(nodes, key) {
      var _this39 = this;

      return !!this.nodeArray(nodes, false, true, true).find(function (node) {
        return _this39.nodeData.has(node) && (!key || _this39.nodeData.get(node).hasOwnProperty(key));
      });
    },
    // returns true if any of the elements has a specified property
    hasProperty: function hasProperty(nodes, property) {
      return !!this.nodeArray(nodes).find(function (node) {
        return node.hasOwnProperty(property);
      });
    },
    // returns true if any of the elements contains a descendent matching a filter
    contains: function contains(nodes, filter) {
      filter = this._parseFilterContains(filter);
      return !!this.nodeArray(nodes, true, true).find(function (node) {
        return !filter || filter(node);
      });
    },
    // returns true if any of the elements matches a filter
    is: function is(nodes, filter) {
      filter = this._parseFilter(filter);
      return !!this.nodeArray(nodes).find(function (node) {
        return !filter || filter(node);
      });
    },
    // returns true if any of the nodes is connected to the DOM
    isConnected: function isConnected(nodes) {
      return !!this.nodeArray(nodes, false).find(function (node) {
        return node.isConnected;
      });
    },
    // returns true if any of the elements or a parent of any of the elements is "fixed"
    isFixed: function isFixed(nodes) {
      var _this40 = this;

      return !!this.nodeArray(nodes).find(function (node) {
        return _this40.css(node, 'position') === 'fixed' || _this40.closest(node, function (parent) {
          return _this40.css(parent, 'position') === 'fixed';
        });
      });
    },
    // returns true if any of the elements is hidden
    isHidden: function isHidden(nodes) {
      var _this41 = this;

      return !!this.nodeArray(nodes, false, true, true).find(function (node) {
        if (Core.isWindow(node)) {
          return _this41.context.visibilityState !== 'visible';
        }

        if (Core.isDocument(node)) {
          return node.visibilityState !== 'visible';
        }

        if (Core.isBody(node)) {
          return _this41.getStyle(node, 'display') === 'none';
        }

        if (Core.isNode(node)) {
          return !node.offsetParent;
        }
      });
    },
    // returns true if any of the elements is visible
    isVisible: function isVisible(nodes) {
      var _this42 = this;

      return !!this.nodeArray(nodes, false, true, true).find(function (node) {
        if (Core.isWindow(node)) {
          return _this42.context.visibilityState === 'visible';
        }

        if (Core.isDocument(node)) {
          return node.visibilityState === 'visible';
        }

        if (Core.isBody(node)) {
          return _this42.getStyle(node, 'display') !== 'none';
        }

        if (Core.isNode(node)) {
          return node.offsetParent;
        }
      });
    }
  });
  Object.assign(Core.prototype, {
    // force an element to be shown, and then execute a callback
    forceShow: function forceShow(nodes, callback) {
      var _this43 = this;

      var node = this.nodeFirst(nodes, true, true, true);

      if (!node) {
        return;
      }

      if (this.isVisible(node)) {
        return callback(node);
      }

      var elements = [];
      var styles = [];

      if (this.css(node, 'display') === 'none') {
        elements.push(node);
        styles.push(this.getStyle(node, 'display'));
      }

      this.parents(node, function (parent) {
        return _this43.css(parent, 'display') === 'none';
      }).forEach(function (parent) {
        elements.push(parent);
        styles.push(_this43.getStyle(parent, 'display'));
      });
      this.setStyle(elements, 'display', 'initial', true);
      var result = callback(node);
      elements.forEach(function (element, index) {
        return _this43.setStyle(element, 'display', styles[index]);
      });
      return result;
    },
    // get the index of the first element matching a filter
    index: function index(nodes, filter) {
      filter = this._parseFilter(filter);
      return this.nodeArray(nodes).findIndex(function (node) {
        return !filter || filter(node);
      });
    },
    // get the index of the first element relative to it's parent element
    indexOf: function indexOf(nodes) {
      var node = this.nodeFirst(nodes);

      if (!node) {
        return;
      }

      return this.children(this.parent(node)).indexOf(node);
    },
    // create a selection on the first node
    select: function select(nodes) {
      var node = this.nodeFirst(nodes, false);

      if (node && node.select) {
        return node.select();
      }

      var selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      if (!node) {
        return;
      }

      var range = this.context.createRange();
      range.selectNode(node);
      selection.addRange(range);
    },
    // create a selection on all nodes
    selectAll: function selectAll(nodes) {
      var _this44 = this;

      var selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      this.nodeArray(nodes, false).forEach(function (node) {
        var range = _this44.context.createRange();

        range.selectNode(node);
        selection.addRange(range);
      });
    },
    // returns a serialized string containing names and values of all form elements
    serialize: function serialize(nodes) {
      return Core._parseParams(this.serializeObject(nodes));
    },
    // returns a serialized array containing names and values of all form elements
    serializeArray: function serializeArray(nodes) {
      var values = this.serializeObject(nodes);
      return Object.keys(values).map(function (name) {
        return {
          name: name,
          value: values[name]
        };
      });
    },
    // returns an object containing keys and values of all form elements
    serializeObject: function serializeObject(nodes) {
      var _this45 = this;

      return this.nodeArray(nodes).reduce(function (values, node) {
        if (node.matches('form')) {
          Object.assign(values, _this45.serializeObject(_this45.find(node, 'input, select, textarea')));
        } else if (!_this45.is(node, '[disabled], input[type=submit], input[type=reset], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
          var name = _this45.getAttribute(node, 'name');

          var value = _this45.getValue(node);

          if (name.substring(-2) === '[]') {
            if (!values[name]) {
              values[name] = [];
            }

            values[name].push(value);
          } else {
            values[name] = value;
          }
        }

        return values;
      }, {});
    }
  });
  Object.assign(Core, {
    // create a single-dimensional Array from a multiple-dimensional Array
    flattenArray: function flattenArray(array) {
      var _this46 = this;

      return array.reduce(function (acc, val) {
        return Array.isArray(val) ? acc.concat.apply(acc, _toConsumableArray(_this46.flattenArray(val))) : acc.concat(val);
      }, []);
    },
    // remove duplicate elements in an array
    uniqueArray: function uniqueArray(array) {
      return _toConsumableArray(new Set(array));
    }
  });
  Object.assign(Core, {
    // clamp a value between a min and max
    clamp: function clamp(value) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return Math.max(min, Math.min(max, value));
    },
    // clamp a value between 0 and 100
    clampPercent: function clampPercent(value) {
      return this.clamp(value, 0, 100);
    },
    // get the distance between two vectors
    dist: function dist(x1, y1, x2, y2) {
      return this.len(x1 - x2, y1 - y2);
    },
    // get the length of an X,Y vector
    len: function len(x, y) {
      return Math.hypot(x, y);
    },
    // linear interpolation from one value to another
    lerp: function lerp(min, max, amount) {
      return min * (1 - amount) + max * amount;
    },
    // map a value from one range to another
    map: function map(value, fromMin, fromMax, toMin, toMax) {
      return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    },
    // round a number to a specified precision
    toStep: function toStep(value, step) {
      return Math.round(value / step) * step;
    },
    // get the linear percent of a value in a specified range
    linearPercent: function linearPercent(value, min, max) {
      if (min === max) {
        return 0;
      }

      return this.clampPercent(100 * (value - min) / (max - min));
    },
    // get the linear value of a percent in a specified range
    linearValue: function linearValue(percent, min, max) {
      return this.clamp(min + percent / 100 * (max - min), min, max);
    },
    // get the logarithmic percent of a value in a specified range
    logPercent: function logPercent(value, min, max) {
      if (min === max) {
        return 0;
      }

      min = min ? Math.log(min) : 0;
      return this.clampPercent(100 * ((value ? Math.log(value) : 0) - min) / (Math.log(max) - min));
    },
    // get the logarithmic value of a percent in a specified range
    logValue: function logValue(percent, min, max) {
      min = min ? Math.log(min) : 0;
      return this.clamp(Math.exp(min + (Math.log(max) - min) * percent / 100), min, max);
    }
  });
  Object.assign(Core, {
    // returns an array from an array, node list, element list, query list or arbitrary value
    makeArray: function makeArray(value) {
      if (!value) {
        return [];
      }

      if (this.isArray(value)) {
        return value;
      }

      if (this.isNodeList(value) || this.isElementList(value)) {
        return Array.from(value);
      }

      if (this.isQuerySet(value)) {
        return value.get();
      }

      return [value];
    },
    // returns a function for filtering nodes (by element, document or window)
    _nodeFilterFactory: function _nodeFilterFactory() {
      var _this47 = this;

      var elementsOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var allowDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var allowWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return function (node) {
        return !elementsOnly && _this47.isNode(node) || elementsOnly && _this47.isElement(node) || allowDocument && _this47.isDocument(node) || allowWindow && _this47.isWindow(node);
      };
    }
  });
  Object.assign(Core, {
    forgetDot: function forgetDot(pointer, key) {
      var keys = key.split('.');
      var current;

      while (current = keys.shift() && keys.length) {
        if (!pointer.hasOwnProperty(current)) {
          return;
        }
      }

      delete pointer[current];
    },
    getDot: function getDot(pointer, key, defaultValue) {
      key.split('.').forEach(function (key) {
        if (!pointer.hasOwnProperty(key)) {
          pointer = defaultValue;
          return false;
        }

        pointer = pointer[key];
      });
      return pointer;
    },
    hasDot: function hasDot(pointer, key) {
      var result = true;
      key.split('.').forEach(function (key) {
        if (!pointer.hasOwnProperty(key)) {
          result = false;
          return false;
        }
      });
      return result;
    },
    pluckDot: function pluckDot(pointers, key) {
      var _this48 = this;

      return pointers.map(function (pointer) {
        return _this48.getDot(pointer, key);
      });
    },
    setDot: function setDot(pointer, key, value) {
      var _this49 = this;

      var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var keys = key.split('.');
      var current;

      while (current = keys.shift() && keys.length) {
        if (current === '*') {
          return Object.keys(pointer).forEach(function (k) {
            return _this49.dotSet(pointer[k], keys.join('.'), value, overwrite);
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
    // returns a DOM object from an HTML string
    parseHTML: function parseHTML(html) {
      var parser = new DOMParser();
      return parser.parseFromString(html, 'application/html');
    },
    // returns a DOM object from an XML string
    parseXML: function parseXML(xml) {
      var parser = new DOMParser();
      return parser.parseFromString(xml, 'application/xml');
    }
  });
  Object.assign(Core, {
    // convert a string to Camel Case
    camelCase: function camelCase(string) {
      return '' + string.replace(/(\-[a-z])/g, function (match) {
        return match.toUpperCase();
      }).replace('-', '');
    },
    // convert a string to Snake Case
    snakeCase: function snakeCase(string) {
      return '' + string.replace(/([A-Z])/g, function (match) {
        return "-".concat(match.toLowerCase());
      });
    }
  });
  Object.assign(Core, {
    // returns true if the value is an Array
    isArray: function isArray(value) {
      return Array.isArray(value);
    },
    // returns true if the value if a Body Element
    isBody: function isBody(value) {
      return value instanceof HTMLBodyElement;
    },
    // returns true if the value is a Boolean
    isBoolean: function isBoolean(value) {
      return value === !!value;
    },
    // returns true if the value if a Document
    isDocument: function isDocument(value) {
      return value instanceof Document;
    },
    // returns true if the value is a HTML Element
    isElement: function isElement(value) {
      return value instanceof HTMLElement;
    },
    // returns true if the value is a HTML Collection
    isElementList: function isElementList(value) {
      return value instanceof HTMLCollection;
    },
    // returns true if the value is a Function
    isFunction: function isFunction(value) {
      return typeof value === 'function';
    },
    // returns true if the value is a Node
    isNode: function isNode(value) {
      return value instanceof Node;
    },
    // returns true if the value is a Node List
    isNodeList: function isNodeList(value) {
      return value instanceof NodeList;
    },
    // returns true if the value is numeric
    isNumeric: function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    // returns true if the value is a plain Object
    isPlainObject: function isPlainObject(value) {
      return this.isObject(value) && value.constructor === Object;
    },
    // returns true if the value is an Object
    isObject: function isObject(value) {
      return value instanceof Object;
    },
    // returns true if the value is a Query Set
    isQuerySet: function isQuerySet(value) {
      return value instanceof QuerySet;
    },
    // returns true if any of the selectors is "complex"
    isSelectorComplex: function isSelectorComplex(selectors) {
      return !!this._parseSelectors(selectors).find(function (selector) {
        return ['>', '+', '~'].includes(selector[0]);
      });
    },
    // returns true if the value is a String
    isString: function isString(value) {
      return value === '' + value;
    },
    // returns true if the value is a Window
    isWindow: function isWindow(value) {
      return value instanceof Window;
    }
  });
  Object.assign(Core, {
    // returns a single dimensional array of classes (from a multi-dimensional array or space-separated strings)
    _parseClasses: function _parseClasses(classList) {
      return this.uniqueArray(this.flattenArray(classList).reduce(function (acc, val) {
        return acc.concat.apply(acc, _toConsumableArray(val.split(' ')));
      }, []).filter(function (val) {
        return val;
      }));
    },
    _parseData: function _parseData(key, value) {
      return this.isObject(key) ? key : _defineProperty({}, key, value);
    },
    // returns a "real" event from a dot-separated namespaced event
    _parseEvent: function _parseEvent(event) {
      return event.split('.').shift();
    },
    // returns an array of events from a space-separated string
    _parseEvents: function _parseEvents(events) {
      return events.split(' ');
    },
    // returns a FormData object from an array or object
    _parseFormData: function _parseFormData(data) {
      var formData = new FormData();

      if (this.isArray(data)) {
        var obj = {};
        data.forEach(function (value) {
          return obj[value.name] = value.value;
        });
        data = obj;
      }

      this._parseFormValues(data, formData);

      return formData;
    },
    // recursively appends an object to a formData object
    _parseFormValues: function _parseFormValues(data, formData, prevKey) {
      var _this50 = this;

      Object.keys(data).forEach(function (key) {
        var value = data[key];

        if (_this50.isPlainObject(value)) {
          return _this50._parseFormValues(value, formData, key);
        }

        if (prevKey) {
          key = "".concat(prevKey, "[").concat(key, "]");
        }

        if (!_this50.isArray(value)) {
          return formData.set(key, value);
        }

        value.forEach(function (val) {
          return formData.append(key, val);
        });
      });
    },
    // returns a URI-encoded attribute string from an array or object
    _parseParams: function _parseParams(data) {
      var _this51 = this;

      var values = [];

      if (this.isArray(data)) {
        values = data.map(function (value) {
          return _this51._parseParam(value.name, value.value);
        });
      } else if (this.isObject(data)) {
        values = Object.keys(data).map(function (key) {
          return _this51._parseParam(key, data[key]);
        });
      }

      return this.flattenArray(values).map(encodeURI).join('&');
    },
    // returns an array or string of key value pairs from an array, object or string
    _parseParam: function _parseParam(key, value) {
      var _this52 = this;

      if (this.isArray(value)) {
        return value.map(function (val) {
          return _this52._parseParam(key, val);
        });
      }

      if (this.isObject(value)) {
        return Object.keys(value).map(function (subKey) {
          return _this52._parseParam(key + '[' + subKey + ']', value[subKey]);
        });
      }

      return key + '=' + value;
    },
    // returns a type and selector from a string (optionally only fast)
    _parseSelector: function _parseSelector(selector) {
      var fast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var fastMatch = selector.match(this.fastRegex);

      if (fastMatch) {
        return fastMatch.slice(1);
      }

      if (!fast) {
        var specialMatch = selector.match(this.specialRegex);

        if (specialMatch) {
          return specialMatch.slice(1);
        }
      }

      return [false, selector];
    },
    // returns an array of types and selectors from an array or string
    _parseSelectors: function _parseSelectors(selectors) {
      var _this53 = this;

      if (!this.isArray(selectors)) {
        selectors = selectors.split(this.splitRegex).filter(function (selector) {
          return selector;
        });
      }

      return selectors.map(function (selector) {
        return _this53._parseSelector(selector.trim(), false);
      });
    },
    // returns the subquery selector from a string
    _parseSubQuery: function _parseSubQuery(selector) {
      return selector.match(this.subRegex).slice(1);
    }
  });
  Object.assign(Core.prototype, {
    // perform an XHR request
    ajax: function ajax(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (Core.isObject(url)) {
        data = url;
      } else {
        data = data || {};
        data.url = url;
      }

      var settings = _objectSpread({}, Core.ajaxDefaults, data);

      if (!settings.url) {
        settings.url = window.location;
      }

      if (settings.cache) {
        settings.url += (settings.url.indexOf('?') < 0 ? '?' : '&') + Date.now();
      }

      if (!settings.headers) {
        settings.headers = {};
      }

      if (settings.contentType && !settings.headers['Content-Type']) {
        settings.headers['Content-Type'] = settings.contentType;
      }

      if (!settings.headers['X-Requested-With']) {
        settings.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(settings.method, settings.url, true);
        Object.keys(settings.headers).forEach(function (key) {
          return xhr.setRequestHeader(key, settings.headers[key]);
        });

        if (settings.responseType) {
          xhr.responseType = settings.responseType;
        }

        xhr.onload = function (e) {
          if (xhr.status > 400) {
            reject(xhr.status, xhr, e);
          } else {
            resolve(xhr.response, xhr, e);
          }
        };

        xhr.onerror = function (e) {
          reject(xhr.status, xhr, e);
        };

        if (settings.uploadProgress) {
          xhr.upload.onprogress = function (e) {
            settings.uploadProgress(e.loaded / e.total, xhr, e);
          };
        }

        if (settings.beforeSend) {
          settings.beforeSend(xhr);
        }

        if (settings.data && settings.processData) {
          if (settings.contentType == 'application/json') {
            settings.data = JSON.stringify(settings.data);
          } else {
            settings.data = Core._parseParams(settings.data);
          }
        }

        xhr.send(settings.data);
      });
    },
    // perform an XHR request for a file upload
    upload: function upload(url, data) {
      if (Core.isObject(url)) {
        data = url;
      } else {
        data.url = url;
      }

      if (!data.method) {
        data.method = 'POST';
      }

      if (data.data) {
        data.data = Core._parseFormData(data.data);
        data.processData = false;
        data.contentType = false;
      }

      return this.ajax(data);
    },
    // load and executes a JavaScript file
    loadScript: function loadScript(script, cache) {
      return this.ajax(script, {
        cache: cache
      }).then(function (response) {
        return eval.apply(window, response);
      });
    },
    // load and execute multiple JavaScript files (in order)
    loadScripts: function loadScripts(scripts, cache) {
      var _this54 = this;

      return Promise.all(scripts.map(function (script) {
        return _this54.ajax(script, {
          cache: cache
        });
      })).then(function (responses) {
        return responses.forEach(function (response) {
          return eval.apply(window, response);
        });
      });
    },
    // import A CSS Stylesheet file
    loadStyle: function loadStyle(stylesheet, cache) {
      var _this55 = this;

      return this.ajax(stylesheet, {
        cache: cache
      }).then(function (response) {
        return _this55.append(_this55.findOne('head'), _this55.create('style', response));
      });
    },
    // import multiple CSS Stylesheet files
    loadStyles: function loadStyles(stylesheets, cache) {
      var _this56 = this;

      var head = this.findOne('head');
      return Promise.all(stylesheets.map(function (stylesheet) {
        return _this56.ajax(stylesheet, {
          cache: cache
        });
      })).then(function (responses) {
        return responses.forEach(function (response) {
          return _this56.append(head, _this56.create('style', response));
        });
      });
    }
  });
  Object.assign(Core.prototype, {
    // get a cookie value (optionally json encoded)
    getCookie: function getCookie(name) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cookie = decodeURIComponent(this.context.cookie).split(';').find(function (cookie) {
        return cookie.trimStart().substring(0, name.length) === name;
      });

      if (!cookie) {
        return null;
      }

      var value = cookie.trimStart().substring(name.length + 1);
      return json ? JSON.parse(value) : value;
    },
    // remove a cookie
    removeCookie: function removeCookie(name, options) {
      this.setCookie(name, '', _objectSpread({
        expires: -1
      }, options));
    },
    // set a cookie (optionally json encoded)
    setCookie: function setCookie(name, value, options) {
      var json = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!name) {
        return;
      }

      if (json) {
        value = JSON.stringify(value);
      }

      var cookie = name + '=' + value;

      if (options) {
        if (options.expires) {
          var date = new Date();
          date.setTime(date.getTime() + options.expires * 1000);
          cookie += ';expires=' + date.toUTCString();
        }

        if (options.path) {
          cookie += ';path=' + options.path;
        }

        if (options.secure) {
          cookie += ';secure';
        }
      }

      this.context.cookie = cookie;
    }
  });
  Object.assign(Core.prototype, {
    // create a self regenerating event that will execute once per animation frame
    animationEventFactory: function animationEventFactory(callback) {
      var updating = false;
      return function (e) {
        if (updating) {
          return;
        }

        updating = true;
        window.requestAnimationFrame(function () {
          callback(e);
          updating = false;
        });
      };
    },
    // create a mouse drag event (optionally limited by animation frame)
    mouseDragFactory: function mouseDragFactory(down, move, up) {
      var _this57 = this;

      var animated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (move && animated) {
        move = this.animationEventFactory(move);
      }

      return function (e) {
        if (down && down(e) === false) {
          return;
        }

        if (move) {
          _this57.addEvent(window, 'mousemove', move);
        }

        _this57.addEventOnce(window, 'mouseup', function (e) {
          // needed to make sure up callback runs after move callback
          window.requestAnimationFrame(function () {
            if (move) {
              _this57.removeEvent(window, 'mousemove', move);
            }

            if (up) {
              up(e);
            }
          });
        });
      };
    },
    // create a delegated event
    _delegateFactory: function _delegateFactory(node, selectors, callback) {
      var getDelegate = Core.isSelectorComplex(selectors) ? this._getDelegateContainsFactory(node, selectors) : this._getDelegateMatchFactory(node, selectors);
      return function (e) {
        if (e.target.isSameNode(node)) {
          return;
        }

        var delegate = getDelegate(e.target);

        if (!delegate) {
          return;
        }

        e.delegateTarget = delegate;
        return callback(e);
      };
    },
    // returns a function for matching a delegate target to a complex selector
    _getDelegateContainsFactory: function _getDelegateContainsFactory(node, selector) {
      var _this58 = this;

      return function (target) {
        var matches = _this58.find(node, selector);

        if (!matches.length) {
          return false;
        }

        if (matches.includes(target)) {
          return target;
        }

        return _this58.closest(target, function (parent) {
          return matches.contains(parent);
        }, node);
      };
    },
    // returns a function for matching a delegate target to a simple selector
    _getDelegateMatchFactory: function _getDelegateMatchFactory(node, selector) {
      var _this59 = this;

      return function (target) {
        return target.matches(selector) ? target : _this59.closest(target, function (parent) {
          return parent.matches(selector);
        }, node);
      };
    },
    // create a self-destructing event
    _selfDestructFactory: function _selfDestructFactory(node, event, callback) {
      var _this60 = this;

      var realCallback = function realCallback(e) {
        _this60.removeEvent(node, event, realCallback);

        return callback(e);
      };

      return realCallback;
    }
  });
  Object.assign(Core.prototype, {
    // returns an element filter function from a function, string, node, node list, element list or array
    _parseFilter: function _parseFilter(filter) {
      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return node.matches(filter);
        };
      }

      if (Core.isNode(filter)) {
        return function (node) {
          return node.isSameNode(filter);
        };
      }

      filter = this.nodeArray(filter);

      if (filter.length) {
        return function (node) {
          return filter.includes(node);
        };
      }

      return false;
    },
    // returns an element contains filter function from a function, string, node, node list, element list or array
    _parseFilterContains: function _parseFilterContains(filter) {
      var _this61 = this;

      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return !!_this61.findOne(node, filter);
        };
      }

      if (Core.isNode(filter)) {
        return function (node) {
          return node.contains(filter);
        };
      }

      filter = this.nodeArray(filter);

      if (filter.length) {
        return function (node) {
          return !!filter.find(function (other) {
            return node.contains(other);
          });
        };
      }

      return false;
    }
  });
  Object.assign(Core.prototype, {
    nodeArray: function nodeArray(value) {
      var elementsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var allowDocument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var allowWindow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return Core.isString(value) ? this.find(value) : Core.makeArray(value).filter(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },
    nodeFirst: function nodeFirst(value) {
      var elementsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var allowDocument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var allowWindow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return Core.isString(value) ? this.findOne(value) : Core.makeArray(value).find(Core._nodeFilterFactory(elementsOnly, allowDocument, allowWindow));
    },
    // sorts nodes by their position in the document
    sortNodes: function sortNodes(nodes) {
      return this.nodeArray(nodes, false).sort(function (a, b) {
        if (a.isSameNode(b)) {
          return 0;
        }

        var pos = a.compareDocumentPosition(b);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          return -1;
        } else if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  });
  Object.assign(Core.prototype, {
    // returns an array containing nodes parsed from a HTML string
    parseHTML: function parseHTML(html) {
      var fragment = this.context.createRange().createContextualFragment(html);
      return Array.from(fragment.children);
    },
    // returns an array of nodes from a HTML string, query selector string, node, node list, element list or array
    _parseQuery: function _parseQuery(query) {
      var elementsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var allowDocument = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var allowWindow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (query && Core.isString(query) && query.match(Core.htmlRegex)) {
        return this.parseHTML(query);
      }

      return this.nodeArray(query || '*', elementsOnly, allowDocument, allowWindow);
    }
  }); // matches id, class or tag only selectors

  Core.fastRegex = /^\s*([\#\.]?)([\w\-]+)\s*$/; // matches a selector beginning with > + or ~

  Core.specialRegex = /^\s*([\>\+\~])(.*)$/; // splits the first node of a special selector

  Core.subRegex = /^\s*((?:[\w\#\.\:\-]|(?:\[(?:[^\[\]]*|\[[^\[\]]*\])*\]))*)\s*(.*)$/; // splits comma seperator selectors into each selector

  Core.splitRegex = /\s*((?:[\w\#\.\:\-]|\[(?:[^\[\]]*|\[[^\[\]]*\])*\]|[\s\>\~\+])+)\s*\,?/; // matches html query strings

  Core.htmlRegex = /^\s*\</; // css properties that have number-only values

  Core.cssNumberProperties = ['font-weight', 'line-height', 'opacity', 'orphans', 'widows', 'z-index']; // default ajax settings

  Core.ajaxDefaults = {
    beforeSend: false,
    cache: false,
    contentType: 'application/x-www-form-urlencoded',
    //'application/x-www-form-urlencoded',
    data: false,
    dataType: false,
    method: 'GET',
    processData: true,
    url: false
  };

  var QuerySet =
  /*#__PURE__*/
  function () {
    function QuerySet(nodes) {
      var core = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : core;

      _classCallCheck(this, QuerySet);

      this.core = core;
      this.nodes = this.core._parseQuery(nodes, true, true, true);
      this.stack = [];
    }

    _createClass(QuerySet, [{
      key: "delay",
      value: function delay(duration) {
        return this.queue(function () {
          return new Promise(function (resolve) {
            return setTimeout(resolve, duration);
          });
        });
      }
    }, {
      key: "each",
      value: function each(callback) {
        this.nodes.forEach(callback);
        return this;
      }
    }, {
      key: "eq",
      value: function eq(index) {
        return this.pushStack(this.get(index));
      }
    }, {
      key: "filter",
      value: function filter(callback) {
        return this.pushStack(this.nodes.filter(callback));
      }
    }, {
      key: "first",
      value: function first() {
        return this.eq(0);
      }
    }, {
      key: "get",
      value: function get() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (index === false) {
          return this.nodes;
        }

        return index < 0 ? this.nodes[index + this.nodes.length] : this.nodes[index];
      }
    }, {
      key: "last",
      value: function last() {
        return this.eq(-1);
      }
    }, {
      key: "map",
      value: function map(callback) {
        this.nodes.map(callback);
        return this;
      }
    }, {
      key: "popStack",
      value: function popStack() {
        this.nodes = this.stack.pop() || [];
        return this;
      }
    }, {
      key: "pushStack",
      value: function pushStack(nodes) {
        this.stack.push(this.nodes.slice());
        this.nodes = nodes;
        return this;
      }
    }, {
      key: "slice",
      value: function slice() {
        var _this$nodes;

        return this.pushStack((_this$nodes = this.nodes).slice.apply(_this$nodes, arguments));
      }
    }]);

    return QuerySet;
  }();

  var QuerySetImmutable =
  /*#__PURE__*/
  function (_QuerySet) {
    _inherits(QuerySetImmutable, _QuerySet);

    function QuerySetImmutable() {
      _classCallCheck(this, QuerySetImmutable);

      return _possibleConstructorReturn(this, _getPrototypeOf(QuerySetImmutable).apply(this, arguments));
    }

    _createClass(QuerySetImmutable, [{
      key: "pushStack",
      value: function pushStack(nodes) {
        return new QuerySetImmutable(nodes);
      }
    }]);

    return QuerySetImmutable;
  }(QuerySet);

  Object.assign(QuerySet.prototype, {
    // add an animation to each element
    animate: function animate(callback, options) {
      var _this62 = this;

      return this.queue(function (node) {
        return _this62.core.animate(node, callback, options);
      });
    },
    // stop all animations for each element
    stop: function stop() {
      var finish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.core.stop(this.nodes, finish);
      return this.clearQueue();
    }
  });
  Object.assign(QuerySet.prototype, {
    // slide each element in from the top over a duration
    dropIn: function dropIn(options) {
      var _this63 = this;

      return this.queue(function (node) {
        return _this63.core.dropIn(node, options);
      });
    },
    // slide each element out to the top over a duration
    dropOut: function dropOut(options) {
      var _this64 = this;

      return this.queue(function (node) {
        return _this64.core.dropOut(node, options);
      });
    },
    // fade the opacity of each element in over a duration
    fadeIn: function fadeIn(options) {
      var _this65 = this;

      return this.queue(function (node) {
        return _this65.core.fadeIn(node, options);
      });
    },
    // fade the opacity of each element out over a duration
    fadeOut: function fadeOut(options) {
      var _this66 = this;

      return this.queue(function (node) {
        return _this66.core.fadeOut(node, options);
      });
    },
    // rotate each element in on an x,y over a duration
    rotateIn: function rotateIn(options) {
      var _this67 = this;

      return this.queue(function (node) {
        return _this67.core.rotateIn(node, options);
      });
    },
    // rotate each element out on an x,y over a duration
    rotateOut: function rotateOut(options) {
      var _this68 = this;

      return this.queue(function (node) {
        return _this68.core.rotateOut(node, options);
      });
    },
    // slide each element into place from a direction over a duration
    slideIn: function slideIn(options) {
      var _this69 = this;

      return this.queue(function (node) {
        return _this69.core.slideIn(node, options);
      });
    },
    // slide each element out of place to a direction over a duration
    slideOut: function slideOut(options) {
      var _this70 = this;

      return this.queue(function (node) {
        return _this70.core.slideOut(node, options);
      });
    },
    // squeeze each element into place from a direction over a duration
    squeezeIn: function squeezeIn(options) {
      var _this71 = this;

      return this.queue(function (node) {
        return _this71.core.squeezeIn(node, options);
      });
    },
    // squeeze each element out of place to a direction over a duration
    squeezeOut: function squeezeOut(options) {
      var _this72 = this;

      return this.queue(function (node) {
        return _this72.core.squeezeOut(node, options);
      });
    }
  });
  Object.assign(QuerySet.prototype, {
    // clear the queue of each element
    clearQueue: function clearQueue() {
      this.core.clearQueue(this.nodes);
      return this;
    },
    // queue a callback on each element
    queue: function queue(callback) {
      this.core.queue(this.nodes, callback);
      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // get an attribute value for the first element
    getAttribute: function getAttribute(attribute) {
      return this.core.getAttribute(this.nodes, attribute);
    },
    // get a dataset value for the first element
    getDataset: function getDataset(key) {
      return this.core.getDataset(this.nodes, key);
    },
    // get the HTML contents of the first element
    getHTML: function getHTML() {
      return this.core.getHTML(this.nodes);
    },
    // get a property value for the first element
    getProperty: function getProperty(property) {
      return this.core.getProperty(this.nodes, property);
    },
    // get the text contents of the first element
    getText: function getText() {
      return this.core.getText(this.nodes);
    },
    // get the value property of the first element
    getValue: function getValue() {
      return this.core.getValue(this.nodes);
    },
    // remove an attribute from each element
    removeAttribute: function removeAttribute(attribute) {
      this.core.removeAttribute(this.nodes, attribute);
      return this;
    },
    // remove a property from each element
    removeProperty: function removeProperty(property) {
      this.core.removeProperty(this.nodes, property);
      return this;
    },
    // set attributes for each element
    setAttribute: function setAttribute(attribute, value) {
      this.core.setAttribute(this.nodes, attribute, value);
      return this;
    },
    // set dataset values for each element
    setDataset: function setDataset(key, value) {
      this.core.setDataset(this.nodes, key, value);
      return this;
    },
    // set the HTML contents for each element
    setHTML: function setHTML(html) {
      this.core.setHTML(this.nodes, html);
      return this;
    },
    // set property values for each element
    setProperty: function setProperty(property, value) {
      this.core.setProperty(this.nodes, property, value);
      return this;
    },
    // set the text contents for each element
    setText: function setText(text) {
      this.core.setText(this.nodes, text);
      return this;
    },
    // set the value property for each element
    setValue: function setValue(value) {
      this.core.setValue(this.nodes, value);
      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // get data for the first node
    getData: function getData(key) {
      return this.core.getData(this.nodes, key);
    },
    // remove custom data for each node
    removeData: function removeData(key) {
      this.core.removeData(this.nodes, key);
      return this;
    },
    // set custom data for each node
    setData: function setData(key, value) {
      this.core.setData(this.nodes, key, value);
      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // get the X,Y co-ordinates for the center of the first element (optionally offset)
    center: function center(offset) {
      return this.core.center(this.nodes, offset);
    },
    // constrain each element to a container element
    constrain: function constrain(container) {
      return this.core.constrain(this.nodes, container);
    },
    // get the distance of an element to an X, Y position in the window
    distTo: function distTo(x, y) {
      return this.core.distTo(this.nodes, x, y);
    },
    // get the distance between two elements
    distToNode: function distToNode(others) {
      return this.core.distToNode(this.nodes, others);
    },
    // get the nearest element to an X, Y position in the window
    nearestTo: function nearestTo(x, y) {
      return this.core.nearestTo(this.nodes, x, y);
    },
    // get the nearest element to another element
    nearestToNode: function nearestToNode(others) {
      return this.core.nearestToNode(this.nodes, others);
    },
    // get the percentage of an X co-ordinate relative to an element
    percentX: function percentX(x) {
      return this.core.percentX(this.nodes, x);
    },
    // get the percentage of a Y co-ordinate relative to an element
    percentY: function percentY(y) {
      return this.core.percentY(this.nodes, y);
    },
    // get the position of the first element relative to the window (optionally offset)
    position: function position(offset) {
      return this.core.position(this.nodes, offset);
    },
    // get the computed bounding rectangle of the first element
    rect: function rect(offset) {
      return this.core.rect(this.nodes, offset);
    }
  });
  Object.assign(QuerySet.prototype, {
    // scroll each element to an X, Y position
    scrollTo: function scrollTo(x, y) {
      this.core.scrollTo(this.nodes, x, y);
      return this;
    },
    // scroll each element to an X position
    scrollToX: function scrollToX(x) {
      this.core.scrollToX(this.nodes, x);
      return this;
    },
    // scroll each element to a Y position
    scrollToY: function scrollToY(y) {
      this.core.scrollToY(this.nodes, y);
      return this;
    },
    // get the scroll X position of the first element
    scrollX: function scrollX() {
      return this.core.scrollX(this.nodes);
    },
    // get the scroll Y position of the first element
    scrollY: function scrollY() {
      return this.core.scrollY(this.nodes);
    }
  });
  Object.assign(QuerySet.prototype, {
    // get the computed height of the first element
    // (and optionally padding, border or margin)
    height: function height(padding, border, margin) {
      return this.core.height(this.nodes, padding, border, margin);
    },
    // get the computed width of the first element
    // (and optionally padding, border or margin)
    width: function width(padding, border, margin) {
      return this.core.width(this.nodes, padding, border, margin);
    }
  });
  Object.assign(QuerySet.prototype, {
    // add a class or classes to each element
    addClass: function addClass() {
      var _this$core;

      for (var _len5 = arguments.length, classes = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        classes[_key5] = arguments[_key5];
      }

      (_this$core = this.core).addClass.apply(_this$core, [this.nodes].concat(classes));

      return this;
    },
    // get the computed style for the first element
    css: function css(style) {
      return this.core.css(this.nodes, style);
    },
    // get a style property for the first element
    getStyle: function getStyle(style) {
      return this.core.getStyle(this.nodes, style);
    },
    // hide each element from display
    hide: function hide() {
      var _this73 = this;

      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (duration > 0) {
        return this.fadeOut(duration).queue(function (node) {
          return _this73.core.hide(node);
        });
      }

      this.core.hide(this.nodes);
      return this;
    },
    // remove a class or classes from each element
    removeClass: function removeClass() {
      var _this$core2;

      for (var _len6 = arguments.length, classes = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        classes[_key6] = arguments[_key6];
      }

      (_this$core2 = this.core).removeClass.apply(_this$core2, [this.nodes].concat(classes));

      return this;
    },
    // set style properties for each element
    setStyle: function setStyle(style, value) {
      this.core.setStyle(this.nodes, style, value);
      return this;
    },
    // display each hidden element
    show: function show() {
      var _this74 = this;

      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (duration > 0) {
        return this.queue(function (node) {
          _this74.core.show(nodes);

          _this74.core.fadeIn(node, duration);
        });
      }

      this.core.show(this.nodes);
      return this;
    },
    // toggle the visibility of each element
    toggle: function toggle() {
      this.core.toggle(this.nodes);
      return this;
    },
    // toggle a class or classes for each element
    toggleClass: function toggleClass() {
      var _this$core3;

      for (var _len7 = arguments.length, classes = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        classes[_key7] = arguments[_key7];
      }

      (_this$core3 = this.core).toggleClass.apply(_this$core3, [this.nodes].concat(classes));

      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // add an event to each element
    addEvent: function addEvent(events, delegate, callback) {
      this.core.addEvent(this.nodes, events, delegate, callback);
      return this;
    },
    // add a self-destructing event to each element
    addEventOnce: function addEventOnce(events, delegate, callback) {
      this.core.addEvent(this.nodes, events, delegate, callback, true);
      return this;
    },
    // trigger a blur event on the first element
    blur: function blur() {
      this.core.blur(this.nodes);
      return this;
    },
    // trigger a click event on the first element
    click: function click() {
      this.core.click(this.nodes);
      return this;
    },
    // clone all events from each element to other elements
    cloneEvents: function cloneEvents(clones) {
      this.core.cloneEvents(this.nodes, clones);
      return this;
    },
    // trigger a focus event on the first element
    focus: function focus() {
      this.core.focus(this.nodes);
      return this;
    },
    // remove an event from each element
    removeEvent: function removeEvent(events, delegate, callback) {
      this.core.removeEvent(this.nodes, events, delegate, callback);
      return this;
    },
    // trigger an event on each element
    triggerEvent: function triggerEvent(events, data) {
      this.core.triggerEvent(this.nodes, events, data);
      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // insert each other node after the first node
    after: function after(others) {
      this.core.after(this.nodes, others);
      return this;
    },
    // append each other nodes to the first node
    append: function append(others) {
      this.core.append(this.nodes, others);
      return this;
    },
    // append each node to the first other node
    appendTo: function appendTo(others) {
      this.core.appendTo(this.nodes, others);
      return this;
    },
    // insert each other node before the first node
    before: function before(others) {
      this.core.before(this.nodes, others);
      return this;
    },
    // clone each node (optionally deep, and with events and data)
    clone: function clone() {
      var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var eventsData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.pushStack(this.core.clone(this.nodes, deep, eventsData));
    },
    // detach an element from the DOM
    detach: function detach() {
      this.core.detach(this.nodes);
      return this;
    },
    // remove all children of each node from the DOM
    empty: function empty() {
      this.core.empty(this.nodes);
      return this;
    },
    // insert each node after the first other node
    insertAfter: function insertAfter(others) {
      this.core.insertAfter(this.nodes, others);
      return this;
    },
    // insert each node before the first other node
    insertBefore: function insertBefore(others) {
      this.core.insertBefore(this.nodes, others);
      return this;
    },
    // prepend each other node to the first node
    prepend: function prepend(others) {
      this.core.prepend(this.nodes, others);
      return this;
    },
    // prepend each node to the first other node
    prependTo: function prependTo(others) {
      this.core.prependTo(this.nodes, others);
      return this;
    },
    // remove each node from the DOM
    remove: function remove() {
      this.core.remove(this.nodes);
      return this;
    },
    // replace each other node with nodes
    replaceAll: function replaceAll(others) {
      this.core.replaceAll(this.nodes, others);
      return this;
    },
    // replace each node with other nodes
    replaceWith: function replaceWith(others) {
      this.core.replaceWith(this.nodes, others);
      return this;
    },
    // unwrap each node (optionally matching a filter)
    unwrap: function unwrap(filter) {
      this.core.unwrap(this.nodes, filter);
      return this;
    },
    // wrap each nodes with other nodes
    wrap: function wrap(others) {
      this.core.wrap(this.nodes, others);
      return this;
    },
    // wrap all nodes with other nodes
    wrapAll: function wrapAll(others) {
      this.core.wrapAll(this.nodes, others);
      return this;
    },
    // wrap the contents of each node with other nodes
    wrapInner: function wrapInner(others) {
      this.core.wrapInner(this.nodes, others);
      return this;
    }
  });
  Object.assign(QuerySet.prototype, {
    // returns true if any of the elements contains a descendent matching a filter
    contains: function contains(filter) {
      return this.core.contains(this.nodes, filter);
    },
    // returns true if any of the elements has a specified attribute
    hasAttribute: function hasAttribute(attribute) {
      return this.core.hasAttribute(this.nodes, attribute);
    },
    // returns true if any of the elements has any of the specified classes
    hasClass: function hasClass() {
      var _this$core4;

      for (var _len8 = arguments.length, classes = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        classes[_key8] = arguments[_key8];
      }

      return (_this$core4 = this.core).hasClass.apply(_this$core4, [this.nodes].concat(classes));
    },
    // returns true if any of the nodes has data
    hasData: function hasData(key) {
      return this.core.hasData(this.nodes, key);
    },
    // returns true if any of the elements has a specified property
    hasProperty: function hasProperty(property) {
      return this.core.hasProperty(this.nodes, property);
    },
    // returns true if any of the elements or a parent of the elements is "fixed"
    isFixed: function isFixed() {
      return this.core.isFixed(this.nodes);
    },
    // returns true if any of the elements in the set is hidden
    isHidden: function isHidden() {
      return this.core.isHidden(this.nodes);
    },
    // returns true if any of the elements in the set is visible
    isVisible: function isVisible() {
      return this.core.isVisible(this.nodes);
    }
  });
  Object.assign(QuerySet.prototype, {
    // return all elements matching a filter
    filter: function filter(_filter2) {
      return this.pushStack(this.core.filter(this.nodes, _filter2));
    },
    // return the first element matching a filter
    filterOne: function filterOne(filter) {
      return this.pushStack(this.core.filterOne(this.nodes, filter));
    },
    // return all elements with a descendent matching the selector
    has: function has(selector) {
      return this.pushStack(this.core.has(this.nodes, selector));
    },
    // return all hidden elements
    hidden: function hidden() {
      return this.pushStack(this.core.hidden(this.nodes));
    },
    // return all elements not matching a filter
    not: function not(filter) {
      return this.pushStack(this.core.not(this.nodes, filter));
    },
    // return all visible elements
    visible: function visible() {
      return this.pushStack(this.core.visible(this.nodes));
    }
  });
  Object.assign(QuerySet.prototype, {
    // find all elements matching a selector
    find: function find(selector) {
      return this.pushStack(this.core.find(this.nodes, selector));
    },
    // find all elements with a specific class
    findByClass: function findByClass(className) {
      return this.pushStack(this.core.findByClass(this.nodes, className));
    },
    // find all elements with a specific ID
    findById: function findById(id) {
      return this.pushStack(this.core.findById(this.nodes, id));
    },
    // find all elements with a specific tag
    findByTag: function findByTag(tagName) {
      return this.pushStack(this.core.findByTag(this.nodes, tagName));
    },
    // find a single element matching a selector
    findOne: function findOne(selector) {
      return this.pushStack(this.core.findOne(this.nodes, selector));
    },
    // find the first element with a specific class
    findOneByClass: function findOneByClass(className) {
      return this.pushStack(this.core.findOneByClass(this.nodes, className));
    },
    // find the first element with a specific ID
    findOneById: function findOneById(id) {
      return this.pushStack(this.core.findOneById(this.nodes, id));
    },
    // find the first element with a specific tag
    findOneByTag: function findOneByTag(tagName) {
      return this.pushStack(this.core.findOneByTag(this.nodes, tagName));
    }
  });
  Object.assign(QuerySet.prototype, {
    // find the closest ancestor to each element matching a filter,
    // and optionally before hitting a limit
    closest: function closest(filter, until) {
      return this.pushStack(this.core.closest(this.nodes, filter, until));
    },
    // find the first child of each element matching a filter
    child: function child(filter) {
      return this.pushStack(this.core.child(this.nodes, filter));
    },
    // find all children of each element,
    // and optionally matching a filter
    children: function children(filter) {
      return this.pushStack(this.core.children(this.nodes, filter));
    },
    // find all child nodes for each element,
    // (including text and comment nodes)
    contents: function contents() {
      return this.pushStack(this.core.contents(this.nodes));
    },
    // find the next sibling for each element matching a filter
    next: function next(filter) {
      return this.pushStack(this.core.next(this.nodes, filter));
    },
    // find all next siblings for each element matching a filter,
    // and optionally before hitting a limit
    nextAll: function nextAll(filter) {
      var until = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.pushStack(this.core.nextAll(this.nodes, filter, until, first));
    },
    // find the offset parent (relatively positioned) of the first element
    offsetParent: function offsetParent() {
      return this.pushStack(this.core.offsetParent(this.nodes));
    },
    // find the parent of each element matching a filter
    parent: function parent(filter) {
      return this.pushStack(this.core.parent(this.nodes, filter));
    },
    // find all parents of each element matching a filter,
    // and optionally before hitting a limit
    parents: function parents(filter, until) {
      return this.pushStack(this.core.parents(this.nodes, filter, until));
    },
    // find the previous sibling for each element matching a filter,
    // and optionally before hitting a limit
    prev: function prev(filter) {
      return this.pushStack(this.core.prev(this.nodes, filter));
    },
    // find all previous siblings for each element matching a filter,
    // and optionally before hitting a limit
    prevAll: function prevAll(filter) {
      var until = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.pushStack(this.core.prevAll(this.nodes, filter, until, first));
    },
    // find all siblings for each element matching a filter
    siblings: function siblings(filter) {
      return this.pushStack(this.core.siblings(this.nodes, filter));
    }
  });
  Object.assign(QuerySet.prototype, {
    // force an element to be shown, and then execute a callback
    forceShow: function forceShow(callback) {
      return this.core.forceShow(this.nodes, callback);
    },
    // get the index of the first element matching a filter
    index: function index(filter) {
      return this.core.index(this.nodes, filter);
    },
    // get the index of the first element relative to it's parent element
    indexOf: function indexOf() {
      return this.core.indexOf(this.nodes);
    },
    // create a selection on the first node
    select: function select() {
      this.core.select(this.nodes);
      return this;
    },
    // create a selection on all nodes
    selectAll: function selectAll() {
      this.core.selectAll(this.nodes);
      return this;
    },
    // returns a serialized string containing names and values of all form elements
    serialize: function serialize() {
      return this.core.serialize(this.nodes);
    },
    // returns a serialized array containing names and values of all form elements
    serializeArray: function serializeArray() {
      return this.core.serializeArray(this.nodes);
    },
    // returns an object containing keys and values of all form elements
    serializeObject: function serializeObject() {
      return this.core.serializeObject(this.nodes);
    }
  });
  return {
    Core: Core,
    core: new Core(),
    QuerySet: QuerySet,
    QuerySetImmutable: QuerySetImmutable
  };
});