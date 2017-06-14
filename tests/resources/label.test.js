/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('LBL | Label Resource', () => {
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
    logger.writeResultsToFile('label')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('LBL-G | Label GET requests', () => {

  });

  describe('LBL-U | Label PUT requests', () => {

  });

  describe('LBL-P | Label POST requests', () => {

  });

  describe('LBL-D | Label DELETE requests', () => {

  });
});
