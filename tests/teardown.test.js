/* Internal dependencies */
import Trello from '../src/index';
import Logger from './logger';

describe('TEARDOWN | Test Cleanup', function() {
  let logger;
  let trello;

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('teardown')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CHK-D | Checklist DELETE requests', function() {
    let checklistId = '';

    before(function(done) {
      if (resources.checklist) {
        checklistId = resources.checklist.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, testDelay);
    });

    it('CHK-D-02-T01 | deletes a Check Item from a Checklist', function(done) {
      if (!resources.checklist.checkItems.length) {
        this.skip();
      }
      const checkItemId = resources.checklist.checkItems[0].id;
      trello.checklists(checklistId).checkItems(checkItemId).deleteCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-D-01-T01 | deletes a Checklist', function(done) {
      trello.checklists(checklistId).deleteChecklist()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-D | Card DELETE requests', function() {
    let cardId = '';

    before(function(done) {
      if (resources.card) {
        cardId = resources.card.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, testDelay);
    });

    it('CAR-D-10-T01 | deletes a Sticker from a Card', function(done) {
      if (!resources.card.stickers.length) {
        this.skip();
      }
      const stickerId = resources.card.stickers[0].id;
      trello.cards(cardId).stickers(stickerId).deleteSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @fix: Returns "unauthorized card permission requested" error.
    it.skip('CAR-D-09-T01 | changes the Voting status for a Member on a Card', function(done) {
      if (!resources.member) {
        this.skip();
      }
      const memberId = resources.member.id;
      trello.cards(cardId).membersVoted(memberId).updateVote(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @fix: Returns "member is not on the card" error.
    it('CAR-D-08-T01 | deletes a Member on a Card', function(done) {
      if (!resources.member) {
        this.skip();
      }
      const memberId = resources.member.id;
      trello.cards(cardId).dissociateMember(memberId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-07-T01 | deletes a Label on a Card', function(done) {
      if (!resources.card.label) {
        done(new Error('Label not on Card.'));
      }
      const labelId = resources.card.label.id;
      trello.cards(cardId).dissociateLabel(labelId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-06-T01 | deletes a Checklist on a Card', function(done) {
      if (!resources.card.checklistCopy) {
        this.skip();
      }
      const checklistId = resources.card.checklistCopy.id;
      trello.cards(cardId).checklists(checklistId).deleteChecklist()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('CAR-D-05-T01 | deletes a Check Item on a Card', function(done) {
      if (!resources.card.checkItems.length) {
        this.skip();
      }
      const checkItemId = resources.card.checkItems[0].id;
      trello.cards(cardId).checkItem(checkItemId).deleteCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('CAR-D-04-T01 | deletes a Check Item on a Checklist on a Card', function(done) {
      if (!resources.card.checklist) {
        this.skip();
      }
      const checklistId = resources.card.checklist.id;
      if (!resources.card.checkItems.length) {
        this.skip();
      }
      const checkItemId = resources.card.checkItems[1].id;
      trello.cards(cardId).checklist(checklistId).checkItem(checkItemId).deleteCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-02-T01 | deletes a Comment on a Card', function(done) {
      if (!resources.comment) {
        this.skip();
      }
      const commentId = resources.comment.id;
      trello.cards(cardId).comments(commentId).deleteComment()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-01-T01 | deletes a Card', function(done) {
      trello.cards(cardId).deleteCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-01-T02 | deletes a Card converted from a Check Item', function(done) {
      if (!resources.card.convertedCard) {
        this.skip();
      }
      const convertedCardId = resources.card.convertedCard.id;
      trello.cards(convertedCardId).deleteCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('LBL-D | Label DELETE requests', function() {
    before(function(done) {
      if (!resources.labels) {
        this.skip();
      }
      setTimeout(() => { done(); }, testDelay);
    });

    it('LBL-D-01-T01 | deletes the first Label', function(done) {
      if (!resources.labels.length) {
        this.skip();
      }
      const labelId = resources.labels[0].id;
      trello.labels(labelId).deleteLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-D-01-T02 | deletes the second Label', function(done) {
      if (!resources.labels.length > 1) {
        this.skip();
      }
      const labelId = resources.labels[1].id;
      trello.labels(labelId).deleteLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('BRD-D | Board DELETE requests', function() {
    let boardId = '';

    before(function(done) {
      if (resources.board) {
        boardId = resources.board.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, testDelay);
    });

    it('BRD-D-02-T01 | deletes a PowerUp', function(done) {
      trello.boards(boardId).deletePowerUp('cardAging')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @fix: Getting "membership not found" error.
    it.skip('BRD-D-01-T01 | deletes a member', function(done) {
      if (!resources.member) {
        this.skip();
      }
      const memberId = resources.member.id;
      trello.boards(boardId).members(memberId).deleteMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ORG-D | Organization DELETE requests', function() {
    let orgId = '';

    before(function(done) {
      if (resources.org) {
        orgId = resources.org.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, testDelay);
    });

    // @todo: Need email address for this.
    it.skip('ORG-D-06-T01 | deletes the Org Invite Restriction pref', function(done) {
      trello.organizations(orgId).prefs().deleteOrgInviteRestrict('')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @fix: Getting "unauthorized organization" error.
    it.skip('ORG-D-05-T01 | deletes the Associated Domain pref', function(done) {
      trello.organizations(orgId).prefs().deleteAssociatedDomain()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('ORG-D-04-T01 | removes a Member from all Boards in the Organization', function(done) {
      if (!resources.member) {
        this.skip();
      }
      const memberId = resources.member.id;
      trello.organizations(orgId).members(memberId).dissociateMemberFromAll()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-03-T01 | removes a Member from the Organization', function(done) {
      if (!resources.member) {
        this.skip();
      }
      const memberId = resources.member.id;
      trello.organizations(orgId).members(memberId).dissociateMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-02-T01 | deletes a Logo', function(done) {
      trello.organizations(orgId).deleteLogo()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-01-T01 | deletes an Organization', function(done) {
      trello.organizations(orgId).deleteOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
