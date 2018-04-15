/*jslint node: true, white: true, nomen: true, vars: true, unparam: true */

"use strict";

var request = require('request');

var ROOT_URL = 'https://getpocket.com';
var ADD_URL = '/v3/add';
var SEND_URL = '/v3/send';
var GET_URL = '/v3/get';
var OAUTH_REQUEST_URL = '/v3/oauth/request';
var OAUTH_TOKEN_URL = '/auth/authorize';
var OAUTH_ACCESS_URL = '/v3/oauth/authorize';

// var config = {
//     consumer_key: 'my-consumer-key', (required)
//     access_token: 'my-access-token' (required for non authorisation calls)
// };

function GetPocket(config) {
    this.config = config;
    this.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json'
    };
}

GetPocket.prototype = {
    // var config = {
    //     consumer_key: 'my-consumer-key', (required)
    //     access_token: 'my-access-token' (required for non authorisation calls)
    // };
    refreshConfig: function(config) {
        this.config = config;
    },
    // var params = {
    //     redirect_uri: 'http://localhost:8080/redirect'
    // };
    getRequestToken: function(params, callback) {
        if (!params.redirect_uri) {
            callback(new Error('400 Bad Request - missing params.redirect_uri'), null, null);
            return false;
        }
        var options = params;
        options.consumer_key = this.config.consumer_key;
        var url = ROOT_URL + OAUTH_REQUEST_URL;
        var opts = {
            uri: url,
            headers: this.headers,
            body: JSON.stringify(options)
        };
        return request.post(opts, callback);
    },
    // var params = {
    //     request_token: 'token-from-getRequestToken',
    //     redirect_uri: 'http://localhost:8080/redirect'
    // };
    getAuthorizeURL: function(params) {
        return ROOT_URL + OAUTH_TOKEN_URL + '?request_token=' + params.request_token + '&redirect_uri=' + params.redirect_uri;
    },
    // var params = {
    //     request_token: 'token-from-getRequestToken'
    // };
    getAccessToken: function(params, callback) {
        if (!params.request_token) {
            callback(new Error('400 Bad Request - missing params.request_token'), null, null);
            return false;
        }

        var options = params;
        options.consumer_key = this.config.consumer_key;
        options.code = params.request_token;
        var url = ROOT_URL + OAUTH_ACCESS_URL;
        var opts = {
            uri: url,
            headers: this.headers,
            body: JSON.stringify(options)
        };
        return request.post(opts, callback);
    },
    // var params = {
    //     url: 'url to add', (required),
    //     title: 'title', (optional),
    //     tags: 'tag,tag,...', (optional)
    //     tweet_id: 'id' (optional)
    // };
    add: function(params, callback) {
        if (!params.url) {
            callback(new Error('400 Bad Request - missing params.url'), null);
            return false;
        }

        var options = params;
        options.consumer_key = this.config.consumer_key;
        options.access_token = this.config.access_token;
        var url = ROOT_URL + ADD_URL;
        var opts = {
            uri: url,
            headers: this.headers,
            body: JSON.stringify(options)
        };

        var self = this;
        request.post(opts, function(error, response, body) {
            self._callbackHandler(error, response, body, callback);
        });
    },
    send: function(params, callback) {
        if (!params.actions) {
            callback(new Error('400 Bad Request - missing params.actions'), null, null);
            return false;
        }

        var options = params;
        options.consumer_key = this.config.consumer_key;
        options.access_token = this.config.access_token;
        var url = ROOT_URL + SEND_URL;
        var opts = {
            uri: url,
            headers: this.headers,
            body: JSON.stringify(options)
        };

        var self = this;
        request.post(opts, function(error, response, body) {
            self._callbackHandler(error, response, body, callback);
        });
    },
    modify: function(params, callback) {
        // alias for send
        return this.send(params, callback);
    },
    get: function(params, callback) {
        var options = params || {};
        options.consumer_key = this.config.consumer_key;
        options.access_token = this.config.access_token;
        var url = ROOT_URL + GET_URL;

        var opts = {
            uri: url,
            headers: this.headers,
            body: JSON.stringify(options)
        };

        var self = this;
        request.post(opts, function(error, response, body) {
            self._callbackHandler(error, response, body, callback);
        });
    },
    retrieve: function(params, callback) {
        // alias for get
        return this.get(params, callback);
    },
    // var params = {
    //     item_id: 'item to archive'
    // };
    archive: function(params, callback) {
        if (!params || !params.item_id) {
            callback(new Error('400 Bad Request - missing params.item_id'), null, null);
            return false;
        }

        var actions = [
            {
                action: 'archive',
                item_id: params.item_id,
                time: new Date().getTime()
            }
        ];
        var options = {
            actions: actions
        };
        this.send(options, callback);
    },
    _callbackHandler: function(error, response, body, callback) {
        if (error) {
            callback(error, undefined);
        }

        else if (response.statusCode !== 200) {
            callback(new Error(response.statusCode), undefined);
        }

        else {
            try {
                var payload = JSON.parse(body);
                callback(undefined, payload);
            }
            catch (e) {
                callback(new Error('Could not interpret response from getpocket.com as JSON. Sorry ' + e), undefined);
            }
        }
    }
};

module.exports = GetPocket;
