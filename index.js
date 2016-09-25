'use strict';

var nodeSass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    map = require('map-stream'),
    through = require('through2');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss(options) {
    return through.obj(function(file, enc, cb) {

        var startStyle,
            endStyle,
            startInd,
            endInd,
            scss = '',
            contents = '',
            toReplace = '';

        var debug = false;
        if(options) {
            var debug = options.debug;
        }

        startStyle = "<scss>";
        endStyle = "</scss>";

        var regEx = new RegExp(startStyle, "g");
        contents = file.contents.toString();

        if (!regEx.test(contents)) {
            console.log("No style tag detected");
            return cb();
        }

        startInd = contents.indexOf(startStyle);
        endInd = contents.indexOf(endStyle);

        if(debug) {
            console.log("start index: " + startInd);
            console.log("end index: " + endInd);
        }

        toReplace = contents.substring(startInd, endInd+7);

        scss = contents.substring(startInd+6, endInd).trim();

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

            if (err || !compiledScss) {
                if(debug) {
                    console.log(err);
                }
                console.log("Error compiling scss");
                console.log("Compiled scss: ");
                console.log(compiledScss.css.toString());
                return cb();
            }
                
            var injectSassContent = "<style>" + compiledScss.css.toString() + "</style>";

            file.contents = new Buffer(contents.replace(toReplace, injectSassContent), 'utf8');
            return cb(null,file);
        });
    });
}

module.exports = gulpPolymerScss;