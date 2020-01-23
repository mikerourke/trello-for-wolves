# Actions

[Trello API Documentation](https://developers.trello.com/reference#actions)

## GET /actions/{id}

Get information about an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78?fields=all
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").getAction({ fields: "all" });
```

## GET /actions/{id}/{field}

Get a specific property of an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/type
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").getFieldValue("type");
```

## GET /actions/{id}/board

Get the board for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/board
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").board().getBoard();
```

## GET /actions/{id}/card

Get the card for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/card
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").card().getCard();
```

## GET /actions/{id}/display

Get the display information for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/display
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").getDisplay();
```

## GET /actions/{id}/list

Get the list for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/list
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").list().getList();
```

## GET /actions/{id}/member

Gets the member of an action (not the creator)

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/member
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").member().getMember();
```

## GET /actions/{id}/memberCreator

Gets the member who created the action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/memberCreator
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").memberCreator().getMember();
```

## GET /actions/{id}/organization

Get the organization of an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/organization
```

**Library**

```typescript
trello.actions("55411859be21b8ad7dcd4c78").organization().getOrganization();
```
