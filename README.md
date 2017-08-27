# Muse

Provides support for JSON patching and image compression while ensuring a valid Json Web Token

## Prerequisites

Please ensure that following external dependencies are installed

1. GraphicMagicK -http://www.graphicsmagick.org/download.html
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
let token = newuser.Token;

//@static function to verify token
//takes token and callback as arguments
newUser.verifyToken (token, callback)
//callback accepts error and decoded as parameter
callback = function(error, decoded){...}
//error => error could be invalid token , crypto library shutting down Node due to
//unavailable memory
//decoded => contains the decoded token
```


## Authors

***Aniket Shukla** - *Initial work* - [aniketshukla](https://github.com/aniketshukla)
