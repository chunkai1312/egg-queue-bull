'use strict';

exports.queue = {
  delegate: 'queue',
  baseDir: 'queue',
  app: true,
  agent: false,
};

exports.bull = {
  default: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
    },
  },
};
