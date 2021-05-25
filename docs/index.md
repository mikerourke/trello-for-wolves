# Trello for Wolves: Resources Documentation

The docs in this directory correspond to Trello resources, so you can match up a Trello API call with the corresponding Trello for Wolves library call.

The examples in each document omit the `import` and `Trello` initialization code, so assume the following precedes each example:

```typescript
import { Trello } from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN,
});

//... Example code starts here!
```

## Resource Links

- [Actions](./actions.md)
- [Batch](./batch.md)
- [Boards](./boards.md)
- [Cards](./cards.md)
- [Checklists](./checklists.md)
- [Custom Fields](./custom-fields.md)
- [Enterprises](./enterprises.md)
- [Labels](./labels.md)
- [Lists](./lists.md)
- [Members](./members.md)
- [Notifications](./notifications.md)
- [Organizations](./organizations.md)
- [Plugins](./plugins.md)
- [Reactions](./reactions.md)
- [Search](./search.md)
- [Tokens](./tokens.md)
- [Types](./types.md)
- [Webhooks](./webhooks.md)

## Nested Resources

I tried to include the appropriate nested resources in the params for each resource (as well as the typed response).
In case you're not familiar with Nested Resources, [check out this section of the Trello docs](https://developers.trello.com/reference#understanding-nested-resources).

If you're finding that you try passing in a valid param for a nested resource, but TypeScript is throwing an error, file an issue or submit a pull request to add the params to the corresponding call.

## List Params

For params that can accept multiple values, the Trello API expects a comma-separated string.
This library allows you to specify a string or array of strings to represent the value.

**Example**

```typescript
trello
  .members("me")
  .boards()
  .getBoards({
    fields: ["desc", "name", "pinned"], // If you don't like using an array, feel free to use a comma-separated string
    filter: "closed,open,public", // <- Like so
    organizationFields: "all", // This is organization_fields in the docs
  })
  .then(/*...*/);
```

## Nested Params

Some of the params imply nesting, (e.g. the `prefs/` and `labelNames/` params for a board).
This library allows you to use nested objects instead.

**Example**

```typescript
trello
  .boards("bOaRdId")
  .updateBoard({
    name: "Hooray Board",
    prefs: {
      cardCovers: false, // "prefs/cardCovers"
      cardAging: "regular", // "prefs/cardAging"
    },
    labelNames: {
      green: "Alligator", // "labelNames/green"
      yellow: "Bananas!", // "labelNames/yellow"
    },
  })
  .then(/*...*/);
```

## Uploading Files/Adding Attachments

If you pass a `file` object into the params, it gets encoded as multipart/form-data and sent to Trello in the body of the request.
Since this library can be used in the browser or Node.js, I'm using the `form-data` library to ensure the request is sent correctly when using Node.js.

Due to this limitation, you're unable to use streams to upload attachments. So if you're using Node.js, you'll need to read the entire file before sending it to Trello.
This shouldn't be too profound of a performance hit unless you're trying to add 1GB attachments to a card. If that's the case, this library may not be for you.

You can use `fs.readFile()` to read the file contents in and specify it in the request. I'm using `fs.readFileSync()` to simplify the example.

```typescript
import fs from "fs";
import path from "path";
import { Trello } from "trello-for-wolves";

const trello = new Trello();
// ...

const attachPath = path.resolve(__dirname, "bubblegum.jpg");
const attachFile = fs.readFileSync(attachPath);

trello
  .cards("cArDiD")
  .attachments()
  .uploadAttachment({
    file: attachFile,
    name: "bubblegum.jpg",
  })
  .then((response) => response.json())
  .then((result) => {
    console.log(result); // <- Hooray!  Attachment details!
  });
```
