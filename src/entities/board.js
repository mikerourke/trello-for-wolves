/* @flow */

/* Internal dependencies */
import request from '../lib/request';

export default class Board {
  auth: Auth;
  boardId: string;

  constructor(auth: Auth, boardId?: string = '') {
    this.auth = auth;
    this.boardId = boardId;
  }

  getBoard(options?: {
    actions?: BoardActions,
    actionsEntities?: boolean,
    actionsDisplay?: boolean,
    actionsFormat?: ActionsFormat,
    actionsSince?: ActionsSince,
    actionsLimit?: number,
    actionFields?: ActionFields,
    actionMember?: boolean,
    actionMemberFields?: MemberFields,
    actionMemberCreator?: boolean,
    actionMemberCreatorFields?: MemberFields,
    cards?: CardStatus,
    cardFields?: CardFields,
    cardAttachments?: boolean,
    cardAttachmentFields?: AttachmentFields,
    cardChecklists?: AllOrNone,
    cardPluginData?: boolean,
    cardStickers?: boolean,
    boardStars?: BoardStars,
    labels?: AllOrNone,
    labelFields?: LabelFields,
    labelsLimit?: number, // Valid values 0 to 1000
    list?: ListStatus,
    listFields?: ListFields,
    memberships?: Memberships,
    membershipsMember?: boolean,
    membershipsMemberFields?: MemberFields,
    members?: MemberLevel,
    memberFields?: MemberFields,
    membersInvited?: MemberLevel,
    membersInvitedFields?: MemberFields,
    pluginData?: boolean,
    checklists?: AllOrNone,
    checklistFields?: ChecklistFields,
    organization?: boolean,
    organizationFields?: OrganizationFields,
    organizationMemberships?: Memberships,
    organizationPluginData?: boolean,
    myPrefs?: boolean,
    tags?: boolean,
    fields?: BoardFields,
  }): Promise<*> {
    return new Promise((resolve, reject) => {
      request(this.auth, 'GET', `boards/${this.boardId}`, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getFieldValue(boardId: string, urlArguments: Object): Promise<*> {
    return new Promise((resolve, reject) => {
      request(this.auth, 'GET', `boards/${boardId}`, urlArguments)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
