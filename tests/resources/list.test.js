/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('LST | List Resource', () => {
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
    logger.writeResultsToFile('list')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('LST-G | List GET requests', () => {

  });

  describe('LST-U | List PUT requests', () => {

  });

  describe('LST-P | List POST requests', () => {

  });

  describe('LST-D | List DELETE requests', () => {

  });
});
