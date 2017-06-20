/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('MBR | Member Resource', () => {
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
    logger.writeResultsToFile('member')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('MBR-G | Member GET requests', () => {

  });

  describe('MBR-U | Member PUT requests', () => {

  });

  describe('MBR-P | Member POST requests', () => {

  });

  describe('MBR-D | Member DELETE requests', () => {

  });
});
