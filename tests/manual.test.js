import fs from 'fs';
import Trello from '../src/index';
import performApiRequest from '../src/utils/apiRequest';

describe('Manual Tests', function() {
  let trello;

  before(function() {
    trello = new Trello(config);
  });

  it.skip('posts a text file attachment to a Card using streams', function(done) {
    const textFilePath = `${assetsDir}/file.txt`;
    const fileStream = fs.createReadStream(textFilePath);
    trello
      .cards('[CARD_ID]')
      .attachments()
      .uploadAttachment({
        file: fileStream,
        name: 'Hooray.txt',
        mimeType: 'text/plain',
      })
      .then(response => {
        assert.isDefined(response.data);
        done();
      })
      .catch(error => done(error));
  });

  it('ARQ-EXECUTE-T03 | fails gracefully when an error occurs', function(done) {
    performApiRequest('yep', '1', 3, 300)
      .then(response => done())
      .catch(error => {
        // console.log(error);
        expect(error.name).to.equal('ApiCallResponseError');
        done();
      });
  });
});
