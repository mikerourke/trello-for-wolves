/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionChildrenQueryArgs,
  ActionField,
  ActionType,
  AllOrNone,
  ArgumentGroup,
  Auth,
  BoardBackground,
  BoardField,
  BoardFilter,
  BoardInclusionQueryArgs,
  CardAttachmentInclusionQueryArgs,
  CardInclusionQueryArgs,
  FieldsQueryArg,
  FilterDate,
  Format,
  ListField,
  ListStatus,
  MemberEveryField,
  MemberField,
  Membership,
  NotificationField,
  NotificationType,
  OrganizationField,
  OrganizationFilter,
  ResourceConstructorOptions,
} from '../types';

/**
 * Class representing a Member resource.
 * @extends BaseResource
 */
export default class Member extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'member', options);
  }

  getMember(queryArgs?: ActionChildrenQueryArgs &
    BoardInclusionQueryArgs &
    CardAttachmentInclusionQueryArgs &
    CardInclusionQueryArgs &
    FieldsQueryArg<MemberEveryField> &
    {
      actionsSince?: FilterDate,
      actionBefore?: ?Date,
      cardMembers?: boolean,
      cardMemberFields?: ArgumentGroup<MemberField>,
      cardStickers?: boolean,
      boards?: ArgumentGroup<BoardFilter>,
      boardActions?: ArgumentGroup<ActionType>,
      boardActionsEntities?: boolean,
      boardActionsDisplay?: boolean,
      boardActionsFormat?: Format,
      boardActionsSince?: FilterDate,
      boardActionsLimit?: number,
      boardActionFields?: ArgumentGroup<ActionField>,
      boardLists?: ArgumentGroup<ListStatus>,
      boardMemberships?: ArgumentGroup<Membership>,
      boardOrganization?: boolean,
      boardOrganizationFields?: ArgumentGroup<OrganizationField>,
      boardsInvited?: ArgumentGroup<BoardFilter>,
      boardsInvitedFields?: ArgumentGroup<BoardField>,
      boardStars?: boolean,
      savedSearches?: boolean,
      organizations?: ArgumentGroup<OrganizationFilter>,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationPaidAccount?: boolean,
      organizationsInvited?: OrganizationFilter,
      organizationsInvitedFields?: ArgumentGroup<OrganizationField>,
      notifications?: ArgumentGroup<NotificationType>,
      notificationsEntities?: boolean,
      notificationsDisplay?: boolean,
      notificationsLimit?: number,
      notificationFields?: ArgumentGroup<NotificationField>,
      notificationMemberCreator?: boolean,
      notificationMemberCreatorFields?: ArgumentGroup<MemberField>,
      notificationBefore?: ?string,
      notificationSince?: ?string,
      tokens?: AllOrNone,
      paidAccount?: boolean,
      boardBackgrounds?: ArgumentGroup<BoardBackground>,
      customBoardBackgrounds?: AllOrNone,
      customStickers?: AllOrNone,
      customEmoji?: AllOrNone,
    } = {},
  ): Promise<*> {
    const idList = this.instanceId;
    const updatedArgs = (this.parentPath)
      ? { idList, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getMembers(queryArgs?: FieldsQueryArg<ListField> & {
    limit?: number,
  } = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: MemberEveryField): Promise<*> {
    return this.httpGet(`/${field}`);
  }
}
