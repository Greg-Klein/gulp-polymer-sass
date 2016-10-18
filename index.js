'use strict';

var nodeSass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    map = require('map-stream'),
    htmlparser = require('htmlparser2'),
    through = require('through2');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss() {
    return through.obj(function(file, enc, cb) {

        var scss;
        var opened = false;
        var contents = file.contents.toString();

        var startStyle = '<style lang="scss">';
        var endStyle = '</style>';

        var regEx = new RegExp(startStyle, 'g');

        if (!regEx.test(contents)) {
            return cb(null,file);
        }

        var startInd = contents.indexOf(startStyle);
        var aux = contents.substring(startInd);
        var endInd = aux.indexOf(endStyle) + startInd;

        var toReplace = contents.substring(startInd, endInd+8);

        var scss = contents.substring(startInd+19, endInd).trim();

        if (!scss) {
            console.log('No scss detected');
            return cb(null,file);
        }

        nodeSass.render({
            data: scss.toString(),
            outputStyle: 'compressed'
        }, function (err, compiledScss) {

            if (err || !compiledScss) {
                console.log('Error compiling scss: ' + err);
                return cb();
            }
                
            var injectSassContent = '<style>\n' + compiledScss.css.toString() + '\n</style>';

            file.contents = new Buffer(contents.replace(toReplace, injectSassContent), 'utf8');
            return cb(null,file);
        });
    });
}

module.exports = gulpPolymerScss;