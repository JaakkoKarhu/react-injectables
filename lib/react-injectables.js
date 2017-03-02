(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("react-injectables", ["react"], factory);
	else if(typeof exports === 'object')
		exports["react-injectables"] = factory(require("react"));
	else
		root["react-injectables"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Injector = exports.Injectable = exports.InjectablesProvider = undefined;

	var _InjectablesProvider2 = __webpack_require__(5);

	var _InjectablesProvider3 = _interopRequireDefault(_InjectablesProvider2);

	var _Injectable2 = __webpack_require__(4);

	var _Injectable3 = _interopRequireDefault(_Injectable2);

	var _Injector2 = __webpack_require__(6);

	var _Injector3 = _interopRequireDefault(_Injector2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.InjectablesProvider = _InjectablesProvider3.default;
	exports.Injectable = _Injectable3.default;
	exports.Injector = _Injector3.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.find = exports.map = exports.concatAll = exports.containsUniq = exports.uniqBy = exports.withoutAll = exports.without = exports.all = exports.filter = undefined;
	exports.compose = compose;
	exports.keyedElements = keyedElements;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 *
	 * Thank you Dan Abramov for this code!
	 */
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function () {
	    /* istanbul ignore next */
	    if (funcs.length === 0) {
	      return arguments.length <= 0 ? undefined : arguments[0];
	    }

	    var last = funcs[funcs.length - 1];
	    var rest = funcs.slice(0, -1);

	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

	// :: (a -> boolean) => [a] => [a]
	var filter = exports.filter = function filter(f) {
	  return function (x) {
	    return x.filter(f);
	  };
	};

	// :: (a -> boolean) => [a] => [a]
	var all = exports.all = function all(f) {
	  return function (x) {
	    for (var i = 0; i < x.length; i++) {
	      if (!f(x[i])) return false;
	    }

	    return true;
	  };
	};

	// :: a -> [a] -> [a]
	var without = exports.without = function without(toRemove) {
	  return function (point) {
	    return filter(function (x) {
	      return !Object.is(x, toRemove);
	    })(point);
	  };
	};

	// :: [a] -> [a] -> [a]
	var withoutAll = exports.withoutAll = function withoutAll(toRemove) {
	  return function (point) {
	    return filter(function (x) {
	      return all(function (y) {
	        return !Object.is(x, y);
	      })(toRemove);
	    })(point);
	  };
	};

	// :: a -> [b]
	var uniqBy = exports.uniqBy = function uniqBy(x) {
	  return function (y) {
	    var checked = new Set();
	    var result = [];

	    y.forEach(function (a) {
	      var prop = a[x];
	      if (!checked.has(prop)) {
	        checked.add(prop);
	        result.push(a);
	      }
	    });

	    return result;
	  };
	};

	/**
	 * :: [a] -> [a] -> boolean
	 *
	 * Determines if an array, `point`, has any items that is not contained within
	 * the `toCompare` array.
	 *
	 * @param toCompare
	 *   The array to compare against.
	 * @param point
	 *   The array to check with.
	 *
	 * @return
	 *   `true` if and only if `point` has at least one item that isn't
	 *   contained within `toCompare`.
	 */
	var containsUniq = exports.containsUniq = function containsUniq(toCompare) {
	  return function (point) {
	    return withoutAll(toCompare)(point).length > 0;
	  };
	};

	// :: [[a]] -> [a]
	var concatAll = exports.concatAll = function concatAll(x) {
	  return x.reduce(function (acc, cur) {
	    return [].concat(_toConsumableArray(acc), _toConsumableArray(cur));
	  }, []);
	};

	// :: (a => b) => [a] => [b]
	var map = exports.map = function map(f) {
	  return function (x) {
	    return x.map(f);
	  };
	};

	// :: (a => boolean) => [a] => a|undefined
	var find = exports.find = function find(f) {
	  return function (x) {
	    return x.find(f);
	  };
	};

	function KeyedComponent(_ref) {
	  var children = _ref.children;

	  return _react.Children.only(children);
	}

	//
	/**
	 * :: [Element] -> [Element]
	 *
	 * Ensures the given react elements have 'key' properties on them.
	 *
	 * @param  prefix
	 *   The prefix for the keys.
	 * @param  items
	 *   The react elements.
	 *
	 * @return The keyed react elements.
	 */
	function keyedElements(prefix, items) {
	  var index = 0;
	  return items.map(function (x) {
	    index++;
	    return _react2.default.createElement(
	      KeyedComponent,
	      { injectedComponentProps: x.props, key: prefix + '_' + index },
	      x
	    );
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var injectionIdIndex = 0;

	var Injectable = function Injectable(VeinComponent) {
	  injectionIdIndex++;
	  var injectionId = 'injectionId_' + injectionIdIndex;

	  var InjectableComponent = function (_Component) {
	    _inherits(InjectableComponent, _Component);

	    function InjectableComponent() {
	      var _ref;

	      var _temp, _this, _ret;

	      _classCallCheck(this, InjectableComponent);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InjectableComponent.__proto__ || Object.getPrototypeOf(InjectableComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	        injections: []
	      }, _this.consume = function (elements) {
	        if (elements.length !== _this.state.injections.length || (0, _utils.containsUniq)(_this.state.injections, elements)) {
	          _this.setState({ injections: elements });
	        }
	      }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(InjectableComponent, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        var _this2 = this;

	        this.context.registerInjectable({
	          injectionId: injectionId,
	          injectableInstance: this,
	          receive: function receive(elements) {
	            return _this2.consume(elements);
	          }
	        });
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context.removeInjectable({
	          injectionId: injectionId,
	          injectableInstance: this
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var keyed = (0, _utils.keyedElements)('injections', this.state.injections);
	        return _react2.default.createElement(VeinComponent, _extends({
	          injections: keyed
	        }, this.props));
	      }
	    }]);

	    return InjectableComponent;
	  }(_react.Component);

	  InjectableComponent.injectionId = injectionId;
	  InjectableComponent.contextTypes = {
	    registerInjectable: _react.PropTypes.func.isRequired,
	    removeInjectable: _react.PropTypes.func.isRequired
	  };


	  return InjectableComponent;
	};

	exports.default = Injectable;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _utils = __webpack_require__(2);

	var _invariant = __webpack_require__(3);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InjectablesProvider = function (_Component) {
	  _inherits(InjectablesProvider, _Component);

	  function InjectablesProvider(props, context) {
	    _classCallCheck(this, InjectablesProvider);

	    var _this = _possibleConstructorReturn(this, (InjectablesProvider.__proto__ || Object.getPrototypeOf(InjectablesProvider)).call(this, props, context));

	    _this.registrations = [];
	    return _this;
	  }

	  _createClass(InjectablesProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _this2 = this;

	      return {
	        registerInjector: function registerInjector(args) {
	          return _this2.registerInjector(args);
	        },

	        removeInjector: function removeInjector(args) {
	          return _this2.removeInjector(args);
	        },

	        updateInjector: function updateInjector(args) {
	          return _this2.updateInjector(args);
	        },

	        registerInjectable: function registerInjectable(args) {
	          return _this2.registerInjectable(args);
	        },

	        removeInjectable: function removeInjectable(args) {
	          return _this2.removeInjectable(args);
	        }
	      };
	    }
	  }, {
	    key: 'getRegistration',
	    value: function getRegistration(args) {
	      var injectionId = args.injectionId;


	      var registration = (0, _utils.find)(function (x) {
	        return x.injectionId === injectionId;
	      })(this.registrations);

	      if (!registration) {
	        registration = {
	          injectionId: injectionId,
	          injectables: [],
	          injections: []
	        };

	        this.registrations.push(registration);
	      }

	      return registration;
	    }
	  }, {
	    key: 'runInjections',
	    value: function runInjections(args) {
	      var registration = args.registration;
	      var injectables = registration.injectables,
	          injections = registration.injections;


	      var elements = (0, _utils.compose)((0, _utils.filter)(function (x) {
	        return x !== null && x !== undefined;
	      }), (0, _utils.map)(function (x) {
	        return x.inject();
	      }), (0, _utils.uniqBy)('injectorId'))(injections);

	      injectables.forEach(function (injectable) {
	        injectable.receive(elements);
	      });
	    }
	  }, {
	    key: 'removeRegistration',
	    value: function removeRegistration(args) {
	      var registration = args.registration;

	      this.registrations = (0, _utils.without)(registration)(this.registrations);
	    }
	  }, {
	    key: 'findInjectable',
	    value: function findInjectable(_ref) {
	      var registration = _ref.registration,
	          injectableInstance = _ref.injectableInstance;

	      var isInjectableInstance = function isInjectableInstance(x) {
	        return Object.is(x.instance, injectableInstance);
	      };
	      return (0, _utils.find)(isInjectableInstance)(registration.injectables);
	    }
	  }, {
	    key: 'clearRegistrationIfEmpty',
	    value: function clearRegistrationIfEmpty(_ref2) {
	      var registration = _ref2.registration;

	      if (registration.injectables.length === 0 && registration.injections.length === 0) {
	        this.removeRegistration({ registration: registration });
	      }
	    }
	  }, {
	    key: 'registerInjectable',
	    value: function registerInjectable(args) {
	      var injectionId = args.injectionId,
	          injectableInstance = args.injectableInstance,
	          receive = args.receive;

	      var registration = this.getRegistration({ injectionId: injectionId });
	      var injectable = this.findInjectable({ registration: registration, injectableInstance: injectableInstance });
	      if ((0, _utils.withoutAll)(registration.injectables)([injectable]).length > 0) {
	        var newInjectable = {
	          instance: injectableInstance,
	          receive: receive
	        };
	        registration.injectables = [].concat(_toConsumableArray(registration.injectables), [newInjectable]);
	        this.runInjections({ registration: registration }); // First time consumption.
	      }
	    }
	  }, {
	    key: 'removeInjectable',
	    value: function removeInjectable(args) {
	      var injectionId = args.injectionId,
	          injectableInstance = args.injectableInstance;

	      var registration = this.getRegistration({ injectionId: injectionId });
	      var injectable = this.findInjectable({ registration: registration, injectableInstance: injectableInstance });

	      registration.injectables = (0, _utils.without)(injectable)(registration.injectables);

	      this.clearRegistrationIfEmpty({ registration: registration });
	    }
	  }, {
	    key: 'findInjection',
	    value: function findInjection(_ref3) {
	      var registration = _ref3.registration,
	          injectorInstance = _ref3.injectorInstance;

	      var isInjectorInstance = function isInjectorInstance(x) {
	        return Object.is(x.instance, injectorInstance);
	      };
	      return (0, _utils.find)(isInjectorInstance)(registration.injections);
	    }
	  }, {
	    key: 'findInjector',
	    value: function findInjector(_ref4) {
	      var registration = _ref4.registration,
	          injectorId = _ref4.injectorId;

	      var isInjectorId = function isInjectorId(x) {
	        return x.injectorId === injectorId;
	      };
	      return (0, _utils.find)(isInjectorId)(registration.injections);
	    }
	  }, {
	    key: 'registerInjector',
	    value: function registerInjector(args) {
	      var injectionId = args.injectionId,
	          injectorId = args.injectorId,
	          injectorInstance = args.injectorInstance,
	          inject = args.inject;

	      var registration = this.getRegistration({ injectionId: injectionId });
	      var existingInjection = this.findInjection({ registration: registration, injectorInstance: injectorInstance });

	      (0, _invariant2.default)(!existingInjection, 'An Injector instance is being registered multiple times.');

	      if ((undefined) !== 'production') {
	        var existingInjector = this.findInjector({ registration: registration, injectorId: injectorId });

	        if (existingInjector && console && console.warn) {
	          // eslint-disable-line no-console
	          console.warn( // eslint-disable-line no-console
	          'Multiple instances of an Injector has been found.  This may not be ' + 'your intended behaviour');
	        }
	      }

	      var newInjection = {
	        injectorId: injectorId,
	        instance: injectorInstance,
	        inject: inject
	      };

	      registration.injections = [].concat(_toConsumableArray(registration.injections), [newInjection]);

	      this.runInjections({ registration: registration });
	    }
	  }, {
	    key: 'updateInjector',
	    value: function updateInjector(args) {
	      var injectionId = args.injectionId,
	          injectorInstance = args.injectorInstance,
	          inject = args.inject;

	      var registration = this.getRegistration({ injectionId: injectionId });
	      var existingInjection = this.findInjection({ registration: registration, injectorInstance: injectorInstance });

	      (0, _invariant2.default)(existingInjection, 'Trying to update an Injector that is not registered');

	      existingInjection.inject = inject;

	      this.runInjections({ registration: registration });
	    }
	  }, {
	    key: 'removeInjector',
	    value: function removeInjector(args) {
	      var injectionId = args.injectionId,
	          injectorInstance = args.injectorInstance;

	      var registration = this.getRegistration({ injectionId: injectionId });
	      var injection = this.findInjection({ registration: registration, injectorInstance: injectorInstance });

	      (0, _invariant2.default)(!!injection, 'Trying to remove an injector which has not been registered');

	      registration.injections = (0, _utils.without)(injection)(registration.injections);
	      this.runInjections({ registration: registration });

	      this.clearRegistrationIfEmpty({ registration: registration });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children);
	    }
	  }]);

	  return InjectablesProvider;
	}(_react.Component);

	InjectablesProvider.childContextTypes = {
	  registerInjector: _react.PropTypes.func.isRequired,
	  removeInjector: _react.PropTypes.func.isRequired,
	  updateInjector: _react.PropTypes.func.isRequired,
	  registerInjectable: _react.PropTypes.func.isRequired,
	  removeInjectable: _react.PropTypes.func.isRequired
	};
	InjectablesProvider.propTypes = {
	  children: _react.PropTypes.element
	};
	exports.default = InjectablesProvider;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(3);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var invalidTargetMsg = 'Invalid Injectable target. Please provide a Component that has been wrapped ' + 'Injectable wrapped Component.';
	var invalidInjectMsg = 'Invalid injection value provided into Injector. You must supply a Component ' + 'or stateless Component.';

	var injectorIndex = 0;

	var Injector = function Injector() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      into = _ref.into;

	  (0, _invariant2.default)(into && typeof into === 'function' && into.injectionId && into.contextTypes && into.contextTypes.registerInjectable && into.contextTypes.removeInjectable,
	  // Error message
	  invalidTargetMsg);

	  return function WrapComponent(InjectionComponent) {
	    (0, _invariant2.default)(InjectionComponent && typeof InjectionComponent === 'function', invalidInjectMsg);

	    injectorIndex++;
	    var injectorId = 'injector_' + injectorIndex;

	    var InjectorComponent = function (_Component) {
	      _inherits(InjectorComponent, _Component);

	      function InjectorComponent() {
	        _classCallCheck(this, InjectorComponent);

	        return _possibleConstructorReturn(this, (InjectorComponent.__proto__ || Object.getPrototypeOf(InjectorComponent)).apply(this, arguments));
	      }

	      _createClass(InjectorComponent, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          var _this2 = this;

	          var props = InjectionComponent() ? InjectionComponent().props : {};
	          this.context.registerInjector({
	            injectionId: into.injectionId,
	            injectorId: injectorId,
	            injectorInstance: this,
	            inject: function inject() {
	              return _react2.default.createElement(InjectionComponent, _extends({}, props, _this2.props));
	            }
	          });
	        }
	      }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	          var props = InjectionComponent() ? InjectionComponent().props : {};
	          this.context.updateInjector({
	            injectionId: into.injectionId,
	            injectorId: injectorId,
	            injectorInstance: this,
	            inject: function inject() {
	              return _react2.default.createElement(InjectionComponent, _extends({}, props, nextProps));
	            }
	          });
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.context.removeInjector({
	            injectionId: into.injectionId,
	            injectorId: injectorId,
	            injectorInstance: this
	          });
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return null;
	        }
	      }]);

	      return InjectorComponent;
	    }(_react.Component);

	    InjectorComponent.contextTypes = {
	      registerInjector: _react.PropTypes.func.isRequired,
	      updateInjector: _react.PropTypes.func.isRequired,
	      removeInjector: _react.PropTypes.func.isRequired
	    };


	    return InjectorComponent;
	  };
	};

	exports.default = Injector;

/***/ }
/******/ ])
});
;
