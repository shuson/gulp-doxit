/**
 * Created by SamWang on 25/3/2015.
 */
var path    = require('path');
var fs      = require('fs');
var dox     = require('dox');
var ejs     = require('ejs');

module.exports = function (file, opts){
    var template =  fs.readFileSync(path.join(__dirname, '../templates/' + '/api.html'), 'utf8');
    var result = {};
    if(path.extname(file.path) === '.js'){
        var api = {};
        var parsed = dox.parseComments(file.contents.toString(), opts);
        api[file.relative] = parsed[0];
        console.log(api);
        result = new Buffer(ejs.render(template, {apis: api}));
    }
    return result;
};

