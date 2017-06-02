/* @flow */

export type NotificationType =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addedAttachmentToCard'
  | 'addedMemberToCard'
  | 'addedToBoard'
  | 'addedToCard'
  | 'addedToOrganization'
  | 'cardDueSoon'
  | 'changeCard'
  | 'closeBoard'
  | 'commentCard'
  | 'createdCard'
  | 'declinedInvitationToBoard'
  | 'declinedInvitationToOrganization'
  | 'invitedToBoard'
  | 'invitedToOrganization'
  | 'makeAdminOfBoard'
  | 'makeAdminOfOrganization'
  | 'memberJoinedTrello'
  | 'mentionedOnCard'
  | 'removedFromBoard'
  | 'removedFromCard'
  | 'removedFromOrganization'
  | 'removedMemberFromCard'
  | 'unconfirmedInvitedToBoard'
  | 'unconfirmedInvitedToOrganization'
  | 'updateCheckItemStateOnCard';

export type NotificationField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type'
  | 'unread';
