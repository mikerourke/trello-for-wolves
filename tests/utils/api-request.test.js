/* Internal dependencies */
import Trello from '../../src/index';

describe('ARQ | API Request', function() {
  let trello;
  let boardId = '';
  let listId = '';

  before(function() {
    trello = new Trello(config);
    if (resources.board) {
      boardId = resources.board.id;
    } else {
      this.skip();
    }
  });

  describe('ARQ-SETUP | API Request Setup', function() {
    it('ARQ-SETUP-T01 | creates a List on a Board for testing rate limits', function(done) {
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
      if (!listId) {
        throw new Error('List Id not found.  API request testing cannot proceed.')
      }
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
  })
});
