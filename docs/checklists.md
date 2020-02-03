# Checklists

Cards can have zero or more checklists on them.

[Trello API Documentation](https://developers.trello.com/reference#checklist)

## GET /checklists/{id}

Gets a single checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78?fields=name&cards=all&card_fields=name
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .getChecklist({ fields: "name", cards: "all", cardFields: "name" });
```

## GET /checklists/{id}/{field}

Get a specific property of a checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78/name
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .getFieldValue("name");
```

## GET /checklists/{id}/board

Gets the board associated with a checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .board()
  .getBoard();
```

## GET /checklists/{id}/cards

Gets the cards associated with a checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78/cards
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .cards()
  .getCards();
```

## GET /checklists/{id}/checkItems

Gets the check items associated with a checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78/checkItems
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .checkItems()
  .getCheckItems();
```

## GET /checklists/{id}/checkItems/{idCheckItem}

Gets a specific check item in a checklist

**API Call**

```
/GET /1/checklists/55411859be21b8ad7dcd4c78/checkItems/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .checkItems("f2c444c982eb19a7e5b5c423")
  .getCheckItem();
```

## PUT /checklists/{id}

Update an existing checklist

**API Call**

```
/PUT /1/checklists/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .updateChecklist({ name: "Test" });
```

## PUT /checklists/{id}/name

Update the name of an existing checklist

**API Call**

```
/PUT /1/checklists/55411859be21b8ad7dcd4c78/name?value=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .updateName("Test");
```

## POST /checklists

Create a new checklist

**API Call**

```
/POST /1/checklists?idCard=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .cards("f2c444c982eb19a7e5b5c423")
  .checklists()
  .addChecklist({
    name: "Test",
    pos: "top",
  });
```

## POST /checklists/{id}/checkItems

Create a new checklist check item

**API Call**

```
/POST /1/checklists/55411859be21b8ad7dcd4c78/checkItems?name=Test&pos=top&checked=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .checkItems()
  .addCheckItem({
    name: "Test",
    pos: "top",
    checked: true,
  });
```

## DELETE /checklists/{id}

Delete a checklist

**API Call**

```
/DELETE /1/checklists/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .deleteChecklist();
```

## DELETE /checklists/{id}/checkItems/{idCheckItem}

Remove an item from a checklist

**API Call**

```
/DELETE /1/checklists/55411859be21b8ad7dcd4c78/checkItems/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .checklists("55411859be21b8ad7dcd4c78")
  .checkItems("f2c444c982eb19a7e5b5c423")
  .deleteCheckItem();
```
