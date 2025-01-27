import {
  require_prop_types
} from "./chunk-BLG6QWMW.js";
import {
  require_shallowequal
} from "./chunk-OJMNJ562.js";
import {
  __commonJS,
  require_react
} from "./chunk-JRE55LYH.js";

// node_modules/performance-now/lib/performance-now.js
var require_performance_now = __commonJS({
  "node_modules/performance-now/lib/performance-now.js"(exports, module) {
    (function() {
      var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
      if (typeof performance !== "undefined" && performance !== null && performance.now) {
        module.exports = function() {
          return performance.now();
        };
      } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
        module.exports = function() {
          return (getNanoSeconds() - nodeLoadTime) / 1e6;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };
        moduleLoadTime = getNanoSeconds();
        upTime = process.uptime() * 1e9;
        nodeLoadTime = moduleLoadTime - upTime;
      } else if (Date.now) {
        module.exports = function() {
          return Date.now() - loadTime;
        };
        loadTime = Date.now();
      } else {
        module.exports = function() {
          return (/* @__PURE__ */ new Date()).getTime() - loadTime;
        };
        loadTime = (/* @__PURE__ */ new Date()).getTime();
      }
    }).call(exports);
  }
});

// node_modules/raf/index.js
var require_raf = __commonJS({
  "node_modules/raf/index.js"(exports, module) {
    var now = require_performance_now();
    var root = typeof window === "undefined" ? global : window;
    var vendors = ["moz", "webkit"];
    var suffix = "AnimationFrame";
    var raf = root["request" + suffix];
    var caf = root["cancel" + suffix] || root["cancelRequest" + suffix];
    for (i = 0; !raf && i < vendors.length; i++) {
      raf = root[vendors[i] + "Request" + suffix];
      caf = root[vendors[i] + "Cancel" + suffix] || root[vendors[i] + "CancelRequest" + suffix];
    }
    var i;
    if (!raf || !caf) {
      last = 0, id = 0, queue = [], frameDuration = 1e3 / 60;
      raf = function(callback) {
        if (queue.length === 0) {
          var _now = now(), next = Math.max(0, frameDuration - (_now - last));
          last = next + _now;
          setTimeout(function() {
            var cp = queue.slice(0);
            queue.length = 0;
            for (var i2 = 0; i2 < cp.length; i2++) {
              if (!cp[i2].cancelled) {
                try {
                  cp[i2].callback(last);
                } catch (e) {
                  setTimeout(function() {
                    throw e;
                  }, 0);
                }
              }
            }
          }, Math.round(next));
        }
        queue.push({
          handle: ++id,
          callback,
          cancelled: false
        });
        return id;
      };
      caf = function(handle) {
        for (var i2 = 0; i2 < queue.length; i2++) {
          if (queue[i2].handle === handle) {
            queue[i2].cancelled = true;
          }
        }
      };
    }
    var last;
    var id;
    var queue;
    var frameDuration;
    module.exports = function(fn) {
      return raf.call(root, fn);
    };
    module.exports.cancel = function() {
      caf.apply(root, arguments);
    };
    module.exports.polyfill = function(object) {
      if (!object) {
        object = root;
      }
      object.requestAnimationFrame = raf;
      object.cancelAnimationFrame = caf;
    };
  }
});

// node_modules/react-headroom/dist/shouldUpdate.js
var require_shouldUpdate = __commonJS({
  "node_modules/react-headroom/dist/shouldUpdate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = function() {
      var lastKnownScrollY = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var currentScrollY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var state = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      var scrollDirection = currentScrollY >= lastKnownScrollY ? "down" : "up";
      var distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY);
      if (props.disable) {
        return {
          action: "none",
          scrollDirection,
          distanceScrolled
          // We're pinned
        };
      } else if (props.pin) {
        return {
          action: state.state !== "pinned" ? "pin" : "none",
          scrollDirection,
          distanceScrolled
          // We're at the top and not fixed yet.
        };
      } else if (currentScrollY <= props.pinStart && state.state !== "unfixed") {
        return {
          action: "unfix",
          scrollDirection,
          distanceScrolled
          // We're unfixed and headed down. Carry on.
        };
      } else if (currentScrollY <= state.height && scrollDirection === "down" && state.state === "unfixed") {
        return {
          action: "none",
          scrollDirection,
          distanceScrolled
        };
      } else if (currentScrollY > state.height + props.pinStart && scrollDirection === "down" && state.state === "unfixed") {
        return {
          action: "unpin-snap",
          scrollDirection,
          distanceScrolled
          // We're past the header and scrolling down.
          // We transition to "unpinned" if necessary.
        };
      } else if (scrollDirection === "down" && ["pinned", "unfixed"].indexOf(state.state) >= 0 && currentScrollY > state.height + props.pinStart && distanceScrolled > props.downTolerance) {
        return {
          action: "unpin",
          scrollDirection,
          distanceScrolled
          // We're scrolling up, we transition to "pinned"
        };
      } else if (scrollDirection === "up" && distanceScrolled > props.upTolerance && ["pinned", "unfixed"].indexOf(state.state) < 0) {
        return {
          action: "pin",
          scrollDirection,
          distanceScrolled
          // We're scrolling up, and inside the header.
          // We transition to pin regardless of upTolerance
        };
      } else if (scrollDirection === "up" && currentScrollY <= state.height && ["pinned", "unfixed"].indexOf(state.state) < 0) {
        return {
          action: "pin",
          scrollDirection,
          distanceScrolled
        };
      } else {
        return {
          action: "none",
          scrollDirection,
          distanceScrolled
        };
      }
    };
  }
});

// node_modules/react-headroom/dist/supportsPassiveEvents.js
var require_supportsPassiveEvents = __commonJS({
  "node_modules/react-headroom/dist/supportsPassiveEvents.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = supportsPassiveEvents;
    function supportsPassiveEvents() {
      var passiveSupported = false;
      try {
        var options = {
          get passive() {
            passiveSupported = true;
            return false;
          }
        };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch (err) {
        passiveSupported = false;
      }
      return passiveSupported;
    }
  }
});

// node_modules/react-headroom/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-headroom/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _shallowequal = require_shallowequal();
    var _shallowequal2 = _interopRequireDefault(_shallowequal);
    var _raf = require_raf();
    var _raf2 = _interopRequireDefault(_raf);
    var _shouldUpdate2 = require_shouldUpdate();
    var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);
    var _supportsPassiveEvents = require_supportsPassiveEvents();
    var _supportsPassiveEvents2 = _interopRequireDefault(_supportsPassiveEvents);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var noop = function noop2() {
    };
    var Headroom = function(_Component) {
      _inherits(Headroom2, _Component);
      _createClass(Headroom2, null, [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props, state) {
          if (props.disable && state.state !== "unfixed") {
            return {
              translateY: 0,
              className: "headroom headroom--unfixed headroom-disable-animation",
              animation: false,
              state: "unfixed"
            };
          }
          return null;
        }
      }]);
      function Headroom2(props) {
        _classCallCheck(this, Headroom2);
        var _this = _possibleConstructorReturn(this, (Headroom2.__proto__ || Object.getPrototypeOf(Headroom2)).call(this, props));
        _this.setRef = function(ref) {
          return _this.inner = ref;
        };
        _this.setHeightOffset = function() {
          _this.setState({
            height: _this.inner ? _this.inner.offsetHeight : ""
          });
          _this.resizeTicking = false;
        };
        _this.getScrollY = function() {
          if (_this.props.parent().pageYOffset !== void 0) {
            return _this.props.parent().pageYOffset;
          } else if (_this.props.parent().scrollTop !== void 0) {
            return _this.props.parent().scrollTop;
          } else {
            return (document.documentElement || document.body.parentNode || document.body).scrollTop;
          }
        };
        _this.getViewportHeight = function() {
          return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        };
        _this.getDocumentHeight = function() {
          var body = document.body;
          var documentElement = document.documentElement;
          return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);
        };
        _this.getElementPhysicalHeight = function(elm) {
          return Math.max(elm.offsetHeight, elm.clientHeight);
        };
        _this.getElementHeight = function(elm) {
          return Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight);
        };
        _this.getScrollerPhysicalHeight = function() {
          var parent = _this.props.parent();
          return parent === window || parent === document.body ? _this.getViewportHeight() : _this.getElementPhysicalHeight(parent);
        };
        _this.getScrollerHeight = function() {
          var parent = _this.props.parent();
          return parent === window || parent === document.body ? _this.getDocumentHeight() : _this.getElementHeight(parent);
        };
        _this.isOutOfBound = function(currentScrollY) {
          var pastTop = currentScrollY < 0;
          var scrollerPhysicalHeight = _this.getScrollerPhysicalHeight();
          var scrollerHeight = _this.getScrollerHeight();
          var pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight;
          return pastTop || pastBottom;
        };
        _this.handleScroll = function() {
          if (!_this.scrollTicking) {
            _this.scrollTicking = true;
            (0, _raf2.default)(_this.update);
          }
        };
        _this.handleResize = function() {
          if (!_this.resizeTicking) {
            _this.resizeTicking = true;
            (0, _raf2.default)(_this.setHeightOffset);
          }
        };
        _this.unpin = function() {
          _this.props.onUnpin();
          _this.setState({
            translateY: "-100%",
            className: "headroom headroom--unpinned",
            animation: true,
            state: "unpinned"
          });
        };
        _this.unpinSnap = function() {
          _this.props.onUnpin();
          _this.setState({
            translateY: "-100%",
            className: "headroom headroom--unpinned headroom-disable-animation",
            animation: false,
            state: "unpinned"
          });
        };
        _this.pin = function() {
          _this.props.onPin();
          _this.setState({
            translateY: 0,
            className: "headroom headroom--pinned",
            animation: true,
            state: "pinned"
          });
        };
        _this.unfix = function() {
          _this.props.onUnfix();
          _this.setState({
            translateY: 0,
            className: "headroom headroom--unfixed headroom-disable-animation",
            animation: false
          }, function() {
            setTimeout(function() {
              _this.setState({ state: "unfixed" });
            }, 0);
          });
        };
        _this.update = function() {
          _this.currentScrollY = _this.getScrollY();
          if (!_this.isOutOfBound(_this.currentScrollY)) {
            var _shouldUpdate = (0, _shouldUpdate3.default)(_this.lastKnownScrollY, _this.currentScrollY, _this.props, _this.state), action = _shouldUpdate.action;
            if (action === "pin") {
              _this.pin();
            } else if (action === "unpin") {
              _this.unpin();
            } else if (action === "unpin-snap") {
              _this.unpinSnap();
            } else if (action === "unfix") {
              _this.unfix();
            }
          }
          _this.lastKnownScrollY = _this.currentScrollY;
          _this.scrollTicking = false;
        };
        _this.currentScrollY = 0;
        _this.lastKnownScrollY = 0;
        _this.scrollTicking = false;
        _this.resizeTicking = false;
        _this.eventListenerOptions = false;
        _this.state = {
          state: "unfixed",
          translateY: 0,
          className: "headroom headroom--unfixed"
        };
        return _this;
      }
      _createClass(Headroom2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.setHeightOffset();
          this.eventListenerOptions = (0, _supportsPassiveEvents2.default)() ? { passive: true, capture: false } : false;
          if (!this.props.disable) {
            this.props.parent().addEventListener("scroll", this.handleScroll, this.eventListenerOptions);
            if (this.props.calcHeightOnResize) {
              this.props.parent().addEventListener("resize", this.handleResize, this.eventListenerOptions);
            }
          }
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.state, nextState);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          if (prevProps.children !== this.props.children) {
            this.setHeightOffset();
          }
          if (!prevProps.disable && this.props.disable) {
            this.props.parent().removeEventListener("scroll", this.handleScroll, this.eventListenerOptions);
            this.props.parent().removeEventListener("resize", this.handleResize, this.eventListenerOptions);
            if (prevState.state !== "unfixed" && this.state.state === "unfixed") {
              this.props.onUnfix();
            }
          } else if (prevProps.disable && !this.props.disable) {
            this.props.parent().addEventListener("scroll", this.handleScroll, this.eventListenerOptions);
            if (this.props.calcHeightOnResize) {
              this.props.parent().addEventListener("resize", this.handleResize, this.eventListenerOptions);
            }
          }
          if (prevProps.pin !== this.props.pin) {
            this.handleScroll();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.props.parent()) {
            this.props.parent().removeEventListener("scroll", this.handleScroll, this.eventListenerOptions);
            this.props.parent().removeEventListener("resize", this.handleResize, this.eventListenerOptions);
          }
          window.removeEventListener("scroll", this.handleScroll, this.eventListenerOptions);
        }
      }, {
        key: "render",
        value: function render() {
          var _props = this.props, userClassName = _props.className, Tag = _props.tag, divProps = _objectWithoutProperties(_props, ["className", "tag"]);
          delete divProps.onUnpin;
          delete divProps.onPin;
          delete divProps.onUnfix;
          delete divProps.disableInlineStyles;
          delete divProps.disable;
          delete divProps.pin;
          delete divProps.parent;
          delete divProps.children;
          delete divProps.upTolerance;
          delete divProps.downTolerance;
          delete divProps.pinStart;
          delete divProps.calcHeightOnResize;
          var style = divProps.style, wrapperStyle = divProps.wrapperStyle, rest = _objectWithoutProperties(divProps, ["style", "wrapperStyle"]);
          var innerStyle = {
            position: this.props.disable || this.state.state === "unfixed" ? "relative" : "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            WebkitTransform: "translate3D(0, " + this.state.translateY + ", 0)",
            MsTransform: "translate3D(0, " + this.state.translateY + ", 0)",
            transform: "translate3D(0, " + this.state.translateY + ", 0)"
          };
          var className = this.state.className;
          if (this.state.animation) {
            innerStyle = _extends({}, innerStyle, {
              WebkitTransition: "all .2s ease-in-out",
              MozTransition: "all .2s ease-in-out",
              OTransition: "all .2s ease-in-out",
              transition: "all .2s ease-in-out"
            });
            className += " headroom--scrolled";
          }
          if (!this.props.disableInlineStyles) {
            innerStyle = _extends({}, innerStyle, style);
          } else {
            innerStyle = style;
          }
          var wrapperStyles = _extends({}, wrapperStyle, {
            height: this.state.height ? this.state.height : null
          });
          var wrapperClassName = userClassName ? userClassName + " headroom-wrapper" : "headroom-wrapper";
          return _react2.default.createElement(
            Tag,
            { style: wrapperStyles, className: wrapperClassName },
            _react2.default.createElement(
              "div",
              _extends({
                ref: this.setRef
              }, rest, {
                style: innerStyle,
                className
              }),
              this.props.children
            )
          );
        }
      }]);
      return Headroom2;
    }(_react.Component);
    Headroom.propTypes = {
      className: _propTypes2.default.string,
      parent: _propTypes2.default.func,
      children: _propTypes2.default.any.isRequired,
      disableInlineStyles: _propTypes2.default.bool,
      disable: _propTypes2.default.bool,
      pin: _propTypes2.default.bool,
      upTolerance: _propTypes2.default.number,
      downTolerance: _propTypes2.default.number,
      onPin: _propTypes2.default.func,
      onUnpin: _propTypes2.default.func,
      onUnfix: _propTypes2.default.func,
      wrapperStyle: _propTypes2.default.object,
      pinStart: _propTypes2.default.number,
      style: _propTypes2.default.object,
      calcHeightOnResize: _propTypes2.default.bool,
      tag: _propTypes2.default.string
    };
    Headroom.defaultProps = {
      parent: function parent() {
        return window;
      },
      disableInlineStyles: false,
      disable: false,
      pin: false,
      upTolerance: 5,
      downTolerance: 0,
      onPin: noop,
      onUnpin: noop,
      onUnfix: noop,
      wrapperStyle: {},
      pinStart: 0,
      calcHeightOnResize: true,
      tag: "div"
    };
    exports.default = Headroom;
  }
});
export default require_dist();
//# sourceMappingURL=react-headroom.js.map
