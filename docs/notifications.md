# Notifications

Notifications are displayed under the bell icon button, next to a member's avatar.
When the bell is red, it means the member has unread notifications.

[Trello API Documentation](https://developers.trello.com/reference#notifications)

## GET /notifications/{id}

Get information about an notification

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78?board=false&board_fields=name&card=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .getNotification({ board: false, boardFields: "name", card: false });
```

## GET /notifications/{id}/{field}

Get a specific property of an notification

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/date
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .getFieldValue("date");
```

## GET /notifications/{id}/board

Get the board a notification is associated with

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/board
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .board()
  .getBoard();
```

## GET /notifications/{id}/card

Get the card a notification is associated with

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/card
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .card()
  .getCard();
```

## GET /notifications/{id}/list

Get the list a notification is associated with

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/list
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .list()
  .getList();
```

## GET /notifications/{id}/member

Get the member (not the creator) a notification is about

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/member?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .member()
  .getMember({ fields: "all" });
```

## GET /notifications/{id}/memberCreator

Get the member who created the notification

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/memberCreator?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .memberCreator()
  .getMember({ fields: "all" });
```

## GET /notifications/{id}/organization

Get the organization a notification is associated with

**API Call**

```
/GET /1/notifications/55411859be21b8ad7dcd4c78/organization?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .organization()
  .getOrganizations{ fields: "all" });
```

## PUT /notifications/{id}

Update the read status of a notification

**API Call**

```
/PUT /1/notifications/55411859be21b8ad7dcd4c78?unread=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .updateNotification({ unread: true });
```

## PUT /notifications/{id}/unread

Update the read status of a notification

**API Call**

```
/PUT /1/notifications/55411859be21b8ad7dcd4c78/unread?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications("55411859be21b8ad7dcd4c78")
  .updateUnreadStatus(true);
```

## POST /notifications/all/read

Mark all notifications as read

**API Call**

```
/POST /1/notifications/all/read
```

**Trello for Wolves**

```typescript
const response = await trello
  .notifications()
  .markAllAsRead();
```
