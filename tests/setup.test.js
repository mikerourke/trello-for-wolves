/* External dependencies */
import JsonDb from 'node-json-db';

/* Internal dependencies */
import Trello from '../src/index';
import { auth, Logger } from './helpers';

describe.only('SETUP | Test Preparation and Setup', () => {
  const ORG_NAME = 'TFW Testing';
  let logger;
  let trello;
  let db;

  const initializeDb = () => {
    db = new JsonDb(`${process.cwd()}/tests/resources/ids`, true, true);
    db.push('/', {
      orgId: '',
      boardAId: '',
      boardBId: '',
      labelAId: '',
      labelBId: '',
      listAId: '',
      listBId: '',
      listCId: '',
      cardAId: '',
      cardBId: '',
      cardCId: '',
      checklistAId: '',
      checklistBId: '',
      checklistCId: '',
    });
  };

  before((done) => {
    logger = new Logger();
    trello = new Trello(auth);
    initializeDb();
    setTimeout(() => { done(); }, 1000);
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('setup')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('SETUP-EXISTING | Check for Existing Data', () => {
    const addIdToDb = (key, group, fieldName, findValue) => {
      const foundItem = group.find(
        groupItem => groupItem[fieldName] === findValue);
      if (foundItem) {
        db.push(`/${key}`, foundItem.id);
      }
    };

    const populateDbFromMember = (memberData) => {
      const { boards, organizations } = memberData;
      addIdToDb('orgId', organizations, 'displayName', ORG_NAME);
      addIdToDb('boardAId', boards, 'name', 'Board A');
      addIdToDb('boardBId', boards, 'name', 'Board B');
    };

    it('MBR-G-01-T01 | gets a Member', function(done) {
      trello.members('me').getMember({
        cards: 'all',
        cardStickers: true,
        boards: 'all',
        boardLists: 'all',
        boardMemberships: 'all',
        boardOrganization: true,
        boardOrganizationFields: 'all',
        boardStars: true,
        organizations: 'all',
        tokens: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          const { data } = response;
          populateDbFromMember(data);
          assert.isDefined(data);
          done();
        })
        .catch(error => done(error));
    });

    // @todo: Finish writing this test.
    it('BRD-G-01-T01 | gets a Board', function(done) {
      trello.boards(boardId).getBoard({
        actions: 'none',
        actionsEntities: true,
        actionsDisplay: true,
        actionsFormat: 'count',
        actionsSince: null,
        actionsLimit: 20,
        actionFields: 'type',
        actionMember: true,
        actionMemberFields: 'username',
        actionMemberCreator: true,
        actionMemberCreatorFields: 'username',
        cards: 'all',
        cardFields: 'all',
        cardAttachments: false,
        cardAttachmentFields: 'name',
        cardChecklists: 'all',
        cardPluginData: true,
        cardStickers: true,
        boardStars: 'mine',
        labels: 'all',
        labelFields: 'all',
        labelsLimit: 50,
        lists: 'all',
        listFields: 'all',
        memberships: 'all',
        membershipsMember: true,
        membershipsMemberFields: ['fullName', 'username'],
        members: 'all',
        memberFields: ['fullName', 'username'],
        membersInvited: 'all',
        membersInvitedFields: ['fullName', 'username'],
        pluginData: true,
        checklists: 'all',
        checklistFields: 'all',
        organization: true,
        organizationFields: 'name',
        organizationMemberships: 'none',
        organizationPluginData: true,
        myPrefs: true,
        tags: true,
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe.skip('SETUP-CREATION | Add Required Data', () => {
    it('ORG-P-01-T01 | creates an Organization', function(done) {
      if (db.getData('/orgId')) {
        this.skip();
      }

      trello.organizations().addOrganization({
        displayName: ORG_NAME,
        desc: 'This is for testing',
      })
        .then(logResponse)
        .then((response) => {
          const orgId = response.data.id;
          db.push('/orgId', orgId);
          assert.isDefined(orgId);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-P-01-T01 | creates new Boards', function(done) {
      const trelloBoards = trello.boards();
      const idOrganization = db.getData('/orgId');
      let createBoardFns = [];
      if (!db.getData('/boardAId')) {
        createBoardFns.push(
          trelloBoards.addBoard({ name: 'Board A', idOrganization }));
      }
      if (!db.getData('/boardBId')) {
        createBoardFns.push(
          trelloBoards.addBoard({ name: 'Board B', idOrganization }));
      }
      if (!createBoardFns.length) {
        this.skip();
      }
      Promise.all(createBoardFns)
        .then(logResponse)
        .then((responses) => {
          db.push('/boardAId', responses[0].data.id || '');
          db.push('/boardBId', responses[1].data.id || '');
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    it('LBL-P-01-T01 | creates new Labels', function(done) {
      const trelloLabels = trello.boards(db.getData('/boardAId')).labels();
      let createLabelFns = [];
      if (!db.getData('/labelAId')) {
        createLabelFns.push(
          trelloLabels.addLabel({ name: 'Label A', color: 'blue' }));
      }
      if (!db.getData('/labelBId')) {
        createLabelFns.push(
          trelloLabels.addLabel({ name: 'Label B', color: 'red' }));
      }
      if (!createLabelFns.length) {
        this.skip();
      }
      Promise.all(createLabelFns)
        .then(logResponse)
        .then((responses) => {
          db.push('/labelAId', responses[0].data.id || '');
          db.push('/labelBId', responses[1].data.id || '');
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-P-01-T01 | creates new Lists', function(done) {
      const trelloLists = trello.boards(db.getData('/boardAId')).lists();
      let createListFns = [];
      if (!db.getData('/listAId')) {
        createListFns.push(trelloLists.addList({ name: 'List A', pos: 0 }));
      }
      if (!db.getData('/listBId')) {
        createListFns.push(trelloLists.addList({ name: 'List B', pos: 1 }));
      }
      if (!db.getData('/listCId')) {
        createListFns.push(trelloLists.addList({ name: 'List C', pos: 2 }));
      }
      if (!createListFns.length) {
        this.skip();
      }
      Promise.all(createListFns)
        .then(logResponse)
        .then((responses) => {
          db.push('/listAId', responses[0].data.id || '');
          db.push('/listBId', responses[1].data.id || '');
          db.push('/listCId', responses[2].data.id || '');
          expect(responses.length).to.equal(3);
          done();
        })
        .catch(error => done(error));
    });
  });
});
