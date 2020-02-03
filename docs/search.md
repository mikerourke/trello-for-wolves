# Search

The Search API allows you to perform the same search that is available within Trello
at the top of the window. This means that you can use modifiers such as `edited:day`
within the query to modify the results you get back.

Search operators help you find specific cards and create highly tailored lists. You can
add `-` to any operator to do a negative search, such as `-has:members` to search for
cards without any members assigned.

[Trello API Documentation](https://developers.trello.com/reference#search)

## GET /search

Find what you're looking for in Trello

> It can take Trello up to ~60 seconds to update our search index to changes.
> This means if you make a change to a card for instance, then immediately
> execute a search for it, it may not show up. Or if you remove a label from a
> card, then immediately search for that label, that card will still appear in
> the search results.

**API Call**

```
/GET /1/search?query=#someLabel&idBoards=mine&modelTypes=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .search()
  .performSearch({ query: "#someLabel", idBoards: "mine", modelTypes: "all" });
```

## GET /search/members

Search for Trello members

**API Call**

```
/GET /1/search/members?query=test&limit=8&onlyOrgMembers=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .search()
  .searchMembers({ query: "test", limit: 8, onlyOrgMembers: false });
```
