'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/queue-bull.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/queue-bull-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should create bull instances', () => {
    assert(app.bull.get('q1'));
    assert(app.bull.get('q2'));
  });

  it('should has app queue property', () => {
    assert(app.queue);
    assert(app.queue.q1 instanceof app.Queue);
    assert(app.queue.q2 instanceof app.Queue);
    assert(app.queue.q3 instanceof app.Queue);
  });

  it('should has app ctx property', () => {
    const ctx = app.mockContext();
    assert(ctx.queue);
    assert(ctx.queue.q1 instanceof app.Queue);
    assert(ctx.queue.q2 instanceof app.Queue);
    assert(ctx.queue.q3 instanceof app.Queue);
  });

  it('should add job to q1', () => {
    return app.queue.q1.add({ foo: 'bar' }).then(job => {
      assert(job.id);
      assert(job.data.foo === 'bar');
      assert(job.queue.name === 'q1');
    });
  });

  it('should add job to q2', () => {
    return app.queue.q2.add({ foo: 'bar' }).then(job => {
      assert(job.id);
      assert(job.data.foo === 'bar');
      assert(job.queue.name === 'q2');
    });
  });

  it('should add job to q3', () => {
    return app.queue.q3.add({ foo: 'bar' }).then(job => {
      assert(job.id);
      assert(job.data.foo === 'bar');
      assert(job.queue.name === 'q3');
    });
  });
});
