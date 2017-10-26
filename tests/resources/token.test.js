/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('TKN | Token Resource', function() {
  let trello;
  let logger;

  let webhookId = '';
  let tokenValue = '';

  before(function() {
    trello = new Trello(config);
    logger = new Logger();
    tokenValue = process.env.TRELLO_AUTH_TOKEN || '';
  });

  beforeEach(function () {
    logger.setTestName(this.currentTest.title);
  });

  after(function (done) {
    logger.writeResultsToFile('token')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = response => logger.processResponse(response);

  describe('TKN-P | Token POST requests', function () {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it.skip('TKN-P-01-T01 | creates an associated Webhook', function(done) {
      trello.tokens(tokenValue).webhooks().addWebhook({
        callbackURL: '',
        idModel: '',
      })
        .then(logResponse)
        .then((response) => {
          webhookId = response.data.id;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('TKN-G | Token GET requests', function () {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('TKN-G-01-T01 | gets a Token', function(done) {
      trello.tokens(tokenValue).getToken()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-01-T02 | gets a Token with all arguments', function(done) {
      trello.tokens(tokenValue).getToken({
        fields: 'all',
        webhooks: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-02-T01 | gets the value of the idMember field for the Token', function(done) {
      trello.tokens(tokenValue).getFieldValue('idMember')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-03-T01 | gets the associated Member', function(done) {
      trello.tokens(tokenValue).member().getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-03-T02 | gets the specified fields for the associated Member', function(done) {
      trello.tokens(tokenValue).member().getMember({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-04-T01 | gets the value of the fullName field for the associated Member', function(done) {
      trello.tokens(tokenValue).member().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-05-T01 | gets the associated Webhooks', function(done) {
      trello.tokens(tokenValue).webhooks().getWebhooks()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('TKN-G-06-T01 | gets the associated Webhook with the specified Id', function(done) {
      trello.tokens(tokenValue).webhooks(webhookId).getWebhook()
        .then(logResponse)
        .then((response) => {
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('TKN-U | Token PUT requests', function () {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it.skip('TKN-U-01-T01 | adds an associated Webhook', function(done) {
      trello.tokens(tokenValue).webhooks().addWebhook({
        callbackURL: '',
        idModel: '',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('TKN-D | Token DELETE requests', function () {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it.skip('TKN-D-02-T01 | deletes an associated Webhook', function(done) {
      trello.tokens(tokenValue).webhooks(webhookId).deleteWebhook()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('TKN-D-01-T01 | deletes a Token', function(done) {
      trello.tokens(tokenValue).deleteToken()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
