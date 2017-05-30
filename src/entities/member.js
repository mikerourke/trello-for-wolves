/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  EntityInstance,
} from '../types';

export type MemberLevel = 'admins' | 'all' | 'none' | 'normal' | 'owners';
export type MemberField =
  'avatarHash'
  | 'bio'
  | 'bioData'
  | 'confirmed'
  | 'fullName'
  | 'idPremOrgsAdmin'
  | 'initials'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url'
  | 'username';
export type InvitedMemberField = MemberField &
  'avatarSource'
  | 'email'
  | 'gravatarHash'
  | 'idBoards'
  | 'idBoardsPineed'
  | 'idOrganizations'
  | 'loginTypes'
  | 'oneTimeMessageDismissed'
  | 'prefs'
  | 'premiumFeatures'
  | 'trophies'
  | 'uploadedAvatarHash';
export type Membership =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';
export type MemberType = 'admin' | 'normal' | 'observer';

export default class Member extends Entity {
  constructor(
    auth: Auth,
    memberId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'member', memberId, parent);
  }

  // getMember(urlArgs?: {
  //
  // } = {}): Promise<*> {
  //
  // }

  getMembers(urlArgs?: {
    filter?: MemberLevel,
    fields?: ArgumentGroup<MemberField>,
    activity?: boolean,
  } = {}): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getFilteredMembers(filter: MemberLevel): Promise<*> {
    return this.performRequest('get', { path: filter });
  }

  getInvited(urlArgs?: {
    fields?: ArgumentGroup<InvitedMemberField>,
  } = {}): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      entityNameOverride: 'membersInvited',
    });
  }

  getInvitedFieldValue(field: InvitedMemberField): Promise<*> {
    return this.performRequest('get', {
      path: field,
      entityNameOverride: 'membersInvited',
    });
  }

  getVoted(urlArgs?: {
    fields?: ArgumentGroup<MemberField>,
  } = {}): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      entityNameOverride: 'membersVoted',
    });
  }

  getMembership(idMembership: string, urlArgs?: {
    member?: boolean,
    member_fields?: ArgumentGroup<MemberField>,
  } = {}): Promise<*> {
    const updatedArgs = { idMembership, ...urlArgs };
    return this.performRequest('get', {
      urlArgs: updatedArgs,
      entityNameOverride: 'memberships',
    });
  }

  getMemberships(urlArgs?: {
    filter?: ArgumentGroup<Membership>,
    member?: boolean,
    member_fields?: ArgumentGroup<MemberField>,
  } = {}): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      entityNameOverride: 'memberships',
    });
  }

  updateMember(
    idMember?: string,
    email?: string,
    urlArgs?: {
      fullName?: string,
      type?: MemberType,
    } = {},
  ): Promise<*> {
    const updatedArgs = (idMember)
      ? { idMember, ...urlArgs }
      : { email, ...urlArgs };
    const path = idMember && idMember;
    return this.performRequest('put', { path, urlArgs: updatedArgs });
  }

  updateMembership(
    idMembership: string,
    type: MemberType,
    urlArgs?: {
      member_fields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    const updatedArgs = { idMembership, type, ...urlArgs };
    return this.performRequest('get', {
      urlArgs: updatedArgs,
      entityNameOverride: 'memberships',
    });
  }

  deleteMember(idMember: string): Promise<*> {
    return this.performRequest('delete', { path: idMember });
  }
}
