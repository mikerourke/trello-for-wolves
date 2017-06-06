/* Internal dependencies */
import Trello from '../../src/index';
import { auth } from '../helpers';

describe('Batch Resource', () => {
  let trello;

  before((done) => {
    trello = new Trello(auth);
    setTimeout(() => { done(); }, 3000);
  });

  it('performs a batch request when passed correct URLs', (done) => {
    trello.batch().makeRequests(['/boards/bJDPVV1A', '/cards/GATVPdJ6'])
      .should.eventually.be.fulfilled
      .notify(done);
  });

  it('fails gracefully when passed an invalid URL', (done) => {
    trello.batch().makeRequests(['/boardsbJDPVV1A', 'cards/GATVPdJ6'])
      .should.eventually.be.rejected
      .notify(done);
  });
});
