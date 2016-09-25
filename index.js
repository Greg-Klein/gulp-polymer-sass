'use strict';

var nodeSass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    map = require('map-stream'),
    through = require('through2');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss(options) {
    return through.obj(function(file, enc, cb) {

        var debug = options.debug || false;

        var startStyle = '<style lang="scss">';
        var endStyle = "</style>";

        if(debug) {
            console.log("start index: " + startInd);
            console.log("end index: " + endInd);
        }

        var regEx = new RegExp(startStyle, "g");
        var contents = file.contents.toString();

        if (!regEx.test(contents)) {
            console.log("No style tag detected");
            return cb();
        }

        var startInd = contents.indexOf(startStyle);
        var endInd = contents.indexOf(endStyle);
        var toReplace = contents.substring(startInd, endInd+8);

        var scss = contents.substring(startInd+19, endInd);

        if(debug) {
            console.log("scss: " + scss);
        }

        if (!scss) {
            console.log("No scss detected");
          return cb();
        }

        nodeSass.render({
            data: scss.toString(),
            outputStyle: 'compressed'
        }, function (err, compiledScss) {

            //If error or there is no Sass, return null.
            if (err || !compiledScss)
                if(debug) {
                    console.log(err);
                }
                console.log("Error compiling scss");
                return cb();
            var injectSassContent = "<style>" + compiledScss.css.toString() + "</style>";

            file.contents = new Buffer(contents.replace(toReplace, injectSassContent), 'utf8');
            return cb(null,file);
        });
    });
}

module.exports = gulpPolymerScss;