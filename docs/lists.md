# Lists

Lists are on boards and contain zero or many cards.

[Trello API Documentation](https://developers.trello.com/reference#lists)

## GET /lists/{id}

Get information about a list

**API Call**

```
/GET /1/lists/55411859be21b8ad7dcd4c78?fields=name,closed,idBoard,pos
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .getList({ fields: ["name", "closed", "idBoard", "pos"] });
```

## GET /lists/{id}/{field}

Get a specific property of a list

**API Call**

```
/GET /1/lists/55411859be21b8ad7dcd4c78/name
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .getFieldValue("name");
```

## GET /lists/{id}/actions

Gets the actions associated with a list

**API Call**

```
/GET /1/lists/55411859be21b8ad7dcd4c78/actions
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .actions()
  .getActions();
```

## GET /lists/{id}/board

Gets the board associated with a list

**API Call**

```
/GET /1/lists/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .board()
  .getBoard();
```

## GET /lists/{id}/cards

Gets the cards associated with a list

**API Call**

```
/GET /1/lists/55411859be21b8ad7dcd4c78/cards
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .cards()
  .getCards();
```

## PUT /lists/{id}

Update an existing list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updateList({ name: "Test" });
```

## PUT /lists/{id}/closed

Archive or unarchive a list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/closed?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updateClosedStatus(true);
```

## PUT /lists/{id}/idBoard

Move a list to a new board

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/idBoard?value=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .moveToBoard("f2c444c982eb19a7e5b5c423");
```

## PUT /lists/{id}/name

Rename a list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/name?value=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updateName("Test");
```

## PUT /lists/{id}/pos

Change the position of a list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/pos?value=top
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updatePosition("top");
```

## PUT /lists/{id}/softLimit

Set a soft limit for number of cards in the list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/softLimit?value=1000
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updateSoftLimit(1000);
```

## PUT /lists/{id}/subscribed

Subscribe or unsubscribe from a list

**API Call**

```
/PUT /1/lists/55411859be21b8ad7dcd4c78/subscribed?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .updateSubscribed(true);
```

## POST /lists

Create a new list on a board

**API Call**

```
/POST /1/lists?name=name&idBoard=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("f2c444c982eb19a7e5b5c423")
  .lists()
  .addList({
    name: "Test",
    pos: "top",
  });
```

## POST /lists/{id}/archiveAllCards

Archive all cards in a list

**API Call**

```
/POST /1/lists/55411859be21b8ad7dcd4c78/archiveAllCards
```

**Trello for Wolves**

```typescript
const response = await trello
  .lists("55411859be21b8ad7dcd4c78")
  .archiveAllCards();
```

## POST /lists/{id}/moveAllCards

Move all cards in a list

**API Call**

```
/POST /1/lists/55411859be21b8ad7dcd4c78/moveAllCards?idBoard=3b9449f1b7d6de3483c1e5d8&idCard=ff584d8ba217fb7d64fb9db0
```

**Trello for Wolves**

```typescript
const response = await trello.lists("55411859be21b8ad7dcd4c78").moveToBoard({
  idBoard: "3b9449f1b7d6de3483c1e5d8",
  idList: "ff584d8ba217fb7d64fb9db0",
});
```
