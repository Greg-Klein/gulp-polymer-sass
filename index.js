'use strict';

var nodeSass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    map = require('map-stream'),
    through = require('through2');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss() {
    return through.obj(function(file, enc, cb) {

        var startStyle,
            endStyle,
            startInd,
            endInd,
            scss = '',
            contents = '',
            toReplace = '';

        startStyle = '<style lang="scss">';
        endStyle = '</style>';

        var regEx = new RegExp(startStyle, "g");
        contents = file.contents.toString();

        if (!regEx.test(contents)) {
            console.log("No scss style tag detected");
            return cb();
        }

        startInd = contents.indexOf(startStyle);
        endInd = contents.substring(startInd, contents.length).indexOf(endStyle);

        toReplace = contents.substring(startInd, endInd+7);

        scss = contents.substring(startInd+6, endInd).trim();

        if (!scss) {
            console.log("No scss detected");
          return cb();
        }

        nodeSass.render({
            data: scss.toString(),
            outputStyle: 'compressed'
        }, function (err, compiledScss) {

            if (err || !compiledScss) {
                console.log("Error compiling scss");
                return cb();
            }
                
            var injectSassContent = "<style>" + compiledScss.css.toString() + "</style>";

            file.contents = new Buffer(contents.replace(toReplace, injectSassContent), 'utf8');
            return cb(null,file);
        });
    });
}

module.exports = gulpPolymerScss;