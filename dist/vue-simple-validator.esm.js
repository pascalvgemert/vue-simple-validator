function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var ErrorBag = /*#__PURE__*/function () {
  /**
   * Validator constructor
   *
   * @param {Object} errors
   */
  function ErrorBag(errors) {
    _classCallCheck(this, ErrorBag);

    this.errors = errors || {};
  }
  /**
   * Add a new error message.
   *
   * @returns {Object}
   */


  _createClass(ErrorBag, [{
    key: "add",
    value: function add(key, message) {
      this.errors[key] = message;
      return this;
    }
    /**
     * Return all error messages.
     *
     * @returns {Object}
     */

  }, {
    key: "all",
    value: function all() {
      return this.errors || {};
    }
    /**
     * Does the bag contains any errors.
     *
     * @returns {Boolean}
     */

  }, {
    key: "any",
    value: function any() {
      return this.all().length > 0;
    }
    /**
     * Return the amount of errors in the bag.
     *
     * @returns {Number}
     */

  }, {
    key: "count",
    value: function count() {
      return this.all().length || 0;
    }
    /**
     * Get the error message for the requested key.
     *
     * @returns {String|null}
     */

  }, {
    key: "get",
    value: function get(key) {
      return this.errors[key] || null;
    }
    /**
     * See if the bag contains a message for the requested key.
     *
     * @returns {Boolean}
     */

  }, {
    key: "has",
    value: function has(key) {
      return this.all().indexOf(key) !== -1;
    }
  }]);

  return ErrorBag;
}();

var Helpers = {
  /**
   * @param {Object} context
   * @param {String} fieldName
   *
   * @returns {*}
   */
  getFieldValueFromContext: function getFieldValueFromContext(context, fieldName) {
    var fieldNameParts = fieldName.split('.'),
        result = context;

    var _iterator = _createForOfIteratorHelper(fieldNameParts),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var fieldNamePart = _step.value;

        if (!result.hasOwnProperty(fieldNamePart)) {
          return null;
        }

        result = result[fieldNamePart];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  }
};

var Validator = /*#__PURE__*/function () {
  /**
   * Validator constructor
   */
  function Validator() {
    _classCallCheck(this, Validator);

    this.errorBag = new ErrorBag({});
    this.ruleInstances = {
      'alpha': new undefined(),
      'alpha_numeric': new undefined(),
      'between': new undefined(),
      'decimal': new undefined(),
      'email': new undefined(),
      'float': new undefined(),
      'int': new undefined(),
      'integer': new undefined(),
      'len': new undefined(),
      'length': new undefined(),
      'max': new undefined(),
      'min': new undefined(),
      'numeric': new undefined(),
      'required': new undefined(),
      'required_if': new undefined(),
      'required_without': new undefined(),
      'slug': new undefined(),
      'string': new undefined(),
      'url': new undefined()
    };
    this.errorMessages = {
      'alpha': '{field} must only contain alphabetical (A-z) characters.',
      'alpha_numeric': '{field} must only contain alphanumeric (A-z, 0-9) characters.',
      'between': '{field} must be between {minimum} and {maximum}.',
      'decimal': '{field} must be decimal.',
      'email': '{field} must be a valid email addresss.',
      'float': '{field} must be decimal.',
      'int': '{field} must be integer.',
      'integer': '{field} must be integer.',
      'len': '{field} must have a length of {length}.',
      'length': '{field} must have a length of {length}.',
      'max': '{field} must be {maximum} or lower.',
      'min': '{field} must be {minimum} or higher.',
      'numeric': '{field} must be numeric value.',
      'required': '{field} is required',
      'required_if': '{field} is required when {other_field} is given.',
      'required_without': '{field} is required when {other_field} is not given.',
      'slug': '{field} must be a valid slug (a-z, 0-9, -).',
      'string': '{field} must be a valid string',
      'url': '{field} must be a valid url'
    };
  }
  /**
   * @returns {Object}
   */


  _createClass(Validator, [{
    key: "errors",
    value: function errors() {
      return this.errorBag;
    }
    /**
     * See if the current error bag contains any errors.
     *
     * @returns {Boolean}
     */

  }, {
    key: "failed",
    value: function failed() {
      return this.errorBag.any();
    }
    /**
     * @param {String} ruleName
     *
     * @returns {Object}
     */

  }, {
    key: "getRule",
    value: function getRule(ruleName) {
      var rule = this.ruleInstances[ruleName] || null;

      if (!rule) {
        throw "The rule '".concat(ruleName, "' is not supported.");
      }

      return rule;
    }
    /**
     * @param {String} ruleName
     * @param {Object} rule
     * @param {String|null} errorMessage
     */

  }, {
    key: "registerRule",
    value: function registerRule(ruleName, rule, errorMessage) {
      if (typeof ruleName !== 'string') {
        throw 'The rule name should be a string';
      } // @todo Improve check


      if (_typeof(rule) !== 'object') {
        throw "The rule object must be an object.";
      }

      errorMessage = errorMessage || '{field} is invalid.';
      this.ruleInstances[ruleName] = rule;
      this.errorMessages[ruleName] = errorMessage;
      return true;
    }
    /**
     * @param {String} fieldName
     * @param {String} fieldRule
     */

  }, {
    key: "reportFailure",
    value: function reportFailure(fieldName, fieldRule) {
      // Build and store failure message based on field value + field rule.
      var ruleSequence = fieldRule.split(':'),
          ruleName = ruleSequence[0] || '',
          ruleParams = (ruleSequence[1] || 'null').split(','),
          rule = this.getRule(ruleName),
          rawMessage = this.errorMessages[ruleName] || '{field} is invalid.',
          message = rule ? rule.failureMessage(rawMessage, fieldName, ruleParams) : 'Could not retrieve error message';
      this.errorBag.add(fieldName, message);
    }
    /**
     * @param {Object} errorMessages
     */

  }, {
    key: "setErrorMessages",
    value: function setErrorMessages(errorMessages) {
      Object.assign(this.errorMessages, errorMessages);
    }
    /**
     * @param {Object} context
     * @param {Object} rules
     *
     * @returns {Boolean}
     */

  }, {
    key: "validate",
    value: function validate(context, rules) {
      var _this = this;

      // When validating start with a new ErrorBag
      this.errorBag = new ErrorBag({});
      Object.entries(rules).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            fieldName = _ref2[0],
            fieldRules = _ref2[1];

        var fieldValue = Helpers.getFieldValueFromContext(context, fieldName);
        fieldRules = typeof fieldRules === 'string' ? fieldRules.split('|') : fieldRules;

        var _iterator = _createForOfIteratorHelper(fieldRules),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var fieldRule = _step.value;

            // Validate field rule, report the error and break our of the field rules for loop when an error is found.
            if (!_this.validateValueAgainstRule(fieldValue, fieldRule, context)) {
              _this.reportFailure(fieldName, fieldRule);

              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      return this.errorBag.any();
    }
    /**
     * @param {*} value
     * @param {String} rule
     * @param {Object} context
     *
     * @returns {Boolean}
     */

  }, {
    key: "validateValueAgainstRule",
    value: function validateValueAgainstRule(value, rule, context) {
      var ruleSequence = rule.split(':'),
          ruleName = ruleSequence[0] || null,
          ruleParams = (ruleSequence[1] || 'null').split(','),
          ruleInstance = this.getRule(ruleName);

      if (!rule) {
        return false;
      }

      return ruleInstance.validate(value, ruleParams, context);
    }
  }]);

  return Validator;
}();

var index = {
  install: function install(Vue, options) {
    // Instantiate the validator
    var validator = new Validator(); // Apply options

    if (_typeof(options.errorMessages) === 'object') {
      validator.setErrorMessages(options.errorMessages);
    } // Set validator global methods


    Vue.prototype.$validator = {
      errors: validator.errors,
      failed: validator.failed,
      registerRule: validator.registerRule,
      setErrorMessages: validator.setErrorMessages,
      validate: validator.validate
    };
  }
};

export default index;
