/**
 * Created by Shuson on 25/3/2015.
 */
var path    = require('path');
var dox     = require('dox');

var types = {
    "param": "parameter",
    "examples": "examples",
    "return": "return",
    "method": "method",
    "api": "scope",
    "property": "property",
    "function": "function",
    "declaration": "declaration",
    "exception": "exception",
    "callmethod": "type"
};

module.exports = function (file, opts){
    var api = {};
    var options = opts || {};
    if(path.extname(file.path) === '.js'){
        var parsed = dox.parseComments(file.contents.toString(), opts);

        // because Windows...
        var basename = file.relative.replace(/\\/g, '/');

        api[basename] = {types: types, comments: parsed, basename: basename, options: options};
    }

    return api;
};

