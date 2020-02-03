# Trello for Wolves

[![Coverage Status](https://coveralls.io/repos/github/mikerourke/trello-for-wolves/badge.svg?branch=master)](https://coveralls.io/github/mikerourke/trello-for-wolves?branch=master)

Node.js wrapper around Trello API...for wolves.  Don't read too much in to the name, I just love wolves and everything else on npm with the word *Trello* is taken.

I created this library because I wanted to cover all of the Trello routes and make it freakishly easy to figure out how to utilize the API by simply reading the Trello documentation.
It uses chaining to build a "route" so to speak.

I'm using `cross-fetch` for making requests, so you can use this library in the browser or Node.js.

This library is built with TypeScript, so it'll show you a handy autocomplete when cooking up code.
However, it's probably a good idea to have the Trello API docs up while you're coding, because some of these routes have [a whole bunch of options for arguments](https://developers.trello.com/reference#boardsboardid-1).

To get started right away, check out the [Resources Documentation](./docs/index.md) in the `/docs` directory.

**If you're upgrading from version 1, please make sure you review the [Version 2 Breaking Changes](#version-2-breaking-changes) section!**

## Installation

### npm

```
$ npm install trello-for-wolves
```

### yarn

```
$ yarn add trello-for-wolves
```

### biscuits*

```
$ biscuits gravy trello-for-wolves
```

&ast; There's no such thing as `biscuits`

## Documentation

- [Trello API Documentation](https://developers.trello.com/advanced-reference)
- [Trello for Wolves Resources Documentation](./docs/index.md)

## Prerequisites

- Node.js >= v10

## Getting Started

You'll need the following things from Trello to use this library:

1. [Trello Account](https://trello.com/signup)
2. [Trello API Key](https://trello.com/app-key)
3. [Trello Auth Token](https://developers.trello.com/authorize)

To get the whole kit and caboodle in terms of what you can do with the API, you should include `read`, `write`, and `account` for the `scope`.

You'll need to create a new instance of `Trello` and pass in an "trelloConfig" object containing a `key` and `token`.
There isn't any async voodoo associated with this, the credentials are passed to each function call through the magic of class constructors.

In order to make library calls, you call methods from the `trello` instance. Every method returns a Promise, so you can use `async`/`await`!

**Note: The library adheres to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for both the browser and Node.js.
This means that a failed request does not throw an error if the request fails, it sets the `ok` value of the response to `false`.
You'll need to use a library like [`fetch-intercept`](https://www.npmjs.com/package/fetch-intercept) to deal with errors or bad requests.**

```typescript
import { Trello, BoardRecord } from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN
});

async function getMyBoards(): Promise<BoardRecord[]> {
    const response = await trello.members("me").boards().getBoards();
    return await response.json();
}
```

You can also import the library from [unpkg](https://unpkg.com/) and create a new `Trello` instance via the global `TrelloForWolves` object:

```html
<head>
  <script src="https://unpkg.com/trello-for-wolves/umd/trello-for-wolves.min.js"></script>
</head>
<body>
  <script>
    var trello = new TrelloForWolves.Trello({
      key: "<YOUR KEY>",
      token: "<YOUR TOKEN>"
    });

    trello.members("me").boards().getBoards()
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  </script>
</body>
```

## Rate Limits

Trello imposes [API rate limits](http://help.trello.com/article/838-api-rate-limits).
You can make no more than 100 requests in 10 seconds per token or 300 requests in 10 seconds per key.
I added code to retry the request if a `429` error is returned. It waits about a second and retries the request.

You can override the default `backoffTime` (`3000`) and `maxRetryAttempts` (`5`) with your own options depending on your requirements.
You can pass them into the Trello constructor:

**Note: If you exceed the rate limit, you need to handle the response yourself after the `maxRetryAttempts` are reached.**

```typescript
import { Trello } from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN,
  backoffTime: 1000, // Amount of time to wait before attempting to make another API call.
  maxRetryAttempts: 3, // Maximum amount of attempts to make before failing.
});

async function myRetriesFailed(): Promise<unknown> {
  const response = await trello.members("me").boards().getBoards();

  if (!response.ok && response.status === 429) {
    console.log("Oh no! Too many retries!");
  }
}
```

## Argument Casing

As the Trello API has evolved, some inconsistencies between using `snake_case` and `camelCase` for the params have begun to rear their ugly head.
In the interest of matching idiomatic JavaScript, I've typed all requests to use `camelCase` and convert the appropriate values to `snake_case` when needed.

If the Trello API documentation specifies a param like `memberCreator_fields`, you'd pass in `memberCreatorFields` and it will work!

## Development

If you want to fix or finagle something, bring it. I'm happy for the help. Bonus points if you have a premium/enterprise-level membership!

## Version 2 Breaking Changes

This library was completely rewritten to take advantage of TypeScript and newer JavaScript features.
I was able to eliminate some dependencies and reduce the package size, so that's neat.
Unfortunately, if you're using this library extensively in your code, the migration process will take some time.

Here are the list of breaking changes from version 1 to 2:

- The `Trello` object is no longer the default export, since all of the types are also exported.
- All methods now use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- You can no longer use streams to upload files/attachments. The Trello API requires that all files be encoded as multipart/form-data.
  If you're using Node.js, you can use `fs.readFile()`/`fs.readFileSync()`.
- Some of the methods on resources have changed (e.g. `board().getBoardStars()` is now `board().boardStars().getBoardStars()`).
- The `maxWaitingTime` property on the config object passed into the `Trello` constructor is now `maxRetryAttempts`.
  Instead of specifying an amount of time to wait, you now specify how many attempts to retry for a 429 error.

**Version 1**

```javascript
import Trello from "trello-for-wolves";

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN,
  backoffTime: 1000,
  maxWaitingTime: 300,
});

trello.members("me").boards().getBoards()
  .then((response) => {
    console.log(response.data);  // <- Hooray! An array of Boards!
  })
  .catch(error => console.log(`Oh no!, this happened: ${error}`));
```

**Version 2**

```typescript
import { Trello } from "trello-for-wolves"; // <- No longer the default export!

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN,
  backoffTime: 1000,
  maxRetryAttempts: 3,
});

trello.members('me').boards().getBoards()
  .then((response) => {
    if (!response.ok) {
      console.log(`Oh no!, this happened: ${response.statusText}`);
      throw new Error(response.statusText);
   }

    return response.json();
  })
  .then(result => {
    console.log(result); // <- Hooray! An array of Boards!
  });
```

## License

MIT license. See the [LICENSE](./LICENSE.md) file for details.
