'use strict';

module.exports = app => {
  const queue = app.bull.get('q1');

  queue.process((job, done) => {
    job.progress(42);
    done();
  });

  return queue;
};
