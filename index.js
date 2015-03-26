/**
 * Created by Shuson on 24/3/2015.
 */
'use strict';
var gutil   = require('gulp-util');
var through = require('through2');
var doxit   = require("./lib/doxit");
var ejs     = require('ejs');
var fs      = require('fs');
var path    = require('path');
var ncp     = require('ncp');
var chalk   = require('chalk');

module.exports = function (opts) {

    opts = opts || {};
    opts.debug = typeof opts.debug === 'boolean' ? opts.debug : false;

    var globObj = require(path.resolve('package.json'));
    var apis = {};
    globObj.apis = {};

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-doxit', 'Streaming not supported'));
            return;
        }

        try{
            var api = doxit(file,opts), key = Object.keys(api)[0];
            apis[key] = api[key];
        }catch(err){
            this.emit('error', new gutil.PluginError('gulp-doxit', err));
        }
        cb(null, file);
    }, function(cb){

        var section = fs.readFileSync(path.join(__dirname, '/templates/' + '/section.html'), 'utf8');
        Object.keys(apis).forEach(function (key) {
            globObj.apis[key] = {html: ejs.render(section, apis[key]), comments: apis[key].comments};
        });


        if (Object.keys(globObj.apis).length) {
            // get api template
            var api = fs.readFileSync(path.join(__dirname, '/templates/' + '/api.html'), 'utf8');

            //check existence of 'doc/' directory
            var docPath = path.join(__dirname, '/doc/');
            if(!fs.existsSync(docPath)){
                fs.mkdirSync(docPath);
            }

            //copy the assets from templates to doc directory
            ncp(path.join(__dirname, '/templates/assets'), path.join(docPath, 'assets'), function () {});

            //generate and render the template
            fs.writeFileSync(path.join(docPath, 'api.html'), ejs.render(api, globObj), 'utf8');

            //finish flag
            console.log(chalk.green('API document is generated successfully.\nPlease open doc/api.html to view the result!'));
        }

        console.log(chalk.red('API document is not generated, please make sure the comment format follows the dox standard!'));

        cb();
    });
};