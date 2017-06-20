/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';
const resources = require('./resources.json');

describe('NTF | Notification Resource', function() {
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
    logger.writeResultsToFile('notification')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('NTF-G | Notification GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1000);
    });
  });

  describe('NTF-U | Notification PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1000);
    });
  });
});
