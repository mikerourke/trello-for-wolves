# Types

Because Trello teams and members are not prefixed differently, we need a way to 
distinguish between the two.

So for example:

`https://trello.com/trelloinc` is a team but `https://trello.com/aryastark` is a member.

The types route is how Trello figures out which is which.

For example:

`GET /1/types/trelloinc`

```json
{
  "type": "organization",
  "id": "538627f73cbb44d1bfbb58f0"
}
```

Whereas `GET /1/types/aryastark`

```json
{
  "type": "member",
  "id": "5159c2944acc05e93b000674"
}
```

[Trello API Documentation](https://developers.trello.com/reference#types)

## GET /types/{id}

Get information about an action

**API Call**

```
/GET /1/types/trelloinc
```

**Trello for Wolves**

```typescript
const response = await trello
  .types("trelloinc")
  .getType();
```
