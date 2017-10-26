/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('LST | List Resource', function() {
  let trello;
  let logger;

  let listData = {};
  let listId = '';

  before(() => {
    trello = new Trello(config);
    logger = new Logger();
    if (resources.list) {
      listId = resources.list.id;
    } else {
      this.skip();
    }
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('list')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = response => logger.processResponse(response);

  describe('LST-G | List GET requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('LST-G-01-T01 | gets a List', (done) => {
      trello.lists(listId).getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-01-T02 | gets a List with some arguments', function(done) {
      trello.lists(listId).getList({
        cards: 'all',
        board: true,
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-01-T03 | gets a List with all arguments', function(done) {
      trello.lists(listId).getList({
        cards: 'all',
        cardFields: 'all',
        board: true,
        boardFields: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          listData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-G-02-T01 | gets the value of the name field for the List', function(done) {
      trello.lists(listId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-03-T01 | gets the associated Actions', function(done) {
      trello.lists(listId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-03-T02 | gets the 10 Actions with filter applied', function(done) {
      trello.lists(listId).actions().getActions({
        filter: 'all',
        limit: 10,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-04-T01 | gets the associated Board', function(done) {
      trello.lists(listId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-04-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.lists(listId).board().getBoard({
        fields: ['desc', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-05-T01 | gets the value of the name field of the associated Board', function(done) {
      trello.lists(listId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-06-T01 | gets the associated Cards', function(done) {
      trello.lists(listId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-06-T02 | gets only the specified fields for the associated Cards', function(done) {
      trello.lists(listId).cards().getCards({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-G-07-T01 | gets only the closed Cards with filter applied', function(done) {
      trello.lists(listId).cards().getCards({
        filter: 'closed',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('LST-U | List PUT requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('LST-U-01-T01 | updates a List', function(done) {
      trello.lists(listId).updateList({
        name: 'LST-U-01-T01',
        closed: false,
        pos: 'bottom',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-U-02-T01 | updates the closed status of a List', function(done) {
      trello.lists(listId).updateClosedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-U-03-T01 | moves the List to a different Board', function(done) {
      if (!resources.board) {
        done(new Error('Board not found for List.'));
      }
      const boardId = resources.board.id;
      trello.lists(listId).moveToBoard(boardId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-U-04-T01 | updates the name of a List', function(done) {
      trello.lists(listId).updateName('LST-U-04-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-U-05-T01 | updates the position of a List', function(done) {
      trello.lists(listId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LST-U-06-T01 | updates the subscribed status of a List', function(done) {
      trello.lists(listId).updateSubscribed(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
