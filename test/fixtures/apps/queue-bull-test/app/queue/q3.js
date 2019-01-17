'use strict';

module.exports = app => {
  const queue = new app.Queue('q3', { redis: { port: 6379, host: '127.0.0.1' } });

  queue.process(job => {
    job.progress(42);
    return Promise.resolve();
  });

  return queue;
};
