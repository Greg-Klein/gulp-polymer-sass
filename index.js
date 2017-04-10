'use strict';

var nodeSass = require('node-sass'),
  path = require('path'),
  fs = require('fs'),
  through = require('through2'),
  cheerio = require('cheerio');

var PLUGIN_NAME = 'gulp-polymer-sass';

var gulpPolymerScss = function gulpPolymerScss(config) {
  config = config || {};
  return through.obj(function (file, enc, cb) {

    var $ = cheerio.load(file.contents.toString());
    var el = $('style[lang="scss"]');

    if(el) {
      var scss = el.text();

      if (!scss) {
        return cb(null,file);
      }

      config.outputStyle = config.outputStyle || 'nested'; // nested, expanded, compact, compressed

      config.data = scss.toString();

      nodeSass.render(config, function (err, compiledScss) {

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
};

module.exports = gulpPolymerScss;
