/* @flow */

/* Types */
import type {
  ArgumentGroup,
  CardAging,
  PermissionLevel,
} from '../types';

export type BoardBackgroundBrightness =
  'dark'
  | 'light'
  | 'unknown';

export type BoardBackgroundFilter =
  'custom'
  | 'default'
  | 'none'
  | 'premium';

export type BoardBackgroundField =
  'brightness'
  | 'fullSizeUrl'
  | 'scaled'
  | 'tile';

export type BoardFilter =
    'closed'
  | 'members'
  | 'open'
  | 'organization'
  | 'pinned'
  | 'public'
  | 'starred'
  | 'unpinned'

/**
 * @apiDefine BoardFieldQueryArg
 * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} field
 *    Board field to get value for.
 */

/**
 * @apiDefine BoardFieldsQueryArg
 * @apiParam {String="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [fields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
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

/**
 * @apiDefine BoardStarsFilterQueryArg
 * @apiParam {String="mine","none"} [filter='"mine"'] Board stars to include in
 *    response.
 */
export type BoardStars = 'none' | 'mine';

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

/**
 * @apiDefine BoardInclusionQueryArgs
 * @apiParam {Boolean} [board=true] If <code>true</code>, include board data
 *    in the response.
 * @apiParam {String="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [boardFields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
export type BoardInclusionQueryArgs = {
  board?: boolean,
  boardFields?: ArgumentGroup<BoardField>,
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
