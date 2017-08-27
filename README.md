# Muse

Provides support for JSON patching and image compression while ensuring a valid Json Web Token

## Prerequisites

Please ensure that following external dependencies are installed

1. GraphicMagicK - https://gist.github.com/abernardobr/f7b3190176b90f2ac4b2
1. Nodejs - https://nodejs.org/en/download/ (tested on 6.9.1)

### Installing

Install all the dependency

```
npm install --save
```

## Running the tests

'''
npm test
'''

## Internal Documentation
#### Lib
Lib contains the core functionality of the application

lib/image.lib.server.js handles all the Image functionality
```javascript
//creating Object from Class
let newImage = new Image(url);

//Loading image i.e downloading image to the public folder (uncompressed)
newImage.loadImage(callback);
//callback accepts error as a parameter
callback = function(error){...};

//convertingImage
newImage.convertingImage(callback)
//callback accepts error and info as parameter
callback = function(error, info){...}

//delete uncompressed image
newImage.end()
```

lib/user.lib.server.js contains all of the User functionality
```javascript
//creating Object from Class
let newUser = new User(username, password);

//get Token i.e gets the JWT token from username(getter)
let token = newUser.Token;

//@static function to verify token
//takes token and callback as arguments
newUser.verifyToken (token, callback)
//callback accepts error and decoded as parameter
callback = function(error, decoded){...}
//error => error could be invalid token , crypto library shutting down Node due to
//unavailable memory
//decoded => contains the decoded token
```
#### Controllers
Restify controllers to handle requests and send a valid response

1. /controllers/image.server.controller.js
   1. export.convert_image takes in url as a get parameter
1. /controllers/user.server.controller.js
   1. sign_in - takes username and password as post parameter , returns a valid JWT
   1. verify - verifies token , this is a static function , sends control to next controller using next()
1. /controllers/json_patch.server.controller.js
   1. patch_json - takes in json_object and json_patch as patch parameter

#### Routes
Restify routes to handle requests and send a valid response
1. /signin -> signs a user in and returns a valid token
   1. Example response
     1. {err:error describing why it is occurring}
     2. {token:a valid jswt token}
2. /patch/json -> patches JSON
   1. Example response
     1. {err:error describing error}
     2. {patched json}
3. /convert/image -> compresses image
   1. Example response
     1. {err:error describing a valid error}
     2. Redirects to compressed image

### index.js
Restify script to start the application.
The code is fairly documented.
To change port just replace port 8080 with any valid port number.
To read further about customizing the application - http://restify.com/.
## Authors

***Aniket Shukla** - *Initial work* - [aniketshukla](https://github.com/aniketshukla)
