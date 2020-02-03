# Batch

The batch endpoint allows you to make multiple GET requests to the Trello API in a single
request. By batching `GET` requests together, you can reduce the volume of calls you are
making to the API and more easily stay within your API rate limit. The batch endpoint
can not be called recursively; requests containing the batch url will be ignored.

[Trello API Documentation](https://developers.trello.com/reference#batch)

## GET /batch

Get information about an action

**API Call**

```
/GET /1/batch/?urls=/members/trello/,/boards/4eea4ffc91e31d1746000046,/cards/74836e2c91e31d1746008921/pluginData
```

**Trello for Wolves**

```typescript
const response = await trello
  .batch()
  .makeRequests([
    "/members/trello/",
    "/boards/4eea4ffc91e31d1746000046",
    "/cards/74836e2c91e31d1746008921/pluginData",
  ]);
```
