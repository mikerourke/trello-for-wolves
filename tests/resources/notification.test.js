/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe.skip('NTF | Notification Resource', function() {
  let trello;
  let logger;

  let notificationId = '';

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (resources.notification) {
      notificationId = resources.notification.id;
    } else {
      this.skip();
    }
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
      setTimeout(() => { done(); }, testDelay);
    });

    it('NTF-G-01-T01 | gets a Notification', function(done) {
      trello.notifications(notificationId).getNotification()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-01-T02 | gets a Notification with some arguments', function(done) {
      trello.notifications(notificationId).getNotification({
        display: true,
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-01-T03 | gets a Notification with all arguments', function(done) {
      trello.notifications(notificationId).getNotification({
        display: true,
        entities: true,
        fields: 'all',
        memberCreator: true,
        memberCreatorFields: 'all',
        board: true,
        boardFields: 'all',
        list: true,
        card: true,
        cardFields: 'all',
        organization: true,
        organizationFields: 'all',
        member: true,
        memberFields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-02-T01 | gets a Notification field value for data', function(done) {
      trello.notifications(notificationId).getFieldValue('data')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-02-T02 | gets a Notification field value for date', function(done) {
      trello.notifications(notificationId).getFieldValue('date')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-02-T03 | gets a Notification field value for idMemberCreator', function(done) {
      trello.notifications(notificationId).getFieldValue('idMemberCreator')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-02-T04 | gets a Notification field value for type', function(done) {
      trello.notifications(notificationId).getFieldValue('type')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-02-T05 | gets a Notification field value for unread', function(done) {
      trello.notifications(notificationId).getFieldValue('unread')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-03-T01 | gets the associated Board', function(done) {
      trello.notifications(notificationId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-03-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.notifications(notificationId).board().getBoard({
        fields: ['closed', 'dateLastActivity'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-04-T01 | gets a field value for the associated Board', function(done) {
      trello.notifications(notificationId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-05-T01 | gets the associated Card', function(done) {
      trello.notifications(notificationId).card().getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-05-T02 | gets only the specified fields for the associated Card', function(done) {
      trello.notifications(notificationId).card().getCard({
        fields: ['badges', 'closed', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-06-T01 | gets a field value for the associated Card', function(done) {
      trello.notifications(notificationId).card().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-07-T01 | gets the Display data', function(done) {
      trello.notifications(notificationId).getDisplay()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-08-T01 | gets the Entities data', function(done) {
      trello.notifications(notificationId).getEntities()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-09-T01 | gets the associated List', function(done) {
      trello.notifications(notificationId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-09-T02 | gets only the specified fields for the associated List', function(done) {
      trello.notifications(notificationId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-10-T01 | gets a field value for the associated List', function(done) {
      trello.notifications(notificationId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-11-T01 | gets the associated Member', function(done) {
      trello.notifications(notificationId).member().getMember()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('NTF-G-11-T01 | gets only the specified fields for the associated Member', function(done) {
      trello.notifications(notificationId).member().getMember({
        fields: ['email', 'fullName'],
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('NTF-G-12-T01 | gets a field value for the associated Member', function(done) {
      trello.notifications(notificationId).member().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('NTF-G-13-T01 | gets the associated Member Creator', function(done) {
      trello.notifications(notificationId).memberCreator().getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-13-T02 | gets only the specified fields for the associated Member Creator', function(done) {
      trello.notifications(notificationId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-14-T01 | gets a field value for the associated Member Creator', function(done) {
      trello.notifications(notificationId).memberCreator().getFieldValue('avatarHash')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-15-T01 | gets the associated Organization', function(done) {
      trello.notifications(notificationId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-G-16-T01 | gets a field value for the associated Organization', function(done) {
      trello.notifications(notificationId).organization().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('NTF-U | Notification PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('NTF-U-01-T01 | updates a Notification', function(done) {
      trello.notifications(notificationId).updateNotification({
        unread: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('NTF-U-02-T01 | marks a Notification as read', function(done) {
      trello.notifications(notificationId).updateUnreadStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('NTF-P | Notification POST requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('NTF-P-01-T01 | marks all Notifications as read', function(done) {
      trello.notifications().markAllAsRead()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
