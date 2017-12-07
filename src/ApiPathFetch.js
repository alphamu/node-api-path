import ApiPath from './ApiPath'

require('es6-promise').polyfill();
require('isomorphic-fetch');

const defaultOptions = {method: "GET", body: null, headers: {Accept: "application/json", 'Content-Type': 'application/json'}}

export default class ApiPathFetch extends ApiPath {
  constructor (paths, serviceUrl) {
    super(paths, serviceUrl)
    this.setDefaultOptions(defaultOptions)
  }

  fetch (url, options = this.defaultOptions) {
    const opts = {
      ...this.defaultOptions,
      ...options
    }
    return fetch(url, opts)
  }

  setDefaultOptions (options) {
    if (this.defaultOptions) {
      this.defaultOptions = {
        ...this.defaultOptions,
        ...options
      }
    } else {
      this.defaultOptions = options
    }
  }

  getDefaultOptions() {
    return this.defaultOptions
  }
}

String.prototype.fetch = function (options = defaultOptions) {
  const opts = {
    ...defaultOptions,
    ...options
  }
  return fetch(this, opts)
}