# list-dir [![Circle CI](https://circleci.com/gh/vdemedes/list-dir.svg?style=svg)](https://circleci.com/gh/vdemedes/list-dir)

Simple function to list directory contents recursively (returns relative paths of files);


### Installation

```
$ npm install list-dir --save
```


### Usage

```js
const list = require('list-dir');

// sync
let files = list.sync('/path/to/dir');


// promises
list('/path/to/dir').then(function (files) {
  // done
});


// generators
let files = yield list('/path/to/dir');
```


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/list-dir.svg?style=svg)](https://circleci.com/gh/vdemedes/list-dir)

```
$ make test
```

### License

MIT © [Vadym Demedes](http://vadimdemedes.com)
