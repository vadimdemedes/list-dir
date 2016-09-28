'use strict';

/**
 * Dependencies
 */

var separator = require('path').sep;
var Promise = require('bluebird');
var join = require('path').join;
var fs = require('mz/fs');


/**
 * Expose list-dir
 */

module.exports = exports = listDir;

exports.sync = listDirSync;


/**
 * List directory recursively
 *
 * @param  {String} path
 * @return {Promise}
 */

function listDir (path, originalPath) {
  if (!originalPath) {
    originalPath = path + separator;
  }

  // promises for sub listDir calls
  var dirs = [];

  return Promise.resolve(fs.readdir(path))
    // include only files
    .filter(function (item) {
      var absolutePath = join(path, item);

      return fs.stat(absolutePath).then(function (stat) {
        var isDirectory = stat.isDirectory();

        // if directory, read it
        if (isDirectory) {
          var list = listDir(absolutePath, originalPath);

          dirs.push(list);
        }

        return !isDirectory;
      });
    })
    // return relative paths
    .map(function (file) {
      var absolutePath = join(path, file);
      var relativePath = absolutePath.replace(originalPath, '');

      return relativePath;
    })
    // add files from sub-directories
    .then(function (files) {
      // wait for all listDir() to complete
      // and merge their results
      return Promise
        .all(dirs)
        .then(function () {
          dirs.forEach(function (promise) {
            var subFiles = promise.value();

            files = files.concat(subFiles);
          });

          return files;
        });
    });
}


/**
 * List directory recursively (sync)
 *
 * @param  {String} path
 * @return {Array}
 */

function listDirSync (path, originalPath) {
  if (!originalPath) {
    originalPath = path + separator;
  }

  var list = [];

  var files = fs.readdirSync(path);

  files.forEach(function (file) {
    var absolutePath = join(path, file);

    var isDirectory = fs.statSync(absolutePath).isDirectory();

    // if directory, read it
    // and merge results
    if (isDirectory) {
      var subList = listDirSync(absolutePath, originalPath);

      list = list.concat(subList);

      return;
    }

    // return relative paths
    var relativePath = absolutePath.replace(originalPath, '');

    list.push(relativePath);
  });

  return list;
}
