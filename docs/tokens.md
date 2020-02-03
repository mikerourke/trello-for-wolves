# Tokens

Tokens are used in conjunction with an API key to access the Trello API.

[Trello API Documentation](https://developers.trello.com/reference#tokens)

## GET /tokens/{token}

Retrieve information about a token

**API Call**

```
/GET /1/tokens/55411859be21b8ad7dcd4c78?webhooks=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .getToken({ webhooks: true });
```

## GET /tokens/{token}/member

Retrieve information about a token's owner by token

**API Call**

```
/GET /1/tokens/55411859be21b8ad7dcd4c78/member
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .member()
  .getMember();
```

## GET /tokens/{token}/webhooks

Retrieve all webhooks created with a token

**API Call**

```
/GET /1/tokens/55411859be21b8ad7dcd4c78/webhooks
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .webhooks()
  .getWebhooks();
```

## GET /tokens/{token}/webhooks/{idWebhook}

Retrieve a webhook created with a token

**API Call**

```
/GET /1/tokens/55411859be21b8ad7dcd4c78/webhooks/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .webhooks("f2c444c982eb19a7e5b5c423")
  .getWebhook();
```

## POST /tokens/{token}/webhooks

Create a new webhook for a token

**API Call**

```
/POST /1/tokens/55411859be21b8ad7dcd4c78/webhooks?idModel=54a17d76d4a5072e3931736b&description="My Webhook"&callbackURL=https://mycallbackurl.com
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .webhooks()
  .addWebhook({
    idModel: "54a17d76d4a5072e3931736b",
    description: "My Webhook",
    callbackURL: "https://mycallbackurl.com",
  });
```

## PUT /tokens/{token}/webhooks/{webhookId}

Update an existing webhook

**API Call**

```
/PUT /1/tokens/55411859be21b8ad7dcd4c78/webhooks/f2c444c982eb19a7e5b5c423?description="Test Webhook"
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .webhooks("f2c444c982eb19a7e5b5c423")
  .updateWebhook({ description: "Test Webhook" });
```

## DELETE /tokens/{token}

Delete a token

**API Call**

```
/DELETE /1/tokens/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello.tokens("55411859be21b8ad7dcd4c78").deleteToken();
```

## DELETE /tokens/{token}/webhooks/{idWebhook}

Delete a webhook created with given token

**API Call**

```
/DELETE /1/tokens/55411859be21b8ad7dcd4c78/webhooks/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .tokens("55411859be21b8ad7dcd4c78")
  .webhooks("f2c444c982eb19a7e5b5c423")
  .deleteWebhook();
```
