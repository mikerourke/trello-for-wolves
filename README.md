# Trello for Wolves

[![Coverage Status](https://coveralls.io/repos/github/mikerourke/trello-for-wolves/badge.svg?branch=master)](https://coveralls.io/github/mikerourke/trello-for-wolves?branch=master)

Node.js wrapper around Trello API...for wolves.  Don't read too much in to the
name, I just love wolves and everything else on npm with the word
*Trello* is taken.

## Installation

#### npm

```
$ npm install trello-for-wolves
```

#### yarn

```
$ yarn add trello-for-wolves
```

#### biscuits*

```
$ biscuits gravy trello-for-wolves
```

&ast; There's no such thing as `biscuits`

## Documentation

[Trello API Documentation](https://developers.trello.com/advanced-reference)

## Prerequisites

You'll need the following things to use this library:

1. [Trello Account](https://trello.com/signup)
2. [Trello API Key](https://trello.com/app-key)
3. [Trello Auth Token](https://developers.trello.com/authorize)

To get the whole kit and caboodle in terms of what you can do with the API, you 
should include `read`, `write`, and `account` for the `scope`.

## Quick Overview

I created this library because I wanted to cover all of the Trello routes and
make it freakishly easy to figure out how to utilize the API by simply reading
the Trello documentation.  It uses chaining to build a "route" so to speak.

I'm using `whatwg-fetch` for making requests, so you can use this library in the
browser or Node.js.

This library is built with TypeScript, so it'll show you a handy autocomplete 
when cooking up code.  However, it's probably a good idea to have the Trello API 
docs up while you're coding, because some of these routes 
have [a whole bunch of options for arguments](https://developers.trello.com/v1.0/reference#boards-nested-resource).

## Rate Limits

Trello imposes [API rate limits](http://help.trello.com/article/838-api-rate-limits).  You can 
make no more than 100 requests in 10 seconds per token or 300 requests in 10 seconds per key.  I
added code to retry the request if a `429` error is returned. It waits about a second and retries
the request.

You can override the default `backoffTime` (1000) and `maxRetryAttempts` (5) with your
own options depending on your requirements.  You can pass them into the Trello constructor:
```typescript
import Trello from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN,
  backoffTime: 1000, // Amount of time to wait before attempting to make another API call.
  maxRetryAttempts: 3, // Maximum amount of attempts to make before failing.
});
```

## Examples

### Authorization

You'll need to create a new instance of `Trello` and pass in an "trelloConfig" object
containing a `key` and `token`.  There isn't any async voodoo associated with
this, the credentials are passed to each function call through the magic of
class constructors.

Here's what you'll need to do from the get-go:
```typescript
import Trello from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN
});
```

### A Note about Argument Casing

The Trello API uses [snake case](https://en.wikipedia.org/wiki/Snake_case) 
for their arguments.  I am not a big fan of snake case and JavaScript is all
about the camel case, so anywhere in the docs where you see an argument with
a `_`, camel case-ify it.

### The Meat and Potatoes

Below are some examples of the fun stuff you can do with the library.  The routes
are built based on how you chain the function call, so you're limited only by
your imagination and what routes actually exist.

#### Example: Get the Boards associated with your account

Trello Endpoint:

`GET /1/members/me/boards&fields=desc,name,pinned&filter=closed,...`

[Trello API Link](https://developers.trello.com/v1.0/reference#membersidboards)

```typescript
trello.members('me').boards().getBoards({
  fields: ['desc', 'name', 'pinned'], // If you don't like using an array, feel free to use a comma-separated string
  filter: 'closed,open,public', // <- Like so
  organization: true,
  organizationFields: 'all', // This is organization_fields in the docs
  lists: 'all'
})
  .then(response => response.json())
  .then((result) => {
    console.log(result);  // <- Hooray! An array of Boards!
  })
  .catch(error => console.log(`Oh no!, this happened: ${error}`));
```

#### Example: Update a Board

Trello Endpoint:

`PUT /1/boards/bOaRdId?name=Hooray&prefs/cardCovers=false&...`

[Trello API Link](https://developers.trello.com/v1.0/reference#idnext)

```typescript
// In the docs, the "prefs" and "labelNames" arguments use a "/" for
// nesting, which is a little nasty.  I made them nested objects
// instead because I'm a good guy and I'm looking out for you.

trello.boards('bOaRdId').updateBoard({
  name: 'Hooray Board',
  prefs: {
    cardCovers: false, // "prefs/cardCovers"
    cardAging: 'regular' // "prefs/cardAging"
  },
  labelNames: {
    green: 'Alligator', // "labelNames/green"
    yellow: 'Bananas!' // "labelNames/yellow"
  }
})
  .then(response => response.json())
  .then((result) => {
    console.log(result);  // <- Hooray! A single updated Board!
  })
  .catch(error => console.log(`Oh no!, not again!: ${error}`));
```

#### Example: Batch some requests

Trello Endpoint:

`GET /1/batch/?urls=/boards/bOaRdId/lists,/cards/cArDiD&key=...`

[Trello API Link](https://developers.trello.com/v1.0/reference#batch-1)

If you just need to make a bunch of `GET` requests, you can get around the API rate limits by doing
a little batchy-doodle.

```typescript
trello.batch().makeRequests([
  '/boards/bOaRdId/lists',
  '/cards/cArDiD'
])
  .then(response => response.json())
  .then((result) => {
      console.log(result); 
      /* 
        This one is a little funky, it looks like this:
        [
          {
            "200": [
              {
                "id": "lIsTiD"
                ...
              }
            ]
          },
          {
            "200": {
              "id": "cArDiD"
              ...
            }
          }
        ]
      */
  })
  .catch(error => console.log(`Seriously!?: ${error}`));
```

#### Example: Add an Attachment to a Card

Trello Endpoint:

`POST /1/cards/cArDiD/attachments`

[Trello API Link](https://developers.trello.com/v1.0/reference#cardsidattachments-1)

There's actually a few different ways to add attachments to cards.  Thanks 
to [blesson3](https://github.com/blesson3) for providing me with the code.

##### Attaching text to card using `fs.createReadStream()`

```typescript
  import fs from "fs";
  import path from "path";
  import Trello from "trello-for-wolves";

  const trello = new Trello(
    // ...
  );

  const attachPath = path.resolve(__dirname, 'bubblegum.jpg');
  const attachFile = fs.createReadStream(attachPath);
  trello.cards('cArDiD').attachments().uploadAttachment({
    file: attachFile,
    name: 'bubblegum.jpg',
  })
  .then(response => response.json())
  .then((result) => {
    console.log(result); // <- Hooray!  Attachment details!
  })
  .catch(error => console.log(`Something went awry: ${error}`));
```

##### Attaching text to card with a temporary file using the [`tmp` library](https://www.npmjs.com/package/tmp)

```typescript
  import fs from "fs";
  import tmp from "tmp"
  import Trello from "trello-for-wolves";
  
  const trello = new Trello(
    // ...
  );

  const attachTextToCardUsingTmp = (cardId, name, contentString, callback) => {
    // Create a temporary file to put the content into, then create a read stream from that
    // to pass into the library to create an attachment:
    tmp.file({ postfix: '.txt' }, (err, path, fd, cleanupCallback) => {
      fs.writeFile(path, contentString, (error) => {
        const fileStream = fs.createReadStream(path);
        trello.cards(cardId).attachments().uploadAttachment({
          file: fileStream,
          name,
        })
        .then(response => response.json())
        .then((result) => {
          cleanupCallback();
          callback(result);
        })
        .catch((error) => {
          cleanupCallback();
          callback(undefined, error);
        })
      })
    })
  };
  
  const testingText = 'This is some testing text for the attachment';
  attachTextToCardUsingTmp('cArDiD', 'testing.txt', testingText, (data, error) => {
    if (error) {
      console.log("ERROR: " + error);
    } else {
      console.log("DATA: " + JSON.stringify(data));
    }
  });
```

##### Attaching text to card using a Readable stream

```typescript
  import { Readable } from "stream";
  import Trello from "trello-for-wolves";

  const trello = new Trello(
    // ...
  );
  
  attachTextToCardUsingReadable = (cardId, name, contentString, callback) => {
    // We have to build a stream for the content:
    const readable = new Readable;
    readable.push(contentString);
    readable.push(null);
    
    trello.cards(cardId).attachments().uploadAttachment({
      file: readable,
      name,
      mimeType: 'text/plain',
    })
    .then(response => response.json())
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      callback(undefined, error);
    })
  }
```

### Development

If you want to fix or fanagle something, bring it.  I'm happy for the help.  I'm
currently having a bit of an issue getting some of the tests to pass that may
be related to my membership level.  I'd love to have someone try to get the
other routes working.

## License

MIT license. See the [LICENSE](./LICENSE.md) file for details.
