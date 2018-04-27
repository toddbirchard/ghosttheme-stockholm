# node-getpocket

A Pocket API client for Node.js.

## Installation

```bash
npm install node-getpocket
```

## Authentication

The Pocket API uses a variant on OAuth 2.0 to authenticate access. This means writing some
code to negotiate the OAuth handshaking process. If the next steps make no sense, or
this seems too much like hard work or if you just want to get on with writing code to
make your app ... work, then `node-getpocket` includes a thing called `authorise.js` to
make this process a little bit less convoluted. Running ...

```bash
node authorise --consumerkey 'YOUR-CONSUMER-KEY'
```

... from within wherever you've installed `node-getpocket` (typically in `node_modules/node-getpocket`)
will do the OAuth authorisation dance for you; just point your browser to `http://localhost:8080`. Running ...

```bash
node authorise --help
```

... will show you how to change the host name or IP address and the port number `authorise` listens on.

### Obtaining a Platform Consumer Key

You'll need to register your app with Pocket by filling in the _Create an Application_ form at http://getpocket.com/developer/apps/new.

Watch out. The permissions you specify when you register your application are carved in tablets of stone once you've registered. Or to put it another way, you can't change permissions for a registered application once it's been registered. It's a good idea at this point to work out what you want to do with the Pocket API and make sure you select the right set of permissions from the choices of _Add_, _Modify_ or _Retrieve_.

Once you've completed registration you'll have your _consumer key_, which you'll need to authenticate with the Pocket API.

Now you'll need to write some code. The example code here uses the `Express` framework to make handling the OAuth redirection and callbacks easy, but you're not constrained to using this framework.

The aim here is to pass the Pocket API your `consumer_key` and eventually get back and store an `access_token` which you'll need to use together with the `consumer_key` to access the Pocket API's methods in the future.

### Get a Request Token

You need to create an instance of the `GetPocket` class and pass the Pocket API's _Consumer Key_ to the `GetPocket.getRequestToken` method, passing a callback that will receive the request token or handle any errors.

```javascript
var GetPocket = require('node-getpocket');

var config = {
    consumer_key: 'YOUR-CONSUMER-KEY',
    redirect_uri: 'http://localhost:8080/redirect'
};

var pocket = new GetPocket(config);
var params = {
    redirect_uri: config.redirect_uri
};
pocket.getRequestToken(params, function(err, resp, body) {
    if (err) {
        console.log('Oops; getTokenRequest failed: ' + err);
    }
    else {
        // your request token is in body.code
        var json = JSON.parse(body);
        var request_token = json.code;
    }
});
```
### Redirect the User to Pocket for Permission

Assuming you've stored your _request token_ somewhere safe, you'll
now need to get Pocket's authorization URL and redirect your
authenticating user to that URL. If you're using the `Express`
framework, the `redirect` method is the one you need here.

```javascript
var config = {
    consumer_key: 'YOUR-CONSUMER-KEY',
    request_token: 'YOUR-REQUEST-TOKEN'
};
var url = pocket.getAuthorizeURL(config);
// work whatever redirect magic you need here
```

### Handle the Pocket API's Callback

Providing you've granted your application permissions to access
the Pocket API using your account's credentials, the API will
return to your application by opening the URL you specified as
the `redirect_uri` property of your configuration parameters.
How you enable this to run depends on how you're handling URLs
in your application. If you're using `Express` then queueing
a handler for `redirect` will work.

### Convert the Request Token to an Access Token

Within your redirect callback, you'll finally be able to get
your application's `access_token`, that you'll need to pass,
together with your `consumer_key` to all subsequent calls to
the Pocket API by calling `GetPocket.getAccessToken`.

```javascript
var params = {
    request_token: 'YOUR-REQUEST-TOKEN'
};
pocket.getAccessToken(params, function(err, resp, body) {
    if (err) {
        console.log('Oops; getTokenRequest failed: ' + err);
    }
    else {
        // your access token is in body.access_token
        var json = JSON.parse(body);
        var access_token = json.access_token;
    }
});
```

## Configuration

Before using the `GetPocket` class you'll need to have authenticated
with the Pocket API as described above. If you want to use
subsequent Pocket API calls in the same session as authenticating, then you can call `GetPocket.refreshConfig` passing a `config` object containing the `consumer_key` and `access_token`.

```javascript
var config = {
    consumer_key: 'YOUR-CONSUMER-KEY',
    access_token: 'YOUR-ACCESS-TOKEN'
};
pocket.refreshConfig(config);
```

This is the same `config` object that you'll create a new instance of the `GetPocket` class, passing in the `consumer_key` and `access_token` that you got back during authentication and have stored away for future use somewhere. You did store that `access_token` didn't you?

```javascript
var config = {
    consumer_key: 'YOUR-CONSUMER-KEY',
    access_token: 'YOUR-ACCESS-TOKEN'
};
var pocket = new GetPocket(config);
```

## Usage

### `add` - Add an Entry to a Pocket Queue

```javascript
var params = {
    url: 'url to add', // (required),
    title: 'title', // (optional),
    tags: 'tag,tag,...', // (optional)
    tweet_id: 'id' // (optional)
};
pocket.add(parms, function(err, resp) {
    // check err or handle the response
});
```

See the Pocket API documentation at http://getpocket.com/developer/docs/v3/add for the latest
parameters.

**Code Health Warning**: your `consumer_key` **must** have _add_ permissions.

### `send` - Modify an Existing Entry in a Pocket Queue

```javascript
var params = {
    actions: [
        // array of actions; too many options to list here
        // see the official Pocket API documentation
    ]
};
pocket.send(params, function(err, resp) {
    // check err or handle the response
});
```

See the Pocket API documentation at http://getpocket.com/developer/docs/v3/modify for the latest
parameters.

**Code Hint**: the Pocket API call to modify is called `send`.
Which makes sense. Sort of. `GetPocket` tries to be helpful by
providing `GetPocket.modify` which just calls `GetPocket.send`.

**Code Health Warning**: your `consumer_key` **must** have _modify_ permissions.

### `get` - Retrieve an Entry in a Pocket Queue

```javascript
var params = {
    // get/retrieve/search parameters
};
pocket.get(params, function(err, resp) {
    // check err or handle the response
});
```

See the Pocket API documentation at http://getpocket.com/developer/docs/v3/retrieve for the latest
parameters.

**Code Hint**: the Pocket API call to retrieve or search is called `get`.
Which makes sense. Sort of. `GetPocket` tries to be helpful by
providing `GetPocket.retrieve` which just calls `GetPocket.get`.

**Code Health Warning**: your `consumer_key` **must** have _retrieve_ permissions.

### `archive` - Move an Item to the User's Archive

`GetPocket.archive` is a helper function to call `GetPocket.send` with the actions neccessary to archive an item. This may or may not
be helpful to be honest.

```javascript
var params = {
    //     item_id: 'item to archive'
    // };
pocket.archive(params, function(err, resp) {
    // check err, resp
});
```

## Changelog

### 1.0.0

* 2014/12/2 - this is the first version of `node-getpocket`. Be gentle.
