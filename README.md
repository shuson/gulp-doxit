# gulp-doxit [![Build Status](https://travis-ci.org/shuson/gulp-doxit.svg)](https://travis-ci.org/shuson/gulp-doxit)
Generate document using dox and ejs template for gulp build

>this repo takes much from [doxmate](https://github.com/JacksonTian/doxmate) and [dox](https://github.com/tj/dox) 

## Installation
```
npm install --save-dev gulp-doxit
```

## User guide

>The gulpfile actually is an example of using this plugin.

```
var gulp = require('gulp'),
    doxit = require('./index.js');

gulp.task('default', function() {
    return gulp.src('./example/**/*.js')
        .pipe(doxit());
})
```

The ``package.json`` file has to be created against the correct format.

The output will be generated as ``api.html`` in the ``doc`` directory.

## Licence

MIT
