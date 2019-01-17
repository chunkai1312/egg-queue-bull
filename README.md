# egg-queue-bull

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/egg-queue-bull.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-queue-bull
[travis-image]: https://img.shields.io/travis/chunkai1312/egg-queue-bull.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunkai1312/egg-queue-bull
[codecov-image]: https://img.shields.io/codecov/c/github/chunkai1312/egg-queue-bull.svg?style=flat-square
[codecov-url]: https://codecov.io/github/chunkai1312/egg-queue-bull?branch=master

Provide job queue for egg, powered by [Bull](https://github.com/optimalbits/bull)

## Install

```bash
$ npm i egg-queue-bull --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.queue = {
  enable: true,
  package: 'egg-queue-bull',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.queue = {
  delegate: 'queue', // load all queues to `app[delegate]` and `ctx[delegate]`, default to `queue`
  baseDir: 'queue', // load all files in `app/${baseDir}` as queues, default to `queue`
};

exports.bull = {
  clients: {
    q1: { name: 'q1' },
    q2: { name: 'q2' },
  },
  default: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
    },
  },
};
```

Please see [Bull](https://github.com/OptimalBits/bull) for more detail.

## Example

```js
// {app_root}/app/queue/video.js
module.exports = app => {
  const queue = app.bull.get('videoQueue');

  queue.process((job, done) => {
    job.progress(42);
    done();
  });

  return queue;
};

// {app_root}/app/controller/video.js
exports.index = function* (ctx) {
  yield ctx.queue.video.add({ video: 'http://example.com/video1.mov' });
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/chunkai1312/egg-queue-bull/issues).

## License

[MIT](LICENSE)
