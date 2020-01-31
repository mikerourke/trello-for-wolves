# Organizations

More commonly referred to as "teams" in Trello.

[Trello API Documentation](https://developers.trello.com/reference#organizations)

## GET /organizations/{id}

Request a single team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .getOrganization();
```

## GET /organizations/{id}/{field}

Request a single teams's field value

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/url
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .getFieldValue("url");
```

## GET /organizations/{id}/actions

List the actions on a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/actions
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .actions()
  .getActions();
```

## GET /organizations/{id}/boards

List the boards in a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/boards?filter=all&fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .boards()
  .getBoards({ filter: "all", fields: "all" });
```

## GET /organizations/{id}/members

List the members in a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/members
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members()
  .getMembers();
```

## GET /organizations/{id}/membersInvited

List the members with pending invites to a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/embersInvited?fields=all
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .membersInvited()
  .getMembers({ fields: "all" });
```

## GET /organizations/{id}/memberships

List the memberships of a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/memberships?member=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .memberships()
  .getMemberships({ member: true });
```

## GET /organizations/{id}/memberships/{idMembership}

Get a specific memberships of a team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/memberships/f2c444c982eb19a7e5b5c423?member=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .memberships("f2c444c982eb19a7e5b5c423")
  .getMembership({ member: true });
```

## GET /organizations/{id}/pluginData

Get organization scoped pluginData on this team

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/pluginData
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .getPluginData();
```

## GET /organizations/{id}/tags

List the organization's collections

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/tags
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .getTags();
```

## GET /organizations/{id}/newBillableGuests/{idBoard}

Used to check whether the given board has new billable guests on it

> This route can be used before moving a board into a paid organization to see 
> if the board contains members that aren't already paid for in the organization.

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/newBillableGuests/f2c444c982eb19a7e5b5c423
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .boards("f2c444c982eb19a7e5b5c423")
  .getIfHasNewBillableGuests();
```

## GET /organizations/{id}/exports

Retrieve the exports that exist for the given organization

> This route can be used by organizations that have the CSV export feature found 
> at: https://trello.com/{organizationName}/export. This route is used to get 
> information about exports that have been created for the given organization.

**API Call**

```
/GET /1/organizations/55411859be21b8ad7dcd4c78/exports
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .getExports();
```

## PUT /organizations/{id}

Update an existing organization by id

**API Call**

```
/PUT /1/organizations/55411859be21b8ad7dcd4c78?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .updateOrganization({ name: "Test" })
```

## PUT /organizations/{id}/members

Associates a member with a organization (by email address)

**API Call**

```
/PUT /1/organizations/55411859be21b8ad7dcd4c78/members?email=test@stuff.com&type=normal
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members()
  .associateMember({ email: "test@stuff.com", type: "normal" })
```

## PUT /organizations/{id}/members/{idMember}

Associates a member with a organization (by member ID)

**API Call**

```
/PUT /1/organizations/55411859be21b8ad7dcd4c78/members/f2c444c982eb19a7e5b5c423?type=admin&allowBillableGuest=false
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .associateMember({ type: "admin", allowBillableGuest: false })
```

## PUT /organizations/{id}/members/{idMember}/deactivated

Deactivate or reactivate a member of a team

**API Call**

```
/PUT /1/organizations/55411859be21b8ad7dcd4c78/members/f2c444c982eb19a7e5b5c423/deactivated?value=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members("f2c444c982eb19a7e5b5c423")
  .updateDeactivatedStatus(true)
```

## POST /organizations

Create a new team

**API Call**

```
/POST /1/organizations?name=Test&defaultLabels=true&defaultLists=true&keepFromSource=none
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations()
  .addOrganization({
    name: "Test",
    defaultLabels: true,
    defaultLists: true,
    keepFromSource: "none"
  })
```

## POST /organizations/{id}/logo

Set the logo image for a team

**API Call**

```
/POST /1/organizations/55411859be21b8ad7dcd4c78/logo
```

**Trello for Wolves**

```typescript
const logoFile = new File(["test"], "test.txt");

const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .uploadLogo(logoFile)
```

## POST /organizations/{id}/tags

Create a new collection in a team

**API Call**

```
/POST /1/organizations/55411859be21b8ad7dcd4c78/tags?name=Test
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .addTag("Test");
```

## POST /organizations/{id}/exports

Kick off CSV export for an organization

**API Call**

```
/POST /1/organizations/55411859be21b8ad7dcd4c78/exports?attachments=true
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .startExport({ attachments: true });
```

## DELETE /organizations/{id}

Delete a team

> Deleting a team is permanent. There is no undo. Boards with this team won't 
> be deleted. Your boards in this team will appear in your personal boards list.

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .deleteOrganization();
```

## DELETE /organizations/{id}/logo

Delete a the logo from a team

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/logo
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .deleteLogo();
```

## DELETE /organizations/{id}/members/{idMember}

Removes a member from a team

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/members/aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members("aa7e45b4a9db83668c421556")
  .dissociateMember();
```

## DELETE /organizations/{id}/members/{idMember}/all

Remove a member from a team and from all team boards

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/members/aa7e45b4a9db83668c421556/all
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .members("aa7e45b4a9db83668c421556")
  .dissociateMember(true);
```

## DELETE /organizations/{id}/prefs/associatedDomain

Remove the associated Google Apps domain from a team

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/prefs/associatedDomain
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .prefs()
  .removeAssociatedDomain();
```

## DELETE /organizations/{id}/prefs/orgInviteRestrict

Remove the email domain restriction on who can be invited to the team

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/prefs/orgInviteRestrict
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .prefs()
  .removeOrgInviteRestrict();
```

## DELETE /organizations/{id}/tags/{idTag}

Delete an organization's tag

**API Call**

```
/DELETE /1/organizations/55411859be21b8ad7dcd4c78/tags/aa7e45b4a9db83668c421556
```

**Trello for Wolves**

```typescript
const response = await trello
  .organizations("55411859be21b8ad7dcd4c78")
  .deleteTag("aa7e45b4a9db83668c421556");
```
