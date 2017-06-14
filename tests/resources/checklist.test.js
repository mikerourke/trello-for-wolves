/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('CHK | Checklist Resource', () => {
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
    logger.writeResultsToFile('checklist')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CHK-G | Checklist GET requests', () => {

  });

  describe('CHK-U | Checklist PUT requests', () => {

  });

  describe('CHK-P | Checklist POST requests', () => {

  });

  describe('CHK-D | Checklist DELETE requests', () => {

  });
});
