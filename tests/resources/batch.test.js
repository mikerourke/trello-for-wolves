/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('BTC | Batch Resource', function() {
  let trello;
  let logger;

  before(function(done) {
    trello = new Trello(config);
    logger = new Logger();
    setTimeout(() => done(), testDelay);
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('batch')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = response => logger.processResponse(response);

  describe('BTC-G | Batch GET requests', function() {
    before(function() {
      if (!resources.board || !resources.card) {
        this.skip();
      }
    });

    it('BTC-G-01-T01 | performs a batch request when passed correct URLs', function (done) {
      trello.batch().makeRequests([
        `/boards/${resources.board.id}`,
        `/cards/${resources.card.id}`
      ])
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BTC-G-01-T02 | fails gracefully when passed an invalid URL', function (done) {
      trello.batch().makeRequests([
        `/boards${resources.board.id}`, // Note the missing slash.
        `/cards/${resources.card.id}`
      ])
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });
  });
});
