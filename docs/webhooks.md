# Webhooks

Webhooks allow developers to receive updates regarding actions that have 
occurred in Trello.

For more on getting started with Trello's Webhooks, [check out this guide](https://developers.trello.com/page/webhooks).

[Trello API Documentation](https://developers.trello.com/reference#webhooks)

## GET /webhooks/{id}

Gets a single webhook

**API Call**

```
/GET /1/webhooks/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .webhooks("55411859be21b8ad7dcd4c78")
  .getWebhook();
```

## GET /webhooks/{id}/{field}

Get a webhook's field

**API Call**

```
/GET /1/webhooks/55411859be21b8ad7dcd4c78/callbackURL
```

**Trello for Wolves**

```typescript
const response = await trello
  .webhooks("55411859be21b8ad7dcd4c78")
  .getFieldValue("callbackURL");
```

## PUT /webhooks/{id}

Update an existing webhook

**API Call**

```
/PUT /1/webhooks/55411859be21b8ad7dcd4c78?description="Test Webhook"
```

**Trello for Wolves**

```typescript
const response = await trello
  .webhooks("55411859be21b8ad7dcd4c78")
  .updateWebhook({ description: "Test Webhook" });
```

## POST /webhooks

Create a new webhook

**API Call**

```
/POST /1/webhooks?idModel=54a17d76d4a5072e3931736b&description="My Webhook"&callbackURL=https://mycallbackurl.com
```

**Trello for Wolves**

```typescript
const response = await trello
  .webhooks()
  .addWebhook({
    idModel: "54a17d76d4a5072e3931736b",
    description: "My Webhook",
    callbackURL: "https://mycallbackurl.com"
  });
```

## DELETE /webhooks/{id}

Delete a webhook

**API Call**

```
/DELETE /1/webhooks/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .webhooks("55411859be21b8ad7dcd4c78")
  .deleteWebhook();
```
