'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiPath2 = require('./ApiPath');

var _ApiPath3 = _interopRequireDefault(_ApiPath2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('es6-promise').polyfill();
require('isomorphic-fetch');

var defaultOptions = { method: "GET", body: null, headers: { Accept: "application/json", 'Content-Type': 'application/json' } };

var ApiPathFetch = function (_ApiPath) {
  _inherits(ApiPathFetch, _ApiPath);

  function ApiPathFetch(paths, serviceUrl) {
    _classCallCheck(this, ApiPathFetch);

    var _this = _possibleConstructorReturn(this, (ApiPathFetch.__proto__ || Object.getPrototypeOf(ApiPathFetch)).call(this, paths, serviceUrl));

    _this.setDefaultOptions(defaultOptions);
    return _this;
  }

  _createClass(ApiPathFetch, [{
    key: 'fetch',
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultOptions;

      var opts = _extends({}, this.defaultOptions, options);
      return fetch(url, opts);
    })
  }, {
    key: 'setDefaultOptions',
    value: function setDefaultOptions(options) {
      if (this.defaultOptions) {
        this.defaultOptions = _extends({}, this.defaultOptions, options);
      } else {
        this.defaultOptions = options;
      }
    }
  }, {
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return this.defaultOptions;
    }
  }]);

  return ApiPathFetch;
}(_ApiPath3.default);

exports.default = ApiPathFetch;


String.prototype.fetch = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

  var opts = _extends({}, defaultOptions, options);
  return fetch(this, opts);
};