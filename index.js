/**
 * Created by SamWang on 24/3/2015.
 */
'use strict';
var gutil    = require('gulp-util');
var through  = require('through2');
var doxit    = require("./lib/doxit");

module.exports = function (opts) {

    opts = opts || {};
    opts.debug = typeof opts.debug === 'boolean' ? opts.debug : true;

    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError('gulp-doxit', 'Streaming not supported'));
            return cb();
        }

        try{
            file.contents = doxit(file, opts);
            file.path = gutil.replaceExtension(file.path, ".html");
        }catch(err){
            this.emit('error', new gutil.PluginError('gulp-doxit', err));
        }

        this.push(file);

        return cb();
    });
};