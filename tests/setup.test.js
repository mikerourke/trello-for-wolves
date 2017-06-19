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
     * Extrapolates the individual resources from the normalized data and
     *    returns an object with the appropriate resources to append to the
     *    "resources" object.  If the resource doesn't have "tfw" in the key,
     *    don't add it.
     * @param {Object} entities Normalized entity data.
     * @param {string} groupName Name of the group to pull data from.
     * @returns {Object}
     */
    const getResourcesToAppend = (entities, groupName) => {
      let appendedResources = {};
      Object.keys(entities[groupName]).forEach((key) => {
        if (key.toString().includes('tfw')) {
          appendedResources[key] = entities[groupName][key];
        }
      });
      return appendedResources;
    };

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
        ...getResourcesToAppend(entities, parentName),
        ...getResourcesToAppend(entities, childName),
      }
    };

    /**
     * Step 1: Get Existing Organization
     * Determines if the organization named "tfwOrg" exists.  If it does, it's
     *    added to the "resources" object.
     */
    it('MBR-G-01-T01 | gets the associated Organizations for a Member', function(done) {
      trello.members('me').organizations().getOrganizations()
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
      const { tfwOrg } = resources;
      if (!tfwOrg) {
        this.skip();
      }
      trello.organizations(tfwOrg.id).getOrganization({
        boards: 'all',
        boardLists: 'all',
        memberships: 'me',
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

          const { tfwChecklistA, tfwChecklistB, tfwChecklistC } = resources;
          const checkItems = [
            ...tfwChecklistA.checkItems,
            ...tfwChecklistB.checkItems,
            ...tfwChecklistC.checkItems,
          ];
          checkItems.forEach((checkItem) => {
            const checkItemName = checkItem.name.toString();
            if (checkItemName.includes('tfwCheckItem')) {
              resources[checkItemName] = checkItem;
            }
          });
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
          const labelData = data.filter(label => label.name.toString().includes('tfw'));
          const labelSchema = new schema.Entity('labels', {}, schemaOption);
          const { entities: { labels = {} } } = normalize(labelData, [labelSchema]);
          resources = { ...resources, ...labels };
          assert.isDefined(data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 5: Get Existing Card Comments
     * Get the Comments associated with the existing Card. The resulting data
     *    is then added to the "resources" object.
     */
    it('CAR-G-03-T01 | gets the Comments for a Card', function(done) {
      const { tfwCardA } = resources;
      if (!tfwCardA) {
        this.skip();
      }
      trello.cards(tfwCardA.id).comments().getComments()
        .then(logResponse)
        .then((response) => {
          let commentData = [];
          response.data.forEach((comment) => {
            const { id, type, date, data: { text } } = comment;
            commentData.push({ id, type, date, text });
          });
          resources.tfwCardA.comments = commentData;
          assert.isDefined(response.data);
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
  describe('SETUP-02 | Create Required Resources', () => {
    /**
     * Updates the "resources" object with the results of the multiple
     *    API calls.
     * @param {Array} responses Array of responses received from API call.
     */
    const appendResponsesToResources = (responses) => {
      responses.forEach((response) => {
        const { data } = response;
        if (data) {
          const itemName = data.name.toString() || '';
          if (itemName) {
            resources[itemName] = data || {};
          }
        }
      });
    };

    /**
     * Step 1: Create the Testing Organization
     * If the Organization wasn't found in Step 1 of the previous test suite,
     *    create it and add it to the "resources" object.
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
     * Step 2: Add Boards to Organization
     * If the Organization was successfully created in Step 1, create (2) new
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
        createFns.push(trelloBoards.addBoard({ name: 'tfwBoardA', idOrganization }));
      }
      if (!tfwBoardB) {
        createFns.push(trelloBoards.addBoard({ name: 'tfwBoardB', idOrganization }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 3: Add Labels to Board A
     * If the Boards were successfully created in Step 2, create (2) new
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
        createFns.push(trelloLabels.addLabel({ name: 'tfwLabelBlue', color: 'blue' }));
      }
      if (!tfwLabelB) {
        createFns.push(trelloLabels.addLabel({ name: 'tfwLabelRed', color: 'red' }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 4: Add Lists to Board A
     * If the Boards were successfully created in Step 2, create (3) new
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
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 5A: Add (2) Cards to List A
     * If the Lists were successfully created in Step 4, create (2) new
     *    Cards and add them to the "resources" object.
     */
    it('LST-P-03-T01 | adds a Card to a List', function(done) {
      const { tfwListA, tfwCardA, tfwCardB } = resources;
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
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 5B: Add (1) Card to List A
     * This is essentially the same as Step 5A, the method for adding the Card
     *    uses a different API call.
     */
    it('CAR-P-01-T01 | adds a Card to a List', function(done) {
      const { tfwListA, tfwCardC } = resources;
      if (!tfwListA) {
        done(new Error('List A not found.'));
      }
      trello.cards().addCard({
        idList: tfwListA.id,
        name: 'tfwCardC',
        desc: 'This is a test description',
        pos: 'top',
      })
        .then(logResponse)
        .then((response) => {
          resources.tfwCardC = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 6A: Add (2) Checklists to Card A
     * If the Cards were successfully created in Step 5, create (2) new
     *    Checklists and add them to the "resources" object.
     */
    it('CAR-P-06-T01 | adds a Checklist to a Card', function(done) {
      const { tfwCardA, tfwChecklistA, tfwChecklistB } = resources;
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
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 6B: Add (1) Checklist to Card A on Board A
     * This is essentially the same as the previous step, it just uses a
     *    different API call to perform the action.
     */
    it('BRD-P-03-T01 | adds a Checklist to a Board', function(done) {
      const { tfwBoardA, tfwCardA, tfwChecklistC } = resources;
      if (!tfwCardA) {
        done(new Error('Card A not found.'));
      }
      if (tfwChecklistC) {
        this.skip();
      }
      trello.boards(tfwBoardA.id).checklists().addChecklist({
        idCard: tfwCardA.id,
        name: 'tfwChecklistC',
      })
        .then(logResponse)
        .then((response) => {
          resources.tfwChecklistC = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 7: Add (3) Check Items to Checklist A
     * If the Checklists were successfully created in Step 6, create (3) new
     *    Check Items and add them to the "resources" object.
     */
    it('CAR-P-04-T01 | adds a Check Item to a Checklist on a Card', function(done) {
      const { tfwCardA, tfwChecklistA,  tfwCheckItemA, tfwCheckItemB, tfwCheckItemC } = resources;
      if (!tfwChecklistA) {
        done(new Error('Checklist A not found.'));
      }
      const trelloCheckItems = trello
        .cards(tfwCardA.id)
        .checklist(tfwChecklistA.id)
        .checkItem();
      let createFns = [];
      if (!tfwCheckItemA) {
        createFns.push(trelloCheckItems.addCheckItem({ name: 'tfwCheckItemA' }));
      }
      if (!tfwCheckItemB) {
        createFns.push(trelloCheckItems.addCheckItem({ name: 'tfwCheckItemB' }));
      }
      if (!tfwCheckItemC) {
        createFns.push(trelloCheckItems.addCheckItem({ name: 'tfwCheckItemC' }));
      }
      if (!createFns.length) {
        this.skip();
      }
      Promise.all(createFns)
        .then(logResponse)
        .then((responses) => {
          appendResponsesToResources(responses);
          expect(responses.length).to.equal(createFns.length);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * Step 8: Add Comment to Card A
     * If the Cards were successfully created in Step 5, create (1) new
     *    Comment action on Card A.
     */
    it('CAR-P-02-T01 | adds a Comment to a Card', function(done) {
      const { tfwCardA } = resources;
      if (!tfwCardA) {
        done(new Error('Card A not found.'));
      }
      const commentText = 'This is a test comment';

      // If a comment already exists with the predefined text, don't
      // create a new one.
      if (tfwCardA.comments) {
        tfwCardA.comments.forEach((comment) => {
          if (comment.text === commentText) {
            this.skip();
          }
        });
      }
      trello.cards(tfwCardA.id).comments().addComment(commentText)
        .then(logResponse)
        .then((response) => {
          resources.tfwCardA.comments.push(response.data);
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  /**
   * This is the final step of the setup process prior to performing the other
   *    tests.  Pertinent actions are pulled from each resource and saved to
   *    the resources.json file for testing purposes.
   */
  describe('SETUP-03 | Saves Action information to Resources file', () => {
    it('MBR-G-03-T01 | gets the Actions for a Member', (done) => {
      trello.members('me').actions().getActions({
        filter: ['commentCard', 'createBoard', 'createCard', 'createList', 'createOrganization'],
        memberCreator: false,
      })
        .then(logResponse)
        .then((response) => {
          resources.tfwActions = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });
});
