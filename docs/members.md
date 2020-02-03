# Members

Everyone with a Trello account is called a member.

[Trello API Documentation](https://developers.trello.com/reference#member)

## GET /members/{id}

Get a member

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78?boardBackgrounds=none&boardsInvited_fields=name
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .getMember({ boardBackgrounds: "none", boardsInvitedFields: "name" });
```

## GET /members/{id}/{field}

Get a particular property of a member

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/avatarUrl
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .getFieldValue("avatarUrl");
```

## GET /members/{id}/actions

List the actions for a member

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/actions
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .actions()
  .getActions();
```

## GET /members/{id}/boards

Lists the boards that the user is a member of

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boards?filter=all&fields=all&lists=none
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boards()
  .getBoards({ filter: "all", fields: "all", lists: "none" });
```

## GET /members/{id}/boardBackgrounds

Get a member's board backgrounds

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boardBackgrounds?filter=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardBackgrounds()
  .getBoardBackgrounds({ filter: "all" });
```

## GET /members/{id}/boardBackgrounds/{idBackground}

Get a member's board background

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boardBackgrounds/b0494da996d842cb6c35a3c3?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardBackgrounds("b0494da996d842cb6c35a3c3")
  .getBoardBackground({ fields: "all" });
```

## GET /members/{id}/boardStars

Get a member's board stars

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boardStars
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardStars()
  .getBoardStars();
```

## GET /members/{id}/boardStars/{idStar}

Get a member's board star

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boardStars/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardStars("b0494da996d842cb6c35a3c3")
  .getBoardStar();
```

## GET /members/{id}/boardsInvited

Get the boards the member has been invited to

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/boardsInvited?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardsInvited()
  .getBoards({ fields: "all" });
```

## GET /members/{id}/cards

Gets the cards a member is on

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/cards?filter=visible
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .cards()
  .getCards({ filter: "visible" });
```

## GET /members/{id}/customBoardBackgrounds

Get a member's custom board backgrounds

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customBoardBackgrounds
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customBoardBackgrounds()
  .getCustomBoardBackgrounds();
```

## GET /members/{id}/customBoardBackgrounds/{idBackground}

Get a specific custom board background

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customBoardBackgrounds/b0494da996d842cb6c35a3c3?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customBoardBackgrounds("b0494da996d842cb6c35a3c3")
  .getCustomBoardBackground({ fields: "all" });
```

## GET /members/{id}/customEmoji

Get a member's uploaded custom emoji

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customEmoji
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customEmojis()
  .getCustomEmojis();
```

## GET /members/{id}/customEmojis/{idBackground}

Get a custom emoji

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customEmojis/b0494da996d842cb6c35a3c3?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customEmojis("b0494da996d842cb6c35a3c3")
  .getCustomEmoji({ fields: "all" });
```

## GET /members/{id}/customStickers

Get a member's custom board backgrounds

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customStickers
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customStickers()
  .getCustomStickers();
```

## GET /members/{id}/customStickers/{idBackground}

Get a specific custom board background

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/customStickers/b0494da996d842cb6c35a3c3?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customStickers("b0494da996d842cb6c35a3c3")
  .getCustomSticker({ fields: "all" });
```

## GET /members/{id}/enterprises

Get the enterprises that a member belongs to

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/enterprises
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .enterprises()
  .getEnterprises();
```

## GET /members/{id}/notifications

Get a member's notifications

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/notifications?entities=false&display=false&filter=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .notifications()
  .getNotifications({ entities: false, display: false, filter: "all" });
```

## GET /members/{id}/organizations

Get a member's teams

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/organizations?fields=all&filter=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .organizations()
  .getOrganizations({ fields: "all", filter: "all" });
```

## GET /members/{id}/organizationsInvited

Get a member's teams they have been invited to

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/organizationsInvited?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .organizationsInvited()
  .getOrganizations({ fields: "all" });
```

## GET /members/{id}/savedSearches

List the saved searches of a member

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/savedSearches
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .savedSearches()
  .getSavedSearches();
```

## GET /members/{id}/savedSearches/{idSearch}

Get a saved search

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/savedSearches/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .savedSearches("b0494da996d842cb6c35a3c3")
  .getSavedSearch();
```

## GET /members/{id}/tokens

List a members app tokens

**API Call**

```
/GET /1/members/55411859be21b8ad7dcd4c78/tokens?webhooks=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .tokens()
  .getTokens({ webhooks: false });
```

## PUT /members/{id}

Update a member

**API Call**

```
/PUT /1/members/55411859be21b8ad7dcd4c78?initials=TST
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .updateMember({ initials: "TST" });
```

## PUT /members/{id}/boardBackgrounds/{idBackground}

Update a board background

**API Call**

```
/PUT /1/members/55411859be21b8ad7dcd4c78/boardBackgrounds/b0494da996d842cb6c35a3c3?brightness=light
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardBackgrounds("b0494da996d842cb6c35a3c3")
  .updateBoardBackground({ brightness: "light" });
```

## PUT /members/{id}/boardStars/{idStar}

Update the position of a starred board

**API Call**

```
/PUT /1/members/55411859be21b8ad7dcd4c78/boardStars/b0494da996d842cb6c35a3c3?pos=top
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardStars("b0494da996d842cb6c35a3c3")
  .updateBoardStar({ pos: "top" });
```

## PUT /members/{id}/customBoardBackgrounds/{idBackground}

Update a custom board background

**API Call**

```
/PUT /1/members/55411859be21b8ad7dcd4c78/customBoardBackgrounds/b0494da996d842cb6c35a3c3?brightness=light
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customBoardBackgrounds("b0494da996d842cb6c35a3c3")
  .updateCustomBoardBackground({ brightness: "light" });
```

## PUT /members/{id}/savedSearches/{idSearch}

Update a saved search

**API Call**

```
/PUT /1/members/55411859be21b8ad7dcd4c78/savedSearches/b0494da996d842cb6c35a3c3?pos=top
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .savedSearches("b0494da996d842cb6c35a3c3")
  .updateSavedSearch({ pos: "top" });
```

## POST /boards/{id}/avatar

Create a new avatar for a member

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/avatar
```

**Trello for Wolves**

```typescript
const avatarFile = new File(["test"], "avatar.png");

const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .uploadAvatar(avatarFile);
```

## POST /boards/{id}/boardBackgrounds

Upload a new board background

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/boardBackgrounds
```

**Trello for Wolves**

```typescript
const bgFile = new File(["test"], "bg.png");

const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardBackgrounds()
  .uploadBoardBackground(bgFile);
```

## POST /boards/{id}/boardStars

Star a new board

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/boardStars?idBoard=b0494da996d842cb6c35a3c3&pos=top
```

**Trello for Wolves**

```typescript
const avatarFile = new File(["test"], "avatar.png");

const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardStars()
  .addBoardStar({ idBoard: "b0494da996d842cb6c35a3c3", pos: "top" });
```

## POST /boards/{id}/customBoardBackgrounds

Upload a new custom board background

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/customBoardBackgrounds
```

**Trello for Wolves**

```typescript
const bgFile = new File(["test"], "bg.png");

const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customBoardBackgrounds()
  .uploadCustomBoardBackground({ file: bgFile, name: "Test" });
```

## POST /boards/{id}/customStickers

Upload a new custom sticker

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/customStickers
```

**Trello for Wolves**

```typescript
const stickerFile = new File(["test"], "sticker.png");

const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customStickers()
  .uploadCustomSticker(stickerFile);
```

## POST /boards/{id}/oneTimeMessagesDismissed

Dismiss a message

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/oneTimeMessagesDismissed
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .dismissOneTimeMessages("someMessage");
```

## POST /members/{id}/savedSearches

Create a new saved search

**API Call**

```
/POST /1/members/55411859be21b8ad7dcd4c78/savedSearches?name=Test&query=#label
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .savedSearches()
  .addSavedSearch({ name: "Test", query: "#label" });
```

## DELETE /members/{id}/boardBackgrounds/{idBackground}

Delete a board background

**API Call**

```
/DELETE /1/members/55411859be21b8ad7dcd4c78/boardBackgrounds/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardBackgrounds("b0494da996d842cb6c35a3c3")
  .deleteBoardBackground();
```

## DELETE /members/{id}/boardStars/{idStar}

Unstar a board

**API Call**

```
/DELETE /1/members/55411859be21b8ad7dcd4c78/boardStars/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .boardStars("b0494da996d842cb6c35a3c3")
  .deleteBoardStar();
```

## DELETE /members/{id}/customBoardBackgrounds/{idBackground}

Delete a custom board background

**API Call**

```
/DELETE /1/members/55411859be21b8ad7dcd4c78/customBoardBackgrounds/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customBoardBackgrounds("b0494da996d842cb6c35a3c3")
  .deleteCustomBoardBackground();
```

## DELETE /members/{id}/customStickers/{idSticker}

Delete a custom sticker

**API Call**

```
/DELETE /1/members/55411859be21b8ad7dcd4c78/customStickers/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .customStickers("b0494da996d842cb6c35a3c3")
  .deleteCustomSticker();
```

## DELETE /members/{id}/savedSearches/{idSearch}

Delete a saved search

**API Call**

```
/DELETE /1/members/55411859be21b8ad7dcd4c78/savedSearches/b0494da996d842cb6c35a3c3
```

**Trello for Wolves**

```typescript
const response = await trello
  .members("55411859be21b8ad7dcd4c78")
  .savedSearches("b0494da996d842cb6c35a3c3")
  .deleteSavedSearch();
```
