# Cards

Lists in Trello contain cards. A card belongs to exactly one list. For display
purposes, cards can have a front and a back.

[Trello API Documentation](https://developers.trello.com/reference#cards-1)

## GET /cards/{id}

Gets a single card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78?attachments=false&attachment_fields=all&members=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .getCard({ attachments: false, attachmentFields: "all", members: false });
```

## GET /cards/{id}/{field}

Get a specific property of a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/dueComplete
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .getFieldValue("dueComplete");
```

## GET /cards/{id}/actions

List the actions on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/actions
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .actions()
  .getActions();
```

## GET /cards/{id}/attachments

List the attachments on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/attachments
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .attachments()
  .getAttachments();
```

## GET /cards/{id}/attachments/{idAttachment}

Get a specific attachment on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/attachments/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .attachments("f2c444c982eb19a7e5b5c423")
  .getAttachment();
```

## GET /cards/{id}/board

Get the board a card is on

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .boards()
  .getBoard();
```

## GET /cards/{id}/checkItemStates

Get the check item states on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checkItemStates()
  .getCheckItemStates();
```

## GET /cards/{id}/checklists

Get the checklists on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/checklists?checkItems=all&checkItem_fields=name
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checklists()
  .getChecklists({ checkItems: "all", checkItemFields: "name" });
```

## GET /cards/{id}/checkItem/{idCheckItem}

Get a specific checkItem on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/checkItem/f2c444c982eb19a7e5b5c423?fields=name
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checkItem("f2c444c982eb19a7e5b5c423")
  .getCheckItem({ fields: "name" });
```

## GET /cards/{id}/customFieldItems

Get the custom field items for a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/customFieldItems
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .customFieldItems()
  .getCustomFieldItems();
```

## GET /cards/{id}/list

Get the list a card is on

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/list
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .list()
  .getList();
```

## GET /cards/{id}/members

Get the members on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/members
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .members()
  .getMembers();
```

## GET /cards/{id}/membersVoted

Get the members who have voted on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/membersVoted?fields=avatarHash,fullName
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .membersVoted()
  .getMembers({ fields: ["avatarHash", "fullName"] });
```

## GET /cards/{id}/pluginData

Get any shared pluginData on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/pluginData
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .getPluginData();
```

## GET /cards/{id}/stickers

Get the stickers on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/stickers?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .stickers()
  .getStickers({ fields: "all" });
```

## GET /cards/{id}/stickers/{idSticker}

Get a specific sticker on a card

**API Call**

```
/GET /1/cards/55411859be21b8ad7dcd4c78/stickers/f2c444c982eb19a7e5b5c423?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .stickers("f2c444c982eb19a7e5b5c423")
  .getSticker({ fields: "all" });
```

## PUT /cards/{id}

Update a card

**API Call**

```
/PUT /1/cards/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .updateCard({ name: "Test" });
```

## PUT /cards/{id}/actions/{idAction}/comments

Update an existing comment

> Only the original author of a comment can update it.

**API Call**

```
/PUT /1/cards/55411859be21b8ad7dcd4c78/actions/f2c444c982eb19a7e5b5c423/comments?text=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .actions("f2c444c982eb19a7e5b5c423")
  .updateAction({ text: "Test" });

// Use the nifty `comments()` object: 
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .comments("f2c444c982eb19a7e5b5c423")
  .updateAction({ text: "Test" });
```

## PUT /cards/{id}/checkItem/{idCheckItem}

Update an item in a checklist on a card

**API Call**

```
/PUT /1/cards/55411859be21b8ad7dcd4c78/checkItem/f2c444c982eb19a7e5b5c423?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checkItem("f2c444c982eb19a7e5b5c423")
  .updateCheckItem({ name: "Test" });
```

## PUT /cards/{id}/checklist/{idChecklist}/checkItem/{idCheckItem}

Update an item in a checklist on a card

**API Call**

```
/PUT /1/cards/55411859be21b8ad7dcd4c78/checkItem/f2c444c982eb19a7e5b5c423/checkItem/dd7d4048bed6c23daebf1070?pos=bottom
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checklist("f2c444c982eb19a7e5b5c423")
  .checkItem("dd7d4048bed6c23daebf1070")
  .updateCheckItem({ pos: "top" });
```

## PUT /cards/{id}/stickers/{idSticker}

Update a sticker on a card

**API Call**

```
/PUT /1/cards/55411859be21b8ad7dcd4c78/stickers/f2c444c982eb19a7e5b5c423?top=20&zIndex=6
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .stickers("f2c444c982eb19a7e5b5c423")
  .updateSticker({ top: 20, zIndex: 6 });
```

## POST /cards

Create a new card

**API Call**

```
/POST /1/cards?idList=f2c444c982eb19a7e5b5c423&keepFromSource=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .cards()
  .addCard({
    name: "Test",
    defaultLabels: true,
    defaultLists: true,
    keepFromSource: "none"
  });
```

## POST /cards/{id}/actions/comments

Add a new comment to a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/actions/comments?text=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .comments()
  .addComment({ text: "Test" });
```

## POST /cards/{id}/attachments

Add an attachment to a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/attachments
```

**Trello for Wolves**

### Uploading Attachment Using `fs.readFile()`/`fs.readFileSync()`

```typescript
import fs from "fs";
import path from "path";
import Trello from "trello-for-wolves";

const trello = new Trello({
  key: "KEY",
  token: "TOKEN"
});

const attachPath = path.resolve(__dirname, 'bubblegum.jpg');
const attachFile = fs.readFileSync(attachPath);

const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .attachments()
  .uploadAttachment({ file: attachFile });
```

### Uploading Attachment Using `tmp`

// TODO: Update example!

## POST /cards/{id}/checklists

Create a new checklist on a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/checklists?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checklists()
  .addChecklist({ name: "Test" });
```

## POST /cards/{id}/idLabels

Associates a label with a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/idLabels?value=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .labels("f2c444c982eb19a7e5b5c423")
  .associateLabel();
```

## POST /cards/{id}/idMembers

Associates a member with a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/idMembers?value=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .associateMember();
```

## POST /cards/{id}/labels

Add a new label to a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/labels?color=green
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .labels()
  .addLabel({ color: "green" });
```

## POST /cards/{id}/markAssociatedNotificationsRead

Mark notifications about this card as read

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/markAssociatedNotificationsRead
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .markAssociatedNotificationsRead();
```

## POST /cards/{id}/membersVoted

Vote on the card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/membersVoted?value=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .voteOnCard();
```

## POST /cards/{id}/stickers

Add a sticker to a card

**API Call**

```
/POST /1/cards/55411859be21b8ad7dcd4c78/stickers?image=taco-cool&top=50&left=50&zIndex=1
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .stickers()
  .addSticker({
    image: "taco-cool",
    top: 50,
    left: 50,
    zIndex: 1
  });
```

## DELETE /cards/{id}

Delete a card

> Deleting a card cannot be undone. Its safer to mark the card as closed (archived).

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .deleteCard();
```

## DELETE /cards/{id}/actions/{idAction}/comments

Delete a comment

> This can only be done by the original author of the comment, or someone with 
> higher permissions than the original author.

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/actions/f2c444c982eb19a7e5b5c423/comments
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .comments("f2c444c982eb19a7e5b5c423")
  .deleteComment();
```

## DELETE /cards/{id}/attachments/{idAttachment}

Delete an attachment

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/attachments/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .attachments("f2c444c982eb19a7e5b5c423")
  .deleteAttachment();
```

## DELETE /cards/{id}/checkItem/{idCheckItem}

Delete a checklist item

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/checkItem/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checkItem("f2c444c982eb19a7e5b5c423")
  .deleteCheckItem();
```

## DELETE /cards/{id}/checklists/{idChecklist}

Delete a checklist from a card

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/checklists/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .checklists("f2c444c982eb19a7e5b5c423")
  .deleteChecklist();
```

## DELETE /cards/{id}/idLabels/{idLabel}

Remove a label from a card

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/idLabels/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .labels("f2c444c982eb19a7e5b5c423")
  .dissociateLabel();
```

## DELETE /cards/{id}/idMembers/{idMember}

Remove a member from a card

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/idMembers/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .dissociateMember();
```

## DELETE /cards/{id}/membersVoted/{idMember}

Remove a member's vote from a card

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/membersVoted/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .removeVoteFromCard();
```

## DELETE /cards/{id}/stickers/{idSticker}

Remove a sticker from the card

**API Call**

```
/DELETE /1/cards/55411859be21b8ad7dcd4c78/stickers/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("55411859be21b8ad7dcd4c78")
  .stickers("f2c444c982eb19a7e5b5c423")
  .removeSticker();
```
