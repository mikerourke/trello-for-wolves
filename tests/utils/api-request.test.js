/* Internal dependencies */
import Trello from '../../src/index';

describe('ARQ | API Request', function() {
  let trello;
  let boardId = '';
  let listId = '';

  before(function(done) {
    trello = new Trello(config);
    setTimeout(() => done(), 8000);
  });

  describe('ARQ-SETUP | API Request Setup', function() {
    it('ARQ-SETUP-T01 | creates a Board for testing rate limits', function(done) {
      const boardName = 'ARQ-SETUP-T01';
      trello.boards().addBoard({
        name: boardName,
        defaultLabels: false,
        defaultLists: false,
      })
        .then((response) => {
          if (response.data) {
            boardId = response.data.id;
          }
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('ARQ-SETUP-T02 | creates a List on a Board for testing rate limits', function(done) {
      trello.boards(boardId).lists().addList({
        name: 'ARQ-SETUP-T01',
      })
        .then((response) => {
          if (response.data) {
            listId = response.data.id;
          }
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('ARQ-EXECUTE | API Request Test Execution', function() {
    before(function() {
      if (!listId) throw new Error('List Id not found.  API request testing cannot proceed.')
    });

    it('ARQ-EXECUTE-T01 | creates 110 Cards in a List to validate rate limiter', function(done) {
      this.timeout(0);
      let queuedRequests = [];
      for (let i = 0; i < 110; i++) {
        queuedRequests.push(trello.lists(listId).cards().addCard({ name: `(1) CARD-${i}` }));
      }
      Promise.all(queuedRequests)
        .then((responses) => {
          expect(responses.length).to.equal(110);
          done();
        })
        .catch(error => done(error));
    });

    it('ARQ-EXECUTE-T02 | deletes 110 Cards in a List to validate rate limiter', function(done) {
      this.timeout(0);
      trello.lists(listId).cards().getCards({ fields: 'idList' })
        .then((response) => {
          const cardIds = response.data.map(item => item.id);
          const deletionRequests = cardIds.map(cardId => trello.cards(cardId).deleteCard());
          Promise.all(deletionRequests)
            .then((responses) => {
              expect(responses.length).to.equal(110);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });

  describe('ARQ-TEARDOWN | API Request Teardown', function() {
    it('ARQ-TEARDOWN-T01 | closes the board', function(done) {
      trello.boards(boardId).updateClosedStatus(true)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
