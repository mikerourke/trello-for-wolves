/* Internal dependencies */
import Trello from '../../src/index';
import { auth, resourceIds, Logger } from '../helpers';

describe('CAR | Card Resource', function() {
  const { actionId, cardId, commentId } = resourceIds;
  let trello;
  let logger;

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('card')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CAR-G | Card GET Requests', () => {
    it('CAR-G-01-T01 | gets a card', (done) => {
      trello.cards(cardId).getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-03-T01 | gets the actions for a card', (done) => {
      trello.cards(cardId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
