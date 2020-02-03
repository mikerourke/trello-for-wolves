# Reactions

Reactions give users the option to add an emoji to an action.

[Trello API Documentation](https://developers.trello.com/reference#reactions)

## GET /emoji

List available emoji

**API Call**

```
/GET /1//emoji?spritesheets=false
```

**Trello for Wolves**

```typescript
const response = await trello.emoji().getEmoji({ spritesheets: true });
```

## GET /actions/{idAction}/reactions

List reactions for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/reactions?member=true&emoji=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .reactions()
  .getReactions({ member: true, emoji: true });
```

## GET /actions/{idAction}/reactions/{id}

Get information for a reaction

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/reactions/f2c444c982eb19a7e5b5c423?member=true&emoji=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .reactions("f2c444c982eb19a7e5b5c423")
  .getReaction({ member: true, emoji: true });
```

## GET /actions/{idAction}/reactionsSummary

List a summary of all reactions for an action

**API Call**

```
/GET /1/actions/55411859be21b8ad7dcd4c78/reactionsSummary
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .getReactionsSummary();
```

## POST /actions/{idAction}/reactions

Adds a new reaction to an action

**API Call**

```
/POST /1/actions/55411859be21b8ad7dcd4c78/reactions
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .reactions()
  .addReaction({
    unified: "1F44D-1F3FC",
    skinVariation: "1F3FF",
  });
```

## DELETE /actions/{idAction}/reactions/{id}

Deletes a reaction

**API Call**

```
/DELETE /1/actions/55411859be21b8ad7dcd4c78/reactions/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .actions("55411859be21b8ad7dcd4c78")
  .reactions("f2c444c982eb19a7e5b5c423")
  .deleteReaction();
```
