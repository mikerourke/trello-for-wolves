# Custom Fields

Custom Fields are extra bits of structured data attached to cards when our users need
a bit more than what Trello provides.

To use them users need to enable the [Custom Fields Power-Up](http://help.trello.com/article/1067-using-the-custom-fields-power-up).

[Trello API Documentation](https://developers.trello.com/reference#custom-fields)

## GET /customFields/{id}

Gets a single custom field

**API Call**

```
/GET /1/customFields/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .getCustomField();
```

## GET /customFields/{id}/options

Get the options of a drop down custom field

**API Call**

```
/GET /1/customFields/55411859be21b8ad7dcd4c78/options
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .options()
  .getOptions();
```

## GET /customFields/{id}/options/{idCustomFieldOption}

Get a specific option for a drop down custom field

**API Call**

```
/GET /1/customFields/55411859be21b8ad7dcd4c78/options/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .options("f2c444c982eb19a7e5b5c423")
  .getOption();
```

## GET /boards/{id}/customFields

Get the custom field definitions that exist on a board

**API Call**

```
/GET /1/boards/f2c444c982eb19a7e5b5c423/customFields
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("f2c444c982eb19a7e5b5c423")
  .customFields()
  .getCustomFields();
```

## PUT /customFields/{id}

Update a custom field definition

**API Call**

```
/PUT /1/customFields/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .updateCustomField({ name: "Test" });
```

## POST /customFields

Create a new custom field definition. Note that you don't need to specify the
`idModel` or `modelType` properties, since the custom field can only be
associated with a board. In lieu of setting those params, you need to call the
`addCustomField()` method from `.boards("[BOARD ID]").customFields().addCustomField()`.

**API Call**

```
curl -X POST -H "Content-Type: application/json" \
https://api.trello.com/1/customFields \
-d '{
  idModel: "f2c444c982eb19a7e5b5c423",
  modelType: "board",
  name: "My Dropdown",
  options: [,
    { color: "none", value: { text: "First Option" }, pos: 1024 },
    { color: "none", value: { text: "Second Option" }, pos: 2048 }
  ],
  pos: "bottom",
  type: "list",
  display_cardFront: false
}'
```

**Trello for Wolves**

```typescript
const response = await trello
  .boards("f2c444c982eb19a7e5b5c423")
  .customFields()
  .addCustomField({
    name: "My Dropdown",
    pos: "bottom",
    type: "list",
    displayCardFront: false,
    options: [
      { color: "none", value: { text: "First Option" }, pos: 1024 },
      { color: "none", value: { text: "Second Option" }, pos: 2048 },
    ],
  });
```

## POST /customFields/{id}/options

Create a new custom field definition option

**API Call**

```
curl -X POST -H "Content-Type: application/json" \
https://api.trello.com/1/customField/5ab0fae54cdab797ed6b206e/options \
-d '{
  "value": { "text": "Bad" },
  "color": "red",
  "pos": "bottom"
}'

```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("5ab0fae54cdab797ed6b206e")
  .options()
  .addOption({
    value: { text: "Bad" },
    color: "red",
    pos: "bottom",
  });
```

## DELETE /customFields/{id}

Delete a custom field from a board

> Deleting a custom field definition will also delete all of the values across
> all cards that have been set for that custom field. There is no way to get
> those values back after they have been deleted.

**API Call**

```
/DELETE /1/customFields/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .deleteCustomField();
```

## DELETE /customFields/{id}/options/{idCustomFieldOption}

Delete an option from a custom field dropdown

**API Call**

```
/DELETE /1/customFields/55411859be21b8ad7dcd4c78/options/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .customFields("55411859be21b8ad7dcd4c78")
  .options("f2c444c982eb19a7e5b5c423")
  .deleteOption();
```
