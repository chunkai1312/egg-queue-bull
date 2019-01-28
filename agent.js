'use strict';

module.exports = agent => {
  if (agent.config.queue.agent) require('./lib/loader')(agent);
};
