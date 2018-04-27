/*jslint node: true, white: true, nomen: true, vars: true, unparam: true */

"use strict";

var GetPocket = require('./getpocket');
var Express = require('express');
var StdIo = require('stdio');

var options = StdIo.getopt({
    'consumerkey': {
        key: 'c',
        description: 'GetPocket consumer key',
        mandatory: true,
        args: 1
    },
    'host': {
        key: 'h',
        description: 'Host name or IP address',
        args: 1,
        default: '127.0.0.1'
    },
    'port': {
        key: 'p',
        description: 'Listening port',
        args: 1,
        default: 8080
    }
});

var cfg = {
    consumer_key: options.consumerkey,
    request_token: '',
    access_token: '',
    user_name: '',
    redirect_uri: 'http://localhost:8080/redirect'
};

var pocket = new GetPocket(cfg);
var app = new Express();

app.get('/', function(req, res) {
    var params = {
        redirect_uri: cfg.redirect_uri
    };
    app.locals.res = res;
    console.log('Asking GetPocket for request token ...');
    console.log('params: ', params);
    pocket.getRequestToken(params, function(err, resp, body) {
        if (err) {
            console.log('Failed to get request token: ' + err);
            app.locals.res.send('<p>' + 'Failed to get request token: ' + err + '</p>');
        }

        else if (resp.statusCode !== 200) {
            app.locals.res.send('<p>Oops, Pocket said ' + resp.headers.status + ', ' + resp.headers['x-error'] + '</p>');
        }

        else {
            var json = JSON.parse(body);
            cfg.request_token = json.code;
            console.log('Received request token: ' + cfg.request_token);

            var url = pocket.getAuthorizeURL(cfg);
            console.log('Redirecting to ' + url + ' for authentication');
            app.locals.res.redirect(url);
        }
    });
});
app.get('/redirect', function(req, res) {
    console.log('Authentication callback active ...');
    console.log('Asking GetPocket for access token ...');

    app.locals.res = res;
    var params = {
        request_token: cfg.request_token
    };
    console.log('params: ', params);

    pocket.getAccessToken(params, function access_token_handler(err, resp, body) {
        if (err) {
            console.log('Failed to get access token: ' + err);
            app.locals.res.send('<p>' + 'Failed to get access token: ' + err + '</p>');
        }

        else if (resp.statusCode !== 200) {
            app.locals.res.send('<p>Oops, Pocket said ' + resp.headers.status + ', ' + resp.headers['x-error'] + '</p>');
        }

        else {
            var json = JSON.parse(body);
            cfg.access_token = json.access_token;
            cfg.user_name = json.username;
            console.log('Received access token: ' + cfg.access_token + ' for user ' + cfg.user_name);
            var config = {
                consumer_key: cfg.consumer_key,
                access_token: cfg.access_token
            };
            app.locals.res.send('<p>Pocket says "yes"</p>' +
                '<p>Your <code>GetPocket</code> configuration should look like this ...</p>' +
                '<p><code>var config = ' + JSON.stringify(config, undefined, 2) + ';</code></p>');
        }
    });
});

var server = app.listen(options.port, options.host, function() {
    console.log('Now listening at http://%s:%s', server.address().address, server.address().port);
});
