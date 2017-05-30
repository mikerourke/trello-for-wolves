/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
  InvalidStringError,
  StringLengthError,
} from '../errors';
import BaseEntity from '../base-entity';

/* Types */
import type {
  ActionChildrenQueryArgs,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  AttachmentUrlArgs,
  Auth,
  BoardField,
  CheckItemStateField,
  ChecklistField,
  EntityInstance,
  FilterUrlArgs,
  ListField,
  MemberField,
  Position,
} from '../types';

/**
 * Class representing a Card entity.
 * @extends BaseEntity
 */
export default class Card extends BaseEntity {
  constructor(
    auth: Auth,
    cardId: string,
    parentType?: string,
    parentId?: string,
  ) {
    super(auth, 'card', cardId, parentType, parentId);
  }
}
