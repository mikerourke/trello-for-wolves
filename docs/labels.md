# Labels

Labels are defined per board, and can be applied to the cards on that board.

[Trello API Documentation](https://developers.trello.com/reference#labels)

## GET /labels/{id}

Get information about a label by ID

**API Call**

```
/GET /1/labels/55411859be21b8ad7dcd4c78?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .labels("55411859be21b8ad7dcd4c78")
  .getLabel({ fields: "all" });
```

## PUT /labels/{id}

Update a label by ID

**API Call**

```
/PUT /1/labels/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .labels("55411859be21b8ad7dcd4c78")
  .updateLabel({ name: "Test" });
```

## PUT /labels/{id}/color

Update the color of a label by ID

**API Call**

```
/PUT /1/labels/55411859be21b8ad7dcd4c78/color?value=green
```

**Trello for Wolves**

```typescript
const response = await trello
  .labels("55411859be21b8ad7dcd4c78")
  .updateColor("green");
```

## PUT /labels/{id}/name

Update the name of a label by ID

**API Call**

```
/PUT /1/labels/55411859be21b8ad7dcd4c78/name?value=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .labels("55411859be21b8ad7dcd4c78")
  .updateName("Test");
```

## POST /labels

Create a new label on a board

**API Call**

```
/POST /1/labels?name=Test&color=black&idBoard=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("f2c444c982eb19a7e5b5c423")
  .labels()
  .addLabel({
    name: "Test",
    color: "black",
  });
```

## DELETE /labels/{id}

Delete a label by ID

**API Call**

```
/DELETE /1/labels/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello.labels("55411859be21b8ad7dcd4c78").deleteLabel();
```
