/* Internal dependencies */
import Trello from '../../src/index';
import { Logger } from '../helpers';

describe('BTC | Batch Resource', function() {
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
    logger.writeResultsToFile('batch')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  it('BTC-G-01-T01 | performs a batch request when passed correct URLs', (done) => {
    trello.batch().makeRequests(['/boards/bJDPVV1A', '/cards/GATVPdJ6'])
      .then(logResponse)
      .should.eventually.be.fulfilled
      .notify(done);
  });

  it('BTC-G-01-T02 | fails gracefully when passed an invalid URL', (done) => {
    trello.batch().makeRequests(['/boardsbJDPVV1A', 'cards/GATVPdJ6'])
      .then(logResponse)
      .should.eventually.be.rejected
      .notify(done);
  });
});
