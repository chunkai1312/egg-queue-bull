'use strict';

exports.queue = {
  delegate: 'queue',
  baseDir: 'queue',
};

exports.bull = {
  default: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
    },
  },
};
