import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe.skip('WEB | Webhook Resource', function() {
  let trello;
  let logger;

  let webhookId = '';

  before(() => {
    trello = new Trello(config);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger
      .writeResultsToFile('token')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = response => logger.processResponse(response);

  describe.skip('WEB-P | Webhook POST requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('WEB-P-01-T01 | creates a Webhook', done => {
      trello
        .webhooks()
        .addWebhook({
          callbackURL: '',
          idModel: '',
        })
        .then(logResponse)
        .then(response => {
          webhookId = response.data.id;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('WEB-G | Webhook GET requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('WEB-G-01-T01 | gets a Webhook', done => {
      trello
        .webhooks(webhookId)
        .getWebhook()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-G-02-T01 | gets the value of the idModel field for the Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .getFieldValue('idModel')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });
  });

  describe.skip('WEB-U | Webhook PUT requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it.skip('WEB-U-01-T01 | updates a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .updateWebhook({
          callbackURL: '',
          idModel: '',
          active: true,
        })
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-U-02-T01 | creates a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .addWebhook({
          callbackURL: '',
          idModel: '',
          active: true,
        })
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-U-03-T01 | updates the active status of a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .updateActiveStatus(true)
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-U-04-T01 | updates the callback URL of a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .updateCallbackUrl('')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-U-05-T01 | updates the description of a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .updateDescription('WEB-U-05-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('WEB-U-06-T01 | updates the model Id associated with a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .associateWithModel('')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });
  });

  describe('WEB-D | Webhook DELETE requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it.skip('WEB-D-02-T01 | deletes a Webhook', function(done) {
      trello
        .webhooks(webhookId)
        .deleteWebhook()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });
  });
});
