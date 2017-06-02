/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  BoardInclusionQueryArgs,
  CardInclusionQueryArgs,
  FieldsQueryArg,
  FilterQueryArg,
  ListField,
  PositionNumbered,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

type ListPosQueryArg = {
  pos?: PositionNumbered,
};

/**
 * Class representing a List resource.
 * @extends BaseResource
 */
export default class List extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'list', options);
  }

  getList(queryArgs?: BoardInclusionQueryArgs &
    CardInclusionQueryArgs &
    FieldsQueryArg<ListField> &
    FilterQueryArg<ListField> = {},
  ): Promise<*> {
    const idList = this.instanceId;
    const updatedArgs = (this.parentPath)
      ? { idList, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getLists(queryArgs?: FieldsQueryArg<ListField> & {
    limit?: number,
  } = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ListField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  updateList(queryArgs?: ListPosQueryArg & {
    name?: string,
    closed?: boolean,
    idBoard?: string,
    subscribed?: boolean,
  }): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/closed', queryArgs);
  }

  updateIdBoard(
    queryArgs: ValueQueryArg<string> & ListPosQueryArg,
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updatePosition(queryArgs: ValueQueryArg<PositionNumbered>): Promise<*> {
    return this.httpPut('/pos', queryArgs);
  }

  updatedSubscribed(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/subscribed', queryArgs);
  }

  createList(queryArgs: ListPosQueryArg & {
    name: string,
    idBoard: string,
    idListSource?: string,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  archiveAllCards() {
    return this.httpPost('/archiveAllCards');
  }

  moveAllCards(queryArgs: {
    idBoard: string,
    idList: string,
  }) {
    return this.httpPost('/moveAllCards', queryArgs);
  }
}
