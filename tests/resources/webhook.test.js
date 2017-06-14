/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('WEB | Webhook Resource', () => {
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
    logger.writeResultsToFile('webhook')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('WEB-G | Webhook GET requests', () => {

  });

  describe('WEB-U | Webhook PUT requests', () => {

  });

  describe('WEB-P | Webhook POST requests', () => {

  });

  describe('WEB-D | Webhook DELETE requests', () => {

  });
});
