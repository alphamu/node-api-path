"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ApiPath takes in a host URL and lets you append paths to it.
 * It allows for support for relative paths as well as absolute paths.
 * To understand the difference, lets assume an API URL is http://localhost:8080/my/api
 * and we are going to append 'auth/login' and '/auth/login' to the API URL
 *
 * 'auth/login' will be treated as a path relative to the service url http://localhost:8080/my/api
 * and the result will be http://localhost:8080/my/api/auth/login
 *
 * '/auth/login' will be treated as an absolute path to the host http://localhost:8080
 * and the result will be http://localhost:8080/auth/login
 *
 *
 */

var ApiPath = function () {
  /**
   *
   * @param paths JSONObject of paths in key-value format { login: "/auth/login", logout: "/auth/logout" }
   * @param serviceUrl Optional a fully formed url e.g. https://example.com:8080.
   * If serviceUrl is not passed, we attempt to read the environment variable SVC_URL.
   * If neither serviceUrl and SVC_URL are not specified, we throw a URI error
   * @throws URI error if you forgot to pass in a serviceUrl and didn't specify the
   * SVC_URL environment variable. You can also get this error if the URL is not formed
   * correctly.
   */
  function ApiPath(paths, serviceUrl) {
    _classCallCheck(this, ApiPath);

    var svcUrl = process.env.SVC_URL;
    if (serviceUrl) {
      svcUrl = serviceUrl;
    }
    if (!svcUrl.endsWith("/")) {
      svcUrl += "/";
    }
    svcUrl = encodeURI(svcUrl);
    var svcHostAndPortUrl = svcUrl;
    var svcHostAndPort = svcUrl.match(hostAndPortRegExp);
    if (svcHostAndPort.length > 0) {
      svcHostAndPortUrl = encodeURI(svcHostAndPort[0]);
    }
    this.svcHostAndPortUrl = svcHostAndPortUrl;
    this.svcUrl = svcUrl;
    var localizedStrings = Object.assign({}, paths);
    for (var key in localizedStrings) {
      if (key === 'fetch' || key === 'params' || key === 'addPath' || key === 'getApiHost' || key === 'getApiBase') {
        throw Error("'" + key + " is a reserved word.");
      }
      if (localizedStrings.hasOwnProperty(key)) {
        var path = localizedStrings[key];
        this.addPath(key, path);
      }
    }
  }

  _createClass(ApiPath, [{
    key: "addPath",
    value: function addPath(key, path) {
      if (path.startsWith('/')) {
        // Path starts with '/' means that it has to be attached to the base domain
        // Meaning, if my serviceUrl is http://localhost:8080/my/api
        // appending `/login` to it would result in http://localhost:8080/login
        this[key] = this.svcHostAndPortUrl + path;
      } else if (!path.startsWith('http')) {
        // Paths that don't start with with '/' are relative to the service URL
        // Meaning, if my serviceUrl is http://localhost:8080/my/api
        // appending `/login` to it would result in http://localhost:8080/my/api/login
        this[key] = this.svcUrl + path;
      } else {
        //We assume this is a full URL
        this[key] = path;
      }
    }
  }, {
    key: "getApiHost",
    value: function getApiHost() {
      return this.svcHostAndPortUrl;
    }
  }, {
    key: "getApiBase",
    value: function getApiBase() {
      return this.svcUrl;
    }

    //Format the passed string replacing the numbered placeholders
    //i.e. I'd like some {0} and {1}, or just {0}
    //Use example:
    //  svcPath.setParams(svcPath.question, svcPath.bread, svcPath.butter)

  }], [{
    key: "params",
    value: function params(path) {
      for (var _len = arguments.length, _params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _params[_key - 1] = arguments[_key];
      }

      return _setParams(path, _params);
    }
  }]);

  return ApiPath;
}();

exports.default = ApiPath;


function _setParams(path, params) {
  var result = path;
  for (var i = 0; i < params.length; i++) {
    result = result.replace(regexpTests[i], encodeURIComponent(params[i]));
  }
  return result;
}

String.prototype.params = function () {
  for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    params[_key2] = arguments[_key2];
  }

  return _setParams(this, params);
};

var hostAndPortRegExp = new RegExp("(?:https?:\\/\\/)?(?:[^@\\n]+@)?(?:www\\.)?([^:\\/\\n]+):?[0-9]*", 'im');
var regexpTests = exports.regexpTests = [new RegExp("\{[0]\}", 'g'), new RegExp("\{[1]\}", 'g'), new RegExp("\{[2]\}", 'g'), new RegExp("\{[3]\}", 'g'), new RegExp("\{[4]\}", 'g'), new RegExp("\{[5]\}", 'g'), new RegExp("\{[6]\}", 'g'), new RegExp("\{[7]\}", 'g'), new RegExp("\{[8]\}", 'g'), new RegExp("\{[9]\}", 'g')];