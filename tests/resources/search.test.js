/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('SRC | Search Resource', function() {
  let trello;
  let logger;

  before(function(done) {
    trello = new Trello(auth);
    logger = new Logger();
    setTimeout(() => { done(); }, testDelay);
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('search')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('SRC-G | Search GET requests', function() {
    it('SRC-G-01-T01 | performs a partial Search on my Boards', function(done) {
      trello.search().performSearch({
        query: 'BRD',
        idBoards: 'mine',
        partial: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('SRC-G-01-T02 | performs a partial Search on all Boards with limit of 10', function(done) {
      trello.search().performSearch({
        query: 'trello',
        modelTypes: 'boards',
        boardsLimit: 10,
        partial: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('SRC-G-02-T01 | performs a Search for Members with default limit of 8', function(done) {
      trello.search().searchMembers({
        query: 'mike',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('SRC-G-02-T02 | performs a Search for Members with limit of 20', function(done) {
      trello.search().searchMembers({
        query: 'mike',
        limit: 20,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
