/* External dependencies */
import { normalize, schema } from 'normalizr';
import jsonFile from 'jsonfile';

/* Internal dependencies */
import Trello from '../src/index';
import { Logger } from './helpers';

const rootPath = `${process.cwd()}/tests/resources`;

describe.only('SETUP | Test Preparation and Setup', () => {
  const ORG_NAME = 'tfwOrg';
  let logger;
  let trello;
  let resources;

  before(function() {
    logger = new Logger();
    trello = new Trello(auth);
    resources = {};
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  /**
   * Once all of the requests have been completed (GET and POST), the data
   *    is written to a file named "resources.json" in the "tests/resources"
   *    directory.  This is done in lieu of writing the results to a file
   *    using the Logger.
   */
  after(function(done) {
    const filePath = `${rootPath}/resources.json`;
    jsonFile.writeFile(filePath, resources, { spaces: 2 }, (error) => {
      if (error) {
        console.error(`Error encountered writing resources file: ${error}`);
      }
      done();
    });
  });

  const logResponse = (response) => logger.processResponse(response);

  /**
   * This is the first step of the setup process prior to performing the other
   *    tests.  Instead of gumming up Trello by creating all the required
   *    resources every time the tests are run, this checks to see if the
   *    required resources are existing and saves that data for future tests.
   *    This has the advantage of running some of the GET request tests while
   *    also building up the data required to perform the remaining tests.
   *
   * Note: The only issue that could occur is if you already have an
   *    organization named "tfwOrg".  I figured the odds of that are low.  If
   *    you do, just change the 'ORG_NAME' constant to a name that doesn't
   *    match any of your existing organizations.
   */
  describe('SETUP-01 | Check for Existing Data', () => {
    const schemaOption = { idAttribute: 'name' };

    /**
     * Normalizes the data from the API response and appends it to the
     *    "resources" object.
     * @param {Object} dataToNormalize API response data to normalize.
     * @param {string} parentName Name of the parent group (e.g. 'boards').
     * @param {string} childName Name of the child group (e.g. 'lists').
     */
    const appendDataToResources = (
      dataToNormalize,
      parentName,
      childName,
    ) => {
      // This only works for response data that consists of a group of parent
      // resources (like Boards) with a single nested child resource (like
      // Lists).  If more data is needed, a separate normalizr configuration
      // is needed.
      const childSchema = new schema.Entity(childName, {}, schemaOption);
      const parentSchema = new schema.Entity(parentName, {
        [childName]: [childSchema],
      }, schemaOption);

      // I don't need the "results" key, I only want the "entities".
      const { entities = {} } = normalize(dataToNormalize, [parentSchema]);

      // Append the normalized parent and child data to the existing "resources"
      // object with the group name as the key.
      resources = {
        ...resources,
        [parentName]: entities[parentName],
        [childName]: entities[childName],
      }
    };

    /**
     * Step 1: Get Existing Organization
     * Determines if the organization named "tfwOrg" exists.  If it does, it's
     *    added to the "resources" object.
     */
    it('MBR-G-01-T01 | gets a Member', function(done) {
      trello.members('me').organizations().getOrganizations({
        fields: 'displayName',
      })
        .then(logResponse)
        .then((response) => {
          const { data } = response;
          // Find the organization with the display name associated with
          // testing.
          const tfwOrg = data.find(org => org.displayName === ORG_NAME);
          if (tfwOrg) {
            resources.tfwOrg = tfwOrg;
          }
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 2: Get Existing Boards and Lists
     * Get the Boards and Lists associated with the Organization Id from Step 1.
     *    The resulting data is then added to the "resources" object.
     */
    it('ORG-G-01-T01 | gets an Organization', function(done) {
      // If the testing Organization hasn't been created yet, there's no point
      // in trying to find the associated Boards and Lists.
      if (!resources.tfwOrg) {
        this.skip();
      }
      trello.organizations(resources.tfwOrg.id).getOrganization({
        boards: 'all',
        boardFields: ['labelNames', 'name', 'starred'],
        boardLists: 'all',
      })
        .then(logResponse)
        .then((response) => {
          const { data: { boards } } = response;
          appendDataToResources(boards, 'boards', 'lists');
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 3: Get Existing Cards and Checklists
     * Gets the Cards and Checklists associated with the Boards associated
     *    with the testing Organization.  The resulting data is then added to
     *    the "resources" object.
     */
    it('BRD-G-05-T01 | gets the Cards for a Board', function(done) {
      const { tfwBoardA, tfwBoardB } = resources;
      const getOptions = { checklists: 'all' };
      let getFns = [];
      if (tfwBoardA) {
        getFns.push(trello.boards(tfwBoardA.id).cards().getCards(getOptions));
      }
      if (tfwBoardB) {
        getFns.push(trello.boards(tfwBoardB.id).cards().getCards(getOptions));
      }
      if (!getFns.length) {
        this.skip();
      }
      Promise.all(getFns)
        .then(logResponse)
        .then((responses) => {
          const data = [...responses[0].data, ...responses[1].data];
          appendDataToResources(data, 'cards', 'checklists');
          assert.isDefined(data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 4: Get Existing Labels
     * Gets the Labels associated with the Boards associated with the testing
     *    Organization.  The resulting data is then added to the "resources"
     *    object.
     */
    it('BRD-G-11-T01 | gets the Labels for a Board', function(done) {
      const { tfwBoardA, tfwBoardB } = resources;
      let getFns = [];
      if (tfwBoardA) {
        getFns.push(trello.boards(tfwBoardA.id).labels().getLabels());
      }
      if (tfwBoardB) {
        getFns.push(trello.boards(tfwBoardB.id).labels().getLabels());
      }
      if (!getFns.length) {
        this.skip();
      }
      Promise.all(getFns)
        .then(logResponse)
        .then((responses) => {
          const data = [...responses[0].data, ...responses[1].data];
          const labelSchema = new schema.Entity('labels', {}, schemaOption);
          const { entities: { labels = {} } } = normalize(data, [labelSchema]);
          resources = { ...resources, labels };
          assert.isDefined(data);
          done();
        })
        .catch(error => done(error));
    });
  });

  /**
   * This is the second step of the setup process prior to performing the other
   *    tests.  Any resources that were not found in the previous test suite
   *    are created with a specific name used for referencing tests.
   */
  describe.skip('SETUP-02 | Create Required Resources', () => {
    /**
     * Step 5: Create the Testing Organization
     * If the Organization wasn't found in Step 1, create it and add it to
     *    the "resources" object.
     */
    it('ORG-P-01-T01 | creates an Organization', function(done) {
      // Don't create the Organization if it already exists.
      if (resources.tfwOrg) {
        this.skip();
      }
      trello.organizations().addOrganization({
        displayName: ORG_NAME,
        desc: 'This is for testing',
      })
        .then(logResponse)
        .then((response) => {
          resources.tfwOrg = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 6: Add Boards to Organization
     * If the Organization was successfully created in Step 5, create (2) new
     *    Boards and add them to the "resources" object.
     */
    it('BRD-P-01-T01 | creates a Board', function(done) {
      const { tfwOrg, tfwBoardA, tfwBoardB } = resources;
      if (!tfwOrg) {
        done(new Error('Organization not found.'));
      }
      const idOrganization = tfwOrg.id;
      const trelloBoards = trello.boards();
      let createFns = [];
      if (!tfwBoardA) {
        createFns.push(
          trelloBoards.addBoard({ name: 'tfwBoardA', idOrganization }));
      }
      if (!tfwBoardB) {
        createFns.push(
          trelloBoards.addBoard({ name: 'tfwBoardB', idOrganization }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          resources.tfwBoardA = responses[0].data || {};
          resources.tfwBoardB = responses[1].data || {};
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 7: Add Labels to Board A
     * If the Boards were successfully created in Step 6, create (2) new
     *    Labels and add them to the "resources" object.
     */
    it('BRD-P-06-T01 | adds a Label to a Board', function(done) {
      const { tfwBoardA, tfwLabelA, tfwLabelB } = resources;
      if (!tfwBoardA) {
        done(new Error('Board A not found.'));
      }
      const trelloLabels = trello.boards(tfwBoardA.id).labels();
      let createFns = [];
      if (!tfwLabelA) {
        createFns.push(
          trelloLabels.addLabel({ name: 'tfwLabelA', color: 'blue' }));
      }
      if (!tfwLabelB) {
        createFns.push(
          trelloLabels.addLabel({ name: 'tfwLabelB', color: 'red' }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          resources.tfwLabelA = responses[0].data || {};
          resources.tfwLabelB = responses[1].data || {};
          expect(responses.length).to.equal(2);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 8: Add Lists to Board A
     * If the Boards were successfully created in Step 6, create (3) new
     *    Labels and add them to the "resources" object.
     */
    it('BRD-P-07-T01 | adds a List to a Board', function(done) {
      const { tfwBoardA, tfwListA, tfwListB, tfwListC } = resources;
      if (!tfwBoardA) {
        done(new Error('Board A not found.'));
      }
      const trelloLists = trello.boards(tfwBoardA.id).lists();
      let createFns = [];
      if (!tfwListA) {
        createFns.push(trelloLists.addList({ name: 'tfwListA', pos: 0 }));
      }
      if (!tfwListB) {
        createFns.push(trelloLists.addList({ name: 'tfwListB', pos: 1 }));
      }
      if (!tfwListC) {
        createFns.push(trelloLists.addList({ name: 'tfwListC', pos: 2 }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          resources.tfwListA = responses[0].data || {};
          resources.tfwListB = responses[1].data || {};
          resources.tfwListC = responses[2].data || {};
          expect(responses.length).to.equal(3);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 9: Add Cards to List A
     * If the Lists were successfully created in Step 8, create (3) new
     *    Cards and add them to the "resources" object.
     */
    it('LST-P-03-T01 | adds a Card to a List', function(done) {
      const { tfwListA, tfwCardA, tfwCardB, tfwCardC } = resources;
      if (!tfwListA) {
        done(new Error('List A not found.'));
      }
      const trelloCards = trello.lists(tfwListA.id).cards();
      let createFns = [];
      if (!tfwCardA) {
        createFns.push(trelloCards.addCard({ name: 'tfwCardA' }));
      }
      if (!tfwCardB) {
        createFns.push(trelloCards.addCard({ name: 'tfwCardB' }));
      }
      if (!tfwCardC) {
        createFns.push(trelloCards.addCard({ name: 'tfwCardC' }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          resources.tfwCardA = responses[0].data || {};
          resources.tfwCardB = responses[1].data || {};
          resources.tfwCardC = responses[2].data || {};
          expect(responses.length).to.equal(3);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 10: Add Checklists to Card A
     * If the Cards were successfully created in Step 9, create (3) new
     *    Checklists and add them to the "resources" object.
     */
    it('CAR-P-06-T01 | adds a Checklist to a Card', function(done) {
      const { tfwCardA, tfwChecklistA, tfwChecklistB, tfwChecklistC } = resources;
      if (!tfwCardA) {
        done(new Error('Card A not found.'));
      }
      const trelloChecklists = trello.cards(tfwCardA.id).checklists();
      let createFns = [];
      if (!tfwChecklistA) {
        createFns.push(trelloChecklists.addChecklist({ name: 'tfwChecklistA' }));
      }
      if (!tfwChecklistB) {
        createFns.push(trelloChecklists.addChecklist({ name: 'tfwChecklistB' }));
      }
      if (!tfwChecklistC) {
        createFns.push(trelloChecklists.addChecklist({ name: 'tfwChecklistC' }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          resources.tfwChecklistA = responses[0].data || {};
          resources.tfwChecklistB = responses[1].data || {};
          resources.tfwChecklistC = responses[2].data || {};
          expect(responses.length).to.equal(3);
          done();
        })
        .catch(error => done(error));
    });
  });
});
