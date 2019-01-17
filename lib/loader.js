'use strict';

const path = require('path');
const assert = require('assert');

module.exports = app => {
  app.addSingleton('bull', createQueue);

  app.beforeStart(() => {
    loadQueueToApp(app);
  });
};

function createQueue(config, app) {
  const { name, redis } = config;
  assert(name, '[egg-queue-bull] name is required on config');
  assert(
    redis && redis.host && redis.port,
    '[egg-queue-bull] host and port of redis are required on config'
  );

  app.Queue = config.Queue || require('bull');
  const queue = new app.Queue(name, config);

  app.beforeStart(() => {
    app.coreLogger.info(`[egg-queue-bull] ${name} status OK, queue ready`);
  });

  return queue;
}

function loadQueueToApp(app) {
  const { delegate, baseDir } = app.config.queue;
  const dir = path.join(app.baseDir, 'app', baseDir);
  app.loader.loadToApp(dir, delegate, {
    inject: app,
    caseStyle: 'lower',
    filter(queue) {
      return typeof queue === 'object' && queue instanceof app.Queue;
    },
  });
}
