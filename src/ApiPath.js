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

export default class ApiPath {
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
  constructor (paths, serviceUrl) {
    let svcUrl = process.env.SVC_URL
    if (serviceUrl) {
      svcUrl = serviceUrl
    }
    if (!svcUrl.endsWith("/")) {
      svcUrl += "/"
    }
    svcUrl = encodeURI(svcUrl)
    let svcHostAndPortUrl = svcUrl
    let svcHostAndPort = svcUrl.match(hostAndPortRegExp)
    if (svcHostAndPort.length > 0) {
      svcHostAndPortUrl = encodeURI(svcHostAndPort[0])
    }
    this.svcHostAndPortUrl = svcHostAndPortUrl
    this.svcUrl = svcUrl
    const localizedStrings = Object.assign({}, paths);
    for (let key in localizedStrings) {
      if (key === 'fetch' || key === 'params' || key === 'addPath' || key === 'getApiHost' || key === 'getApiBase') {
        throw Error(`'${key} is a reserved word.`)
      }
      if (localizedStrings.hasOwnProperty(key)) {
        const path = localizedStrings[key]
        this.addPath(key, path)
      }
    }
  }

  addPath (key, path) {
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

  getApiHost () {
    return this.svcHostAndPortUrl
  }

  getApiBase () {
    return this.svcUrl
  }

  //Format the passed string replacing the numbered placeholders
  //i.e. I'd like some {0} and {1}, or just {0}
  //Use example:
  //  svcPath.setParams(svcPath.question, svcPath.bread, svcPath.butter)
  static params (path, ...params) {
    return _setParams(path, params)
  }
}

function _setParams (path, params) {
  let result = path
  for (let i = 0; i < params.length; i++) {
    result = result.replace(regexpTests[i], encodeURIComponent(params[i]))
  }
  return result
}

String.prototype.params = function (...params) {
  return _setParams(this, params)
}

const hostAndPortRegExp = new RegExp("(?:https?:\\/\\/)?(?:[^@\\n]+@)?(?:www\\.)?([^:\\/\\n]+):?[0-9]*", 'im')
export const regexpTests = [
  new RegExp("\{[0]\}", 'g'),
  new RegExp("\{[1]\}", 'g'),
  new RegExp("\{[2]\}", 'g'),
  new RegExp("\{[3]\}", 'g'),
  new RegExp("\{[4]\}", 'g'),
  new RegExp("\{[5]\}", 'g'),
  new RegExp("\{[6]\}", 'g'),
  new RegExp("\{[7]\}", 'g'),
  new RegExp("\{[8]\}", 'g'),
  new RegExp("\{[9]\}", 'g')
]

