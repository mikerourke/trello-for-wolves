# Trello for Wolves

Node.js wrapper around Trello API...for wolves.  Don't read too much in to the
name, I just love wolves and everything else on npm with the word
*Trello* is taken.

## Installation

#### npm

```bash
$ npm install trello-for-wolves
```

#### yarn

```bash
$ yarn add trello-for-wolves
```

#### biscuits*

```bash
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

I used [Axios](https://github.com/mzabriskie/axios) for performing requests, so 
if you're not familiar with Promises, you're going to have a bad time.  

This library is typed using [Flow](https://flow.org/), so if you use Flow plugins,
it'll show you a handy autocomplete when cooking up code.  However, it's probably
a good idea to have the Trello API docs up while you're coding, because some
of these routes have [a whole bunch of options for arguments](https://developers.trello.com/advanced-reference/board#get-1-boards-board-id).

## Examples

### Authorization

You'll need to create a new instance of `Trello` and pass in an "auth" object
containing a `key` and `token`.  There isn't any async voodoo associated with
this, the credentials are passed to each function call through the magic of
class constructors.

Here's what you'll need to do from the get-go:
```javascript
const Trello = require('trello-for-wolves');

const trello = new Trello({
  key: API_KEY,
  token: AUTH_TOKEN
});
```

### A Note about Argument Casing

The Trello docs used [snake case](https://en.wikipedia.org/wiki/Snake_case) 
for their arguments.  I am not a big fan of snake case and JavaScript is all
about the camel case, so anywhere in the docs where you see an argument with
a `_`, camel case-ify it.

### The Meat and Potatoes

Below are some examples of the fun stuff you can do with the library.  The routes
are built based on how you chain the function call, so you're limited only by
your imagination and what routes actually exist.

#### Get the Boards associated with your account

**Trello Endpoint**:

`GET /1/members/me/boards&fields=desc,name,pinned&filter=closed,open,public&...`

[Trello API Link](https://developers.trello.com/advanced-reference/member#get-1-members-idmember-or-username-boards)

```javascript
trello.members('me').boards().getBoards({
  fields: ['desc', 'name', 'pinned'], // If you don't like using an array, feel free to use a comma-separated string
  filter: 'closed,open,public' // <- Like so
  organization: true,
  organizationFields: 'all', // This is organization_fields in the docs
  lists: 'all'
})
  .then((response) => {
    console.log(response.data);  // <- Hooray! An array of Boards!
  })
  .catch(error => console.log(`Oh no!, this happened: ${error}`));
```

#### Update a Board

**Trello Endpoint**:

`PUT /1/boards/bOaRdId?name=Hooray&prefs/cardCovers=false&...`

[Trello API Link](https://developers.trello.com/advanced-reference/board#put-1-boards-board-id)

```javascript
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
.then((response) => {
    console.log(response.data);  // <- Hooray! A single updated Board!
})
.catch(error => console.log(`Oh no!, not again!: ${error}`));
```

#### Batch some requests

**Trello Endpoint**:

`GET /1/batch/?urls=/boards/bOaRdId/lists,/cards/cArDiD&key=...`

[Trello API Link](https://developers.trello.com/advanced-reference/batch#get-1-batch)

To get around the [API rate limits](http://help.trello.com/article/838-api-rate-limits), 
you can do a little batchy-doodle.

```javascript
trello.batch().makeRequests([
  '/boards/bOaRdId/lists',
  '/cards/cArDiD'
])
  .then((response) => {
      console.log(response.data); 
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

## Contributing

### Development

If you want to fix or fanagle something, bring it.  I'm happy for the help.  I'm
currently having a bit of an issue getting some of the tests to pass that may
be related to my membership level.  I'd love to have someone try to get the
other routes working.

### Documentation

I'm currently in the process of documenting the whole kit and caboodle using
[apiDoc](http://apidocjs.com/), similar to how they did it for the 
[node-github](https://github.com/mikedeboer/node-github/blob/master/README.md) package.

I'd like to document the argument types and the function call that corresponds with
a route.

It's a pretty massive undertaking because there's over 300 routes, but I started
chipping away at it.

You can see what I have so far in the `internals/api-docs` directory.  If you 
hate your life or don't value your time, that could be an option for you.

### Coverage

I'm tracking the status of functionality, tests, and documentation in 
the [COVERAGE](./COVERAGE.md) file.  I used fun emojis to represent the status
of each route.  If you get something working or add documentation, please
update accordingly.


## LICENSE

MIT license. See the [LICENSE](./LICENSE.md) file for details.
