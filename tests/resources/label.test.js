/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('LBL | Label Resource', function() {
  let trello;
  let logger;

  let labelData = {};
  let labelId = '';

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (resources.labels) {
      labelId = resources.labels[0].id;
    } else {
      this.skip();
    }
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

  describe('LBL-G | Label GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1500);
    });

    it('LBL-G-01-T01 | gets a Label', (done) => {
      trello.labels(labelId).getLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-G-01-T02 | gets a Label with all arguments', function(done) {
      trello.labels(labelId).getLabel({
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          labelData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('LBL-G-03-T01 | gets the associated Board', function(done) {
      trello.labels(labelId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-G-03-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.labels(labelId).board().getBoard({
        fields: ['desc', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-G-04-T01 | gets the value of the name field of the associated Board', function(done) {
      trello.labels(labelId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('LBL-U | Label PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1500);
    });

    it('LBL-U-01-T01 | updates a Label', function(done) {
      trello.labels(labelId).updateLabel({
        name: 'LBL-U-01-T01',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-U-02-T01 | updates the color of a Label', function(done) {
      trello.labels(labelId).updateColor('blue')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-U-03-T01 | updates the name of a Label', function(done) {
      trello.labels(labelId).updateName('LBL-U-03-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
