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



## Authors

***Aniket Shukla** - *Initial work* - [aniketshukla](https://github.com/aniketshukla)
