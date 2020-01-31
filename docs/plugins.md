# Plugins

Plugins are how Power-Ups are managed via the API.

[Trello API Documentation](https://developers.trello.com/reference#plugins)

## GET /plugins/{id}

Get a single plugin

**API Call**

```
/GET /1/plugins/55411859be21b8ad7dcd4c78?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .plugins("55411859be21b8ad7dcd4c78")
  .getPlugin();
```

## GET /plugins/{id}/compliance/memberPrivacy

Get the member privacy setting for a plugin

**API Call**

```
/GET /1/plugins/55411859be21b8ad7dcd4c78/compliance/memberPrivacy
```

**Trello for Wolves**

```typescript
const response = await trello
  .plugins("55411859be21b8ad7dcd4c78")
  .getMemberPrivacy();
```

## POST /plugins/listings

Create a new listing for a given locale for your Power-Up

**API Call**

```
curl -X POST \
  'https://api.trello.com/1/plugins/5a3972294816f458a0451dd4/listings?key=&token=' \
  -H 'Content-Type: application/json' \
  -d '{
		"overview": "A fun Power-Up",
		"description": "#Wow Markdown \n This is a great Power-Up",
		"locale": "en-US", 
		"name": "My Great Power-Up"
	}'
```

**Trello for Wolves**

```typescript
const response = await trello
  .plugins("5a3972294816f458a0451dd4")
  .listings()
  .addListing({
    overview: "A fun Power-Up",
    description: "#Wow Markdown \n This is a great Power-Up",
    locale: "en-US",
    name: "My Great Power-Up"
  });
```

## PUT /plugins/{id}

Update a plugin by ID

> The documentation doesn't specify any parameters for updating the plugin,
> so I'm using the plugin record with optional fields.

**API Call**

```
/PUT /1/plugins/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .plugins("55411859be21b8ad7dcd4c78")
  .updatePlugin();
```

## PUT /plugins/{id}/listings/{idListing}

Update an existing listing for your Power-Up

**API Call**

```
curl -X PUT \
  'https://api.trello.com/1/plugins/5d56c8d8307887262c8e9019/listings/5d56c91d89fc3a71c8c13a93' \
  -H 'Content-Type: application/json' \
  -d '{
		"overview": "A fun Power-Up",
		"description": "#Wow Markdown \n This is a great Power-Up",
		"locale": "en-US", 
		"name": "My Great Power-Up"
	}'
```

**Trello for Wolves**

```typescript
const response = await trello
  .plugins("5d56c8d8307887262c8e9019")
  .listing("5d56c91d89fc3a71c8c13a93")
  .updateListing({
    overview: "A fun Power-Up",
    description: "#Wow Markdown \n This is a great Power-Up",
    locale: "en-US",
    name: "My Great Power-Up"
  });
```
