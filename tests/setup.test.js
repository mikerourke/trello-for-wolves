import fs from 'fs';
import jsonFile from 'jsonfile';
import Trello from '../src/index';
import Logger from '../internals/testing/logger';

const rootPath = `${process.cwd()}/tests/resources`;

describe('SETUP | Test Preparation and Setup', function() {
  let logger;
  let trello;

  before(function() {
    trello = new Trello(config);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  /**
   * Once all of the requests have been completed, the data is written to a
   *    file named "resources.json" in the "tests/resources" directory.
   */
  after(function(done) {
    const filePath = `${rootPath}/resources.json`;
    jsonFile.writeFile(filePath, resources, { spaces: 2 }, error => {
      if (error) {
        done(new Error(`Error writing to resources file: ${error}`));
      }
      // I don't want to raise an error if the logger didn't work.
      logger
        .writeResultsToFile('setup')
        .then(() => done())
        .catch(() => done());
    });
  });

  const logResponse = response => logger.processResponse(response);

  describe('ORG-P | Organization POST requests', function() {
    let orgId = '';

    before(function() {
      if (!resources.org) resources.org = {};
    });

    beforeEach(function() {
      if (!this.currentTest.title.includes('ORG-P-01')) {
        if (!orgId) throw new Error('New Organization not found.');
      }
    });

    it('ORG-P-01-T01 | creates an Organization', function(done) {
      const orgName = 'ORG-P-01-T01';
      trello
        .organizations()
        .addOrganization({
          displayName: orgName,
          desc: 'This is for testing',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name, displayName },
          } = response;
          resources.org = { id, name };
          orgId = id;
          expect(displayName).to.equal(orgName);
          done();
        })
        .catch(error => done(error));
    });

    it('ORG-P-02-T01 | uploads a Logo to an Organization', function(done) {
      const logoFile = fs.createReadStream(`${assetsDir}/logo.jpg`);
      trello
        .organizations(orgId)
        .uploadLogo(logoFile)
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    /**
     * @skip ORG-P-03
     * @reason Business Class account required
     */
    it.skip('ORG-P-03-T01 | adds Tags to an Organization', function(done) {
      trello
        .organizations(orgId)
        .addTags('')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('ORG-U-04-T01 | adds an associated Member', function(done) {
      const memberFullName = 'ORG-U-04-T01';
      trello
        .organizations(orgId)
        .members()
        .addMember({
          email: 'user@test.com',
          fullName: memberFullName,
          type: 'normal',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { members },
          } = response;
          const { id, fullName, username } = members.pop();
          resources.member = { id, username };
          expect(fullName).to.equal(memberFullName);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('BRD-P | Board POST requests', function() {
    let boardId = '';

    before(function(done) {
      if (!resources.board) resources.board = {};
      setTimeout(() => done(), testDelay);
    });

    beforeEach(function() {
      if (!this.currentTest.title.includes('BRD-P-01')) {
        if (!boardId) throw new Error('New Board not found.');
      }
    });

    it('BRD-P-01-T01 | creates a Board', function(done) {
      const boardName = 'BRD-P-01-T01';
      trello
        .boards()
        .addBoard({
          name: boardName,
          defaultLabels: false,
          defaultLists: false,
          idOrganization: resources.org.id,
          prefs: {
            permissionLevel: 'private',
          },
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.board = { id, name };
          boardId = id;
          expect(name).to.equal(boardName);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * @skip BRD-P-02
     * @reason Excessive Data
     * @passed 06.09.17
     */
    it.skip('BRD-P-02-T01 | generates a calendar key for a Board', function(done) {
      trello
        .boards(boardId)
        .generateCalendarKey()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    // @fix: Getting error with invalid idCard?
    it.skip('BRD-P-03-T01 | adds a Checklist to a Board', function(done) {
      const checklistName = 'BRD-P-03-T01';
      trello
        .boards(boardId)
        .checklists()
        .addChecklist({
          name: checklistName,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.board.checklist = { id, name };
          expect(name).to.equal(checklistName);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * @skip BRD-P-04
     * @reason Excessive Data
     * @passed 06.09.17
     */
    it.skip('BRD-P-04-T01 | generates an email key for a Board', function(done) {
      trello
        .boards(boardId)
        .generateEmailKey()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    /**
     * @skip BRD-P-05
     * @reason Business Class account required
     */
    it.skip('BRD-P-05-T01 | adds Tags to a Board', function(done) {
      trello
        .boards(boardId)
        .addTags('[tag]')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('BRD-P-06-T01 | adds a Label to a Board', function(done) {
      const labelName = 'BRD-P-06-T01';
      trello
        .boards(boardId)
        .labels()
        .addLabel({
          name: labelName,
          color: 'blue',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.board.label = { id, name };
          expect(name).to.equal(labelName);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-P-06-T01 | adds a List to a Board', function(done) {
      const listName = 'BRD-P-06-T01';
      trello
        .boards(boardId)
        .lists()
        .addList({
          name: listName,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.board.list = { id, name };
          expect(name).to.equal(listName);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-P-08-T01 | marks Board as viewed', function(done) {
      trello
        .boards(boardId)
        .markAsViewed()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    // @fix: Figure out why this isn't working.
    it.skip('BRD-P-09-T01 | adds a PowerUp to a Board', function(done) {
      trello
        .boards(boardId)
        .addPowerUp('cardAging')
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });
  });

  describe('LBL-P | Label POST requests', function() {
    let boardId = '';

    before(function(done) {
      boardId = resources.board.id;
      if (!boardId) done(new Error('Board not found.'));
      if (!resources.labels) resources.labels = [];
      setTimeout(() => done(), testDelay);
    });

    it('LBL-P-01-T01 | creates a Green Label', function(done) {
      const labelName = 'LBL-P-01-T01';
      trello
        .labels()
        .addLabel({
          name: labelName,
          color: 'green',
          idBoard: boardId,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.labels.push({ id, name });
          expect(name).to.equal(labelName);
          done();
        })
        .catch(error => done(error));
    });

    it('LBL-P-01-T02 | creates a Blue Label', function(done) {
      const labelName = 'LBL-P-01-T02';
      trello
        .labels()
        .addLabel({
          name: labelName,
          color: 'blue',
          idBoard: boardId,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.labels.push({ id, name });
          expect(name).to.equal(labelName);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('LST-P | List POST requests', function() {
    let listId = '';

    before(function(done) {
      if (!resources.list) resources.list = {};
      setTimeout(() => done(), testDelay);
    });

    beforeEach(function() {
      if (!this.currentTest.title.includes('LST-P-01')) {
        if (!listId) throw new Error('New List not found.');
      }
    });

    it('LST-P-01-T01 | creates a List', function(done) {
      const listName = 'LST-P-01-T01';
      const boardId = resources.board.id;
      if (!boardId) done(new Error('Board not found.'));

      trello
        .lists()
        .addList({
          name: listName,
          idBoard: boardId,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.list = { id, name };
          listId = id;
          expect(name).to.equal(listName);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-P-03-T01 | adds a Card to a List with no description', function(done) {
      if (!resources.list.cards) resources.list.cards = [];

      const cardName = 'LST-P-03-T01';
      trello
        .lists(listId)
        .cards()
        .addCard({
          name: cardName,
          due: null,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.list.cards.push({ id, name });
          expect(name).to.equal(cardName);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-P-03-T02 | adds a Card to a List with description and label', function(done) {
      const cardName = 'LST-P-03-T02';
      trello
        .lists(listId)
        .cards()
        .addCard({
          name: cardName,
          desc: 'This is a test card.',
          labels: 'blue',
          due: null,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.list.cards.push({ id, name });
          expect(name).to.equal(cardName);
          done();
        })
        .catch(error => done(error));
    });

    it('LST-P-04-T01 | moves all Cards to a List', function(done) {
      const boardId = resources.board.id;
      trello
        .lists(listId)
        .moveAllCards({
          idBoard: boardId,
          idList: listId,
        })
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('LST-P-02-T01 | archives all Cards on a List', function(done) {
      trello
        .lists(listId)
        .archiveAllCards()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });
  });

  describe('CAR-P | Card POST Requests', function() {
    let cardId = '';

    before(function(done) {
      if (!resources.card) resources.card = {};
      setTimeout(() => done(), testDelay);
    });

    beforeEach(function() {
      if (!this.currentTest.title.includes('CAR-P-01')) {
        if (!cardId) throw new Error('New Card not found.');
      }
    });

    it('CAR-P-01-T01 | creates a Card', function(done) {
      if (!resources.list) done(new Error('List Id not found.'));

      const listId = resources.list.id;
      const cardName = 'CAR-P-01-T01';
      trello
        .cards()
        .addCard({
          idList: listId,
          name: cardName,
          desc: 'This is a test description',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.card = { id, name };
          cardId = id;
          expect(name).to.equal(cardName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-02-T01 | adds a Comment to a Card', function(done) {
      const commentText = 'CAR-P-02-T01';
      trello
        .cards(cardId)
        .comments()
        .addComment(commentText)
        .then(logResponse)
        .then(response => {
          const {
            data: {
              id,
              data: { text },
            },
          } = response;
          resources.card.comment = { id, text };
          expect(text).to.equal(commentText);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-02-T02 | adds a second Comment to a Card', function(done) {
      const commentText = 'CAR-P-02-T02';
      trello
        .cards(cardId)
        .comments()
        .addComment(commentText)
        .then(logResponse)
        .then(response => {
          resources.comment = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-03-T01 | uploads an image Attachment to a Card', function(done) {
      const attachmentFile = fs.createReadStream(`${assetsDir}/attachment.jpg`);
      trello
        .cards(cardId)
        .attachments()
        .uploadAttachment({
          file: attachmentFile,
          name: 'wolf-one.jpg',
          mimeType: 'image/jpeg',
        })
        .then(logResponse)
        .then(response => {
          resources.card.attachmentFile = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-03-T02 | uploads a plain text Attachment to a Card', function(done) {
      const attachmentFile = fs.createReadStream(`${assetsDir}/file.txt`);
      trello
        .cards(cardId)
        .attachments()
        .uploadAttachment({
          file: attachmentFile,
          name: 'file.txt',
          mimeType: 'text/plain',
        })
        .then(logResponse)
        .then(response => {
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-03-T03 | uploads an Attachment as a URL to a Card', function(done) {
      trello
        .cards(cardId)
        .attachments()
        .uploadAttachment({
          url:
            'http://www.spiritanimal.info/wp-content/uploads/Wolf-Spirit-Animal-2.jpg',
          name: 'wolf-two.jpg',
        })
        .then(logResponse)
        .then(response => {
          resources.card.attachmentUrl = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-06-T01 | adds a Checklist to a Card', function(done) {
      const checklistName = 'CAR-P-06-T01';
      trello
        .cards(cardId)
        .checklists()
        .addChecklist({
          name: checklistName,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.card.checklist = { id, name };
          expect(name).to.equal(checklistName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-06-T02 | copies a Checklist on a Card', function(done) {
      if (!resources.card.checklist)
        done(new Error('Existing Checklist not found.'));

      const sourceChecklistId = resources.card.checklist.id;
      const checklistName = 'CAR-P-06-T02';
      trello
        .cards(cardId)
        .checklists()
        .addChecklist({
          name: checklistName,
          idChecklistSource: sourceChecklistId,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.card.checklistCopy = { id, name };
          expect(name).to.equal(checklistName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-04-T01 | adds a Check Item to a Checklist on a Card with default position', function(done) {
      if (!resources.card.checkItems) resources.card.checkItems = [];
      if (!resources.card.checklist) done(new Error('Checklist not found.'));

      const checklistId = resources.card.checklist.id;
      const checkItemName = 'CAR-P-04-T01';
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem()
        .addCheckItem({
          name: checkItemName,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, idChecklist, name },
          } = response;
          resources.card.checkItems.push({ id, idChecklist, name });
          expect(name).to.equal(checkItemName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-04-T02 | adds a Check Item to a Checklist on a Card with numbered position', function(done) {
      if (!resources.card.checklist) done(new Error('Checklist not found.'));

      const checklistId = resources.card.checklist.id;
      const checkItemName = 'CAR-P-04-T02';
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem()
        .addCheckItem({
          name: checkItemName,
          pos: 1,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, idChecklist, name },
          } = response;
          resources.card.checkItems.push({ id, idChecklist, name });
          expect(name).to.equal(checkItemName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-04-T03 | adds a Check Item to a Checklist on a Card with named position', function(done) {
      if (!resources.card.checklist) done(new Error('Checklist not found.'));

      const checklistId = resources.card.checklist.id;
      const checkItemName = 'CAR-P-04-T03';
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem()
        .addCheckItem({
          name: checkItemName,
          pos: 'bottom',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, idChecklist, name },
          } = response;
          resources.card.checkItems.push({ id, idChecklist, name });
          expect(name).to.equal(checkItemName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-05-T01 | converts a Check Item to a Card', function(done) {
      if (!resources.card.checklist) done(new Error('Checklist not found.'));

      const checklistId = resources.card.checklist.id;
      if (!resources.card.checkItems.length)
        done(new Error('Check Item not found.'));

      const lastCheckItem = resources.card.checkItems.pop();
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(lastCheckItem.id)
        .convertToCard()
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.card.convertedCard = { id, name };
          expect(name).to.equal(lastCheckItem.name);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-07-T01 | associates a Label with a Card', function(done) {
      if (!resources.labels.length) done(new Error('Label not found.'));

      const labelId = resources.labels[0].id;
      trello
        .cards(cardId)
        .associateLabel(labelId)
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    // @fix: Returns "invalid member" error.
    it.skip('CAR-P-08-T01 | associates a Member with a Card', function(done) {
      if (!resources.member) done(new Error('Member not found.'));

      const memberId = resources.member.id;
      trello
        .cards(cardId)
        .associateMember(memberId)
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('CAR-P-09-T01 | adds a Label to a Card', function(done) {
      const labelName = 'CAR-P-09-T01';
      trello
        .cards(cardId)
        .labels()
        .addLabel({
          name: labelName,
          color: 'red',
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.card.label = { id, name };
          expect(name).to.equal(labelName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-10-T01 | marks associated Notifications as read', function(done) {
      trello
        .cards(cardId)
        .markAssociatedNotificationsRead()
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    // @fix: Returns "unauthorized card permission requested" error.
    it.skip('CAR-P-11-T01 | updates the Members Voted on a Card', function(done) {
      if (!resources.member) done(new Error('Member not found.'));

      const memberId = resources.member.id;
      trello
        .cards(cardId)
        .membersVoted(memberId)
        .updateVote(true)
        .then(logResponse)
        .should.eventually.be.fulfilled.notify(done);
    });

    it('CAR-P-12-T01 | adds a Sticker with the Check image to a Card', function(done) {
      if (!resources.card.stickers) resources.card.stickers = [];

      const imageName = 'check';
      trello
        .cards(cardId)
        .stickers()
        .addSticker({
          image: imageName,
          top: 0,
          left: 0,
          zIndex: 1,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, image },
          } = response;
          resources.card.stickers.push({ id, image });
          assert.isDefined(response.data);
          expect(image).to.equal(imageName);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-12-T02 | adds a Sticker with the Heart image to a Card', function(done) {
      const imageName = 'heart';
      trello
        .cards(cardId)
        .stickers()
        .addSticker({
          image: imageName,
          top: 10,
          left: 24,
          zIndex: 2,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, image },
          } = response;
          resources.card.stickers.push({ id, image });
          assert.isDefined(response.data);
          expect(image).to.equal(imageName);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('CHK-P | Checklist POST requests', function() {
    let checklistId = '';

    before(function(done) {
      if (!resources.checklist) resources.checklist = {};
      setTimeout(() => done(), testDelay);
    });

    it('CHK-P-01-T01 | creates a Checklist', function(done) {
      const cardId = resources.card.id;
      if (!cardId) done(new Error('Card not found.'));

      const checklistName = 'CHK-P-01-T01';
      trello
        .checklists()
        .addChecklist({
          name: checklistName,
          idCard: cardId,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, name },
          } = response;
          resources.checklist = { id, name };
          checklistId = id;
          expect(name).to.equal(checklistName);
          done();
        })
        .catch(error => done(error));
    });

    it('CHK-P-02-T01 | adds an unchecked Check Item to a Checklist', function(done) {
      if (!resources.checklist.checkItems) resources.checklist.checkItems = [];

      const checkItemName = 'CHK-P-02-T01';
      trello
        .checklists(checklistId)
        .checkItems()
        .addCheckItem({
          name: checkItemName,
          checked: false,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, idChecklist, name },
          } = response;
          resources.checklist.checkItems.push({ id, idChecklist, name });
          expect(name).to.equal(checkItemName);
          done();
        })
        .catch(error => done(error));
    });

    it('CHK-P-02-T02 | adds a checked Check Item to a Checklist', function(done) {
      const checkItemName = 'CHK-P-02-T02';
      trello
        .checklists(checklistId)
        .checkItems()
        .addCheckItem({
          name: checkItemName,
          checked: false,
        })
        .then(logResponse)
        .then(response => {
          const {
            data: { id, idChecklist, name },
          } = response;
          resources.checklist.checkItems.push({ id, idChecklist, name });
          expect(name).to.equal(checkItemName);
          done();
        })
        .catch(error => done(error));
    });
  });
});
