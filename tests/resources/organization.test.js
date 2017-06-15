/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('ORG | Organization Resource', () => {
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
    logger.writeResultsToFile('organization')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('ORG-G | Organization GET requests', () => {

  });

  describe('ORG-U | Organization PUT requests', () => {

  });

  describe('ORG-P | Organization POST requests', () => {

  });

  describe('ORG-D | Organization DELETE requests', () => {

  });
});
