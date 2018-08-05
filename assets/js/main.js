(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/base64-js/index.js","/../../node_modules/base64-js")
},{"b55mWE":6,"buffer":5}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
function detect() {
  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return getNodeVersion();
}

function detectOS(userAgentString) {
  var rules = getOperatingSystemRules();
  var detected = rules.filter(function (os) {
    return os.rule && os.rule.test(userAgentString);
  })[0];

  return detected ? detected.name : null;
}

function getNodeVersion() {
  var isNode = typeof process !== 'undefined' && process.version;
  return isNode && {
    name: 'node',
    version: process.version.slice(1),
    os: process.platform
  };
}

function parseUserAgent(userAgentString) {
  var browsers = getBrowserRules();
  if (!userAgentString) {
    return null;
  }

  var detected = browsers.map(function(browser) {
    var match = browser.rule.exec(userAgentString);
    var version = match && match[1].split(/[._]/).slice(0,3);

    if (version && version.length < 3) {
      version = version.concat(version.length == 1 ? [0, 0] : [0]);
    }

    return match && {
      name: browser.name,
      version: version.join('.')
    };
  }).filter(Boolean)[0] || null;

  if (detected) {
    detected.os = detectOS(userAgentString);
  }

  if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
    detected = detected || {};
    detected.bot = true;
  }

  return detected;
}

function getBrowserRules() {
  return buildRules([
    [ 'aol', /AOLShield\/([0-9\._]+)/ ],
    [ 'edge', /Edge\/([0-9\._]+)/ ],
    [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
    [ 'vivaldi', /Vivaldi\/([0-9\.]+)/ ],
    [ 'kakaotalk', /KAKAOTALK\s([0-9\.]+)/ ],
    [ 'samsung', /SamsungBrowser\/([0-9\.]+)/ ],
    [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
    [ 'phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
    [ 'fxios', /FxiOS\/([0-9\.]+)/ ],
    [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
    [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
    [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/ ],
    [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
    [ 'ie', /MSIE\s(7\.0)/ ],
    [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
    [ 'android', /Android\s([0-9\.]+)/ ],
    [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
    [ 'safari', /Version\/([0-9\._]+).*Safari/ ],
    [ 'facebook', /FBAV\/([0-9\.]+)/],
    [ 'instagram', /Instagram\ ([0-9\.]+)/],
    [ 'ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]
  ]);
}

function getOperatingSystemRules() {
  return buildRules([
    [ 'iOS', /iP(hone|od|ad)/ ],
    [ 'Android OS', /Android/ ],
    [ 'BlackBerry OS', /BlackBerry|BB10/ ],
    [ 'Windows Mobile', /IEMobile/ ],
    [ 'Amazon OS', /Kindle/ ],
    [ 'Windows 3.11', /Win16/ ],
    [ 'Windows 95', /(Windows 95)|(Win95)|(Windows_95)/ ],
    [ 'Windows 98', /(Windows 98)|(Win98)/ ],
    [ 'Windows 2000', /(Windows NT 5.0)|(Windows 2000)/ ],
    [ 'Windows XP', /(Windows NT 5.1)|(Windows XP)/ ],
    [ 'Windows Server 2003', /(Windows NT 5.2)/ ],
    [ 'Windows Vista', /(Windows NT 6.0)/ ],
    [ 'Windows 7', /(Windows NT 6.1)/ ],
    [ 'Windows 8', /(Windows NT 6.2)/ ],
    [ 'Windows 8.1', /(Windows NT 6.3)/ ],
    [ 'Windows 10', /(Windows NT 10.0)/ ],
    [ 'Windows ME', /Windows ME/ ],
    [ 'Open BSD', /OpenBSD/ ],
    [ 'Sun OS', /SunOS/ ],
    [ 'Linux', /(Linux)|(X11)/ ],
    [ 'Mac OS', /(Mac_PowerPC)|(Macintosh)/ ],
    [ 'QNX', /QNX/ ],
    [ 'BeOS', /BeOS/ ],
    [ 'OS/2', /OS\/2/ ],
    [ 'Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/ ]
  ]);
}

function buildRules(ruleTuples) {
  return ruleTuples.map(function(tuple) {
    return {
      name: tuple[0],
      rule: tuple[1]
    };
  });
}

module.exports = {
  detect: detect,
  detectOS: detectOS,
  getNodeVersion: getNodeVersion,
  parseUserAgent: parseUserAgent
};

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/detect-browser/index.js","/../../node_modules/detect-browser")
},{"b55mWE":6,"buffer":5}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
var globalObj = typeof self !== 'undefined' && self || this;
module.exports = globalObj.fetch.bind(globalObj);

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/fetch-everywhere/fetch-npm-browserify.js","/../../node_modules/fetch-everywhere")
},{"b55mWE":6,"buffer":5,"whatwg-fetch":113}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/../../node_modules/gulp-browserify/node_modules/base64-js/lib")
},{"b55mWE":6,"buffer":5}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/buffer/index.js","/../../node_modules/gulp-browserify/node_modules/buffer")
},{"b55mWE":6,"base64-js":4,"buffer":5,"ieee754":7}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/process/browser.js","/../../node_modules/gulp-browserify/node_modules/process")
},{"b55mWE":6,"buffer":5}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/ieee754/index.js","/../../node_modules/ieee754")
},{"b55mWE":6,"buffer":5}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk", "./internal/common/LocalStorage", "./internal/StitchAppClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var LocalStorage_1 = __importDefault(require("./internal/common/LocalStorage"));
    var StitchAppClientImpl_1 = __importDefault(require("./internal/StitchAppClientImpl"));
    var DEFAULT_BASE_URL = "https://stitch.mongodb.com";
    var appClients = {};
    var Stitch = (function () {
        function Stitch() {
        }
        Object.defineProperty(Stitch, "defaultAppClient", {
            get: function () {
                if (Stitch.defaultClientAppId === undefined) {
                    throw new Error("default app client has not yet been initialized/set");
                }
                return appClients[Stitch.defaultClientAppId];
            },
            enumerable: true,
            configurable: true
        });
        Stitch.getAppClient = function (clientAppId) {
            if (appClients[clientAppId] !== undefined) {
                throw new Error("client for app '" + clientAppId + "' has not yet been initialized");
            }
            return appClients[clientAppId];
        };
        Stitch.hasAppClient = function (clientAppId) {
            return appClients[clientAppId] !== undefined;
        };
        Stitch.initializeDefaultAppClient = function (clientAppId, config) {
            if (config === void 0) { config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build(); }
            if (clientAppId === undefined || clientAppId === "") {
                throw new Error("clientAppId must be set to a non-empty string");
            }
            if (Stitch.defaultClientAppId !== undefined) {
                throw new Error("default app can only be set once; currently set to '" + Stitch.defaultClientAppId + "'");
            }
            var client = Stitch.initializeAppClient(clientAppId, config);
            Stitch.defaultClientAppId = clientAppId;
            return client;
        };
        Stitch.initializeAppClient = function (clientAppId, config) {
            if (config === void 0) { config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build(); }
            if (clientAppId === undefined || clientAppId === "") {
                throw new Error("clientAppId must be set to a non-empty string");
            }
            if (appClients[clientAppId] !== undefined) {
                throw new Error("client for app '" + clientAppId + "' has already been initialized");
            }
            var builder = config.builder();
            if (builder.storage === undefined) {
                builder.withStorage(new LocalStorage_1.default(clientAppId));
            }
            if (builder.transport === undefined) {
                builder.withTransport(new mongodb_stitch_core_sdk_1.FetchTransport());
            }
            if (builder.baseUrl === undefined || builder.baseUrl === "") {
                builder.withBaseUrl(DEFAULT_BASE_URL);
            }
            if (builder.localAppName === undefined || builder.localAppName === "") {
                builder.withLocalAppName(Stitch.localAppName);
            }
            if (builder.localAppVersion === undefined ||
                builder.localAppVersion === "") {
                builder.withLocalAppVersion(Stitch.localAppVersion);
            }
            var client = new StitchAppClientImpl_1.default(clientAppId, builder.build());
            appClients[clientAppId] = client;
            return client;
        };
        return Stitch;
    }());
    exports.default = Stitch;
});
//# sourceMappingURL=Stitch.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/Stitch.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core")
},{"./internal/StitchAppClientImpl":23,"./internal/common/LocalStorage":24,"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RedirectFragmentFields;
    (function (RedirectFragmentFields) {
        RedirectFragmentFields["StitchError"] = "_stitch_error";
        RedirectFragmentFields["State"] = "_stitch_state";
        RedirectFragmentFields["UserAuth"] = "_stitch_ua";
        RedirectFragmentFields["LinkUser"] = "_stitch_link_user";
        RedirectFragmentFields["StitchLink"] = "_stitch_link";
        RedirectFragmentFields["ClientAppId"] = "_stitch_client_app_id";
    })(RedirectFragmentFields || (RedirectFragmentFields = {}));
    exports.default = RedirectFragmentFields;
});
//# sourceMappingURL=RedirectFragmentFields.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/RedirectFragmentFields.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"b55mWE":6,"buffer":5}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RedirectKeys;
    (function (RedirectKeys) {
        RedirectKeys["ProviderName"] = "_stitch_redirect_provider_name";
        RedirectKeys["ProviderType"] = "_stitch_redirect_provider_type";
        RedirectKeys["State"] = "_stitch_redirect_state";
    })(RedirectKeys || (RedirectKeys = {}));
    exports.default = RedirectKeys;
});
//# sourceMappingURL=RedirectKeys.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/RedirectKeys.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"b55mWE":6,"buffer":5}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "detect-browser", "mongodb-stitch-core-sdk", "../../internal/common/Version", "./RedirectFragmentFields", "./RedirectKeys", "./StitchRedirectError", "./StitchUserFactoryImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var detect_browser_1 = require("detect-browser");
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var Version_1 = __importDefault(require("../../internal/common/Version"));
    var RedirectFragmentFields_1 = __importDefault(require("./RedirectFragmentFields"));
    var RedirectKeys_1 = __importDefault(require("./RedirectKeys"));
    var StitchRedirectError_1 = __importDefault(require("./StitchRedirectError"));
    var StitchUserFactoryImpl_1 = __importDefault(require("./StitchUserFactoryImpl"));
    var alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var StitchAuthImpl = (function (_super) {
        __extends(StitchAuthImpl, _super);
        function StitchAuthImpl(requestClient, browserAuthRoutes, authStorage, appInfo, jsdomWindow) {
            if (jsdomWindow === void 0) { jsdomWindow = window; }
            var _this = _super.call(this, requestClient, browserAuthRoutes, authStorage) || this;
            _this.browserAuthRoutes = browserAuthRoutes;
            _this.authStorage = authStorage;
            _this.appInfo = appInfo;
            _this.jsdomWindow = jsdomWindow;
            _this.listeners = new Set();
            return _this;
        }
        Object.defineProperty(StitchAuthImpl.prototype, "userFactory", {
            get: function () {
                return new StitchUserFactoryImpl_1.default(this);
            },
            enumerable: true,
            configurable: true
        });
        StitchAuthImpl.prototype.getProviderClient = function (factory, providerName) {
            if (isAuthProviderClientFactory(factory)) {
                return factory.getClient(this, this.requestClient, this.authRoutes);
            }
            else {
                return factory.getNamedClient(providerName, this.requestClient, this.authRoutes);
            }
        };
        StitchAuthImpl.prototype.loginWithCredential = function (credential) {
            return _super.prototype.loginWithCredentialInternal.call(this, credential);
        };
        StitchAuthImpl.prototype.loginWithRedirect = function (credential) {
            var _a = this.prepareRedirect(credential), redirectUrl = _a.redirectUrl, state = _a.state;
            this.jsdomWindow.location.replace(this.browserAuthRoutes.getAuthProviderRedirectRoute(credential, redirectUrl, state, this.deviceInfo));
        };
        StitchAuthImpl.prototype.linkWithRedirectInternal = function (user, credential) {
            var _this = this;
            if (this.user !== undefined && user.id !== this.user.id) {
                return Promise.reject(new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.UserNoLongerValid));
            }
            var _a = this.prepareRedirect(credential), redirectUrl = _a.redirectUrl, state = _a.state;
            var link = this.browserAuthRoutes.getAuthProviderLinkRedirectRoute(credential, redirectUrl, state, this.deviceInfo);
            return fetch(new Request(link, {
                credentials: "include",
                headers: {
                    Authorization: "Bearer " + this.authInfo.accessToken
                }
            })).then(function (response) {
                _this.jsdomWindow.location.replace(response.headers.get("X-Stitch-Location"));
            });
        };
        StitchAuthImpl.prototype.hasRedirectResult = function () {
            var isValid = false;
            try {
                isValid = this.parseRedirect().isValid;
                return isValid;
            }
            catch (_) {
                return false;
            }
            finally {
                if (!isValid) {
                    this.cleanupRedirect();
                }
            }
        };
        StitchAuthImpl.prototype.handleRedirectResult = function () {
            try {
                var providerName = this.authStorage.get(RedirectKeys_1.default.ProviderName);
                var providerType = this.authStorage.get(RedirectKeys_1.default.ProviderType);
                var redirectFragment = this.parseRedirect();
                return this.loginWithCredentialInternal(new mongodb_stitch_core_sdk_1.StitchAuthResponseCredential(this.processRedirectResult(redirectFragment), providerType, providerName, redirectFragment.asLink)).then(function (user) {
                    return user;
                });
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        StitchAuthImpl.prototype.linkWithCredential = function (user, credential) {
            return _super.prototype.linkUserWithCredentialInternal.call(this, user, credential);
        };
        StitchAuthImpl.prototype.logout = function () {
            return Promise.resolve(_super.prototype.logoutInternal.call(this));
        };
        Object.defineProperty(StitchAuthImpl.prototype, "deviceInfo", {
            get: function () {
                var info = {};
                if (this.hasDeviceId) {
                    info[mongodb_stitch_core_sdk_1.DeviceFields.DEVICE_ID] = this.deviceId;
                }
                if (this.appInfo.localAppName !== undefined) {
                    info[mongodb_stitch_core_sdk_1.DeviceFields.APP_ID] = this.appInfo.localAppName;
                }
                if (this.appInfo.localAppVersion !== undefined) {
                    info[mongodb_stitch_core_sdk_1.DeviceFields.APP_VERSION] = this.appInfo.localAppVersion;
                }
                var browser = detect_browser_1.detect();
                if (browser) {
                    info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM] = browser.name;
                    info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM_VERSION] = browser.version;
                }
                else {
                    info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM] = "web";
                    info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM_VERSION] = "0.0.0";
                }
                info[mongodb_stitch_core_sdk_1.DeviceFields.SDK_VERSION] = Version_1.default;
                return info;
            },
            enumerable: true,
            configurable: true
        });
        StitchAuthImpl.prototype.addAuthListener = function (listener) {
            this.listeners.add(listener);
            this.onAuthEvent(listener);
        };
        StitchAuthImpl.prototype.removeAuthListener = function (listener) {
            this.listeners.delete(listener);
        };
        StitchAuthImpl.prototype.onAuthEvent = function (listener) {
            var _this = this;
            if (listener) {
                var auth_1 = this;
                var _1 = new Promise(function (resolve) {
                    listener.onAuthEvent(auth_1);
                    resolve(undefined);
                });
            }
            else {
                this.listeners.forEach(function (one) {
                    _this.onAuthEvent(one);
                });
            }
        };
        StitchAuthImpl.prototype.cleanupRedirect = function () {
            this.jsdomWindow.history.replaceState(null, "", this.pageRootUrl());
            this.authStorage.remove(RedirectKeys_1.default.State);
            this.authStorage.remove(RedirectKeys_1.default.ProviderName);
            this.authStorage.remove(RedirectKeys_1.default.ProviderType);
        };
        StitchAuthImpl.prototype.parseRedirect = function () {
            if (typeof this.jsdomWindow === "undefined") {
                throw new StitchRedirectError_1.default("running in a non-browser environment");
            }
            if (!this.jsdomWindow.location || !this.jsdomWindow.location.hash) {
                throw new StitchRedirectError_1.default("window location hash was undefined");
            }
            var ourState = this.authStorage.get(RedirectKeys_1.default.State);
            var redirectFragment = this.jsdomWindow.location.hash.substring(1);
            return parseRedirectFragment(redirectFragment, ourState, this.appInfo.clientAppId);
        };
        StitchAuthImpl.prototype.processRedirectResult = function (redirectFragment) {
            try {
                if (!redirectFragment.isValid) {
                    throw new StitchRedirectError_1.default("invalid redirect result");
                }
                if (redirectFragment.lastError) {
                    throw new StitchRedirectError_1.default("error handling redirect: " + redirectFragment.lastError);
                }
                if (!redirectFragment.authInfo) {
                    throw new StitchRedirectError_1.default("no user auth value was found: it could not be decoded from fragment");
                }
            }
            catch (err) {
                throw err;
            }
            finally {
                this.cleanupRedirect();
            }
            return redirectFragment.authInfo;
        };
        StitchAuthImpl.prototype.prepareRedirect = function (credential) {
            this.authStorage.set(RedirectKeys_1.default.ProviderName, credential.providerName);
            this.authStorage.set(RedirectKeys_1.default.ProviderType, credential.providerType);
            var redirectUrl = credential.redirectUrl;
            if (redirectUrl === undefined) {
                redirectUrl = this.pageRootUrl();
            }
            var state = generateState();
            this.authStorage.set(RedirectKeys_1.default.State, state);
            return { redirectUrl: redirectUrl, state: state };
        };
        StitchAuthImpl.prototype.pageRootUrl = function () {
            return [
                this.jsdomWindow.location.protocol,
                "//",
                this.jsdomWindow.location.host,
                this.jsdomWindow.location.pathname
            ].join("");
        };
        return StitchAuthImpl;
    }(mongodb_stitch_core_sdk_1.CoreStitchAuth));
    exports.default = StitchAuthImpl;
    function generateState() {
        var state = "";
        for (var i = 0; i < 64; ++i) {
            state += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
        }
        return state;
    }
    function unmarshallUserAuth(data) {
        var parts = data.split("$");
        if (parts.length !== 4) {
            throw new StitchRedirectError_1.default("invalid user auth data provided while " +
                "marshalling user authentication data: " +
                data);
        }
        var accessToken = parts[0], refreshToken = parts[1], userId = parts[2], deviceId = parts[3];
        return new mongodb_stitch_core_sdk_1.AuthInfo(userId, deviceId, accessToken, refreshToken);
    }
    var ParsedRedirectFragment = (function () {
        function ParsedRedirectFragment() {
            this.stateValid = false;
            this.clientAppIdValid = false;
            this.asLink = false;
        }
        Object.defineProperty(ParsedRedirectFragment.prototype, "isValid", {
            get: function () {
                return this.stateValid && this.clientAppIdValid;
            },
            enumerable: true,
            configurable: true
        });
        return ParsedRedirectFragment;
    }());
    function parseRedirectFragment(fragment, ourState, ourClientAppId) {
        var vars = fragment.split("&");
        var result = new ParsedRedirectFragment();
        vars.forEach(function (kvp) {
            var pairParts = kvp.split("=");
            var pairKey = decodeURIComponent(pairParts[0]);
            switch (pairKey) {
                case RedirectFragmentFields_1.default.StitchError:
                    result.lastError = decodeURIComponent(pairParts[1]);
                    break;
                case RedirectFragmentFields_1.default.UserAuth:
                    try {
                        result.authInfo = unmarshallUserAuth(decodeURIComponent(pairParts[1]));
                    }
                    catch (e) {
                        result.lastError = e;
                    }
                    break;
                case RedirectFragmentFields_1.default.StitchLink:
                    if (pairParts[1] == "ok") {
                        result.asLink = true;
                    }
                    break;
                case RedirectFragmentFields_1.default.State:
                    var theirState = decodeURIComponent(pairParts[1]);
                    if (ourState === theirState) {
                        result.stateValid = true;
                    }
                    break;
                case RedirectFragmentFields_1.default.ClientAppId:
                    var clientAppId = decodeURIComponent(pairParts[1]);
                    if (ourClientAppId === clientAppId) {
                        result.clientAppIdValid = true;
                    }
                    break;
                default:
                    break;
            }
        });
        return result;
    }
    function isAuthProviderClientFactory(factory) {
        return (factory.getClient !== undefined);
    }
});
//# sourceMappingURL=StitchAuthImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchAuthImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"../../internal/common/Version":25,"./RedirectFragmentFields":9,"./RedirectKeys":10,"./StitchRedirectError":14,"./StitchUserFactoryImpl":15,"b55mWE":6,"buffer":5,"detect-browser":2,"mongodb-stitch-core-sdk":73}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var StitchBrowserAppAuthRoutes = (function (_super) {
        __extends(StitchBrowserAppAuthRoutes, _super);
        function StitchBrowserAppAuthRoutes(clientAppId, baseUrl) {
            var _this = _super.call(this, clientAppId) || this;
            _this.baseUrl = baseUrl;
            return _this;
        }
        StitchBrowserAppAuthRoutes.prototype.getAuthProviderRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
            return "" + this.baseUrl + this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo);
        };
        StitchBrowserAppAuthRoutes.prototype.getAuthProviderLinkRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
            return "" + this.baseUrl + this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo) + "&link=true&providerRedirectHeader=true";
        };
        StitchBrowserAppAuthRoutes.prototype.uriEncodeObject = function (obj) {
            return encodeURIComponent(mongodb_stitch_core_sdk_1.base64Encode(JSON.stringify(obj)));
        };
        return StitchBrowserAppAuthRoutes;
    }(mongodb_stitch_core_sdk_1.StitchAppAuthRoutes));
    exports.default = StitchBrowserAppAuthRoutes;
});
//# sourceMappingURL=StitchBrowserAppAuthRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchBrowserAppAuthRoutes.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk", "./StitchBrowserAppAuthRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var StitchBrowserAppAuthRoutes_1 = __importDefault(require("./StitchBrowserAppAuthRoutes"));
    var StitchBrowserAppRoutes = (function (_super) {
        __extends(StitchBrowserAppRoutes, _super);
        function StitchBrowserAppRoutes(clientAppId, baseUrl) {
            var _this = _super.call(this, clientAppId) || this;
            _this.authRoutes = new StitchBrowserAppAuthRoutes_1.default(clientAppId, baseUrl);
            return _this;
        }
        return StitchBrowserAppRoutes;
    }(mongodb_stitch_core_sdk_1.StitchAppRoutes));
    exports.default = StitchBrowserAppRoutes;
});
//# sourceMappingURL=StitchBrowserAppRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchBrowserAppRoutes.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"./StitchBrowserAppAuthRoutes":12,"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var StitchRedirectError = (function (_super) {
        __extends(StitchRedirectError, _super);
        function StitchRedirectError(msg) {
            return _super.call(this, msg) || this;
        }
        return StitchRedirectError;
    }(mongodb_stitch_core_sdk_1.StitchError));
    exports.default = StitchRedirectError;
});
//# sourceMappingURL=StitchRedirectError.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchRedirectError.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchUserImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserImpl_1 = __importDefault(require("./StitchUserImpl"));
    var StitchUserFactoryImpl = (function () {
        function StitchUserFactoryImpl(auth) {
            this.auth = auth;
        }
        StitchUserFactoryImpl.prototype.makeUser = function (id, loggedInProviderType, loggedInProviderName, userProfile) {
            return new StitchUserImpl_1.default(id, loggedInProviderType, loggedInProviderName, userProfile, this.auth);
        };
        return StitchUserFactoryImpl;
    }());
    exports.default = StitchUserFactoryImpl;
});
//# sourceMappingURL=StitchUserFactoryImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchUserFactoryImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"./StitchUserImpl":16,"b55mWE":6,"buffer":5}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var StitchUserImpl = (function (_super) {
        __extends(StitchUserImpl, _super);
        function StitchUserImpl(id, loggedInProviderType, loggedInProviderName, profile, auth) {
            var _this = _super.call(this, id, loggedInProviderType, loggedInProviderName, profile) || this;
            _this.auth = auth;
            return _this;
        }
        StitchUserImpl.prototype.linkWithCredential = function (credential) {
            return this.auth.linkWithCredential(this, credential);
        };
        StitchUserImpl.prototype.linkUserWithRedirect = function (credential) {
            return this.auth.linkWithRedirectInternal(this, credential);
        };
        return StitchUserImpl;
    }(mongodb_stitch_core_sdk_1.CoreStitchUserImpl));
    exports.default = StitchUserImpl;
});
//# sourceMappingURL=StitchUserImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal/StitchUserImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/internal")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var FacebookRedirectCredential = (function () {
        function FacebookRedirectCredential(redirectUrl, providerName, providerType) {
            if (providerName === void 0) { providerName = mongodb_stitch_core_sdk_1.FacebookAuthProvider.DEFAULT_NAME; }
            if (providerType === void 0) { providerType = mongodb_stitch_core_sdk_1.FacebookAuthProvider.TYPE; }
            this.redirectUrl = redirectUrl;
            this.providerName = providerName;
            this.providerType = providerType;
        }
        return FacebookRedirectCredential;
    }());
    exports.default = FacebookRedirectCredential;
});
//# sourceMappingURL=FacebookRedirectCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/facebook/FacebookRedirectCredential.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/facebook")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var GoogleRedirectCredential = (function () {
        function GoogleRedirectCredential(redirectUrl, providerName, providerType) {
            if (providerName === void 0) { providerName = mongodb_stitch_core_sdk_1.GoogleAuthProvider.DEFAULT_NAME; }
            if (providerType === void 0) { providerType = mongodb_stitch_core_sdk_1.GoogleAuthProvider.TYPE; }
            this.redirectUrl = redirectUrl;
            this.providerName = providerName;
            this.providerType = providerType;
        }
        return GoogleRedirectCredential;
    }());
    exports.default = GoogleRedirectCredential;
});
//# sourceMappingURL=GoogleRedirectCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/google/GoogleRedirectCredential.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/google")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./internal/UserApiKeyAuthProviderClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserApiKeyAuthProviderClientImpl_1 = __importDefault(require("./internal/UserApiKeyAuthProviderClientImpl"));
    var UserApiKeyAuthProviderClient;
    (function (UserApiKeyAuthProviderClient) {
        UserApiKeyAuthProviderClient.factory = new (function () {
            function class_1() {
            }
            class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
                return new UserApiKeyAuthProviderClientImpl_1.default(authRequestClient, routes);
            };
            return class_1;
        }())();
    })(UserApiKeyAuthProviderClient = exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {}));
});
//# sourceMappingURL=UserApiKeyAuthProviderClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userapikey/UserApiKeyAuthProviderClient.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userapikey")
},{"./internal/UserApiKeyAuthProviderClientImpl":20,"b55mWE":6,"buffer":5}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var UserApiKeyAuthProviderClientImpl = (function (_super) {
        __extends(UserApiKeyAuthProviderClientImpl, _super);
        function UserApiKeyAuthProviderClientImpl(requestClient, routes) {
            return _super.call(this, requestClient, routes) || this;
        }
        UserApiKeyAuthProviderClientImpl.prototype.createApiKey = function (name) {
            return _super.prototype.createApiKey.call(this, name);
        };
        UserApiKeyAuthProviderClientImpl.prototype.fetchApiKey = function (keyId) {
            return _super.prototype.fetchApiKey.call(this, keyId);
        };
        UserApiKeyAuthProviderClientImpl.prototype.fetchApiKeys = function () {
            return _super.prototype.fetchApiKeys.call(this);
        };
        UserApiKeyAuthProviderClientImpl.prototype.deleteApiKey = function (keyId) {
            return _super.prototype.deleteApiKey.call(this, keyId);
        };
        UserApiKeyAuthProviderClientImpl.prototype.enableApiKey = function (keyId) {
            return _super.prototype.enableApiKey.call(this, keyId);
        };
        UserApiKeyAuthProviderClientImpl.prototype.disableApiKey = function (keyId) {
            return _super.prototype.disableApiKey.call(this, keyId);
        };
        return UserApiKeyAuthProviderClientImpl;
    }(mongodb_stitch_core_sdk_1.CoreUserApiKeyAuthProviderClient));
    exports.default = UserApiKeyAuthProviderClientImpl;
});
//# sourceMappingURL=UserApiKeyAuthProviderClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userapikey/internal/UserApiKeyAuthProviderClientImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userapikey/internal")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./internal/UserPasswordAuthProviderClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserPasswordAuthProviderClientImpl_1 = __importDefault(require("./internal/UserPasswordAuthProviderClientImpl"));
    var UserPasswordAuthProviderClient;
    (function (UserPasswordAuthProviderClient) {
        UserPasswordAuthProviderClient.factory = new (function () {
            function class_1() {
            }
            class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
                return new UserPasswordAuthProviderClientImpl_1.default(requestClient, routes);
            };
            return class_1;
        }())();
    })(UserPasswordAuthProviderClient = exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {}));
});
//# sourceMappingURL=UserPasswordAuthProviderClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userpassword/UserPasswordAuthProviderClient.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userpassword")
},{"./internal/UserPasswordAuthProviderClientImpl":22,"b55mWE":6,"buffer":5}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var UserPasswordAuthProviderClientImpl = (function (_super) {
        __extends(UserPasswordAuthProviderClientImpl, _super);
        function UserPasswordAuthProviderClientImpl(requestClient, routes) {
            return _super.call(this, mongodb_stitch_core_sdk_1.UserPasswordAuthProvider.DEFAULT_NAME, requestClient, routes) || this;
        }
        UserPasswordAuthProviderClientImpl.prototype.registerWithEmail = function (email, password) {
            return _super.prototype.registerWithEmailInternal.call(this, email, password);
        };
        UserPasswordAuthProviderClientImpl.prototype.confirmUser = function (token, tokenId) {
            return _super.prototype.confirmUserInternal.call(this, token, tokenId);
        };
        UserPasswordAuthProviderClientImpl.prototype.resendConfirmationEmail = function (email) {
            return _super.prototype.resendConfirmationEmailInternal.call(this, email);
        };
        UserPasswordAuthProviderClientImpl.prototype.resetPassword = function (token, tokenId, password) {
            return _super.prototype.resetPasswordInternal.call(this, token, tokenId, password);
        };
        UserPasswordAuthProviderClientImpl.prototype.sendResetPasswordEmail = function (email) {
            return _super.prototype.sendResetPasswordEmailInternal.call(this, email);
        };
        return UserPasswordAuthProviderClientImpl;
    }(mongodb_stitch_core_sdk_1.CoreUserPassAuthProviderClient));
    exports.default = UserPasswordAuthProviderClientImpl;
});
//# sourceMappingURL=UserPasswordAuthProviderClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userpassword/internal/UserPasswordAuthProviderClientImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/auth/providers/userpassword/internal")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk", "../auth/internal/StitchAuthImpl", "../auth/internal/StitchBrowserAppRoutes", "../../services/internal/StitchServiceClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    var StitchAuthImpl_1 = __importDefault(require("../auth/internal/StitchAuthImpl"));
    var StitchBrowserAppRoutes_1 = __importDefault(require("../auth/internal/StitchBrowserAppRoutes"));
    var StitchServiceClientImpl_1 = __importDefault(require("../../services/internal/StitchServiceClientImpl"));
    var StitchAppClientImpl = (function () {
        function StitchAppClientImpl(clientAppId, config) {
            this.info = new mongodb_stitch_core_sdk_1.StitchAppClientInfo(clientAppId, config.dataDirectory, config.localAppName, config.localAppVersion);
            this.routes = new StitchBrowserAppRoutes_1.default(this.info.clientAppId, config.baseUrl);
            var requestClient = new mongodb_stitch_core_sdk_1.StitchRequestClient(config.baseUrl, config.transport);
            this.auth = new StitchAuthImpl_1.default(requestClient, this.routes.authRoutes, config.storage, this.info);
            this.coreClient = new mongodb_stitch_core_sdk_1.CoreStitchAppClient(this.auth, this.routes);
        }
        StitchAppClientImpl.prototype.getServiceClient = function (factory, serviceName) {
            if (isServiceClientFactory(factory)) {
                return factory.getClient(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, ""), this.info);
            }
            else {
                return factory.getNamedClient(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, serviceName), this.info);
            }
        };
        StitchAppClientImpl.prototype.getGeneralServiceClient = function (serviceName) {
            return new StitchServiceClientImpl_1.default(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, serviceName));
        };
        StitchAppClientImpl.prototype.callFunction = function (name, args) {
            return this.coreClient.callFunction(name, args);
        };
        return StitchAppClientImpl;
    }());
    exports.default = StitchAppClientImpl;
    function isServiceClientFactory(factory) {
        return factory.getClient !== undefined;
    }
});
//# sourceMappingURL=StitchAppClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal/StitchAppClientImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal")
},{"../../services/internal/StitchServiceClientImpl":27,"../auth/internal/StitchAuthImpl":11,"../auth/internal/StitchBrowserAppRoutes":13,"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stitchPrefixKey = "__stitch.client";
    var LocalStorage = (function () {
        function LocalStorage(suiteName) {
            this.suiteName = suiteName;
        }
        LocalStorage.prototype.getKey = function (forKey) {
            return stitchPrefixKey + "." + this.suiteName + "." + forKey;
        };
        LocalStorage.prototype.get = function (key) {
            return localStorage.getItem(this.getKey(key));
        };
        LocalStorage.prototype.set = function (key, value) {
            localStorage.setItem(this.getKey(key), value);
        };
        LocalStorage.prototype.remove = function (key) {
            localStorage.removeItem(this.getKey(key));
        };
        return LocalStorage;
    }());
    exports.default = LocalStorage;
});
//# sourceMappingURL=LocalStorage.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal/common/LocalStorage.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal/common")
},{"b55mWE":6,"buffer":5}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var version = "4.0.13";
    exports.default = version;
});
//# sourceMappingURL=Version.js.map

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal/common/Version.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/core/internal/common")
},{"b55mWE":6,"buffer":5}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-sdk", "./core/auth/providers/facebook/FacebookRedirectCredential", "./core/auth/providers/google/GoogleRedirectCredential", "./core/auth/providers/userapikey/UserApiKeyAuthProviderClient", "./core/auth/providers/userpassword/UserPasswordAuthProviderClient", "./core/Stitch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
    exports.AnonymousAuthProvider = mongodb_stitch_core_sdk_1.AnonymousAuthProvider;
    exports.AnonymousCredential = mongodb_stitch_core_sdk_1.AnonymousCredential;
    exports.CustomAuthProvider = mongodb_stitch_core_sdk_1.CustomAuthProvider;
    exports.CustomCredential = mongodb_stitch_core_sdk_1.CustomCredential;
    exports.FacebookAuthProvider = mongodb_stitch_core_sdk_1.FacebookAuthProvider;
    exports.FacebookCredential = mongodb_stitch_core_sdk_1.FacebookCredential;
    exports.GoogleAuthProvider = mongodb_stitch_core_sdk_1.GoogleAuthProvider;
    exports.GoogleCredential = mongodb_stitch_core_sdk_1.GoogleCredential;
    exports.MemoryStorage = mongodb_stitch_core_sdk_1.MemoryStorage;
    exports.ServerApiKeyAuthProvider = mongodb_stitch_core_sdk_1.ServerApiKeyAuthProvider;
    exports.ServerApiKeyCredential = mongodb_stitch_core_sdk_1.ServerApiKeyCredential;
    exports.StitchAppClientConfiguration = mongodb_stitch_core_sdk_1.StitchAppClientConfiguration;
    exports.StitchAppClientInfo = mongodb_stitch_core_sdk_1.StitchAppClientInfo;
    exports.StitchClientError = mongodb_stitch_core_sdk_1.StitchClientError;
    exports.StitchClientErrorCode = mongodb_stitch_core_sdk_1.StitchClientErrorCode;
    exports.StitchRequestError = mongodb_stitch_core_sdk_1.StitchRequestError;
    exports.StitchRequestErrorCode = mongodb_stitch_core_sdk_1.StitchRequestErrorCode;
    exports.StitchServiceError = mongodb_stitch_core_sdk_1.StitchServiceError;
    exports.StitchServiceErrorCode = mongodb_stitch_core_sdk_1.StitchServiceErrorCode;
    exports.StitchUserIdentity = mongodb_stitch_core_sdk_1.StitchUserIdentity;
    exports.UserApiKey = mongodb_stitch_core_sdk_1.UserApiKey;
    exports.UserApiKeyAuthProvider = mongodb_stitch_core_sdk_1.UserApiKeyAuthProvider;
    exports.UserApiKeyCredential = mongodb_stitch_core_sdk_1.UserApiKeyCredential;
    exports.UserPasswordAuthProvider = mongodb_stitch_core_sdk_1.UserPasswordAuthProvider;
    exports.UserPasswordCredential = mongodb_stitch_core_sdk_1.UserPasswordCredential;
    exports.UserType = mongodb_stitch_core_sdk_1.UserType;
    var FacebookRedirectCredential_1 = __importDefault(require("./core/auth/providers/facebook/FacebookRedirectCredential"));
    exports.FacebookRedirectCredential = FacebookRedirectCredential_1.default;
    var GoogleRedirectCredential_1 = __importDefault(require("./core/auth/providers/google/GoogleRedirectCredential"));
    exports.GoogleRedirectCredential = GoogleRedirectCredential_1.default;
    var UserApiKeyAuthProviderClient_1 = require("./core/auth/providers/userapikey/UserApiKeyAuthProviderClient");
    exports.UserApiKeyAuthProviderClient = UserApiKeyAuthProviderClient_1.UserApiKeyAuthProviderClient;
    var UserPasswordAuthProviderClient_1 = require("./core/auth/providers/userpassword/UserPasswordAuthProviderClient");
    exports.UserPasswordAuthProviderClient = UserPasswordAuthProviderClient_1.UserPasswordAuthProviderClient;
    var Stitch_1 = __importDefault(require("./core/Stitch"));
    exports.Stitch = Stitch_1.default;
});
//# sourceMappingURL=index.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/index.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd")
},{"./core/Stitch":8,"./core/auth/providers/facebook/FacebookRedirectCredential":17,"./core/auth/providers/google/GoogleRedirectCredential":18,"./core/auth/providers/userapikey/UserApiKeyAuthProviderClient":19,"./core/auth/providers/userpassword/UserPasswordAuthProviderClient":21,"b55mWE":6,"buffer":5,"mongodb-stitch-core-sdk":73}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchServiceClientImpl = (function () {
        function StitchServiceClientImpl(proxy) {
            this.proxy = proxy;
        }
        StitchServiceClientImpl.prototype.callFunction = function (name, args, codec) {
            return this.proxy.callFunction(name, args, codec);
        };
        return StitchServiceClientImpl;
    }());
    exports.default = StitchServiceClientImpl;
});
//# sourceMappingURL=StitchServiceClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/dist/umd/services/internal/StitchServiceClientImpl.js","/../../node_modules/mongodb-stitch-browser-core/dist/umd/services/internal")
},{"b55mWE":6,"buffer":5}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchClientConfiguration"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchClientConfiguration_1 = require("./StitchClientConfiguration");
    var StitchAppClientConfiguration = (function (_super) {
        __extends(StitchAppClientConfiguration, _super);
        function StitchAppClientConfiguration(config, localAppName, localAppVersion) {
            var _this = _super.call(this, config.baseUrl, config.storage, config.dataDirectory, config.transport) || this;
            _this.localAppVersion = localAppVersion;
            _this.localAppName = localAppName;
            return _this;
        }
        StitchAppClientConfiguration.prototype.builder = function () {
            return new StitchAppClientConfiguration.Builder(this);
        };
        return StitchAppClientConfiguration;
    }(StitchClientConfiguration_1.StitchClientConfiguration));
    exports.StitchAppClientConfiguration = StitchAppClientConfiguration;
    (function (StitchAppClientConfiguration) {
        var Builder = (function (_super) {
            __extends(Builder, _super);
            function Builder(config) {
                var _this = _super.call(this, config) || this;
                if (config) {
                    _this.localAppVersion = config.localAppVersion;
                    _this.localAppName = config.localAppName;
                }
                return _this;
            }
            Builder.prototype.withLocalAppName = function (localAppName) {
                this.localAppName = localAppName;
                return this;
            };
            Builder.prototype.withLocalAppVersion = function (localAppVersion) {
                this.localAppVersion = localAppVersion;
                return this;
            };
            Builder.prototype.build = function () {
                var config = _super.prototype.build.call(this);
                return new StitchAppClientConfiguration(config, this.localAppName, this.localAppVersion);
            };
            return Builder;
        }(StitchClientConfiguration_1.StitchClientConfiguration.Builder));
        StitchAppClientConfiguration.Builder = Builder;
    })(StitchAppClientConfiguration = exports.StitchAppClientConfiguration || (exports.StitchAppClientConfiguration = {}));
    exports.StitchAppClientConfiguration = StitchAppClientConfiguration;
});
//# sourceMappingURL=StitchAppClientConfiguration.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchAppClientConfiguration.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"./StitchClientConfiguration":30,"b55mWE":6,"buffer":5}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchAppClientInfo = (function () {
        function StitchAppClientInfo(clientAppId, dataDirectory, localAppName, localAppVersion) {
            this.clientAppId = clientAppId;
            this.dataDirectory = dataDirectory;
            this.localAppName = localAppName;
            this.localAppVersion = localAppVersion;
        }
        return StitchAppClientInfo;
    }());
    exports.default = StitchAppClientInfo;
});
//# sourceMappingURL=StitchAppClientInfo.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchAppClientInfo.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchClientConfiguration = (function () {
        function StitchClientConfiguration(baseUrl, storage, dataDirectory, transport) {
            this.baseUrl = baseUrl;
            this.storage = storage;
            this.dataDirectory = dataDirectory;
            this.transport = transport;
        }
        StitchClientConfiguration.prototype.builder = function () {
            return new StitchClientConfiguration.Builder(this);
        };
        return StitchClientConfiguration;
    }());
    exports.StitchClientConfiguration = StitchClientConfiguration;
    (function (StitchClientConfiguration) {
        var Builder = (function () {
            function Builder(config) {
                if (config) {
                    this.baseUrl = config.baseUrl;
                    this.storage = config.storage;
                    this.dataDirectory = config.dataDirectory;
                    this.transport = config.transport;
                }
            }
            Builder.prototype.withBaseUrl = function (baseUrl) {
                this.baseUrl = baseUrl;
                return this;
            };
            Builder.prototype.withStorage = function (storage) {
                this.storage = storage;
                return this;
            };
            Builder.prototype.withDataDirectory = function (dataDirectory) {
                this.dataDirectory = dataDirectory;
                return this;
            };
            Builder.prototype.withTransport = function (transport) {
                this.transport = transport;
                return this;
            };
            Builder.prototype.build = function () {
                return new StitchClientConfiguration(this.baseUrl, this.storage, this.dataDirectory, this.transport);
            };
            return Builder;
        }());
        StitchClientConfiguration.Builder = Builder;
    })(StitchClientConfiguration = exports.StitchClientConfiguration || (exports.StitchClientConfiguration = {}));
    exports.StitchClientConfiguration = StitchClientConfiguration;
});
//# sourceMappingURL=StitchClientConfiguration.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchClientConfiguration.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchClientErrorCode", "./StitchError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchClientErrorCode_1 = require("./StitchClientErrorCode");
    var StitchError_1 = __importDefault(require("./StitchError"));
    var StitchClientError = (function (_super) {
        __extends(StitchClientError, _super);
        function StitchClientError(errorCode) {
            var _this = this;
            var message = "(" + StitchClientErrorCode_1.StitchClientErrorCode[errorCode] + "): " + StitchClientErrorCode_1.clientErrorCodeDescs[errorCode];
            _this = _super.call(this, message) || this;
            _this.errorCode = errorCode;
            _this.errorCodeName = StitchClientErrorCode_1.StitchClientErrorCode[errorCode];
            return _this;
        }
        return StitchClientError;
    }(StitchError_1.default));
    exports.default = StitchClientError;
});
//# sourceMappingURL=StitchClientError.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchClientError.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"./StitchClientErrorCode":32,"./StitchError":33,"b55mWE":6,"buffer":5}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a;
    var StitchClientErrorCode;
    (function (StitchClientErrorCode) {
        StitchClientErrorCode[StitchClientErrorCode["LoggedOutDuringRequest"] = 0] = "LoggedOutDuringRequest";
        StitchClientErrorCode[StitchClientErrorCode["MustAuthenticateFirst"] = 1] = "MustAuthenticateFirst";
        StitchClientErrorCode[StitchClientErrorCode["UserNoLongerValid"] = 2] = "UserNoLongerValid";
        StitchClientErrorCode[StitchClientErrorCode["CouldNotLoadPersistedAuthInfo"] = 3] = "CouldNotLoadPersistedAuthInfo";
        StitchClientErrorCode[StitchClientErrorCode["CouldNotPersistAuthInfo"] = 4] = "CouldNotPersistAuthInfo";
    })(StitchClientErrorCode = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}));
    exports.clientErrorCodeDescs = (_a = {},
        _a[StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch",
        _a[StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated",
        _a[StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()",
        _a[StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch",
        _a[StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch",
        _a);
});
//# sourceMappingURL=StitchClientErrorCode.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchClientErrorCode.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _Error = function (message) {
        Error.call(this, message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        }
        this.message = message;
        this.name = this.constructor.name;
    };
    _Error.prototype = Object.create(Error.prototype);
    var StitchError = (function (_super) {
        __extends(StitchError, _super);
        function StitchError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StitchError;
    }(_Error));
    exports.default = StitchError;
});
//# sourceMappingURL=StitchError.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchError.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchError", "./StitchRequestErrorCode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchError_1 = __importDefault(require("./StitchError"));
    var StitchRequestErrorCode_1 = require("./StitchRequestErrorCode");
    var StitchRequestError = (function (_super) {
        __extends(StitchRequestError, _super);
        function StitchRequestError(underlyingError, errorCode) {
            var _this = this;
            var message = underlyingError.message + "(" + StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode] + "): " + StitchRequestErrorCode_1.requestErrorCodeDescs[errorCode];
            _this = _super.call(this, message) || this;
            _this.underlyingError = underlyingError;
            _this.errorCode = errorCode;
            _this.errorCodeName = StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode];
            return _this;
        }
        return StitchRequestError;
    }(StitchError_1.default));
    exports.default = StitchRequestError;
});
//# sourceMappingURL=StitchRequestError.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchRequestError.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"./StitchError":33,"./StitchRequestErrorCode":35,"b55mWE":6,"buffer":5}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a;
    var StitchRequestErrorCode;
    (function (StitchRequestErrorCode) {
        StitchRequestErrorCode[StitchRequestErrorCode["TRANSPORT_ERROR"] = 0] = "TRANSPORT_ERROR";
        StitchRequestErrorCode[StitchRequestErrorCode["DECODING_ERROR"] = 1] = "DECODING_ERROR";
        StitchRequestErrorCode[StitchRequestErrorCode["ENCODING_ERROR"] = 2] = "ENCODING_ERROR";
    })(StitchRequestErrorCode = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}));
    exports.requestErrorCodeDescs = (_a = {},
        _a[StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch",
        _a[StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch",
        _a[StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch",
        _a);
});
//# sourceMappingURL=StitchRequestErrorCode.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchRequestErrorCode.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchError", "./StitchServiceErrorCode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchError_1 = __importDefault(require("./StitchError"));
    var StitchServiceErrorCode_1 = require("./StitchServiceErrorCode");
    var StitchServiceError = (function (_super) {
        __extends(StitchServiceError, _super);
        function StitchServiceError(message, errorCode) {
            if (errorCode === void 0) { errorCode = StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.errorCode = errorCode;
            _this.errorCodeName = StitchServiceErrorCode_1.StitchServiceErrorCode[errorCode];
            return _this;
        }
        return StitchServiceError;
    }(StitchError_1.default));
    exports.default = StitchServiceError;
});
//# sourceMappingURL=StitchServiceError.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchServiceError.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"./StitchError":33,"./StitchServiceErrorCode":37,"b55mWE":6,"buffer":5}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchServiceErrorCode;
    (function (StitchServiceErrorCode) {
        StitchServiceErrorCode[StitchServiceErrorCode["MissingAuthReq"] = 0] = "MissingAuthReq";
        StitchServiceErrorCode[StitchServiceErrorCode["InvalidSession"] = 1] = "InvalidSession";
        StitchServiceErrorCode[StitchServiceErrorCode["UserAppDomainMismatch"] = 2] = "UserAppDomainMismatch";
        StitchServiceErrorCode[StitchServiceErrorCode["DomainNotAllowed"] = 3] = "DomainNotAllowed";
        StitchServiceErrorCode[StitchServiceErrorCode["ReadSizeLimitExceeded"] = 4] = "ReadSizeLimitExceeded";
        StitchServiceErrorCode[StitchServiceErrorCode["InvalidParameter"] = 5] = "InvalidParameter";
        StitchServiceErrorCode[StitchServiceErrorCode["MissingParameter"] = 6] = "MissingParameter";
        StitchServiceErrorCode[StitchServiceErrorCode["TwilioError"] = 7] = "TwilioError";
        StitchServiceErrorCode[StitchServiceErrorCode["GCMError"] = 8] = "GCMError";
        StitchServiceErrorCode[StitchServiceErrorCode["HTTPError"] = 9] = "HTTPError";
        StitchServiceErrorCode[StitchServiceErrorCode["AWSError"] = 10] = "AWSError";
        StitchServiceErrorCode[StitchServiceErrorCode["MongoDBError"] = 11] = "MongoDBError";
        StitchServiceErrorCode[StitchServiceErrorCode["ArgumentsNotAllowed"] = 12] = "ArgumentsNotAllowed";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionExecutionError"] = 13] = "FunctionExecutionError";
        StitchServiceErrorCode[StitchServiceErrorCode["NoMatchingRuleFound"] = 14] = "NoMatchingRuleFound";
        StitchServiceErrorCode[StitchServiceErrorCode["InternalServerError"] = 15] = "InternalServerError";
        StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderNotFound"] = 16] = "AuthProviderNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderAlreadyExists"] = 17] = "AuthProviderAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["ServiceNotFound"] = 18] = "ServiceNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["ServiceTypeNotFound"] = 19] = "ServiceTypeNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["ServiceAlreadyExists"] = 20] = "ServiceAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["ServiceCommandNotFound"] = 21] = "ServiceCommandNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["ValueNotFound"] = 22] = "ValueNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["ValueAlreadyExists"] = 23] = "ValueAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["ValueDuplicateName"] = 24] = "ValueDuplicateName";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotFound"] = 25] = "FunctionNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionAlreadyExists"] = 26] = "FunctionAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionDuplicateName"] = 27] = "FunctionDuplicateName";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionSyntaxError"] = 28] = "FunctionSyntaxError";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionInvalid"] = 29] = "FunctionInvalid";
        StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookNotFound"] = 30] = "IncomingWebhookNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAlreadyExists"] = 31] = "IncomingWebhookAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookDuplicateName"] = 32] = "IncomingWebhookDuplicateName";
        StitchServiceErrorCode[StitchServiceErrorCode["RuleNotFound"] = 33] = "RuleNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyNotFound"] = 34] = "ApiKeyNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["RuleAlreadyExists"] = 35] = "RuleAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["RuleDuplicateName"] = 36] = "RuleDuplicateName";
        StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderDuplicateName"] = 37] = "AuthProviderDuplicateName";
        StitchServiceErrorCode[StitchServiceErrorCode["RestrictedHost"] = 38] = "RestrictedHost";
        StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyAlreadyExists"] = 39] = "ApiKeyAlreadyExists";
        StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAuthFailed"] = 40] = "IncomingWebhookAuthFailed";
        StitchServiceErrorCode[StitchServiceErrorCode["ExecutionTimeLimitExceeded"] = 41] = "ExecutionTimeLimitExceeded";
        StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotCallable"] = 42] = "FunctionNotCallable";
        StitchServiceErrorCode[StitchServiceErrorCode["UserAlreadyConfirmed"] = 43] = "UserAlreadyConfirmed";
        StitchServiceErrorCode[StitchServiceErrorCode["UserNotFound"] = 44] = "UserNotFound";
        StitchServiceErrorCode[StitchServiceErrorCode["UserDisabled"] = 45] = "UserDisabled";
        StitchServiceErrorCode[StitchServiceErrorCode["Unknown"] = 46] = "Unknown";
    })(StitchServiceErrorCode = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}));
    var apiErrorCodes = {
        MissingAuthReq: StitchServiceErrorCode.MissingAuthReq,
        InvalidSession: StitchServiceErrorCode.InvalidSession,
        UserAppDomainMismatch: StitchServiceErrorCode.UserAppDomainMismatch,
        DomainNotAllowed: StitchServiceErrorCode.DomainNotAllowed,
        ReadSizeLimitExceeded: StitchServiceErrorCode.ReadSizeLimitExceeded,
        InvalidParameter: StitchServiceErrorCode.InvalidParameter,
        MissingParameter: StitchServiceErrorCode.MissingParameter,
        TwilioError: StitchServiceErrorCode.TwilioError,
        GCMError: StitchServiceErrorCode.GCMError,
        HTTPError: StitchServiceErrorCode.HTTPError,
        AWSError: StitchServiceErrorCode.AWSError,
        MongoDBError: StitchServiceErrorCode.MongoDBError,
        ArgumentsNotAllowed: StitchServiceErrorCode.ArgumentsNotAllowed,
        FunctionExecutionError: StitchServiceErrorCode.FunctionExecutionError,
        NoMatchingRuleFound: StitchServiceErrorCode.NoMatchingRuleFound,
        InternalServerError: StitchServiceErrorCode.InternalServerError,
        AuthProviderNotFound: StitchServiceErrorCode.AuthProviderNotFound,
        AuthProviderAlreadyExists: StitchServiceErrorCode.AuthProviderAlreadyExists,
        ServiceNotFound: StitchServiceErrorCode.ServiceNotFound,
        ServiceTypeNotFound: StitchServiceErrorCode.ServiceTypeNotFound,
        ServiceAlreadyExists: StitchServiceErrorCode.ServiceAlreadyExists,
        ServiceCommandNotFound: StitchServiceErrorCode.ServiceCommandNotFound,
        ValueNotFound: StitchServiceErrorCode.ValueNotFound,
        ValueAlreadyExists: StitchServiceErrorCode.ValueAlreadyExists,
        ValueDuplicateName: StitchServiceErrorCode.ValueDuplicateName,
        FunctionNotFound: StitchServiceErrorCode.FunctionNotFound,
        FunctionAlreadyExists: StitchServiceErrorCode.FunctionAlreadyExists,
        FunctionDuplicateName: StitchServiceErrorCode.FunctionDuplicateName,
        FunctionSyntaxError: StitchServiceErrorCode.FunctionSyntaxError,
        FunctionInvalid: StitchServiceErrorCode.FunctionInvalid,
        IncomingWebhookNotFound: StitchServiceErrorCode.IncomingWebhookNotFound,
        IncomingWebhookAlreadyExists: StitchServiceErrorCode.IncomingWebhookAlreadyExists,
        IncomingWebhookDuplicateName: StitchServiceErrorCode.IncomingWebhookDuplicateName,
        RuleNotFound: StitchServiceErrorCode.RuleNotFound,
        APIKeyNotFound: StitchServiceErrorCode.ApiKeyNotFound,
        RuleAlreadyExists: StitchServiceErrorCode.RuleAlreadyExists,
        RuleDuplicateName: StitchServiceErrorCode.RuleDuplicateName,
        AuthProviderDuplicateName: StitchServiceErrorCode.AuthProviderDuplicateName,
        RestrictedHost: StitchServiceErrorCode.RestrictedHost,
        APIKeyAlreadyExists: StitchServiceErrorCode.ApiKeyAlreadyExists,
        IncomingWebhookAuthFailed: StitchServiceErrorCode.IncomingWebhookAuthFailed,
        ExecutionTimeLimitExceeded: StitchServiceErrorCode.ExecutionTimeLimitExceeded,
        FunctionNotCallable: StitchServiceErrorCode.FunctionNotCallable,
        UserAlreadyConfirmed: StitchServiceErrorCode.UserAlreadyConfirmed,
        UserNotFound: StitchServiceErrorCode.UserNotFound,
        UserDisabled: StitchServiceErrorCode.UserDisabled
    };
    function stitchServiceErrorCodeFromApi(code) {
        if (!(code in apiErrorCodes)) {
            return StitchServiceErrorCode.Unknown;
        }
        return apiErrorCodes[code];
    }
    exports.stitchServiceErrorCodeFromApi = stitchServiceErrorCodeFromApi;
});
//# sourceMappingURL=StitchServiceErrorCode.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/StitchServiceErrorCode.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"b55mWE":6,"buffer":5}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities = (function () {
        function ProviderCapabilities(reusesExistingSession) {
            if (reusesExistingSession === void 0) { reusesExistingSession = false; }
            this.reusesExistingSession = reusesExistingSession;
        }
        return ProviderCapabilities;
    }());
    exports.default = ProviderCapabilities;
});
//# sourceMappingURL=ProviderCapabilities.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/ProviderCapabilities.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth")
},{"b55mWE":6,"buffer":5}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserIdentity = (function () {
        function StitchUserIdentity(id, providerType) {
            this.id = id;
            this.providerType = providerType;
        }
        return StitchUserIdentity;
    }());
    exports.default = StitchUserIdentity;
});
//# sourceMappingURL=StitchUserIdentity.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/StitchUserIdentity.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth")
},{"b55mWE":6,"buffer":5}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserType;
    (function (UserType) {
        UserType["Normal"] = "normal";
        UserType["Server"] = "server";
        UserType["Unknown"] = "unknown";
    })(UserType || (UserType = {}));
    exports.default = UserType;
});
//# sourceMappingURL=UserType.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/UserType.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth")
},{"b55mWE":6,"buffer":5}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./JWT"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JWT_1 = __importDefault(require("./JWT"));
    var SLEEP_MILLIS = 60000;
    var EXPIRATION_WINDOW_SECS = 300;
    var AccessTokenRefresher = (function () {
        function AccessTokenRefresher(auth) {
            this.auth = auth;
        }
        AccessTokenRefresher.prototype.shouldRefresh = function () {
            var auth = this.auth;
            if (auth === undefined) {
                return false;
            }
            if (!auth.isLoggedIn) {
                return false;
            }
            var info = auth.authInfo;
            if (info === undefined) {
                return false;
            }
            var jwt;
            try {
                jwt = JWT_1.default.fromEncoded(info.accessToken);
            }
            catch (e) {
                console.log(e);
                return false;
            }
            if (Date.now() / 1000 < jwt.expires - EXPIRATION_WINDOW_SECS) {
                return false;
            }
            return true;
        };
        AccessTokenRefresher.prototype.run = function () {
            var _this = this;
            if (!this.shouldRefresh()) {
                this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
            }
            else {
                this.auth.refreshAccessToken().then(function () {
                    _this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
                }).catch(function () {
                    _this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
                });
            }
        };
        AccessTokenRefresher.prototype.stop = function () {
            clearTimeout(this.nextTimeout);
        };
        return AccessTokenRefresher;
    }());
    exports.default = AccessTokenRefresher;
});
//# sourceMappingURL=AccessTokenRefresher.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/AccessTokenRefresher.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"./JWT":46,"b55mWE":6,"buffer":5}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthInfo = (function () {
        function AuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) {
            this.userId = userId;
            this.deviceId = deviceId;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.loggedInProviderType = loggedInProviderType;
            this.loggedInProviderName = loggedInProviderName;
            this.userProfile = userProfile;
        }
        AuthInfo.empty = function () {
            return new AuthInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        };
        AuthInfo.prototype.loggedOut = function () {
            return new AuthInfo(undefined, this.deviceId, undefined, undefined, undefined, undefined, undefined);
        };
        AuthInfo.prototype.merge = function (newInfo) {
            return new AuthInfo(newInfo.userId === undefined ? this.userId : newInfo.userId, newInfo.deviceId === undefined ? this.deviceId : newInfo.deviceId, newInfo.accessToken === undefined
                ? this.accessToken
                : newInfo.accessToken, newInfo.refreshToken === undefined
                ? this.refreshToken
                : newInfo.refreshToken, newInfo.loggedInProviderType === undefined
                ? this.loggedInProviderType
                : newInfo.loggedInProviderType, newInfo.loggedInProviderName === undefined
                ? this.loggedInProviderName
                : newInfo.loggedInProviderName, newInfo.userProfile === undefined ? this.userProfile : newInfo.userProfile);
        };
        return AuthInfo;
    }());
    exports.default = AuthInfo;
});
//# sourceMappingURL=AuthInfo.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/AuthInfo.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"b55mWE":6,"buffer":5}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-extjson", "../../internal/common/StitchErrorUtils", "../../internal/net/Headers", "../../internal/net/Method", "../../internal/net/StitchAuthDocRequest", "../../internal/net/StitchAuthRequest", "../../internal/net/StitchDocRequest", "../../StitchClientError", "../../StitchClientErrorCode", "../../StitchError", "../../StitchRequestError", "../../StitchRequestErrorCode", "../../StitchServiceError", "../../StitchServiceErrorCode", "../providers/internal/StitchAuthResponseCredential", "./AccessTokenRefresher", "./AuthInfo", "./JWT", "./models/ApiAuthInfo", "./models/ApiCoreUserProfile", "./models/StoreAuthInfo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EJSON = __importStar(require("mongodb-stitch-extjson"));
    var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");
    var Headers_1 = __importDefault(require("../../internal/net/Headers"));
    var Method_1 = __importDefault(require("../../internal/net/Method"));
    var StitchAuthDocRequest_1 = require("../../internal/net/StitchAuthDocRequest");
    var StitchAuthRequest_1 = require("../../internal/net/StitchAuthRequest");
    var StitchDocRequest_1 = require("../../internal/net/StitchDocRequest");
    var StitchClientError_1 = __importDefault(require("../../StitchClientError"));
    var StitchClientErrorCode_1 = require("../../StitchClientErrorCode");
    var StitchError_1 = __importDefault(require("../../StitchError"));
    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
    var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));
    var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");
    var StitchAuthResponseCredential_1 = __importDefault(require("../providers/internal/StitchAuthResponseCredential"));
    var AccessTokenRefresher_1 = __importDefault(require("./AccessTokenRefresher"));
    var AuthInfo_1 = __importDefault(require("./AuthInfo"));
    var JWT_1 = __importDefault(require("./JWT"));
    var ApiAuthInfo_1 = __importDefault(require("./models/ApiAuthInfo"));
    var ApiCoreUserProfile_1 = __importDefault(require("./models/ApiCoreUserProfile"));
    var StoreAuthInfo_1 = require("./models/StoreAuthInfo");
    var OPTIONS = "options";
    var DEVICE = "device";
    var CoreStitchAuth = (function () {
        function CoreStitchAuth(requestClient, authRoutes, storage, useTokenRefresher) {
            if (useTokenRefresher === void 0) { useTokenRefresher = true; }
            this.requestClient = requestClient;
            this.authRoutes = authRoutes;
            this.storage = storage;
            var info;
            try {
                info = StoreAuthInfo_1.readFromStorage(storage);
            }
            catch (e) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
            }
            if (info === undefined) {
                this.authInfo = AuthInfo_1.default.empty();
            }
            else {
                this.authInfo = info;
            }
            this.prepUser();
            if (useTokenRefresher) {
                this.accessTokenRefresher = new AccessTokenRefresher_1.default(this);
                this.accessTokenRefresher.run();
            }
        }
        Object.defineProperty(CoreStitchAuth.prototype, "isLoggedIn", {
            get: function () {
                return this.currentUser !== undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreStitchAuth.prototype, "user", {
            get: function () {
                return this.currentUser;
            },
            enumerable: true,
            configurable: true
        });
        CoreStitchAuth.prototype.doAuthenticatedRequest = function (stitchReq) {
            var _this = this;
            return this.requestClient
                .doRequest(this.prepareAuthRequest(stitchReq))
                .catch(function (err) {
                return _this.handleAuthFailure(err, stitchReq);
            });
        };
        CoreStitchAuth.prototype.doAuthenticatedRequestWithDecoder = function (stitchReq, codec) {
            return this.doAuthenticatedRequest(stitchReq)
                .then(function (response) {
                var obj = EJSON.parse(response.body, { strict: false });
                if (codec) {
                    return codec.decode(obj);
                }
                return obj;
            })
                .catch(function (err) {
                throw StitchErrorUtils_1.wrapDecodingError(err);
            });
        };
        CoreStitchAuth.prototype.refreshAccessToken = function () {
            var _this = this;
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder()
                .withRefreshToken()
                .withPath(this.authRoutes.sessionRoute)
                .withMethod(Method_1.default.POST);
            return this.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
                try {
                    var partialInfo = ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body));
                    _this.authInfo = _this.authInfo.merge(partialInfo);
                }
                catch (err) {
                    throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
                }
                try {
                    StoreAuthInfo_1.writeToStorage(_this.authInfo, _this.storage);
                }
                catch (err) {
                    throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
                }
            });
        };
        CoreStitchAuth.prototype.loginWithCredentialInternal = function (credential) {
            if (credential instanceof StitchAuthResponseCredential_1.default) {
                return this.processLogin(credential, credential.authInfo, credential.asLink);
            }
            if (!this.isLoggedIn) {
                return this.doLogin(credential, false);
            }
            if (credential.providerCapabilities.reusesExistingSession) {
                if (credential.providerType === this.currentUser.loggedInProviderType) {
                    return Promise.resolve(this.currentUser);
                }
            }
            this.logoutInternal();
            return this.doLogin(credential, false);
        };
        CoreStitchAuth.prototype.linkUserWithCredentialInternal = function (user, credential) {
            if (this.currentUser !== undefined && user.id !== this.currentUser.id) {
                return Promise.reject(new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNoLongerValid));
            }
            return this.doLogin(credential, true);
        };
        CoreStitchAuth.prototype.logoutInternal = function () {
            var _this = this;
            if (!this.isLoggedIn) {
                return Promise.resolve();
            }
            return this.doLogout()
                .then(function () {
                _this.clearAuth();
            })
                .catch(function () {
                _this.clearAuth();
            });
        };
        Object.defineProperty(CoreStitchAuth.prototype, "hasDeviceId", {
            get: function () {
                return (this.authInfo.deviceId !== undefined &&
                    this.authInfo.deviceId !== "" &&
                    this.authInfo.deviceId !== "000000000000000000000000");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreStitchAuth.prototype, "deviceId", {
            get: function () {
                if (!this.hasDeviceId) {
                    return undefined;
                }
                return this.authInfo.deviceId;
            },
            enumerable: true,
            configurable: true
        });
        CoreStitchAuth.prototype.prepareAuthRequest = function (stitchReq) {
            if (!this.isLoggedIn) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.MustAuthenticateFirst);
            }
            var newReq = stitchReq.builder;
            var newHeaders = newReq.headers || {};
            if (stitchReq.useRefreshToken) {
                newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(this.authInfo.refreshToken);
            }
            else {
                newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(this.authInfo.accessToken);
            }
            newReq.withHeaders(newHeaders);
            return newReq.build();
        };
        CoreStitchAuth.prototype.handleAuthFailure = function (ex, req) {
            var _this = this;
            if (!(ex instanceof StitchServiceError_1.default) ||
                ex.errorCode !== StitchServiceErrorCode_1.StitchServiceErrorCode.InvalidSession) {
                throw ex;
            }
            if (req.useRefreshToken || !req.shouldRefreshOnFailure) {
                this.clearAuth();
                throw ex;
            }
            return this.tryRefreshAccessToken(req.startedAt).then(function () {
                return _this.doAuthenticatedRequest(req.builder.withShouldRefreshOnFailure(false).build());
            });
        };
        CoreStitchAuth.prototype.tryRefreshAccessToken = function (reqStartedAt) {
            if (!this.isLoggedIn) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.LoggedOutDuringRequest);
            }
            try {
                var jwt = JWT_1.default.fromEncoded(this.authInfo.accessToken);
                if (jwt.issuedAt >= reqStartedAt) {
                    return Promise.resolve();
                }
            }
            catch (e) {
            }
            return this.refreshAccessToken();
        };
        CoreStitchAuth.prototype.prepUser = function () {
            if (this.authInfo.userId !== undefined) {
                this.currentUser = this.userFactory.makeUser(this.authInfo.userId, this.authInfo.loggedInProviderType, this.authInfo.loggedInProviderName, this.authInfo.userProfile);
            }
        };
        CoreStitchAuth.prototype.attachAuthOptions = function (authBody) {
            var options = {};
            options[DEVICE] = this.deviceInfo;
            authBody[OPTIONS] = options;
        };
        CoreStitchAuth.prototype.doLogin = function (credential, asLinkRequest) {
            var _this = this;
            return this.doLoginRequest(credential, asLinkRequest)
                .then(function (response) { return _this.processLoginResponse(credential, response, asLinkRequest); })
                .then(function (user) {
                _this.onAuthEvent();
                return user;
            });
        };
        CoreStitchAuth.prototype.doLoginRequest = function (credential, asLinkRequest) {
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder.withMethod(Method_1.default.POST);
            if (asLinkRequest) {
                reqBuilder.withPath(this.authRoutes.getAuthProviderLinkRoute(credential.providerName));
            }
            else {
                reqBuilder.withPath(this.authRoutes.getAuthProviderLoginRoute(credential.providerName));
            }
            var material = credential.material;
            this.attachAuthOptions(material);
            reqBuilder.withDocument(material);
            if (!asLinkRequest) {
                return this.requestClient.doRequest(reqBuilder.build());
            }
            var linkRequest = new StitchAuthDocRequest_1.StitchAuthDocRequest(reqBuilder.build(), reqBuilder.document);
            return this.doAuthenticatedRequest(linkRequest);
        };
        CoreStitchAuth.prototype.processLogin = function (credential, newAuthInfo, asLinkRequest) {
            var _this = this;
            var oldInfo = this.authInfo;
            var oldUser = this.currentUser;
            newAuthInfo = this.authInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, undefined));
            this.authInfo = newAuthInfo;
            this.currentUser = this.userFactory.makeUser(this.authInfo.userId, credential.providerType, credential.providerName, undefined);
            return this.doGetUserProfile()
                .then(function (profile) {
                newAuthInfo = newAuthInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, profile));
                try {
                    StoreAuthInfo_1.writeToStorage(newAuthInfo, _this.storage);
                }
                catch (err) {
                    throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
                }
                _this.authInfo = newAuthInfo;
                _this.currentUser = _this.userFactory.makeUser(_this.authInfo.userId, credential.providerType, credential.providerName, profile);
                return _this.currentUser;
            })
                .catch(function (err) {
                if (asLinkRequest) {
                    _this.authInfo = oldInfo;
                    _this.currentUser = oldUser;
                }
                else {
                    _this.clearAuth();
                }
                throw err;
            });
        };
        CoreStitchAuth.prototype.processLoginResponse = function (credential, response, asLinkRequest) {
            try {
                if (!response) {
                    throw new StitchServiceError_1.default("the login response could not be processed for credential: " + credential + ";" +
                        "response was undefined");
                }
                if (!response.body) {
                    throw new StitchServiceError_1.default("response with status code " + response.statusCode + " has empty body");
                }
                return this.processLogin(credential, ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body)), asLinkRequest);
            }
            catch (err) {
                throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
            }
        };
        CoreStitchAuth.prototype.doGetUserProfile = function () {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder.withMethod(Method_1.default.GET).withPath(this.authRoutes.profileRoute);
            return this.doAuthenticatedRequest(reqBuilder.build())
                .then(function (response) { return ApiCoreUserProfile_1.default.fromJSON(JSON.parse(response.body)); })
                .catch(function (err) {
                if (err instanceof StitchError_1.default) {
                    throw err;
                }
                else {
                    throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
                }
            });
        };
        CoreStitchAuth.prototype.doLogout = function () {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder
                .withRefreshToken()
                .withPath(this.authRoutes.sessionRoute)
                .withMethod(Method_1.default.DELETE);
            return this.doAuthenticatedRequest(reqBuilder.build()).then(function () {
                return;
            });
        };
        CoreStitchAuth.prototype.clearAuth = function () {
            if (!this.isLoggedIn) {
                return;
            }
            this.authInfo = this.authInfo.loggedOut();
            try {
                StoreAuthInfo_1.writeToStorage(this.authInfo, this.storage);
            }
            catch (e) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
            }
            this.currentUser = undefined;
            this.onAuthEvent();
        };
        CoreStitchAuth.prototype.close = function () {
            if (this.accessTokenRefresher) {
                this.accessTokenRefresher.stop();
            }
        };
        return CoreStitchAuth;
    }());
    exports.default = CoreStitchAuth;
});
//# sourceMappingURL=CoreStitchAuth.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/CoreStitchAuth.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"../../StitchClientError":31,"../../StitchClientErrorCode":32,"../../StitchError":33,"../../StitchRequestError":34,"../../StitchRequestErrorCode":35,"../../StitchServiceError":36,"../../StitchServiceErrorCode":37,"../../internal/common/StitchErrorUtils":77,"../../internal/net/Headers":82,"../../internal/net/Method":83,"../../internal/net/StitchAuthDocRequest":87,"../../internal/net/StitchAuthRequest":88,"../../internal/net/StitchDocRequest":89,"../providers/internal/StitchAuthResponseCredential":63,"./AccessTokenRefresher":41,"./AuthInfo":42,"./JWT":46,"./models/ApiAuthInfo":48,"./models/ApiCoreUserProfile":49,"./models/StoreAuthInfo":51,"b55mWE":6,"buffer":5,"mongodb-stitch-extjson":111}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchUserProfileImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserProfileImpl_1 = __importDefault(require("./StitchUserProfileImpl"));
    var CoreStitchUserImpl = (function () {
        function CoreStitchUserImpl(id, loggedInProviderType, loggedInProviderName, profile) {
            this.id = id;
            this.loggedInProviderType = loggedInProviderType;
            this.loggedInProviderName = loggedInProviderName;
            this.profile =
                profile === undefined ? StitchUserProfileImpl_1.default.empty() : profile;
        }
        Object.defineProperty(CoreStitchUserImpl.prototype, "userType", {
            get: function () {
                return this.profile.userType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreStitchUserImpl.prototype, "identities", {
            get: function () {
                return this.profile.identities;
            },
            enumerable: true,
            configurable: true
        });
        return CoreStitchUserImpl;
    }());
    exports.default = CoreStitchUserImpl;
});
//# sourceMappingURL=CoreStitchUserImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/CoreStitchUserImpl.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"./StitchUserProfileImpl":47,"b55mWE":6,"buffer":5}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeviceFields;
    (function (DeviceFields) {
        DeviceFields["DEVICE_ID"] = "deviceId";
        DeviceFields["APP_ID"] = "appId";
        DeviceFields["APP_VERSION"] = "appVersion";
        DeviceFields["PLATFORM"] = "platform";
        DeviceFields["PLATFORM_VERSION"] = "platformVersion";
        DeviceFields["SDK_VERSION"] = "sdkVersion";
    })(DeviceFields || (DeviceFields = {}));
    exports.default = DeviceFields;
});
//# sourceMappingURL=DeviceFields.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/DeviceFields.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"b55mWE":6,"buffer":5}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../internal/common/Base64"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Base64_1 = require("../../internal/common/Base64");
    var EXPIRES = "exp";
    var ISSUED_AT = "iat";
    var JWT = (function () {
        function JWT(expires, issuedAt) {
            this.expires = expires;
            this.issuedAt = issuedAt;
        }
        JWT.fromEncoded = function (encodedJWT) {
            var parts = JWT.splitToken(encodedJWT);
            var json = JSON.parse(Base64_1.base64Decode(parts[1]));
            var expires = json[EXPIRES];
            var iat = json[ISSUED_AT];
            return new JWT(expires, iat);
        };
        JWT.splitToken = function (jwt) {
            var parts = jwt.split(".");
            if (parts.length !== 3) {
                throw new Error("Malformed JWT token. The string " + jwt + " should have 3 parts.");
            }
            return parts;
        };
        return JWT;
    }());
    exports.default = JWT;
});
//# sourceMappingURL=JWT.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/JWT.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"../../internal/common/Base64":76,"b55mWE":6,"buffer":5}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NAME = "name";
    var EMAIL = "email";
    var PICTURE_Url = "picture";
    var FIRST_NAME = "first_name";
    var LAST_NAME = "last_name";
    var GENDER = "gender";
    var BIRTHDAY = "birthday";
    var MIN_AGE = "min_age";
    var MAX_AGE = "max_age";
    var StitchUserProfileImpl = (function () {
        function StitchUserProfileImpl(userType, data, identities) {
            if (data === void 0) { data = {}; }
            if (identities === void 0) { identities = []; }
            this.userType = userType;
            this.data = data;
            this.identities = identities;
        }
        StitchUserProfileImpl.empty = function () {
            return new StitchUserProfileImpl();
        };
        Object.defineProperty(StitchUserProfileImpl.prototype, "name", {
            get: function () {
                return this.data[NAME];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "email", {
            get: function () {
                return this.data[EMAIL];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "pictureUrl", {
            get: function () {
                return this.data[PICTURE_Url];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "firstName", {
            get: function () {
                return this.data[FIRST_NAME];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "lastName", {
            get: function () {
                return this.data[LAST_NAME];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "gender", {
            get: function () {
                return this.data[GENDER];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "birthday", {
            get: function () {
                return this.data[BIRTHDAY];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "minAge", {
            get: function () {
                var age = this.data[MIN_AGE];
                if (age === undefined) {
                    return undefined;
                }
                return +age;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StitchUserProfileImpl.prototype, "maxAge", {
            get: function () {
                var age = this.data[MAX_AGE];
                if (age === undefined) {
                    return undefined;
                }
                return +age;
            },
            enumerable: true,
            configurable: true
        });
        return StitchUserProfileImpl;
    }());
    exports.default = StitchUserProfileImpl;
});
//# sourceMappingURL=StitchUserProfileImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/StitchUserProfileImpl.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal")
},{"b55mWE":6,"buffer":5}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../AuthInfo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthInfo_1 = __importDefault(require("../AuthInfo"));
    var Fields;
    (function (Fields) {
        Fields["USER_ID"] = "user_id";
        Fields["DEVICE_ID"] = "device_id";
        Fields["ACCESS_TOKEN"] = "access_token";
        Fields["REFRESH_TOKEN"] = "refresh_token";
    })(Fields || (Fields = {}));
    var ApiAuthInfo = (function (_super) {
        __extends(ApiAuthInfo, _super);
        function ApiAuthInfo(userId, deviceId, accessToken, refreshToken) {
            return _super.call(this, userId, deviceId, accessToken, refreshToken) || this;
        }
        ApiAuthInfo.fromJSON = function (json) {
            return new ApiAuthInfo(json[Fields.USER_ID], json[Fields.DEVICE_ID], json[Fields.ACCESS_TOKEN], json[Fields.REFRESH_TOKEN]);
        };
        ApiAuthInfo.prototype.toJSON = function () {
            var _a;
            return _a = {},
                _a[Fields.USER_ID] = this.userId,
                _a[Fields.DEVICE_ID] = this.deviceId,
                _a[Fields.ACCESS_TOKEN] = this.accessToken,
                _a[Fields.REFRESH_TOKEN] = this.refreshToken,
                _a;
        };
        return ApiAuthInfo;
    }(AuthInfo_1.default));
    exports.default = ApiAuthInfo;
});
//# sourceMappingURL=ApiAuthInfo.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/ApiAuthInfo.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../AuthInfo":42,"b55mWE":6,"buffer":5}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../internal/common/Assertions", "../StitchUserProfileImpl", "./ApiStitchUserIdentity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Assertions_1 = __importDefault(require("../../../internal/common/Assertions"));
    var StitchUserProfileImpl_1 = __importDefault(require("../StitchUserProfileImpl"));
    var ApiStitchUserIdentity_1 = __importDefault(require("./ApiStitchUserIdentity"));
    var Fields;
    (function (Fields) {
        Fields["DATA"] = "data";
        Fields["USER_TYPE"] = "type";
        Fields["IDENTITIES"] = "identities";
    })(Fields || (Fields = {}));
    var ApiCoreUserProfile = (function (_super) {
        __extends(ApiCoreUserProfile, _super);
        function ApiCoreUserProfile(userType, data, identities) {
            return _super.call(this, userType, data, identities) || this;
        }
        ApiCoreUserProfile.fromJSON = function (json) {
            Assertions_1.default.keyPresent(Fields.USER_TYPE, json);
            Assertions_1.default.keyPresent(Fields.DATA, json);
            Assertions_1.default.keyPresent(Fields.IDENTITIES, json);
            return new ApiCoreUserProfile(json[Fields.USER_TYPE], json[Fields.DATA], json[Fields.IDENTITIES].map(ApiStitchUserIdentity_1.default.fromJSON));
        };
        ApiCoreUserProfile.prototype.toJSON = function () {
            var _a;
            return _a = {},
                _a[Fields.DATA] = this.data,
                _a[Fields.USER_TYPE] = this.userType,
                _a[Fields.IDENTITIES] = this.identities,
                _a;
        };
        return ApiCoreUserProfile;
    }(StitchUserProfileImpl_1.default));
    exports.default = ApiCoreUserProfile;
});
//# sourceMappingURL=ApiCoreUserProfile.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/ApiCoreUserProfile.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../../../internal/common/Assertions":75,"../StitchUserProfileImpl":47,"./ApiStitchUserIdentity":50,"b55mWE":6,"buffer":5}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../StitchUserIdentity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserIdentity_1 = __importDefault(require("../../StitchUserIdentity"));
    var Fields;
    (function (Fields) {
        Fields["ID"] = "id";
        Fields["PROVIDER_TYPE"] = "provider_type";
    })(Fields || (Fields = {}));
    var ApiStitchUserIdentity = (function (_super) {
        __extends(ApiStitchUserIdentity, _super);
        function ApiStitchUserIdentity(id, providerType) {
            return _super.call(this, id, providerType) || this;
        }
        ApiStitchUserIdentity.fromJSON = function (json) {
            return new ApiStitchUserIdentity(json[Fields.ID], json[Fields.PROVIDER_TYPE]);
        };
        ApiStitchUserIdentity.prototype.toJSON = function () {
            var _a;
            return _a = {},
                _a[Fields.ID] = this.id,
                _a[Fields.PROVIDER_TYPE] = this.providerType,
                _a;
        };
        return ApiStitchUserIdentity;
    }(StitchUserIdentity_1.default));
    exports.default = ApiStitchUserIdentity;
});
//# sourceMappingURL=ApiStitchUserIdentity.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/ApiStitchUserIdentity.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../../StitchUserIdentity":39,"b55mWE":6,"buffer":5}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../AuthInfo", "./StoreCoreUserProfile", "./StoreStitchUserIdentity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthInfo_1 = __importDefault(require("../AuthInfo"));
    var StoreCoreUserProfile_1 = __importDefault(require("./StoreCoreUserProfile"));
    var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));
    var Fields;
    (function (Fields) {
        Fields["USER_ID"] = "user_id";
        Fields["DEVICE_ID"] = "device_id";
        Fields["ACCESS_TOKEN"] = "access_token";
        Fields["REFRESH_TOKEN"] = "refresh_token";
        Fields["LOGGED_IN_PROVIDER_TYPE"] = "logged_in_provider_type";
        Fields["LOGGED_IN_PROVIDER_NAME"] = "logged_in_provider_name";
        Fields["USER_PROFILE"] = "user_profile";
    })(Fields || (Fields = {}));
    function readFromStorage(storage) {
        var rawInfo = storage.get(StoreAuthInfo.STORAGE_NAME);
        if (!rawInfo) {
            return undefined;
        }
        return StoreAuthInfo.decode(JSON.parse(rawInfo));
    }
    exports.readFromStorage = readFromStorage;
    function writeToStorage(authInfo, storage) {
        var info = new StoreAuthInfo(authInfo.userId, authInfo.deviceId, authInfo.accessToken, authInfo.refreshToken, authInfo.loggedInProviderType, authInfo.loggedInProviderName, authInfo.userProfile
            ? new StoreCoreUserProfile_1.default(authInfo.userProfile.userType, authInfo.userProfile.data, authInfo.userProfile.identities.map(function (identity) {
                return new StoreStitchUserIdentity_1.default(identity.id, identity.providerType);
            }))
            : undefined);
        storage.set(StoreAuthInfo.STORAGE_NAME, JSON.stringify(info.encode()));
    }
    exports.writeToStorage = writeToStorage;
    var StoreAuthInfo = (function (_super) {
        __extends(StoreAuthInfo, _super);
        function StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) {
            var _this = _super.call(this, userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) || this;
            _this.userProfile = userProfile;
            return _this;
        }
        StoreAuthInfo.decode = function (from) {
            var userId = from[Fields.USER_ID];
            var deviceId = from[Fields.DEVICE_ID];
            var accessToken = from[Fields.ACCESS_TOKEN];
            var refreshToken = from[Fields.REFRESH_TOKEN];
            var loggedInProviderType = from[Fields.LOGGED_IN_PROVIDER_TYPE];
            var loggedInProviderName = from[Fields.LOGGED_IN_PROVIDER_NAME];
            var userProfile = from[Fields.USER_PROFILE];
            return new StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, StoreCoreUserProfile_1.default.decode(userProfile));
        };
        StoreAuthInfo.prototype.encode = function () {
            var to = {};
            to[Fields.USER_ID] = this.userId;
            to[Fields.ACCESS_TOKEN] = this.accessToken;
            to[Fields.REFRESH_TOKEN] = this.refreshToken;
            to[Fields.DEVICE_ID] = this.deviceId;
            to[Fields.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName;
            to[Fields.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType;
            to[Fields.USER_PROFILE] = this.userProfile
                ? this.userProfile.encode()
                : undefined;
            return to;
        };
        StoreAuthInfo.STORAGE_NAME = "auth_info";
        return StoreAuthInfo;
    }(AuthInfo_1.default));
    exports.StoreAuthInfo = StoreAuthInfo;
});
//# sourceMappingURL=StoreAuthInfo.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/StoreAuthInfo.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../AuthInfo":42,"./StoreCoreUserProfile":52,"./StoreStitchUserIdentity":53,"b55mWE":6,"buffer":5}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../StitchUserProfileImpl", "./StoreStitchUserIdentity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserProfileImpl_1 = __importDefault(require("../StitchUserProfileImpl"));
    var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));
    var Fields;
    (function (Fields) {
        Fields["DATA"] = "data";
        Fields["USER_TYPE"] = "type";
        Fields["IDENTITIES"] = "identities";
    })(Fields || (Fields = {}));
    var StoreCoreUserProfile = (function (_super) {
        __extends(StoreCoreUserProfile, _super);
        function StoreCoreUserProfile(userType, data, identities) {
            var _this = _super.call(this, userType, data, identities) || this;
            _this.userType = userType;
            _this.data = data;
            _this.identities = identities;
            return _this;
        }
        StoreCoreUserProfile.decode = function (from) {
            return from
                ? new StoreCoreUserProfile(from[Fields.USER_TYPE], from[Fields.DATA], from[Fields.IDENTITIES].map(function (identity) {
                    return StoreStitchUserIdentity_1.default.decode(identity);
                }))
                : undefined;
        };
        StoreCoreUserProfile.prototype.encode = function () {
            var _a;
            return _a = {},
                _a[Fields.DATA] = this.data,
                _a[Fields.USER_TYPE] = this.userType,
                _a[Fields.IDENTITIES] = this.identities.map(function (identity) { return identity.encode(); }),
                _a;
        };
        return StoreCoreUserProfile;
    }(StitchUserProfileImpl_1.default));
    exports.default = StoreCoreUserProfile;
});
//# sourceMappingURL=StoreCoreUserProfile.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/StoreCoreUserProfile.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../StitchUserProfileImpl":47,"./StoreStitchUserIdentity":53,"b55mWE":6,"buffer":5}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../StitchUserIdentity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchUserIdentity_1 = __importDefault(require("../../StitchUserIdentity"));
    var Fields;
    (function (Fields) {
        Fields["ID"] = "id";
        Fields["PROVIDER_TYPE"] = "provider_type";
    })(Fields || (Fields = {}));
    var StoreStitchUserIdentity = (function (_super) {
        __extends(StoreStitchUserIdentity, _super);
        function StoreStitchUserIdentity(id, providerType) {
            return _super.call(this, id, providerType) || this;
        }
        StoreStitchUserIdentity.decode = function (from) {
            return new StoreStitchUserIdentity(from[Fields.ID], from[Fields.PROVIDER_TYPE]);
        };
        StoreStitchUserIdentity.prototype.encode = function () {
            var _a;
            return _a = {},
                _a[Fields.ID] = this.id,
                _a[Fields.PROVIDER_TYPE] = this.providerType,
                _a;
        };
        return StoreStitchUserIdentity;
    }(StitchUserIdentity_1.default));
    exports.default = StoreStitchUserIdentity;
});
//# sourceMappingURL=StoreStitchUserIdentity.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models/StoreStitchUserIdentity.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/internal/models")
},{"../../StitchUserIdentity":39,"b55mWE":6,"buffer":5}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnonymousAuthProvider = (function () {
        function AnonymousAuthProvider() {
        }
        AnonymousAuthProvider.TYPE = "anon-user";
        AnonymousAuthProvider.DEFAULT_NAME = "anon-user";
        return AnonymousAuthProvider;
    }());
    exports.default = AnonymousAuthProvider;
});
//# sourceMappingURL=AnonymousAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/anonymous/AnonymousAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/anonymous")
},{"b55mWE":6,"buffer":5}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./AnonymousAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var AnonymousAuthProvider_1 = __importDefault(require("./AnonymousAuthProvider"));
    var AnonymousCredential = (function () {
        function AnonymousCredential(providerName) {
            if (providerName === void 0) { providerName = AnonymousAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = AnonymousAuthProvider_1.default.TYPE;
            this.material = {};
            this.providerCapabilities = new ProviderCapabilities_1.default(true);
            this.providerName = providerName;
        }
        return AnonymousCredential;
    }());
    exports.default = AnonymousCredential;
});
//# sourceMappingURL=AnonymousCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/anonymous/AnonymousCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/anonymous")
},{"../../ProviderCapabilities":38,"./AnonymousAuthProvider":54,"b55mWE":6,"buffer":5}],56:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomAuthProvider = (function () {
        function CustomAuthProvider() {
        }
        CustomAuthProvider.TYPE = "custom-token";
        CustomAuthProvider.DEFAULT_NAME = "custom-token";
        return CustomAuthProvider;
    }());
    exports.default = CustomAuthProvider;
});
//# sourceMappingURL=CustomAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/custom/CustomAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/custom")
},{"b55mWE":6,"buffer":5}],57:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./CustomAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var CustomAuthProvider_1 = __importDefault(require("./CustomAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["TOKEN"] = "token";
    })(Fields || (Fields = {}));
    var CustomCredential = (function () {
        function CustomCredential(token, providerName) {
            var _a;
            if (providerName === void 0) { providerName = CustomAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = CustomAuthProvider_1.default.TYPE;
            this.providerCapabilities = new ProviderCapabilities_1.default(false);
            this.providerName = providerName;
            this.token = token;
            this.material = (_a = {}, _a[Fields.TOKEN] = this.token, _a);
        }
        return CustomCredential;
    }());
    exports.default = CustomCredential;
});
//# sourceMappingURL=CustomCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/custom/CustomCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/custom")
},{"../../ProviderCapabilities":38,"./CustomAuthProvider":56,"b55mWE":6,"buffer":5}],58:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FacebookAuthProvider = (function () {
        function FacebookAuthProvider() {
        }
        FacebookAuthProvider.TYPE = "oauth2-facebook";
        FacebookAuthProvider.DEFAULT_NAME = "oauth2-facebook";
        return FacebookAuthProvider;
    }());
    exports.default = FacebookAuthProvider;
});
//# sourceMappingURL=FacebookAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/facebook/FacebookAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/facebook")
},{"b55mWE":6,"buffer":5}],59:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./FacebookAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var FacebookAuthProvider_1 = __importDefault(require("./FacebookAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["ACCESS_TOKEN"] = "accessToken";
    })(Fields || (Fields = {}));
    var FacebookCredential = (function () {
        function FacebookCredential(accessToken, providerName) {
            var _a;
            if (providerName === void 0) { providerName = FacebookAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = FacebookAuthProvider_1.default.TYPE;
            this.providerName = providerName;
            this.accessToken = accessToken;
            this.material = (_a = {}, _a[Fields.ACCESS_TOKEN] = this.accessToken, _a);
        }
        Object.defineProperty(FacebookCredential.prototype, "providerCapabilities", {
            get: function () {
                return new ProviderCapabilities_1.default(false);
            },
            enumerable: true,
            configurable: true
        });
        return FacebookCredential;
    }());
    exports.default = FacebookCredential;
});
//# sourceMappingURL=FacebookCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/facebook/FacebookCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/facebook")
},{"../../ProviderCapabilities":38,"./FacebookAuthProvider":58,"b55mWE":6,"buffer":5}],60:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GoogleAuthProvider = (function () {
        function GoogleAuthProvider() {
        }
        GoogleAuthProvider.TYPE = "oauth2-google";
        GoogleAuthProvider.DEFAULT_NAME = "oauth2-google";
        return GoogleAuthProvider;
    }());
    exports.default = GoogleAuthProvider;
});
//# sourceMappingURL=GoogleAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/google/GoogleAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/google")
},{"b55mWE":6,"buffer":5}],61:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./GoogleAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var GoogleAuthProvider_1 = __importDefault(require("./GoogleAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["AUTH_CODE"] = "authCode";
    })(Fields || (Fields = {}));
    var GoogleCredential = (function () {
        function GoogleCredential(authCode, providerName) {
            var _a;
            if (providerName === void 0) { providerName = GoogleAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = GoogleAuthProvider_1.default.TYPE;
            this.providerCapabilities = new ProviderCapabilities_1.default(false);
            this.providerName = providerName;
            this.authCode = authCode;
            this.material = (_a = {}, _a[Fields.AUTH_CODE] = this.authCode, _a);
        }
        return GoogleCredential;
    }());
    exports.default = GoogleCredential;
});
//# sourceMappingURL=GoogleCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/google/GoogleCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/google")
},{"../../ProviderCapabilities":38,"./GoogleAuthProvider":60,"b55mWE":6,"buffer":5}],62:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreAuthProviderClient = (function () {
        function CoreAuthProviderClient(providerName, requestClient, baseRoute) {
            this.providerName = providerName;
            this.requestClient = requestClient;
            this.baseRoute = baseRoute;
        }
        return CoreAuthProviderClient;
    }());
    exports.default = CoreAuthProviderClient;
});
//# sourceMappingURL=CoreAuthProviderClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/internal/CoreAuthProviderClient.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/internal")
},{"b55mWE":6,"buffer":5}],63:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchAuthResponseCredential = (function () {
        function StitchAuthResponseCredential(authInfo, providerType, providerName, asLink) {
            this.authInfo = authInfo;
            this.providerType = providerType;
            this.providerName = providerName;
            this.asLink = asLink;
        }
        return StitchAuthResponseCredential;
    }());
    exports.default = StitchAuthResponseCredential;
});
//# sourceMappingURL=StitchAuthResponseCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/internal/StitchAuthResponseCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/internal")
},{"b55mWE":6,"buffer":5}],64:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServerApiKeyAuthProvider = (function () {
        function ServerApiKeyAuthProvider() {
        }
        ServerApiKeyAuthProvider.TYPE = "api-key";
        ServerApiKeyAuthProvider.DEFAULT_NAME = "api-key";
        return ServerApiKeyAuthProvider;
    }());
    exports.default = ServerApiKeyAuthProvider;
});
//# sourceMappingURL=ServerApiKeyAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/serverapikey/ServerApiKeyAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/serverapikey")
},{"b55mWE":6,"buffer":5}],65:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./ServerApiKeyAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var ServerApiKeyAuthProvider_1 = __importDefault(require("./ServerApiKeyAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["KEY"] = "key";
    })(Fields || (Fields = {}));
    var ServerApiKeyCredential = (function () {
        function ServerApiKeyCredential(key, providerName) {
            var _a;
            if (providerName === void 0) { providerName = ServerApiKeyAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = ServerApiKeyAuthProvider_1.default.TYPE;
            this.providerCapabilities = new ProviderCapabilities_1.default(false);
            this.providerName = providerName;
            this.key = key;
            this.material = (_a = {}, _a[Fields.KEY] = this.key, _a);
        }
        return ServerApiKeyCredential;
    }());
    exports.default = ServerApiKeyCredential;
});
//# sourceMappingURL=ServerApiKeyCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/serverapikey/ServerApiKeyCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/serverapikey")
},{"../../ProviderCapabilities":38,"./ServerApiKeyAuthProvider":64,"b55mWE":6,"buffer":5}],66:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../internal/net/Method", "../../../internal/net/StitchAuthDocRequest", "../../../internal/net/StitchAuthRequest", "../../../internal/common/StitchErrorUtils", "../../../StitchRequestErrorCode", "../../../StitchRequestError", "../internal/CoreAuthProviderClient", "./models/UserApiKey", "./UserApiKeyAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Method_1 = __importDefault(require("../../../internal/net/Method"));
    var StitchAuthDocRequest_1 = require("../../../internal/net/StitchAuthDocRequest");
    var StitchAuthRequest_1 = require("../../../internal/net/StitchAuthRequest");
    var StitchErrorUtils_1 = require("../../../internal/common/StitchErrorUtils");
    var StitchRequestErrorCode_1 = require("../../../StitchRequestErrorCode");
    var StitchRequestError_1 = __importDefault(require("../../../StitchRequestError"));
    var CoreAuthProviderClient_1 = __importDefault(require("../internal/CoreAuthProviderClient"));
    var UserApiKey_1 = __importDefault(require("./models/UserApiKey"));
    var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));
    var ApiKeyFields;
    (function (ApiKeyFields) {
        ApiKeyFields["NAME"] = "name";
    })(ApiKeyFields || (ApiKeyFields = {}));
    var CoreUserApiKeyAuthProviderClient = (function (_super) {
        __extends(CoreUserApiKeyAuthProviderClient, _super);
        function CoreUserApiKeyAuthProviderClient(requestClient, authRoutes) {
            var _this = this;
            var baseRoute = authRoutes.baseAuthRoute + "/api_keys";
            var name = UserApiKeyAuthProvider_1.default.DEFAULT_NAME;
            _this = _super.call(this, name, requestClient, baseRoute) || this;
            return _this;
        }
        CoreUserApiKeyAuthProviderClient.prototype.createApiKey = function (name) {
            var _a;
            var reqBuilder = new StitchAuthDocRequest_1.StitchAuthDocRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.POST)
                .withPath(this.baseRoute)
                .withDocument((_a = {},
                _a[ApiKeyFields.NAME] = name,
                _a))
                .withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function (response) {
                return UserApiKey_1.default.readFromApi(response.body);
            })
                .catch(function (err) {
                throw StitchErrorUtils_1.wrapDecodingError(err);
            });
        };
        CoreUserApiKeyAuthProviderClient.prototype.fetchApiKey = function (keyId) {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.GET)
                .withPath(this.getApiKeyRoute(keyId.toHexString()));
            reqBuilder.withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function (response) {
                return UserApiKey_1.default.readFromApi(response.body);
            })
                .catch(function (err) {
                throw StitchErrorUtils_1.wrapDecodingError(err);
            });
        };
        CoreUserApiKeyAuthProviderClient.prototype.fetchApiKeys = function () {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder.withMethod(Method_1.default.GET).withPath(this.baseRoute);
            reqBuilder.withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function (response) {
                var json = JSON.parse(response.body);
                if (Array.isArray(json)) {
                    return json.map(function (value) { return UserApiKey_1.default.readFromApi(value); });
                }
                throw new StitchRequestError_1.default(new Error("unexpected non-array response from server"), StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
            })
                .catch(function (err) {
                throw StitchErrorUtils_1.wrapDecodingError(err);
            });
        };
        CoreUserApiKeyAuthProviderClient.prototype.deleteApiKey = function (keyId) {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.DELETE)
                .withPath(this.getApiKeyRoute(keyId.toHexString()));
            reqBuilder.withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function () { });
        };
        CoreUserApiKeyAuthProviderClient.prototype.enableApiKey = function (keyId) {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.PUT)
                .withPath(this.getApiKeyEnableRoute(keyId.toHexString()));
            reqBuilder.withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function () { });
        };
        CoreUserApiKeyAuthProviderClient.prototype.disableApiKey = function (keyId) {
            var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.PUT)
                .withPath(this.getApiKeyDisableRoute(keyId.toHexString()));
            reqBuilder.withRefreshToken();
            return this.requestClient
                .doAuthenticatedRequest(reqBuilder.build())
                .then(function () { });
        };
        CoreUserApiKeyAuthProviderClient.prototype.getApiKeyRoute = function (keyId) {
            return this.baseRoute + "/" + keyId;
        };
        CoreUserApiKeyAuthProviderClient.prototype.getApiKeyEnableRoute = function (keyId) {
            return this.getApiKeyRoute(keyId) + "/enable";
        };
        CoreUserApiKeyAuthProviderClient.prototype.getApiKeyDisableRoute = function (keyId) {
            return this.getApiKeyRoute(keyId) + "/disable";
        };
        return CoreUserApiKeyAuthProviderClient;
    }(CoreAuthProviderClient_1.default));
    exports.default = CoreUserApiKeyAuthProviderClient;
});
//# sourceMappingURL=CoreUserApiKeyAuthProviderClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey/CoreUserApiKeyAuthProviderClient.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey")
},{"../../../StitchRequestError":34,"../../../StitchRequestErrorCode":35,"../../../internal/common/StitchErrorUtils":77,"../../../internal/net/Method":83,"../../../internal/net/StitchAuthDocRequest":87,"../../../internal/net/StitchAuthRequest":88,"../internal/CoreAuthProviderClient":62,"./UserApiKeyAuthProvider":67,"./models/UserApiKey":69,"b55mWE":6,"buffer":5}],67:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserApiKeyAuthProvider = (function () {
        function UserApiKeyAuthProvider() {
        }
        UserApiKeyAuthProvider.TYPE = "api-key";
        UserApiKeyAuthProvider.DEFAULT_NAME = "api-key";
        return UserApiKeyAuthProvider;
    }());
    exports.default = UserApiKeyAuthProvider;
});
//# sourceMappingURL=UserApiKeyAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey/UserApiKeyAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey")
},{"b55mWE":6,"buffer":5}],68:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./UserApiKeyAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["KEY"] = "key";
    })(Fields || (Fields = {}));
    var UserApiKeyCredential = (function () {
        function UserApiKeyCredential(key, providerName) {
            var _a;
            if (providerName === void 0) { providerName = UserApiKeyAuthProvider_1.default.DEFAULT_NAME; }
            this.providerType = UserApiKeyAuthProvider_1.default.TYPE;
            this.providerCapabilities = new ProviderCapabilities_1.default(false);
            this.providerName = providerName;
            this.key = key;
            this.material = (_a = {},
                _a[Fields.KEY] = this.key,
                _a);
        }
        return UserApiKeyCredential;
    }());
    exports.default = UserApiKeyCredential;
});
//# sourceMappingURL=UserApiKeyCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey/UserApiKeyCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey")
},{"../../ProviderCapabilities":38,"./UserApiKeyAuthProvider":67,"b55mWE":6,"buffer":5}],69:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-bson", "../../../../internal/common/Assertions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_bson_1 = __importDefault(require("mongodb-stitch-bson"));
    var Assertions_1 = __importDefault(require("../../../../internal/common/Assertions"));
    var Fields;
    (function (Fields) {
        Fields["ID"] = "_id";
        Fields["KEY"] = "key";
        Fields["NAME"] = "name";
        Fields["DISABLED"] = "disabled";
    })(Fields || (Fields = {}));
    var UserApiKey = (function () {
        function UserApiKey(id, key, name, disabled) {
            this.id = mongodb_stitch_bson_1.default.ObjectID.createFromHexString(id);
            this.key = key;
            this.name = name;
            this.disabled = disabled;
        }
        UserApiKey.readFromApi = function (json) {
            var body = typeof json === "string" ? JSON.parse(json) : json;
            Assertions_1.default.keyPresent(Fields.ID, body);
            Assertions_1.default.keyPresent(Fields.NAME, body);
            Assertions_1.default.keyPresent(Fields.DISABLED, body);
            return new UserApiKey(body[Fields.ID], body[Fields.KEY], body[Fields.NAME], body[Fields.DISABLED]);
        };
        UserApiKey.prototype.toJSON = function () {
            var _a;
            return _a = {},
                _a[Fields.ID] = this.id,
                _a[Fields.KEY] = this.key,
                _a[Fields.NAME] = this.name,
                _a[Fields.DISABLED] = this.disabled,
                _a;
        };
        return UserApiKey;
    }());
    exports.default = UserApiKey;
});
//# sourceMappingURL=UserApiKey.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey/models/UserApiKey.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userapikey/models")
},{"../../../../internal/common/Assertions":75,"b55mWE":6,"buffer":5,"mongodb-stitch-bson":103}],70:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../internal/net/Method", "../../../internal/net/StitchDocRequest", "../internal/CoreAuthProviderClient", "./UserPasswordAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Method_1 = __importDefault(require("../../../internal/net/Method"));
    var StitchDocRequest_1 = require("../../../internal/net/StitchDocRequest");
    var CoreAuthProviderClient_1 = __importDefault(require("../internal/CoreAuthProviderClient"));
    var UserPasswordAuthProvider_1 = __importDefault(require("./UserPasswordAuthProvider"));
    var RegistrationFields;
    (function (RegistrationFields) {
        RegistrationFields["EMAIL"] = "email";
        RegistrationFields["PASSWORD"] = "password";
    })(RegistrationFields || (RegistrationFields = {}));
    var ActionFields;
    (function (ActionFields) {
        ActionFields["EMAIL"] = "email";
        ActionFields["PASSWORD"] = "password";
        ActionFields["TOKEN"] = "token";
        ActionFields["TOKEN_ID"] = "tokenId";
    })(ActionFields || (ActionFields = {}));
    var CoreUserPasswordAuthProviderClient = (function (_super) {
        __extends(CoreUserPasswordAuthProviderClient, _super);
        function CoreUserPasswordAuthProviderClient(providerName, requestClient, authRoutes) {
            if (providerName === void 0) { providerName = UserPasswordAuthProvider_1.default.DEFAULT_NAME; }
            var _this = this;
            var baseRoute = authRoutes.getAuthProviderRoute(providerName);
            _this = _super.call(this, providerName, requestClient, baseRoute) || this;
            return _this;
        }
        CoreUserPasswordAuthProviderClient.prototype.registerWithEmailInternal = function (email, password) {
            var _a;
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.POST)
                .withPath(this.getRegisterWithEmailRoute());
            reqBuilder.withDocument((_a = {},
                _a[RegistrationFields.EMAIL] = email,
                _a[RegistrationFields.PASSWORD] = password,
                _a));
            return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
        };
        CoreUserPasswordAuthProviderClient.prototype.confirmUserInternal = function (token, tokenId) {
            var _a;
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder.withMethod(Method_1.default.POST).withPath(this.getConfirmUserRoute());
            reqBuilder.withDocument((_a = {},
                _a[ActionFields.TOKEN] = token,
                _a[ActionFields.TOKEN_ID] = tokenId,
                _a));
            return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
        };
        CoreUserPasswordAuthProviderClient.prototype.resendConfirmationEmailInternal = function (email) {
            var _a;
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.POST)
                .withPath(this.getResendConfirmationEmailRoute());
            reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
            return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
        };
        CoreUserPasswordAuthProviderClient.prototype.resetPasswordInternal = function (token, tokenId, password) {
            var _a;
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder.withMethod(Method_1.default.POST).withPath(this.getResetPasswordRoute());
            reqBuilder.withDocument((_a = {},
                _a[ActionFields.TOKEN] = token,
                _a[ActionFields.TOKEN_ID] = tokenId,
                _a[ActionFields.PASSWORD] = password,
                _a));
            return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
        };
        CoreUserPasswordAuthProviderClient.prototype.sendResetPasswordEmailInternal = function (email) {
            var _a;
            var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.POST)
                .withPath(this.getSendResetPasswordEmailRoute());
            reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
            return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
        };
        CoreUserPasswordAuthProviderClient.prototype.getRegisterWithEmailRoute = function () {
            return this.getExtensionRoute("register");
        };
        CoreUserPasswordAuthProviderClient.prototype.getConfirmUserRoute = function () {
            return this.getExtensionRoute("confirm");
        };
        CoreUserPasswordAuthProviderClient.prototype.getResendConfirmationEmailRoute = function () {
            return this.getExtensionRoute("confirm/send");
        };
        CoreUserPasswordAuthProviderClient.prototype.getResetPasswordRoute = function () {
            return this.getExtensionRoute("reset");
        };
        CoreUserPasswordAuthProviderClient.prototype.getSendResetPasswordEmailRoute = function () {
            return this.getExtensionRoute("reset/send");
        };
        CoreUserPasswordAuthProviderClient.prototype.getExtensionRoute = function (path) {
            return this.baseRoute + "/" + path;
        };
        return CoreUserPasswordAuthProviderClient;
    }(CoreAuthProviderClient_1.default));
    exports.default = CoreUserPasswordAuthProviderClient;
});
//# sourceMappingURL=CoreUserPasswordAuthProviderClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass/CoreUserPasswordAuthProviderClient.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass")
},{"../../../internal/net/Method":83,"../../../internal/net/StitchDocRequest":89,"../internal/CoreAuthProviderClient":62,"./UserPasswordAuthProvider":71,"b55mWE":6,"buffer":5}],71:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserPasswordAuthProvider = (function () {
        function UserPasswordAuthProvider() {
        }
        UserPasswordAuthProvider.TYPE = "local-userpass";
        UserPasswordAuthProvider.DEFAULT_NAME = "local-userpass";
        return UserPasswordAuthProvider;
    }());
    exports.default = UserPasswordAuthProvider;
});
//# sourceMappingURL=UserPasswordAuthProvider.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass/UserPasswordAuthProvider.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass")
},{"b55mWE":6,"buffer":5}],72:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ProviderCapabilities", "./UserPasswordAuthProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
    var UserPasswordAuthProvider_1 = __importDefault(require("./UserPasswordAuthProvider"));
    var Fields;
    (function (Fields) {
        Fields["USERNAME"] = "username";
        Fields["PASSWORD"] = "password";
    })(Fields || (Fields = {}));
    var UserPasswordCredential = (function () {
        function UserPasswordCredential(username, password, providerName) {
            var _a;
            if (providerName === void 0) { providerName = UserPasswordAuthProvider_1.default.DEFAULT_NAME; }
            this.username = username;
            this.password = password;
            this.providerName = providerName;
            this.providerType = UserPasswordAuthProvider_1.default.TYPE;
            this.providerCapabilities = new ProviderCapabilities_1.default(false);
            this.material = (_a = {},
                _a[Fields.USERNAME] = this.username,
                _a[Fields.PASSWORD] = this.password,
                _a);
        }
        return UserPasswordCredential;
    }());
    exports.default = UserPasswordCredential;
});
//# sourceMappingURL=UserPasswordCredential.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass/UserPasswordCredential.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/auth/providers/userpass")
},{"../../ProviderCapabilities":38,"./UserPasswordAuthProvider":71,"b55mWE":6,"buffer":5}],73:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./auth/internal/AuthInfo", "./auth/internal/CoreStitchAuth", "./auth/internal/CoreStitchUserImpl", "./auth/internal/DeviceFields", "./auth/internal/models/ApiStitchUserIdentity", "./auth/internal/StitchUserProfileImpl", "./auth/providers/anonymous/AnonymousAuthProvider", "./auth/providers/anonymous/AnonymousCredential", "./auth/providers/custom/CustomAuthProvider", "./auth/providers/custom/CustomCredential", "./auth/providers/facebook/FacebookAuthProvider", "./auth/providers/facebook/FacebookCredential", "./auth/providers/google/GoogleAuthProvider", "./auth/providers/google/GoogleCredential", "./auth/providers/internal/StitchAuthResponseCredential", "./auth/providers/internal/StitchAuthResponseCredential", "./auth/providers/serverapikey/ServerApiKeyAuthProvider", "./auth/providers/serverapikey/ServerApiKeyCredential", "./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient", "./auth/providers/userapikey/models/UserApiKey", "./auth/providers/userapikey/UserApiKeyAuthProvider", "./auth/providers/userapikey/UserApiKeyCredential", "./auth/providers/userpass/CoreUserPasswordAuthProviderClient", "./auth/providers/userpass/UserPasswordAuthProvider", "./auth/providers/userpass/UserPasswordCredential", "./auth/StitchUserIdentity", "./auth/UserType", "./internal/common/Base64", "./internal/common/Storage", "./internal/CoreStitchAppClient", "./internal/net/FetchTransport", "./internal/net/Method", "./internal/net/Response", "./internal/net/StitchAppAuthRoutes", "./internal/net/StitchAppRoutes", "./internal/net/StitchAuthRequest", "./internal/net/StitchRequestClient", "./services/internal/CoreStitchServiceClientImpl", "./services/internal/StitchServiceRoutes", "./StitchAppClientConfiguration", "./StitchAppClientInfo", "./StitchClientError", "./StitchClientErrorCode", "./StitchError", "./StitchRequestError", "./StitchRequestErrorCode", "./StitchServiceError", "./StitchServiceErrorCode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthInfo_1 = __importDefault(require("./auth/internal/AuthInfo"));
    exports.AuthInfo = AuthInfo_1.default;
    var CoreStitchAuth_1 = __importDefault(require("./auth/internal/CoreStitchAuth"));
    exports.CoreStitchAuth = CoreStitchAuth_1.default;
    var CoreStitchUserImpl_1 = __importDefault(require("./auth/internal/CoreStitchUserImpl"));
    exports.CoreStitchUserImpl = CoreStitchUserImpl_1.default;
    var DeviceFields_1 = __importDefault(require("./auth/internal/DeviceFields"));
    exports.DeviceFields = DeviceFields_1.default;
    var ApiStitchUserIdentity_1 = __importDefault(require("./auth/internal/models/ApiStitchUserIdentity"));
    exports.ApiStitchUserIdentity = ApiStitchUserIdentity_1.default;
    var StitchUserProfileImpl_1 = __importDefault(require("./auth/internal/StitchUserProfileImpl"));
    exports.StitchUserProfileImpl = StitchUserProfileImpl_1.default;
    var AnonymousAuthProvider_1 = __importDefault(require("./auth/providers/anonymous/AnonymousAuthProvider"));
    exports.AnonymousAuthProvider = AnonymousAuthProvider_1.default;
    var AnonymousCredential_1 = __importDefault(require("./auth/providers/anonymous/AnonymousCredential"));
    exports.AnonymousCredential = AnonymousCredential_1.default;
    var CustomAuthProvider_1 = __importDefault(require("./auth/providers/custom/CustomAuthProvider"));
    exports.CustomAuthProvider = CustomAuthProvider_1.default;
    var CustomCredential_1 = __importDefault(require("./auth/providers/custom/CustomCredential"));
    exports.CustomCredential = CustomCredential_1.default;
    var FacebookAuthProvider_1 = __importDefault(require("./auth/providers/facebook/FacebookAuthProvider"));
    exports.FacebookAuthProvider = FacebookAuthProvider_1.default;
    var FacebookCredential_1 = __importDefault(require("./auth/providers/facebook/FacebookCredential"));
    exports.FacebookCredential = FacebookCredential_1.default;
    var GoogleAuthProvider_1 = __importDefault(require("./auth/providers/google/GoogleAuthProvider"));
    exports.GoogleAuthProvider = GoogleAuthProvider_1.default;
    var GoogleCredential_1 = __importDefault(require("./auth/providers/google/GoogleCredential"));
    exports.GoogleCredential = GoogleCredential_1.default;
    var StitchAuthResponseCredential_1 = __importDefault(require("./auth/providers/internal/StitchAuthResponseCredential"));
    exports.StitchAuthCredential = StitchAuthResponseCredential_1.default;
    var StitchAuthResponseCredential_2 = __importDefault(require("./auth/providers/internal/StitchAuthResponseCredential"));
    exports.StitchAuthResponseCredential = StitchAuthResponseCredential_2.default;
    var ServerApiKeyAuthProvider_1 = __importDefault(require("./auth/providers/serverapikey/ServerApiKeyAuthProvider"));
    exports.ServerApiKeyAuthProvider = ServerApiKeyAuthProvider_1.default;
    var ServerApiKeyCredential_1 = __importDefault(require("./auth/providers/serverapikey/ServerApiKeyCredential"));
    exports.ServerApiKeyCredential = ServerApiKeyCredential_1.default;
    var CoreUserApiKeyAuthProviderClient_1 = __importDefault(require("./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient"));
    exports.CoreUserApiKeyAuthProviderClient = CoreUserApiKeyAuthProviderClient_1.default;
    var UserApiKey_1 = __importDefault(require("./auth/providers/userapikey/models/UserApiKey"));
    exports.UserApiKey = UserApiKey_1.default;
    var UserApiKeyAuthProvider_1 = __importDefault(require("./auth/providers/userapikey/UserApiKeyAuthProvider"));
    exports.UserApiKeyAuthProvider = UserApiKeyAuthProvider_1.default;
    var UserApiKeyCredential_1 = __importDefault(require("./auth/providers/userapikey/UserApiKeyCredential"));
    exports.UserApiKeyCredential = UserApiKeyCredential_1.default;
    var CoreUserPasswordAuthProviderClient_1 = __importDefault(require("./auth/providers/userpass/CoreUserPasswordAuthProviderClient"));
    exports.CoreUserPassAuthProviderClient = CoreUserPasswordAuthProviderClient_1.default;
    var UserPasswordAuthProvider_1 = __importDefault(require("./auth/providers/userpass/UserPasswordAuthProvider"));
    exports.UserPasswordAuthProvider = UserPasswordAuthProvider_1.default;
    var UserPasswordCredential_1 = __importDefault(require("./auth/providers/userpass/UserPasswordCredential"));
    exports.UserPasswordCredential = UserPasswordCredential_1.default;
    var StitchUserIdentity_1 = __importDefault(require("./auth/StitchUserIdentity"));
    exports.StitchUserIdentity = StitchUserIdentity_1.default;
    var UserType_1 = __importDefault(require("./auth/UserType"));
    exports.UserType = UserType_1.default;
    var Base64_1 = require("./internal/common/Base64");
    exports.base64Decode = Base64_1.base64Decode;
    exports.base64Encode = Base64_1.base64Encode;
    var Storage_1 = require("./internal/common/Storage");
    exports.MemoryStorage = Storage_1.MemoryStorage;
    var CoreStitchAppClient_1 = __importDefault(require("./internal/CoreStitchAppClient"));
    exports.CoreStitchAppClient = CoreStitchAppClient_1.default;
    var FetchTransport_1 = __importDefault(require("./internal/net/FetchTransport"));
    exports.FetchTransport = FetchTransport_1.default;
    var Method_1 = __importDefault(require("./internal/net/Method"));
    exports.Method = Method_1.default;
    var Response_1 = __importDefault(require("./internal/net/Response"));
    exports.Response = Response_1.default;
    var StitchAppAuthRoutes_1 = __importDefault(require("./internal/net/StitchAppAuthRoutes"));
    exports.StitchAppAuthRoutes = StitchAppAuthRoutes_1.default;
    var StitchAppRoutes_1 = __importDefault(require("./internal/net/StitchAppRoutes"));
    exports.StitchAppRoutes = StitchAppRoutes_1.default;
    var StitchAuthRequest_1 = require("./internal/net/StitchAuthRequest");
    exports.StitchAuthRequest = StitchAuthRequest_1.StitchAuthRequest;
    var StitchRequestClient_1 = __importDefault(require("./internal/net/StitchRequestClient"));
    exports.StitchRequestClient = StitchRequestClient_1.default;
    var CoreStitchServiceClientImpl_1 = __importDefault(require("./services/internal/CoreStitchServiceClientImpl"));
    exports.CoreStitchServiceClientImpl = CoreStitchServiceClientImpl_1.default;
    var StitchServiceRoutes_1 = __importDefault(require("./services/internal/StitchServiceRoutes"));
    exports.StitchServiceRoutes = StitchServiceRoutes_1.default;
    var StitchAppClientConfiguration_1 = require("./StitchAppClientConfiguration");
    exports.StitchAppClientConfiguration = StitchAppClientConfiguration_1.StitchAppClientConfiguration;
    var StitchAppClientInfo_1 = __importDefault(require("./StitchAppClientInfo"));
    exports.StitchAppClientInfo = StitchAppClientInfo_1.default;
    var StitchClientError_1 = __importDefault(require("./StitchClientError"));
    exports.StitchClientError = StitchClientError_1.default;
    var StitchClientErrorCode_1 = require("./StitchClientErrorCode");
    exports.StitchClientErrorCode = StitchClientErrorCode_1.StitchClientErrorCode;
    var StitchError_1 = __importDefault(require("./StitchError"));
    exports.StitchError = StitchError_1.default;
    var StitchRequestError_1 = __importDefault(require("./StitchRequestError"));
    exports.StitchRequestError = StitchRequestError_1.default;
    var StitchRequestErrorCode_1 = require("./StitchRequestErrorCode");
    exports.StitchRequestErrorCode = StitchRequestErrorCode_1.StitchRequestErrorCode;
    var StitchServiceError_1 = __importDefault(require("./StitchServiceError"));
    exports.StitchServiceError = StitchServiceError_1.default;
    var StitchServiceErrorCode_1 = require("./StitchServiceErrorCode");
    exports.StitchServiceErrorCode = StitchServiceErrorCode_1.StitchServiceErrorCode;
});
//# sourceMappingURL=index.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/index.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd")
},{"./StitchAppClientConfiguration":28,"./StitchAppClientInfo":29,"./StitchClientError":31,"./StitchClientErrorCode":32,"./StitchError":33,"./StitchRequestError":34,"./StitchRequestErrorCode":35,"./StitchServiceError":36,"./StitchServiceErrorCode":37,"./auth/StitchUserIdentity":39,"./auth/UserType":40,"./auth/internal/AuthInfo":42,"./auth/internal/CoreStitchAuth":43,"./auth/internal/CoreStitchUserImpl":44,"./auth/internal/DeviceFields":45,"./auth/internal/StitchUserProfileImpl":47,"./auth/internal/models/ApiStitchUserIdentity":50,"./auth/providers/anonymous/AnonymousAuthProvider":54,"./auth/providers/anonymous/AnonymousCredential":55,"./auth/providers/custom/CustomAuthProvider":56,"./auth/providers/custom/CustomCredential":57,"./auth/providers/facebook/FacebookAuthProvider":58,"./auth/providers/facebook/FacebookCredential":59,"./auth/providers/google/GoogleAuthProvider":60,"./auth/providers/google/GoogleCredential":61,"./auth/providers/internal/StitchAuthResponseCredential":63,"./auth/providers/serverapikey/ServerApiKeyAuthProvider":64,"./auth/providers/serverapikey/ServerApiKeyCredential":65,"./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient":66,"./auth/providers/userapikey/UserApiKeyAuthProvider":67,"./auth/providers/userapikey/UserApiKeyCredential":68,"./auth/providers/userapikey/models/UserApiKey":69,"./auth/providers/userpass/CoreUserPasswordAuthProviderClient":70,"./auth/providers/userpass/UserPasswordAuthProvider":71,"./auth/providers/userpass/UserPasswordCredential":72,"./internal/CoreStitchAppClient":74,"./internal/common/Base64":76,"./internal/common/Storage":78,"./internal/net/FetchTransport":81,"./internal/net/Method":83,"./internal/net/Response":84,"./internal/net/StitchAppAuthRoutes":85,"./internal/net/StitchAppRoutes":86,"./internal/net/StitchAuthRequest":88,"./internal/net/StitchRequestClient":91,"./services/internal/CoreStitchServiceClientImpl":93,"./services/internal/StitchServiceRoutes":94,"b55mWE":6,"buffer":5}],74:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../services/internal/CoreStitchServiceClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreStitchServiceClientImpl_1 = __importDefault(require("../services/internal/CoreStitchServiceClientImpl"));
    var CoreStitchAppClient = (function () {
        function CoreStitchAppClient(authRequestClient, routes) {
            this.functionService =
                new CoreStitchServiceClientImpl_1.default(authRequestClient, routes.serviceRoutes);
        }
        CoreStitchAppClient.prototype.callFunction = function (name, args, decoder) {
            return this.functionService.callFunction(name, args, decoder);
        };
        return CoreStitchAppClient;
    }());
    exports.default = CoreStitchAppClient;
});
//# sourceMappingURL=CoreStitchAppClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/CoreStitchAppClient.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal")
},{"../services/internal/CoreStitchServiceClientImpl":93,"b55mWE":6,"buffer":5}],75:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Assertions = (function () {
        function Assertions() {
        }
        Assertions.keyPresent = function (key, object) {
            if (object[key] === undefined) {
                throw new Error("expected " + key + " to be present");
            }
        };
        return Assertions;
    }());
    exports.default = Assertions;
});
//# sourceMappingURL=Assertions.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common/Assertions.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common")
},{"b55mWE":6,"buffer":5}],76:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "base64-js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var base64_js_1 = require("base64-js");
    function base64Decode(str) {
        var unevenBytes = str.length % 4;
        var strToDecode;
        if (unevenBytes != 0) {
            var paddingNeeded = 4 - unevenBytes;
            strToDecode = str + "=".repeat(paddingNeeded);
        }
        else {
            strToDecode = str;
        }
        var bytes = base64_js_1.toByteArray(strToDecode);
        return utf8Slice(bytes, 0, bytes.length);
    }
    exports.base64Decode = base64Decode;
    function base64Encode(str) {
        var result;
        if ("undefined" === typeof Uint8Array) {
            result = utf8ToBytes(str);
        }
        result = new Uint8Array(utf8ToBytes(str));
        return base64_js_1.fromByteArray(result);
    }
    exports.base64Encode = base64Encode;
    function utf8ToBytes(string) {
        var units = Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        var i = 0;
        for (; i < length; i++) {
            codePoint = string.charCodeAt(i);
            if (codePoint > 0xd7ff && codePoint < 0xe000) {
                if (leadSurrogate) {
                    if (codePoint < 0xdc00) {
                        if ((units -= 3) > -1)
                            bytes.push(0xef, 0xbf, 0xbd);
                        leadSurrogate = codePoint;
                        continue;
                    }
                    else {
                        codePoint =
                            ((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00) | 0x10000;
                        leadSurrogate = null;
                    }
                }
                else {
                    if (codePoint > 0xdbff) {
                        if ((units -= 3) > -1) {
                            bytes.push(0xef, 0xbf, 0xbd);
                        }
                        continue;
                    }
                    else if (i + 1 === length) {
                        if ((units -= 3) > -1) {
                            bytes.push(0xef, 0xbf, 0xbd);
                        }
                        continue;
                    }
                    else {
                        leadSurrogate = codePoint;
                        continue;
                    }
                }
            }
            else if (leadSurrogate) {
                if ((units -= 3) > -1) {
                    bytes.push(0xef, 0xbf, 0xbd);
                }
                leadSurrogate = null;
            }
            if (codePoint < 0x80) {
                if ((units -= 1) < 0) {
                    break;
                }
                bytes.push(codePoint);
            }
            else if (codePoint < 0x800) {
                if ((units -= 2) < 0) {
                    break;
                }
                bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80);
            }
            else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) {
                    break;
                }
                bytes.push((codePoint >> 0xc) | 0xe0, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
            }
            else if (codePoint < 0x200000) {
                if ((units -= 4) < 0) {
                    break;
                }
                bytes.push((codePoint >> 0x12) | 0xf0, ((codePoint >> 0xc) & 0x3f) | 0x80, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
            }
            else {
                throw new Error("Invalid code point");
            }
        }
        return bytes;
    }
    function utf8Slice(buf, start, end) {
        var res = "";
        var tmp = "";
        end = Math.min(buf.length, end || Infinity);
        start = start || 0;
        for (var i = start; i < end; i++) {
            if (buf[i] <= 0x7f) {
                res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
                tmp = "";
            }
            else {
                tmp += "%" + buf[i].toString(16);
            }
        }
        return res + decodeUtf8Char(tmp);
    }
    function decodeUtf8Char(str) {
        try {
            return decodeURIComponent(str);
        }
        catch (err) {
            return String.fromCharCode(0xfffd);
        }
    }
});
//# sourceMappingURL=Base64.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common/Base64.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common")
},{"b55mWE":6,"base64-js":1,"buffer":5}],77:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../net/ContentTypes", "../net/Headers", "../../StitchError", "../../StitchRequestErrorCode", "../../StitchRequestError", "../../StitchServiceErrorCode", "../../StitchServiceError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContentTypes_1 = __importDefault(require("../net/ContentTypes"));
    var Headers_1 = __importDefault(require("../net/Headers"));
    var StitchError_1 = __importDefault(require("../../StitchError"));
    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
    var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");
    var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));
    var Fields;
    (function (Fields) {
        Fields["ERROR"] = "error";
        Fields["ERROR_CODE"] = "error_code";
    })(Fields || (Fields = {}));
    function wrapDecodingError(err) {
        if (err instanceof StitchError_1.default) {
            return err;
        }
        return new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
    }
    exports.wrapDecodingError = wrapDecodingError;
    function handleRequestError(response) {
        if (response.body === undefined) {
            throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
        }
        var body;
        try {
            body = response.body;
        }
        catch (e) {
            throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
        }
        var errorMsg = handleRichError(response, body);
        throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
    }
    exports.handleRequestError = handleRequestError;
    function handleRichError(response, body) {
        if (response.headers[Headers_1.default.CONTENT_TYPE] === undefined ||
            (response.headers[Headers_1.default.CONTENT_TYPE] !== undefined &&
                response.headers[Headers_1.default.CONTENT_TYPE] !== ContentTypes_1.default.APPLICATION_JSON)) {
            return body;
        }
        var bsonObj = JSON.parse(body);
        if (!(bsonObj instanceof Object)) {
            return body;
        }
        var doc = bsonObj;
        if (doc[Fields.ERROR] === undefined) {
            return body;
        }
        var errorMsg = doc[Fields.ERROR];
        if (doc[Fields.ERROR_CODE] === undefined) {
            return errorMsg;
        }
        var errorCode = doc[Fields.ERROR_CODE];
        throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.stitchServiceErrorCodeFromApi(errorCode));
    }
});
//# sourceMappingURL=StitchErrorUtils.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common/StitchErrorUtils.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common")
},{"../../StitchError":33,"../../StitchRequestError":34,"../../StitchRequestErrorCode":35,"../../StitchServiceError":36,"../../StitchServiceErrorCode":37,"../net/ContentTypes":80,"../net/Headers":82,"b55mWE":6,"buffer":5}],78:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MemoryStorage = (function () {
        function MemoryStorage(suiteName) {
            this.suiteName = suiteName;
            this.storage = {};
        }
        MemoryStorage.prototype.get = function (key) {
            return this.storage[this.suiteName + "." + key];
        };
        MemoryStorage.prototype.set = function (key, value) {
            this.storage[this.suiteName + "." + key] = value;
        };
        MemoryStorage.prototype.remove = function (key) {
            delete this.storage[this.suiteName + "." + key];
        };
        return MemoryStorage;
    }());
    exports.MemoryStorage = MemoryStorage;
});
//# sourceMappingURL=Storage.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common/Storage.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/common")
},{"b55mWE":6,"buffer":5}],79:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicRequest = (function () {
        function BasicRequest(method, url, headers, body) {
            this.method = method;
            this.url = url;
            this.headers = headers;
            this.body = body;
        }
        return BasicRequest;
    }());
    exports.BasicRequest = BasicRequest;
    (function (BasicRequest) {
        var Builder = (function () {
            function Builder(request) {
                if (!request) {
                    return;
                }
                this.method = request.method;
                this.url = request.url;
                this.headers = request.headers;
                this.body = request.body;
            }
            Builder.prototype.withMethod = function (method) {
                this.method = method;
                return this;
            };
            Builder.prototype.withUrl = function (url) {
                this.url = url;
                return this;
            };
            Builder.prototype.withHeaders = function (headers) {
                this.headers = headers;
                return this;
            };
            Builder.prototype.withBody = function (body) {
                this.body = body;
                return this;
            };
            Builder.prototype.build = function () {
                if (this.method === undefined) {
                    throw new Error("must set method");
                }
                if (this.url === undefined) {
                    throw new Error("must set non-empty url");
                }
                return new BasicRequest(this.method, this.url, this.headers === undefined
                    ? {}
                    : this.headers, this.body);
            };
            return Builder;
        }());
        BasicRequest.Builder = Builder;
    })(BasicRequest = exports.BasicRequest || (exports.BasicRequest = {}));
    exports.BasicRequest = BasicRequest;
});
//# sourceMappingURL=BasicRequest.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/BasicRequest.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],80:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContentTypes = (function () {
        function ContentTypes() {
        }
        ContentTypes.APPLICATION_JSON = "application/json";
        return ContentTypes;
    }());
    exports.default = ContentTypes;
});
//# sourceMappingURL=ContentTypes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/ContentTypes.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],81:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Response", "fetch-everywhere"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Response_1 = __importDefault(require("./Response"));
    var fetch_everywhere_1 = __importDefault(require("fetch-everywhere"));
    var FetchTransport = (function () {
        function FetchTransport() {
        }
        FetchTransport.prototype.roundTrip = function (request) {
            var responsePromise = fetch_everywhere_1.default(request.url, {
                body: request.body,
                headers: request.headers,
                method: request.method
            });
            var responseTextPromise = responsePromise.then(function (response) {
                return response.text();
            });
            return Promise.all([responsePromise, responseTextPromise]).then(function (values) {
                var response = values[0];
                var body = values[1];
                var headers = {};
                response.headers.forEach(function (value, key) {
                    headers[key] = value;
                });
                return new Response_1.default(headers, response.status, body);
            });
        };
        return FetchTransport;
    }());
    exports.default = FetchTransport;
});
//# sourceMappingURL=FetchTransport.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/FetchTransport.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"./Response":84,"b55mWE":6,"buffer":5,"fetch-everywhere":3}],82:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Headers = (function () {
        function Headers() {
        }
        Headers.getAuthorizationBearer = function (value) {
            return Headers.AUTHORIZATION_BEARER + " " + value;
        };
        Headers.CONTENT_TYPE_CANON = "Content-Type";
        Headers.CONTENT_TYPE = Headers.CONTENT_TYPE_CANON.toLocaleLowerCase();
        Headers.AUTHORIZATION_CANON = "Authorization";
        Headers.AUTHORIZATION = Headers.AUTHORIZATION_CANON.toLocaleLowerCase();
        Headers.AUTHORIZATION_BEARER = "Bearer";
        return Headers;
    }());
    exports.default = Headers;
});
//# sourceMappingURL=Headers.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/Headers.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],83:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Method;
    (function (Method) {
        Method["GET"] = "GET";
        Method["POST"] = "POST";
        Method["PUT"] = "PUT";
        Method["DELETE"] = "DELETE";
        Method["HEAD"] = "HEAD";
        Method["OPTIONS"] = "OPTIONS";
        Method["TRACE"] = "TRACE";
        Method["PATCH"] = "PATCH";
    })(Method || (Method = {}));
    exports.default = Method;
});
//# sourceMappingURL=Method.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/Method.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],84:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Response = (function () {
        function Response(headers, statusCode, body) {
            var _this = this;
            this.statusCode = statusCode;
            this.body = body;
            this.headers = {};
            Object.keys(headers).map(function (key, index) {
                _this.headers[key.toLocaleLowerCase()] = headers[key];
            });
        }
        return Response;
    }());
    exports.default = Response;
});
//# sourceMappingURL=Response.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/Response.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],85:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchRoutes_1 = require("./StitchRoutes");
    function getAuthProviderRoute(clientAppId, providerName) {
        return StitchRoutes_1.getAppRoute(clientAppId) + ("/auth/providers/" + providerName);
    }
    function getAuthProviderLoginRoute(clientAppId, providerName) {
        return getAuthProviderRoute(clientAppId, providerName) + "/login";
    }
    function getAuthProviderLinkRoute(clientAppId, providerName) {
        return getAuthProviderLoginRoute(clientAppId, providerName) + "?link=true";
    }
    var StitchAppAuthRoutes = (function () {
        function StitchAppAuthRoutes(clientAppId) {
            var _this = this;
            this.baseAuthRoute = StitchRoutes_1.BASE_ROUTE + "/auth";
            this.sessionRoute = (function () {
                return _this.baseAuthRoute + "/session";
            })();
            this.profileRoute = (function () {
                return _this.baseAuthRoute + "/profile";
            })();
            this.clientAppId = clientAppId;
        }
        StitchAppAuthRoutes.prototype.getAuthProviderRoute = function (providerName) {
            return getAuthProviderRoute(this.clientAppId, providerName);
        };
        StitchAppAuthRoutes.prototype.getAuthProviderLoginRoute = function (providerName) {
            return getAuthProviderLoginRoute(this.clientAppId, providerName);
        };
        StitchAppAuthRoutes.prototype.getAuthProviderLinkRoute = function (providerName) {
            return getAuthProviderLinkRoute(this.clientAppId, providerName);
        };
        StitchAppAuthRoutes.prototype.getAuthProviderExtensionRoute = function (providerName, path) {
            return this.getAuthProviderRoute(providerName) + "/" + path;
        };
        return StitchAppAuthRoutes;
    }());
    exports.default = StitchAppAuthRoutes;
});
//# sourceMappingURL=StitchAppAuthRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchAppAuthRoutes.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"./StitchRoutes":92,"b55mWE":6,"buffer":5}],86:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../services/internal/StitchServiceRoutes", "./StitchAppAuthRoutes", "./StitchRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchServiceRoutes_1 = __importDefault(require("../../services/internal/StitchServiceRoutes"));
    var StitchAppAuthRoutes_1 = __importDefault(require("./StitchAppAuthRoutes"));
    var StitchRoutes_1 = require("./StitchRoutes");
    var StitchAppRoutes = (function () {
        function StitchAppRoutes(clientAppId) {
            this.clientAppId = clientAppId;
            this.authRoutes = new StitchAppAuthRoutes_1.default(clientAppId);
            this.serviceRoutes = new StitchServiceRoutes_1.default(clientAppId);
            this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
        }
        return StitchAppRoutes;
    }());
    exports.default = StitchAppRoutes;
});
//# sourceMappingURL=StitchAppRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchAppRoutes.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"../../services/internal/StitchServiceRoutes":94,"./StitchAppAuthRoutes":85,"./StitchRoutes":92,"b55mWE":6,"buffer":5}],87:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-extjson", "./ContentTypes", "./Headers", "./StitchAuthRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_extjson_1 = require("mongodb-stitch-extjson");
    var ContentTypes_1 = __importDefault(require("./ContentTypes"));
    var Headers_1 = __importDefault(require("./Headers"));
    var StitchAuthRequest_1 = require("./StitchAuthRequest");
    var StitchAuthDocRequest = (function (_super) {
        __extends(StitchAuthDocRequest, _super);
        function StitchAuthDocRequest(request, document) {
            var _this = this;
            request instanceof StitchAuthRequest_1.StitchAuthRequest
                ? _this = _super.call(this, request, request.useRefreshToken, request.shouldRefreshOnFailure) || this : _this = _super.call(this, request) || this;
            _this.document = document;
            return _this;
        }
        Object.defineProperty(StitchAuthDocRequest.prototype, "builder", {
            get: function () {
                return new StitchAuthDocRequest.Builder(this);
            },
            enumerable: true,
            configurable: true
        });
        return StitchAuthDocRequest;
    }(StitchAuthRequest_1.StitchAuthRequest));
    exports.StitchAuthDocRequest = StitchAuthDocRequest;
    (function (StitchAuthDocRequest) {
        var Builder = (function (_super) {
            __extends(Builder, _super);
            function Builder(request) {
                var _this = _super.call(this, request) || this;
                if (request !== undefined) {
                    _this.document = request.document;
                    _this.useRefreshToken = request.useRefreshToken;
                }
                return _this;
            }
            Builder.prototype.withDocument = function (document) {
                this.document = document;
                return this;
            };
            Builder.prototype.withAccessToken = function () {
                this.useRefreshToken = false;
                return this;
            };
            Builder.prototype.build = function () {
                if (this.document === undefined || !(this.document instanceof Object)) {
                    throw new Error("document must be set: " + this.document);
                }
                if (this.headers === undefined) {
                    this.withHeaders({});
                }
                this.headers[Headers_1.default.CONTENT_TYPE] = ContentTypes_1.default.APPLICATION_JSON;
                this.withBody(mongodb_stitch_extjson_1.stringify(this.document));
                return new StitchAuthDocRequest(_super.prototype.build.call(this), this.document);
            };
            return Builder;
        }(StitchAuthRequest_1.StitchAuthRequest.Builder));
        StitchAuthDocRequest.Builder = Builder;
    })(StitchAuthDocRequest = exports.StitchAuthDocRequest || (exports.StitchAuthDocRequest = {}));
    exports.StitchAuthDocRequest = StitchAuthDocRequest;
});
//# sourceMappingURL=StitchAuthDocRequest.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchAuthDocRequest.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"./ContentTypes":80,"./Headers":82,"./StitchAuthRequest":88,"b55mWE":6,"buffer":5,"mongodb-stitch-extjson":111}],88:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchRequest_1 = require("./StitchRequest");
    var StitchAuthRequest = (function (_super) {
        __extends(StitchAuthRequest, _super);
        function StitchAuthRequest(request, useRefreshToken, shouldRefreshOnFailure) {
            if (useRefreshToken === void 0) { useRefreshToken = false; }
            if (shouldRefreshOnFailure === void 0) { shouldRefreshOnFailure = true; }
            var _this = _super.call(this, request.method, request.path, request.headers, request.startedAt, request.body) || this;
            _this.useRefreshToken = useRefreshToken;
            _this.shouldRefreshOnFailure = shouldRefreshOnFailure;
            return _this;
        }
        Object.defineProperty(StitchAuthRequest.prototype, "builder", {
            get: function () {
                return new StitchAuthRequest.Builder(this);
            },
            enumerable: true,
            configurable: true
        });
        return StitchAuthRequest;
    }(StitchRequest_1.StitchRequest));
    exports.StitchAuthRequest = StitchAuthRequest;
    (function (StitchAuthRequest) {
        var Builder = (function (_super) {
            __extends(Builder, _super);
            function Builder(request) {
                return _super.call(this, request) || this;
            }
            Builder.prototype.withAccessToken = function () {
                this.useRefreshToken = false;
                return this;
            };
            Builder.prototype.withRefreshToken = function () {
                this.useRefreshToken = true;
                return this;
            };
            Builder.prototype.withShouldRefreshOnFailure = function (shouldRefreshOnFailure) {
                this.shouldRefreshOnFailure = shouldRefreshOnFailure;
                return this;
            };
            Builder.prototype.build = function () {
                if (this.useRefreshToken) {
                    this.shouldRefreshOnFailure = false;
                }
                return new StitchAuthRequest(_super.prototype.build.call(this), this.useRefreshToken, this.shouldRefreshOnFailure);
            };
            return Builder;
        }(StitchRequest_1.StitchRequest.Builder));
        StitchAuthRequest.Builder = Builder;
    })(StitchAuthRequest = exports.StitchAuthRequest || (exports.StitchAuthRequest = {}));
    exports.StitchAuthRequest = StitchAuthRequest;
});
//# sourceMappingURL=StitchAuthRequest.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchAuthRequest.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"./StitchRequest":90,"b55mWE":6,"buffer":5}],89:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StitchRequest", "./Headers", "./ContentTypes", "mongodb-stitch-extjson"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchRequest_1 = require("./StitchRequest");
    var Headers_1 = __importDefault(require("./Headers"));
    var ContentTypes_1 = __importDefault(require("./ContentTypes"));
    var mongodb_stitch_extjson_1 = require("mongodb-stitch-extjson");
    var StitchDocRequest = (function (_super) {
        __extends(StitchDocRequest, _super);
        function StitchDocRequest(request, document) {
            var _this = _super.call(this, request.method, request.path, request.headers, request.startedAt, request.body) || this;
            _this.document = document;
            return _this;
        }
        Object.defineProperty(StitchDocRequest.prototype, "builder", {
            get: function () {
                return new StitchDocRequest.Builder(this);
            },
            enumerable: true,
            configurable: true
        });
        return StitchDocRequest;
    }(StitchRequest_1.StitchRequest));
    exports.StitchDocRequest = StitchDocRequest;
    (function (StitchDocRequest) {
        var Builder = (function (_super) {
            __extends(Builder, _super);
            function Builder(request) {
                var _this = _super.call(this, request) || this;
                if (request !== undefined) {
                    _this.document = request.document;
                }
                return _this;
            }
            Builder.prototype.withDocument = function (document) {
                this.document = document;
                return this;
            };
            Builder.prototype.build = function () {
                if (this.document === undefined || !(this.document instanceof Object)) {
                    throw new Error("document must be set");
                }
                if (this.headers === undefined) {
                    this.withHeaders({});
                }
                this.headers[Headers_1.default.CONTENT_TYPE] = ContentTypes_1.default.APPLICATION_JSON;
                this.withBody(mongodb_stitch_extjson_1.stringify(this.document));
                return new StitchDocRequest(_super.prototype.build.call(this), this.document);
            };
            return Builder;
        }(StitchRequest_1.StitchRequest.Builder));
        StitchDocRequest.Builder = Builder;
    })(StitchDocRequest = exports.StitchDocRequest || (exports.StitchDocRequest = {}));
    exports.StitchDocRequest = StitchDocRequest;
});
//# sourceMappingURL=StitchDocRequest.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchDocRequest.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"./ContentTypes":80,"./Headers":82,"./StitchRequest":90,"b55mWE":6,"buffer":5,"mongodb-stitch-extjson":111}],90:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchRequest = (function () {
        function StitchRequest(method, path, headers, startedAt, body) {
            this.method = method;
            this.path = path;
            this.headers = headers;
            this.body = body;
            this.startedAt = startedAt;
        }
        Object.defineProperty(StitchRequest.prototype, "builder", {
            get: function () {
                return new StitchRequest.Builder(this);
            },
            enumerable: true,
            configurable: true
        });
        return StitchRequest;
    }());
    exports.StitchRequest = StitchRequest;
    (function (StitchRequest) {
        var Builder = (function () {
            function Builder(request) {
                if (request !== undefined) {
                    this.method = request.method;
                    this.path = request.path;
                    this.headers = request.headers;
                    this.body = request.body;
                    this.startedAt = request.startedAt;
                }
            }
            Builder.prototype.withMethod = function (method) {
                this.method = method;
                return this;
            };
            Builder.prototype.withPath = function (path) {
                this.path = path;
                return this;
            };
            Builder.prototype.withHeaders = function (headers) {
                this.headers = headers;
                return this;
            };
            Builder.prototype.withBody = function (body) {
                this.body = body;
                return this;
            };
            Builder.prototype.build = function () {
                if (this.method === undefined) {
                    throw Error("must set method");
                }
                if (this.path === undefined) {
                    throw Error("must set non-empty path");
                }
                if (this.startedAt === undefined) {
                    this.startedAt = Date.now() / 1000;
                }
                return new StitchRequest(this.method, this.path, this.headers === undefined ? {} : this.headers, this.startedAt, this.body);
            };
            return Builder;
        }());
        StitchRequest.Builder = Builder;
    })(StitchRequest = exports.StitchRequest || (exports.StitchRequest = {}));
    exports.StitchRequest = StitchRequest;
});
//# sourceMappingURL=StitchRequest.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchRequest.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],91:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../internal/common/StitchErrorUtils", "../../StitchRequestErrorCode", "../../StitchRequestError", "./BasicRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");
    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
    var BasicRequest_1 = require("./BasicRequest");
    function inspectResponse(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
            return response;
        }
        return StitchErrorUtils_1.handleRequestError(response);
    }
    var StitchRequestClient = (function () {
        function StitchRequestClient(baseUrl, transport) {
            this.baseUrl = baseUrl;
            this.transport = transport;
        }
        StitchRequestClient.prototype.doRequest = function (stitchReq) {
            return this.transport
                .roundTrip(this.buildRequest(stitchReq))
                .catch(function (error) {
                throw new StitchRequestError_1.default(error, StitchRequestErrorCode_1.StitchRequestErrorCode.TRANSPORT_ERROR);
            })
                .then(inspectResponse);
        };
        StitchRequestClient.prototype.buildRequest = function (stitchReq) {
            return new BasicRequest_1.BasicRequest.Builder()
                .withMethod(stitchReq.method)
                .withUrl("" + this.baseUrl + stitchReq.path)
                .withHeaders(stitchReq.headers)
                .withBody(stitchReq.body)
                .build();
        };
        return StitchRequestClient;
    }());
    exports.default = StitchRequestClient;
});
//# sourceMappingURL=StitchRequestClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchRequestClient.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"../../StitchRequestError":34,"../../StitchRequestErrorCode":35,"../../internal/common/StitchErrorUtils":77,"./BasicRequest":79,"b55mWE":6,"buffer":5}],92:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BASE_ROUTE = "/api/client/v2.0";
    exports.BASE_ROUTE = BASE_ROUTE;
    function getAppRoute(clientAppId) {
        return BASE_ROUTE + ("/app/" + clientAppId);
    }
    exports.getAppRoute = getAppRoute;
    function getFunctionCallRoute(clientAppId) {
        return getAppRoute(clientAppId) + "/functions/call";
    }
    exports.getFunctionCallRoute = getFunctionCallRoute;
});
//# sourceMappingURL=StitchRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net/StitchRoutes.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/internal/net")
},{"b55mWE":6,"buffer":5}],93:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../internal/net/Method", "../../internal/net/StitchAuthDocRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Method_1 = __importDefault(require("../../internal/net/Method"));
    var StitchAuthDocRequest_1 = require("../../internal/net/StitchAuthDocRequest");
    var CoreStitchServiceClientImpl = (function () {
        function CoreStitchServiceClientImpl(requestClient, routes, name) {
            this.requestClient = requestClient;
            this.serviceRoutes = routes;
            this.serviceName = name;
        }
        CoreStitchServiceClientImpl.prototype.callFunction = function (name, args, decoder) {
            return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(name, args), decoder);
        };
        CoreStitchServiceClientImpl.prototype.getCallServiceFunctionRequest = function (name, args) {
            var body = { name: name };
            if (this.serviceName !== undefined) {
                body["service"] = this.serviceName;
            }
            body["arguments"] = args;
            var reqBuilder = new StitchAuthDocRequest_1.StitchAuthDocRequest.Builder();
            reqBuilder
                .withMethod(Method_1.default.POST)
                .withPath(this.serviceRoutes.functionCallRoute);
            reqBuilder.withDocument(body);
            return reqBuilder.build();
        };
        return CoreStitchServiceClientImpl;
    }());
    exports.default = CoreStitchServiceClientImpl;
});
//# sourceMappingURL=CoreStitchServiceClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/services/internal/CoreStitchServiceClientImpl.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/services/internal")
},{"../../internal/net/Method":83,"../../internal/net/StitchAuthDocRequest":87,"b55mWE":6,"buffer":5}],94:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../internal/net/StitchRoutes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StitchRoutes_1 = require("../../internal/net/StitchRoutes");
    var StitchServiceRoutes = (function () {
        function StitchServiceRoutes(clientAppId) {
            this.clientAppId = clientAppId;
            this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
        }
        return StitchServiceRoutes;
    }());
    exports.default = StitchServiceRoutes;
});
//# sourceMappingURL=StitchServiceRoutes.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/services/internal/StitchServiceRoutes.js","/../../node_modules/mongodb-stitch-browser-core/node_modules/mongodb-stitch-core-sdk/dist/umd/services/internal")
},{"../../internal/net/StitchRoutes":92,"b55mWE":6,"buffer":5}],95:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-browser-core", "mongodb-stitch-browser-services-mongodb-remote"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("mongodb-stitch-browser-core"));
    __export(require("mongodb-stitch-browser-services-mongodb-remote"));
});
//# sourceMappingURL=index.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-sdk/dist/umd/index.js","/../../node_modules/mongodb-stitch-browser-sdk/dist/umd")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-browser-core":26,"mongodb-stitch-browser-services-mongodb-remote":99}],96:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-services-mongodb-remote", "./internal/RemoteMongoClientImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");
    var RemoteMongoClientImpl_1 = __importDefault(require("./internal/RemoteMongoClientImpl"));
    var RemoteMongoClient;
    (function (RemoteMongoClient) {
        RemoteMongoClient.factory = new (function () {
            function class_1() {
            }
            class_1.prototype.getNamedClient = function (service, client) {
                return new RemoteMongoClientImpl_1.default(new mongodb_stitch_core_services_mongodb_remote_1.CoreRemoteMongoClientImpl(service));
            };
            return class_1;
        }())();
    })(RemoteMongoClient = exports.RemoteMongoClient || (exports.RemoteMongoClient = {}));
});
//# sourceMappingURL=RemoteMongoClient.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/RemoteMongoClient.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd")
},{"./internal/RemoteMongoClientImpl":100,"b55mWE":6,"buffer":5,"mongodb-stitch-core-services-mongodb-remote":105}],97:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteMongoCursor = (function () {
        function RemoteMongoCursor(proxy) {
            this.proxy = proxy;
        }
        RemoteMongoCursor.prototype.next = function () {
            return Promise.resolve(this.proxy.next().value);
        };
        return RemoteMongoCursor;
    }());
    exports.default = RemoteMongoCursor;
});
//# sourceMappingURL=RemoteMongoCursor.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/RemoteMongoCursor.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd")
},{"b55mWE":6,"buffer":5}],98:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RemoteMongoCursor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteMongoCursor_1 = __importDefault(require("./RemoteMongoCursor"));
    var RemoteMongoReadOperation = (function () {
        function RemoteMongoReadOperation(proxy) {
            this.proxy = proxy;
        }
        RemoteMongoReadOperation.prototype.first = function () {
            return this.proxy.first();
        };
        RemoteMongoReadOperation.prototype.asArray = function () {
            return this.proxy.asArray();
        };
        RemoteMongoReadOperation.prototype.iterator = function () {
            return this.proxy.iterator().then(function (res) { return new RemoteMongoCursor_1.default(res); });
        };
        return RemoteMongoReadOperation;
    }());
    exports.default = RemoteMongoReadOperation;
});
//# sourceMappingURL=RemoteMongoReadOperation.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/RemoteMongoReadOperation.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd")
},{"./RemoteMongoCursor":97,"b55mWE":6,"buffer":5}],99:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-core-services-mongodb-remote", "./RemoteMongoReadOperation", "./RemoteMongoClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");
    exports.RemoteInsertManyResult = mongodb_stitch_core_services_mongodb_remote_1.RemoteInsertManyResult;
    var RemoteMongoReadOperation_1 = __importDefault(require("./RemoteMongoReadOperation"));
    exports.RemoteMongoReadOperation = RemoteMongoReadOperation_1.default;
    var RemoteMongoClient_1 = require("./RemoteMongoClient");
    exports.RemoteMongoClient = RemoteMongoClient_1.RemoteMongoClient;
});
//# sourceMappingURL=index.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/index.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd")
},{"./RemoteMongoClient":96,"./RemoteMongoReadOperation":98,"b55mWE":6,"buffer":5,"mongodb-stitch-core-services-mongodb-remote":105}],100:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RemoteMongoDatabaseImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteMongoDatabaseImpl_1 = __importDefault(require("./RemoteMongoDatabaseImpl"));
    var RemoteMongoClientImpl = (function () {
        function RemoteMongoClientImpl(proxy) {
            this.proxy = proxy;
        }
        RemoteMongoClientImpl.prototype.db = function (name) {
            return new RemoteMongoDatabaseImpl_1.default(this.proxy.db(name));
        };
        return RemoteMongoClientImpl;
    }());
    exports.default = RemoteMongoClientImpl;
});
//# sourceMappingURL=RemoteMongoClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal/RemoteMongoClientImpl.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal")
},{"./RemoteMongoDatabaseImpl":102,"b55mWE":6,"buffer":5}],101:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../RemoteMongoReadOperation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteMongoReadOperation_1 = __importDefault(require("../RemoteMongoReadOperation"));
    var RemoteMongoCollectionImpl = (function () {
        function RemoteMongoCollectionImpl(proxy) {
            this.proxy = proxy;
            this.namespace = this.proxy.namespace;
        }
        RemoteMongoCollectionImpl.prototype.withCollectionType = function (codec) {
            return new RemoteMongoCollectionImpl(this.proxy.withCollectionType(codec));
        };
        RemoteMongoCollectionImpl.prototype.count = function (query, options) {
            return this.proxy.count(query, options);
        };
        RemoteMongoCollectionImpl.prototype.find = function (query, options) {
            return new RemoteMongoReadOperation_1.default(this.proxy.find(query, options));
        };
        RemoteMongoCollectionImpl.prototype.aggregate = function (pipeline) {
            return new RemoteMongoReadOperation_1.default(this.proxy.aggregate(pipeline));
        };
        RemoteMongoCollectionImpl.prototype.insertOne = function (doc) {
            return this.proxy.insertOne(doc);
        };
        RemoteMongoCollectionImpl.prototype.insertMany = function (docs) {
            return this.proxy.insertMany(docs);
        };
        RemoteMongoCollectionImpl.prototype.deleteOne = function (query) {
            return this.proxy.deleteOne(query);
        };
        RemoteMongoCollectionImpl.prototype.deleteMany = function (query) {
            return this.proxy.deleteMany(query);
        };
        RemoteMongoCollectionImpl.prototype.updateOne = function (query, update, updateOptions) {
            return this.proxy.updateOne(query, update, updateOptions);
        };
        RemoteMongoCollectionImpl.prototype.updateMany = function (query, update, updateOptions) {
            return this.proxy.updateMany(query, update, updateOptions);
        };
        return RemoteMongoCollectionImpl;
    }());
    exports.default = RemoteMongoCollectionImpl;
});
//# sourceMappingURL=RemoteMongoCollectionImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal/RemoteMongoCollectionImpl.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal")
},{"../RemoteMongoReadOperation":98,"b55mWE":6,"buffer":5}],102:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RemoteMongoCollectionImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteMongoCollectionImpl_1 = __importDefault(require("./RemoteMongoCollectionImpl"));
    var RemoteMongoDatabaseImpl = (function () {
        function RemoteMongoDatabaseImpl(proxy) {
            this.proxy = proxy;
            this.name = this.proxy.name;
        }
        RemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
            return new RemoteMongoCollectionImpl_1.default(this.proxy.collection(name, codec));
        };
        return RemoteMongoDatabaseImpl;
    }());
    exports.default = RemoteMongoDatabaseImpl;
});
//# sourceMappingURL=RemoteMongoDatabaseImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal/RemoteMongoDatabaseImpl.js","/../../node_modules/mongodb-stitch-browser-services-mongodb-remote/dist/umd/internal")
},{"./RemoteMongoCollectionImpl":101,"b55mWE":6,"buffer":5}],103:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('buffer')) :
	typeof define === 'function' && define.amd ? define(['buffer'], factory) :
	(global.BSON = factory(global.Buffer));
}(this, (function (require$$0) { 'use strict';

require$$0 = require$$0 && require$$0.hasOwnProperty('default') ? require$$0['default'] : require$$0;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var map = createCommonjsModule(function (module) {

  var Buffer = require$$0.Buffer;

  // We have an ES6 Map available, return the native instance
  if (typeof commonjsGlobal.Map !== 'undefined') {
    module.exports = commonjsGlobal.Map;
    module.exports.Map = commonjsGlobal.Map;
  } else {
    // We will return a polyfill
    var Map = function Map(array) {
      this._keys = [];
      this._values = {};

      for (var i = 0; i < array.length; i++) {
        if (array[i] == null) continue; // skip null and undefined
        var entry = array[i];
        var key = entry[0];
        var value = entry[1];
        // Add the key to the list of keys in order
        this._keys.push(key);
        // Add the key and value to the values dictionary with a point
        // to the location in the ordered keys list
        this._values[key] = { v: value, i: this._keys.length - 1 };
      }
    };

    Map.prototype.clear = function () {
      this._keys = [];
      this._values = {};
    };

    Map.prototype.delete = function (key) {
      var value = this._values[key];
      if (value == null) return false;
      // Delete entry
      delete this._values[key];
      // Remove the key from the ordered keys list
      this._keys.splice(value.i, 1);
      return true;
    };

    Map.prototype.entries = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? [key, self._values[key].v] : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.forEach = function (callback, self) {
      self = self || this;

      for (var i = 0; i < this._keys.length; i++) {
        var key = this._keys[i];
        // Call the forEach callback
        callback.call(self, this._values[key].v, key, self);
      }
    };

    Map.prototype.get = function (key) {
      return this._values[key] ? this._values[key].v : undefined;
    };

    Map.prototype.has = function (key) {
      return this._values[key] != null;
    };

    Map.prototype.keys = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? key : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.set = function (key, value) {
      if (this._values[key]) {
        this._values[key].v = value;
        return this;
      }

      // Add the key to the list of keys in order
      this._keys.push(key);
      // Add the key and value to the values dictionary with a point
      // to the location in the ordered keys list
      this._values[key] = { v: value, i: this._keys.length - 1 };
      return this;
    };

    Map.prototype.values = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? self._values[key].v : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    // Last ismaster
    Object.defineProperty(Map.prototype, 'size', {
      enumerable: true,
      get: function get() {
        return this._keys.length;
      }
    });

    module.exports = Map;
    module.exports.Map = Map;
  }
});
var map_1 = map.Map;

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Copyright 2009 Google Inc. All Rights Reserved

/**
 * Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "Long". This
 * implementation is derived from LongLib in GWT.
 *
 * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
 * values as *signed* integers.  See the from* functions below for more
 * convenient ways of constructing Longs.
 *
 * The internal representation of a Long is the two given signed, 32-bit values.
 * We use 32-bit pieces because these are the size of integers on which
 * Javascript performs bit-operations.  For operations like addition and
 * multiplication, we split each number into 16-bit pieces, which can easily be
 * multiplied within Javascript's floating-point representation without overflow
 * or change in sign.
 *
 * In the algorithms below, we frequently reduce the negative case to the
 * positive case by negating the input(s) and then post-processing the result.
 * Note that we must ALWAYS check specially whether those values are MIN_VALUE
 * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
 * a positive number, it overflows back into a negative).  Not handling this
 * case would often result in infinite recursion.
 *
 * @class
 * @param {number} low  the low (signed) 32 bits of the Long.
 * @param {number} high the high (signed) 32 bits of the Long.
 * @return {Long}
 */

function Long(low, high) {
  if (!(this instanceof Long)) return new Long(low, high);

  this._bsontype = 'Long';
  /**
   * @type {number}
   * @ignore
   */
  this.low_ = low | 0; // force into 32 signed bits.

  /**
   * @type {number}
   * @ignore
   */
  this.high_ = high | 0; // force into 32 signed bits.
}

/**
 * Return the int value.
 *
 * @method
 * @return {number} the value, assuming it is a 32-bit integer.
 */
Long.prototype.toInt = function () {
  return this.low_;
};

/**
 * Return the Number value.
 *
 * @method
 * @return {number} the closest floating-point representation to this value.
 */
Long.prototype.toNumber = function () {
  return this.high_ * Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned();
};

/**
 * Return the JSON value.
 *
 * @method
 * @return {string} the JSON representation.
 */
Long.prototype.toJSON = function () {
  return this.toString();
};

/**
 * Return the String value.
 *
 * @method
 * @param {number} [opt_radix] the radix in which the text should be written.
 * @return {string} the textual representation of this value.
 */
Long.prototype.toString = function (opt_radix) {
  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (this.isZero()) {
    return '0';
  }

  if (this.isNegative()) {
    if (this.equals(Long.MIN_VALUE)) {
      // We need to change the Long value before it can be negated, so we remove
      // the bottom-most digit in this base and then recurse to do the rest.
      var radixLong = Long.fromNumber(radix);
      var div = this.div(radixLong);
      var rem = div.multiply(radixLong).subtract(this);
      return div.toString(radix) + rem.toInt().toString(radix);
    } else {
      return '-' + this.negate().toString(radix);
    }
  }

  // Do several (6) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Long.fromNumber(Math.pow(radix, 6));

  rem = this;
  var result = '';

  while (!rem.isZero()) {
    var remDiv = rem.div(radixToPower);
    var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
    var digits = intval.toString(radix);

    rem = remDiv;
    if (rem.isZero()) {
      return digits + result;
    } else {
      while (digits.length < 6) {
        digits = '0' + digits;
      }
      result = '' + digits + result;
    }
  }
};

/**
 * Return the high 32-bits value.
 *
 * @method
 * @return {number} the high 32-bits as a signed value.
 */
Long.prototype.getHighBits = function () {
  return this.high_;
};

/**
 * Return the low 32-bits value.
 *
 * @method
 * @return {number} the low 32-bits as a signed value.
 */
Long.prototype.getLowBits = function () {
  return this.low_;
};

/**
 * Return the low unsigned 32-bits value.
 *
 * @method
 * @return {number} the low 32-bits as an unsigned value.
 */
Long.prototype.getLowBitsUnsigned = function () {
  return this.low_ >= 0 ? this.low_ : Long.TWO_PWR_32_DBL_ + this.low_;
};

/**
 * Returns the number of bits needed to represent the absolute value of this Long.
 *
 * @method
 * @return {number} Returns the number of bits needed to represent the absolute value of this Long.
 */
Long.prototype.getNumBitsAbs = function () {
  if (this.isNegative()) {
    if (this.equals(Long.MIN_VALUE)) {
      return 64;
    } else {
      return this.negate().getNumBitsAbs();
    }
  } else {
    var val = this.high_ !== 0 ? this.high_ : this.low_;
    for (var bit = 31; bit > 0; bit--) {
      if ((val & 1 << bit) !== 0) {
        break;
      }
    }
    return this.high_ !== 0 ? bit + 33 : bit + 1;
  }
};

/**
 * Return whether this value is zero.
 *
 * @method
 * @return {boolean} whether this value is zero.
 */
Long.prototype.isZero = function () {
  return this.high_ === 0 && this.low_ === 0;
};

/**
 * Return whether this value is negative.
 *
 * @method
 * @return {boolean} whether this value is negative.
 */
Long.prototype.isNegative = function () {
  return this.high_ < 0;
};

/**
 * Return whether this value is odd.
 *
 * @method
 * @return {boolean} whether this value is odd.
 */
Long.prototype.isOdd = function () {
  return (this.low_ & 1) === 1;
};

/**
 * Return whether this Long equals the other
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long equals the other
 */
Long.prototype.equals = function (other) {
  return this.high_ === other.high_ && this.low_ === other.low_;
};

/**
 * Return whether this Long does not equal the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long does not equal the other.
 */
Long.prototype.notEquals = function (other) {
  return this.high_ !== other.high_ || this.low_ !== other.low_;
};

/**
 * Return whether this Long is less than the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is less than the other.
 */
Long.prototype.lessThan = function (other) {
  return this.compare(other) < 0;
};

/**
 * Return whether this Long is less than or equal to the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is less than or equal to the other.
 */
Long.prototype.lessThanOrEqual = function (other) {
  return this.compare(other) <= 0;
};

/**
 * Return whether this Long is greater than the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is greater than the other.
 */
Long.prototype.greaterThan = function (other) {
  return this.compare(other) > 0;
};

/**
 * Return whether this Long is greater than or equal to the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is greater than or equal to the other.
 */
Long.prototype.greaterThanOrEqual = function (other) {
  return this.compare(other) >= 0;
};

/**
 * Compares this Long with the given one.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} 0 if they are the same, 1 if the this is greater, and -1 if the given one is greater.
 */
Long.prototype.compare = function (other) {
  if (this.equals(other)) {
    return 0;
  }

  var thisNeg = this.isNegative();
  var otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) {
    return -1;
  }
  if (!thisNeg && otherNeg) {
    return 1;
  }

  // at this point, the signs are the same, so subtraction will not overflow
  if (this.subtract(other).isNegative()) {
    return -1;
  } else {
    return 1;
  }
};

/**
 * The negation of this value.
 *
 * @method
 * @return {Long} the negation of this value.
 */
Long.prototype.negate = function () {
  if (this.equals(Long.MIN_VALUE)) {
    return Long.MIN_VALUE;
  } else {
    return this.not().add(Long.ONE);
  }
};

/**
 * Returns the sum of this and the given Long.
 *
 * @method
 * @param {Long} other Long to add to this one.
 * @return {Long} the sum of this and the given Long.
 */
Long.prototype.add = function (other) {
  // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xffff;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xffff;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xffff;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xffff;

  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 0xffff;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c48 += a48 + b48;
  c48 &= 0xffff;
  return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

/**
 * Returns the difference of this and the given Long.
 *
 * @method
 * @param {Long} other Long to subtract from this.
 * @return {Long} the difference of this and the given Long.
 */
Long.prototype.subtract = function (other) {
  return this.add(other.negate());
};

/**
 * Returns the product of this and the given Long.
 *
 * @method
 * @param {Long} other Long to multiply with this.
 * @return {Long} the product of this and the other.
 */
Long.prototype.multiply = function (other) {
  if (this.isZero()) {
    return Long.ZERO;
  } else if (other.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    return other.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  } else if (other.equals(Long.MIN_VALUE)) {
    return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().multiply(other.negate());
    } else {
      return this.negate().multiply(other).negate();
    }
  } else if (other.isNegative()) {
    return this.multiply(other.negate()).negate();
  }

  // If both Longs are small, use float multiplication
  if (this.lessThan(Long.TWO_PWR_24_) && other.lessThan(Long.TWO_PWR_24_)) {
    return Long.fromNumber(this.toNumber() * other.toNumber());
  }

  // Divide each Long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xffff;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xffff;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xffff;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xffff;

  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xffff;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xffff;
  return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

/**
 * Returns this Long divided by the given one.
 *
 * @method
 * @param {Long} other Long by which to divide.
 * @return {Long} this Long divided by the given one.
 */
Long.prototype.div = function (other) {
  if (other.isZero()) {
    throw Error('division by zero');
  } else if (this.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    if (other.equals(Long.ONE) || other.equals(Long.NEG_ONE)) {
      return Long.MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
    } else if (other.equals(Long.MIN_VALUE)) {
      return Long.ONE;
    } else {
      // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
      var halfThis = this.shiftRight(1);
      var approx = halfThis.div(other).shiftLeft(1);
      if (approx.equals(Long.ZERO)) {
        return other.isNegative() ? Long.ONE : Long.NEG_ONE;
      } else {
        var rem = this.subtract(other.multiply(approx));
        var result = approx.add(rem.div(other));
        return result;
      }
    }
  } else if (other.equals(Long.MIN_VALUE)) {
    return Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().div(other.negate());
    } else {
      return this.negate().div(other).negate();
    }
  } else if (other.isNegative()) {
    return this.div(other.negate()).negate();
  }

  // Repeat the following until the remainder is less than other:  find a
  // floating-point that approximates remainder / other *from below*, add this
  // into the result, and subtract it from the remainder.  It is critical that
  // the approximate value is less than or equal to the real value so that the
  // remainder never becomes negative.
  var res = Long.ZERO;
  rem = this;
  while (rem.greaterThanOrEqual(other)) {
    // Approximate the result of division. This may be a little greater or
    // smaller than the actual value.
    approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

    // We will tweak the approximate result by changing it in the 48-th digit or
    // the smallest non-fractional digit, whichever is larger.
    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);

    // Decrease the approximation until it is smaller than the remainder.  Note
    // that if it is too large, the product overflows and is negative.
    var approxRes = Long.fromNumber(approx);
    var approxRem = approxRes.multiply(other);
    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
      approx -= delta;
      approxRes = Long.fromNumber(approx);
      approxRem = approxRes.multiply(other);
    }

    // We know the answer can't be zero... and actually, zero would cause
    // infinite recursion since we would make no progress.
    if (approxRes.isZero()) {
      approxRes = Long.ONE;
    }

    res = res.add(approxRes);
    rem = rem.subtract(approxRem);
  }
  return res;
};

/**
 * Returns this Long modulo the given one.
 *
 * @method
 * @param {Long} other Long by which to mod.
 * @return {Long} this Long modulo the given one.
 */
Long.prototype.modulo = function (other) {
  return this.subtract(this.div(other).multiply(other));
};

/**
 * The bitwise-NOT of this value.
 *
 * @method
 * @return {Long} the bitwise-NOT of this value.
 */
Long.prototype.not = function () {
  return Long.fromBits(~this.low_, ~this.high_);
};

/**
 * Returns the bitwise-AND of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to AND.
 * @return {Long} the bitwise-AND of this and the other.
 */
Long.prototype.and = function (other) {
  return Long.fromBits(this.low_ & other.low_, this.high_ & other.high_);
};

/**
 * Returns the bitwise-OR of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to OR.
 * @return {Long} the bitwise-OR of this and the other.
 */
Long.prototype.or = function (other) {
  return Long.fromBits(this.low_ | other.low_, this.high_ | other.high_);
};

/**
 * Returns the bitwise-XOR of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to XOR.
 * @return {Long} the bitwise-XOR of this and the other.
 */
Long.prototype.xor = function (other) {
  return Long.fromBits(this.low_ ^ other.low_, this.high_ ^ other.high_);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the left by the given amount.
 */
Long.prototype.shiftLeft = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var low = this.low_;
    if (numBits < 32) {
      var high = this.high_;
      return Long.fromBits(low << numBits, high << numBits | low >>> 32 - numBits);
    } else {
      return Long.fromBits(0, low << numBits - 32);
    }
  }
};

/**
 * Returns this Long with bits shifted to the right by the given amount.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the right by the given amount.
 */
Long.prototype.shiftRight = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(low >>> numBits | high << 32 - numBits, high >> numBits);
    } else {
      return Long.fromBits(high >> numBits - 32, high >= 0 ? 0 : -1);
    }
  }
};

/**
 * Returns this Long with bits shifted to the right by the given amount, with the new top bits matching the current sign bit.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the right by the given amount, with zeros placed into the new leading bits.
 */
Long.prototype.shiftRightUnsigned = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits);
    } else if (numBits === 32) {
      return Long.fromBits(high, 0);
    } else {
      return Long.fromBits(high >>> numBits - 32, 0);
    }
  }
};

/**
 * Returns a Long representing the given (32-bit) integer value.
 *
 * @method
 * @param {number} value the 32-bit integer in question.
 * @return {Long} the corresponding Long value.
 */
Long.fromInt = function (value) {
  if (-128 <= value && value < 128) {
    var cachedObj = Long.INT_CACHE_[value];
    if (cachedObj) {
      return cachedObj;
    }
  }

  var obj = new Long(value | 0, value < 0 ? -1 : 0);
  if (-128 <= value && value < 128) {
    Long.INT_CACHE_[value] = obj;
  }
  return obj;
};

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 *
 * @method
 * @param {number} value the number in question.
 * @return {Long} the corresponding Long value.
 */
Long.fromNumber = function (value) {
  if (isNaN(value) || !isFinite(value)) {
    return Long.ZERO;
  } else if (value <= -Long.TWO_PWR_63_DBL_) {
    return Long.MIN_VALUE;
  } else if (value + 1 >= Long.TWO_PWR_63_DBL_) {
    return Long.MAX_VALUE;
  } else if (value < 0) {
    return Long.fromNumber(-value).negate();
  } else {
    return new Long(value % Long.TWO_PWR_32_DBL_ | 0, value / Long.TWO_PWR_32_DBL_ | 0);
  }
};

/**
 * Returns a Long representing the 64-bit integer that comes by concatenating the given high and low bits. Each is assumed to use 32 bits.
 *
 * @method
 * @param {number} lowBits the low 32-bits.
 * @param {number} highBits the high 32-bits.
 * @return {Long} the corresponding Long value.
 */
Long.fromBits = function (lowBits, highBits) {
  return new Long(lowBits, highBits);
};

/**
 * Returns a Long representation of the given string, written using the given radix.
 *
 * @method
 * @param {string} str the textual representation of the Long.
 * @param {number} opt_radix the radix in which the text is written.
 * @return {Long} the corresponding Long value.
 */
Long.fromString = function (str, opt_radix) {
  if (str.length === 0) {
    throw Error('number format error: empty string');
  }

  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (str.charAt(0) === '-') {
    return Long.fromString(str.substring(1), radix).negate();
  } else if (str.indexOf('-') >= 0) {
    throw Error('number format error: interior "-" character: ' + str);
  }

  // Do several (8) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Long.fromNumber(Math.pow(radix, 8));

  var result = Long.ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = Long.fromNumber(Math.pow(radix, size));
      result = result.multiply(power).add(Long.fromNumber(value));
    } else {
      result = result.multiply(radixToPower);
      result = result.add(Long.fromNumber(value));
    }
  }
  return result;
};

// NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
// from* methods on which they depend.

/**
 * A cache of the Long representations of small integer values.
 * @type {Object}
 * @ignore
 */
Long.INT_CACHE_ = {};

// NOTE: the compiler should inline these constant values below and then remove
// these variables, so there should be no runtime penalty for these.

/**
 * Number used repeated below in calculations.  This must appear before the
 * first call to any from* function below.
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_16_DBL_ = 1 << 16;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_24_DBL_ = 1 << 24;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_32_DBL_ = Long.TWO_PWR_16_DBL_ * Long.TWO_PWR_16_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_31_DBL_ = Long.TWO_PWR_32_DBL_ / 2;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_48_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_16_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_64_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_32_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_63_DBL_ = Long.TWO_PWR_64_DBL_ / 2;

/** @type {Long} */
Long.ZERO = Long.fromInt(0);

/** @type {Long} */
Long.ONE = Long.fromInt(1);

/** @type {Long} */
Long.NEG_ONE = Long.fromInt(-1);

/** @type {Long} */
Long.MAX_VALUE = Long.fromBits(0xffffffff | 0, 0x7fffffff | 0);

/** @type {Long} */
Long.MIN_VALUE = Long.fromBits(0, 0x80000000 | 0);

/**
 * @type {Long}
 * @ignore
 */
Long.TWO_PWR_24_ = Long.fromInt(1 << 24);

/**
 * Expose.
 */
var long_1 = Long;
var Long_1 = Long;
long_1.Long = Long_1;

/**
 * A class representation of the BSON Double type.
 *
 * @class
 * @param {number} value the number we want to represent as a double.
 * @return {Double}
 */

function Double(value) {
  if (!(this instanceof Double)) return new Double(value);

  this._bsontype = 'Double';
  this.value = value;
}

/**
 * Access the number value.
 *
 * @method
 * @return {number} returns the wrapped double number.
 */
Double.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
Double.prototype.toJSON = function () {
  return this.value;
};

var double_1 = Double;
var Double_1 = Double;
double_1.Double = Double_1;

/**
 * @class
 * @param {number} low  the low (signed) 32 bits of the Timestamp.
 * @param {number} high the high (signed) 32 bits of the Timestamp.
 * @return {Timestamp}
 */
function Timestamp(low, high) {
  if (low instanceof long_1) {
    long_1.call(this, low.low_, low.high_);
  } else {
    long_1.call(this, low, high);
  }

  this._bsontype = 'Timestamp';
}

Timestamp.prototype = Object.create(long_1.prototype);
Timestamp.prototype.constructor = Timestamp;

/**
 * Return the JSON value.
 *
 * @method
 * @return {String} the JSON representation.
 */
Timestamp.prototype.toJSON = function () {
  return {
    $timestamp: this.toString()
  };
};

/**
 * Returns a Timestamp represented by the given (32-bit) integer value.
 *
 * @method
 * @param {number} value the 32-bit integer in question.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromInt = function (value) {
  return new Timestamp(long_1.fromInt(value));
};

/**
 * Returns a Timestamp representing the given number value, provided that it is a finite number. Otherwise, zero is returned.
 *
 * @method
 * @param {number} value the number in question.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromNumber = function (value) {
  return new Timestamp(long_1.fromNumber(value));
};

/**
 * Returns a Timestamp for the given high and low bits. Each is assumed to use 32 bits.
 *
 * @method
 * @param {number} lowBits the low 32-bits.
 * @param {number} highBits the high 32-bits.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromBits = function (lowBits, highBits) {
  return new Timestamp(lowBits, highBits);
};

/**
 * Returns a Timestamp from the given string, optionally using the given radix.
 *
 * @method
 * @param {String} str the textual representation of the Timestamp.
 * @param {number} [opt_radix] the radix in which the text is written.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromString = function (str, opt_radix) {
  return new Timestamp(long_1.fromString(str, opt_radix));
};

var timestamp = Timestamp;
var Timestamp_1 = Timestamp;
timestamp.Timestamp = Timestamp_1;

/*
The MIT License (MIT)

Copyright (c) 2016 CoderPuppy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var _endianness;
function endianness() {
  if (typeof _endianness === 'undefined') {
    var a = new ArrayBuffer(2);
    var b = new Uint8Array(a);
    var c = new Uint16Array(a);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = 'BE';
    } else if (c[0] === 513) {
      _endianness = 'LE';
    } else {
      throw new Error('unable to figure out endianess');
    }
  }
  return _endianness;
}

function hostname() {
  if (typeof global.location !== 'undefined') {
    return global.location.hostname;
  } else return '';
}

function loadavg() {
  return [];
}

function uptime() {
  return 0;
}

function freemem() {
  return Number.MAX_VALUE;
}

function totalmem() {
  return Number.MAX_VALUE;
}

function cpus() {
  return [];
}

function type() {
  return 'Browser';
}

function release() {
  if (typeof global.navigator !== 'undefined') {
    return global.navigator.appVersion;
  }
  return '';
}

function networkInterfaces() {}
function getNetworkInterfaces() {}

function arch() {
  return 'javascript';
}

function platform() {
  return 'browser';
}

function tmpDir() {
  return '/tmp';
}
var tmpdir = tmpDir;

var EOL = '\n';
var os = {
  EOL: EOL,
  tmpdir: tmpdir,
  tmpDir: tmpDir,
  networkInterfaces: networkInterfaces,
  getNetworkInterfaces: getNetworkInterfaces,
  release: release,
  type: type,
  cpus: cpus,
  totalmem: totalmem,
  freemem: freemem,
  uptime: uptime,
  loadavg: loadavg,
  hostname: hostname,
  endianness: endianness
};

var os$1 = Object.freeze({
	endianness: endianness,
	hostname: hostname,
	loadavg: loadavg,
	uptime: uptime,
	freemem: freemem,
	totalmem: totalmem,
	cpus: cpus,
	type: type,
	release: release,
	networkInterfaces: networkInterfaces,
	getNetworkInterfaces: getNetworkInterfaces,
	arch: arch,
	platform: platform,
	tmpDir: tmpDir,
	tmpdir: tmpdir,
	EOL: EOL,
	default: os
});

var Buffer = require$$0.Buffer;

var MASK_8 = 0xff;
var MASK_24 = 0xffffff;
var MASK_32 = 0xffffffff;

// See http://www.isthe.com/chongo/tech/comp/fnv/#FNV-param for the definition of these parameters;
var FNV_PRIME = new long_1(16777619, 0);
var OFFSET_BASIS = new long_1(2166136261, 0);
var FNV_MASK = new long_1(MASK_32, 0);

/**
 * Implementation of the FNV-1a hash for a 32-bit hash value
 * Algorithm can be found here: http://www.isthe.com/chongo/tech/comp/fnv/#FNV-1a
 * @ignore
 */
function fnv1a32(input, encoding) {
  encoding = encoding || 'utf8';
  var octets = Buffer.from(input, encoding);

  var hash = OFFSET_BASIS;
  for (var i = 0; i < octets.length; i += 1) {
    hash = hash.xor(new long_1(octets[i], 0));
    hash = hash.multiply(FNV_PRIME);
    hash = hash.and(FNV_MASK);
  }
  return hash.getLowBitsUnsigned();
}

/**
 * Implements FNV-1a to generate 32-bit hash, then uses xor-folding
 * to convert to a 24-bit hash. See here for more info:
 * http://www.isthe.com/chongo/tech/comp/fnv/#xor-fold
 * @ignore
 */
function fnv1a24(input, encoding) {
  var _32bit = fnv1a32(input, encoding);
  var base = _32bit & MASK_24;
  var top = _32bit >>> 24 & MASK_8;
  var final = (base ^ top) & MASK_24;

  return final;
}

var fnv1a = { fnv1a24: fnv1a24, fnv1a32: fnv1a32 };

var require$$1 = ( os$1 && os ) || os$1;

var Buffer$1 = require$$0.Buffer;
var hostname$1 = require$$1.hostname;
var fnv1a24$1 = fnv1a.fnv1a24;

/**
 * Machine id.
 *
 * Create a random 3-byte value (i.e. unique for this
 * process). Other drivers use a md5 of the machine id here, but
 * that would mean an asyc call to gethostname, so we don't bother.
 * @ignore
 */
var MACHINE_ID = fnv1a24$1(hostname$1);

// Regular expression that checks for hex value
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
var hasBufferType = false;

// Check if buffer exists
try {
  if (Buffer$1 && Buffer$1.from) hasBufferType = true;
} catch (err) {
  hasBufferType = false;
}

/**
 * Create a new ObjectID instance
 *
 * @class
 * @param {(string|number)} id Can be a 24 byte hex string, 12 byte binary string or a Number.
 * @property {number} generationTime The generation time of this ObjectId instance
 * @return {ObjectID} instance of ObjectID.
 */
function ObjectID(id) {
  // Duck-typing to support ObjectId from different npm packages
  if (id instanceof ObjectID) return id;
  if (!(this instanceof ObjectID)) return new ObjectID(id);

  this._bsontype = 'ObjectID';

  // The most common usecase (blank id, new objectId instance)
  if (id == null || typeof id === 'number') {
    // Generate a new id
    this.id = this.generate(id);
    // If we are caching the hex string
    if (ObjectID.cacheHexString) this.__id = this.toString('hex');
    // Return the object
    return;
  }

  // Check if the passed in id is valid
  var valid = ObjectID.isValid(id);

  // Throw an error if it's not a valid setup
  if (!valid && id != null) {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  } else if (valid && typeof id === 'string' && id.length === 24 && hasBufferType) {
    return new ObjectID(new Buffer$1(id, 'hex'));
  } else if (valid && typeof id === 'string' && id.length === 24) {
    return ObjectID.createFromHexString(id);
  } else if (id != null && id.length === 12) {
    // assume 12 byte string
    this.id = id;
  } else if (id != null && id.toHexString) {
    // Duck-typing to support ObjectId from different npm packages
    return id;
  } else {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  }

  if (ObjectID.cacheHexString) this.__id = this.toString('hex');
}

// Allow usage of ObjectId as well as ObjectID
// var ObjectId = ObjectID;

// Precomputed hex table enables speedy hex string conversion
var hexTable = [];
for (var i = 0; i < 256; i++) {
  hexTable[i] = (i <= 15 ? '0' : '') + i.toString(16);
}

/**
 * Return the ObjectID id as a 24 byte hex string representation
 *
 * @method
 * @return {string} return the 24 byte hex string representation.
 */
ObjectID.prototype.toHexString = function () {
  if (ObjectID.cacheHexString && this.__id) return this.__id;

  var hexString = '';
  if (!this.id || !this.id.length) {
    throw new TypeError('invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [' + JSON.stringify(this.id) + ']');
  }

  if (this.id instanceof _Buffer) {
    hexString = convertToHex(this.id);
    if (ObjectID.cacheHexString) this.__id = hexString;
    return hexString;
  }

  for (var i = 0; i < this.id.length; i++) {
    hexString += hexTable[this.id.charCodeAt(i)];
  }

  if (ObjectID.cacheHexString) this.__id = hexString;
  return hexString;
};

/**
 * Update the ObjectID index used in generating new ObjectID's on the driver
 *
 * @method
 * @return {number} returns next index value.
 * @ignore
 */
ObjectID.prototype.get_inc = function () {
  return ObjectID.index = (ObjectID.index + 1) % 0xffffff;
};

/**
 * Update the ObjectID index used in generating new ObjectID's on the driver
 *
 * @method
 * @return {number} returns next index value.
 * @ignore
 */
ObjectID.prototype.getInc = function () {
  return this.get_inc();
};

/**
 * Generate a 12 byte id buffer used in ObjectID's
 *
 * @method
 * @param {number} [time] optional parameter allowing to pass in a second based timestamp.
 * @return {Buffer} return the 12 byte id buffer string.
 */
ObjectID.prototype.generate = function (time) {
  if ('number' !== typeof time) {
    time = ~~(Date.now() / 1000);
  }

  // Use pid
  var pid = (typeof process === 'undefined' || process.pid === 1 ? Math.floor(Math.random() * 100000) : process.pid) % 0xffff;
  var inc = this.get_inc();
  // Buffer used
  var buffer = new Buffer$1(12);
  // Encode time
  buffer[3] = time & 0xff;
  buffer[2] = time >> 8 & 0xff;
  buffer[1] = time >> 16 & 0xff;
  buffer[0] = time >> 24 & 0xff;
  // Encode machine
  buffer[6] = MACHINE_ID & 0xff;
  buffer[5] = MACHINE_ID >> 8 & 0xff;
  buffer[4] = MACHINE_ID >> 16 & 0xff;
  // Encode pid
  buffer[8] = pid & 0xff;
  buffer[7] = pid >> 8 & 0xff;
  // Encode index
  buffer[11] = inc & 0xff;
  buffer[10] = inc >> 8 & 0xff;
  buffer[9] = inc >> 16 & 0xff;
  // Return the buffer
  return buffer;
};

/**
 * Converts the id into a 24 byte hex string for printing
 *
 * @param {String} format The Buffer toString format parameter.
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.toString = function (format) {
  // Is the id a buffer then use the buffer toString method to return the format
  if (this.id && this.id.copy) {
    return this.id.toString(typeof format === 'string' ? format : 'hex');
  }

  // if(this.buffer )
  return this.toHexString();
};

/**
 * Converts to a string representation of this Id.
 *
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.inspect = ObjectID.prototype.toString;

/**
 * Converts to its JSON representation.
 *
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.toJSON = function () {
  return this.toHexString();
};

/**
 * Compares the equality of this ObjectID with `otherID`.
 *
 * @method
 * @param {object} otherID ObjectID instance to compare against.
 * @return {boolean} the result of comparing two ObjectID's
 */
ObjectID.prototype.equals = function equals(otherId) {
  if (otherId instanceof ObjectID) {
    return this.toString() === otherId.toString();
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 12 && this.id instanceof _Buffer) {
    return otherId === this.id.toString('binary');
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 24) {
    return otherId.toLowerCase() === this.toHexString();
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 12) {
    return otherId === this.id;
  } else if (otherId != null && (otherId instanceof ObjectID || otherId.toHexString)) {
    return otherId.toHexString() === this.toHexString();
  } else {
    return false;
  }
};

/**
 * Returns the generation date (accurate up to the second) that this ID was generated.
 *
 * @method
 * @return {date} the generation date
 */
ObjectID.prototype.getTimestamp = function () {
  var timestamp = new Date();
  var time = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
  timestamp.setTime(Math.floor(time) * 1000);
  return timestamp;
};

/**
 * @ignore
 */
ObjectID.index = ~~(Math.random() * 0xffffff);

/**
 * @ignore
 */
ObjectID.createPk = function createPk() {
  return new ObjectID();
};

/**
 * Creates an ObjectID from a second based number, with the rest of the ObjectID zeroed out. Used for comparisons or sorting the ObjectID.
 *
 * @method
 * @param {number} time an integer number representing a number of seconds.
 * @return {ObjectID} return the created ObjectID
 */
ObjectID.createFromTime = function createFromTime(time) {
  var buffer = new Buffer$1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // Encode time into first 4 bytes
  buffer[3] = time & 0xff;
  buffer[2] = time >> 8 & 0xff;
  buffer[1] = time >> 16 & 0xff;
  buffer[0] = time >> 24 & 0xff;
  // Return the new objectId
  return new ObjectID(buffer);
};

// Lookup tables
var decodeLookup = [];
i = 0;
while (i < 10) {
  decodeLookup[0x30 + i] = i++;
}while (i < 16) {
  decodeLookup[0x41 - 10 + i] = decodeLookup[0x61 - 10 + i] = i++;
}var _Buffer = Buffer$1;
var convertToHex = function convertToHex(bytes) {
  return bytes.toString('hex');
};

/**
 * Creates an ObjectID from a hex string representation of an ObjectID.
 *
 * @method
 * @param {string} hexString create a ObjectID from a passed in 24 byte hexstring.
 * @return {ObjectID} return the created ObjectID
 */
ObjectID.createFromHexString = function createFromHexString(string) {
  // Throw an error if it's not a valid setup
  if (typeof string === 'undefined' || string != null && string.length !== 24) {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  }

  // Use Buffer.from method if available
  if (hasBufferType) return new ObjectID(new Buffer$1(string, 'hex'));

  // Calculate lengths
  var array = new _Buffer(12);
  var n = 0;
  var i = 0;

  while (i < 24) {
    array[n++] = decodeLookup[string.charCodeAt(i++)] << 4 | decodeLookup[string.charCodeAt(i++)];
  }

  return new ObjectID(array);
};

/**
 * Checks if a value is a valid bson ObjectId
 *
 * @method
 * @return {boolean} return true if the value is a valid bson ObjectId, return false otherwise.
 */
ObjectID.isValid = function isValid(id) {
  if (id == null) return false;

  if (typeof id === 'number') {
    return true;
  }

  if (typeof id === 'string') {
    return id.length === 12 || id.length === 24 && checkForHexRegExp.test(id);
  }

  if (id instanceof ObjectID) {
    return true;
  }

  if (id instanceof _Buffer) {
    return true;
  }

  // Duck-Typing detection of ObjectId like objects
  if (id.toHexString) {
    return id.id.length === 12 || id.id.length === 24 && checkForHexRegExp.test(id.id);
  }

  return false;
};

/**
 * @ignore
 */
Object.defineProperty(ObjectID.prototype, 'generationTime', {
  enumerable: true,
  get: function get() {
    return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
  },
  set: function set(value) {
    // Encode time into first 4 bytes
    this.id[3] = value & 0xff;
    this.id[2] = value >> 8 & 0xff;
    this.id[1] = value >> 16 & 0xff;
    this.id[0] = value >> 24 & 0xff;
  }
});

/**
 * Expose.
 */
var objectid = ObjectID;
var ObjectID_1 = ObjectID;
var ObjectId = ObjectID;
objectid.ObjectID = ObjectID_1;
objectid.ObjectId = ObjectId;

function alphabetize(str) {
  return str.split('').sort().join('');
}

/**
 * A class representation of the BSON RegExp type.
 *
 * @class
 * @return {BSONRegExp} A MinKey instance
 */
function BSONRegExp(pattern, options) {
  if (!(this instanceof BSONRegExp)) return new BSONRegExp(pattern, options);

  // Execute
  this._bsontype = 'BSONRegExp';
  this.pattern = pattern || '';
  this.options = options ? alphabetize(options) : '';

  // Validate options
  for (var i = 0; i < this.options.length; i++) {
    if (!(this.options[i] === 'i' || this.options[i] === 'm' || this.options[i] === 'x' || this.options[i] === 'l' || this.options[i] === 's' || this.options[i] === 'u')) {
      throw new Error('the regular expression options [' + this.options[i] + '] is not supported');
    }
  }
}

var regexp = BSONRegExp;
var BSONRegExp_1 = BSONRegExp;
regexp.BSONRegExp = BSONRegExp_1;

/**
 * A class representation of the BSON Symbol type.
 *
 * @class
 * @deprecated
 * @param {string} value the string representing the symbol.
 * @return {Symbol}
 */

function _Symbol(value) {
  if (!(this instanceof _Symbol)) return new _Symbol(value);
  this._bsontype = 'Symbol';
  this.value = value;
}

/**
 * Access the wrapped string value.
 *
 * @method
 * @return {String} returns the wrapped string.
 */
_Symbol.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.toString = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.inspect = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.toJSON = function () {
  return this.value;
};

var symbol = _Symbol;
var Symbol_1 = _Symbol;
symbol.Symbol = Symbol_1;

/**
 * A class representation of a BSON Int32 type.
 *
 * @class
 * @param {number} value the number we want to represent as an int32.
 * @return {Int32}
 */

function Int32(value) {
  if (!(this instanceof Int32)) return new Int32(value);

  this._bsontype = 'Int32';
  this.value = value;
}

/**
 * Access the number value.
 *
 * @method
 * @return {number} returns the wrapped int32 number.
 */
Int32.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
Int32.prototype.toJSON = function () {
  return this.value;
};

var int_32 = Int32;
var Int32_1 = Int32;
int_32.Int32 = Int32_1;

/**
 * A class representation of the BSON Code type.
 *
 * @class
 * @param {(string|function)} code a string or function.
 * @param {Object} [scope] an optional scope for the function.
 * @return {Code}
 */

function Code(code, scope) {
  if (!(this instanceof Code)) return new Code(code, scope);
  this._bsontype = 'Code';
  this.code = code;
  this.scope = scope;
}

/**
 * @ignore
 */
Code.prototype.toJSON = function () {
  return { scope: this.scope, code: this.code };
};

var code = Code;
var Code_1 = Code;
code.Code = Code_1;

var Buffer$2 = require$$0.Buffer;

var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;

var EXPONENT_MAX = 6111;
var EXPONENT_MIN = -6176;
var EXPONENT_BIAS = 6176;
var MAX_DIGITS = 34;

// Nan value bits as 32 bit values (due to lack of longs)
var NAN_BUFFER = [0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
// Infinity value bits 32 bit values (due to lack of longs)
var INF_NEGATIVE_BUFFER = [0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
var INF_POSITIVE_BUFFER = [0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();

var EXPONENT_REGEX = /^([-+])?(\d+)?$/;

// Detect if the value is a digit
var isDigit = function isDigit(value) {
  return !isNaN(parseInt(value, 10));
};

// Divide two uint128 values
var divideu128 = function divideu128(value) {
  var DIVISOR = long_1.fromNumber(1000 * 1000 * 1000);
  var _rem = long_1.fromNumber(0);

  if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
    return { quotient: value, rem: _rem };
  }

  for (var i = 0; i <= 3; i++) {
    // Adjust remainder to match value of next dividend
    _rem = _rem.shiftLeft(32);
    // Add the divided to _rem
    _rem = _rem.add(new long_1(value.parts[i], 0));
    value.parts[i] = _rem.div(DIVISOR).low_;
    _rem = _rem.modulo(DIVISOR);
  }

  return { quotient: value, rem: _rem };
};

// Multiply two Long values and return the 128 bit value
var multiply64x2 = function multiply64x2(left, right) {
  if (!left && !right) {
    return { high: long_1.fromNumber(0), low: long_1.fromNumber(0) };
  }

  var leftHigh = left.shiftRightUnsigned(32);
  var leftLow = new long_1(left.getLowBits(), 0);
  var rightHigh = right.shiftRightUnsigned(32);
  var rightLow = new long_1(right.getLowBits(), 0);

  var productHigh = leftHigh.multiply(rightHigh);
  var productMid = leftHigh.multiply(rightLow);
  var productMid2 = leftLow.multiply(rightHigh);
  var productLow = leftLow.multiply(rightLow);

  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productMid = new long_1(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));

  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productLow = productMid.shiftLeft(32).add(new long_1(productLow.getLowBits(), 0));

  // Return the 128 bit result
  return { high: productHigh, low: productLow };
};

var lessThan = function lessThan(left, right) {
  // Make values unsigned
  var uhleft = left.high_ >>> 0;
  var uhright = right.high_ >>> 0;

  // Compare high bits first
  if (uhleft < uhright) {
    return true;
  } else if (uhleft === uhright) {
    var ulleft = left.low_ >>> 0;
    var ulright = right.low_ >>> 0;
    if (ulleft < ulright) return true;
  }

  return false;
};

var invalidErr = function invalidErr(string, message) {
  throw new TypeError('"${string}" not a valid Decimal128 string - ' + message);
};

/**
 * A class representation of the BSON Decimal128 type.
 *
 * @class
 * @param {Buffer} bytes a buffer containing the raw Decimal128 bytes.
 * @return {Double}
 */
function Decimal128(bytes) {
  this._bsontype = 'Decimal128';
  this.bytes = bytes;
}

/**
 * Create a Decimal128 instance from a string representation
 *
 * @method
 * @param {string} string a numeric string representation.
 * @return {Decimal128} returns a Decimal128 instance.
 */
Decimal128.fromString = function (string) {
  // Parse state tracking
  var isNegative = false;
  var sawRadix = false;
  var foundNonZero = false;

  // Total number of significant digits (no leading or trailing zero)
  var significantDigits = 0;
  // Total number of significand digits read
  var nDigitsRead = 0;
  // Total number of digits (no leading zeros)
  var nDigits = 0;
  // The number of the digits after radix
  var radixPosition = 0;
  // The index of the first non-zero in *str*
  var firstNonZero = 0;

  // Digits Array
  var digits = [0];
  // The number of digits in digits
  var nDigitsStored = 0;
  // Insertion pointer for digits
  var digitsInsert = 0;
  // The index of the first non-zero digit
  var firstDigit = 0;
  // The index of the last digit
  var lastDigit = 0;

  // Exponent
  var exponent = 0;
  // loop index over array
  var i = 0;
  // The high 17 digits of the significand
  var significandHigh = [0, 0];
  // The low 17 digits of the significand
  var significandLow = [0, 0];
  // The biased exponent
  var biasedExponent = 0;

  // Read index
  var index = 0;

  // Naively prevent against REDOS attacks.
  // TODO: implementing a custom parsing for this, or refactoring the regex would yield
  //       further gains.
  if (string.length >= 7000) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  }

  // Results
  var stringMatch = string.match(PARSE_STRING_REGEXP);
  var infMatch = string.match(PARSE_INF_REGEXP);
  var nanMatch = string.match(PARSE_NAN_REGEXP);

  // Validate the string
  if (!stringMatch && !infMatch && !nanMatch || string.length === 0) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  }

  if (stringMatch) {
    // full_match = stringMatch[0]
    // sign = stringMatch[1]

    var unsignedNumber = stringMatch[2];
    // stringMatch[3] is undefined if a whole number (ex "1", 12")
    // but defined if a number w/ decimal in it (ex "1.0, 12.2")

    var e = stringMatch[4];
    var expSign = stringMatch[5];
    var expNumber = stringMatch[6];

    // they provided e, but didn't give an exponent number. for ex "1e"
    if (e && expNumber === undefined) invalidErr(string, 'missing exponent power');

    // they provided e, but didn't give a number before it. for ex "e1"
    if (e && unsignedNumber === undefined) invalidErr(string, 'missing exponent base');

    if (e === undefined && (expSign || expNumber)) {
      invalidErr(string, 'missing e before exponent');
    }
  }

  // Get the negative or positive sign
  if (string[index] === '+' || string[index] === '-') {
    isNegative = string[index++] === '-';
  }

  // Check if user passed Infinity or NaN
  if (!isDigit(string[index]) && string[index] !== '.') {
    if (string[index] === 'i' || string[index] === 'I') {
      return new Decimal128(new Buffer$2(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
    } else if (string[index] === 'N') {
      return new Decimal128(new Buffer$2(NAN_BUFFER));
    }
  }

  // Read all the digits
  while (isDigit(string[index]) || string[index] === '.') {
    if (string[index] === '.') {
      if (sawRadix) invalidErr(string, 'contains multiple periods');

      sawRadix = true;
      index = index + 1;
      continue;
    }

    if (nDigitsStored < 34) {
      if (string[index] !== '0' || foundNonZero) {
        if (!foundNonZero) {
          firstNonZero = nDigitsRead;
        }

        foundNonZero = true;

        // Only store 34 digits
        digits[digitsInsert++] = parseInt(string[index], 10);
        nDigitsStored = nDigitsStored + 1;
      }
    }

    if (foundNonZero) nDigits = nDigits + 1;
    if (sawRadix) radixPosition = radixPosition + 1;

    nDigitsRead = nDigitsRead + 1;
    index = index + 1;
  }

  if (sawRadix && !nDigitsRead) throw new TypeError('' + string + ' not a valid Decimal128 string');

  // Read exponent if exists
  if (string[index] === 'e' || string[index] === 'E') {
    // Read exponent digits
    var match = string.substr(++index).match(EXPONENT_REGEX);

    // No digits read
    if (!match || !match[2]) return new Decimal128(new Buffer$2(NAN_BUFFER));

    // Get exponent
    exponent = parseInt(match[0], 10);

    // Adjust the index
    index = index + match[0].length;
  }

  // Return not a number
  if (string[index]) return new Decimal128(new Buffer$2(NAN_BUFFER));

  // Done reading input
  // Find first non-zero digit in digits
  firstDigit = 0;

  if (!nDigitsStored) {
    firstDigit = 0;
    lastDigit = 0;
    digits[0] = 0;
    nDigits = 1;
    nDigitsStored = 1;
    significantDigits = 0;
  } else {
    lastDigit = nDigitsStored - 1;
    significantDigits = nDigits;
    if (significantDigits !== 1) {
      while (string[firstNonZero + significantDigits - 1] === '0') {
        significantDigits = significantDigits - 1;
      }
    }
  }

  // Normalization of exponent
  // Correct exponent based on radix position, and shift significand as needed
  // to represent user input

  // Overflow prevention
  if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
    exponent = EXPONENT_MIN;
  } else {
    exponent = exponent - radixPosition;
  }

  // Attempt to normalize the exponent
  while (exponent > EXPONENT_MAX) {
    // Shift exponent to significand and decrease
    lastDigit = lastDigit + 1;

    if (lastDigit - firstDigit > MAX_DIGITS) {
      // Check if we have a zero then just hard clamp, otherwise fail
      var digitsString = digits.join('');
      if (digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }
      invalidErr(string, 'overflow');
    }
    exponent = exponent - 1;
  }

  while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
    // Shift last digit. can only do this if < significant digits than # stored.
    if (lastDigit === 0 && significantDigits < nDigitsStored) {
      exponent = EXPONENT_MIN;
      significantDigits = 0;
      break;
    }

    if (nDigitsStored < nDigits) {
      // adjust to match digits not stored
      nDigits = nDigits - 1;
    } else {
      // adjust to round
      lastDigit = lastDigit - 1;
    }

    if (exponent < EXPONENT_MAX) {
      exponent = exponent + 1;
    } else {
      // Check if we have a zero then just hard clamp, otherwise fail
      digitsString = digits.join('');
      if (digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }
      invalidErr(string, 'overflow');
    }
  }

  // Round
  // We've normalized the exponent, but might still need to round.
  if (lastDigit - firstDigit + 1 < significantDigits) {
    var endOfString = nDigitsRead;

    // If we have seen a radix point, 'string' is 1 longer than we have
    // documented with ndigits_read, so inc the position of the first nonzero
    // digit and the position that digits are read to.
    if (sawRadix) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    }
    // if negative, we need to increment again to account for - sign at start.
    if (isNegative) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    }

    var roundDigit = parseInt(string[firstNonZero + lastDigit + 1], 10);
    var roundBit = 0;

    if (roundDigit >= 5) {
      roundBit = 1;
      if (roundDigit === 5) {
        roundBit = digits[lastDigit] % 2 === 1;
        for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
          if (parseInt(string[i], 10)) {
            roundBit = 1;
            break;
          }
        }
      }
    }

    if (roundBit) {
      var dIdx = lastDigit;

      for (; dIdx >= 0; dIdx--) {
        if (++digits[dIdx] > 9) {
          digits[dIdx] = 0;

          // overflowed most significant digit
          if (dIdx === 0) {
            if (exponent < EXPONENT_MAX) {
              exponent = exponent + 1;
              digits[dIdx] = 1;
            } else {
              return new Decimal128(new Buffer$2(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            }
          }
        }
      }
    }
  }

  // Encode significand
  // The high 17 digits of the significand
  significandHigh = long_1.fromNumber(0);
  // The low 17 digits of the significand
  significandLow = long_1.fromNumber(0);

  // read a zero
  if (significantDigits === 0) {
    significandHigh = long_1.fromNumber(0);
    significandLow = long_1.fromNumber(0);
  } else if (lastDigit - firstDigit < 17) {
    dIdx = firstDigit;
    significandLow = long_1.fromNumber(digits[dIdx++]);
    significandHigh = new long_1(0, 0);

    for (; dIdx <= lastDigit; dIdx++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[dIdx]));
    }
  } else {
    dIdx = firstDigit;
    significandHigh = long_1.fromNumber(digits[dIdx++]);

    for (; dIdx <= lastDigit - 17; dIdx++) {
      significandHigh = significandHigh.multiply(long_1.fromNumber(10));
      significandHigh = significandHigh.add(long_1.fromNumber(digits[dIdx]));
    }

    significandLow = long_1.fromNumber(digits[dIdx++]);

    for (; dIdx <= lastDigit; dIdx++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[dIdx]));
    }
  }

  var significand = multiply64x2(significandHigh, long_1.fromString('100000000000000000'));

  significand.low = significand.low.add(significandLow);

  if (lessThan(significand.low, significandLow)) {
    significand.high = significand.high.add(long_1.fromNumber(1));
  }

  // Biased exponent
  biasedExponent = exponent + EXPONENT_BIAS;
  var dec = { low: long_1.fromNumber(0), high: long_1.fromNumber(0) };

  // Encode combination, exponent, and significand.
  if (significand.high.shiftRightUnsigned(49).and(long_1.fromNumber(1)).equals(long_1.fromNumber)) {
    // Encode '11' into bits 1 to 3
    dec.high = dec.high.or(long_1.fromNumber(0x3).shiftLeft(61));
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent).and(long_1.fromNumber(0x3fff).shiftLeft(47)));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x7fffffffffff)));
  } else {
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent & 0x3fff).shiftLeft(49));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x1ffffffffffff)));
  }

  dec.low = significand.low;

  // Encode sign
  if (isNegative) {
    dec.high = dec.high.or(long_1.fromString('9223372036854775808'));
  }

  // Encode into a buffer
  var buffer = new Buffer$2(16);
  index = 0;

  // Encode the low 64 bits of the decimal
  // Encode low bits
  buffer[index++] = dec.low.low_ & 0xff;
  buffer[index++] = dec.low.low_ >> 8 & 0xff;
  buffer[index++] = dec.low.low_ >> 16 & 0xff;
  buffer[index++] = dec.low.low_ >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = dec.low.high_ & 0xff;
  buffer[index++] = dec.low.high_ >> 8 & 0xff;
  buffer[index++] = dec.low.high_ >> 16 & 0xff;
  buffer[index++] = dec.low.high_ >> 24 & 0xff;

  // Encode the high 64 bits of the decimal
  // Encode low bits
  buffer[index++] = dec.high.low_ & 0xff;
  buffer[index++] = dec.high.low_ >> 8 & 0xff;
  buffer[index++] = dec.high.low_ >> 16 & 0xff;
  buffer[index++] = dec.high.low_ >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = dec.high.high_ & 0xff;
  buffer[index++] = dec.high.high_ >> 8 & 0xff;
  buffer[index++] = dec.high.high_ >> 16 & 0xff;
  buffer[index++] = dec.high.high_ >> 24 & 0xff;

  // Return the new Decimal128
  return new Decimal128(buffer);
};

// Extract least significant 5 bits
var COMBINATION_MASK = 0x1f;
// Extract least significant 14 bits
var EXPONENT_MASK = 0x3fff;
// Value of combination field for Inf
var COMBINATION_INFINITY = 30;
// Value of combination field for NaN
var COMBINATION_NAN = 31;
// Value of combination field for NaN
// var COMBINATION_SNAN = 32;
// decimal128 exponent bias
EXPONENT_BIAS = 6176;

/**
 * Create a string representation of the raw Decimal128 value
 *
 * @method
 * @return {string} returns a Decimal128 string representation.
 */
Decimal128.prototype.toString = function () {
  // Note: bits in this routine are referred to starting at 0,
  // from the sign bit, towards the coefficient.

  // bits 0 - 31
  var high;
  // bits 32 - 63
  var midh;
  // bits 64 - 95
  var midl;
  // bits 96 - 127
  var low;
  // bits 1 - 5
  var combination;
  // decoded biased exponent (14 bits)
  var biased_exponent;
  // the number of significand digits
  var significand_digits = 0;
  // the base-10 digits in the significand
  var significand = new Array(36);
  for (var i = 0; i < significand.length; i++) {
    significand[i] = 0;
  } // read pointer into significand
  var index = 0;

  // unbiased exponent
  var exponent;
  // the exponent if scientific notation is used
  var scientific_exponent;

  // true if the number is zero
  var is_zero = false;

  // the most signifcant significand bits (50-46)
  var significand_msb;
  // temporary storage for significand decoding
  var significand128 = { parts: new Array(4) };
  // indexing variables
  var j, k;

  // Output string
  var string = [];

  // Unpack index
  index = 0;

  // Buffer reference
  var buffer = this.bytes;

  // Unpack the low 64bits into a long
  low = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
  midl = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Unpack the high 64bits into a long
  midh = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
  high = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Unpack index
  index = 0;

  // Create the state of the decimal
  var dec = {
    low: new long_1(low, midl),
    high: new long_1(midh, high)
  };

  if (dec.high.lessThan(long_1.ZERO)) {
    string.push('-');
  }

  // Decode combination field and exponent
  combination = high >> 26 & COMBINATION_MASK;

  if (combination >> 3 === 3) {
    // Check for 'special' values
    if (combination === COMBINATION_INFINITY) {
      return string.join('') + 'Infinity';
    } else if (combination === COMBINATION_NAN) {
      return 'NaN';
    } else {
      biased_exponent = high >> 15 & EXPONENT_MASK;
      significand_msb = 0x08 + (high >> 14 & 0x01);
    }
  } else {
    significand_msb = high >> 14 & 0x07;
    biased_exponent = high >> 17 & EXPONENT_MASK;
  }

  exponent = biased_exponent - EXPONENT_BIAS;

  // Create string of significand digits

  // Convert the 114-bit binary number represented by
  // (significand_high, significand_low) to at most 34 decimal
  // digits through modulo and division.
  significand128.parts[0] = (high & 0x3fff) + ((significand_msb & 0xf) << 14);
  significand128.parts[1] = midh;
  significand128.parts[2] = midl;
  significand128.parts[3] = low;

  if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
    is_zero = true;
  } else {
    for (k = 3; k >= 0; k--) {
      var least_digits = 0;
      // Peform the divide
      var result = divideu128(significand128);
      significand128 = result.quotient;
      least_digits = result.rem.low_;

      // We now have the 9 least significant digits (in base 2).
      // Convert and output to string.
      if (!least_digits) continue;

      for (j = 8; j >= 0; j--) {
        // significand[k * 9 + j] = Math.round(least_digits % 10);
        significand[k * 9 + j] = least_digits % 10;
        // least_digits = Math.round(least_digits / 10);
        least_digits = Math.floor(least_digits / 10);
      }
    }
  }

  // Output format options:
  // Scientific - [-]d.dddE(+/-)dd or [-]dE(+/-)dd
  // Regular    - ddd.ddd

  if (is_zero) {
    significand_digits = 1;
    significand[index] = 0;
  } else {
    significand_digits = 36;
    i = 0;

    while (!significand[index]) {
      i++;
      significand_digits = significand_digits - 1;
      index = index + 1;
    }
  }

  scientific_exponent = significand_digits - 1 + exponent;

  // The scientific exponent checks are dictated by the string conversion
  // specification and are somewhat arbitrary cutoffs.
  //
  // We must check exponent > 0, because if this is the case, the number
  // has trailing zeros.  However, we *cannot* output these trailing zeros,
  // because doing so would change the precision of the value, and would
  // change stored data if the string converted number is round tripped.
  if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
    // Scientific format

    // if there are too many significant digits, we should just be treating numbers
    // as + or - 0 and using the non-scientific exponent (this is for the "invalid
    // representation should be treated as 0/-0" spec cases in decimal128-1.json)
    if (significand_digits > 34) {
      string.push(0);
      if (exponent > 0) string.push('E+' + exponent);else if (exponent < 0) string.push('E' + exponent);
      return string.join('');
    }

    string.push(significand[index++]);
    significand_digits = significand_digits - 1;

    if (significand_digits) {
      string.push('.');
    }

    for (i = 0; i < significand_digits; i++) {
      string.push(significand[index++]);
    }

    // Exponent
    string.push('E');
    if (scientific_exponent > 0) {
      string.push('+' + scientific_exponent);
    } else {
      string.push(scientific_exponent);
    }
  } else {
    // Regular format with no decimal place
    if (exponent >= 0) {
      for (i = 0; i < significand_digits; i++) {
        string.push(significand[index++]);
      }
    } else {
      var radix_position = significand_digits + exponent;

      // non-zero digits before radix
      if (radix_position > 0) {
        for (i = 0; i < radix_position; i++) {
          string.push(significand[index++]);
        }
      } else {
        string.push('0');
      }

      string.push('.');
      // add leading zeros after radix
      while (radix_position++ < 0) {
        string.push('0');
      }

      for (i = 0; i < significand_digits - Math.max(radix_position - 1, 0); i++) {
        string.push(significand[index++]);
      }
    }
  }

  return string.join('');
};

Decimal128.prototype.toJSON = function () {
  return { $numberDecimal: this.toString() };
};

var decimal128 = Decimal128;
var Decimal128_1 = Decimal128;
decimal128.Decimal128 = Decimal128_1;

/**
 * A class representation of the BSON MinKey type.
 *
 * @class
 * @return {MinKey} A MinKey instance
 */

function MinKey() {
  if (!(this instanceof MinKey)) return new MinKey();

  this._bsontype = 'MinKey';
}

var min_key = MinKey;
var MinKey_1 = MinKey;
min_key.MinKey = MinKey_1;

/**
 * A class representation of the BSON MaxKey type.
 *
 * @class
 * @return {MaxKey} A MaxKey instance
 */

function MaxKey() {
  if (!(this instanceof MaxKey)) return new MaxKey();

  this._bsontype = 'MaxKey';
}

var max_key = MaxKey;
var MaxKey_1 = MaxKey;
max_key.MaxKey = MaxKey_1;

/**
 * A class representation of the BSON DBRef type.
 *
 * @class
 * @param {string} collection the collection name.
 * @param {ObjectID} oid the reference ObjectID.
 * @param {string} [db] optional db name, if omitted the reference is local to the current db.
 * @return {DBRef}
 */

function DBRef(collection, oid, db, fields) {
  if (!(this instanceof DBRef)) return new DBRef(collection, oid, db, fields);

  // check if namespace has been provided
  var parts = collection.split('.');
  if (parts.length === 2) {
    db = parts.shift();
    collection = parts.shift();
  }

  this._bsontype = 'DBRef';
  this.collection = collection;
  this.oid = oid;
  this.db = db;
  this.fields = fields || {};
}

/**
 * @ignore
 * @api private
 */
DBRef.prototype.toJSON = function () {
  var o = {
    $ref: this.collection,
    $id: this.oid
  };

  if (this.db != null) o.$db = this.db;
  o = Object.assign(o, this.fields);
  return o;
};

var db_ref = DBRef;
var DBRef_1 = DBRef;
db_ref.DBRef = DBRef_1;

var Buffer$3 = require$$0.Buffer;

/**
 * Module dependencies.
 * @ignore
 */

/**
 * A class representation of the BSON Binary type.
 *
 * Sub types
 *  - **BSON.BSON_BINARY_SUBTYPE_DEFAULT**, default BSON type.
 *  - **BSON.BSON_BINARY_SUBTYPE_FUNCTION**, BSON function type.
 *  - **BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY**, BSON byte array type.
 *  - **BSON.BSON_BINARY_SUBTYPE_UUID**, BSON uuid type.
 *  - **BSON.BSON_BINARY_SUBTYPE_MD5**, BSON md5 type.
 *  - **BSON.BSON_BINARY_SUBTYPE_USER_DEFINED**, BSON user defined type.
 *
 * @class
 * @param {Buffer} buffer a buffer object containing the binary data.
 * @param {Number} [subType] the option binary type.
 * @return {Binary}
 */
function Binary(buffer, subType) {
  if (!(this instanceof Binary)) return new Binary(buffer, subType);

  if (buffer != null && !(typeof buffer === 'string') && !Buffer$3.isBuffer(buffer) && !(buffer instanceof Uint8Array) && !Array.isArray(buffer)) {
    throw new Error('only String, Buffer, Uint8Array or Array accepted');
  }

  this._bsontype = 'Binary';

  if (buffer instanceof Number) {
    this.sub_type = buffer;
    this.position = 0;
  } else {
    this.sub_type = subType == null ? BSON_BINARY_SUBTYPE_DEFAULT : subType;
    this.position = 0;
  }

  if (buffer != null && !(buffer instanceof Number)) {
    // Only accept Buffer, Uint8Array or Arrays
    if (typeof buffer === 'string') {
      // Different ways of writing the length of the string for the different types
      if (typeof Buffer$3 !== 'undefined') {
        this.buffer = new Buffer$3(buffer);
      } else if (typeof Uint8Array !== 'undefined' || Object.prototype.toString.call(buffer) === '[object Array]') {
        this.buffer = writeStringToArray(buffer);
      } else {
        throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
      }
    } else {
      this.buffer = buffer;
    }
    this.position = buffer.length;
  } else {
    if (typeof Buffer$3 !== 'undefined') {
      this.buffer = new Buffer$3(Binary.BUFFER_SIZE);
    } else if (typeof Uint8Array !== 'undefined') {
      this.buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE));
    } else {
      this.buffer = new Array(Binary.BUFFER_SIZE);
    }
    // Set position to start of buffer
    this.position = 0;
  }
}

/**
 * Updates this binary with byte_value.
 *
 * @method
 * @param {string} byte_value a single byte we wish to write.
 */
Binary.prototype.put = function put(byte_value) {
  // If it's a string and a has more than one character throw an error
  if (byte_value['length'] != null && typeof byte_value !== 'number' && byte_value.length !== 1) throw new TypeError('only accepts single character String, Uint8Array or Array');
  if (typeof byte_value !== 'number' && byte_value < 0 || byte_value > 255) throw new TypeError('only accepts number in a valid unsigned byte range 0-255');

  // Decode the byte value once
  var decoded_byte = null;
  if (typeof byte_value === 'string') {
    decoded_byte = byte_value.charCodeAt(0);
  } else if (byte_value['length'] != null) {
    decoded_byte = byte_value[0];
  } else {
    decoded_byte = byte_value;
  }

  if (this.buffer.length > this.position) {
    this.buffer[this.position++] = decoded_byte;
  } else {
    if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
      // Create additional overflow buffer
      var buffer = new Buffer$3(Binary.BUFFER_SIZE + this.buffer.length);
      // Combine the two buffers together
      this.buffer.copy(buffer, 0, 0, this.buffer.length);
      this.buffer = buffer;
      this.buffer[this.position++] = decoded_byte;
    } else {
      buffer = null;
      // Create a new buffer (typed or normal array)
      if (Object.prototype.toString.call(this.buffer) === '[object Uint8Array]') {
        buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE + this.buffer.length));
      } else {
        buffer = new Array(Binary.BUFFER_SIZE + this.buffer.length);
      }

      // We need to copy all the content to the new array
      for (var i = 0; i < this.buffer.length; i++) {
        buffer[i] = this.buffer[i];
      }

      // Reassign the buffer
      this.buffer = buffer;
      // Write the byte
      this.buffer[this.position++] = decoded_byte;
    }
  }
};

/**
 * Writes a buffer or string to the binary.
 *
 * @method
 * @param {(Buffer|string)} string a string or buffer to be written to the Binary BSON object.
 * @param {number} offset specify the binary of where to write the content.
 * @return {null}
 */
Binary.prototype.write = function write(string, offset) {
  offset = typeof offset === 'number' ? offset : this.position;

  // If the buffer is to small let's extend the buffer
  if (this.buffer.length < offset + string.length) {
    var buffer = null;
    // If we are in node.js
    if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
      buffer = new Buffer$3(this.buffer.length + string.length);
      this.buffer.copy(buffer, 0, 0, this.buffer.length);
    } else if (Object.prototype.toString.call(this.buffer) === '[object Uint8Array]') {
      // Create a new buffer
      buffer = new Uint8Array(new ArrayBuffer(this.buffer.length + string.length));
      // Copy the content
      for (var i = 0; i < this.position; i++) {
        buffer[i] = this.buffer[i];
      }
    }

    // Assign the new buffer
    this.buffer = buffer;
  }

  if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(string) && Buffer$3.isBuffer(this.buffer)) {
    string.copy(this.buffer, offset, 0, string.length);
    this.position = offset + string.length > this.position ? offset + string.length : this.position;
    // offset = string.length
  } else if (typeof Buffer$3 !== 'undefined' && typeof string === 'string' && Buffer$3.isBuffer(this.buffer)) {
    this.buffer.write(string, offset, 'binary');
    this.position = offset + string.length > this.position ? offset + string.length : this.position;
    // offset = string.length;
  } else if (Object.prototype.toString.call(string) === '[object Uint8Array]' || Object.prototype.toString.call(string) === '[object Array]' && typeof string !== 'string') {
    for (i = 0; i < string.length; i++) {
      this.buffer[offset++] = string[i];
    }

    this.position = offset > this.position ? offset : this.position;
  } else if (typeof string === 'string') {
    for (i = 0; i < string.length; i++) {
      this.buffer[offset++] = string.charCodeAt(i);
    }

    this.position = offset > this.position ? offset : this.position;
  }
};

/**
 * Reads **length** bytes starting at **position**.
 *
 * @method
 * @param {number} position read from the given position in the Binary.
 * @param {number} length the number of bytes to read.
 * @return {Buffer}
 */
Binary.prototype.read = function read(position, length) {
  length = length && length > 0 ? length : this.position;

  // Let's return the data based on the type we have
  if (this.buffer['slice']) {
    return this.buffer.slice(position, position + length);
  } else {
    // Create a buffer to keep the result
    var buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(length)) : new Array(length);
    for (var i = 0; i < length; i++) {
      buffer[i] = this.buffer[position++];
    }
  }
  // Return the buffer
  return buffer;
};

/**
 * Returns the value of this binary as a string.
 *
 * @method
 * @return {string}
 */
Binary.prototype.value = function value(asRaw) {
  asRaw = asRaw == null ? false : asRaw;

  // Optimize to serialize for the situation where the data == size of buffer
  if (asRaw && typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;

  // If it's a node.js buffer object
  if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
    return asRaw ? this.buffer.slice(0, this.position) : this.buffer.toString('binary', 0, this.position);
  } else {
    if (asRaw) {
      // we support the slice command use it
      if (this.buffer['slice'] != null) {
        return this.buffer.slice(0, this.position);
      } else {
        // Create a new buffer to copy content to
        var newBuffer = Object.prototype.toString.call(this.buffer) === '[object Uint8Array]' ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position);
        // Copy content
        for (var i = 0; i < this.position; i++) {
          newBuffer[i] = this.buffer[i];
        }
        // Return the buffer
        return newBuffer;
      }
    } else {
      return convertArraytoUtf8BinaryString(this.buffer, 0, this.position);
    }
  }
};

/**
 * Length.
 *
 * @method
 * @return {number} the length of the binary.
 */
Binary.prototype.length = function length() {
  return this.position;
};

/**
 * @ignore
 */
Binary.prototype.toJSON = function () {
  return this.buffer != null ? this.buffer.toString('base64') : '';
};

/**
 * @ignore
 */
Binary.prototype.toString = function (format) {
  return this.buffer != null ? this.buffer.slice(0, this.position).toString(format) : '';
};

/**
 * Binary default subtype
 * @ignore
 */
var BSON_BINARY_SUBTYPE_DEFAULT = 0;

/**
 * @ignore
 */
var writeStringToArray = function writeStringToArray(data) {
  // Create a buffer
  var buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(data.length)) : new Array(data.length);
  // Write the content to the buffer
  for (var i = 0; i < data.length; i++) {
    buffer[i] = data.charCodeAt(i);
  }
  // Write the string to the buffer
  return buffer;
};

/**
 * Convert Array ot Uint8Array to Binary String
 *
 * @ignore
 */
var convertArraytoUtf8BinaryString = function convertArraytoUtf8BinaryString(byteArray, startIndex, endIndex) {
  var result = '';
  for (var i = startIndex; i < endIndex; i++) {
    result = result + String.fromCharCode(byteArray[i]);
  }
  return result;
};

Binary.BUFFER_SIZE = 256;

/**
 * Default BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_DEFAULT = 0;
/**
 * Function BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_FUNCTION = 1;
/**
 * Byte Array BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_BYTE_ARRAY = 2;
/**
 * OLD UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_UUID_OLD = 3;
/**
 * UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_UUID = 4;
/**
 * MD5 BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_MD5 = 5;
/**
 * User BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_USER_DEFINED = 128;

/**
 * Expose.
 */
var binary = Binary;
var Binary_1 = Binary;
binary.Binary = Binary_1;

var Buffer$4 = require$$0.Buffer;
var Long$1 = long_1.Long,
    Double$1 = double_1.Double,
    Timestamp$1 = timestamp.Timestamp,
    ObjectID$1 = objectid.ObjectID,
    Code$1 = code.Code,
    MinKey$1 = min_key.MinKey,
    MaxKey$1 = max_key.MaxKey,
    DBRef$1 = db_ref.DBRef,
    BSONRegExp$1 = regexp.BSONRegExp,
    Binary$1 = binary.Binary;

var deserialize = function deserialize(buffer, options, isArray) {
  options = options == null ? {} : options;
  var index = options && options.index ? options.index : 0;
  // Read the document size
  var size = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;

  if (size < 5) {
    throw new Error('bson size must be >= 5, is ' + size);
  }

  if (options.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(buffer) < size) {
    throw new Error('buffer length ' + Buffer$4.byteLength(buffer) + ' must be >= bson size ' + size);
  }

  if (!options.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(buffer) !== size) {
    throw new Error('buffer length ' + Buffer$4.byteLength(buffer) + ' must === bson size ' + size);
  }

  if (size + index > Buffer$4.byteLength(buffer)) {
    throw new Error('(bson size ' + size + ' + options.index ' + index + ' must be <= buffer length ' + Buffer$4.byteLength(buffer) + ')');
  }

  // Illegal end value
  if (buffer[index + size - 1] !== 0) {
    throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  }

  // Start deserializtion
  return deserializeObject(buffer, index, options, isArray);
};

var deserializeObject = function deserializeObject(buffer, index, options, isArray) {
  var evalFunctions = options['evalFunctions'] == null ? false : options['evalFunctions'];
  var cacheFunctions = options['cacheFunctions'] == null ? false : options['cacheFunctions'];
  var cacheFunctionsCrc32 = options['cacheFunctionsCrc32'] == null ? false : options['cacheFunctionsCrc32'];

  if (!cacheFunctionsCrc32) var crc32 = null;

  var fieldsAsRaw = options['fieldsAsRaw'] == null ? null : options['fieldsAsRaw'];

  // Return raw bson buffer instead of parsing it
  var raw = options['raw'] == null ? false : options['raw'];

  // Return BSONRegExp objects instead of native regular expressions
  var bsonRegExp = typeof options['bsonRegExp'] === 'boolean' ? options['bsonRegExp'] : false;

  // Controls the promotion of values vs wrapper classes
  var promoteBuffers = options['promoteBuffers'] == null ? false : options['promoteBuffers'];
  var promoteLongs = options['promoteLongs'] == null ? true : options['promoteLongs'];
  var promoteValues = options['promoteValues'] == null ? true : options['promoteValues'];

  // Set the start index
  var startIndex = index;

  // Validate that we have at least 4 bytes of buffer
  if (Buffer$4.byteLength(buffer) < 5) throw new Error('corrupt bson message < 5 bytes long');

  // Read the document size
  var size = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Ensure buffer is valid size
  if (size < 5 || size > Buffer$4.byteLength(buffer)) throw new Error('corrupt bson message');

  // Create holding object
  var object = isArray ? [] : {};
  // Used for arrays to skip having to perform utf8 decoding
  var arrayIndex = 0,
      done = false;

  // While we have more left data left keep parsing
  while (!done) {
    // Read the type
    var elementType = buffer[index++];

    // If we get a zero it's the last byte, exit
    if (elementType === 0) break;

    // Get the start search index
    var i = index;
    // Locate the end of the c string
    while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
      i++;
    }

    // If are at the end of the buffer there is a problem with the document
    if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
    var name = isArray ? arrayIndex++ : buffer.toString('utf8', index, i);

    index = i + 1;

    if (elementType === BSON.BSON_DATA_STRING) {
      var stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

      var s = buffer.toString('utf8', index, index + stringSize - 1);
      for (i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 0xfffd) {
          throw new Error('Invalid UTF-8 string in BSON document');
        }
      }

      object[name] = s;
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_OID) {
      var oid = new Buffer$4(12);
      buffer.copy(oid, 0, index, index + 12);
      object[name] = new ObjectID$1(oid);
      index = index + 12;
    } else if (elementType === BSON.BSON_DATA_INT && promoteValues === false) {
      object[name] = new int_32(buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24);
    } else if (elementType === BSON.BSON_DATA_INT) {
      object[name] = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
    } else if (elementType === BSON.BSON_DATA_NUMBER && promoteValues === false) {
      object[name] = new Double$1(buffer.readDoubleLE(index));
      index = index + 8;
    } else if (elementType === BSON.BSON_DATA_NUMBER) {
      object[name] = buffer.readDoubleLE(index);
      index = index + 8;
    } else if (elementType === BSON.BSON_DATA_DATE) {
      var lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      object[name] = new Date(new Long$1(lowBits, highBits).toNumber());
    } else if (elementType === BSON.BSON_DATA_BOOLEAN) {
      if (buffer[index] !== 0 && buffer[index] !== 1) throw new Error('illegal boolean type value');
      object[name] = buffer[index++] === 1;
    } else if (elementType === BSON.BSON_DATA_OBJECT) {
      var _index = index;
      var objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      if (objectSize <= 0 || objectSize > Buffer$4.byteLength(buffer) - index) throw new Error('bad embedded document length in bson');

      // We have a raw value
      if (raw) {
        object[name] = buffer.slice(index, index + objectSize);
      } else {
        object[name] = deserializeObject(buffer, _index, options, false);
      }

      index = index + objectSize;
    } else if (elementType === BSON.BSON_DATA_ARRAY) {
      _index = index;
      objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      var arrayOptions = options;

      // Stop index
      var stopIndex = index + objectSize;

      // All elements of array to be returned as raw bson
      if (fieldsAsRaw && fieldsAsRaw[name]) {
        arrayOptions = {};
        for (var n in options) {
          arrayOptions[n] = options[n];
        }arrayOptions['raw'] = true;
      }

      object[name] = deserializeObject(buffer, _index, arrayOptions, true);
      index = index + objectSize;

      if (buffer[index - 1] !== 0) throw new Error('invalid array terminator byte');
      if (index !== stopIndex) throw new Error('corrupted array bson');
    } else if (elementType === BSON.BSON_DATA_UNDEFINED) {
      object[name] = undefined;
    } else if (elementType === BSON.BSON_DATA_NULL) {
      object[name] = null;
    } else if (elementType === BSON.BSON_DATA_LONG) {
      // Unpack the low and high bits
      lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var long = new Long$1(lowBits, highBits);
      // Promote the long if possible
      if (promoteLongs && promoteValues === true) {
        object[name] = long.lessThanOrEqual(JS_INT_MAX_LONG) && long.greaterThanOrEqual(JS_INT_MIN_LONG) ? long.toNumber() : long;
      } else {
        object[name] = long;
      }
    } else if (elementType === BSON.BSON_DATA_DECIMAL128) {
      // Buffer to contain the decimal bytes
      var bytes = new Buffer$4(16);
      // Copy the next 16 bytes into the bytes buffer
      buffer.copy(bytes, 0, index, index + 16);
      // Update index
      index = index + 16;
      // Assign the new Decimal128 value
      var decimal128$$1 = new decimal128(bytes);
      // If we have an alternative mapper use that
      object[name] = decimal128$$1.toObject ? decimal128$$1.toObject() : decimal128$$1;
    } else if (elementType === BSON.BSON_DATA_BINARY) {
      var binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var totalBinarySize = binarySize;
      var subType = buffer[index++];

      // Did we have a negative binary size, throw
      if (binarySize < 0) throw new Error('Negative binary type element size found');

      // Is the length longer than the document
      if (binarySize > Buffer$4.byteLength(buffer)) throw new Error('Binary type size larger than document size');

      // Decode as raw Buffer object if options specifies it
      if (buffer['slice'] != null) {
        // If we have subtype 2 skip the 4 bytes for the size
        if (subType === Binary$1.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        }

        if (promoteBuffers && promoteValues) {
          object[name] = buffer.slice(index, index + binarySize);
        } else {
          object[name] = new Binary$1(buffer.slice(index, index + binarySize), subType);
        }
      } else {
        var _buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(binarySize)) : new Array(binarySize);
        // If we have subtype 2 skip the 4 bytes for the size
        if (subType === Binary$1.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        }

        // Copy the data
        for (i = 0; i < binarySize; i++) {
          _buffer[i] = buffer[index + i];
        }

        if (promoteBuffers && promoteValues) {
          object[name] = _buffer;
        } else {
          object[name] = new Binary$1(_buffer, subType);
        }
      }

      // Update the index
      index = index + binarySize;
    } else if (elementType === BSON.BSON_DATA_REGEXP && bsonRegExp === false) {
      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      var source = buffer.toString('utf8', index, i);
      // Create the regexp
      index = i + 1;

      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      var regExpOptions = buffer.toString('utf8', index, i);
      index = i + 1;

      // For each option add the corresponding one for javascript
      var optionsArray = new Array(regExpOptions.length);

      // Parse options
      for (i = 0; i < regExpOptions.length; i++) {
        switch (regExpOptions[i]) {
          case 'm':
            optionsArray[i] = 'm';
            break;
          case 's':
            optionsArray[i] = 'g';
            break;
          case 'i':
            optionsArray[i] = 'i';
            break;
        }
      }

      object[name] = new RegExp(source, optionsArray.join(''));
    } else if (elementType === BSON.BSON_DATA_REGEXP && bsonRegExp === true) {
      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      source = buffer.toString('utf8', index, i);
      index = i + 1;

      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      regExpOptions = buffer.toString('utf8', index, i);
      index = i + 1;

      // Set the object
      object[name] = new BSONRegExp$1(source, regExpOptions);
    } else if (elementType === BSON.BSON_DATA_SYMBOL) {
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      // symbol is deprecated - upgrade to string.
      object[name] = buffer.toString('utf8', index, index + stringSize - 1);
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_TIMESTAMP) {
      lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

      object[name] = new Timestamp$1(lowBits, highBits);
    } else if (elementType === BSON.BSON_DATA_MIN_KEY) {
      object[name] = new MinKey$1();
    } else if (elementType === BSON.BSON_DATA_MAX_KEY) {
      object[name] = new MaxKey$1();
    } else if (elementType === BSON.BSON_DATA_CODE) {
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      var functionString = buffer.toString('utf8', index, index + stringSize - 1);

      // If we are evaluating the functions
      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          var hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString;
          // Got to do this to avoid V8 deoptimizing the call due to finding eval
          object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
        } else {
          object[name] = isolateEval(functionString);
        }
      } else {
        object[name] = new Code$1(functionString);
      }

      // Update parse index position
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_CODE_W_SCOPE) {
      var totalSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

      // Element cannot be shorter than totalSize + stringSize + documentSize + terminator
      if (totalSize < 4 + 4 + 4 + 1) {
        throw new Error('code_w_scope total size shorter minimum expected length');
      }

      // Get the code string size
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      // Check if we have a valid string
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

      // Javascript function
      functionString = buffer.toString('utf8', index, index + stringSize - 1);
      // Update parse index position
      index = index + stringSize;
      // Parse the element
      _index = index;
      // Decode the size of the object document
      objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      // Decode the scope object
      var scopeObject = deserializeObject(buffer, _index, options, false);
      // Adjust the index
      index = index + objectSize;

      // Check if field length is to short
      if (totalSize < 4 + 4 + objectSize + stringSize) {
        throw new Error('code_w_scope total size is to short, truncating scope');
      }

      // Check if totalSize field is to long
      if (totalSize > 4 + 4 + objectSize + stringSize) {
        throw new Error('code_w_scope total size is to long, clips outer document');
      }

      // If we are evaluating the functions
      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString;
          // Got to do this to avoid V8 deoptimizing the call due to finding eval
          object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
        } else {
          object[name] = isolateEval(functionString);
        }

        object[name].scope = scopeObject;
      } else {
        object[name] = new Code$1(functionString, scopeObject);
      }
    } else if (elementType === BSON.BSON_DATA_DBPOINTER) {
      // Get the code string size
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      // Check if we have a valid string
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      // Namespace
      var namespace = buffer.toString('utf8', index, index + stringSize - 1);
      // Update parse index position
      index = index + stringSize;

      // Read the oid
      var oidBuffer = new Buffer$4(12);
      buffer.copy(oidBuffer, 0, index, index + 12);
      oid = new ObjectID$1(oidBuffer);

      // Update the index
      index = index + 12;
      for (i = 0; i < namespace.length; i++) {
        if (namespace.charCodeAt(i) === 0xfffd) {
          throw new Error('Invalid UTF-8 string in BSON document');
        }
      }

      // Upgrade to DBRef type
      object[name] = new DBRef$1(namespace, oid);
    } else {
      throw new Error('Detected unknown BSON type ' + elementType.toString(16) + ' for fieldname "' + name + '", are you using the latest BSON parser?');
    }
  }

  // Check if the deserialization was against a valid array/object
  if (size !== index - startIndex) {
    if (isArray) throw new Error('corrupt array bson');
    throw new Error('corrupt object bson');
  }

  // check if object's $ keys are those of a DBRef
  var dollarKeys = Object.keys(object).filter(function (k) {
    return k.startsWith('$');
  });
  var valid = true;
  dollarKeys.forEach(function (k) {
    if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
  });

  // if a $key not in "$ref", "$id", "$db", don't make a DBRef
  if (!valid) return object;

  if (object['$id'] != null && object['$ref'] != null) {
    var copy = Object.assign({}, object);
    delete copy.$ref;
    delete copy.$id;
    delete copy.$db;
    return new DBRef$1(object.$ref, object.$id, object.$db || null, copy);
  }

  return object;
};

/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */
var isolateEvalWithHash = function isolateEvalWithHash(functionCache, hash, functionString, object) {
  // Contains the value we are going to set
  var value = null;

  // Check for cache hit, eval if missing and return cached function
  if (functionCache[hash] == null) {
    eval('value = ' + functionString);
    functionCache[hash] = value;
  }
  // Set the object
  return functionCache[hash].bind(object);
};

/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */
var isolateEval = function isolateEval(functionString) {
  // Contains the value we are going to set
  var value = null;
  // Eval the function
  eval('value = ' + functionString);
  return value;
};

var BSON = {};

/**
 * Contains the function cache if we have that enable to allow for avoiding the eval step on each deserialization, comparison is by md5
 *
 * @ignore
 * @api private
 */
var functionCache = BSON.functionCache = {};

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON.BSON_DATA_BINARY = 5;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_UNDEFINED
 **/
BSON.BSON_DATA_UNDEFINED = 6;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_DBPOINTER
 **/
BSON.BSON_DATA_DBPOINTER = 12;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON.BSON_DATA_LONG = 18;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_DECIMAL128
 **/
BSON.BSON_DATA_DECIMAL128 = 19;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON.BSON_DATA_MAX_KEY = 0x7f;

/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// BSON MAX VALUES
BSON.BSON_INT32_MAX = 0x7fffffff;
BSON.BSON_INT32_MIN = -0x80000000;

BSON.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
var JS_INT_MAX_LONG = Long$1.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
var JS_INT_MIN_LONG = Long$1.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

var deserializer = deserialize;

// Copyright (c) 2008, Fair Oaks Labs, Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
//  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//
// Modifications to writeIEEE754 to support negative zeroes made by Brian White

var readIEEE754 = function readIEEE754(buffer, offset, endian, mLen, nBytes) {
  var e,
      m,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = bBE ? 0 : nBytes - 1,
      d = bBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

var writeIEEE754 = function writeIEEE754(buffer, value, offset, endian, mLen, nBytes) {
  var e,
      m,
      c,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      i = bBE ? nBytes - 1 : 0,
      d = bBE ? -1 : 1,
      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  if (isNaN(value)) m = 0;

  while (mLen >= 8) {
    buffer[offset + i] = m & 0xff;
    i += d;
    m /= 256;
    mLen -= 8;
  }

  e = e << mLen | m;

  if (isNaN(value)) e += 8;

  eLen += mLen;

  while (eLen > 0) {
    buffer[offset + i] = e & 0xff;
    i += d;
    e /= 256;
    eLen -= 8;
  }

  buffer[offset + i - d] |= s * 128;
};

var readIEEE754_1 = readIEEE754;
var writeIEEE754_1 = writeIEEE754;

var float_parser = {
  readIEEE754: readIEEE754_1,
  writeIEEE754: writeIEEE754_1
};

/**
 * Normalizes our expected stringified form of a function across versions of node
 * @param {Function} fn The function to stringify
 */

function normalizedFunctionString(fn) {
  return fn.toString().replace(/function(.*)\(/, 'function (');
}

var utils = {
  normalizedFunctionString: normalizedFunctionString
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var Buffer$5 = require$$0.Buffer;
var writeIEEE754$1 = float_parser.writeIEEE754,
    Long$2 = long_1.Long,
    MinKey$2 = min_key.MinKey,
    Binary$2 = binary.Binary;

var normalizedFunctionString$1 = utils.normalizedFunctionString;

// try {
//   var _Buffer = Uint8Array;
// } catch (e) {
//   _Buffer = Buffer;
// }

var regexp$1 = /\x00/; // eslint-disable-line no-control-regex

// To ensure that 0.4 of node works correctly
var isDate = function isDate(d) {
  return (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
};

var isRegExp = function isRegExp(d) {
  return Object.prototype.toString.call(d) === '[object RegExp]';
};

var serializeString = function serializeString(buffer, key, value, index, isArray) {
  // Encode String type
  buffer[index++] = BSON$1.BSON_DATA_STRING;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes + 1;
  buffer[index - 1] = 0;
  // Write the string
  var size = buffer.write(value, index + 4, 'utf8');
  // Write the size of the string to buffer
  buffer[index + 3] = size + 1 >> 24 & 0xff;
  buffer[index + 2] = size + 1 >> 16 & 0xff;
  buffer[index + 1] = size + 1 >> 8 & 0xff;
  buffer[index] = size + 1 & 0xff;
  // Update index
  index = index + 4 + size;
  // Write zero
  buffer[index++] = 0;
  return index;
};

var serializeNumber = function serializeNumber(buffer, key, value, index, isArray) {
  // We have an integer value
  if (Math.floor(value) === value && value >= BSON$1.JS_INT_MIN && value <= BSON$1.JS_INT_MAX) {
    // If the value fits in 32 bits encode as int, if it fits in a double
    // encode it as a double, otherwise long
    if (value >= BSON$1.BSON_INT32_MIN && value <= BSON$1.BSON_INT32_MAX) {
      // Set int type 32 bits or less
      buffer[index++] = BSON$1.BSON_DATA_INT;
      // Number of written bytes
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      // Write the int value
      buffer[index++] = value & 0xff;
      buffer[index++] = value >> 8 & 0xff;
      buffer[index++] = value >> 16 & 0xff;
      buffer[index++] = value >> 24 & 0xff;
    } else if (value >= BSON$1.JS_INT_MIN && value <= BSON$1.JS_INT_MAX) {
      // Encode as double
      buffer[index++] = BSON$1.BSON_DATA_NUMBER;
      // Number of written bytes
      numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      // Write float
      writeIEEE754$1(buffer, value, index, 'little', 52, 8);
      // Ajust index
      index = index + 8;
    } else {
      // Set long type
      buffer[index++] = BSON$1.BSON_DATA_LONG;
      // Number of written bytes
      numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      var longVal = Long$2.fromNumber(value);
      var lowBits = longVal.getLowBits();
      var highBits = longVal.getHighBits();
      // Encode low bits
      buffer[index++] = lowBits & 0xff;
      buffer[index++] = lowBits >> 8 & 0xff;
      buffer[index++] = lowBits >> 16 & 0xff;
      buffer[index++] = lowBits >> 24 & 0xff;
      // Encode high bits
      buffer[index++] = highBits & 0xff;
      buffer[index++] = highBits >> 8 & 0xff;
      buffer[index++] = highBits >> 16 & 0xff;
      buffer[index++] = highBits >> 24 & 0xff;
    }
  } else {
    // Encode as double
    buffer[index++] = BSON$1.BSON_DATA_NUMBER;
    // Number of written bytes
    numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;
    // Write float
    writeIEEE754$1(buffer, value, index, 'little', 52, 8);
    // Ajust index
    index = index + 8;
  }

  return index;
};

var serializeNull = function serializeNull(buffer, key, value, index, isArray) {
  // Set long type
  buffer[index++] = BSON$1.BSON_DATA_NULL;

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  return index;
};

var serializeBoolean = function serializeBoolean(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BOOLEAN;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Encode the boolean value
  buffer[index++] = value ? 1 : 0;
  return index;
};

var serializeDate = function serializeDate(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_DATE;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write the date
  var dateInMilis = Long$2.fromNumber(value.getTime());
  var lowBits = dateInMilis.getLowBits();
  var highBits = dateInMilis.getHighBits();
  // Encode low bits
  buffer[index++] = lowBits & 0xff;
  buffer[index++] = lowBits >> 8 & 0xff;
  buffer[index++] = lowBits >> 16 & 0xff;
  buffer[index++] = lowBits >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = highBits & 0xff;
  buffer[index++] = highBits >> 8 & 0xff;
  buffer[index++] = highBits >> 16 & 0xff;
  buffer[index++] = highBits >> 24 & 0xff;
  return index;
};

var serializeRegExp = function serializeRegExp(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_REGEXP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  if (value.source && value.source.match(regexp$1) != null) {
    throw Error('value ' + value.source + ' must not contain null bytes');
  }
  // Adjust the index
  index = index + buffer.write(value.source, index, 'utf8');
  // Write zero
  buffer[index++] = 0x00;
  // Write the parameters
  if (value.ignoreCase) buffer[index++] = 0x69; // i
  if (value.global) buffer[index++] = 0x73; // s
  if (value.multiline) buffer[index++] = 0x6d; // m

  // Add ending zero
  buffer[index++] = 0x00;
  return index;
};

var serializeBSONRegExp = function serializeBSONRegExp(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_REGEXP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Check the pattern for 0 bytes
  if (value.pattern.match(regexp$1) != null) {
    // The BSON spec doesn't allow keys with null bytes because keys are
    // null-terminated.
    throw Error('pattern ' + value.pattern + ' must not contain null bytes');
  }

  // Adjust the index
  index = index + buffer.write(value.pattern, index, 'utf8');
  // Write zero
  buffer[index++] = 0x00;
  // Write the options
  index = index + buffer.write(value.options.split('').sort().join(''), index, 'utf8');
  // Add ending zero
  buffer[index++] = 0x00;
  return index;
};

var serializeMinMax = function serializeMinMax(buffer, key, value, index, isArray) {
  // Write the type of either min or max key
  if (value === null) {
    buffer[index++] = BSON$1.BSON_DATA_NULL;
  } else if (value instanceof MinKey$2) {
    buffer[index++] = BSON$1.BSON_DATA_MIN_KEY;
  } else {
    buffer[index++] = BSON$1.BSON_DATA_MAX_KEY;
  }

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  return index;
};

var serializeObjectId = function serializeObjectId(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_OID;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write the objectId into the shared buffer
  if (typeof value.id === 'string') {
    buffer.write(value.id, index, 'binary');
  } else if (value.id && value.id.copy) {
    value.id.copy(buffer, index, 0, 12);
  } else {
    throw new TypeError('object [' + JSON.stringify(value) + '] is not a valid ObjectId');
  }

  // Ajust index
  return index + 12;
};

var serializeBuffer = function serializeBuffer(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BINARY;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Get size of the buffer (current write point)
  var size = value.length;
  // Write the size of the string to buffer
  buffer[index++] = size & 0xff;
  buffer[index++] = size >> 8 & 0xff;
  buffer[index++] = size >> 16 & 0xff;
  buffer[index++] = size >> 24 & 0xff;
  // Write the default subtype
  buffer[index++] = BSON$1.BSON_BINARY_SUBTYPE_DEFAULT;
  // Copy the content form the binary field to the buffer
  value.copy(buffer, index, 0, size);
  // Adjust the index
  index = index + size;
  return index;
};

var serializeObject = function serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray, path) {
  for (var i = 0; i < path.length; i++) {
    if (path[i] === value) throw new Error('cyclic dependency detected');
  }

  // Push value to stack
  path.push(value);
  // Write the type
  buffer[index++] = Array.isArray(value) ? BSON$1.BSON_DATA_ARRAY : BSON$1.BSON_DATA_OBJECT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  var endIndex = serializeInto(buffer, value, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined, path);
  // Pop stack
  path.pop();
  return endIndex;
};

var serializeDecimal128 = function serializeDecimal128(buffer, key, value, index, isArray) {
  buffer[index++] = BSON$1.BSON_DATA_DECIMAL128;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the data from the value
  value.bytes.copy(buffer, index, 0, 16);
  return index + 16;
};

var serializeLong = function serializeLong(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = value._bsontype === 'Long' ? BSON$1.BSON_DATA_LONG : BSON$1.BSON_DATA_TIMESTAMP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the date
  var lowBits = value.getLowBits();
  var highBits = value.getHighBits();
  // Encode low bits
  buffer[index++] = lowBits & 0xff;
  buffer[index++] = lowBits >> 8 & 0xff;
  buffer[index++] = lowBits >> 16 & 0xff;
  buffer[index++] = lowBits >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = highBits & 0xff;
  buffer[index++] = highBits >> 8 & 0xff;
  buffer[index++] = highBits >> 16 & 0xff;
  buffer[index++] = highBits >> 24 & 0xff;
  return index;
};

var serializeInt32 = function serializeInt32(buffer, key, value, index, isArray) {
  // Set int type 32 bits or less
  buffer[index++] = BSON$1.BSON_DATA_INT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the int value
  buffer[index++] = value & 0xff;
  buffer[index++] = value >> 8 & 0xff;
  buffer[index++] = value >> 16 & 0xff;
  buffer[index++] = value >> 24 & 0xff;
  return index;
};

var serializeDouble = function serializeDouble(buffer, key, value, index, isArray) {
  // Encode as double
  buffer[index++] = BSON$1.BSON_DATA_NUMBER;

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write float
  writeIEEE754$1(buffer, value.value, index, 'little', 52, 8);

  // Adjust index
  index = index + 8;
  return index;
};

var serializeFunction = function serializeFunction(buffer, key, value, index, checkKeys, depth, isArray) {
  buffer[index++] = BSON$1.BSON_DATA_CODE;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Function string
  var functionString = normalizedFunctionString$1(value);

  // Write the string
  var size = buffer.write(functionString, index + 4, 'utf8') + 1;
  // Write the size of the string to buffer
  buffer[index] = size & 0xff;
  buffer[index + 1] = size >> 8 & 0xff;
  buffer[index + 2] = size >> 16 & 0xff;
  buffer[index + 3] = size >> 24 & 0xff;
  // Update index
  index = index + 4 + size - 1;
  // Write zero
  buffer[index++] = 0;
  return index;
};

var serializeCode = function serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray) {
  if (value.scope && _typeof(value.scope) === 'object') {
    // Write the type
    buffer[index++] = BSON$1.BSON_DATA_CODE_W_SCOPE;
    // Number of written bytes
    var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;

    // Starting index
    var startIndex = index;

    // Serialize the function
    // Get the function string
    var functionString = typeof value.code === 'string' ? value.code : value.code.toString();
    // Index adjustment
    index = index + 4;
    // Write string into buffer
    var codeSize = buffer.write(functionString, index + 4, 'utf8') + 1;
    // Write the size of the string to buffer
    buffer[index] = codeSize & 0xff;
    buffer[index + 1] = codeSize >> 8 & 0xff;
    buffer[index + 2] = codeSize >> 16 & 0xff;
    buffer[index + 3] = codeSize >> 24 & 0xff;
    // Write end 0
    buffer[index + 4 + codeSize - 1] = 0;
    // Write the
    index = index + codeSize + 4;

    //
    // Serialize the scope value
    var endIndex = serializeInto(buffer, value.scope, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined);
    index = endIndex - 1;

    // Writ the total
    var totalSize = endIndex - startIndex;

    // Write the total size of the object
    buffer[startIndex++] = totalSize & 0xff;
    buffer[startIndex++] = totalSize >> 8 & 0xff;
    buffer[startIndex++] = totalSize >> 16 & 0xff;
    buffer[startIndex++] = totalSize >> 24 & 0xff;
    // Write trailing zero
    buffer[index++] = 0;
  } else {
    buffer[index++] = BSON$1.BSON_DATA_CODE;
    // Number of written bytes
    numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;
    // Function string
    functionString = value.code.toString();
    // Write the string
    var size = buffer.write(functionString, index + 4, 'utf8') + 1;
    // Write the size of the string to buffer
    buffer[index] = size & 0xff;
    buffer[index + 1] = size >> 8 & 0xff;
    buffer[index + 2] = size >> 16 & 0xff;
    buffer[index + 3] = size >> 24 & 0xff;
    // Update index
    index = index + 4 + size - 1;
    // Write zero
    buffer[index++] = 0;
  }

  return index;
};

var serializeBinary = function serializeBinary(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BINARY;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Extract the buffer
  var data = value.value(true);
  // Calculate size
  var size = value.position;
  // Add the deprecated 02 type 4 bytes of size to total
  if (value.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY) size = size + 4;
  // Write the size of the string to buffer
  buffer[index++] = size & 0xff;
  buffer[index++] = size >> 8 & 0xff;
  buffer[index++] = size >> 16 & 0xff;
  buffer[index++] = size >> 24 & 0xff;
  // Write the subtype to the buffer
  buffer[index++] = value.sub_type;

  // If we have binary type 2 the 4 first bytes are the size
  if (value.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY) {
    size = size - 4;
    buffer[index++] = size & 0xff;
    buffer[index++] = size >> 8 & 0xff;
    buffer[index++] = size >> 16 & 0xff;
    buffer[index++] = size >> 24 & 0xff;
  }

  // Write the data to the object
  data.copy(buffer, index, 0, value.position);
  // Adjust the index
  index = index + value.position;
  return index;
};

var serializeSymbol = function serializeSymbol(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_SYMBOL;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the string
  var size = buffer.write(value.value, index + 4, 'utf8') + 1;
  // Write the size of the string to buffer
  buffer[index] = size & 0xff;
  buffer[index + 1] = size >> 8 & 0xff;
  buffer[index + 2] = size >> 16 & 0xff;
  buffer[index + 3] = size >> 24 & 0xff;
  // Update index
  index = index + 4 + size - 1;
  // Write zero
  buffer[index++] = 0x00;
  return index;
};

var serializeDBRef = function serializeDBRef(buffer, key, value, index, depth, serializeFunctions, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_OBJECT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  var startIndex = index;
  var endIndex;
  var output = {
    $ref: value.collection,
    $id: value.oid
  };

  if (value.db != null) output.$db = value.db;

  output = Object.assign(output, value.fields);
  endIndex = serializeInto(buffer, output, false, index, depth + 1, serializeFunctions);

  // Calculate object size
  var size = endIndex - startIndex;
  // Write the size
  buffer[startIndex++] = size & 0xff;
  buffer[startIndex++] = size >> 8 & 0xff;
  buffer[startIndex++] = size >> 16 & 0xff;
  buffer[startIndex++] = size >> 24 & 0xff;
  // Set index
  return endIndex;
};

var serializeInto = function serializeInto(buffer, object, checkKeys, startingIndex, depth, serializeFunctions, ignoreUndefined, path) {
  startingIndex = startingIndex || 0;
  path = path || [];

  // Push the object to the path
  path.push(object);

  // Start place to serialize into
  var index = startingIndex + 4;

  // Special case isArray
  if (Array.isArray(object)) {
    // Get object keys
    for (var i = 0; i < object.length; i++) {
      var key = '' + i;
      var value = object[i];

      // Is there an override value
      if (value && value.toBSON) {
        if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        value = value.toBSON();
      }

      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      if (type === 'string') {
        index = serializeString(buffer, key, value, index, true);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index, true);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index, true);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index, true);
      } else if (value === undefined) {
        index = serializeNull(buffer, key, value, index, true);
      } else if (value === null) {
        index = serializeNull(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index, true);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index, true);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index, true);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index, true);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index, true);
      }
    }
  } else if (object instanceof map) {
    var iterator = object.entries();
    var done = false;

    while (!done) {
      // Unpack the next entry
      var entry = iterator.next();
      done = entry.done;
      // Are we done, then skip and terminate
      if (done) continue;

      // Get the entry values
      key = entry.value[0];
      value = entry.value[1];

      // Check the type of the value
      type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      // Check the key and throw error if it's illegal
      if (key !== '$db' && key !== '$ref' && key !== '$id') {
        if (key.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + key + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === key[0]) {
            throw Error('key ' + key + " must not start with '$'");
          } else if (~key.indexOf('.')) {
            throw Error('key ' + key + " must not contain '.'");
          }
        }
      }

      if (type === 'string') {
        index = serializeString(buffer, key, value, index);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index);
      } else if (value === null || value === undefined && ignoreUndefined === false) {
        index = serializeNull(buffer, key, value, index);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index);
      }
    }
  } else {
    // Did we provide a custom serialization method
    if (object.toBSON) {
      if (typeof object.toBSON !== 'function') throw new TypeError('toBSON is not a function');
      object = object.toBSON();
      if (object != null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') throw new TypeError('toBSON function did not return an object');
    }

    // Iterate over all the keys
    for (key in object) {
      value = object[key];
      // Is there an override value
      if (value && value.toBSON) {
        if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        value = value.toBSON();
      }

      // Check the type of the value
      type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      // Check the key and throw error if it's illegal
      if (key !== '$db' && key !== '$ref' && key !== '$id') {
        if (key.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + key + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === key[0]) {
            throw Error('key ' + key + " must not start with '$'");
          } else if (~key.indexOf('.')) {
            throw Error('key ' + key + " must not contain '.'");
          }
        }
      }

      if (type === 'string') {
        index = serializeString(buffer, key, value, index);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index);
      } else if (value === undefined) {
        if (ignoreUndefined === false) index = serializeNull(buffer, key, value, index);
      } else if (value === null) {
        index = serializeNull(buffer, key, value, index);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index);
      }
    }
  }

  // Remove the path
  path.pop();

  // Final padding byte for object
  buffer[index++] = 0x00;

  // Final size
  var size = index - startingIndex;
  // Write the size of the object
  buffer[startingIndex++] = size & 0xff;
  buffer[startingIndex++] = size >> 8 & 0xff;
  buffer[startingIndex++] = size >> 16 & 0xff;
  buffer[startingIndex++] = size >> 24 & 0xff;
  return index;
};

var BSON$1 = {};

/**
 * Contains the function cache if we have that enable to allow for avoiding the eval step on each deserialization, comparison is by md5
 *
 * @ignore
 * @api private
 */
// var functionCache = (BSON.functionCache = {});

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON$1.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON$1.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON$1.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON$1.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON$1.BSON_DATA_BINARY = 5;
/**
 * ObjectID BSON Type, deprecated
 *
 * @classconstant BSON_DATA_UNDEFINED
 **/
BSON$1.BSON_DATA_UNDEFINED = 6;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON$1.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON$1.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON$1.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON$1.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON$1.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON$1.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON$1.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON$1.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON$1.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON$1.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON$1.BSON_DATA_LONG = 18;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_DECIMAL128
 **/
BSON$1.BSON_DATA_DECIMAL128 = 19;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON$1.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON$1.BSON_DATA_MAX_KEY = 0x7f;
/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON$1.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON$1.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON$1.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON$1.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON$1.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON$1.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// BSON MAX VALUES
BSON$1.BSON_INT32_MAX = 0x7fffffff;
BSON$1.BSON_INT32_MIN = -0x80000000;

BSON$1.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON$1.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON$1.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$1.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
// var JS_INT_MAX_LONG = Long.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
// var JS_INT_MIN_LONG = Long.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

var serializer = serializeInto;

var Buffer$6 = require$$0.Buffer;
var Long$3 = long_1.Long,
    Double$2 = double_1.Double,
    Timestamp$2 = timestamp.Timestamp,
    ObjectID$2 = objectid.ObjectID,
    _Symbol$1 = symbol.Symbol,
    BSONRegExp$2 = regexp.BSONRegExp,
    Code$2 = code.Code,
    MinKey$3 = min_key.MinKey,
    MaxKey$2 = max_key.MaxKey,
    DBRef$2 = db_ref.DBRef,
    Binary$3 = binary.Binary;

var normalizedFunctionString$2 = utils.normalizedFunctionString;

// To ensure that 0.4 of node works correctly
var isDate$1 = function isDate(d) {
  return (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
};

var calculateObjectSize = function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
  var totalLength = 4 + 1;

  if (Array.isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      totalLength += calculateElement(i.toString(), object[i], serializeFunctions, true, ignoreUndefined);
    }
  } else {
    // If we have toBSON defined, override the current object

    if (object.toBSON) {
      object = object.toBSON();
    }

    // Calculate size
    for (var key in object) {
      totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
    }
  }

  return totalLength;
};

/**
 * @ignore
 * @api private
 */
function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
  // If we have toBSON defined, override the current object
  if (value && value.toBSON) {
    value = value.toBSON();
  }

  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'string':
      return 1 + Buffer$6.byteLength(name, 'utf8') + 1 + 4 + Buffer$6.byteLength(value, 'utf8') + 1;
    case 'number':
      if (Math.floor(value) === value && value >= BSON$2.JS_INT_MIN && value <= BSON$2.JS_INT_MAX) {
        if (value >= BSON$2.BSON_INT32_MIN && value <= BSON$2.BSON_INT32_MAX) {
          // 32 bit
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (4 + 1);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
        }
      } else {
        // 64 bit
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      }
    case 'undefined':
      if (isArray || !ignoreUndefined) return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      return 0;
    case 'boolean':
      return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 1);
    case 'object':
      if (value == null || value instanceof MinKey$3 || value instanceof MaxKey$2 || value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      } else if (value instanceof ObjectID$2 || value['_bsontype'] === 'ObjectID') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (12 + 1);
      } else if (value instanceof Date || isDate$1(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (typeof Buffer$6 !== 'undefined' && Buffer$6.isBuffer(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 4 + 1) + value.length;
      } else if (value instanceof Long$3 || value instanceof Double$2 || value instanceof Timestamp$2 || value['_bsontype'] === 'Long' || value['_bsontype'] === 'Double' || value['_bsontype'] === 'Timestamp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (value instanceof decimal128 || value['_bsontype'] === 'Decimal128') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (16 + 1);
      } else if (value instanceof Code$2 || value['_bsontype'] === 'Code') {
        // Calculate size depending on the availability of a scope
        if (value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1;
        }
      } else if (value instanceof Binary$3 || value['_bsontype'] === 'Binary') {
        // Check what kind of subtype we have
        if (value.sub_type === Binary$3.SUBTYPE_BYTE_ARRAY) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1 + 4);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1);
        }
      } else if (value instanceof _Symbol$1 || value['_bsontype'] === 'Symbol') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + Buffer$6.byteLength(value.value, 'utf8') + 4 + 1 + 1;
      } else if (value instanceof DBRef$2 || value['_bsontype'] === 'DBRef') {
        // Set up correct object for serialization
        var ordered_values = {
          $ref: value.collection,
          $id: value.oid
        };

        // Add db reference if it exists
        if (value.db != null) {
          ordered_values['$db'] = value.db;
        }

        ordered_values = Object.assign(ordered_values, value.fields);

        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined);
      } else if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else if (value instanceof BSONRegExp$2 || value['_bsontype'] === 'BSONRegExp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.pattern, 'utf8') + 1 + Buffer$6.byteLength(value.options, 'utf8') + 1;
      } else {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + calculateObjectSize(value, serializeFunctions, ignoreUndefined) + 1;
      }
    case 'function':
      // WTF for 0.4.X where typeof /someregexp/ === 'function'
      if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]' || String.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else {
        if (serializeFunctions && value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else if (serializeFunctions) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1;
        }
      }
  }

  return 0;
}

var BSON$2 = {};

// BSON MAX VALUES
BSON$2.BSON_INT32_MAX = 0x7fffffff;
BSON$2.BSON_INT32_MIN = -0x80000000;

// JS MAX PRECISE VALUES
BSON$2.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$2.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

var calculate_size = calculateObjectSize;

var Buffer$7 = require$$0.Buffer;

/**
 * Makes sure that, if a Uint8Array is passed in, it is wrapped in a Buffer.
 *
 * @param {Buffer|Uint8Array} potentialBuffer The potential buffer
 * @returns {Buffer} the input if potentialBuffer is a buffer, or a buffer that
 * wraps a passed in Uint8Array
 * @throws {TypeError} If anything other than a Buffer or Uint8Array is passed in 
 */
var ensure_buffer = function ensureBuffer(potentialBuffer) {
  if (potentialBuffer instanceof Buffer$7) {
    return potentialBuffer;
  }
  if (potentialBuffer instanceof Uint8Array) {
    return new Buffer$7(potentialBuffer.buffer);
  }

  throw new TypeError('Must use either Buffer or Uint8Array');
};

var Buffer$8 = require$$0.Buffer;

// Parts of the parser


/**
 * @ignore
 * @api private
 */
// Default Max Size
var MAXSIZE = 1024 * 1024 * 17;

// Current Internal Temporary Serialization Buffer
var buffer = new Buffer$8(MAXSIZE);

var BSON$3 = function BSON() {};

/**
 * Serialize a Javascript object.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @param {Number} [options.minInternalBufferSize=1024*1024*17] minimum size of the internal temporary serialization buffer **(default:1024*1024*17)**.
 * @return {Buffer} returns the Buffer object containing the serialized object.
 * @api public
 */
BSON$3.prototype.serialize = function serialize(object, options) {
  options = options || {};
  // Unpack the options
  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var minInternalBufferSize = typeof options.minInternalBufferSize === 'number' ? options.minInternalBufferSize : MAXSIZE;

  // Resize the internal serialization buffer if needed
  if (buffer.length < minInternalBufferSize) {
    buffer = new Buffer$8(minInternalBufferSize);
  }

  // Attempt to serialize
  var serializationIndex = serializer(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined, []);
  // Create the final buffer
  var finishedBuffer = new Buffer$8(serializationIndex);
  // Copy into the finished buffer
  buffer.copy(finishedBuffer, 0, 0, finishedBuffer.length);
  // Return the buffer
  return finishedBuffer;
};

/**
 * Serialize a Javascript object using a predefined Buffer and index into the buffer, useful when pre-allocating the space for serialization.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Buffer|Uint8Array} buffer the Buffer you pre-allocated to store the serialized BSON object.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @param {Number} [options.index] the index in the buffer where we wish to start serializing into.
 * @return {Number} returns the index pointing to the last written byte in the buffer.
 * @api public
 */
BSON$3.prototype.serializeWithBufferAndIndex = function (object, finalBuffer, options) {
  options = options || {};
  // Unpack the options
  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var startIndex = typeof options.index === 'number' ? options.index : 0;

  // Attempt to serialize
  var serializationIndex = serializer(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined);

  finalBuffer = ensure_buffer(finalBuffer);

  buffer.copy(finalBuffer, startIndex, 0, serializationIndex);

  // Return the index
  return startIndex + serializationIndex - 1;
};

/**
 * Deserialize data as BSON.
 *
 * @param {Buffer|Uint8Array} buffer the buffer containing the serialized set of BSON documents.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @param {boolean} [options.allowObjectSmallerThanBufferSize=false] allows the buffer to be larger than the parsed BSON object
 * @return {Object} returns the deserialized Javascript Object.
 * @api public
 */
BSON$3.prototype.deserialize = function (buffer, options) {
  buffer = ensure_buffer(buffer);
  return deserializer(buffer, options);
};

/**
 * Calculate the bson size for a passed in Javascript object.
 *
 * @param {Object} object the Javascript object to calculate the BSON byte size for.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @return {Number} returns the number of bytes the BSON object will take up.
 * @api public
 */
BSON$3.prototype.calculateObjectSize = function (object, options) {
  options = options || {};

  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;

  return calculate_size(object, serializeFunctions, ignoreUndefined);
};

/**
 * Deserialize stream data as BSON documents.
 *
 * @param {Buffer|Uint8Array} data the buffer containing the serialized set of BSON documents.
 * @param {Number} startIndex the start index in the data Buffer where the deserialization is to start.
 * @param {Number} numberOfDocuments number of documents to deserialize.
 * @param {Array} documents an array where to store the deserialized documents.
 * @param {Number} docStartIndex the index in the documents array from where to start inserting documents.
 * @param {Object} [options] additional options used for the deserialization.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @return {Number} returns the next index in the buffer after deserialization **x** numbers of documents.
 * @api public
 */
BSON$3.prototype.deserializeStream = function (data, startIndex, numberOfDocuments, documents, docStartIndex, options) {
  options = Object.assign({ allowObjectSmallerThanBufferSize: true }, options);
  data = ensure_buffer(data);
  var index = startIndex;
  // Loop over all documents
  for (var i = 0; i < numberOfDocuments; i++) {
    // Find size of the document
    var size = data[index] | data[index + 1] << 8 | data[index + 2] << 16 | data[index + 3] << 24;
    // Update options with index
    options.index = index;
    // Parse the document at this point
    documents[docStartIndex + i] = this.deserialize(data, options);
    // Adjust index by the document size
    index = index + size;
  }

  // Return object containing end index of parsing and list of documents
  return index;
};

/**
 * @ignore
 * @api private
 */
// BSON MAX VALUES
BSON$3.BSON_INT32_MAX = 0x7fffffff;
BSON$3.BSON_INT32_MIN = -0x80000000;

BSON$3.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON$3.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON$3.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$3.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
// var JS_INT_MAX_LONG = Long.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
// var JS_INT_MIN_LONG = Long.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON$3.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON$3.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON$3.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON$3.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON$3.BSON_DATA_BINARY = 5;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON$3.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON$3.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON$3.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON$3.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON$3.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON$3.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON$3.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON$3.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON$3.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON$3.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON$3.BSON_DATA_LONG = 18;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON$3.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON$3.BSON_DATA_MAX_KEY = 0x7f;

/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON$3.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON$3.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON$3.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON$3.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON$3.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON$3.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// Return BSON
var bson = BSON$3;
var Code_1$1 = code;
var Map_1 = map;
var Symbol_1$1 = symbol;
var BSON_1 = BSON$3;
var DBRef_1$1 = db_ref;
var Binary_1$1 = binary;
var ObjectId$1 = objectid;
var ObjectID_1$1 = objectid;
var Long_1$1 = long_1;
var Timestamp_1$1 = timestamp;
var Double_1$1 = double_1;
var Int32_1$1 = int_32;
var MinKey_1$1 = min_key;
var MaxKey_1$1 = max_key;
var BSONRegExp_1$1 = regexp;
var Decimal128_1$1 = decimal128;
bson.Code = Code_1$1;
bson.Map = Map_1;
bson.Symbol = Symbol_1$1;
bson.BSON = BSON_1;
bson.DBRef = DBRef_1$1;
bson.Binary = Binary_1$1;
bson.ObjectId = ObjectId$1;
bson.ObjectID = ObjectID_1$1;
bson.Long = Long_1$1;
bson.Timestamp = Timestamp_1$1;
bson.Double = Double_1$1;
bson.Int32 = Int32_1$1;
bson.MinKey = MinKey_1$1;
bson.MaxKey = MaxKey_1$1;
bson.BSONRegExp = BSONRegExp_1$1;
bson.Decimal128 = Decimal128_1$1;

var jsBson = bson;

return jsBson;

})));

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-bson/dist/bson.browser.umd.js","/../../node_modules/mongodb-stitch-bson/dist")
},{"b55mWE":6,"buffer":5}],104:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteInsertManyResult = (function () {
        function RemoteInsertManyResult(arr) {
            var inserted = {};
            arr.forEach(function (value, index) {
                inserted[index] = value;
            });
            this.insertedIds = inserted;
        }
        return RemoteInsertManyResult;
    }());
    exports.default = RemoteInsertManyResult;
});
//# sourceMappingURL=RemoteInsertManyResult.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/RemoteInsertManyResult.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd")
},{"b55mWE":6,"buffer":5}],105:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./internal/CoreRemoteMongoClientImpl", "./internal/CoreRemoteMongoCollectionImpl", "./internal/CoreRemoteMongoDatabaseImpl", "./internal/CoreRemoteMongoReadOperation", "./RemoteInsertManyResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreRemoteMongoClientImpl_1 = __importDefault(require("./internal/CoreRemoteMongoClientImpl"));
    exports.CoreRemoteMongoClientImpl = CoreRemoteMongoClientImpl_1.default;
    var CoreRemoteMongoCollectionImpl_1 = __importDefault(require("./internal/CoreRemoteMongoCollectionImpl"));
    exports.CoreRemoteMongoCollectionImpl = CoreRemoteMongoCollectionImpl_1.default;
    var CoreRemoteMongoDatabaseImpl_1 = __importDefault(require("./internal/CoreRemoteMongoDatabaseImpl"));
    exports.CoreRemoteMongoDatabaseImpl = CoreRemoteMongoDatabaseImpl_1.default;
    var CoreRemoteMongoReadOperation_1 = __importDefault(require("./internal/CoreRemoteMongoReadOperation"));
    exports.CoreRemoteMongoReadOperation = CoreRemoteMongoReadOperation_1.default;
    var RemoteInsertManyResult_1 = __importDefault(require("./RemoteInsertManyResult"));
    exports.RemoteInsertManyResult = RemoteInsertManyResult_1.default;
});
//# sourceMappingURL=index.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/index.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd")
},{"./RemoteInsertManyResult":104,"./internal/CoreRemoteMongoClientImpl":106,"./internal/CoreRemoteMongoCollectionImpl":107,"./internal/CoreRemoteMongoDatabaseImpl":108,"./internal/CoreRemoteMongoReadOperation":109,"b55mWE":6,"buffer":5}],106:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CoreRemoteMongoDatabaseImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreRemoteMongoDatabaseImpl_1 = __importDefault(require("./CoreRemoteMongoDatabaseImpl"));
    var CoreRemoteMongoClientImpl = (function () {
        function CoreRemoteMongoClientImpl(service) {
            this.service = service;
        }
        CoreRemoteMongoClientImpl.prototype.db = function (name) {
            return new CoreRemoteMongoDatabaseImpl_1.default(name, this.service);
        };
        return CoreRemoteMongoClientImpl;
    }());
    exports.default = CoreRemoteMongoClientImpl;
});
//# sourceMappingURL=CoreRemoteMongoClientImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal/CoreRemoteMongoClientImpl.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal")
},{"./CoreRemoteMongoDatabaseImpl":108,"b55mWE":6,"buffer":5}],107:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongodb-stitch-bson", "./CoreRemoteMongoReadOperation", "./ResultDecoders"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongodb_stitch_bson_1 = __importDefault(require("mongodb-stitch-bson"));
    var CoreRemoteMongoReadOperation_1 = __importDefault(require("./CoreRemoteMongoReadOperation"));
    var ResultDecoders_1 = __importDefault(require("./ResultDecoders"));
    var CoreRemoteMongoCollectionImpl = (function () {
        function CoreRemoteMongoCollectionImpl(name, databaseName, service, codec) {
            var _this = this;
            this.name = name;
            this.databaseName = databaseName;
            this.service = service;
            this.codec = codec;
            this.namespace = this.databaseName + "." + this.name;
            this.baseOperationArgs = (function () { return ({
                collection: _this.name,
                database: _this.databaseName
            }); })();
        }
        CoreRemoteMongoCollectionImpl.prototype.withCollectionType = function (codec) {
            return new CoreRemoteMongoCollectionImpl(this.name, this.databaseName, this.service, codec);
        };
        CoreRemoteMongoCollectionImpl.prototype.find = function (filter, options) {
            if (filter === void 0) { filter = {}; }
            var args = __assign({}, this.baseOperationArgs);
            args.query = filter;
            if (options) {
                if (options.limit) {
                    args.limit = options.limit;
                }
                if (options.projection) {
                    args.project = options.projection;
                }
                if (options.sort) {
                    args.sort = options.sort;
                }
            }
            return new CoreRemoteMongoReadOperation_1.default("find", args, this.service, this.codec);
        };
        CoreRemoteMongoCollectionImpl.prototype.aggregate = function (pipeline) {
            var args = __assign({}, this.baseOperationArgs);
            args.pipeline = pipeline;
            return new CoreRemoteMongoReadOperation_1.default("aggregate", args, this.service, this.codec);
        };
        CoreRemoteMongoCollectionImpl.prototype.count = function (query, options) {
            if (query === void 0) { query = {}; }
            var args = __assign({}, this.baseOperationArgs);
            args.query = query;
            if (options && options.limit) {
                args.limit = options.limit;
            }
            return this.service.callFunction("count", [args]);
        };
        CoreRemoteMongoCollectionImpl.prototype.insertOne = function (value) {
            var args = __assign({}, this.baseOperationArgs);
            args.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(value) : value);
            return this.service.callFunction("insertOne", [args], ResultDecoders_1.default.remoteInsertOneResultDecoder);
        };
        CoreRemoteMongoCollectionImpl.prototype.insertMany = function (docs) {
            var _this = this;
            var args = __assign({}, this.baseOperationArgs);
            args.documents = docs.map(function (doc) {
                return _this.generateObjectIdIfMissing(_this.codec ? _this.codec.encode(doc) : doc);
            });
            return this.service.callFunction("insertMany", [args], ResultDecoders_1.default.remoteInsertManyResultDecoder);
        };
        CoreRemoteMongoCollectionImpl.prototype.deleteOne = function (query) {
            return this.executeDelete(query, false);
        };
        CoreRemoteMongoCollectionImpl.prototype.deleteMany = function (query) {
            return this.executeDelete(query, true);
        };
        CoreRemoteMongoCollectionImpl.prototype.updateOne = function (query, update, options) {
            return this.executeUpdate(query, update, options, false);
        };
        CoreRemoteMongoCollectionImpl.prototype.updateMany = function (query, update, options) {
            return this.executeUpdate(query, update, options, true);
        };
        CoreRemoteMongoCollectionImpl.prototype.executeDelete = function (query, multi) {
            var args = __assign({}, this.baseOperationArgs);
            args.query = query;
            return this.service.callFunction(multi ? "deleteMany" : "deleteOne", [args], ResultDecoders_1.default.remoteDeleteResultDecoder);
        };
        CoreRemoteMongoCollectionImpl.prototype.executeUpdate = function (query, update, options, multi) {
            if (multi === void 0) { multi = false; }
            var args = __assign({}, this.baseOperationArgs);
            args.query = query;
            args.update = update;
            if (options && options.upsert) {
                args.upsert = options.upsert;
            }
            return this.service.callFunction(multi ? "updateMany" : "updateOne", [args], ResultDecoders_1.default.remoteUpdateResultDecoder);
        };
        CoreRemoteMongoCollectionImpl.prototype.generateObjectIdIfMissing = function (doc) {
            if (!doc._id) {
                var newDoc = doc;
                newDoc._id = new mongodb_stitch_bson_1.default.ObjectID();
                return newDoc;
            }
            return doc;
        };
        return CoreRemoteMongoCollectionImpl;
    }());
    exports.default = CoreRemoteMongoCollectionImpl;
});
//# sourceMappingURL=CoreRemoteMongoCollectionImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal/CoreRemoteMongoCollectionImpl.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal")
},{"./CoreRemoteMongoReadOperation":109,"./ResultDecoders":110,"b55mWE":6,"buffer":5,"mongodb-stitch-bson":103}],108:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CoreRemoteMongoCollectionImpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreRemoteMongoCollectionImpl_1 = __importDefault(require("./CoreRemoteMongoCollectionImpl"));
    var CoreRemoteMongoDatabaseImpl = (function () {
        function CoreRemoteMongoDatabaseImpl(name, service) {
            this.name = name;
            this.service = service;
        }
        CoreRemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
            return new CoreRemoteMongoCollectionImpl_1.default(name, this.name, this.service, codec);
        };
        return CoreRemoteMongoDatabaseImpl;
    }());
    exports.default = CoreRemoteMongoDatabaseImpl;
});
//# sourceMappingURL=CoreRemoteMongoDatabaseImpl.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal/CoreRemoteMongoDatabaseImpl.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal")
},{"./CoreRemoteMongoCollectionImpl":107,"b55mWE":6,"buffer":5}],109:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreRemoteMongoReadOperation = (function () {
        function CoreRemoteMongoReadOperation(command, args, service, decoder) {
            this.command = command;
            this.args = args;
            this.service = service;
            if (decoder) {
                this.collectionDecoder = new (function () {
                    function class_1() {
                    }
                    class_1.prototype.decode = function (from) {
                        if (from instanceof Array) {
                            return from.map(function (t) { return decoder.decode(t); });
                        }
                        return [decoder.decode(from)];
                    };
                    return class_1;
                }())();
            }
        }
        CoreRemoteMongoReadOperation.prototype.iterator = function () {
            return this.executeRead().then(function (res) { return res[Symbol.iterator](); });
        };
        CoreRemoteMongoReadOperation.prototype.first = function () {
            return this.executeRead().then(function (res) { return res[0]; });
        };
        CoreRemoteMongoReadOperation.prototype.asArray = function () {
            return this.executeRead();
        };
        CoreRemoteMongoReadOperation.prototype.executeRead = function () {
            return this.service.callFunction(this.command, [this.args], this.collectionDecoder);
        };
        return CoreRemoteMongoReadOperation;
    }());
    exports.default = CoreRemoteMongoReadOperation;
});
//# sourceMappingURL=CoreRemoteMongoReadOperation.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal/CoreRemoteMongoReadOperation.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal")
},{"b55mWE":6,"buffer":5}],110:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../RemoteInsertManyResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RemoteInsertManyResult_1 = __importDefault(require("../RemoteInsertManyResult"));
    var RemoteInsertManyResultFields;
    (function (RemoteInsertManyResultFields) {
        RemoteInsertManyResultFields["InsertedIds"] = "insertedIds";
    })(RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {}));
    var RemoteInsertOneResultFields;
    (function (RemoteInsertOneResultFields) {
        RemoteInsertOneResultFields["InsertedId"] = "insertedId";
    })(RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {}));
    var RemoteUpdateResultFields;
    (function (RemoteUpdateResultFields) {
        RemoteUpdateResultFields["MatchedCount"] = "matchedCount";
        RemoteUpdateResultFields["ModifiedCount"] = "modifiedCount";
        RemoteUpdateResultFields["UpsertedId"] = "upsertedId";
    })(RemoteUpdateResultFields || (RemoteUpdateResultFields = {}));
    var RemoteDeleteResultFields;
    (function (RemoteDeleteResultFields) {
        RemoteDeleteResultFields["DeletedCount"] = "deletedCount";
    })(RemoteDeleteResultFields || (RemoteDeleteResultFields = {}));
    var RemoteInsertManyResultDecoder = (function () {
        function RemoteInsertManyResultDecoder() {
        }
        RemoteInsertManyResultDecoder.prototype.decode = function (from) {
            return new RemoteInsertManyResult_1.default(from[RemoteInsertManyResultFields.InsertedIds]);
        };
        return RemoteInsertManyResultDecoder;
    }());
    var RemoteInsertOneResultDecoder = (function () {
        function RemoteInsertOneResultDecoder() {
        }
        RemoteInsertOneResultDecoder.prototype.decode = function (from) {
            return {
                insertedId: from[RemoteInsertOneResultFields.InsertedId]
            };
        };
        return RemoteInsertOneResultDecoder;
    }());
    var RemoteUpdateResultDecoder = (function () {
        function RemoteUpdateResultDecoder() {
        }
        RemoteUpdateResultDecoder.prototype.decode = function (from) {
            return {
                matchedCount: from[RemoteUpdateResultFields.MatchedCount],
                modifiedCount: from[RemoteUpdateResultFields.ModifiedCount],
                upsertedId: from[RemoteUpdateResultFields.UpsertedId]
            };
        };
        return RemoteUpdateResultDecoder;
    }());
    var RemoteDeleteResultDecoder = (function () {
        function RemoteDeleteResultDecoder() {
        }
        RemoteDeleteResultDecoder.prototype.decode = function (from) {
            return {
                deletedCount: from[RemoteDeleteResultFields.DeletedCount]
            };
        };
        return RemoteDeleteResultDecoder;
    }());
    var ResultDecoders = (function () {
        function ResultDecoders() {
        }
        ResultDecoders.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder();
        ResultDecoders.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder();
        ResultDecoders.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder();
        ResultDecoders.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder();
        return ResultDecoders;
    }());
    exports.default = ResultDecoders;
});
//# sourceMappingURL=ResultDecoders.js.map
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal/ResultDecoders.js","/../../node_modules/mongodb-stitch-core-services-mongodb-remote/dist/umd/internal")
},{"../RemoteInsertManyResult":104,"b55mWE":6,"buffer":5}],111:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('buffer'), require('mongodb-stitch-bson')) :
	typeof define === 'function' && define.amd ? define(['exports', 'buffer', 'mongodb-stitch-bson'], factory) :
	(factory((global.ejson = {}),global.Buffer,global.mongodbStitchBson));
}(this, (function (exports,buffer,mongodbStitchBson) { 'use strict';

buffer = buffer && buffer.hasOwnProperty('default') ? buffer['default'] : buffer;
mongodbStitchBson = mongodbStitchBson && mongodbStitchBson.hasOwnProperty('default') ? mongodbStitchBson['default'] : mongodbStitchBson;

var Buffer = buffer.Buffer;

/**
 * Module dependencies.
 * @ignore
 */
function convert(integer) {
  var str = Number(integer).toString(16);
  return str.length === 1 ? '0' + str : str;
}

function toExtendedJSON(obj) {
  var base64String = Buffer.isBuffer(obj.buffer) ? obj.buffer.toString('base64') : Buffer.from(obj.buffer).toString('base64');

  return {
    $binary: {
      base64: base64String,
      subType: convert(obj.sub_type)
    }
  };
}

function fromExtendedJSON(BSON, doc) {
  var type = doc.$binary.subType ? parseInt(doc.$binary.subType, 16) : 0;

  var data = new Buffer(doc.$binary.base64, 'base64');

  return new BSON.Binary(data, type);
}

var binary = {
  toExtendedJSON: toExtendedJSON,
  fromExtendedJSON: fromExtendedJSON
};

function toExtendedJSON$1(obj) {
  if (obj.scope) {
    return { $code: obj.code, $scope: obj.scope };
  }

  return { $code: obj.code };
}

function fromExtendedJSON$1(BSON, doc) {
  return new BSON.Code(doc.$code, doc.$scope);
}

var code = {
  toExtendedJSON: toExtendedJSON$1,
  fromExtendedJSON: fromExtendedJSON$1
};

function toExtendedJSON$2(obj) {
  var o = {
    $ref: obj.collection,
    $id: obj.oid
  };
  if (obj.db) o.$db = obj.db;
  o = Object.assign(o, obj.fields);
  return o;
}

function fromExtendedJSON$2(BSON, doc) {
  var copy = Object.assign({}, doc);
  ['$ref', '$id', '$db'].forEach(function (k) {
    return delete copy[k];
  });
  return new BSON.DBRef(doc.$ref, doc.$id, doc.$db, copy);
}

var db_ref = {
  toExtendedJSON: toExtendedJSON$2,
  fromExtendedJSON: fromExtendedJSON$2
};

function toExtendedJSON$3(obj) {
  return { $numberDecimal: obj.toString() };
}

function fromExtendedJSON$3(BSON, doc) {
  return new BSON.Decimal128.fromString(doc.$numberDecimal);
}

var decimal128 = {
  toExtendedJSON: toExtendedJSON$3,
  fromExtendedJSON: fromExtendedJSON$3
};

function toExtendedJSON$4(obj, options) {
  if (options && options.relaxed && isFinite(obj.value)) return obj.value;
  return { $numberDouble: obj.value.toString() };
}

function fromExtendedJSON$4(BSON, doc, options) {
  return options && options.relaxed ? parseFloat(doc.$numberDouble) : new BSON.Double(parseFloat(doc.$numberDouble));
}

var double_1 = {
  toExtendedJSON: toExtendedJSON$4,
  fromExtendedJSON: fromExtendedJSON$4
};

function toExtendedJSON$5(obj, options) {
  if (options && options.relaxed) return obj.value;
  return { $numberInt: obj.value.toString() };
}

function fromExtendedJSON$5(BSON, doc, options) {
  return options && options.relaxed ? parseInt(doc.$numberInt, 10) : new BSON.Int32(doc.$numberInt);
}

var int_32 = {
  toExtendedJSON: toExtendedJSON$5,
  fromExtendedJSON: fromExtendedJSON$5
};

function toExtendedJSON$6(obj, options) {
  if (options && options.relaxed) return obj.toNumber();
  return { $numberLong: obj.toString() };
}

function fromExtendedJSON$6(BSON, doc, options) {
  var result = BSON.Long.fromString(doc.$numberLong);
  return options && options.relaxed ? result.toNumber() : result;
}

var long_1 = {
  toExtendedJSON: toExtendedJSON$6,
  fromExtendedJSON: fromExtendedJSON$6
};

function toExtendedJSON$7() {
  return { $maxKey: 1 };
}

function fromExtendedJSON$7(BSON) {
  return new BSON.MaxKey();
}

var max_key = {
  toExtendedJSON: toExtendedJSON$7,
  fromExtendedJSON: fromExtendedJSON$7
};

function toExtendedJSON$8() {
  return { $minKey: 1 };
}

function fromExtendedJSON$8(BSON) {
  return new BSON.MinKey();
}

var min_key = {
  toExtendedJSON: toExtendedJSON$8,
  fromExtendedJSON: fromExtendedJSON$8
};

function toExtendedJSON$9(obj) {
  if (obj.toHexString) return { $oid: obj.toHexString() };
  return { $oid: obj.toString('hex') };
}

function fromExtendedJSON$9(BSON, doc) {
  return new BSON.ObjectID(doc.$oid);
}

var objectid = {
  toExtendedJSON: toExtendedJSON$9,
  fromExtendedJSON: fromExtendedJSON$9
};

function toExtendedJSON$10(obj) {
  return { $regularExpression: { pattern: obj.pattern, options: obj.options } };
}

function fromExtendedJSON$10(BSON, doc) {
  return new BSON.BSONRegExp(doc.$regularExpression.pattern, doc.$regularExpression.options.split('').sort().join(''));
}

var regexp = {
  toExtendedJSON: toExtendedJSON$10,
  fromExtendedJSON: fromExtendedJSON$10
};

function toExtendedJSON$11(obj) {
  return { $symbol: obj.value };
}

function fromExtendedJSON$11(BSON, doc) {
  return new BSON.Symbol(doc.$symbol);
}

var symbol = {
  toExtendedJSON: toExtendedJSON$11,
  fromExtendedJSON: fromExtendedJSON$11
};

function toExtendedJSON$12(obj) {
  return {
    $timestamp: {
      t: obj.high_,
      i: obj.low_
    }
  };
}

function fromExtendedJSON$12(BSON, doc) {
  return new BSON.Timestamp(doc.$timestamp.i, doc.$timestamp.t);
}

var timestamp = {
  toExtendedJSON: toExtendedJSON$12,
  fromExtendedJSON: fromExtendedJSON$12
};

var bson = {
  Binary: binary,
  Code: code,
  DBRef: db_ref,
  Decimal128: decimal128,
  Double: double_1,
  Int32: int_32,
  Long: long_1,
  MaxKey: max_key,
  MinKey: min_key,
  ObjectID: objectid,
  BSONRegExp: regexp,
  Symbol: symbol,
  Timestamp: timestamp
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var BSON = mongodbStitchBson;

var BSONTypes = ['Binary', 'Code', 'DBRef', 'Decimal128', 'Double', 'Int32', 'Long', 'MaxKey', 'MinKey', 'ObjectID', 'BSONRegExp', 'Symbol', 'Timestamp'];

setBSONModule(BSON);

// all the types where we don't need to do any special processing and can just pass the EJSON
//straight to type.fromExtendedJSON
var keysToCodecs = {
  $oid: bson.ObjectID,
  $binary: bson.Binary,
  $symbol: bson.Symbol,
  $numberInt: bson.Int32,
  $numberDecimal: bson.Decimal128,
  $numberDouble: bson.Double,
  $numberLong: bson.Long,
  $minKey: bson.MinKey,
  $maxKey: bson.MaxKey,
  $regularExpression: bson.BSONRegExp,
  $timestamp: bson.Timestamp
};

function setBSONModule(module) {
  BSONTypes.forEach(function (t) {
    if (!module[t]) throw new Error('passed in module does not contain all BSON types required');
  });
  BSON = module;
}

function deserializeValue(self, key, value, options) {
  if (typeof value === 'number') {
    // if it's an integer, should interpret as smallest BSON integer
    // that can represent it exactly. (if out of range, interpret as double.)
    if (Math.floor(value) === value) {
      var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX,
          int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX;

      if (int32Range) return options.strict ? new BSON.Int32(value) : value;
      if (int64Range) return options.strict ? new BSON.Long.fromNumber(value) : value;
    }
    // If the number is a non-integer or out of integer range, should interpret as BSON Double.
    return new BSON.Double(value);
  }

  // from here on out we're looking for bson types, so bail if its not an object
  if (value == null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') return value;

  // upgrade deprecated undefined to null
  if (value.$undefined) return null;

  var keys = Object.keys(value).filter(function (k) {
    return k.startsWith('$') && value[k] != null;
  });
  for (var i = 0; i < keys.length; i++) {
    var c = keysToCodecs[keys[i]];
    if (c) return c.fromExtendedJSON(BSON, value, options);
  }

  if (value.$date != null) {
    var d = value.$date,
        date = new Date();

    if (typeof d === 'string') date.setTime(Date.parse(d));else if (d instanceof BSON.Long) date.setTime(d.toNumber());else if (typeof d === 'number' && options.relaxed) date.setTime(d);
    return date;
  }

  if (value.$code != null) {
    if (value.$scope) var scope = deserializeValue(self, null, value.$scope);
    var copy = Object.assign({}, value);
    copy.$scope = scope;
    return bson.Code.fromExtendedJSON(BSON, value);
  }

  if (value.$ref != null || value.$dbPointer != null) {
    var v = value.$ref ? value : value.$dbPointer;

    // we run into this in a "degenerate EJSON" case (with $id and $ref order flipped)
    // because of the order JSON.parse goes through the document
    if (v instanceof BSON.DBRef) return v;

    var dollarKeys = Object.keys(v).filter(function (k) {
      return k.startsWith('$');
    }),
        valid = true;
    dollarKeys.forEach(function (k) {
      if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
    });

    // only make DBRef if $ keys are all valid
    if (valid) return bson.DBRef.fromExtendedJSON(BSON, v);
  }

  return value;
}

var parse = function parse(text, options) {
  var self = this;
  options = options || { relaxed: false };

  // relaxed implies not strict
  if (typeof options.relaxed === 'boolean') options.strict = !options.relaxed;
  if (typeof options.strict === 'boolean') options.relaxed = !options.strict;

  return JSON.parse(text, function (key, value) {
    return deserializeValue(self, key, value, options);
  });
};

//
// Serializer
//

// MAX INT32 boundaries
var BSON_INT32_MAX = 0x7fffffff,
    BSON_INT32_MIN = -0x80000000,
    BSON_INT64_MAX = 0x7fffffffffffffff,
    BSON_INT64_MIN = -0x8000000000000000;

var stringify = function stringify(value, reducer, indents, options) {
  var opts = {};
  if (options != null && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') opts = options;else if (indents != null && (typeof indents === 'undefined' ? 'undefined' : _typeof(indents)) === 'object') {
    opts = indents;
    indents = 0;
  } else if (reducer != null && (typeof reducer === 'undefined' ? 'undefined' : _typeof(reducer)) === 'object') {
    opts = reducer;
    reducer = null;
  }

  var doc = Array.isArray(value) ? serializeArray(value, opts) : serializeDocument(value, opts);
  return JSON.stringify(doc, reducer, indents);
};

function serializeArray(array, options) {
  return array.map(function (v) {
    return serializeValue(v, options);
  });
}

function getISOString(date) {
  var isoStr = date.toISOString();
  // we should only show milliseconds in timestamp if they're non-zero
  return date.getUTCMilliseconds() !== 0 ? isoStr : isoStr.slice(0, -5) + 'Z';
}

function serializeValue(value, options) {
  if (Array.isArray(value)) return serializeArray(value, options);

  if (value === undefined) return null;

  if (value instanceof Date) {
    var dateNum = value.getTime(),

    // is it in year range 1970-9999?
    inRange = dateNum > -1 && dateNum < 253402318800000;

    return options.relaxed && inRange ? { $date: getISOString(value) } : { $date: { $numberLong: value.getTime().toString() } };
  }

  if (typeof value === 'number' && !options.relaxed) {
    // it's an integer
    if (Math.floor(value) === value) {
      var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX,
          int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX;

      // interpret as being of the smallest BSON integer type that can represent the number exactly
      if (int32Range) return { $numberInt: value.toString() };
      if (int64Range) return { $numberLong: value.toString() };
    }
    return { $numberDouble: value.toString() };
  }

  if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return serializeDocument(value, options);
  return value;
}

function serializeDocument(doc, options) {
  if (doc == null || (typeof doc === 'undefined' ? 'undefined' : _typeof(doc)) !== 'object') throw new Error('not an object instance');

  // the document itself is a BSON type
  if (doc._bsontype && BSONTypes.indexOf(doc._bsontype) !== -1) {
    // we need to separately serialize the embedded scope document
    if (doc._bsontype === 'Code' && doc.scope) {
      var tempScope = serializeDocument(doc.scope, options),
          tempDoc = Object.assign({}, doc, { scope: tempScope });
      return bson['Code'].toExtendedJSON(tempDoc, options);
      // we need to separately serialize the embedded OID document
    } else if (doc._bsontype === 'DBRef' && doc.oid) {
      var tempId = serializeDocument(doc.oid, options),
          _tempDoc = Object.assign({}, doc, { oid: tempId });
      return bson['DBRef'].toExtendedJSON(_tempDoc, options);
    }
    return bson[doc._bsontype].toExtendedJSON(doc, options);
  }

  // the document is an object with nested BSON types
  var _doc = {};
  for (var name in doc) {
    var val = doc[name];
    if (Array.isArray(val)) {
      _doc[name] = serializeArray(val, options);
    } else if (val != null && val._bsontype && BSONTypes.indexOf(val._bsontype) !== -1) {
      // we need to separately serialize the embedded scope document
      if (val._bsontype === 'Code' && val.scope) {
        var _tempScope = serializeDocument(val.scope, options),
            tempVal = Object.assign({}, val, { scope: _tempScope });
        _doc[name] = bson['Code'].toExtendedJSON(tempVal, options);
        // we need to separately serialize the embedded OID document
      } else if (val._bsontype === 'DBRef' && val.oid) {
        var _tempId = serializeDocument(val.oid, options),
            _tempVal = Object.assign({}, val, { oid: _tempId });
        _doc[name] = bson['DBRef'].toExtendedJSON(_tempVal, options);
      } else _doc[name] = bson[val._bsontype].toExtendedJSON(val, options);
    } else if (val instanceof Date) {
      _doc[name] = serializeValue(val, options);
    } else if (val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      _doc[name] = serializeDocument(val, options);
    }
    _doc[name] = serializeValue(val, options);
    if (val instanceof RegExp) {
      var flags = val.flags;
      if (flags === undefined) {
        flags = val.toString().match(/[gimuy]*$/)[0];
      }
      _doc[name] = bson['BSONRegExp'].toExtendedJSON({ pattern: val.source, options: flags });
    }
  }

  return _doc;
}

var ext_json = {
  parse: parse,
  stringify: stringify,
  setBSONModule: setBSONModule,
  BSON: BSON
};

var mongodbExtjson = {
  parse: ext_json.parse,
  stringify: ext_json.stringify,
  setBSONModule: ext_json.setBSONModule,
  BSON: ext_json.BSON
};
var mongodbExtjson_1 = mongodbExtjson.parse;
var mongodbExtjson_2 = mongodbExtjson.stringify;
var mongodbExtjson_3 = mongodbExtjson.setBSONModule;
var mongodbExtjson_4 = mongodbExtjson.BSON;

exports.default = mongodbExtjson;
exports.parse = mongodbExtjson_1;
exports.stringify = mongodbExtjson_2;
exports.setBSONModule = mongodbExtjson_3;
exports.BSON = mongodbExtjson_4;

Object.defineProperty(exports, '__esModule', { value: true });

})));

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-extjson/dist/ejson.browser.umd.js","/../../node_modules/mongodb-stitch-extjson/dist")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-bson":112}],112:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('buffer')) :
	typeof define === 'function' && define.amd ? define(['buffer'], factory) :
	(global.BSON = factory(global.Buffer));
}(this, (function (require$$0) { 'use strict';

require$$0 = require$$0 && require$$0.hasOwnProperty('default') ? require$$0['default'] : require$$0;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var map = createCommonjsModule(function (module) {

  var Buffer = require$$0.Buffer;

  // We have an ES6 Map available, return the native instance
  if (typeof commonjsGlobal.Map !== 'undefined') {
    module.exports = commonjsGlobal.Map;
    module.exports.Map = commonjsGlobal.Map;
  } else {
    // We will return a polyfill
    var Map = function Map(array) {
      this._keys = [];
      this._values = {};

      for (var i = 0; i < array.length; i++) {
        if (array[i] == null) continue; // skip null and undefined
        var entry = array[i];
        var key = entry[0];
        var value = entry[1];
        // Add the key to the list of keys in order
        this._keys.push(key);
        // Add the key and value to the values dictionary with a point
        // to the location in the ordered keys list
        this._values[key] = { v: value, i: this._keys.length - 1 };
      }
    };

    Map.prototype.clear = function () {
      this._keys = [];
      this._values = {};
    };

    Map.prototype.delete = function (key) {
      var value = this._values[key];
      if (value == null) return false;
      // Delete entry
      delete this._values[key];
      // Remove the key from the ordered keys list
      this._keys.splice(value.i, 1);
      return true;
    };

    Map.prototype.entries = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? [key, self._values[key].v] : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.forEach = function (callback, self) {
      self = self || this;

      for (var i = 0; i < this._keys.length; i++) {
        var key = this._keys[i];
        // Call the forEach callback
        callback.call(self, this._values[key].v, key, self);
      }
    };

    Map.prototype.get = function (key) {
      return this._values[key] ? this._values[key].v : undefined;
    };

    Map.prototype.has = function (key) {
      return this._values[key] != null;
    };

    Map.prototype.keys = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? key : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.set = function (key, value) {
      if (this._values[key]) {
        this._values[key].v = value;
        return this;
      }

      // Add the key to the list of keys in order
      this._keys.push(key);
      // Add the key and value to the values dictionary with a point
      // to the location in the ordered keys list
      this._values[key] = { v: value, i: this._keys.length - 1 };
      return this;
    };

    Map.prototype.values = function () {
      var self = this;
      var index = 0;

      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? self._values[key].v : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    // Last ismaster
    Object.defineProperty(Map.prototype, 'size', {
      enumerable: true,
      get: function get() {
        return this._keys.length;
      }
    });

    module.exports = Map;
    module.exports.Map = Map;
  }
});
var map_1 = map.Map;

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Copyright 2009 Google Inc. All Rights Reserved

/**
 * Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "Long". This
 * implementation is derived from LongLib in GWT.
 *
 * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
 * values as *signed* integers.  See the from* functions below for more
 * convenient ways of constructing Longs.
 *
 * The internal representation of a Long is the two given signed, 32-bit values.
 * We use 32-bit pieces because these are the size of integers on which
 * Javascript performs bit-operations.  For operations like addition and
 * multiplication, we split each number into 16-bit pieces, which can easily be
 * multiplied within Javascript's floating-point representation without overflow
 * or change in sign.
 *
 * In the algorithms below, we frequently reduce the negative case to the
 * positive case by negating the input(s) and then post-processing the result.
 * Note that we must ALWAYS check specially whether those values are MIN_VALUE
 * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
 * a positive number, it overflows back into a negative).  Not handling this
 * case would often result in infinite recursion.
 *
 * @class
 * @param {number} low  the low (signed) 32 bits of the Long.
 * @param {number} high the high (signed) 32 bits of the Long.
 * @return {Long}
 */

function Long(low, high) {
  if (!(this instanceof Long)) return new Long(low, high);

  this._bsontype = 'Long';
  /**
   * @type {number}
   * @ignore
   */
  this.low_ = low | 0; // force into 32 signed bits.

  /**
   * @type {number}
   * @ignore
   */
  this.high_ = high | 0; // force into 32 signed bits.
}

/**
 * Return the int value.
 *
 * @method
 * @return {number} the value, assuming it is a 32-bit integer.
 */
Long.prototype.toInt = function () {
  return this.low_;
};

/**
 * Return the Number value.
 *
 * @method
 * @return {number} the closest floating-point representation to this value.
 */
Long.prototype.toNumber = function () {
  return this.high_ * Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned();
};

/**
 * Return the JSON value.
 *
 * @method
 * @return {string} the JSON representation.
 */
Long.prototype.toJSON = function () {
  return this.toString();
};

/**
 * Return the String value.
 *
 * @method
 * @param {number} [opt_radix] the radix in which the text should be written.
 * @return {string} the textual representation of this value.
 */
Long.prototype.toString = function (opt_radix) {
  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (this.isZero()) {
    return '0';
  }

  if (this.isNegative()) {
    if (this.equals(Long.MIN_VALUE)) {
      // We need to change the Long value before it can be negated, so we remove
      // the bottom-most digit in this base and then recurse to do the rest.
      var radixLong = Long.fromNumber(radix);
      var div = this.div(radixLong);
      var rem = div.multiply(radixLong).subtract(this);
      return div.toString(radix) + rem.toInt().toString(radix);
    } else {
      return '-' + this.negate().toString(radix);
    }
  }

  // Do several (6) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Long.fromNumber(Math.pow(radix, 6));

  rem = this;
  var result = '';

  while (!rem.isZero()) {
    var remDiv = rem.div(radixToPower);
    var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
    var digits = intval.toString(radix);

    rem = remDiv;
    if (rem.isZero()) {
      return digits + result;
    } else {
      while (digits.length < 6) {
        digits = '0' + digits;
      }
      result = '' + digits + result;
    }
  }
};

/**
 * Return the high 32-bits value.
 *
 * @method
 * @return {number} the high 32-bits as a signed value.
 */
Long.prototype.getHighBits = function () {
  return this.high_;
};

/**
 * Return the low 32-bits value.
 *
 * @method
 * @return {number} the low 32-bits as a signed value.
 */
Long.prototype.getLowBits = function () {
  return this.low_;
};

/**
 * Return the low unsigned 32-bits value.
 *
 * @method
 * @return {number} the low 32-bits as an unsigned value.
 */
Long.prototype.getLowBitsUnsigned = function () {
  return this.low_ >= 0 ? this.low_ : Long.TWO_PWR_32_DBL_ + this.low_;
};

/**
 * Returns the number of bits needed to represent the absolute value of this Long.
 *
 * @method
 * @return {number} Returns the number of bits needed to represent the absolute value of this Long.
 */
Long.prototype.getNumBitsAbs = function () {
  if (this.isNegative()) {
    if (this.equals(Long.MIN_VALUE)) {
      return 64;
    } else {
      return this.negate().getNumBitsAbs();
    }
  } else {
    var val = this.high_ !== 0 ? this.high_ : this.low_;
    for (var bit = 31; bit > 0; bit--) {
      if ((val & 1 << bit) !== 0) {
        break;
      }
    }
    return this.high_ !== 0 ? bit + 33 : bit + 1;
  }
};

/**
 * Return whether this value is zero.
 *
 * @method
 * @return {boolean} whether this value is zero.
 */
Long.prototype.isZero = function () {
  return this.high_ === 0 && this.low_ === 0;
};

/**
 * Return whether this value is negative.
 *
 * @method
 * @return {boolean} whether this value is negative.
 */
Long.prototype.isNegative = function () {
  return this.high_ < 0;
};

/**
 * Return whether this value is odd.
 *
 * @method
 * @return {boolean} whether this value is odd.
 */
Long.prototype.isOdd = function () {
  return (this.low_ & 1) === 1;
};

/**
 * Return whether this Long equals the other
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long equals the other
 */
Long.prototype.equals = function (other) {
  return this.high_ === other.high_ && this.low_ === other.low_;
};

/**
 * Return whether this Long does not equal the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long does not equal the other.
 */
Long.prototype.notEquals = function (other) {
  return this.high_ !== other.high_ || this.low_ !== other.low_;
};

/**
 * Return whether this Long is less than the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is less than the other.
 */
Long.prototype.lessThan = function (other) {
  return this.compare(other) < 0;
};

/**
 * Return whether this Long is less than or equal to the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is less than or equal to the other.
 */
Long.prototype.lessThanOrEqual = function (other) {
  return this.compare(other) <= 0;
};

/**
 * Return whether this Long is greater than the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is greater than the other.
 */
Long.prototype.greaterThan = function (other) {
  return this.compare(other) > 0;
};

/**
 * Return whether this Long is greater than or equal to the other.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} whether this Long is greater than or equal to the other.
 */
Long.prototype.greaterThanOrEqual = function (other) {
  return this.compare(other) >= 0;
};

/**
 * Compares this Long with the given one.
 *
 * @method
 * @param {Long} other Long to compare against.
 * @return {boolean} 0 if they are the same, 1 if the this is greater, and -1 if the given one is greater.
 */
Long.prototype.compare = function (other) {
  if (this.equals(other)) {
    return 0;
  }

  var thisNeg = this.isNegative();
  var otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) {
    return -1;
  }
  if (!thisNeg && otherNeg) {
    return 1;
  }

  // at this point, the signs are the same, so subtraction will not overflow
  if (this.subtract(other).isNegative()) {
    return -1;
  } else {
    return 1;
  }
};

/**
 * The negation of this value.
 *
 * @method
 * @return {Long} the negation of this value.
 */
Long.prototype.negate = function () {
  if (this.equals(Long.MIN_VALUE)) {
    return Long.MIN_VALUE;
  } else {
    return this.not().add(Long.ONE);
  }
};

/**
 * Returns the sum of this and the given Long.
 *
 * @method
 * @param {Long} other Long to add to this one.
 * @return {Long} the sum of this and the given Long.
 */
Long.prototype.add = function (other) {
  // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xffff;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xffff;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xffff;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xffff;

  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 0xffff;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c48 += a48 + b48;
  c48 &= 0xffff;
  return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

/**
 * Returns the difference of this and the given Long.
 *
 * @method
 * @param {Long} other Long to subtract from this.
 * @return {Long} the difference of this and the given Long.
 */
Long.prototype.subtract = function (other) {
  return this.add(other.negate());
};

/**
 * Returns the product of this and the given Long.
 *
 * @method
 * @param {Long} other Long to multiply with this.
 * @return {Long} the product of this and the other.
 */
Long.prototype.multiply = function (other) {
  if (this.isZero()) {
    return Long.ZERO;
  } else if (other.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    return other.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  } else if (other.equals(Long.MIN_VALUE)) {
    return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().multiply(other.negate());
    } else {
      return this.negate().multiply(other).negate();
    }
  } else if (other.isNegative()) {
    return this.multiply(other.negate()).negate();
  }

  // If both Longs are small, use float multiplication
  if (this.lessThan(Long.TWO_PWR_24_) && other.lessThan(Long.TWO_PWR_24_)) {
    return Long.fromNumber(this.toNumber() * other.toNumber());
  }

  // Divide each Long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xffff;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xffff;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xffff;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xffff;

  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xffff;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xffff;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xffff;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xffff;
  return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

/**
 * Returns this Long divided by the given one.
 *
 * @method
 * @param {Long} other Long by which to divide.
 * @return {Long} this Long divided by the given one.
 */
Long.prototype.div = function (other) {
  if (other.isZero()) {
    throw Error('division by zero');
  } else if (this.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    if (other.equals(Long.ONE) || other.equals(Long.NEG_ONE)) {
      return Long.MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
    } else if (other.equals(Long.MIN_VALUE)) {
      return Long.ONE;
    } else {
      // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
      var halfThis = this.shiftRight(1);
      var approx = halfThis.div(other).shiftLeft(1);
      if (approx.equals(Long.ZERO)) {
        return other.isNegative() ? Long.ONE : Long.NEG_ONE;
      } else {
        var rem = this.subtract(other.multiply(approx));
        var result = approx.add(rem.div(other));
        return result;
      }
    }
  } else if (other.equals(Long.MIN_VALUE)) {
    return Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().div(other.negate());
    } else {
      return this.negate().div(other).negate();
    }
  } else if (other.isNegative()) {
    return this.div(other.negate()).negate();
  }

  // Repeat the following until the remainder is less than other:  find a
  // floating-point that approximates remainder / other *from below*, add this
  // into the result, and subtract it from the remainder.  It is critical that
  // the approximate value is less than or equal to the real value so that the
  // remainder never becomes negative.
  var res = Long.ZERO;
  rem = this;
  while (rem.greaterThanOrEqual(other)) {
    // Approximate the result of division. This may be a little greater or
    // smaller than the actual value.
    approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

    // We will tweak the approximate result by changing it in the 48-th digit or
    // the smallest non-fractional digit, whichever is larger.
    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);

    // Decrease the approximation until it is smaller than the remainder.  Note
    // that if it is too large, the product overflows and is negative.
    var approxRes = Long.fromNumber(approx);
    var approxRem = approxRes.multiply(other);
    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
      approx -= delta;
      approxRes = Long.fromNumber(approx);
      approxRem = approxRes.multiply(other);
    }

    // We know the answer can't be zero... and actually, zero would cause
    // infinite recursion since we would make no progress.
    if (approxRes.isZero()) {
      approxRes = Long.ONE;
    }

    res = res.add(approxRes);
    rem = rem.subtract(approxRem);
  }
  return res;
};

/**
 * Returns this Long modulo the given one.
 *
 * @method
 * @param {Long} other Long by which to mod.
 * @return {Long} this Long modulo the given one.
 */
Long.prototype.modulo = function (other) {
  return this.subtract(this.div(other).multiply(other));
};

/**
 * The bitwise-NOT of this value.
 *
 * @method
 * @return {Long} the bitwise-NOT of this value.
 */
Long.prototype.not = function () {
  return Long.fromBits(~this.low_, ~this.high_);
};

/**
 * Returns the bitwise-AND of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to AND.
 * @return {Long} the bitwise-AND of this and the other.
 */
Long.prototype.and = function (other) {
  return Long.fromBits(this.low_ & other.low_, this.high_ & other.high_);
};

/**
 * Returns the bitwise-OR of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to OR.
 * @return {Long} the bitwise-OR of this and the other.
 */
Long.prototype.or = function (other) {
  return Long.fromBits(this.low_ | other.low_, this.high_ | other.high_);
};

/**
 * Returns the bitwise-XOR of this Long and the given one.
 *
 * @method
 * @param {Long} other the Long with which to XOR.
 * @return {Long} the bitwise-XOR of this and the other.
 */
Long.prototype.xor = function (other) {
  return Long.fromBits(this.low_ ^ other.low_, this.high_ ^ other.high_);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the left by the given amount.
 */
Long.prototype.shiftLeft = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var low = this.low_;
    if (numBits < 32) {
      var high = this.high_;
      return Long.fromBits(low << numBits, high << numBits | low >>> 32 - numBits);
    } else {
      return Long.fromBits(0, low << numBits - 32);
    }
  }
};

/**
 * Returns this Long with bits shifted to the right by the given amount.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the right by the given amount.
 */
Long.prototype.shiftRight = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(low >>> numBits | high << 32 - numBits, high >> numBits);
    } else {
      return Long.fromBits(high >> numBits - 32, high >= 0 ? 0 : -1);
    }
  }
};

/**
 * Returns this Long with bits shifted to the right by the given amount, with the new top bits matching the current sign bit.
 *
 * @method
 * @param {number} numBits the number of bits by which to shift.
 * @return {Long} this shifted to the right by the given amount, with zeros placed into the new leading bits.
 */
Long.prototype.shiftRightUnsigned = function (numBits) {
  numBits &= 63;
  if (numBits === 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits);
    } else if (numBits === 32) {
      return Long.fromBits(high, 0);
    } else {
      return Long.fromBits(high >>> numBits - 32, 0);
    }
  }
};

/**
 * Returns a Long representing the given (32-bit) integer value.
 *
 * @method
 * @param {number} value the 32-bit integer in question.
 * @return {Long} the corresponding Long value.
 */
Long.fromInt = function (value) {
  if (-128 <= value && value < 128) {
    var cachedObj = Long.INT_CACHE_[value];
    if (cachedObj) {
      return cachedObj;
    }
  }

  var obj = new Long(value | 0, value < 0 ? -1 : 0);
  if (-128 <= value && value < 128) {
    Long.INT_CACHE_[value] = obj;
  }
  return obj;
};

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 *
 * @method
 * @param {number} value the number in question.
 * @return {Long} the corresponding Long value.
 */
Long.fromNumber = function (value) {
  if (isNaN(value) || !isFinite(value)) {
    return Long.ZERO;
  } else if (value <= -Long.TWO_PWR_63_DBL_) {
    return Long.MIN_VALUE;
  } else if (value + 1 >= Long.TWO_PWR_63_DBL_) {
    return Long.MAX_VALUE;
  } else if (value < 0) {
    return Long.fromNumber(-value).negate();
  } else {
    return new Long(value % Long.TWO_PWR_32_DBL_ | 0, value / Long.TWO_PWR_32_DBL_ | 0);
  }
};

/**
 * Returns a Long representing the 64-bit integer that comes by concatenating the given high and low bits. Each is assumed to use 32 bits.
 *
 * @method
 * @param {number} lowBits the low 32-bits.
 * @param {number} highBits the high 32-bits.
 * @return {Long} the corresponding Long value.
 */
Long.fromBits = function (lowBits, highBits) {
  return new Long(lowBits, highBits);
};

/**
 * Returns a Long representation of the given string, written using the given radix.
 *
 * @method
 * @param {string} str the textual representation of the Long.
 * @param {number} opt_radix the radix in which the text is written.
 * @return {Long} the corresponding Long value.
 */
Long.fromString = function (str, opt_radix) {
  if (str.length === 0) {
    throw Error('number format error: empty string');
  }

  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (str.charAt(0) === '-') {
    return Long.fromString(str.substring(1), radix).negate();
  } else if (str.indexOf('-') >= 0) {
    throw Error('number format error: interior "-" character: ' + str);
  }

  // Do several (8) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Long.fromNumber(Math.pow(radix, 8));

  var result = Long.ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = Long.fromNumber(Math.pow(radix, size));
      result = result.multiply(power).add(Long.fromNumber(value));
    } else {
      result = result.multiply(radixToPower);
      result = result.add(Long.fromNumber(value));
    }
  }
  return result;
};

// NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
// from* methods on which they depend.

/**
 * A cache of the Long representations of small integer values.
 * @type {Object}
 * @ignore
 */
Long.INT_CACHE_ = {};

// NOTE: the compiler should inline these constant values below and then remove
// these variables, so there should be no runtime penalty for these.

/**
 * Number used repeated below in calculations.  This must appear before the
 * first call to any from* function below.
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_16_DBL_ = 1 << 16;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_24_DBL_ = 1 << 24;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_32_DBL_ = Long.TWO_PWR_16_DBL_ * Long.TWO_PWR_16_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_31_DBL_ = Long.TWO_PWR_32_DBL_ / 2;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_48_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_16_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_64_DBL_ = Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_32_DBL_;

/**
 * @type {number}
 * @ignore
 */
Long.TWO_PWR_63_DBL_ = Long.TWO_PWR_64_DBL_ / 2;

/** @type {Long} */
Long.ZERO = Long.fromInt(0);

/** @type {Long} */
Long.ONE = Long.fromInt(1);

/** @type {Long} */
Long.NEG_ONE = Long.fromInt(-1);

/** @type {Long} */
Long.MAX_VALUE = Long.fromBits(0xffffffff | 0, 0x7fffffff | 0);

/** @type {Long} */
Long.MIN_VALUE = Long.fromBits(0, 0x80000000 | 0);

/**
 * @type {Long}
 * @ignore
 */
Long.TWO_PWR_24_ = Long.fromInt(1 << 24);

/**
 * Expose.
 */
var long_1 = Long;
var Long_1 = Long;
long_1.Long = Long_1;

/**
 * A class representation of the BSON Double type.
 *
 * @class
 * @param {number} value the number we want to represent as a double.
 * @return {Double}
 */

function Double(value) {
  if (!(this instanceof Double)) return new Double(value);

  this._bsontype = 'Double';
  this.value = value;
}

/**
 * Access the number value.
 *
 * @method
 * @return {number} returns the wrapped double number.
 */
Double.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
Double.prototype.toJSON = function () {
  return this.value;
};

var double_1 = Double;
var Double_1 = Double;
double_1.Double = Double_1;

/**
 * @class
 * @param {number} low  the low (signed) 32 bits of the Timestamp.
 * @param {number} high the high (signed) 32 bits of the Timestamp.
 * @return {Timestamp}
 */
function Timestamp(low, high) {
  if (low instanceof long_1) {
    long_1.call(this, low.low_, low.high_);
  } else {
    long_1.call(this, low, high);
  }

  this._bsontype = 'Timestamp';
}

Timestamp.prototype = Object.create(long_1.prototype);
Timestamp.prototype.constructor = Timestamp;

/**
 * Return the JSON value.
 *
 * @method
 * @return {String} the JSON representation.
 */
Timestamp.prototype.toJSON = function () {
  return {
    $timestamp: this.toString()
  };
};

/**
 * Returns a Timestamp represented by the given (32-bit) integer value.
 *
 * @method
 * @param {number} value the 32-bit integer in question.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromInt = function (value) {
  return new Timestamp(long_1.fromInt(value));
};

/**
 * Returns a Timestamp representing the given number value, provided that it is a finite number. Otherwise, zero is returned.
 *
 * @method
 * @param {number} value the number in question.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromNumber = function (value) {
  return new Timestamp(long_1.fromNumber(value));
};

/**
 * Returns a Timestamp for the given high and low bits. Each is assumed to use 32 bits.
 *
 * @method
 * @param {number} lowBits the low 32-bits.
 * @param {number} highBits the high 32-bits.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromBits = function (lowBits, highBits) {
  return new Timestamp(lowBits, highBits);
};

/**
 * Returns a Timestamp from the given string, optionally using the given radix.
 *
 * @method
 * @param {String} str the textual representation of the Timestamp.
 * @param {number} [opt_radix] the radix in which the text is written.
 * @return {Timestamp} the timestamp.
 */
Timestamp.fromString = function (str, opt_radix) {
  return new Timestamp(long_1.fromString(str, opt_radix));
};

var timestamp = Timestamp;
var Timestamp_1 = Timestamp;
timestamp.Timestamp = Timestamp_1;

/*
The MIT License (MIT)

Copyright (c) 2016 CoderPuppy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var _endianness;
function endianness() {
  if (typeof _endianness === 'undefined') {
    var a = new ArrayBuffer(2);
    var b = new Uint8Array(a);
    var c = new Uint16Array(a);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = 'BE';
    } else if (c[0] === 513) {
      _endianness = 'LE';
    } else {
      throw new Error('unable to figure out endianess');
    }
  }
  return _endianness;
}

function hostname() {
  if (typeof global.location !== 'undefined') {
    return global.location.hostname;
  } else return '';
}

function loadavg() {
  return [];
}

function uptime() {
  return 0;
}

function freemem() {
  return Number.MAX_VALUE;
}

function totalmem() {
  return Number.MAX_VALUE;
}

function cpus() {
  return [];
}

function type() {
  return 'Browser';
}

function release() {
  if (typeof global.navigator !== 'undefined') {
    return global.navigator.appVersion;
  }
  return '';
}

function networkInterfaces() {}
function getNetworkInterfaces() {}

function arch() {
  return 'javascript';
}

function platform() {
  return 'browser';
}

function tmpDir() {
  return '/tmp';
}
var tmpdir = tmpDir;

var EOL = '\n';
var os = {
  EOL: EOL,
  tmpdir: tmpdir,
  tmpDir: tmpDir,
  networkInterfaces: networkInterfaces,
  getNetworkInterfaces: getNetworkInterfaces,
  release: release,
  type: type,
  cpus: cpus,
  totalmem: totalmem,
  freemem: freemem,
  uptime: uptime,
  loadavg: loadavg,
  hostname: hostname,
  endianness: endianness
};

var os$1 = Object.freeze({
	endianness: endianness,
	hostname: hostname,
	loadavg: loadavg,
	uptime: uptime,
	freemem: freemem,
	totalmem: totalmem,
	cpus: cpus,
	type: type,
	release: release,
	networkInterfaces: networkInterfaces,
	getNetworkInterfaces: getNetworkInterfaces,
	arch: arch,
	platform: platform,
	tmpDir: tmpDir,
	tmpdir: tmpdir,
	EOL: EOL,
	default: os
});

var Buffer = require$$0.Buffer;

var MASK_8 = 0xff;
var MASK_24 = 0xffffff;
var MASK_32 = 0xffffffff;

// See http://www.isthe.com/chongo/tech/comp/fnv/#FNV-param for the definition of these parameters;
var FNV_PRIME = new long_1(16777619, 0);
var OFFSET_BASIS = new long_1(2166136261, 0);
var FNV_MASK = new long_1(MASK_32, 0);

/**
 * Implementation of the FNV-1a hash for a 32-bit hash value
 * Algorithm can be found here: http://www.isthe.com/chongo/tech/comp/fnv/#FNV-1a
 * @ignore
 */
function fnv1a32(input, encoding) {
  encoding = encoding || 'utf8';
  var octets = Buffer.from(input, encoding);

  var hash = OFFSET_BASIS;
  for (var i = 0; i < octets.length; i += 1) {
    hash = hash.xor(new long_1(octets[i], 0));
    hash = hash.multiply(FNV_PRIME);
    hash = hash.and(FNV_MASK);
  }
  return hash.getLowBitsUnsigned();
}

/**
 * Implements FNV-1a to generate 32-bit hash, then uses xor-folding
 * to convert to a 24-bit hash. See here for more info:
 * http://www.isthe.com/chongo/tech/comp/fnv/#xor-fold
 * @ignore
 */
function fnv1a24(input, encoding) {
  var _32bit = fnv1a32(input, encoding);
  var base = _32bit & MASK_24;
  var top = _32bit >>> 24 & MASK_8;
  var final = (base ^ top) & MASK_24;

  return final;
}

var fnv1a = { fnv1a24: fnv1a24, fnv1a32: fnv1a32 };

var require$$1 = ( os$1 && os ) || os$1;

var Buffer$1 = require$$0.Buffer;
var hostname$1 = require$$1.hostname;
var fnv1a24$1 = fnv1a.fnv1a24;

/**
 * Machine id.
 *
 * Create a random 3-byte value (i.e. unique for this
 * process). Other drivers use a md5 of the machine id here, but
 * that would mean an asyc call to gethostname, so we don't bother.
 * @ignore
 */
var MACHINE_ID = fnv1a24$1(hostname$1);

// Regular expression that checks for hex value
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
var hasBufferType = false;

// Check if buffer exists
try {
  if (Buffer$1 && Buffer$1.from) hasBufferType = true;
} catch (err) {
  hasBufferType = false;
}

/**
 * Create a new ObjectID instance
 *
 * @class
 * @param {(string|number)} id Can be a 24 byte hex string, 12 byte binary string or a Number.
 * @property {number} generationTime The generation time of this ObjectId instance
 * @return {ObjectID} instance of ObjectID.
 */
function ObjectID(id) {
  // Duck-typing to support ObjectId from different npm packages
  if (id instanceof ObjectID) return id;
  if (!(this instanceof ObjectID)) return new ObjectID(id);

  this._bsontype = 'ObjectID';

  // The most common usecase (blank id, new objectId instance)
  if (id == null || typeof id === 'number') {
    // Generate a new id
    this.id = this.generate(id);
    // If we are caching the hex string
    if (ObjectID.cacheHexString) this.__id = this.toString('hex');
    // Return the object
    return;
  }

  // Check if the passed in id is valid
  var valid = ObjectID.isValid(id);

  // Throw an error if it's not a valid setup
  if (!valid && id != null) {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  } else if (valid && typeof id === 'string' && id.length === 24 && hasBufferType) {
    return new ObjectID(new Buffer$1(id, 'hex'));
  } else if (valid && typeof id === 'string' && id.length === 24) {
    return ObjectID.createFromHexString(id);
  } else if (id != null && id.length === 12) {
    // assume 12 byte string
    this.id = id;
  } else if (id != null && id.toHexString) {
    // Duck-typing to support ObjectId from different npm packages
    return id;
  } else {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  }

  if (ObjectID.cacheHexString) this.__id = this.toString('hex');
}

// Allow usage of ObjectId as well as ObjectID
// var ObjectId = ObjectID;

// Precomputed hex table enables speedy hex string conversion
var hexTable = [];
for (var i = 0; i < 256; i++) {
  hexTable[i] = (i <= 15 ? '0' : '') + i.toString(16);
}

/**
 * Return the ObjectID id as a 24 byte hex string representation
 *
 * @method
 * @return {string} return the 24 byte hex string representation.
 */
ObjectID.prototype.toHexString = function () {
  if (ObjectID.cacheHexString && this.__id) return this.__id;

  var hexString = '';
  if (!this.id || !this.id.length) {
    throw new TypeError('invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [' + JSON.stringify(this.id) + ']');
  }

  if (this.id instanceof _Buffer) {
    hexString = convertToHex(this.id);
    if (ObjectID.cacheHexString) this.__id = hexString;
    return hexString;
  }

  for (var i = 0; i < this.id.length; i++) {
    hexString += hexTable[this.id.charCodeAt(i)];
  }

  if (ObjectID.cacheHexString) this.__id = hexString;
  return hexString;
};

/**
 * Update the ObjectID index used in generating new ObjectID's on the driver
 *
 * @method
 * @return {number} returns next index value.
 * @ignore
 */
ObjectID.prototype.get_inc = function () {
  return ObjectID.index = (ObjectID.index + 1) % 0xffffff;
};

/**
 * Update the ObjectID index used in generating new ObjectID's on the driver
 *
 * @method
 * @return {number} returns next index value.
 * @ignore
 */
ObjectID.prototype.getInc = function () {
  return this.get_inc();
};

/**
 * Generate a 12 byte id buffer used in ObjectID's
 *
 * @method
 * @param {number} [time] optional parameter allowing to pass in a second based timestamp.
 * @return {Buffer} return the 12 byte id buffer string.
 */
ObjectID.prototype.generate = function (time) {
  if ('number' !== typeof time) {
    time = ~~(Date.now() / 1000);
  }

  // Use pid
  var pid = (typeof process === 'undefined' || process.pid === 1 ? Math.floor(Math.random() * 100000) : process.pid) % 0xffff;
  var inc = this.get_inc();
  // Buffer used
  var buffer = new Buffer$1(12);
  // Encode time
  buffer[3] = time & 0xff;
  buffer[2] = time >> 8 & 0xff;
  buffer[1] = time >> 16 & 0xff;
  buffer[0] = time >> 24 & 0xff;
  // Encode machine
  buffer[6] = MACHINE_ID & 0xff;
  buffer[5] = MACHINE_ID >> 8 & 0xff;
  buffer[4] = MACHINE_ID >> 16 & 0xff;
  // Encode pid
  buffer[8] = pid & 0xff;
  buffer[7] = pid >> 8 & 0xff;
  // Encode index
  buffer[11] = inc & 0xff;
  buffer[10] = inc >> 8 & 0xff;
  buffer[9] = inc >> 16 & 0xff;
  // Return the buffer
  return buffer;
};

/**
 * Converts the id into a 24 byte hex string for printing
 *
 * @param {String} format The Buffer toString format parameter.
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.toString = function (format) {
  // Is the id a buffer then use the buffer toString method to return the format
  if (this.id && this.id.copy) {
    return this.id.toString(typeof format === 'string' ? format : 'hex');
  }

  // if(this.buffer )
  return this.toHexString();
};

/**
 * Converts to a string representation of this Id.
 *
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.inspect = ObjectID.prototype.toString;

/**
 * Converts to its JSON representation.
 *
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */
ObjectID.prototype.toJSON = function () {
  return this.toHexString();
};

/**
 * Compares the equality of this ObjectID with `otherID`.
 *
 * @method
 * @param {object} otherID ObjectID instance to compare against.
 * @return {boolean} the result of comparing two ObjectID's
 */
ObjectID.prototype.equals = function equals(otherId) {
  if (otherId instanceof ObjectID) {
    return this.toString() === otherId.toString();
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 12 && this.id instanceof _Buffer) {
    return otherId === this.id.toString('binary');
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 24) {
    return otherId.toLowerCase() === this.toHexString();
  } else if (typeof otherId === 'string' && ObjectID.isValid(otherId) && otherId.length === 12) {
    return otherId === this.id;
  } else if (otherId != null && (otherId instanceof ObjectID || otherId.toHexString)) {
    return otherId.toHexString() === this.toHexString();
  } else {
    return false;
  }
};

/**
 * Returns the generation date (accurate up to the second) that this ID was generated.
 *
 * @method
 * @return {date} the generation date
 */
ObjectID.prototype.getTimestamp = function () {
  var timestamp = new Date();
  var time = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
  timestamp.setTime(Math.floor(time) * 1000);
  return timestamp;
};

/**
 * @ignore
 */
ObjectID.index = ~~(Math.random() * 0xffffff);

/**
 * @ignore
 */
ObjectID.createPk = function createPk() {
  return new ObjectID();
};

/**
 * Creates an ObjectID from a second based number, with the rest of the ObjectID zeroed out. Used for comparisons or sorting the ObjectID.
 *
 * @method
 * @param {number} time an integer number representing a number of seconds.
 * @return {ObjectID} return the created ObjectID
 */
ObjectID.createFromTime = function createFromTime(time) {
  var buffer = new Buffer$1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // Encode time into first 4 bytes
  buffer[3] = time & 0xff;
  buffer[2] = time >> 8 & 0xff;
  buffer[1] = time >> 16 & 0xff;
  buffer[0] = time >> 24 & 0xff;
  // Return the new objectId
  return new ObjectID(buffer);
};

// Lookup tables
var decodeLookup = [];
i = 0;
while (i < 10) {
  decodeLookup[0x30 + i] = i++;
}while (i < 16) {
  decodeLookup[0x41 - 10 + i] = decodeLookup[0x61 - 10 + i] = i++;
}var _Buffer = Buffer$1;
var convertToHex = function convertToHex(bytes) {
  return bytes.toString('hex');
};

/**
 * Creates an ObjectID from a hex string representation of an ObjectID.
 *
 * @method
 * @param {string} hexString create a ObjectID from a passed in 24 byte hexstring.
 * @return {ObjectID} return the created ObjectID
 */
ObjectID.createFromHexString = function createFromHexString(string) {
  // Throw an error if it's not a valid setup
  if (typeof string === 'undefined' || string != null && string.length !== 24) {
    throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  }

  // Use Buffer.from method if available
  if (hasBufferType) return new ObjectID(new Buffer$1(string, 'hex'));

  // Calculate lengths
  var array = new _Buffer(12);
  var n = 0;
  var i = 0;

  while (i < 24) {
    array[n++] = decodeLookup[string.charCodeAt(i++)] << 4 | decodeLookup[string.charCodeAt(i++)];
  }

  return new ObjectID(array);
};

/**
 * Checks if a value is a valid bson ObjectId
 *
 * @method
 * @return {boolean} return true if the value is a valid bson ObjectId, return false otherwise.
 */
ObjectID.isValid = function isValid(id) {
  if (id == null) return false;

  if (typeof id === 'number') {
    return true;
  }

  if (typeof id === 'string') {
    return id.length === 12 || id.length === 24 && checkForHexRegExp.test(id);
  }

  if (id instanceof ObjectID) {
    return true;
  }

  if (id instanceof _Buffer) {
    return true;
  }

  // Duck-Typing detection of ObjectId like objects
  if (id.toHexString) {
    return id.id.length === 12 || id.id.length === 24 && checkForHexRegExp.test(id.id);
  }

  return false;
};

/**
 * @ignore
 */
Object.defineProperty(ObjectID.prototype, 'generationTime', {
  enumerable: true,
  get: function get() {
    return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
  },
  set: function set(value) {
    // Encode time into first 4 bytes
    this.id[3] = value & 0xff;
    this.id[2] = value >> 8 & 0xff;
    this.id[1] = value >> 16 & 0xff;
    this.id[0] = value >> 24 & 0xff;
  }
});

/**
 * Expose.
 */
var objectid = ObjectID;
var ObjectID_1 = ObjectID;
var ObjectId = ObjectID;
objectid.ObjectID = ObjectID_1;
objectid.ObjectId = ObjectId;

function alphabetize(str) {
  return str.split('').sort().join('');
}

/**
 * A class representation of the BSON RegExp type.
 *
 * @class
 * @return {BSONRegExp} A MinKey instance
 */
function BSONRegExp(pattern, options) {
  if (!(this instanceof BSONRegExp)) return new BSONRegExp(pattern, options);

  // Execute
  this._bsontype = 'BSONRegExp';
  this.pattern = pattern || '';
  this.options = options ? alphabetize(options) : '';

  // Validate options
  for (var i = 0; i < this.options.length; i++) {
    if (!(this.options[i] === 'i' || this.options[i] === 'm' || this.options[i] === 'x' || this.options[i] === 'l' || this.options[i] === 's' || this.options[i] === 'u')) {
      throw new Error('the regular expression options [' + this.options[i] + '] is not supported');
    }
  }
}

var regexp = BSONRegExp;
var BSONRegExp_1 = BSONRegExp;
regexp.BSONRegExp = BSONRegExp_1;

/**
 * A class representation of the BSON Symbol type.
 *
 * @class
 * @deprecated
 * @param {string} value the string representing the symbol.
 * @return {Symbol}
 */

function _Symbol(value) {
  if (!(this instanceof _Symbol)) return new _Symbol(value);
  this._bsontype = 'Symbol';
  this.value = value;
}

/**
 * Access the wrapped string value.
 *
 * @method
 * @return {String} returns the wrapped string.
 */
_Symbol.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.toString = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.inspect = function () {
  return this.value;
};

/**
 * @ignore
 */
_Symbol.prototype.toJSON = function () {
  return this.value;
};

var symbol = _Symbol;
var Symbol_1 = _Symbol;
symbol.Symbol = Symbol_1;

/**
 * A class representation of a BSON Int32 type.
 *
 * @class
 * @param {number} value the number we want to represent as an int32.
 * @return {Int32}
 */

function Int32(value) {
  if (!(this instanceof Int32)) return new Int32(value);

  this._bsontype = 'Int32';
  this.value = value;
}

/**
 * Access the number value.
 *
 * @method
 * @return {number} returns the wrapped int32 number.
 */
Int32.prototype.valueOf = function () {
  return this.value;
};

/**
 * @ignore
 */
Int32.prototype.toJSON = function () {
  return this.value;
};

var int_32 = Int32;
var Int32_1 = Int32;
int_32.Int32 = Int32_1;

/**
 * A class representation of the BSON Code type.
 *
 * @class
 * @param {(string|function)} code a string or function.
 * @param {Object} [scope] an optional scope for the function.
 * @return {Code}
 */

function Code(code, scope) {
  if (!(this instanceof Code)) return new Code(code, scope);
  this._bsontype = 'Code';
  this.code = code;
  this.scope = scope;
}

/**
 * @ignore
 */
Code.prototype.toJSON = function () {
  return { scope: this.scope, code: this.code };
};

var code = Code;
var Code_1 = Code;
code.Code = Code_1;

var Buffer$2 = require$$0.Buffer;

var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;

var EXPONENT_MAX = 6111;
var EXPONENT_MIN = -6176;
var EXPONENT_BIAS = 6176;
var MAX_DIGITS = 34;

// Nan value bits as 32 bit values (due to lack of longs)
var NAN_BUFFER = [0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
// Infinity value bits 32 bit values (due to lack of longs)
var INF_NEGATIVE_BUFFER = [0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
var INF_POSITIVE_BUFFER = [0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();

var EXPONENT_REGEX = /^([-+])?(\d+)?$/;

// Detect if the value is a digit
var isDigit = function isDigit(value) {
  return !isNaN(parseInt(value, 10));
};

// Divide two uint128 values
var divideu128 = function divideu128(value) {
  var DIVISOR = long_1.fromNumber(1000 * 1000 * 1000);
  var _rem = long_1.fromNumber(0);

  if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
    return { quotient: value, rem: _rem };
  }

  for (var i = 0; i <= 3; i++) {
    // Adjust remainder to match value of next dividend
    _rem = _rem.shiftLeft(32);
    // Add the divided to _rem
    _rem = _rem.add(new long_1(value.parts[i], 0));
    value.parts[i] = _rem.div(DIVISOR).low_;
    _rem = _rem.modulo(DIVISOR);
  }

  return { quotient: value, rem: _rem };
};

// Multiply two Long values and return the 128 bit value
var multiply64x2 = function multiply64x2(left, right) {
  if (!left && !right) {
    return { high: long_1.fromNumber(0), low: long_1.fromNumber(0) };
  }

  var leftHigh = left.shiftRightUnsigned(32);
  var leftLow = new long_1(left.getLowBits(), 0);
  var rightHigh = right.shiftRightUnsigned(32);
  var rightLow = new long_1(right.getLowBits(), 0);

  var productHigh = leftHigh.multiply(rightHigh);
  var productMid = leftHigh.multiply(rightLow);
  var productMid2 = leftLow.multiply(rightHigh);
  var productLow = leftLow.multiply(rightLow);

  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productMid = new long_1(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));

  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productLow = productMid.shiftLeft(32).add(new long_1(productLow.getLowBits(), 0));

  // Return the 128 bit result
  return { high: productHigh, low: productLow };
};

var lessThan = function lessThan(left, right) {
  // Make values unsigned
  var uhleft = left.high_ >>> 0;
  var uhright = right.high_ >>> 0;

  // Compare high bits first
  if (uhleft < uhright) {
    return true;
  } else if (uhleft === uhright) {
    var ulleft = left.low_ >>> 0;
    var ulright = right.low_ >>> 0;
    if (ulleft < ulright) return true;
  }

  return false;
};

var invalidErr = function invalidErr(string, message) {
  throw new TypeError('"${string}" not a valid Decimal128 string - ' + message);
};

/**
 * A class representation of the BSON Decimal128 type.
 *
 * @class
 * @param {Buffer} bytes a buffer containing the raw Decimal128 bytes.
 * @return {Double}
 */
function Decimal128(bytes) {
  this._bsontype = 'Decimal128';
  this.bytes = bytes;
}

/**
 * Create a Decimal128 instance from a string representation
 *
 * @method
 * @param {string} string a numeric string representation.
 * @return {Decimal128} returns a Decimal128 instance.
 */
Decimal128.fromString = function (string) {
  // Parse state tracking
  var isNegative = false;
  var sawRadix = false;
  var foundNonZero = false;

  // Total number of significant digits (no leading or trailing zero)
  var significantDigits = 0;
  // Total number of significand digits read
  var nDigitsRead = 0;
  // Total number of digits (no leading zeros)
  var nDigits = 0;
  // The number of the digits after radix
  var radixPosition = 0;
  // The index of the first non-zero in *str*
  var firstNonZero = 0;

  // Digits Array
  var digits = [0];
  // The number of digits in digits
  var nDigitsStored = 0;
  // Insertion pointer for digits
  var digitsInsert = 0;
  // The index of the first non-zero digit
  var firstDigit = 0;
  // The index of the last digit
  var lastDigit = 0;

  // Exponent
  var exponent = 0;
  // loop index over array
  var i = 0;
  // The high 17 digits of the significand
  var significandHigh = [0, 0];
  // The low 17 digits of the significand
  var significandLow = [0, 0];
  // The biased exponent
  var biasedExponent = 0;

  // Read index
  var index = 0;

  // Naively prevent against REDOS attacks.
  // TODO: implementing a custom parsing for this, or refactoring the regex would yield
  //       further gains.
  if (string.length >= 7000) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  }

  // Results
  var stringMatch = string.match(PARSE_STRING_REGEXP);
  var infMatch = string.match(PARSE_INF_REGEXP);
  var nanMatch = string.match(PARSE_NAN_REGEXP);

  // Validate the string
  if (!stringMatch && !infMatch && !nanMatch || string.length === 0) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  }

  if (stringMatch) {
    // full_match = stringMatch[0]
    // sign = stringMatch[1]

    var unsignedNumber = stringMatch[2];
    // stringMatch[3] is undefined if a whole number (ex "1", 12")
    // but defined if a number w/ decimal in it (ex "1.0, 12.2")

    var e = stringMatch[4];
    var expSign = stringMatch[5];
    var expNumber = stringMatch[6];

    // they provided e, but didn't give an exponent number. for ex "1e"
    if (e && expNumber === undefined) invalidErr(string, 'missing exponent power');

    // they provided e, but didn't give a number before it. for ex "e1"
    if (e && unsignedNumber === undefined) invalidErr(string, 'missing exponent base');

    if (e === undefined && (expSign || expNumber)) {
      invalidErr(string, 'missing e before exponent');
    }
  }

  // Get the negative or positive sign
  if (string[index] === '+' || string[index] === '-') {
    isNegative = string[index++] === '-';
  }

  // Check if user passed Infinity or NaN
  if (!isDigit(string[index]) && string[index] !== '.') {
    if (string[index] === 'i' || string[index] === 'I') {
      return new Decimal128(new Buffer$2(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
    } else if (string[index] === 'N') {
      return new Decimal128(new Buffer$2(NAN_BUFFER));
    }
  }

  // Read all the digits
  while (isDigit(string[index]) || string[index] === '.') {
    if (string[index] === '.') {
      if (sawRadix) invalidErr(string, 'contains multiple periods');

      sawRadix = true;
      index = index + 1;
      continue;
    }

    if (nDigitsStored < 34) {
      if (string[index] !== '0' || foundNonZero) {
        if (!foundNonZero) {
          firstNonZero = nDigitsRead;
        }

        foundNonZero = true;

        // Only store 34 digits
        digits[digitsInsert++] = parseInt(string[index], 10);
        nDigitsStored = nDigitsStored + 1;
      }
    }

    if (foundNonZero) nDigits = nDigits + 1;
    if (sawRadix) radixPosition = radixPosition + 1;

    nDigitsRead = nDigitsRead + 1;
    index = index + 1;
  }

  if (sawRadix && !nDigitsRead) throw new TypeError('' + string + ' not a valid Decimal128 string');

  // Read exponent if exists
  if (string[index] === 'e' || string[index] === 'E') {
    // Read exponent digits
    var match = string.substr(++index).match(EXPONENT_REGEX);

    // No digits read
    if (!match || !match[2]) return new Decimal128(new Buffer$2(NAN_BUFFER));

    // Get exponent
    exponent = parseInt(match[0], 10);

    // Adjust the index
    index = index + match[0].length;
  }

  // Return not a number
  if (string[index]) return new Decimal128(new Buffer$2(NAN_BUFFER));

  // Done reading input
  // Find first non-zero digit in digits
  firstDigit = 0;

  if (!nDigitsStored) {
    firstDigit = 0;
    lastDigit = 0;
    digits[0] = 0;
    nDigits = 1;
    nDigitsStored = 1;
    significantDigits = 0;
  } else {
    lastDigit = nDigitsStored - 1;
    significantDigits = nDigits;
    if (significantDigits !== 1) {
      while (string[firstNonZero + significantDigits - 1] === '0') {
        significantDigits = significantDigits - 1;
      }
    }
  }

  // Normalization of exponent
  // Correct exponent based on radix position, and shift significand as needed
  // to represent user input

  // Overflow prevention
  if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
    exponent = EXPONENT_MIN;
  } else {
    exponent = exponent - radixPosition;
  }

  // Attempt to normalize the exponent
  while (exponent > EXPONENT_MAX) {
    // Shift exponent to significand and decrease
    lastDigit = lastDigit + 1;

    if (lastDigit - firstDigit > MAX_DIGITS) {
      // Check if we have a zero then just hard clamp, otherwise fail
      var digitsString = digits.join('');
      if (digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }
      invalidErr(string, 'overflow');
    }
    exponent = exponent - 1;
  }

  while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
    // Shift last digit. can only do this if < significant digits than # stored.
    if (lastDigit === 0 && significantDigits < nDigitsStored) {
      exponent = EXPONENT_MIN;
      significantDigits = 0;
      break;
    }

    if (nDigitsStored < nDigits) {
      // adjust to match digits not stored
      nDigits = nDigits - 1;
    } else {
      // adjust to round
      lastDigit = lastDigit - 1;
    }

    if (exponent < EXPONENT_MAX) {
      exponent = exponent + 1;
    } else {
      // Check if we have a zero then just hard clamp, otherwise fail
      digitsString = digits.join('');
      if (digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }
      invalidErr(string, 'overflow');
    }
  }

  // Round
  // We've normalized the exponent, but might still need to round.
  if (lastDigit - firstDigit + 1 < significantDigits) {
    var endOfString = nDigitsRead;

    // If we have seen a radix point, 'string' is 1 longer than we have
    // documented with ndigits_read, so inc the position of the first nonzero
    // digit and the position that digits are read to.
    if (sawRadix) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    }
    // if negative, we need to increment again to account for - sign at start.
    if (isNegative) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    }

    var roundDigit = parseInt(string[firstNonZero + lastDigit + 1], 10);
    var roundBit = 0;

    if (roundDigit >= 5) {
      roundBit = 1;
      if (roundDigit === 5) {
        roundBit = digits[lastDigit] % 2 === 1;
        for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
          if (parseInt(string[i], 10)) {
            roundBit = 1;
            break;
          }
        }
      }
    }

    if (roundBit) {
      var dIdx = lastDigit;

      for (; dIdx >= 0; dIdx--) {
        if (++digits[dIdx] > 9) {
          digits[dIdx] = 0;

          // overflowed most significant digit
          if (dIdx === 0) {
            if (exponent < EXPONENT_MAX) {
              exponent = exponent + 1;
              digits[dIdx] = 1;
            } else {
              return new Decimal128(new Buffer$2(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            }
          }
        }
      }
    }
  }

  // Encode significand
  // The high 17 digits of the significand
  significandHigh = long_1.fromNumber(0);
  // The low 17 digits of the significand
  significandLow = long_1.fromNumber(0);

  // read a zero
  if (significantDigits === 0) {
    significandHigh = long_1.fromNumber(0);
    significandLow = long_1.fromNumber(0);
  } else if (lastDigit - firstDigit < 17) {
    dIdx = firstDigit;
    significandLow = long_1.fromNumber(digits[dIdx++]);
    significandHigh = new long_1(0, 0);

    for (; dIdx <= lastDigit; dIdx++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[dIdx]));
    }
  } else {
    dIdx = firstDigit;
    significandHigh = long_1.fromNumber(digits[dIdx++]);

    for (; dIdx <= lastDigit - 17; dIdx++) {
      significandHigh = significandHigh.multiply(long_1.fromNumber(10));
      significandHigh = significandHigh.add(long_1.fromNumber(digits[dIdx]));
    }

    significandLow = long_1.fromNumber(digits[dIdx++]);

    for (; dIdx <= lastDigit; dIdx++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[dIdx]));
    }
  }

  var significand = multiply64x2(significandHigh, long_1.fromString('100000000000000000'));

  significand.low = significand.low.add(significandLow);

  if (lessThan(significand.low, significandLow)) {
    significand.high = significand.high.add(long_1.fromNumber(1));
  }

  // Biased exponent
  biasedExponent = exponent + EXPONENT_BIAS;
  var dec = { low: long_1.fromNumber(0), high: long_1.fromNumber(0) };

  // Encode combination, exponent, and significand.
  if (significand.high.shiftRightUnsigned(49).and(long_1.fromNumber(1)).equals(long_1.fromNumber)) {
    // Encode '11' into bits 1 to 3
    dec.high = dec.high.or(long_1.fromNumber(0x3).shiftLeft(61));
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent).and(long_1.fromNumber(0x3fff).shiftLeft(47)));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x7fffffffffff)));
  } else {
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent & 0x3fff).shiftLeft(49));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x1ffffffffffff)));
  }

  dec.low = significand.low;

  // Encode sign
  if (isNegative) {
    dec.high = dec.high.or(long_1.fromString('9223372036854775808'));
  }

  // Encode into a buffer
  var buffer = new Buffer$2(16);
  index = 0;

  // Encode the low 64 bits of the decimal
  // Encode low bits
  buffer[index++] = dec.low.low_ & 0xff;
  buffer[index++] = dec.low.low_ >> 8 & 0xff;
  buffer[index++] = dec.low.low_ >> 16 & 0xff;
  buffer[index++] = dec.low.low_ >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = dec.low.high_ & 0xff;
  buffer[index++] = dec.low.high_ >> 8 & 0xff;
  buffer[index++] = dec.low.high_ >> 16 & 0xff;
  buffer[index++] = dec.low.high_ >> 24 & 0xff;

  // Encode the high 64 bits of the decimal
  // Encode low bits
  buffer[index++] = dec.high.low_ & 0xff;
  buffer[index++] = dec.high.low_ >> 8 & 0xff;
  buffer[index++] = dec.high.low_ >> 16 & 0xff;
  buffer[index++] = dec.high.low_ >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = dec.high.high_ & 0xff;
  buffer[index++] = dec.high.high_ >> 8 & 0xff;
  buffer[index++] = dec.high.high_ >> 16 & 0xff;
  buffer[index++] = dec.high.high_ >> 24 & 0xff;

  // Return the new Decimal128
  return new Decimal128(buffer);
};

// Extract least significant 5 bits
var COMBINATION_MASK = 0x1f;
// Extract least significant 14 bits
var EXPONENT_MASK = 0x3fff;
// Value of combination field for Inf
var COMBINATION_INFINITY = 30;
// Value of combination field for NaN
var COMBINATION_NAN = 31;
// Value of combination field for NaN
// var COMBINATION_SNAN = 32;
// decimal128 exponent bias
EXPONENT_BIAS = 6176;

/**
 * Create a string representation of the raw Decimal128 value
 *
 * @method
 * @return {string} returns a Decimal128 string representation.
 */
Decimal128.prototype.toString = function () {
  // Note: bits in this routine are referred to starting at 0,
  // from the sign bit, towards the coefficient.

  // bits 0 - 31
  var high;
  // bits 32 - 63
  var midh;
  // bits 64 - 95
  var midl;
  // bits 96 - 127
  var low;
  // bits 1 - 5
  var combination;
  // decoded biased exponent (14 bits)
  var biased_exponent;
  // the number of significand digits
  var significand_digits = 0;
  // the base-10 digits in the significand
  var significand = new Array(36);
  for (var i = 0; i < significand.length; i++) {
    significand[i] = 0;
  } // read pointer into significand
  var index = 0;

  // unbiased exponent
  var exponent;
  // the exponent if scientific notation is used
  var scientific_exponent;

  // true if the number is zero
  var is_zero = false;

  // the most signifcant significand bits (50-46)
  var significand_msb;
  // temporary storage for significand decoding
  var significand128 = { parts: new Array(4) };
  // indexing variables
  var j, k;

  // Output string
  var string = [];

  // Unpack index
  index = 0;

  // Buffer reference
  var buffer = this.bytes;

  // Unpack the low 64bits into a long
  low = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
  midl = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Unpack the high 64bits into a long
  midh = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
  high = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Unpack index
  index = 0;

  // Create the state of the decimal
  var dec = {
    low: new long_1(low, midl),
    high: new long_1(midh, high)
  };

  if (dec.high.lessThan(long_1.ZERO)) {
    string.push('-');
  }

  // Decode combination field and exponent
  combination = high >> 26 & COMBINATION_MASK;

  if (combination >> 3 === 3) {
    // Check for 'special' values
    if (combination === COMBINATION_INFINITY) {
      return string.join('') + 'Infinity';
    } else if (combination === COMBINATION_NAN) {
      return 'NaN';
    } else {
      biased_exponent = high >> 15 & EXPONENT_MASK;
      significand_msb = 0x08 + (high >> 14 & 0x01);
    }
  } else {
    significand_msb = high >> 14 & 0x07;
    biased_exponent = high >> 17 & EXPONENT_MASK;
  }

  exponent = biased_exponent - EXPONENT_BIAS;

  // Create string of significand digits

  // Convert the 114-bit binary number represented by
  // (significand_high, significand_low) to at most 34 decimal
  // digits through modulo and division.
  significand128.parts[0] = (high & 0x3fff) + ((significand_msb & 0xf) << 14);
  significand128.parts[1] = midh;
  significand128.parts[2] = midl;
  significand128.parts[3] = low;

  if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
    is_zero = true;
  } else {
    for (k = 3; k >= 0; k--) {
      var least_digits = 0;
      // Peform the divide
      var result = divideu128(significand128);
      significand128 = result.quotient;
      least_digits = result.rem.low_;

      // We now have the 9 least significant digits (in base 2).
      // Convert and output to string.
      if (!least_digits) continue;

      for (j = 8; j >= 0; j--) {
        // significand[k * 9 + j] = Math.round(least_digits % 10);
        significand[k * 9 + j] = least_digits % 10;
        // least_digits = Math.round(least_digits / 10);
        least_digits = Math.floor(least_digits / 10);
      }
    }
  }

  // Output format options:
  // Scientific - [-]d.dddE(+/-)dd or [-]dE(+/-)dd
  // Regular    - ddd.ddd

  if (is_zero) {
    significand_digits = 1;
    significand[index] = 0;
  } else {
    significand_digits = 36;
    i = 0;

    while (!significand[index]) {
      i++;
      significand_digits = significand_digits - 1;
      index = index + 1;
    }
  }

  scientific_exponent = significand_digits - 1 + exponent;

  // The scientific exponent checks are dictated by the string conversion
  // specification and are somewhat arbitrary cutoffs.
  //
  // We must check exponent > 0, because if this is the case, the number
  // has trailing zeros.  However, we *cannot* output these trailing zeros,
  // because doing so would change the precision of the value, and would
  // change stored data if the string converted number is round tripped.
  if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
    // Scientific format

    // if there are too many significant digits, we should just be treating numbers
    // as + or - 0 and using the non-scientific exponent (this is for the "invalid
    // representation should be treated as 0/-0" spec cases in decimal128-1.json)
    if (significand_digits > 34) {
      string.push(0);
      if (exponent > 0) string.push('E+' + exponent);else if (exponent < 0) string.push('E' + exponent);
      return string.join('');
    }

    string.push(significand[index++]);
    significand_digits = significand_digits - 1;

    if (significand_digits) {
      string.push('.');
    }

    for (i = 0; i < significand_digits; i++) {
      string.push(significand[index++]);
    }

    // Exponent
    string.push('E');
    if (scientific_exponent > 0) {
      string.push('+' + scientific_exponent);
    } else {
      string.push(scientific_exponent);
    }
  } else {
    // Regular format with no decimal place
    if (exponent >= 0) {
      for (i = 0; i < significand_digits; i++) {
        string.push(significand[index++]);
      }
    } else {
      var radix_position = significand_digits + exponent;

      // non-zero digits before radix
      if (radix_position > 0) {
        for (i = 0; i < radix_position; i++) {
          string.push(significand[index++]);
        }
      } else {
        string.push('0');
      }

      string.push('.');
      // add leading zeros after radix
      while (radix_position++ < 0) {
        string.push('0');
      }

      for (i = 0; i < significand_digits - Math.max(radix_position - 1, 0); i++) {
        string.push(significand[index++]);
      }
    }
  }

  return string.join('');
};

Decimal128.prototype.toJSON = function () {
  return { $numberDecimal: this.toString() };
};

var decimal128 = Decimal128;
var Decimal128_1 = Decimal128;
decimal128.Decimal128 = Decimal128_1;

/**
 * A class representation of the BSON MinKey type.
 *
 * @class
 * @return {MinKey} A MinKey instance
 */

function MinKey() {
  if (!(this instanceof MinKey)) return new MinKey();

  this._bsontype = 'MinKey';
}

var min_key = MinKey;
var MinKey_1 = MinKey;
min_key.MinKey = MinKey_1;

/**
 * A class representation of the BSON MaxKey type.
 *
 * @class
 * @return {MaxKey} A MaxKey instance
 */

function MaxKey() {
  if (!(this instanceof MaxKey)) return new MaxKey();

  this._bsontype = 'MaxKey';
}

var max_key = MaxKey;
var MaxKey_1 = MaxKey;
max_key.MaxKey = MaxKey_1;

/**
 * A class representation of the BSON DBRef type.
 *
 * @class
 * @param {string} collection the collection name.
 * @param {ObjectID} oid the reference ObjectID.
 * @param {string} [db] optional db name, if omitted the reference is local to the current db.
 * @return {DBRef}
 */

function DBRef(collection, oid, db, fields) {
  if (!(this instanceof DBRef)) return new DBRef(collection, oid, db, fields);

  // check if namespace has been provided
  var parts = collection.split('.');
  if (parts.length === 2) {
    db = parts.shift();
    collection = parts.shift();
  }

  this._bsontype = 'DBRef';
  this.collection = collection;
  this.oid = oid;
  this.db = db;
  this.fields = fields || {};
}

/**
 * @ignore
 * @api private
 */
DBRef.prototype.toJSON = function () {
  var o = {
    $ref: this.collection,
    $id: this.oid
  };

  if (this.db != null) o.$db = this.db;
  o = Object.assign(o, this.fields);
  return o;
};

var db_ref = DBRef;
var DBRef_1 = DBRef;
db_ref.DBRef = DBRef_1;

var Buffer$3 = require$$0.Buffer;

/**
 * Module dependencies.
 * @ignore
 */

/**
 * A class representation of the BSON Binary type.
 *
 * Sub types
 *  - **BSON.BSON_BINARY_SUBTYPE_DEFAULT**, default BSON type.
 *  - **BSON.BSON_BINARY_SUBTYPE_FUNCTION**, BSON function type.
 *  - **BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY**, BSON byte array type.
 *  - **BSON.BSON_BINARY_SUBTYPE_UUID**, BSON uuid type.
 *  - **BSON.BSON_BINARY_SUBTYPE_MD5**, BSON md5 type.
 *  - **BSON.BSON_BINARY_SUBTYPE_USER_DEFINED**, BSON user defined type.
 *
 * @class
 * @param {Buffer} buffer a buffer object containing the binary data.
 * @param {Number} [subType] the option binary type.
 * @return {Binary}
 */
function Binary(buffer, subType) {
  if (!(this instanceof Binary)) return new Binary(buffer, subType);

  if (buffer != null && !(typeof buffer === 'string') && !Buffer$3.isBuffer(buffer) && !(buffer instanceof Uint8Array) && !Array.isArray(buffer)) {
    throw new Error('only String, Buffer, Uint8Array or Array accepted');
  }

  this._bsontype = 'Binary';

  if (buffer instanceof Number) {
    this.sub_type = buffer;
    this.position = 0;
  } else {
    this.sub_type = subType == null ? BSON_BINARY_SUBTYPE_DEFAULT : subType;
    this.position = 0;
  }

  if (buffer != null && !(buffer instanceof Number)) {
    // Only accept Buffer, Uint8Array or Arrays
    if (typeof buffer === 'string') {
      // Different ways of writing the length of the string for the different types
      if (typeof Buffer$3 !== 'undefined') {
        this.buffer = new Buffer$3(buffer);
      } else if (typeof Uint8Array !== 'undefined' || Object.prototype.toString.call(buffer) === '[object Array]') {
        this.buffer = writeStringToArray(buffer);
      } else {
        throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
      }
    } else {
      this.buffer = buffer;
    }
    this.position = buffer.length;
  } else {
    if (typeof Buffer$3 !== 'undefined') {
      this.buffer = new Buffer$3(Binary.BUFFER_SIZE);
    } else if (typeof Uint8Array !== 'undefined') {
      this.buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE));
    } else {
      this.buffer = new Array(Binary.BUFFER_SIZE);
    }
    // Set position to start of buffer
    this.position = 0;
  }
}

/**
 * Updates this binary with byte_value.
 *
 * @method
 * @param {string} byte_value a single byte we wish to write.
 */
Binary.prototype.put = function put(byte_value) {
  // If it's a string and a has more than one character throw an error
  if (byte_value['length'] != null && typeof byte_value !== 'number' && byte_value.length !== 1) throw new TypeError('only accepts single character String, Uint8Array or Array');
  if (typeof byte_value !== 'number' && byte_value < 0 || byte_value > 255) throw new TypeError('only accepts number in a valid unsigned byte range 0-255');

  // Decode the byte value once
  var decoded_byte = null;
  if (typeof byte_value === 'string') {
    decoded_byte = byte_value.charCodeAt(0);
  } else if (byte_value['length'] != null) {
    decoded_byte = byte_value[0];
  } else {
    decoded_byte = byte_value;
  }

  if (this.buffer.length > this.position) {
    this.buffer[this.position++] = decoded_byte;
  } else {
    if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
      // Create additional overflow buffer
      var buffer = new Buffer$3(Binary.BUFFER_SIZE + this.buffer.length);
      // Combine the two buffers together
      this.buffer.copy(buffer, 0, 0, this.buffer.length);
      this.buffer = buffer;
      this.buffer[this.position++] = decoded_byte;
    } else {
      buffer = null;
      // Create a new buffer (typed or normal array)
      if (Object.prototype.toString.call(this.buffer) === '[object Uint8Array]') {
        buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE + this.buffer.length));
      } else {
        buffer = new Array(Binary.BUFFER_SIZE + this.buffer.length);
      }

      // We need to copy all the content to the new array
      for (var i = 0; i < this.buffer.length; i++) {
        buffer[i] = this.buffer[i];
      }

      // Reassign the buffer
      this.buffer = buffer;
      // Write the byte
      this.buffer[this.position++] = decoded_byte;
    }
  }
};

/**
 * Writes a buffer or string to the binary.
 *
 * @method
 * @param {(Buffer|string)} string a string or buffer to be written to the Binary BSON object.
 * @param {number} offset specify the binary of where to write the content.
 * @return {null}
 */
Binary.prototype.write = function write(string, offset) {
  offset = typeof offset === 'number' ? offset : this.position;

  // If the buffer is to small let's extend the buffer
  if (this.buffer.length < offset + string.length) {
    var buffer = null;
    // If we are in node.js
    if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
      buffer = new Buffer$3(this.buffer.length + string.length);
      this.buffer.copy(buffer, 0, 0, this.buffer.length);
    } else if (Object.prototype.toString.call(this.buffer) === '[object Uint8Array]') {
      // Create a new buffer
      buffer = new Uint8Array(new ArrayBuffer(this.buffer.length + string.length));
      // Copy the content
      for (var i = 0; i < this.position; i++) {
        buffer[i] = this.buffer[i];
      }
    }

    // Assign the new buffer
    this.buffer = buffer;
  }

  if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(string) && Buffer$3.isBuffer(this.buffer)) {
    string.copy(this.buffer, offset, 0, string.length);
    this.position = offset + string.length > this.position ? offset + string.length : this.position;
    // offset = string.length
  } else if (typeof Buffer$3 !== 'undefined' && typeof string === 'string' && Buffer$3.isBuffer(this.buffer)) {
    this.buffer.write(string, offset, 'binary');
    this.position = offset + string.length > this.position ? offset + string.length : this.position;
    // offset = string.length;
  } else if (Object.prototype.toString.call(string) === '[object Uint8Array]' || Object.prototype.toString.call(string) === '[object Array]' && typeof string !== 'string') {
    for (i = 0; i < string.length; i++) {
      this.buffer[offset++] = string[i];
    }

    this.position = offset > this.position ? offset : this.position;
  } else if (typeof string === 'string') {
    for (i = 0; i < string.length; i++) {
      this.buffer[offset++] = string.charCodeAt(i);
    }

    this.position = offset > this.position ? offset : this.position;
  }
};

/**
 * Reads **length** bytes starting at **position**.
 *
 * @method
 * @param {number} position read from the given position in the Binary.
 * @param {number} length the number of bytes to read.
 * @return {Buffer}
 */
Binary.prototype.read = function read(position, length) {
  length = length && length > 0 ? length : this.position;

  // Let's return the data based on the type we have
  if (this.buffer['slice']) {
    return this.buffer.slice(position, position + length);
  } else {
    // Create a buffer to keep the result
    var buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(length)) : new Array(length);
    for (var i = 0; i < length; i++) {
      buffer[i] = this.buffer[position++];
    }
  }
  // Return the buffer
  return buffer;
};

/**
 * Returns the value of this binary as a string.
 *
 * @method
 * @return {string}
 */
Binary.prototype.value = function value(asRaw) {
  asRaw = asRaw == null ? false : asRaw;

  // Optimize to serialize for the situation where the data == size of buffer
  if (asRaw && typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;

  // If it's a node.js buffer object
  if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
    return asRaw ? this.buffer.slice(0, this.position) : this.buffer.toString('binary', 0, this.position);
  } else {
    if (asRaw) {
      // we support the slice command use it
      if (this.buffer['slice'] != null) {
        return this.buffer.slice(0, this.position);
      } else {
        // Create a new buffer to copy content to
        var newBuffer = Object.prototype.toString.call(this.buffer) === '[object Uint8Array]' ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position);
        // Copy content
        for (var i = 0; i < this.position; i++) {
          newBuffer[i] = this.buffer[i];
        }
        // Return the buffer
        return newBuffer;
      }
    } else {
      return convertArraytoUtf8BinaryString(this.buffer, 0, this.position);
    }
  }
};

/**
 * Length.
 *
 * @method
 * @return {number} the length of the binary.
 */
Binary.prototype.length = function length() {
  return this.position;
};

/**
 * @ignore
 */
Binary.prototype.toJSON = function () {
  return this.buffer != null ? this.buffer.toString('base64') : '';
};

/**
 * @ignore
 */
Binary.prototype.toString = function (format) {
  return this.buffer != null ? this.buffer.slice(0, this.position).toString(format) : '';
};

/**
 * Binary default subtype
 * @ignore
 */
var BSON_BINARY_SUBTYPE_DEFAULT = 0;

/**
 * @ignore
 */
var writeStringToArray = function writeStringToArray(data) {
  // Create a buffer
  var buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(data.length)) : new Array(data.length);
  // Write the content to the buffer
  for (var i = 0; i < data.length; i++) {
    buffer[i] = data.charCodeAt(i);
  }
  // Write the string to the buffer
  return buffer;
};

/**
 * Convert Array ot Uint8Array to Binary String
 *
 * @ignore
 */
var convertArraytoUtf8BinaryString = function convertArraytoUtf8BinaryString(byteArray, startIndex, endIndex) {
  var result = '';
  for (var i = startIndex; i < endIndex; i++) {
    result = result + String.fromCharCode(byteArray[i]);
  }
  return result;
};

Binary.BUFFER_SIZE = 256;

/**
 * Default BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_DEFAULT = 0;
/**
 * Function BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_FUNCTION = 1;
/**
 * Byte Array BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_BYTE_ARRAY = 2;
/**
 * OLD UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_UUID_OLD = 3;
/**
 * UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_UUID = 4;
/**
 * MD5 BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_MD5 = 5;
/**
 * User BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/
Binary.SUBTYPE_USER_DEFINED = 128;

/**
 * Expose.
 */
var binary = Binary;
var Binary_1 = Binary;
binary.Binary = Binary_1;

var Buffer$4 = require$$0.Buffer;
var Long$1 = long_1.Long,
    Double$1 = double_1.Double,
    Timestamp$1 = timestamp.Timestamp,
    ObjectID$1 = objectid.ObjectID,
    Code$1 = code.Code,
    MinKey$1 = min_key.MinKey,
    MaxKey$1 = max_key.MaxKey,
    DBRef$1 = db_ref.DBRef,
    BSONRegExp$1 = regexp.BSONRegExp,
    Binary$1 = binary.Binary;

var deserialize = function deserialize(buffer, options, isArray) {
  options = options == null ? {} : options;
  var index = options && options.index ? options.index : 0;
  // Read the document size
  var size = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;

  if (size < 5) {
    throw new Error('bson size must be >= 5, is ' + size);
  }

  if (options.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(buffer) < size) {
    throw new Error('buffer length ' + Buffer$4.byteLength(buffer) + ' must be >= bson size ' + size);
  }

  if (!options.allowObjectSmallerThanBufferSize && Buffer$4.byteLength(buffer) !== size) {
    throw new Error('buffer length ' + Buffer$4.byteLength(buffer) + ' must === bson size ' + size);
  }

  if (size + index > Buffer$4.byteLength(buffer)) {
    throw new Error('(bson size ' + size + ' + options.index ' + index + ' must be <= buffer length ' + Buffer$4.byteLength(buffer) + ')');
  }

  // Illegal end value
  if (buffer[index + size - 1] !== 0) {
    throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  }

  // Start deserializtion
  return deserializeObject(buffer, index, options, isArray);
};

var deserializeObject = function deserializeObject(buffer, index, options, isArray) {
  var evalFunctions = options['evalFunctions'] == null ? false : options['evalFunctions'];
  var cacheFunctions = options['cacheFunctions'] == null ? false : options['cacheFunctions'];
  var cacheFunctionsCrc32 = options['cacheFunctionsCrc32'] == null ? false : options['cacheFunctionsCrc32'];

  if (!cacheFunctionsCrc32) var crc32 = null;

  var fieldsAsRaw = options['fieldsAsRaw'] == null ? null : options['fieldsAsRaw'];

  // Return raw bson buffer instead of parsing it
  var raw = options['raw'] == null ? false : options['raw'];

  // Return BSONRegExp objects instead of native regular expressions
  var bsonRegExp = typeof options['bsonRegExp'] === 'boolean' ? options['bsonRegExp'] : false;

  // Controls the promotion of values vs wrapper classes
  var promoteBuffers = options['promoteBuffers'] == null ? false : options['promoteBuffers'];
  var promoteLongs = options['promoteLongs'] == null ? true : options['promoteLongs'];
  var promoteValues = options['promoteValues'] == null ? true : options['promoteValues'];

  // Set the start index
  var startIndex = index;

  // Validate that we have at least 4 bytes of buffer
  if (Buffer$4.byteLength(buffer) < 5) throw new Error('corrupt bson message < 5 bytes long');

  // Read the document size
  var size = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

  // Ensure buffer is valid size
  if (size < 5 || size > Buffer$4.byteLength(buffer)) throw new Error('corrupt bson message');

  // Create holding object
  var object = isArray ? [] : {};
  // Used for arrays to skip having to perform utf8 decoding
  var arrayIndex = 0,
      done = false;

  // While we have more left data left keep parsing
  while (!done) {
    // Read the type
    var elementType = buffer[index++];

    // If we get a zero it's the last byte, exit
    if (elementType === 0) break;

    // Get the start search index
    var i = index;
    // Locate the end of the c string
    while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
      i++;
    }

    // If are at the end of the buffer there is a problem with the document
    if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
    var name = isArray ? arrayIndex++ : buffer.toString('utf8', index, i);

    index = i + 1;

    if (elementType === BSON.BSON_DATA_STRING) {
      var stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

      var s = buffer.toString('utf8', index, index + stringSize - 1);
      for (i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 0xfffd) {
          throw new Error('Invalid UTF-8 string in BSON document');
        }
      }

      object[name] = s;
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_OID) {
      var oid = new Buffer$4(12);
      buffer.copy(oid, 0, index, index + 12);
      object[name] = new ObjectID$1(oid);
      index = index + 12;
    } else if (elementType === BSON.BSON_DATA_INT && promoteValues === false) {
      object[name] = new int_32(buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24);
    } else if (elementType === BSON.BSON_DATA_INT) {
      object[name] = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
    } else if (elementType === BSON.BSON_DATA_NUMBER && promoteValues === false) {
      object[name] = new Double$1(buffer.readDoubleLE(index));
      index = index + 8;
    } else if (elementType === BSON.BSON_DATA_NUMBER) {
      object[name] = buffer.readDoubleLE(index);
      index = index + 8;
    } else if (elementType === BSON.BSON_DATA_DATE) {
      var lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      object[name] = new Date(new Long$1(lowBits, highBits).toNumber());
    } else if (elementType === BSON.BSON_DATA_BOOLEAN) {
      if (buffer[index] !== 0 && buffer[index] !== 1) throw new Error('illegal boolean type value');
      object[name] = buffer[index++] === 1;
    } else if (elementType === BSON.BSON_DATA_OBJECT) {
      var _index = index;
      var objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      if (objectSize <= 0 || objectSize > Buffer$4.byteLength(buffer) - index) throw new Error('bad embedded document length in bson');

      // We have a raw value
      if (raw) {
        object[name] = buffer.slice(index, index + objectSize);
      } else {
        object[name] = deserializeObject(buffer, _index, options, false);
      }

      index = index + objectSize;
    } else if (elementType === BSON.BSON_DATA_ARRAY) {
      _index = index;
      objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      var arrayOptions = options;

      // Stop index
      var stopIndex = index + objectSize;

      // All elements of array to be returned as raw bson
      if (fieldsAsRaw && fieldsAsRaw[name]) {
        arrayOptions = {};
        for (var n in options) {
          arrayOptions[n] = options[n];
        }arrayOptions['raw'] = true;
      }

      object[name] = deserializeObject(buffer, _index, arrayOptions, true);
      index = index + objectSize;

      if (buffer[index - 1] !== 0) throw new Error('invalid array terminator byte');
      if (index !== stopIndex) throw new Error('corrupted array bson');
    } else if (elementType === BSON.BSON_DATA_UNDEFINED) {
      object[name] = undefined;
    } else if (elementType === BSON.BSON_DATA_NULL) {
      object[name] = null;
    } else if (elementType === BSON.BSON_DATA_LONG) {
      // Unpack the low and high bits
      lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var long = new Long$1(lowBits, highBits);
      // Promote the long if possible
      if (promoteLongs && promoteValues === true) {
        object[name] = long.lessThanOrEqual(JS_INT_MAX_LONG) && long.greaterThanOrEqual(JS_INT_MIN_LONG) ? long.toNumber() : long;
      } else {
        object[name] = long;
      }
    } else if (elementType === BSON.BSON_DATA_DECIMAL128) {
      // Buffer to contain the decimal bytes
      var bytes = new Buffer$4(16);
      // Copy the next 16 bytes into the bytes buffer
      buffer.copy(bytes, 0, index, index + 16);
      // Update index
      index = index + 16;
      // Assign the new Decimal128 value
      var decimal128$$1 = new decimal128(bytes);
      // If we have an alternative mapper use that
      object[name] = decimal128$$1.toObject ? decimal128$$1.toObject() : decimal128$$1;
    } else if (elementType === BSON.BSON_DATA_BINARY) {
      var binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      var totalBinarySize = binarySize;
      var subType = buffer[index++];

      // Did we have a negative binary size, throw
      if (binarySize < 0) throw new Error('Negative binary type element size found');

      // Is the length longer than the document
      if (binarySize > Buffer$4.byteLength(buffer)) throw new Error('Binary type size larger than document size');

      // Decode as raw Buffer object if options specifies it
      if (buffer['slice'] != null) {
        // If we have subtype 2 skip the 4 bytes for the size
        if (subType === Binary$1.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        }

        if (promoteBuffers && promoteValues) {
          object[name] = buffer.slice(index, index + binarySize);
        } else {
          object[name] = new Binary$1(buffer.slice(index, index + binarySize), subType);
        }
      } else {
        var _buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(binarySize)) : new Array(binarySize);
        // If we have subtype 2 skip the 4 bytes for the size
        if (subType === Binary$1.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        }

        // Copy the data
        for (i = 0; i < binarySize; i++) {
          _buffer[i] = buffer[index + i];
        }

        if (promoteBuffers && promoteValues) {
          object[name] = _buffer;
        } else {
          object[name] = new Binary$1(_buffer, subType);
        }
      }

      // Update the index
      index = index + binarySize;
    } else if (elementType === BSON.BSON_DATA_REGEXP && bsonRegExp === false) {
      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      var source = buffer.toString('utf8', index, i);
      // Create the regexp
      index = i + 1;

      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      var regExpOptions = buffer.toString('utf8', index, i);
      index = i + 1;

      // For each option add the corresponding one for javascript
      var optionsArray = new Array(regExpOptions.length);

      // Parse options
      for (i = 0; i < regExpOptions.length; i++) {
        switch (regExpOptions[i]) {
          case 'm':
            optionsArray[i] = 'm';
            break;
          case 's':
            optionsArray[i] = 'g';
            break;
          case 'i':
            optionsArray[i] = 'i';
            break;
        }
      }

      object[name] = new RegExp(source, optionsArray.join(''));
    } else if (elementType === BSON.BSON_DATA_REGEXP && bsonRegExp === true) {
      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      source = buffer.toString('utf8', index, i);
      index = i + 1;

      // Get the start search index
      i = index;
      // Locate the end of the c string
      while (buffer[i] !== 0x00 && i < Buffer$4.byteLength(buffer)) {
        i++;
      }
      // If are at the end of the buffer there is a problem with the document
      if (i >= Buffer$4.byteLength(buffer)) throw new Error('Bad BSON Document: illegal CString');
      // Return the C string
      regExpOptions = buffer.toString('utf8', index, i);
      index = i + 1;

      // Set the object
      object[name] = new BSONRegExp$1(source, regExpOptions);
    } else if (elementType === BSON.BSON_DATA_SYMBOL) {
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      // symbol is deprecated - upgrade to string.
      object[name] = buffer.toString('utf8', index, index + stringSize - 1);
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_TIMESTAMP) {
      lowBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      highBits = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

      object[name] = new Timestamp$1(lowBits, highBits);
    } else if (elementType === BSON.BSON_DATA_MIN_KEY) {
      object[name] = new MinKey$1();
    } else if (elementType === BSON.BSON_DATA_MAX_KEY) {
      object[name] = new MaxKey$1();
    } else if (elementType === BSON.BSON_DATA_CODE) {
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      var functionString = buffer.toString('utf8', index, index + stringSize - 1);

      // If we are evaluating the functions
      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          var hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString;
          // Got to do this to avoid V8 deoptimizing the call due to finding eval
          object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
        } else {
          object[name] = isolateEval(functionString);
        }
      } else {
        object[name] = new Code$1(functionString);
      }

      // Update parse index position
      index = index + stringSize;
    } else if (elementType === BSON.BSON_DATA_CODE_W_SCOPE) {
      var totalSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;

      // Element cannot be shorter than totalSize + stringSize + documentSize + terminator
      if (totalSize < 4 + 4 + 4 + 1) {
        throw new Error('code_w_scope total size shorter minimum expected length');
      }

      // Get the code string size
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      // Check if we have a valid string
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

      // Javascript function
      functionString = buffer.toString('utf8', index, index + stringSize - 1);
      // Update parse index position
      index = index + stringSize;
      // Parse the element
      _index = index;
      // Decode the size of the object document
      objectSize = buffer[index] | buffer[index + 1] << 8 | buffer[index + 2] << 16 | buffer[index + 3] << 24;
      // Decode the scope object
      var scopeObject = deserializeObject(buffer, _index, options, false);
      // Adjust the index
      index = index + objectSize;

      // Check if field length is to short
      if (totalSize < 4 + 4 + objectSize + stringSize) {
        throw new Error('code_w_scope total size is to short, truncating scope');
      }

      // Check if totalSize field is to long
      if (totalSize > 4 + 4 + objectSize + stringSize) {
        throw new Error('code_w_scope total size is to long, clips outer document');
      }

      // If we are evaluating the functions
      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString;
          // Got to do this to avoid V8 deoptimizing the call due to finding eval
          object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
        } else {
          object[name] = isolateEval(functionString);
        }

        object[name].scope = scopeObject;
      } else {
        object[name] = new Code$1(functionString, scopeObject);
      }
    } else if (elementType === BSON.BSON_DATA_DBPOINTER) {
      // Get the code string size
      stringSize = buffer[index++] | buffer[index++] << 8 | buffer[index++] << 16 | buffer[index++] << 24;
      // Check if we have a valid string
      if (stringSize <= 0 || stringSize > Buffer$4.byteLength(buffer) - index || buffer[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');
      // Namespace
      var namespace = buffer.toString('utf8', index, index + stringSize - 1);
      // Update parse index position
      index = index + stringSize;

      // Read the oid
      var oidBuffer = new Buffer$4(12);
      buffer.copy(oidBuffer, 0, index, index + 12);
      oid = new ObjectID$1(oidBuffer);

      // Update the index
      index = index + 12;
      for (i = 0; i < namespace.length; i++) {
        if (namespace.charCodeAt(i) === 0xfffd) {
          throw new Error('Invalid UTF-8 string in BSON document');
        }
      }

      // Upgrade to DBRef type
      object[name] = new DBRef$1(namespace, oid);
    } else {
      throw new Error('Detected unknown BSON type ' + elementType.toString(16) + ' for fieldname "' + name + '", are you using the latest BSON parser?');
    }
  }

  // Check if the deserialization was against a valid array/object
  if (size !== index - startIndex) {
    if (isArray) throw new Error('corrupt array bson');
    throw new Error('corrupt object bson');
  }

  // check if object's $ keys are those of a DBRef
  var dollarKeys = Object.keys(object).filter(function (k) {
    return k.startsWith('$');
  });
  var valid = true;
  dollarKeys.forEach(function (k) {
    if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
  });

  // if a $key not in "$ref", "$id", "$db", don't make a DBRef
  if (!valid) return object;

  if (object['$id'] != null && object['$ref'] != null) {
    var copy = Object.assign({}, object);
    delete copy.$ref;
    delete copy.$id;
    delete copy.$db;
    return new DBRef$1(object.$ref, object.$id, object.$db || null, copy);
  }

  return object;
};

/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */
var isolateEvalWithHash = function isolateEvalWithHash(functionCache, hash, functionString, object) {
  // Contains the value we are going to set
  var value = null;

  // Check for cache hit, eval if missing and return cached function
  if (functionCache[hash] == null) {
    eval('value = ' + functionString);
    functionCache[hash] = value;
  }
  // Set the object
  return functionCache[hash].bind(object);
};

/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */
var isolateEval = function isolateEval(functionString) {
  // Contains the value we are going to set
  var value = null;
  // Eval the function
  eval('value = ' + functionString);
  return value;
};

var BSON = {};

/**
 * Contains the function cache if we have that enable to allow for avoiding the eval step on each deserialization, comparison is by md5
 *
 * @ignore
 * @api private
 */
var functionCache = BSON.functionCache = {};

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON.BSON_DATA_BINARY = 5;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_UNDEFINED
 **/
BSON.BSON_DATA_UNDEFINED = 6;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_DBPOINTER
 **/
BSON.BSON_DATA_DBPOINTER = 12;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON.BSON_DATA_LONG = 18;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_DECIMAL128
 **/
BSON.BSON_DATA_DECIMAL128 = 19;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON.BSON_DATA_MAX_KEY = 0x7f;

/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// BSON MAX VALUES
BSON.BSON_INT32_MAX = 0x7fffffff;
BSON.BSON_INT32_MIN = -0x80000000;

BSON.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
var JS_INT_MAX_LONG = Long$1.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
var JS_INT_MIN_LONG = Long$1.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

var deserializer = deserialize;

// Copyright (c) 2008, Fair Oaks Labs, Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
//  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//
// Modifications to writeIEEE754 to support negative zeroes made by Brian White

var readIEEE754 = function readIEEE754(buffer, offset, endian, mLen, nBytes) {
  var e,
      m,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = bBE ? 0 : nBytes - 1,
      d = bBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

var writeIEEE754 = function writeIEEE754(buffer, value, offset, endian, mLen, nBytes) {
  var e,
      m,
      c,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      i = bBE ? nBytes - 1 : 0,
      d = bBE ? -1 : 1,
      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  if (isNaN(value)) m = 0;

  while (mLen >= 8) {
    buffer[offset + i] = m & 0xff;
    i += d;
    m /= 256;
    mLen -= 8;
  }

  e = e << mLen | m;

  if (isNaN(value)) e += 8;

  eLen += mLen;

  while (eLen > 0) {
    buffer[offset + i] = e & 0xff;
    i += d;
    e /= 256;
    eLen -= 8;
  }

  buffer[offset + i - d] |= s * 128;
};

var readIEEE754_1 = readIEEE754;
var writeIEEE754_1 = writeIEEE754;

var float_parser = {
  readIEEE754: readIEEE754_1,
  writeIEEE754: writeIEEE754_1
};

/**
 * Normalizes our expected stringified form of a function across versions of node
 * @param {Function} fn The function to stringify
 */

function normalizedFunctionString(fn) {
  return fn.toString().replace(/function(.*)\(/, 'function (');
}

var utils = {
  normalizedFunctionString: normalizedFunctionString
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var Buffer$5 = require$$0.Buffer;
var writeIEEE754$1 = float_parser.writeIEEE754,
    Long$2 = long_1.Long,
    MinKey$2 = min_key.MinKey,
    Binary$2 = binary.Binary;

var normalizedFunctionString$1 = utils.normalizedFunctionString;

// try {
//   var _Buffer = Uint8Array;
// } catch (e) {
//   _Buffer = Buffer;
// }

var regexp$1 = /\x00/; // eslint-disable-line no-control-regex

// To ensure that 0.4 of node works correctly
var isDate = function isDate(d) {
  return (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
};

var isRegExp = function isRegExp(d) {
  return Object.prototype.toString.call(d) === '[object RegExp]';
};

var serializeString = function serializeString(buffer, key, value, index, isArray) {
  // Encode String type
  buffer[index++] = BSON$1.BSON_DATA_STRING;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes + 1;
  buffer[index - 1] = 0;
  // Write the string
  var size = buffer.write(value, index + 4, 'utf8');
  // Write the size of the string to buffer
  buffer[index + 3] = size + 1 >> 24 & 0xff;
  buffer[index + 2] = size + 1 >> 16 & 0xff;
  buffer[index + 1] = size + 1 >> 8 & 0xff;
  buffer[index] = size + 1 & 0xff;
  // Update index
  index = index + 4 + size;
  // Write zero
  buffer[index++] = 0;
  return index;
};

var serializeNumber = function serializeNumber(buffer, key, value, index, isArray) {
  // We have an integer value
  if (Math.floor(value) === value && value >= BSON$1.JS_INT_MIN && value <= BSON$1.JS_INT_MAX) {
    // If the value fits in 32 bits encode as int, if it fits in a double
    // encode it as a double, otherwise long
    if (value >= BSON$1.BSON_INT32_MIN && value <= BSON$1.BSON_INT32_MAX) {
      // Set int type 32 bits or less
      buffer[index++] = BSON$1.BSON_DATA_INT;
      // Number of written bytes
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      // Write the int value
      buffer[index++] = value & 0xff;
      buffer[index++] = value >> 8 & 0xff;
      buffer[index++] = value >> 16 & 0xff;
      buffer[index++] = value >> 24 & 0xff;
    } else if (value >= BSON$1.JS_INT_MIN && value <= BSON$1.JS_INT_MAX) {
      // Encode as double
      buffer[index++] = BSON$1.BSON_DATA_NUMBER;
      // Number of written bytes
      numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      // Write float
      writeIEEE754$1(buffer, value, index, 'little', 52, 8);
      // Ajust index
      index = index + 8;
    } else {
      // Set long type
      buffer[index++] = BSON$1.BSON_DATA_LONG;
      // Number of written bytes
      numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
      // Encode the name
      index = index + numberOfWrittenBytes;
      buffer[index++] = 0;
      var longVal = Long$2.fromNumber(value);
      var lowBits = longVal.getLowBits();
      var highBits = longVal.getHighBits();
      // Encode low bits
      buffer[index++] = lowBits & 0xff;
      buffer[index++] = lowBits >> 8 & 0xff;
      buffer[index++] = lowBits >> 16 & 0xff;
      buffer[index++] = lowBits >> 24 & 0xff;
      // Encode high bits
      buffer[index++] = highBits & 0xff;
      buffer[index++] = highBits >> 8 & 0xff;
      buffer[index++] = highBits >> 16 & 0xff;
      buffer[index++] = highBits >> 24 & 0xff;
    }
  } else {
    // Encode as double
    buffer[index++] = BSON$1.BSON_DATA_NUMBER;
    // Number of written bytes
    numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;
    // Write float
    writeIEEE754$1(buffer, value, index, 'little', 52, 8);
    // Ajust index
    index = index + 8;
  }

  return index;
};

var serializeNull = function serializeNull(buffer, key, value, index, isArray) {
  // Set long type
  buffer[index++] = BSON$1.BSON_DATA_NULL;

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  return index;
};

var serializeBoolean = function serializeBoolean(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BOOLEAN;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Encode the boolean value
  buffer[index++] = value ? 1 : 0;
  return index;
};

var serializeDate = function serializeDate(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_DATE;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write the date
  var dateInMilis = Long$2.fromNumber(value.getTime());
  var lowBits = dateInMilis.getLowBits();
  var highBits = dateInMilis.getHighBits();
  // Encode low bits
  buffer[index++] = lowBits & 0xff;
  buffer[index++] = lowBits >> 8 & 0xff;
  buffer[index++] = lowBits >> 16 & 0xff;
  buffer[index++] = lowBits >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = highBits & 0xff;
  buffer[index++] = highBits >> 8 & 0xff;
  buffer[index++] = highBits >> 16 & 0xff;
  buffer[index++] = highBits >> 24 & 0xff;
  return index;
};

var serializeRegExp = function serializeRegExp(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_REGEXP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  if (value.source && value.source.match(regexp$1) != null) {
    throw Error('value ' + value.source + ' must not contain null bytes');
  }
  // Adjust the index
  index = index + buffer.write(value.source, index, 'utf8');
  // Write zero
  buffer[index++] = 0x00;
  // Write the parameters
  if (value.ignoreCase) buffer[index++] = 0x69; // i
  if (value.global) buffer[index++] = 0x73; // s
  if (value.multiline) buffer[index++] = 0x6d; // m

  // Add ending zero
  buffer[index++] = 0x00;
  return index;
};

var serializeBSONRegExp = function serializeBSONRegExp(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_REGEXP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Check the pattern for 0 bytes
  if (value.pattern.match(regexp$1) != null) {
    // The BSON spec doesn't allow keys with null bytes because keys are
    // null-terminated.
    throw Error('pattern ' + value.pattern + ' must not contain null bytes');
  }

  // Adjust the index
  index = index + buffer.write(value.pattern, index, 'utf8');
  // Write zero
  buffer[index++] = 0x00;
  // Write the options
  index = index + buffer.write(value.options.split('').sort().join(''), index, 'utf8');
  // Add ending zero
  buffer[index++] = 0x00;
  return index;
};

var serializeMinMax = function serializeMinMax(buffer, key, value, index, isArray) {
  // Write the type of either min or max key
  if (value === null) {
    buffer[index++] = BSON$1.BSON_DATA_NULL;
  } else if (value instanceof MinKey$2) {
    buffer[index++] = BSON$1.BSON_DATA_MIN_KEY;
  } else {
    buffer[index++] = BSON$1.BSON_DATA_MAX_KEY;
  }

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  return index;
};

var serializeObjectId = function serializeObjectId(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_OID;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write the objectId into the shared buffer
  if (typeof value.id === 'string') {
    buffer.write(value.id, index, 'binary');
  } else if (value.id && value.id.copy) {
    value.id.copy(buffer, index, 0, 12);
  } else {
    throw new TypeError('object [' + JSON.stringify(value) + '] is not a valid ObjectId');
  }

  // Ajust index
  return index + 12;
};

var serializeBuffer = function serializeBuffer(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BINARY;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Get size of the buffer (current write point)
  var size = value.length;
  // Write the size of the string to buffer
  buffer[index++] = size & 0xff;
  buffer[index++] = size >> 8 & 0xff;
  buffer[index++] = size >> 16 & 0xff;
  buffer[index++] = size >> 24 & 0xff;
  // Write the default subtype
  buffer[index++] = BSON$1.BSON_BINARY_SUBTYPE_DEFAULT;
  // Copy the content form the binary field to the buffer
  value.copy(buffer, index, 0, size);
  // Adjust the index
  index = index + size;
  return index;
};

var serializeObject = function serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray, path) {
  for (var i = 0; i < path.length; i++) {
    if (path[i] === value) throw new Error('cyclic dependency detected');
  }

  // Push value to stack
  path.push(value);
  // Write the type
  buffer[index++] = Array.isArray(value) ? BSON$1.BSON_DATA_ARRAY : BSON$1.BSON_DATA_OBJECT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  var endIndex = serializeInto(buffer, value, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined, path);
  // Pop stack
  path.pop();
  return endIndex;
};

var serializeDecimal128 = function serializeDecimal128(buffer, key, value, index, isArray) {
  buffer[index++] = BSON$1.BSON_DATA_DECIMAL128;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the data from the value
  value.bytes.copy(buffer, index, 0, 16);
  return index + 16;
};

var serializeLong = function serializeLong(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = value._bsontype === 'Long' ? BSON$1.BSON_DATA_LONG : BSON$1.BSON_DATA_TIMESTAMP;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the date
  var lowBits = value.getLowBits();
  var highBits = value.getHighBits();
  // Encode low bits
  buffer[index++] = lowBits & 0xff;
  buffer[index++] = lowBits >> 8 & 0xff;
  buffer[index++] = lowBits >> 16 & 0xff;
  buffer[index++] = lowBits >> 24 & 0xff;
  // Encode high bits
  buffer[index++] = highBits & 0xff;
  buffer[index++] = highBits >> 8 & 0xff;
  buffer[index++] = highBits >> 16 & 0xff;
  buffer[index++] = highBits >> 24 & 0xff;
  return index;
};

var serializeInt32 = function serializeInt32(buffer, key, value, index, isArray) {
  // Set int type 32 bits or less
  buffer[index++] = BSON$1.BSON_DATA_INT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the int value
  buffer[index++] = value & 0xff;
  buffer[index++] = value >> 8 & 0xff;
  buffer[index++] = value >> 16 & 0xff;
  buffer[index++] = value >> 24 & 0xff;
  return index;
};

var serializeDouble = function serializeDouble(buffer, key, value, index, isArray) {
  // Encode as double
  buffer[index++] = BSON$1.BSON_DATA_NUMBER;

  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  // Write float
  writeIEEE754$1(buffer, value.value, index, 'little', 52, 8);

  // Adjust index
  index = index + 8;
  return index;
};

var serializeFunction = function serializeFunction(buffer, key, value, index, checkKeys, depth, isArray) {
  buffer[index++] = BSON$1.BSON_DATA_CODE;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Function string
  var functionString = normalizedFunctionString$1(value);

  // Write the string
  var size = buffer.write(functionString, index + 4, 'utf8') + 1;
  // Write the size of the string to buffer
  buffer[index] = size & 0xff;
  buffer[index + 1] = size >> 8 & 0xff;
  buffer[index + 2] = size >> 16 & 0xff;
  buffer[index + 3] = size >> 24 & 0xff;
  // Update index
  index = index + 4 + size - 1;
  // Write zero
  buffer[index++] = 0;
  return index;
};

var serializeCode = function serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray) {
  if (value.scope && _typeof(value.scope) === 'object') {
    // Write the type
    buffer[index++] = BSON$1.BSON_DATA_CODE_W_SCOPE;
    // Number of written bytes
    var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;

    // Starting index
    var startIndex = index;

    // Serialize the function
    // Get the function string
    var functionString = typeof value.code === 'string' ? value.code : value.code.toString();
    // Index adjustment
    index = index + 4;
    // Write string into buffer
    var codeSize = buffer.write(functionString, index + 4, 'utf8') + 1;
    // Write the size of the string to buffer
    buffer[index] = codeSize & 0xff;
    buffer[index + 1] = codeSize >> 8 & 0xff;
    buffer[index + 2] = codeSize >> 16 & 0xff;
    buffer[index + 3] = codeSize >> 24 & 0xff;
    // Write end 0
    buffer[index + 4 + codeSize - 1] = 0;
    // Write the
    index = index + codeSize + 4;

    //
    // Serialize the scope value
    var endIndex = serializeInto(buffer, value.scope, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined);
    index = endIndex - 1;

    // Writ the total
    var totalSize = endIndex - startIndex;

    // Write the total size of the object
    buffer[startIndex++] = totalSize & 0xff;
    buffer[startIndex++] = totalSize >> 8 & 0xff;
    buffer[startIndex++] = totalSize >> 16 & 0xff;
    buffer[startIndex++] = totalSize >> 24 & 0xff;
    // Write trailing zero
    buffer[index++] = 0;
  } else {
    buffer[index++] = BSON$1.BSON_DATA_CODE;
    // Number of written bytes
    numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
    // Encode the name
    index = index + numberOfWrittenBytes;
    buffer[index++] = 0;
    // Function string
    functionString = value.code.toString();
    // Write the string
    var size = buffer.write(functionString, index + 4, 'utf8') + 1;
    // Write the size of the string to buffer
    buffer[index] = size & 0xff;
    buffer[index + 1] = size >> 8 & 0xff;
    buffer[index + 2] = size >> 16 & 0xff;
    buffer[index + 3] = size >> 24 & 0xff;
    // Update index
    index = index + 4 + size - 1;
    // Write zero
    buffer[index++] = 0;
  }

  return index;
};

var serializeBinary = function serializeBinary(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_BINARY;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Extract the buffer
  var data = value.value(true);
  // Calculate size
  var size = value.position;
  // Add the deprecated 02 type 4 bytes of size to total
  if (value.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY) size = size + 4;
  // Write the size of the string to buffer
  buffer[index++] = size & 0xff;
  buffer[index++] = size >> 8 & 0xff;
  buffer[index++] = size >> 16 & 0xff;
  buffer[index++] = size >> 24 & 0xff;
  // Write the subtype to the buffer
  buffer[index++] = value.sub_type;

  // If we have binary type 2 the 4 first bytes are the size
  if (value.sub_type === Binary$2.SUBTYPE_BYTE_ARRAY) {
    size = size - 4;
    buffer[index++] = size & 0xff;
    buffer[index++] = size >> 8 & 0xff;
    buffer[index++] = size >> 16 & 0xff;
    buffer[index++] = size >> 24 & 0xff;
  }

  // Write the data to the object
  data.copy(buffer, index, 0, value.position);
  // Adjust the index
  index = index + value.position;
  return index;
};

var serializeSymbol = function serializeSymbol(buffer, key, value, index, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_SYMBOL;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');
  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;
  // Write the string
  var size = buffer.write(value.value, index + 4, 'utf8') + 1;
  // Write the size of the string to buffer
  buffer[index] = size & 0xff;
  buffer[index + 1] = size >> 8 & 0xff;
  buffer[index + 2] = size >> 16 & 0xff;
  buffer[index + 3] = size >> 24 & 0xff;
  // Update index
  index = index + 4 + size - 1;
  // Write zero
  buffer[index++] = 0x00;
  return index;
};

var serializeDBRef = function serializeDBRef(buffer, key, value, index, depth, serializeFunctions, isArray) {
  // Write the type
  buffer[index++] = BSON$1.BSON_DATA_OBJECT;
  // Number of written bytes
  var numberOfWrittenBytes = !isArray ? buffer.write(key, index, 'utf8') : buffer.write(key, index, 'ascii');

  // Encode the name
  index = index + numberOfWrittenBytes;
  buffer[index++] = 0;

  var startIndex = index;
  var endIndex;
  var output = {
    $ref: value.collection,
    $id: value.oid
  };

  if (value.db != null) output.$db = value.db;

  output = Object.assign(output, value.fields);
  endIndex = serializeInto(buffer, output, false, index, depth + 1, serializeFunctions);

  // Calculate object size
  var size = endIndex - startIndex;
  // Write the size
  buffer[startIndex++] = size & 0xff;
  buffer[startIndex++] = size >> 8 & 0xff;
  buffer[startIndex++] = size >> 16 & 0xff;
  buffer[startIndex++] = size >> 24 & 0xff;
  // Set index
  return endIndex;
};

var serializeInto = function serializeInto(buffer, object, checkKeys, startingIndex, depth, serializeFunctions, ignoreUndefined, path) {
  startingIndex = startingIndex || 0;
  path = path || [];

  // Push the object to the path
  path.push(object);

  // Start place to serialize into
  var index = startingIndex + 4;

  // Special case isArray
  if (Array.isArray(object)) {
    // Get object keys
    for (var i = 0; i < object.length; i++) {
      var key = '' + i;
      var value = object[i];

      // Is there an override value
      if (value && value.toBSON) {
        if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        value = value.toBSON();
      }

      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      if (type === 'string') {
        index = serializeString(buffer, key, value, index, true);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index, true);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index, true);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index, true);
      } else if (value === undefined) {
        index = serializeNull(buffer, key, value, index, true);
      } else if (value === null) {
        index = serializeNull(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index, true);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index, true);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index, true);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index, true);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index, true);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index, true);
      }
    }
  } else if (object instanceof map) {
    var iterator = object.entries();
    var done = false;

    while (!done) {
      // Unpack the next entry
      var entry = iterator.next();
      done = entry.done;
      // Are we done, then skip and terminate
      if (done) continue;

      // Get the entry values
      key = entry.value[0];
      value = entry.value[1];

      // Check the type of the value
      type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      // Check the key and throw error if it's illegal
      if (key !== '$db' && key !== '$ref' && key !== '$id') {
        if (key.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + key + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === key[0]) {
            throw Error('key ' + key + " must not start with '$'");
          } else if (~key.indexOf('.')) {
            throw Error('key ' + key + " must not contain '.'");
          }
        }
      }

      if (type === 'string') {
        index = serializeString(buffer, key, value, index);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index);
      } else if (value === null || value === undefined && ignoreUndefined === false) {
        index = serializeNull(buffer, key, value, index);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index);
      }
    }
  } else {
    // Did we provide a custom serialization method
    if (object.toBSON) {
      if (typeof object.toBSON !== 'function') throw new TypeError('toBSON is not a function');
      object = object.toBSON();
      if (object != null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') throw new TypeError('toBSON function did not return an object');
    }

    // Iterate over all the keys
    for (key in object) {
      value = object[key];
      // Is there an override value
      if (value && value.toBSON) {
        if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        value = value.toBSON();
      }

      // Check the type of the value
      type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      // Check the key and throw error if it's illegal
      if (key !== '$db' && key !== '$ref' && key !== '$id') {
        if (key.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + key + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === key[0]) {
            throw Error('key ' + key + " must not start with '$'");
          } else if (~key.indexOf('.')) {
            throw Error('key ' + key + " must not contain '.'");
          }
        }
      }

      if (type === 'string') {
        index = serializeString(buffer, key, value, index);
      } else if (type === 'number') {
        index = serializeNumber(buffer, key, value, index);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer, key, value, index);
      } else if (value instanceof Date || isDate(value)) {
        index = serializeDate(buffer, key, value, index);
      } else if (value === undefined) {
        if (ignoreUndefined === false) index = serializeNull(buffer, key, value, index);
      } else if (value === null) {
        index = serializeNull(buffer, key, value, index);
      } else if (value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer, key, value, index);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer, key, value, index);
      } else if (value instanceof RegExp || isRegExp(value)) {
        index = serializeRegExp(buffer, key, value, index);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer, key, value, index, checkKeys, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer, key, value, index);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer, key, value, index, depth, serializeFunctions);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer, key, value, index);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer, key, value, index);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer, key, value, index);
      }
    }
  }

  // Remove the path
  path.pop();

  // Final padding byte for object
  buffer[index++] = 0x00;

  // Final size
  var size = index - startingIndex;
  // Write the size of the object
  buffer[startingIndex++] = size & 0xff;
  buffer[startingIndex++] = size >> 8 & 0xff;
  buffer[startingIndex++] = size >> 16 & 0xff;
  buffer[startingIndex++] = size >> 24 & 0xff;
  return index;
};

var BSON$1 = {};

/**
 * Contains the function cache if we have that enable to allow for avoiding the eval step on each deserialization, comparison is by md5
 *
 * @ignore
 * @api private
 */
// var functionCache = (BSON.functionCache = {});

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON$1.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON$1.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON$1.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON$1.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON$1.BSON_DATA_BINARY = 5;
/**
 * ObjectID BSON Type, deprecated
 *
 * @classconstant BSON_DATA_UNDEFINED
 **/
BSON$1.BSON_DATA_UNDEFINED = 6;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON$1.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON$1.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON$1.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON$1.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON$1.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON$1.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON$1.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON$1.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON$1.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON$1.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON$1.BSON_DATA_LONG = 18;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_DECIMAL128
 **/
BSON$1.BSON_DATA_DECIMAL128 = 19;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON$1.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON$1.BSON_DATA_MAX_KEY = 0x7f;
/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON$1.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON$1.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON$1.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON$1.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON$1.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON$1.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// BSON MAX VALUES
BSON$1.BSON_INT32_MAX = 0x7fffffff;
BSON$1.BSON_INT32_MIN = -0x80000000;

BSON$1.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON$1.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON$1.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$1.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
// var JS_INT_MAX_LONG = Long.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
// var JS_INT_MIN_LONG = Long.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

var serializer = serializeInto;

var Buffer$6 = require$$0.Buffer;
var Long$3 = long_1.Long,
    Double$2 = double_1.Double,
    Timestamp$2 = timestamp.Timestamp,
    ObjectID$2 = objectid.ObjectID,
    _Symbol$1 = symbol.Symbol,
    BSONRegExp$2 = regexp.BSONRegExp,
    Code$2 = code.Code,
    MinKey$3 = min_key.MinKey,
    MaxKey$2 = max_key.MaxKey,
    DBRef$2 = db_ref.DBRef,
    Binary$3 = binary.Binary;

var normalizedFunctionString$2 = utils.normalizedFunctionString;

// To ensure that 0.4 of node works correctly
var isDate$1 = function isDate(d) {
  return (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
};

var calculateObjectSize = function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
  var totalLength = 4 + 1;

  if (Array.isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      totalLength += calculateElement(i.toString(), object[i], serializeFunctions, true, ignoreUndefined);
    }
  } else {
    // If we have toBSON defined, override the current object

    if (object.toBSON) {
      object = object.toBSON();
    }

    // Calculate size
    for (var key in object) {
      totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
    }
  }

  return totalLength;
};

/**
 * @ignore
 * @api private
 */
function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
  // If we have toBSON defined, override the current object
  if (value && value.toBSON) {
    value = value.toBSON();
  }

  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'string':
      return 1 + Buffer$6.byteLength(name, 'utf8') + 1 + 4 + Buffer$6.byteLength(value, 'utf8') + 1;
    case 'number':
      if (Math.floor(value) === value && value >= BSON$2.JS_INT_MIN && value <= BSON$2.JS_INT_MAX) {
        if (value >= BSON$2.BSON_INT32_MIN && value <= BSON$2.BSON_INT32_MAX) {
          // 32 bit
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (4 + 1);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
        }
      } else {
        // 64 bit
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      }
    case 'undefined':
      if (isArray || !ignoreUndefined) return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      return 0;
    case 'boolean':
      return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 1);
    case 'object':
      if (value == null || value instanceof MinKey$3 || value instanceof MaxKey$2 || value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      } else if (value instanceof ObjectID$2 || value['_bsontype'] === 'ObjectID') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (12 + 1);
      } else if (value instanceof Date || isDate$1(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (typeof Buffer$6 !== 'undefined' && Buffer$6.isBuffer(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 4 + 1) + value.length;
      } else if (value instanceof Long$3 || value instanceof Double$2 || value instanceof Timestamp$2 || value['_bsontype'] === 'Long' || value['_bsontype'] === 'Double' || value['_bsontype'] === 'Timestamp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (value instanceof decimal128 || value['_bsontype'] === 'Decimal128') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (16 + 1);
      } else if (value instanceof Code$2 || value['_bsontype'] === 'Code') {
        // Calculate size depending on the availability of a scope
        if (value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1;
        }
      } else if (value instanceof Binary$3 || value['_bsontype'] === 'Binary') {
        // Check what kind of subtype we have
        if (value.sub_type === Binary$3.SUBTYPE_BYTE_ARRAY) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1 + 4);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1);
        }
      } else if (value instanceof _Symbol$1 || value['_bsontype'] === 'Symbol') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + Buffer$6.byteLength(value.value, 'utf8') + 4 + 1 + 1;
      } else if (value instanceof DBRef$2 || value['_bsontype'] === 'DBRef') {
        // Set up correct object for serialization
        var ordered_values = {
          $ref: value.collection,
          $id: value.oid
        };

        // Add db reference if it exists
        if (value.db != null) {
          ordered_values['$db'] = value.db;
        }

        ordered_values = Object.assign(ordered_values, value.fields);

        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined);
      } else if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else if (value instanceof BSONRegExp$2 || value['_bsontype'] === 'BSONRegExp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.pattern, 'utf8') + 1 + Buffer$6.byteLength(value.options, 'utf8') + 1;
      } else {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + calculateObjectSize(value, serializeFunctions, ignoreUndefined) + 1;
      }
    case 'function':
      // WTF for 0.4.X where typeof /someregexp/ === 'function'
      if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]' || String.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else {
        if (serializeFunctions && value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else if (serializeFunctions) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1;
        }
      }
  }

  return 0;
}

var BSON$2 = {};

// BSON MAX VALUES
BSON$2.BSON_INT32_MAX = 0x7fffffff;
BSON$2.BSON_INT32_MIN = -0x80000000;

// JS MAX PRECISE VALUES
BSON$2.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$2.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

var calculate_size = calculateObjectSize;

var Buffer$7 = require$$0.Buffer;

/**
 * Makes sure that, if a Uint8Array is passed in, it is wrapped in a Buffer.
 *
 * @param {Buffer|Uint8Array} potentialBuffer The potential buffer
 * @returns {Buffer} the input if potentialBuffer is a buffer, or a buffer that
 * wraps a passed in Uint8Array
 * @throws {TypeError} If anything other than a Buffer or Uint8Array is passed in 
 */
var ensure_buffer = function ensureBuffer(potentialBuffer) {
  if (potentialBuffer instanceof Buffer$7) {
    return potentialBuffer;
  }
  if (potentialBuffer instanceof Uint8Array) {
    return new Buffer$7(potentialBuffer.buffer);
  }

  throw new TypeError('Must use either Buffer or Uint8Array');
};

var Buffer$8 = require$$0.Buffer;

// Parts of the parser


/**
 * @ignore
 * @api private
 */
// Default Max Size
var MAXSIZE = 1024 * 1024 * 17;

// Current Internal Temporary Serialization Buffer
var buffer = new Buffer$8(MAXSIZE);

var BSON$3 = function BSON() {};

/**
 * Serialize a Javascript object.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @param {Number} [options.minInternalBufferSize=1024*1024*17] minimum size of the internal temporary serialization buffer **(default:1024*1024*17)**.
 * @return {Buffer} returns the Buffer object containing the serialized object.
 * @api public
 */
BSON$3.prototype.serialize = function serialize(object, options) {
  options = options || {};
  // Unpack the options
  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var minInternalBufferSize = typeof options.minInternalBufferSize === 'number' ? options.minInternalBufferSize : MAXSIZE;

  // Resize the internal serialization buffer if needed
  if (buffer.length < minInternalBufferSize) {
    buffer = new Buffer$8(minInternalBufferSize);
  }

  // Attempt to serialize
  var serializationIndex = serializer(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined, []);
  // Create the final buffer
  var finishedBuffer = new Buffer$8(serializationIndex);
  // Copy into the finished buffer
  buffer.copy(finishedBuffer, 0, 0, finishedBuffer.length);
  // Return the buffer
  return finishedBuffer;
};

/**
 * Serialize a Javascript object using a predefined Buffer and index into the buffer, useful when pre-allocating the space for serialization.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Buffer|Uint8Array} buffer the Buffer you pre-allocated to store the serialized BSON object.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @param {Number} [options.index] the index in the buffer where we wish to start serializing into.
 * @return {Number} returns the index pointing to the last written byte in the buffer.
 * @api public
 */
BSON$3.prototype.serializeWithBufferAndIndex = function (object, finalBuffer, options) {
  options = options || {};
  // Unpack the options
  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var startIndex = typeof options.index === 'number' ? options.index : 0;

  // Attempt to serialize
  var serializationIndex = serializer(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined);

  finalBuffer = ensure_buffer(finalBuffer);

  buffer.copy(finalBuffer, startIndex, 0, serializationIndex);

  // Return the index
  return startIndex + serializationIndex - 1;
};

/**
 * Deserialize data as BSON.
 *
 * @param {Buffer|Uint8Array} buffer the buffer containing the serialized set of BSON documents.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @param {boolean} [options.allowObjectSmallerThanBufferSize=false] allows the buffer to be larger than the parsed BSON object
 * @return {Object} returns the deserialized Javascript Object.
 * @api public
 */
BSON$3.prototype.deserialize = function (buffer, options) {
  buffer = ensure_buffer(buffer);
  return deserializer(buffer, options);
};

/**
 * Calculate the bson size for a passed in Javascript object.
 *
 * @param {Object} object the Javascript object to calculate the BSON byte size for.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @return {Number} returns the number of bytes the BSON object will take up.
 * @api public
 */
BSON$3.prototype.calculateObjectSize = function (object, options) {
  options = options || {};

  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;

  return calculate_size(object, serializeFunctions, ignoreUndefined);
};

/**
 * Deserialize stream data as BSON documents.
 *
 * @param {Buffer|Uint8Array} data the buffer containing the serialized set of BSON documents.
 * @param {Number} startIndex the start index in the data Buffer where the deserialization is to start.
 * @param {Number} numberOfDocuments number of documents to deserialize.
 * @param {Array} documents an array where to store the deserialized documents.
 * @param {Number} docStartIndex the index in the documents array from where to start inserting documents.
 * @param {Object} [options] additional options used for the deserialization.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @return {Number} returns the next index in the buffer after deserialization **x** numbers of documents.
 * @api public
 */
BSON$3.prototype.deserializeStream = function (data, startIndex, numberOfDocuments, documents, docStartIndex, options) {
  options = Object.assign({ allowObjectSmallerThanBufferSize: true }, options);
  data = ensure_buffer(data);
  var index = startIndex;
  // Loop over all documents
  for (var i = 0; i < numberOfDocuments; i++) {
    // Find size of the document
    var size = data[index] | data[index + 1] << 8 | data[index + 2] << 16 | data[index + 3] << 24;
    // Update options with index
    options.index = index;
    // Parse the document at this point
    documents[docStartIndex + i] = this.deserialize(data, options);
    // Adjust index by the document size
    index = index + size;
  }

  // Return object containing end index of parsing and list of documents
  return index;
};

/**
 * @ignore
 * @api private
 */
// BSON MAX VALUES
BSON$3.BSON_INT32_MAX = 0x7fffffff;
BSON$3.BSON_INT32_MIN = -0x80000000;

BSON$3.BSON_INT64_MAX = Math.pow(2, 63) - 1;
BSON$3.BSON_INT64_MIN = -Math.pow(2, 63);

// JS MAX PRECISE VALUES
BSON$3.JS_INT_MAX = 0x20000000000000; // Any integer up to 2^53 can be precisely represented by a double.
BSON$3.JS_INT_MIN = -0x20000000000000; // Any integer down to -2^53 can be precisely represented by a double.

// Internal long versions
// var JS_INT_MAX_LONG = Long.fromNumber(0x20000000000000); // Any integer up to 2^53 can be precisely represented by a double.
// var JS_INT_MIN_LONG = Long.fromNumber(-0x20000000000000); // Any integer down to -2^53 can be precisely represented by a double.

/**
 * Number BSON Type
 *
 * @classconstant BSON_DATA_NUMBER
 **/
BSON$3.BSON_DATA_NUMBER = 1;
/**
 * String BSON Type
 *
 * @classconstant BSON_DATA_STRING
 **/
BSON$3.BSON_DATA_STRING = 2;
/**
 * Object BSON Type
 *
 * @classconstant BSON_DATA_OBJECT
 **/
BSON$3.BSON_DATA_OBJECT = 3;
/**
 * Array BSON Type
 *
 * @classconstant BSON_DATA_ARRAY
 **/
BSON$3.BSON_DATA_ARRAY = 4;
/**
 * Binary BSON Type
 *
 * @classconstant BSON_DATA_BINARY
 **/
BSON$3.BSON_DATA_BINARY = 5;
/**
 * ObjectID BSON Type
 *
 * @classconstant BSON_DATA_OID
 **/
BSON$3.BSON_DATA_OID = 7;
/**
 * Boolean BSON Type
 *
 * @classconstant BSON_DATA_BOOLEAN
 **/
BSON$3.BSON_DATA_BOOLEAN = 8;
/**
 * Date BSON Type
 *
 * @classconstant BSON_DATA_DATE
 **/
BSON$3.BSON_DATA_DATE = 9;
/**
 * null BSON Type
 *
 * @classconstant BSON_DATA_NULL
 **/
BSON$3.BSON_DATA_NULL = 10;
/**
 * RegExp BSON Type
 *
 * @classconstant BSON_DATA_REGEXP
 **/
BSON$3.BSON_DATA_REGEXP = 11;
/**
 * Code BSON Type
 *
 * @classconstant BSON_DATA_CODE
 **/
BSON$3.BSON_DATA_CODE = 13;
/**
 * Symbol BSON Type
 *
 * @classconstant BSON_DATA_SYMBOL
 **/
BSON$3.BSON_DATA_SYMBOL = 14;
/**
 * Code with Scope BSON Type
 *
 * @classconstant BSON_DATA_CODE_W_SCOPE
 **/
BSON$3.BSON_DATA_CODE_W_SCOPE = 15;
/**
 * 32 bit Integer BSON Type
 *
 * @classconstant BSON_DATA_INT
 **/
BSON$3.BSON_DATA_INT = 16;
/**
 * Timestamp BSON Type
 *
 * @classconstant BSON_DATA_TIMESTAMP
 **/
BSON$3.BSON_DATA_TIMESTAMP = 17;
/**
 * Long BSON Type
 *
 * @classconstant BSON_DATA_LONG
 **/
BSON$3.BSON_DATA_LONG = 18;
/**
 * MinKey BSON Type
 *
 * @classconstant BSON_DATA_MIN_KEY
 **/
BSON$3.BSON_DATA_MIN_KEY = 0xff;
/**
 * MaxKey BSON Type
 *
 * @classconstant BSON_DATA_MAX_KEY
 **/
BSON$3.BSON_DATA_MAX_KEY = 0x7f;

/**
 * Binary Default Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
 **/
BSON$3.BSON_BINARY_SUBTYPE_DEFAULT = 0;
/**
 * Binary Function Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
 **/
BSON$3.BSON_BINARY_SUBTYPE_FUNCTION = 1;
/**
 * Binary Byte Array Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
 **/
BSON$3.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/**
 * Binary UUID Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_UUID
 **/
BSON$3.BSON_BINARY_SUBTYPE_UUID = 3;
/**
 * Binary MD5 Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_MD5
 **/
BSON$3.BSON_BINARY_SUBTYPE_MD5 = 4;
/**
 * Binary User Defined Type
 *
 * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
 **/
BSON$3.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;

// Return BSON
var bson = BSON$3;
var Code_1$1 = code;
var Map_1 = map;
var Symbol_1$1 = symbol;
var BSON_1 = BSON$3;
var DBRef_1$1 = db_ref;
var Binary_1$1 = binary;
var ObjectId$1 = objectid;
var ObjectID_1$1 = objectid;
var Long_1$1 = long_1;
var Timestamp_1$1 = timestamp;
var Double_1$1 = double_1;
var Int32_1$1 = int_32;
var MinKey_1$1 = min_key;
var MaxKey_1$1 = max_key;
var BSONRegExp_1$1 = regexp;
var Decimal128_1$1 = decimal128;
bson.Code = Code_1$1;
bson.Map = Map_1;
bson.Symbol = Symbol_1$1;
bson.BSON = BSON_1;
bson.DBRef = DBRef_1$1;
bson.Binary = Binary_1$1;
bson.ObjectId = ObjectId$1;
bson.ObjectID = ObjectID_1$1;
bson.Long = Long_1$1;
bson.Timestamp = Timestamp_1$1;
bson.Double = Double_1$1;
bson.Int32 = Int32_1$1;
bson.MinKey = MinKey_1$1;
bson.MaxKey = MaxKey_1$1;
bson.BSONRegExp = BSONRegExp_1$1;
bson.Decimal128 = Decimal128_1$1;

var jsBson = bson;

return jsBson;

})));

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/mongodb-stitch-extjson/node_modules/mongodb-stitch-bson/dist/bson.browser.umd.js","/../../node_modules/mongodb-stitch-extjson/node_modules/mongodb-stitch-bson/dist")
},{"b55mWE":6,"buffer":5}],113:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/whatwg-fetch/fetch.js","/../../node_modules/whatwg-fetch")
},{"b55mWE":6,"buffer":5}],114:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";

var _mongodbStitchBrowserSdk = require("mongodb-stitch-browser-sdk");

/*===========================
 1. function declaretion
 ==========================*/
var themeApp = {
	featuredMedia: function featuredMedia() {
		$(".post").each(function () {
			var thiseliment = $(this);
			var media_wrapper = $(this).find('featured');
			var media_content_image = media_wrapper.find($('img'));
			var media_content_embeded = media_wrapper.find('iframe');
			if (media_content_image.length > 0) {
				$(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-image');
				media_wrapper.remove();
			} else if (media_content_embeded.length > 0) {
				$(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-embeded');
			}
		});
	},
	sidebarConfig: function sidebarConfig() {
		if (sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	facebook: function facebook() {
		var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + facebook_page_url + '&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
		$('.fb').append(fb_page);
	},
	googlePlus: function googlePlus() {
		if (badge_type !== "" && google_plus_url !== "") {
			$('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
			var container = $('.google-plus');
			var width = container.width();
			var google_plus_code = '<div class="g-' + badge_type + '" data-width="' + width + '" data-layout="landscape" data-height="150px" data-href="' + google_plus_url + '" data-rel="publisher"></div>';
			container.append(google_plus_code);
		}
	},
	highlighter: function highlighter() {
		$('pre code').each(function (i, block) {
			hljs.highlightBlock(block);
		});
	},
	backToTop: function backToTop() {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 1000);
			return false;
		});
	},
	adjustTileHeight: function adjustTileHeight() {
		var tile = $('.archive .tag-wrapper');
		var max_height = 0;
		if (tile.length > 0) {
			$.each(tile, function () {
				var h = $(this).height();
				max_height = h > max_height ? h : max_height;
			});
			tile.height(max_height);
		}
	},
	mobileNavigation: function mobileNavigation() {
		$('nav').on('click', function (event) {
			$('.navbar-collapse').toggleClass("active");
			console.log('clicked');
		});
	},
	kanban: function kanban() {
		var client = _mongodbStitchBrowserSdk.Stitch.initializeDefaultAppClient('hackerjira-bzmfe');
		client.auth.loginWithCredential(new _mongodbStitchBrowserSdk.AnonymousCredential()).then(function (user) {
			console.log(user);
			client.close();
		}).catch(function (err) {
			console.log(err);
			client.close();
		});

		function populateCards(cards, status) {
			for (var i = 0; i < cards.length; i++) {
				$('#' + status + ' .cards').append('<div class="card"> \n' + '<h5>' + cards[i].summary + '</h5> \n' +
				//'<p>' + cards[i].description + '</p> \n' +
				'<div style="background-color:' + cards[i].issuetype_color + ';" class="issuetype ' + cards[i].issuetype + '"><img src="' + cards[i].issuetype_url + '"></div> \n' + '<div class="info"> \n' + '<div class="left"> \n' + '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' + '<div class="priority ' + cards[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' + '</div> \n' + '<div class="epic ' + cards[i].epic_name + '"><span>' + cards[i].epic_name + '</span> <i class="fas fa-bolt" style=color:' + cards[i].epic_color + ';"></i></div> \n' + '</div> \n' + '</div>');
			}
			$('#' + status).append('<span class="count"></span>');
		}

		var backlogColumn = document.getElementById("backlog");
		var todoColumn = document.getElementById("todo");
		var progressColumn = document.getElementById("inprogress");
		var doneColumn = document.getElementById("done");

		client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(function () {
			return db.collection('hackersandslackers').find({ status: 'Backlog', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug'] }, priority: { $in: ['Highest', 'High', 'Medium'] } }, { limit: 7 }).asArray();
		}).then(function (docs) {
			console.log("Found docs", docs);
			populateCards(docs, 'backlog');
		}).catch(function (err) {
			console.error(err);
		});

		client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(function () {
			return db.collection('hackersandslackers').find({ status: 'To Do', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug', 'Data'] } }, { limit: 7 }).asArray();
		}).then(function (docs) {
			console.log("Found docs", docs);
			populateCards(docs, 'todo');
		}).catch(function (err) {
			console.error(err);
		});

		client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(function () {
			return db.collection('hackersandslackers').find({ status: 'In Progress', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug', 'Content', 'Data'] } }, { limit: 7 }).asArray();
		}).then(function (docs) {
			console.log("Found docs", docs);
			populateCards(docs, 'progress');
		}).catch(function (err) {
			console.error(err);
		});

		client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(function () {
			return db.collection('hackersandslackers').find({ status: 'Done', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug'] } }, { limit: 7 }).asArray();
		}).then(function (docs) {
			console.log("Found docs", docs);
			populateCards(docs, 'done');
		}).catch(function (err) {
			console.error(err);
		});

		var swiper = new Swiper('.swiper-container', {
			height: 800,
			noSwiping: true,
			spaceBetween: 10,
			centeredSlides: false,
			slidesPerView: 4,
			grabCursor: false,
			breakpoints: {
				// when window width is <= 320px
				1000: {
					slidesPerView: 2,
					noSwiping: false,
					grabCursor: true,
					initialSlide: 0,
					centeredSlides: false
				},
				800: {
					slidesPerView: 1,
					noSwiping: false,
					grabCursor: true,
					slidesOffsetBefore: 20,
					slidesOffsetAfter: 20,
					centeredSlides: true
				},
				600: {
					slidesPerView: 1,
					noSwiping: false,
					slidesPerColumnFill: 'column',
					grabCursor: true,
					slidesOffsetBefore: 20,
					slidesOffsetAfter: 20,
					centeredSlides: true
				},
				400: {
					slidesPerView: 1,
					noSwiping: false,
					slidesPerColumnFill: 'column',
					grabCursor: true,
					slidesOffsetBefore: 20,
					slidesOffsetAfter: 20,
					centeredSlides: true
				}
			}
		});
		swiper.on('resize', function () {
			swiper.slideTo(0, 300, false);
		});
	},
	init: function init() {
		themeApp.featuredMedia();
		themeApp.sidebarConfig();
		themeApp.facebook();
		themeApp.highlighter();
		themeApp.backToTop();
		themeApp.adjustTileHeight();
		themeApp.mobileNavigation();
	}

	/*===========================
 2. Initialization
 ==========================*/
}; /*====================================================
     TABLE OF CONTENTS
     1. function declaretion
     2. Initialization
   ====================================================*/

$(document).ready(function () {
	themeApp.init();
});
}).call(this,require("b55mWE"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_1c409321.js","/")
},{"b55mWE":6,"buffer":5,"mongodb-stitch-browser-sdk":95}]},{},[114])