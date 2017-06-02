/* @flow */

/* Types */
import type {
  ArgumentGroup,
  CardAging,
} from '../types';

export type BoardBackground =
  'custom'
  | 'default'
  | 'none'
  | 'premium';

export type BoardFilter =
    'closed'
  | 'members'
  | 'open'
  | 'organization'
  | 'pinned'
  | 'public'
  | 'starred'
  | 'unpinned'

export type BoardField =
  'closed'
  | 'dateLastActivity'
  | 'dateLastView'
  | 'desc'
  | 'descData'
  | 'idOrganization'
  | 'invitations'
  | 'invited'
  | 'labelNames'
  | 'memberships'
  | 'name'
  | 'pinned'
  | 'powerUps'
  | 'prefs'
  | 'shortLink'
  | 'shortUrl'
  | 'starred'
  | 'subscribed'
  | 'url';

export type BoardPref =
  'background'
  | 'calendarFeedEnabled'
  | 'cardAging'
  | 'cardCovers'
  | 'comments'
  | 'invitations'
  | 'permissionLevel'
  | 'selfJoin'
  | 'voting';

export type BoardStars = 'none' | 'mine';

export type PermissionLevel = 'org' | 'private' | 'public';

export type Invitation = 'admins' | 'members';

export type GroupPermission =
  'disabled'
  | 'members'
  | 'observers'
  | 'org'
  | 'public';

export type PowerUp =
  'calendar'
  | 'cardAging'
  | 'recap'
  | 'voting';

type BoardFieldsQueryArg = {
  boardFields?: ArgumentGroup<BoardField>,
};

export type BoardInclusionQueryArgs = BoardFieldsQueryArg & {
  board?: boolean,
};

export type PrefsQueryArgs = {
  prefs?: {
    permissionLevel?: PermissionLevel,
    voting?: GroupPermission,
    comments?: GroupPermission,
    invitations?: Invitation,
    selfJoin?: boolean,
    cardCovers?: boolean,
    background?: string,
    cardAging?: CardAging,
  },
};
