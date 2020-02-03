# Boards

Boards are fundamental to Trello. A board may belong to 0 or 1 teams and can have
0 or more lists.

[Trello API Documentation](https://developers.trello.com/reference#boards-2)

## GET /boards/{id}

Request a single board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78?actions=all&boardStars=none&cards=none
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .getBoard({ actions: "all", boardStars: "none", cards: "none" });
```

## GET /boards/{id}/{field}

Request a single board's field value

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/shortUrl
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .getFieldValue("shortUrl");
```

## GET /boards/{id}/actions

Request a single board's actions

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/actions
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .actions()
  .getActions();
```

## GET /boards/{id}/boardPlugins

Get the enabled Power-Ups on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/boardPlugins
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .getBoardPlugins();
```

## GET /boards/{id}/boardStars

Get the stars on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/boardStars
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .boardStars()
  .getBoardStars();
```

## GET /boards/{id}/cards

Get the cards on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/cards
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .cards()
  .getCards();
```

## GET /boards/{id}/cards/{filter}

Get the filtered cards on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/cards/closed
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .cards()
  .getCardsFilteredBy("closed");
```

## GET /boards/{id}/cards/{id}

Get a specific card for a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/cards/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .cards("f2c444c982eb19a7e5b5c423")
  .getCard();
```

## GET /boards/{id}/checklists

Get the checklists on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/checklists?checkItem_fields=name&fields=name
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .checklists()
  .getChecklists({ checkItemFields: "name", fields: "name" });
```

## GET /boards/{id}/customFields

Get the Custom Field Definitions that exist on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/customFields
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .customFields()
  .getCustomFields();
```

## GET /boards/{id}/labels

Get the labels that exist on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/labels?fields=all&limit=50
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .labels()
  .getLabels({ fields: "all", limit: 50 });
```

## GET /boards/{id}/lists

Get the lists on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/lists?cards=none&card_fields=all&filter=open&fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .lists()
  .getLists({
    cards: "none",
    cardFields: "all",
    filter: "open",
    fields: "all",
  });
```

## GET /boards/{id}/lists/{filter}

Get the filtered lists on a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/lists/closed
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .lists()
  .getLists("closed");
```

## GET /boards/{id}/members

Get the members for a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/members
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .members()
  .getMembers();
```

## GET /boards/{id}/memberships

Get information about the memberships users have to the board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/memberships?orgMemberType=true&member=true&member_fields=fullName
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .memberships()
  .getMemberships({
    orgMemberType: true,
    member: true,
    memberFields: "fullName",
  });
```

## GET /boards/{id}/plugins

List the Power-Ups for a board

**API Call**

```
/GET /1/boards/55411859be21b8ad7dcd4c78/plugins?filter=enabled
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .plugins()
  .getPlugins({ filter: "enabled" });
```

## PUT /boards/{id}

Update an existing board by id

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .updateBoard({ name: "Test" });
```

## PUT /boards/{id}/members

Associates a member with a board (by email address)

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/members?email=test@stuff.com&type=normal
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .members()
  .associateMember({ email: "test@stuff.com", type: "normal" });
```

## PUT /boards/{id}/members/{idMember}

Associates a member with a board (by member ID)

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/members/f2c444c982eb19a7e5b5c423?type=admin&allowBillableGuest=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .associateMember({ type: "admin", allowBillableGuest: false });
```

## PUT /boards/{id}/myPrefs/emailPosition

Updates the email position pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/emailPosition?value=top
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateEmailPosition("top");
```

## PUT /boards/{id}/myPrefs/idEmailList

Moves the board to the specified email list

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/idEmailList?value=b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .moveToEmailList("b0494da996d842cb6c35a3c3");
```

## PUT /boards/{id}/myPrefs/showListGuide

Updates the show list guide pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/showListGuide?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateShowListGuide(true);
```

## PUT /boards/{id}/myPrefs/showSidebar

Updates the show sidebar pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/showSidebar?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateShowSidebar(true);
```

## PUT /boards/{id}/myPrefs/showSidebarActivity

Updates the show sidebar activity pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/showSidebarActivity?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateShowSidebarActivity(true);
```

## PUT /boards/{id}/myPrefs/showSidebarBoardActions

Updates the show sidebar board actions pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/showSidebarBoardActions?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateShowSidebarBoardActions(true);
```

## PUT /boards/{id}/myPrefs/showSidebarMembers

Updates the show sidebar members pref on a board

**API Call**

```
/PUT /1/boards/55411859be21b8ad7dcd4c78/myPrefs/showSidebarMembers?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .myPrefs()
  .updateShowSidebarMembers(true);
```

## POST /boards

Create a new board

**API Call**

```
/POST /1/boards?name=Test&defaultLabels=true&defaultLists=true&keepFromSource=none
```

**Trello for Wolves**

```typescript
const response = await trello.boards().addBoard({
  name: "Test",
  defaultLabels: true,
  defaultLists: true,
  keepFromSource: "none",
});
```

## POST /boards/{id}/boardPlugins

Enable a Power-Up on a board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/boardPlugins?idPlugin=aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .enableBoardPlugin("aa7e45b4a9db83668c421556");
```

## POST /boards/{id}/calendarKey/generate

Generates a calendar key for a board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/calendarKey/generate
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .generateCalendarKey();
```

## POST /boards/{id}/emailKey/generate

Generates an email key for a board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/emailKey/generate
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .generateEmailKey();
```

## POST /boards/{id}/idTags

Adds an organization tag to the board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/idTags?value=aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .addTag("aa7e45b4a9db83668c421556");
```

## POST /boards/{id}/labels

Adds a label to the board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/labels?Test=name&color=black
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .labels()
  .addLabel({ name: "Test", color: "black" });
```

## POST /boards/{id}/lists

Adds a list to the board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/lists?name=Test&pos=top
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .lists()
  .addList({ name: "Test", pos: "top" });
```

## POST /boards/{id}/markedAsViewed

Marks the board as viewed

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/markedAsViewed
```

**Trello for Wolves**

```typescript
const response = await trello.boards("55411859be21b8ad7dcd4c78").markAsViewed();
```

## POST /boards/{id}/powerUps

Enable a Power-Up on a board

**API Call**

```
/POST /1/boards/55411859be21b8ad7dcd4c78/powerUps?value=aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .enablePowerUp("aa7e45b4a9db83668c421556");
```

## DELETE /boards/{id}

Delete a board

**API Call**

```
/DELETE /1/boards/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello.boards("55411859be21b8ad7dcd4c78").deleteBoard();
```

## DELETE /boards/{id}/boardPlugins/{idPlugin}

Disable a Power-Up on a board

**API Call**

```
/DELETE /1/boards/55411859be21b8ad7dcd4c78/boardPlugins/aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .disableBoardPlugin("aa7e45b4a9db83668c421556");
```

## DELETE /boards/{id}/members/{idMember}

Removes a member from a board

**API Call**

```
/DELETE /1/boards/55411859be21b8ad7dcd4c78/members/aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .members("aa7e45b4a9db83668c421556")
  .dissociateMember();
```

## DELETE /boards/{id}/powerUps/{powerUp}

Disable a Power-Up on a board

**API Call**

```
/DELETE /1/boards/55411859be21b8ad7dcd4c78/powerUps/aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("55411859be21b8ad7dcd4c78")
  .disablePowerUp("aa7e45b4a9db83668c421556");
```
