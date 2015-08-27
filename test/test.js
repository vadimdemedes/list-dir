'use strict';

/**
 * Dependencies
 */

var listDir = require('../');
var expect = require('chai').expect;
var join = require('path').join;


/**
 * Tests
 */

describe ('list-dir', function () {
  var path = join(__dirname, 'fixtures');
  var expectedList = [
    'a/a.js',
    'b/b.js',
    'b/c/c.js'
  ];

  it ('sync', function () {
    var files = listDir.sync(path);

    expect(files).deep.equal(expectedList);
  });

  it ('promises', function (done) {
    listDir(path)
      .then(function (files) {
        expect(files).deep.equal(expectedList);

        done();
      })
      .catch(done);
  });

});
