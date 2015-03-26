'use strict';
var fs     = require('fs');
var path   = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var doxit  = require('./');

it("should return the api object", function(cb){

	var stream = doxit({});
	
	stream.on('finish', function () {
		
		var docPath = path.join(__dirname, '/doc/api.html');
		assert(fs.existsSync(docPath));
		cb();
	});

	stream.write(new gutil.File({
		path: __dirname + '/example/utils.js',
		contents: new Buffer(1024)
	}));

	stream.end();
});