'use strict';

var nodeSass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    through = require('through2'),
    cheerio = require('cheerio');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss() {
    return through.obj(function(file, enc, cb) {

        var $ = cheerio.load(file.contents.toString());
        var el = $('style[lang="scss"]');

        if(el) {
            var scss = el.text();

            if (!scss) {
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

                el.text(compiledScss.css.toString());
                el.removeAttr('lang');

                file.contents = new Buffer($.html(), 'utf8');
                return cb(null,file);
            });
        }
    });
}

module.exports = gulpPolymerScss;