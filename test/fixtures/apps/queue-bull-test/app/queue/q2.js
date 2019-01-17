'use strict';

module.exports = app => {
  const queue = app.bull.get('q2');

  queue.process(job => {
    job.progress(42);
    return Promise.resolve();
  });

  return queue;
};
