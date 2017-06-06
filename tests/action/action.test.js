/* Internal dependencies */
import Trello from '../../src/index';
import { auth, resourceIds } from '../helpers';

describe('Action Resource', () => {
  const { actionId } = resourceIds;
  let trello;

  before(() => {
    trello = new Trello(auth);
  });

  describe('Action GET requests', () => {
    it('gets an action', (done) => {
      trello.actions(actionId).getAction()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets an action with some arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        fields: 'all',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets an action with all arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        entities: true,
        fields: 'all',
        member: false,
        memberFields: 'all',
        memberCreator: true,
        memberCreatorFields: 'all',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets an action field value', (done) => {
      trello.actions(actionId).getFieldValue('type')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the action display', (done) => {
      trello.actions(actionId).getDisplay()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the action entities', (done) => {
      trello.actions(actionId).getEntities()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the associated board', (done) => {
      trello.actions(actionId).board().getBoard()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a field value for the associated board', (done) => {
      trello.actions(actionId).board().getFieldValue('name')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('fails gracefully when attempting to get the incorrect association for an ID', (done) => {
      trello.actions(actionId).card().getCard()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the associated list', (done) => {
      trello.actions(actionId).list().getList()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a field value for the associated list', (done) => {
      trello.actions(actionId).list().getFieldValue('name')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the associated card', (done) => {
      trello.actions(actionId).card().getCard()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a field value for the associated card', (done) => {
      trello.actions(actionId).card().getFieldValue('name')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the associated member', (done) => {
      trello.actions(actionId).member().getMember()
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets a field value for the associated member', (done) => {
      trello.actions(actionId).member().getFieldValue('fullName')
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getMember()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the associated member creator with some arguments', (done) => {
      trello.actions(actionId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a field value for the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getFieldValue('avatarHash')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // TODO: Find board with an organization to get actions for.
    it('gets the associated organization', (done) => {
      trello.actions(actionId).organization().getOrganization()
        .should.eventually.be.rejected
        .notify(done);
    });

    // TODO: Find board with an organization to get actions for.
    it('gets a field value for the associated organization', (done) => {
      trello.actions(actionId).organization().getFieldValue('logoHash')
        .should.eventually.be.rejected
        .notify(done);
    });
  });
});
