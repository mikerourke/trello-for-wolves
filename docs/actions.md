# Actions

Actions are generated whenever an action occurs in Trello. For instance, when a user deletes a 
card, a `deleteCard` action is generated and includes information about the deleted card, the 
list the card was in, the board the card was on, the user that deleted the card, and the 
`idObject` of the action. Actions for Trello objects can be listed from nested action 
endpoints - e.g. the resource GET `/1/boards/{board_id}/actions` lists all of the actions 
for the given board. Additionally, data regarding individual action objects can be 
retrieved and updated using the resources listed below.

[Trello API Documentation](https://developers.const response = await trello.com/reference#actions)

## GET /actions/{id}

Get information about an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .getAction({ fields: "all" });
```

## GET /actions/{id}/{field}

Get a specific property of an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/type
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .getFieldValue("type");
```

## GET /actions/{id}/board

Get the board for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .board()
  .getBoard();
```

## GET /actions/{id}/card

Get the card for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/card
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .card()
  .getCard();
```

## GET /actions/{id}/display

Get the display information for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/display
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .getDisplay();
```

## GET /actions/{id}/list

Get the list for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/list
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .list()
  .getList();
```

## GET /actions/{id}/member

Gets the member of an action (not the creator)

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/member
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .member()
  .getMember();
```

## GET /actions/{id}/memberCreator

Gets the member who created the action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/memberCreator
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .memberCreator()
  .getMember();
```

## GET /actions/{id}/organization

Get the organization of an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/organization
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .organization()
  .getOrganization();
```

## PUT /actions/{id}

Update a comment action

> You can only use PUT on commentCard actions to update the comment. PUTing a new text value will 
> also update the comment on the card. You can only update the comment as the member who wrote the 
> comment, or a member with greater permissions.

**API Call**

```
/PUT /1/actions/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .updateAction({ text: "Some text" });
```

## PUT /actions/{id}/text

Update a comment action's text

> You can only use PUT on commentCard actions to update the comment. PUTing a new text value will 
> also update the comment on the card. You can only update the comment as the member who wrote the 
> comment, or a member with greater permissions.

**API Call**

```
/PUT /1/actions/55411859be21b8ad7dcd4c78/text
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .updateText("Some text");
```

## DELETE /actions/{id}

Delete a comment action

> You can only use DELETE on commentCard actions. Deleting a commentCard action will also delete 
> the comment on the card. You can only delete a commentCard action if you are the one that 
> created the comment, you have more permissions on the board than the person that created 
> the comment, or the person that created the comment has deleted their account.

**API Call**

```
/DELETE /1/actions/55411859be21b8ad7dcd4c78/text
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .deleteAction();
```
