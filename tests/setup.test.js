/* External dependencies */
import { normalize, schema } from 'normalizr';
import jsonFile from 'jsonfile';

/* Internal dependencies */
import Trello from '../src/index';
import { Logger } from './helpers';

const rootPath = `${process.cwd()}/tests/resources`;

describe.only('SETUP | Test Preparation and Setup', () => {
  const ORG_NAME = 'tfwOrganization';
  let logger;
  let trello;
  let resourceIds;

  before(() => {
    logger = new Logger();
    trello = new Trello(auth);
    resourceIds = {};
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    jsonFile.writeFileSync(`${rootPath}/ids.json`, resourceIds, { spaces: 2 });

    logger.writeResultsToFile('setup')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('SETUP-01 | Check for Existing Data', () => {
    let idOrganization;
    let resources;

    before(() => {
      resources = {};
    });

    // @todo: Add description and label handlers.
    after((done) => {
      const { boards, cards, checklists, lists } = resources;
      resourceIds = {
        org: idOrganization,
        boardA: boards.tfwBoardA && boards.tfwBoardA.id,
        boardB: boards.tfwBoardB && boards.tfwBoardB.id,
        cardA: cards.tfwCardA && cards.tfwCardA.id,
        cardB: cards.tfwCardB && cards.tfwCardB.id,
        cardC: cards.tfwCardC && cards.tfwCardC.id,
        checklistA: checklists.tfwChecklistA && checklists.tfwChecklistA.id,
        checklistB: checklists.tfwChecklistB && checklists.tfwChecklistA.id,
        checklistC: checklists.tfwChecklistC && checklists.tfwChecklistA.id,
        listA: lists.tfwListA && lists.tfwListA.id,
        listB: lists.tfwListB && lists.tfwListB.id,
        listC: lists.tfwListC && lists.tfwListC.id,
      };
      done();
    });

    const getNormalizedEntities = (dataToNormalize, parentName, childName) => {
      const options = { idAttribute: 'name' };
      const childSchema = new schema.Entity(childName, {}, options);
      const parentSchema = new schema.Entity(parentName, {
        [childName]: [childSchema],
      }, options);
      const { entities = {} } = normalize(dataToNormalize, [parentSchema]);
      return entities;
    };

    /**
     * Step 1: Organization
     * Determines if the organization named "tfwOrganization" exists.  If it
     *    does, it's added to the "resources" object and assigns the Id to
     *    the local variable.
     */
    it('MBR-G-01-T01 | gets a Member', function(done) {
      trello.members('me').organizations().getOrganizations({
        fields: 'displayName',
      })
        .then(logResponse)
        .then((response) => {
          const { data: organizations } = response;
          const tfwOrganization = organizations.find(
            organization => organization.displayName === ORG_NAME);
          if (tfwOrganization) {
            idOrganization = tfwOrganization.id;
          }
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 2: Boards and Lists
     * Get the Boards and Lists associated with the Organization Id from Step 1.
     *    The resulting data is then added to the "resources" object.
     */
    it('ORG-G-01-T01 | gets an Organization', function(done) {
      idOrganization = 'codelikeawolf';
      if (!idOrganization) {
        done(new Error('Organization Id not found.'));
      }

      trello.organizations(idOrganization).getOrganization({
        boards: 'all',
        boardFields: ['labelNames', 'name', 'starred'],
        boardLists: 'all',
      })
        .then(logResponse)
        .then((response) => {
          const { data } = response;
          const {
            boards = {},
            lists = {},
          } = getNormalizedEntities(data.boards, 'boards', 'lists');
          resources = { ...resources, boards, lists };
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 3: Cards and Checklists
     * Gets the Cards and Checklists associated with the Boards associated
     *    with the testing Organization.  The resulting data is then added to
     *    the "resources" object.
     */
    it('BRD-G-05-T01 | gets the Cards for a board', function(done) {
      //const { tfwBoardA, tfwBoardB } = resources.boards;
      const tfwBoardA = { id: '576067ed227dcd007babb4eb' };
      const tfwBoardB = { id: '5732779f0527ec711745ae7b' };
      Promise.all([
        trello.boards(tfwBoardA.id).cards().getCards({ checklists: 'all' }),
        trello.boards(tfwBoardB.id).cards().getCards({ checklists: 'all' }),
      ])
        .then(logResponse)
        .then((responses) => {
          const data = [...responses[0].data, ...responses[1].data];
          const {
            cards = {},
            checklists = {},
          } = getNormalizedEntities(data, 'cards', 'checklists');
          resources = { ...resources, cards, checklists };
          assert.isTrue(true);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe.skip('SETUP-02 | Add Required Data', () => {
    it('ORG-P-01-T01 | creates an Organization', function(done) {
      if (resourceIds.orgId) {
        this.skip();
      }

      trello.organizations().addOrganization({
        displayName: ORG_NAME,
        desc: 'This is for testing',
      })
        .then(logResponse)
        .then((response) => {
          const orgId = response.data.id;
          resourceIds.orgId = orgId;
          assert.isDefined(orgId);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-P-01-T01 | creates new Boards', function(done) {
      const idOrganization = resourceIds.orgId;
      if (!idOrganization) {
        done(new Error('Organization Id not found.'));
      }

      const trelloBoards = trello.boards();
      let createBoardFns = [];
      if (!resourceIds.tfwBoardA) {
        createBoardFns.push(
          trelloBoards.addBoard({ name: 'tfwBoardA', idOrganization }));
      }
      if (!resourceIds.tfwBoardB) {
        createBoardFns.push(
          trelloBoards.addBoard({ name: 'tfwBoardB', idOrganization }));
      }
      if (!createBoardFns.length) {
        this.skip();
      }
      Promise.all(createBoardFns)
        .then(logResponse)
        .then((responses) => {
          resourceIds.tfwBoardA = responses[0].data.id || '';
          resourceIds.tfwBoardB = responses[1].data.id || '';
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    it('LBL-P-01-T01 | creates new Labels', function(done) {
      const idBoard = resourceIds.tfwBoardA;
      if (!idBoard) {
        done(new Error('tfwBoardA Id not found.'));
      }

      const trelloLabels = trello.boards(idBoard).labels();
      let createLabelFns = [];
      if (!resourceIds.tfwLabelA) {
        createLabelFns.push(
          trelloLabels.addLabel({ name: 'tfwLabelA', color: 'blue' }));
      }
      if (!resourceIds.tfwLabelB) {
        createLabelFns.push(
          trelloLabels.addLabel({ name: 'tfwLabelB', color: 'red' }));
      }
      if (!createLabelFns.length) {
        this.skip();
      }
      Promise.all(createLabelFns)
        .then(logResponse)
        .then((responses) => {
          resourceIds.tfwLabelA = responses[0].data.id || '';
          resourceIds.tfwLabelB = responses[1].data.id || '';
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-P-01-T01 | creates new Lists', function(done) {
      const idBoard = resourceIds.tfwBoardA;
      if (!idBoard) {
        done(new Error('Board A Id not found.'));
      }

      const trelloLists = trello.boards(idBoard).lists();
      let createListFns = [];
      if (!resourceIds.tfwListA) {
        createListFns.push(trelloLists.addList({ name: 'tfwListA', pos: 0 }));
      }
      if (!resourceIds.tfwListB) {
        createListFns.push(trelloLists.addList({ name: 'tfwListB', pos: 1 }));
      }
      if (!resourceIds.tfwListC) {
        createListFns.push(trelloLists.addList({ name: 'tfwListC', pos: 2 }));
      }
      if (!createListFns.length) {
        this.skip();
      }
      Promise.all(createListFns)
        .then(logResponse)
        .then((responses) => {
          resourceIds.tfwListA = responses[0].data.id || '';
          resourceIds.tfwListB = responses[1].data.id || '';
          resourceIds.tfwListC = responses[2].data.id || '';
          expect(responses.length).to.equal(3);
          done();
        })
        .catch(error => done(error));
    });
  });
});
