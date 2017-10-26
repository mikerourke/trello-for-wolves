/* Internal dependencies */
import Trello from '../../src/index';

describe('ARQ | API Request', function() {
  const BOARD_NAME = 'ARQ-SETUP-BOARD';
  const LIST_NAME = 'ARQ-SETUP-LIST';
  let boardId = '';
  let listId = '';
  let trello;

  before(function(done) {
    trello = new Trello(config);
    setTimeout(() => done(), 5000);
  });

  describe('ARQ-SETUP | API Request Setup', function() {
    it('ARQ-SETUP-T01 | creates a Board for testing rate limits', async () => {
      try {
        const { data: newBoard } = await trello.boards().addBoard({
          name: BOARD_NAME,
          defaultLabels: false,
          defaultLists: false,
        })
        boardId = newBoard.id;
        assert.isDefined(newBoard);
      } catch (e) {
        throw new Error(e);
      }
    });

    it('ARQ-SETUP-T02 | creates a List on a Board for testing rate limits', async () => {
      try {
        const { data: newList } = await trello.boards(boardId).lists().addList({
          name: LIST_NAME,
        });
        listId = newList.id;
        assert.isDefined(newList);
      } catch (e) {
        throw new Error(e);
      }
    });
  });

  describe('ARQ-EXECUTE | API Request Test Execution', function() {
    before(function(done) {
      if (listId === '') done(new Error('Could not find list.'));
      setTimeout(() => done(), 1000);
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
    before(function(done) {
      setTimeout(() => done(), 1000);
    });

    it('ARQ-TEARDOWN-T01 | closes the board', function(done) {
      trello.boards(boardId).updateClosedStatus(true)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
