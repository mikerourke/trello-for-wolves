/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('SRC | Search Resource', function() {
  let trello;
  let logger;

  before((done) => {
    trello = new Trello(auth);
    logger = new Logger();
    setTimeout(() => { done(); }, 3000);
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
});
