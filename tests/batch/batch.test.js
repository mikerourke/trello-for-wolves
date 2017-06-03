/* Internal dependencies */
import Trello from '../../src/index';
import { auth } from '../helpers';

describe.only('Action Resource', () => {
  let trello;

  before(() => {
    trello = new Trello(auth);
  });

  it('performs a batch request when passed correct URLs', (done) => {
    trello.batch().makeRequests(['/boards/bJDPVV1A', '/cards/GATVPdJ6'])
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 2;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch(error => done(error));
  });

  it('fails gracefully when passed an invalid URL', (done) => {
    trello.batch().makeRequests(['/boardsbJDPVV1A', 'cards/GATVPdJ6'])
      .should.eventually.be.rejected
      .notify(done);
  });
});
