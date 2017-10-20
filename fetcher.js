/**
 * Backend fetch API for requests.
 *
 * @see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
 * @module Fetcher
 */

/**
  * Fetch based Error that has fetch request's response added to it as one of it's props.
  *
  * @typedef {Error} AugmentedFetchError
  * @property {object} response - Response object from the fetch request.
  */

/**
 * Default init options for requests.
 *
 * @typedef FETCH_DEFAULTS
 * @type {Object}
 * @property {string} credentials - Send cookies for 'same-origin' requests.
 * @property {Object} headers - Default headers for requests.
 * @property {String} headers.Accept - Accept JSON in responses.
 * @property {String} headers.Content-Type - Send JSON in requests.
 */
const FETCH_DEFAULTS = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const STATUS_CODES = {
  NO_CONTENT: 204,
};

/**
 * Pattern for matching JSON content-type
 * @type {RegExp}
 */
const JSON_CONTENT_TYPE_PATTERN = /application\/json/;

/**
 * ## Backend fetch API
 *
 * The backend data fetch API abstracts the fetching away from products, so it can be maintained in the platform.
 *
 * This API supports standard JSON requests easily, with handy helpers for GET, POST, PUT, UPDATE, PATCH and DELETE requests.
 * More custom responses can also be made if needed.
 *
 * ### API
 *
 * @see [Fetcher's get() JSDoc]{@link Fetcher#get}
 * @see [Fetcher's post() JSDoc]{@link Fetcher#post}
 * @see [Fetcher's put() JSDoc]{@link Fetcher#put}
 * @see [Fetcher's delete() JSDoc]{@link Fetcher#delete}
 * @see [Fetcher's update() JSDoc]{@link Fetcher#update}
 * @see [Fetcher's patch() JSDoc]{@link Fetcher#patch}
 * @see [Fetcher's fetchJson() JSDoc]{@link Fetcher#fetchJson}
 * @see [Fetcher's fetch() JSDoc]{@link Fetcher#fetch}
 *
 * ### Example usage
 *
 * ```js
 * import { fetcher } from 'ui-platform-frontend';
 *
 * // Simple GET request, expecting JSON as a response
 * fetcher.get('/some/rest/api')
 *   .then(function(responseBody) {
 *     // responseBody is a the response JSON, parsed to an object.
 *   })
 *   .catch(function(err) {
 *     // The fetch API throws an error if the response code is !== 200 by default. You can handle it here.
 *   });
 *
 * // More complex request, setting options manually and using the direct fetch API.
 * fetcher.fetch('/some/rest/api', {
 *
 *   })
 *   .then(function(response) {
 *     // 'response' is the raw response object, check it for errors...
 *     if (!response.ok) {
 *       let error = new Error(response.statusText);
 *       error.response = response;
 *       throw error; // Throwing an error at any stage stop processing, and jumps to the 'catch()'-block below.
 *     }
 *
 *     return response;
 *   })
 *   .then(function(response) {
 *     // 'response' status was ok, continue parsing the contents assuming it was JSON.
 *     return response.json();
 *   })
 *   .then(function(responseBody) {
 *     // Now you finally have the response body, do whatever you want with it
 *   })
 *   .catch(function(err) {
 *     // Catch any errors thrown from any of the 'then()'-blocks above.
 *   });
 * ```
 *
 * @class
 */
class Fetcher {
  static handleResponse(response) {
    return Fetcher._isJson(response) ? Fetcher._parseJson(response) : response;
  }

  /**
   * Do a HTTP request for JSON and return response data as JSON.
   *
   * @param  {string} url - Request URL.
   * @param  {Object} [initOptions] - Options for the request. @see {@link https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch|Fetch API init parameters.},
   * the 'initOptions' will be merged with {@link FETCH_DEFAULTS}.
   * @returns {Promise} - The promise will be resolved with JSON object, if the response content type is JSON. Otherwise it will be resolved with the raw response.
   * @throws {Error} if url parameter is not given.
   */
  fetchJson(url, initOptions = {}) {
    return this.fetch(url, initOptions)
      .then(this._checkStatus.bind(this))
      .then(response => Fetcher.handleResponse(response));
  }

  /**
   * Do a HTTP request and return a promise that will be resolved with raw response.
   *
   * @param  {string} url - Request URL.
   * @param  {Object} [initOptions] - Options for the request. @see {@link https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch|Fetch API init parameters.},
   * the 'initOptions' will be merged with {@link FETCH_DEFAULTS}.
   * @returns {Promise} - The promise will be resolved with the raw response.
   * @throws {Error} if url parameter is not given
   */
  fetch(url, initOptions = {}) {
    if (typeof url !== 'string') {
      throw new Error('Fetcher: Missing mandatory parameter `url`');
    }

    return window.fetch(url, Object.assign({}, FETCH_DEFAULTS, initOptions));
  }

  /**
   * Do a GET request. If the response contains JSON it will be automatically parsed.
   *
   * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
   * @param  {Object} [initOptions] - Se  @see {@link Fetcher.fetchJson} for documentation.
   * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
   * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
   */
  get(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'GET'}));
  }

  /**
   * Do a POST request. If the response contains JSON it will be automatically parsed.
   *
   * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
   * @param  {Object} [initOptions] - See @see {@link Fetcher.fetchJson} for documentation.
   * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
   * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
   */
  post(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'POST'}));
  }

  /**
   * Do a PUT request. If the response contains JSON it will be automatically parsed.
   *
   * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
   * @param  {Object} [initOptions] - See @see {@link Fetcher.fetchJson} for documentation.
   * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
   * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
   */
  put(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'PUT'}));
  }

  /**
   * Do an UPDATE request. If the response contains JSON it will be automatically parsed.
   *
   * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
   * @param  {Object} [initOptions] - See @see {@link Fetcher.fetchJson} for documentation.
   * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
   * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
   */
  update(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'UPDATE'}));
  }

  /**
     * Do an PATCH request. If the response contains JSON it will be automatically parsed.
     *
     * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
     * @param  {Object} [initOptions] - See @see {@link Fetcher.fetchJson} for documentation.
     * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
     * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
     */
  patch(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'PATCH'}));
  }

  /**
   * Do a DELETE request. If the response contains JSON it will be automatically parsed.
   *
   * @param  {string} url - See @see {@link Fetcher.fetchJson} for documentation.
   * @param  {Object} [initOptions] - See @see {@link Fetcher.fetchJson} for documentation.
   * @returns {Promise} - See @see {@link Fetcher.fetchJson} for documentation.
   * @throws {Error} - See @see {@link Fetcher.fetchJson} for documentation.
   */
  delete(url, initOptions = {}) {
    return this.fetchJson(url, Object.assign({}, initOptions, {method: 'DELETE'}));
  }

  /**
   * Check if request was actually successful.
   *
   * The Promise returned from fetch() won't reject on HTTP error status
   * even if the response is a HTTP 404 or 500.
   *
   * @param {Response} response - The `Response` object from `window.fetch`.
   * @returns {Response} Response - If request was successful.
   * @throws {AugmentedFetchError} - Error if request failed.
   */
  _checkStatus(response) {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    return response;
  }

  /**
   * Parse JSON body content from response.
   *
   * @param  {Response} response - The `Response` object from `window.fetch`.
   * @returns {Object} - JSON data from response body.
   * @throws {Error} Throws error if response body is not valid JSON.
   */
  static _parseJson(response) {
    return response.json();
  }

  /**
   * Check if response is of content type JSON.
   *
   * @param  {Object} response - The `Response` object from `window.fetch`.
   * @returns {boolean} - Is response of content type JSON.
   */
  static _isJson(response) {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.match(JSON_CONTENT_TYPE_PATTERN) && response.status !== STATUS_CODES.NO_CONTENT;
  }

}

/**
 * ## The upload API
 *
 * The upload API abstracts the upload implementation away from products, so it can be maintained in the platform.
 * Upload API uses [XMLHttpRequest level 2 standard](https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html).
 * Upload API supports useful event handlers including periodic progress notifications, error notifications, and so forth.
 * Upload API is able to perform the operation asynchronously or synchronously.
 * By default, upload API uses the [FormData API](https://xhr.spec.whatwg.org/#interface-formdata) and is made to send only one file.
 *
 * More custom responses can also be made if needed, since you are able to get the XHR instance.
 *
 * ### API
 *
 * ### Example usage
 *
 * ```js
 * import { UploadFetcher } from 'ui-platform-frontend';
 *
 * //... define url and the file
 *
 * const uploadFetcher = new UploadFetcher({
 *  url,
 *  file
 * });
 * uploadFetcher.send();
 *
 * ```
 *
 * @class
 */
class UploadFetcher {

  /**
   * UploadFetcher configuration prameters.
   * @typedef {Object} UploadFetcherConfig
   * @param {UploadEventHandler} [onProgress] - Callback that will be called periodically to catch the progress.
   * @param {UploadEventHandler} [onLoadStart] - Callback that will be called by [loadstart event](https://developer.mozilla.org/en-US/docs/Web/Events/loadstart).
   * @param {UploadEventHandler} [onError] - Will ba called by [error event](https://developer.mozilla.org/en-US/docs/Web/Events/error_(ProgressEvent)).
   * @param {UploadEventHandler} [onAbort] - Will be called by [abort event](https://developer.mozilla.org/en-US/docs/Web/Events/abort_(ProgressEvent)).
   * @param {UploadEventHandler} [onLoadEnd] - Will be called by [loadend event](https://developer.mozilla.org/en-US/docs/Web/Events/loadend).
   * @param {number} [timeout] - An unsigned long number that represents timeout in milliseconds, [more information](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout).
   * @param {UploadEventHandler} [onTimeout] - Will be called by [timeout event](https://developer.mozilla.org/en-US/docs/Web/Events/timeout).
   * @param {UploadEventHandler} [onReadyStateChange] - Will be called by [onreadystatechange event](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange).
   * @param {string} url - A DOMString, the URL to send the request to.
   * @param {string} [method='POST'] - The HTTP method to use.
   * @param {boolean} [async=true] - To indicate whether or not to perform the operation asynchronously.
   * @param {string} [user=null] - The optional user name.
   * @param {string} [password=null] - The optional password to use for authentication.
   * @param {File} file - The file object specified in (https://developer.mozilla.org/en-US/docs/Web/API/File).
   */

  /**
   * Create the XHRInstance.
   *
   * @param {UploadFetcherConfig} config - UploadFetcher configuration parameters.
   */
  constructor(config) {
    const {
      onProgress,
      onLoadStart,
      onError,
      onAbort,
      onLoadEnd,
      timeout,
      onTimeout,
      onReadyStateChange,
      url,
      method,
      async,
      user,
      password,
      file
    } = config;

    this.XHRInstance = new XMLHttpRequest();
    this.XHRInstance.upload.onprogress = onProgress;
    this.XHRInstance.upload.onloadstart = onLoadStart;
    this.XHRInstance.upload.onerror = onError;
    this.XHRInstance.upload.onabort = onAbort;
    this.XHRInstance.onloadend = onLoadEnd;
    this.XHRInstance.ontimeout = onTimeout;
    this.XHRInstance.onreadystatechange = onReadyStateChange;
    this._open(url, method, async, user, password);

    // In IE, the timeout property should be set only after calling the open() method and before calling the send() method.
    this.XHRInstance.timeout = timeout;
    this.file = file;
  }

  /**
   * To get the XHR instance.
   *
   * @returns {XMLHttpRequest|global.XMLHttpRequest} - XMLHttpRequest API that exposes client functionality.
   */
  getXHRInstance() {
    return this.XHRInstance;
  }

  /**
   * To initialize the request.
   *
   * @param {string} url - A DOMString, the URL to send the request to.
   * @param {string} [method='POST'] - The HTTP method to use.
   * @param {boolean} [async=true] - To indicate whether or not to perform the operation asynchronously.
   * @param {string} [user=null] - The optional user name.
   * @param {string} [password=null] - The optional password to use for authentication.
   */
  _open(url, method='POST', async=true, user=null, password=null) {
    this.XHRInstance.open(method, url, async, user, password);
  }

  /**
   * Send the file.
   */
  send() {
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.XHRInstance.send(formData);
  }

}

/**
 * Fetcher instance
 *
 * @type {Fetcher}
 */
const fetcher = new Fetcher();

export { UploadFetcher, FETCH_DEFAULTS };
export default fetcher;
