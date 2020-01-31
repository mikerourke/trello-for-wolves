# Enterprises

Enterprises contain organizations and members.

[Trello API Documentation](https://developers.trello.com/reference#enterprise)

## GET /enterprises/{id}

Gets a single enterprise

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .getEnterprise();
```

## GET /enterprises/{id}/admins

Get an enterprise's admin members

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78/admins?fields=fullName,username
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .getAdmins({ fields: ["fullName", "username"] });
```

## GET /enterprises/{id}/signupUrl

Get the signup URL for an enterprise

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78/signupUrl?authenticate=false&confirmationAccepted=false&returnUrl=none&tosAccepted=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .getSignupUrl({
    authenticate: false,
    confirmationAccepted: false,
    returnUrl: "none",
    tosAccepted: false
  });
```

## GET /enterprises/{id}/members

Get the members of an enterprise

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78/members?fields=avatarHash,fullName,initials,username&filter=none&sortBy=none
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .members()
  .getMembers({
    fields: ["avatarHash", "fullName", "initials", "username"],
    filter: "none",
    sortBy: "none"
  });
```

## GET /enterprises/{id}/members/{idMember}

et a specific member of an enterprise by ID

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78/members/f2c444c982eb19a7e5b5c423?organization_fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .getMember({ organizationFields: "all" });
```

## GET /enterprises/{id}/transferrable/organization/{idOrganization}

Get whether an organization can be transferred to an enterprise

**API Call**

```
/GET /1/enterprises/55411859be21b8ad7dcd4c78/transferrable/organization/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .organizations("f2c444c982eb19a7e5b5c423")
  .getIfTransferrableToEnterprise();
```

## PUT /enterprises/{id}/members/{idMember}/deactivated

Deactivate a member of an enterprise

**API Call**

```
/PUT /1/enterprises/55411859be21b8ad7dcd4c78/members/f2c444c982eb19a7e5b5c423/deactivated?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .updateDeactivatedStatus(true);
```

## PUT /enterprises/{id}/organizations

Transfer an organization to an enterprise

**API Call**

```
/PUT /1/enterprises/55411859be21b8ad7dcd4c78/organizationns?idOrganization=f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .organizations("f2c444c982eb19a7e5b5c423")
  .transferToEnterprise();
```

## PUT /enterprises/{id}/admins/{idMember}

Make member an admin of enterprise

**API Call**

```
/PUT /1/enterprises/55411859be21b8ad7dcd4c78/admins/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .makeAdminForEnterprise();
```

## DELETE /enterprises/{id}/organizations/{idOrganization}

Remove an organization from an enterprise

**API Call**

```
/DELETE /1/enterprises/55411859be21b8ad7dcd4c78/organizations/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .organizations("f2c444c982eb19a7e5b5c423")
  .removeFromEnterprise();
```

## DELETE /enterprises/{id}/admins/{idMember}

Remove a member as admin from an enterprise

**API Call**

```
/DELETE /1/enterprises/55411859be21b8ad7dcd4c78/admins/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .enterprises("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .removeAdminForEnterprise();
```
