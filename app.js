'use strict';

module.exports = app => {
  if (app.config.queue.app) require('./lib/loader')(app);
};
