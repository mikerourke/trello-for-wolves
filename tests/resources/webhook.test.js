/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('WEB | Webhook Resource', function() {
  let trello;
  let logger;

  before(function(done) {
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

  describe('WEB-G | Webhook GET requests', function() {

  });

  describe('WEB-U | Webhook PUT requests', function() {

  });

  describe('WEB-P | Webhook POST requests', function() {

  });

  describe('WEB-D | Webhook DELETE requests', function() {

  });
});
